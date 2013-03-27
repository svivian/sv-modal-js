
(function ($) {
	$.extend({

		svModal: function (id) {

			var $modal = null;
			createModal(id);


			function createModal(id) {
				var html =
					'<div id="' + id + '" class="whiteout">' +
						'<div class="modal">' +
							'<span class="modal-close" title="Close">&#x274c;</span>' +
							'<h3 class="modal-title"></h3>' +
							'<div class="modal-content"></div>' +
						'</div>' +
					'</div>';
				$modal = $(html).appendTo('body');

				$('.whiteout, .modal-close').click(function (ev) {
					if ( ev.target == this )
						closeModal();
				});
			}

			function closeModal() {
				if ( !$modal )
					return;
				$modal.fadeOut();
			}

			return {

				inject: function (content, title) {
					if ( !$modal )
						return;

					$('.modal-title', $modal).html(title);
					$('.modal-content', $modal).html(content);
				},

				show: function () {
					if ( !$modal )
						return;

					$modal.fadeIn();
				},

				close: function () {
					closeModal();
				}

			}; // end public return

		} // end svModal function

	});
})(jQuery);
