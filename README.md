# uutils

uutils is a small library to help you automatically load libraries into a single namespace. 


```sh
$ npm install uutils
```

## Example usage

```js
const uutils = require('uutils2021');

/* How to hde all elements specified? */
uutils.hide(document.querySelectorAll('img')); // Hides all <img> elements on the page

/* How to check if the element has the specified class? */
uutils.hasClass(document.querySelector('p.special'), 'special'); // true

/* How to toggle a class for an element? */
uutils.toggleClass(document.querySelector('p.special'), 'special'); // The paragraph will not have the 'special' class anymore

/* How to get the scroll position of the current page? */
uutils.getScrollPosition(); // {x: 0, y: 200}

/* How to smooth-scroll to the top of the page? */
uutils.scrollToTop();

/* How to check if the parent element contains the child element? */
uutils.elementContains(document.querySelector('head'), document.querySelector('title')); // true
uutils.elementContains(document.querySelector('body'), document.querySelector('body')); // false

/* How to check if the element specified is visible in the viewport? */
uutils.elementIsVisibleInViewport(el); // (not fully visible)
uutils.elementIsVisibleInViewport(el, true); // (partially visible)

/* How to fetch all images within an element? */
uutils.getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
uutils.getImages(document, false); // ['image1.jpg', 'image2.png', '...']

/* How to figure out if the device is a mobile device or a desktop/laptop? */
uutils.detectDeviceType(); // "Mobile" or "Desktop"

/* How to get the current URL? */
uutils.currentURL(); // 'https://www.n4w.com.br'

/* How to create an object containing the parameters of the current URL? */
uutils.getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
uutils.getURLParameters('google.com'); // {}

/* How to retrieve a set of properties indicated by the given selectors from an object? */
const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };
uutils.get(obj, 'selector.to.val', 'target[0]', 'target[2].a'); // ['val to select', 1, 'test']

/* How to invoke the provided function after wait (in milliseconds)? */
uutils.delay((t) => console.log(t)), 1000, 'later')

/* How to trigger a specific event on a given element, optionally passing custom data? */
uutils.triggerEvent(document.getElementById('myId'), 'click');
uutils.triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });

/* How to remove an event listener from an element? */
const fn = () => console.log('!');
document.body.addEventListener('click', fn);
uutils.off(document.body, 'click', fn); // no longer logs '!' upon clicking on the page 

/* How to add an event listener from an element? */
uutils.on(document.body, 'click', fn);

/* How to get readable format of the given number of milliseconds? */
uutils.formatDuration(1001); // '1 second, 1 millisecond'
uutils.formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

/* How to get the difference (in days) between two dates? */
uutils.getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

/* How to make a GET request to the passed URL? */
uutils.httpGet('https://jsonplaceholder.typicode.com/posts/1', console.log); // Logs: {"userId": 1, "id": 1, "title": "sample title", "body": "my text"}

/* How to make a POST request to the passed URL? */
uutils.httpPost(
    'https://jsonplaceholder.typicode.com/posts',
    JSON.stringify({
        userId: 1,
        id: 1337,
        title: 'Foo',
        body: 'bar bar bar'
    }),
    console.log
); // Logs: {"userId": 1, "id": 1337, "title": "Foo", "body": "bar bar bar"} 

/* How to create a counter with the specified range, step and duration for the specified selector? */
uutils.counter('#my-id', 1, 1000, 5, 2000); // Creates a 2-second timer for the element with id="my-id"

/* How to copy a string to the clipboard? */
uutils.copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

/* How to find out if the browser tab of the page is focused? */
uutils.isBrowserTabFocused(); // true
```
