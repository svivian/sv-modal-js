// load namespace
SV = window.SV || {};

SV.Modal = (function() {

	// private members

	var modal = null;
	var titleElem = null;
	var contentElem = null;

	// private methods

	var Constructor = function(modalId, params) {
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

		// remove content on fade out
		modal.addEventListener('transitionend', function(ev) {
			if (modal.classList.contains('visible'))
				return;

			if (titleElem)
				titleElem.innerHTML = '';
			if (contentElem)
				contentElem.innerHTML = '';
		});

		// trigger event on resize
		var eventThrottle = false;
		contentElem.addEventListener('transitionend', function(ev) {
			var validProps = ['width', 'height'];
			if (eventThrottle || !validProps.includes(ev.propertyName))
				return;

			// prevent both width and height triggering event
			eventThrottle = true;
			modal.dispatchEvent(new CustomEvent('sv.modal.resize'));

			// set a timeout to throttle
			setTimeout(function() {
				eventThrottle = false;
			}, 500);
		});

		// handle clicks on close button and background
		var ctor = this;
		document.addEventListener('click', function(ev) {
			var classes = ev.target.classList;
			if (classes.contains('modal-wrapper') || classes.contains('modal-close'))
				ctor.close();
		});
	};

	// public api

	Constructor.prototype.getModalElement = function() {
		return modal;
	};

	Constructor.prototype.getContentElement = function() {
		return contentElem;
	};

	Constructor.prototype.getTitleElement = function() {
		return titleElem;
	};

	Constructor.prototype.inject = function (content, title) {
		if (!modal)
			return;

		if (titleElem)
			titleElem.innerHTML = title;
		if (contentElem)
			contentElem.innerHTML = content;
	};

	Constructor.prototype.show = function () {
		if (!modal)
			return;

		modal.classList.add('visible');
	};

	Constructor.prototype.close = function () {
		if (!modal)
			return;

		modal.classList.remove('visible');

		var closeEvent = new CustomEvent('sv.modal.close');
		modal.dispatchEvent(closeEvent);
	};

	Constructor.prototype.resizeContent = function (width, height) {
		if (!modal)
			return;

		// explicitly set current size of modal, so that CSS transitions work
		contentElem.style.width = contentElem.offsetWidth + 'px';
		contentElem.style.height = contentElem.offsetHeight + 'px';

		if (width && height) {
			contentElem.style.width = width + 'px';
			contentElem.style.height = height + 'px';
		}
	};

	return Constructor;

})();
