// load namespace
SV = window.SV || {};

SV.Modal = (function() {

	// constructor
	return function(modalId) {

		// private members

		var modal;
		var titleElem;
		var contentElem;
		var animTime = 400;

		// private methods

		var init = function(modalId) {
			// modal inner HTML
			var modalHtml =
				'<div class="modal">' +
					'<span class="modal-close" title="Close">&times;</span>' +
					'<h3 class="modal-title"></h3>' +
					'<div class="modal-content"></div>' +
				'</div>';

			modal = document.createElement('div');
			modal.id = modalId;
			modal.classList.add('modal-wrapper');
			modal.innerHTML = modalHtml;
			document.querySelector('body').appendChild(modal);

			titleElem = modal.querySelector('.modal-title');
			contentElem = modal.querySelector('.modal-content');

			// handle clicks on close button and background
			modal.addEventListener('click', function(ev) {
				var classes = ev.target.classList;
				if (classes.contains('modal-wrapper') || classes.contains('modal-close'))
					methods.close();
			});
		};


		// public methods

		var methods = {};

		methods.getModalElement = function() {
			return modal;
		};

		methods.getContentElement = function() {
			return contentElem;
		};

		methods.getTitleElement = function() {
			return titleElem;
		};

		methods.inject = function (content, title) {
			if (!modal)
				return;

			if (titleElem)
				titleElem.innerHTML = title;
			if (contentElem)
				contentElem.innerHTML = content;
		};

		methods.show = function () {
			if (!modal)
				return;

			modal.classList.add('visible');
		};

		methods.close = function () {
			if (!modal)
				return;

			modal.classList.remove('visible');

			// delay event to allow transitions to complete (hooking into transitionend is unreliable)
			setTimeout(function(ev) {
				// remove content
				if (titleElem)
					titleElem.innerHTML = '';
				if (contentElem)
					contentElem.innerHTML = '';

				modal.dispatchEvent(new CustomEvent('sv.modal.close'));
			}, animTime);
		};

		methods.resizeContent = function (width, height) {
			if (!modal)
				return;

			// explicitly set current size of modal, so that CSS transitions work
			contentElem.style.width = contentElem.offsetWidth + 'px';
			contentElem.style.height = contentElem.offsetHeight + 'px';

			if (width && height) {
				contentElem.style.width = width + 'px';
				contentElem.style.height = height + 'px';
			}

			// delay event to allow transitions to complete (hooking into transitionend is unreliable)
			setTimeout(function(ev) {
				modal.dispatchEvent(new CustomEvent('sv.modal.resize'));
			}, animTime);
		};


		init(modalId);

		return methods;
	};

})();
