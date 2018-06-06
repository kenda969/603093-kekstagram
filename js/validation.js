(function () {
	var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
	var uploadFormDescription = document.querySelector('.upload-form-description');

// Проверка длинны массива. Не более 5 хэштэгов.
	function checkLengthArray(arr) {
		if(arr.length > 5){
			uploadFormHashtags.setCustomValidity('Должно быть не больше 5 хэштегов!!!');
			uploadFormHashtags.style.borderColor = 'red';
		} else {
			uploadFormHashtags.style.borderColor = '';
		}
	}

// Проверка длинны  элементов массива. Не более 20 символов..
	function checkLengthArrayElement(arr) {
		for (i = 0; i < arr.length; i++) {
			if (arr[i].length > 20) {
				alert('Этот хэш тег ( ' + arr[i] + ') слишком длинный !!!');
			}
		}
	}

// Проверка элементов массива на идентичные записи не регистрозависимые..
	function checkMatchingArrayElement(arr) {
		var hashtagsCoincidence = [];
		arr.forEach(function(val, index){
			var hashtags = val.toLowerCase();
			if(index !== arr.lastIndexOf(hashtags) && hashtagsCoincidence.indexOf(hashtags) === -1)
				hashtagsCoincidence.push(hashtags);
		});
		if(hashtagsCoincidence.length !== 0){
			alert('Имеются одинаковые хэштеги!!!');
		}
	}

// Обработка Хэштэгов на валидность в поле хэштэг
	function uploadFormHashtagsChangeHandler() {
		var uploadFormHashtagsValue = this.value.split(' ');
		checkLengthArray(uploadFormHashtagsValue);
		checkLengthArrayElement(uploadFormHashtagsValue);
		checkMatchingArrayElement(uploadFormHashtagsValue);
	}
	uploadFormHashtags.addEventListener('change', uploadFormHashtagsChangeHandler);

// Обработка коментария на валидность.
	function uploadFormDescriptionChangeHandler (){
		var uploadFormDescriptionValue = this.value;
		if (uploadFormDescriptionValue.length > 140){
			// alert('Ваш комментарий слишком большой!!!');
			uploadFormDescription.style.borderColor = 'red';
		}else {
			uploadFormDescription.style.borderColor = '';
		}
	}
	uploadFormDescription.addEventListener('change',uploadFormDescriptionChangeHandler);
	
	// Отмена события по нажатию на кнопку ESC при фокусе в поле комментарий.
	uploadFormDescription.addEventListener('focus', function () {
		document.removeEventListener('keydown',form.escKeydownHandler);
	});

// Возврат события по нажатию на кнопку ESC при потере фокуса поля комментария.
	uploadFormDescription.addEventListener('blur', function () {
		document.addEventListener('keydown',form.escKeydownHandler);
	});
})();
