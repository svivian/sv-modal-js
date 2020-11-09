// load namespace
SV = window.SV || {};

SV.Modal = function(modalId, params) {

	// private members

	var modal = null;
	var titleElem = null;
	var contentElem = null;

	// private methods

	var createModal = function(id) {
		// modal inner HTML
		var modalHtml =
			'<div class="modal">' +
				'<span class="modal-close" title="Close">&times;</span>' +
				'<h3 class="modal-title"></h3>' +
				'<div class="modal-content"></div>' +
			'</div>';

		modal = document.createElement('div');
		modal.id = id;
		modal.classList.add('modal-wrapper');
		modal.innerHTML = modalHtml;
		document.querySelector('body').appendChild(modal);

		titleElem = modal.querySelector('.modal-title');
		contentElem = modal.querySelector('.modal-content');

		// remove content on fade out
		modal.addEventListener('transitionend', function(ev) {
			if (modal.classList.contains('visible'))
				return;

			if (titleElem)
				titleElem.innerHTML = '';
			if (contentElem)
				contentElem.innerHTML = '';
		});

		document.addEventListener('click', function(ev) {
			var classes = ev.target.classList;
			if (classes.contains('modal-wrapper') || classes.contains('modal-close'))
				closeModal();
		});
	};

	var closeModal = function() {
		if (!modal)
			return;

		modal.classList.remove('visible');
	};

	// constructor

	createModal(modalId);

	// public api

	return {

		inject: function (content, title) {
			if (!modal)
				return;

			if (titleElem)
				titleElem.innerHTML = title;
			if (contentElem)
				contentElem.innerHTML = content;
		},

		show: function () {
			if (!modal)
				return;

			modal.classList.add('visible');
		},

		close: function () {
			closeModal();
		}
	};

};
