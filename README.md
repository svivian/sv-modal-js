
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

### Methods

- `getElement()` - get the DOM element containing the modal.
- `inject(content, title)` - add content to the modal and set the title.
- `resizeContent(width, height, callback)` - manually resize the modal.
- `show()` - show the modal.
- `close()` - hide the modal.

There is also an event you can hook into: `sv.modal.close`. As the plugin creates the modal element itself you'll need to get it first with `getElement()` then attach the listener. Example:

	modal.getElement().addEventListener('sv.modal.close', function (ev) {
		console.log('Closed the modal');
	});

Also see `example.html` for a demo.
