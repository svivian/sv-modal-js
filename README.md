
svModal - a jQuery modal window plugin
=================================================

Yawn, yet another modal window plugin...

Usage:

	var $modal = $.svModal('dualtype-popup');

	$('#element').click(function () {
		$modal.inject('The content', 'The title');
		$modal.show();
	});
