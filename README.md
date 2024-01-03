
SV-Modal
=================================================

**sv-modal-js** is a vanilla JavaScript plugin for displaying modal dialogs. It can be used for alerts, lightboxes and more. See `demo/example.html` for a demo. Styling is provided in the Sass file, or grab the compiled CSS from the demo folder.

Pass in an ID to use for the modal, then in your click handler add your desired content using the `inject` method and `show` the modal. Example:

```html
<button id="modalLink">Show a modal window</button>

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


## Methods

The object returned from `new SV.Modal()` has the following methods:

- **`inject(content, title)`** - add content to the modal and set the title.
- **`show()`** - show the modal.
- **`close()`** - manually hide the modal. Triggers the `sv.modal.close` event (see below).
- **`getModalElement()`** - get the DOM element containing the modal.
- **`getContentElement()`** - get the DOM element containing the modal's content.
- **`getTitleElement()`** - get the DOM element containing the modal's title.
- **`resizeContent(width, height)`** - manually resize the modal to a specific (pixel) size. Triggers the `sv.modal.resize` event (see below).


## Options

The second argument to the constructor is an object of options. There's currently one option:

- **`cssAnimTime`**- this should be set to the same time that the CSS transitions last for, in milliseconds. Defaults to `400`.

Note that this **does not** change the actual length of the transitions - those are specified in CSS - it is only used to delay the firing of the events. The reason for this is that hooking into transition events with JS is unreliable and suffers from race conditions.


## Events

There are also two events you can hook into. For reasons described above they are fired after a short delay (default 400ms), which is after the CSS transitions should have ended.

- **`sv.modal.close`** is fired after the modal has fully closed (faded out). As the plugin creates the modal element itself you'll need to get it first with `getModalElement()` then attach the listener. Example:

	```js
	modal.getModalElement().addEventListener('sv.modal.close', function (ev) {
		console.log('Closed the modal');
	});
	```

- **`sv.modal.resize`** is fired after a call to `resizeContent`, when the animation has finished. An example use case would be for an image lightbox, where we get the image's width/height and resize the modal to fit:

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
