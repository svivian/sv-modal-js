
sv-modal
=================================================

**sv-modal** is a vanilla JavaScript plugin for displaying modal dialogs. It can be used for alerts, lightboxes and more.

Pass in an ID to use for the modal, then in your click handler add your desired content using the `inject` method and `show` the modal. Example:

	<a id="modalLink" href="#">Show a modal window</a>

	<script src="sv-modal.js"></script>
	<script>
	// set up the modal
	var modal = new SV.Modal('my-modal');

	// trigger the modal
	document.getElementById('modalLink').addEventListener('click', function(ev) {
		ev.preventDefault();

		// inject some content
		var html = '<p>Here are some random numbers.</p>';
		for ( var i = 0; i < 10; i++ )
			html += Math.random() + '<br>';
		modal.inject(html, 'Hello, world!');

		modal.show();
	});
	</script>

See `example.html` for a demo.
