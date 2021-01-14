
sv-modal
=================================================

**sv-modal** is a vanilla JavaScript plugin for displaying modal dialogs. It can be used for alerts, lightboxes and more. See `example.html` for a demo.

Pass in an ID to use for the modal, then in your click handler add your desired content using the `inject` method and `show` the modal. Example:

```html
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
```

### Methods

- `getModalElement()` - get the DOM element containing the modal.
- `getContentElement()` - get the DOM element containing the modal's content.
- `getTitleElement()` - get the DOM element containing the modal's title.
- `inject(content, title)` - add content to the modal and set the title.
- `show()` - show the modal.
- `close()` - manually hide the modal. Triggers `sv.modal.close` (see below).
- `resizeContent(width, height)` - manually resize the modal to a specific (pixel) size. Triggers `sv.modal.resize` (see below).

### Events

There are also two events you can hook into. Note that both these events require the CSS transitions in place.

The first event is `sv.modal.close` which is fired after the modal has fully closed (faded out). As the plugin creates the modal element itself you'll need to get it first with `getModalElement()` then attach the listener. Example:

```js
modal.getModalElement().addEventListener('sv.modal.close', function (ev) {
	console.log('Closed the modal');
});
```

The second event is `sv.modal.resize` which is fired after a call to `resizeContent`, when the animation has finished. An example use case would be for an image lightbox:

```js
var img = new Image();
img.addEventListener('load', function() {
	modal.resizeContent(img.width, img.height);
});

modal.getModalElement().addEventListener('sv.modal.resize', function (ev) {
	modal.inject(img, 'Image title');
});

// trigger load event, which in turn triggers resize event
img.src = 'example.jpg';
```
