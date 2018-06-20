(function () {
function message(mess) {
	var node = document.createElement('div');
	var paragraf = document.createElement('p');
	var button = document.createElement('button');
	document.body.insertAdjacentElement('afterbegin', node);
	node.style = ' z-index: 100px; border-radius: 5px; width: 200px; position: absolute; left: 45%; top: 40%; background-color: #969696; ';
	// node.innerHTML = '<p style="text-align: center; ">' + errorMessage + '</p>';
	paragraf.style = 'text-align: center; color: #fff;';
	paragraf.textContent = mess;
	button.style = 'background-color: #6AA0E2; margin: 0 0 10px 65p; border: none; border-radius: 5px; color: #ccc;';
	button.textContent = 'закрыть';
	node.appendChild(paragraf);
	node.appendChild(button);
}
message('загруженно');
})();
