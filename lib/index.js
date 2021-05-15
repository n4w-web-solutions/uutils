"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.uutils2021 = function () {
    return {
        /*
        How to hide all elements specified?
        EXAMPLE: hide(document.querySelectorAll('img')); // Hides all <img> elements on the page
        */
        "hide": function hide() {
            for (var _len = arguments.length, el = Array(_len), _key = 0; _key < _len; _key++) {
                el[_key] = arguments[_key];
            }

            return [].concat(el).forEach(function (e) {
                return e.style.display = 'none';
            });
        },
        /*
        How to check if the element has the specified class?
        EXAMPLE: hasClass(document.querySelector('p.special'), 'special'); // true
        */
        "hasclass": function hasclass(el, className) {
            return el.classList.contains(className);
        },
        /*
        How to toggle a class for an element?
        EXAMPLE: toggleClass(document.querySelector('p.special'), 'special'); // The paragraph will not have the 'special' class anymore
        */
        "toogleClass": function toogleClass(el, className) {
            return el.classList.toggle(className);
        },
        /*
        How to get the scroll position of the current page?
        EXAMPLE: getScrollPosition(); // {x: 0, y: 200}
        */
        "getScrollPosition": function getScrollPosition() {
            var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
            return {
                x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
                y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
            };
        },
        /*
        How to smooth-scroll to the top of the page?
        EXAMPLE: scrollToTop();
        */
        "scrollToTop": function (_scrollToTop) {
            function scrollToTop() {
                return _scrollToTop.apply(this, arguments);
            }

            scrollToTop.toString = function () {
                return _scrollToTop.toString();
            };

            return scrollToTop;
        }(function () {
            var c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        }),
        /*
        How to check if the parent element contains the child element?
        EXAMPLE 1: elementContains(document.querySelector('head'), document.querySelector('title')); // true
        EXAMPLE 2: elementContains(document.querySelector('body'), document.querySelector('body')); // false
        */
        "elementContains": function elementContains(parent, child) {
            return parent !== child && parent.contains(child);
        },
        /*
        How to check if the element specified is visible in the viewport?
        EXAMPLE 1: elementIsVisibleInViewport(el); // (not fully visible)
        EXAMPLE 2: elementIsVisibleInViewport(el, true); // (partially visible)
        */
        "elementIsVisibleInViewport": function elementIsVisibleInViewport(el) {
            var partiallyVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var _el$getBoundingClient = el.getBoundingClientRect(),
                top = _el$getBoundingClient.top,
                left = _el$getBoundingClient.left,
                bottom = _el$getBoundingClient.bottom,
                right = _el$getBoundingClient.right;

            var _window = window,
                innerHeight = _window.innerHeight,
                innerWidth = _window.innerWidth;

            return partiallyVisible ? (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
        },
        /*
        How to fetch all images within an element?
        EXAMPLE 1: getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
        EXAMPLE 2: getImages(document, false); // ['image1.jpg', 'image2.png', '...']
        */
        "getImages": function getImages(el) {
            var includeDuplicates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var images = [].concat(_toConsumableArray(el.getElementsByTagName('img'))).map(function (img) {
                return img.getAttribute('src');
            });
            return includeDuplicates ? images : [].concat(_toConsumableArray(new Set(images)));
        },
        /*
        How to figure out if the device is a mobile device or a desktop/laptop?
        EXAMPLE 1: detectDeviceType(); // "Mobile" or "Desktop"
        */
        "detectDeviceType": function detectDeviceType() {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
            );
        },
        /*
        How to get the current URL?
        EXMAPLE: currentURL(); // 'https://google.com'
        */
        "currentURL": function currentURL() {
            return window.location.href;
        },
        /*
        How to create an object containing the parameters of the current URL?
        EXAMPLE 1: getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
        EXAMPLE 2: getURLParameters('google.com'); // {}
        */
        "getURLParameteres": function getURLParameteres(url) {
            return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function (a, v) {
                return a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a;
            }, {});
        },
        /*
        How to retrieve a set of properties indicated by the given selectors from an object?
        EXAMPLE:
            const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };
            get(obj, 'selector.to.val', 'target[0]', 'target[2].a'); // ['val to select', 1, 'test']
        */
        "get": function get(from) {
            for (var _len2 = arguments.length, selectors = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                selectors[_key2 - 1] = arguments[_key2];
            }

            return [].concat(selectors).map(function (s) {
                return s.replace(/\[([^\[\]]*)\]/g, '.$1.').split('.').filter(function (t) {
                    return t !== '';
                }).reduce(function (prev, cur) {
                    return prev && prev[cur];
                }, from);
            });
        },
        /*
        How to invoke the provided function after wait (in milliseconds)?
        EXAMPLE: delay((t) => console.log(t)), 1000, 'later')
        */
        "delay": function delay(fn, wait) {
            for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                args[_key3 - 2] = arguments[_key3];
            }

            return setTimeout.apply(undefined, [fn, wait].concat(args));
        },
        /*
        How to trigger a specific event on a given element, optionally passing custom data?
        EXAMPLE 1: triggerEvent(document.getElementById('myId'), 'click');
        EXAMPLE 2: triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });
        */
        "triggerEvent": function triggerEvent(el, eventType, detail) {
            return el.dispatchEvent(new CustomEvent(eventType, { detail: detail }));
        },
        /*
        How to remove an event listener from an element?
        EXAMPLE:
            const fn = () => console.log('!');
            document.body.addEventListener('click', fn);
            off(document.body, 'click', fn); // no longer logs '!' upon clicking on the page 
        */
        "off": function off(el, evt, fn) {
            var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            return el.removeEventListener(evt, fn, opts);
        },
        "on": function on(el, evt, fn) {
            var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            return el.addEventListener(evt, fn, opts);
        },
        /*
        How to get readable format of the given number of milliseconds?
        EXAMPLE 1: formatDuration(1001); // '1 second, 1 millisecond'
        EXAMPLE 2: formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
        */
        "formatDuration": function formatDuration(ms) {
            if (ms < 0) ms = -ms;
            var time = {
                day: Math.floor(ms / 86400000),
                hour: Math.floor(ms / 3600000) % 24,
                minute: Math.floor(ms / 60000) % 60,
                second: Math.floor(ms / 1000) % 60,
                millisecond: Math.floor(ms) % 1000
            };
            return Object.entries(time).filter(function (val) {
                return val[1] !== 0;
            }).map(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    val = _ref2[1];

                return val + " " + key + (val !== 1 ? 's' : '');
            }).join(', ');
        },
        /*
        How to get the difference (in days) between two dates?
        EXAMPLE: getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
        */
        "getDaysDiffBetweenDates": function getDaysDiffBetweenDates(dateInitial, dateFinal) {
            return (dateFinal - dateInitial) / (1000 * 3600 * 24);
        },
        /*
        How to make a GET request to the passed URL?
        EXAMPLE: httpGet(
            'https://jsonplaceholder.typicode.com/posts/1',
            console.log
        ); // Logs: {"userId": 1, "id": 1, "title": "sample title", "body": "my text"}
        */
        "httpGet": function httpGet(url, callback) {
            var err = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.error;

            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function () {
                return callback(request.responseText);
            };
            request.onerror = function () {
                return err(request);
            };
            request.send();
        },
        /*
        How to make a POST request to the passed URL?
        EXAMPLE:
            const newPost = {
                userId: 1,
                id: 1337,
                title: 'Foo',
                body: 'bar bar bar'
            };
            const data = JSON.stringify(newPost);
            httpPost(
                'https://jsonplaceholder.typicode.com/posts',
                data,
                console.log
            ); // Logs: {"userId": 1, "id": 1337, "title": "Foo", "body": "bar bar bar"}        
        */
        "httpPost": function httpPost(url, data, callback) {
            var err = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : console.error;

            var request = new XMLHttpRequest();
            request.open('POST', url, true);
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.onload = function () {
                return callback(request.responseText);
            };
            request.onerror = function () {
                return err(request);
            };
            request.send(data);
        },
        /*
        How to create a counter with the specified range, step and duration for the specified selector?
        EXAMPLE: counter('#my-id', 1, 1000, 5, 2000); // Creates a 2-second timer for the element with id="my-id"
        */
        "counter": function counter(selector, start, end) {
            var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var duration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2000;

            var current = start,
                _step = (end - start) * step < 0 ? -step : step,
                timer = setInterval(function () {
                current += _step;
                document.querySelector(selector).innerHTML = current;
                if (current >= end) document.querySelector(selector).innerHTML = end;
                if (current >= end) clearInterval(timer);
            }, Math.abs(Math.floor(duration / (end - start))));
            return timer;
        },
        /*
        How to copy a string to the clipboard?
        EXAMPLE: copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.        
        */
        "copyToClipboard": function copyToClipboard(str) {
            var el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            if (selected) {
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(selected);
            }
        },
        /*
        How to find out if the browser tab of the page is focused?
        EXAMPLE: isBrowserTabFocused(); // true
        */
        "isBrowserTabFocused": function isBrowserTabFocused() {
            return !document.hidden;
        }
    };
};