(function () {
	var uploadOverlay = document.querySelector('.upload-overlay');
	var uploadFile = document.querySelector('#upload-file');
	var uploadFormCancel = document.querySelector('.upload-form-cancel');

// отображение редактора фото , после того как фото было загружено.
	function uploadFileChangeHandler () {
		uploadOverlay.classList.remove('hidden');
	}
	uploadFile.addEventListener('change',uploadFileChangeHandler);

//закрытие редактора фото.
	function escKeydownHandler(evt){
		if(evt.keyCode === data.ESC){
			uploadOverlay.classList.add('hidden');
		}
	}
	document.addEventListener('keydown',escKeydownHandler);
	
	function uploadFormCancelClickHandler() {
		uploadOverlay.classList.add('hidden');
	}
	uploadFormCancel.addEventListener('click',uploadFormCancelClickHandler);

//Редактирование размера фотографии.
	var sizeDefault = 50;
	var uploadResizeControls = document.querySelector('.upload-resize-controls')
	var uploadResizeControlsButtonDec = 'upload-resize-control upload-resize-controls-button upload-resize-controls-button-dec';
	var uploadResizeControlsButtonInc = 'upload-resize-control upload-resize-controls-button upload-resize-controls-button-inc';
	var uploadResizeControlsValue = uploadResizeControls.querySelector('.upload-resize-controls-value');
	var uploadFormPreview = document.querySelector('.upload-form-preview > img');
	
	uploadResizeControlsValue.value = sizeDefault + '%';
	uploadFormPreview.style.transform = 'scale(' + sizeDefault / 100 +')';
	
	function uploadResizeControlsClickHandler(evt) {
		var className = evt.target.className;
		
		if(className === uploadResizeControlsButtonInc){
			sizeDefault !== 100 ? sizeDefault +=25:sizeDefault = 100;
			uploadResizeControlsValue.value = sizeDefault + '%';
		}else if (className === uploadResizeControlsButtonDec){
			sizeDefault <= 25 ? sizeDefault = 25:sizeDefault -= 25;
			uploadResizeControlsValue.value = sizeDefault + '%';
		}
		uploadFormPreview.style.transform = 'scale(' + sizeDefault / 100 +')';
	}
	uploadResizeControls.addEventListener('click',  uploadResizeControlsClickHandler);

// Применение эффекта для избражений
	var uploadEffectLevel = document.querySelector('.upload-effect-level');
	var uploadEffectLevelLine = document.querySelector('.upload-effect-level-line');
	var uploadEffectLevelPin = uploadEffectLevel.querySelector('.upload-effect-level-pin');
	var uploadEffectLevelVal = uploadEffectLevel.querySelector('.upload-effect-level-val');
	var uploadEffectControls = document.querySelector('.upload-effect-controls');
	
	uploadEffectLevelPin.style.left = '0';
	uploadEffectLevelVal.style.width = '0';
	
	function uploadEffectControlsClickHandler(evt) {
		var uploadEffectControlsValue = evt.target.value;
		var className = 'effect-' + uploadEffectControlsValue;
		if(uploadEffectControlsValue){
			uploadFormPreview.className = className;
			uploadFormPreview.style.removeProperty('filter');
			uploadEffectLevelPin.style.left = scrollDefaultPin(className);
			uploadEffectLevelVal.style.width = scrollDefaultPin(className);
		}
		return;
	}
	uploadEffectControls.addEventListener('click',uploadEffectControlsClickHandler);
	
	function scrollDefaultPin(className) {
		var posicionPin;
		switch (className){
			case 'effect-none':
				posicionPin = '0';
				break;
			case 'effect-phobos':
				posicionPin = '50%';
				break;
			default:
				posicionPin = '100%';
				break;
		}
		return posicionPin;
	}
	
	function effectImageFilter (className) {
		var imageFilter;
		
		switch (className){
			case 'effect-chrome':
				imageFilter = 'grayscale';
				break;
			case 'effect-sepia':
				imageFilter = 'sepia';
				break;
			case 'effect-marvin':
				imageFilter = 'invert';
				break;
			case 'effect-phobos':
				imageFilter = 'blur';
				break;
			case 'effect-heat':
				imageFilter = 'brightness';
				break;
			case 'effect-none':
				imageFilter = 'none';
				break;
		}
		return imageFilter;
	}
	
	function effectImageFilterSaturate(effectFilter, numFilter) {
		var saturate;
		var x;
		
		switch (effectFilter){
			case 'grayscale':
				x = numFilter / 100;
				saturate = x.toPrecision(1);
				break;
			case 'sepia':
				x = numFilter / 100;
				saturate = x.toPrecision(1);
				break;
			case 'invert':
				saturate = numFilter + '%';
				break;
			case 'blur':
				saturate = numFilter / 10 + 'px';
				break;
			case 'brightness':
				saturate = numFilter * 3 + '%';
				break;
			case 'none':
				saturate = '';
				break;
		}
		return saturate;
	}
	
	function percentageNum(percentageX,percentageFull) {
		var percentage = (percentageX / percentageFull) * 100;
		return percentage;
	}

//Применение светофильтров
	function beginColorFilters (shift){
		var colorFilter = percentageNum(uploadEffectLevelPin.offsetLeft - shift,uploadEffectLevelLine.offsetWidth - (data.PIN_WIDTH / 2));
		var className = uploadFormPreview.className;
		uploadFormPreview.style.filter = effectImageFilter(className) +
			'('+ effectImageFilterSaturate(effectImageFilter(className), colorFilter) +')';
	}

// Перетаскивание пина
	function uploadEffectLevelPinMousedovn(evt) {
		evt.preventDefault();
		
		var beginCoords = {
			x: evt.clientX,
			y: evt.clientY
		};
		var dragged = false;
		
		function uploadEffectLevelPinMousemove(moveEvt) {
			moveEvt.preventDefault();
			dragged = true;
			var shift = {
				x: beginCoords.x - moveEvt.clientX,
				y: beginCoords.y - moveEvt.clientY
			};
			
			beginCoords = {
				x: moveEvt.clientX,
				y: moveEvt.clientY
			};
			
			uploadEffectLevelPin.style.left = uploadEffectLevelPin.offsetLeft - shift.x +'px';
			uploadEffectLevelVal.style.width = uploadEffectLevelPin.offsetLeft - shift.x +'px';
			
			if (uploadEffectLevelPin.offsetLeft - shift.x < data.PIN_WIDTH / 2){
				uploadEffectLevelPin.style.left = data.PIN_WIDTH / 2 +'px';
				uploadEffectLevelVal.style.width = data.PIN_WIDTH / 2 +'px';
			}else if(uploadEffectLevelPin.offsetLeft - shift.x > uploadEffectLevelLine.offsetWidth - (data.PIN_WIDTH / 2)){
				uploadEffectLevelPin.style.left = uploadEffectLevelLine.offsetWidth - (data.PIN_WIDTH / 2) + 'px';
				uploadEffectLevelVal.style.width = uploadEffectLevelLine.offsetWidth - (data.PIN_WIDTH / 2) + 'px';
			}
			
			beginColorFilters(shift.x);
		}
		function uploadEffectLevelPinMouseupHandler(upEvt) {
			upEvt.preventDefault();
			
			document.removeEventListener('mousemove',uploadEffectLevelPinMousemove);
			document.removeEventListener('mouseup', uploadEffectLevelPinMouseupHandler);
		}
		document.addEventListener('mousemove',uploadEffectLevelPinMousemove);
		document.addEventListener('mouseup', uploadEffectLevelPinMouseupHandler);
	}
	uploadEffectLevelPin.addEventListener('mousedown', uploadEffectLevelPinMousedovn );
	
	window.form = {
		escKeydownHandler: escKeydownHandler
	}
})();
