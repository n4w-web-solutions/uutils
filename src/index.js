module.exports = () => {
    return {
        /*
        How to hide all elements specified?
        EXAMPLE: hide(document.querySelectorAll('img')); // Hides all <img> elements on the page
        */
        "hide": (...el) => [...el].forEach(e => (e.style.display = 'none')),
        /*
        How to check if the element has the specified class?
        EXAMPLE: hasClass(document.querySelector('p.special'), 'special'); // true
        */
        "hasclass": (el, className) => el.classList.contains(className),
        /*
        How to toggle a class for an element?
        EXAMPLE: toggleClass(document.querySelector('p.special'), 'special'); // The paragraph will not have the 'special' class anymore
        */
        "toogleClass": (el, className) => el.classList.toggle(className),
        /*
        How to get the scroll position of the current page?
        EXAMPLE: getScrollPosition(); // {x: 0, y: 200}
        */
        "getScrollPosition": (el = window) => ({
            x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
            y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
        }),
        /*
        How to smooth-scroll to the top of the page?
        EXAMPLE: scrollToTop();
        */
        "scrollToTop": () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        },
        /*
        How to check if the parent element contains the child element?
        EXAMPLE 1: elementContains(document.querySelector('head'), document.querySelector('title')); // true
        EXAMPLE 2: elementContains(document.querySelector('body'), document.querySelector('body')); // false
        */
        "elementContains": (parent, child) => parent !== child && parent.contains(child),
        /*
        How to check if the element specified is visible in the viewport?
        EXAMPLE 1: elementIsVisibleInViewport(el); // (not fully visible)
        EXAMPLE 2: elementIsVisibleInViewport(el, true); // (partially visible)
        */
        "elementIsVisibleInViewport": (el, partiallyVisible = false) => {
            const { top, left, bottom, right } = el.getBoundingClientRect();
            const { innerHeight, innerWidth } = window;
            return partiallyVisible
                ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
                ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
            : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
        },
        /*
        How to fetch all images within an element?
        EXAMPLE 1: getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
        EXAMPLE 2: getImages(document, false); // ['image1.jpg', 'image2.png', '...']
        */
        "getImages": (el, includeDuplicates = false) => {
            const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'));
            return includeDuplicates ? images : [...new Set(images)];
        },
        /*
        How to figure out if the device is a mobile device or a desktop/laptop?
        EXAMPLE 1: detectDeviceType(); // "Mobile" or "Desktop"
        */
        "detectDeviceType": () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        /*
        How to get the current URL?
        EXMAPLE: currentURL(); // 'https://google.com'
        */
        "currentURL": () => window.location.href,
        /*
        How to create an object containing the parameters of the current URL?
        EXAMPLE 1: getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
        EXAMPLE 2: getURLParameters('google.com'); // {}
        */
        "getURLParameteres": (url) =>
            (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
                (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
                {}
            ),
        /*
        How to retrieve a set of properties indicated by the given selectors from an object?
        EXAMPLE:
            const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };
            get(obj, 'selector.to.val', 'target[0]', 'target[2].a'); // ['val to select', 1, 'test']
        */
        "get": (from, ...selectors) =>
            [...selectors].map(s =>
                s
                .replace(/\[([^\[\]]*)\]/g, '.$1.')
                .split('.')
                .filter(t => t !== '')
                .reduce((prev, cur) => prev && prev[cur], from)
            ),
        /*
        How to invoke the provided function after wait (in milliseconds)?
        EXAMPLE: delay((t) => console.log(t)), 1000, 'later')
        */
        "delay": (fn, wait, ...args) => setTimeout(fn, wait, ...args),
        /*
        How to trigger a specific event on a given element, optionally passing custom data?
        EXAMPLE 1: triggerEvent(document.getElementById('myId'), 'click');
        EXAMPLE 2: triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });
        */
        "triggerEvent": (el, eventType, detail) => el.dispatchEvent(new CustomEvent(eventType, { detail })),
        /*
        How to remove an event listener from an element?
        EXAMPLE:
            const fn = () => console.log('!');
            document.body.addEventListener('click', fn);
            off(document.body, 'click', fn); // no longer logs '!' upon clicking on the page 
        */
        "off": (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts),
        "on": (el, evt, fn, opts = false) => el.addEventListener(evt, fn, opts),
        /*
        How to get readable format of the given number of milliseconds?
        EXAMPLE 1: formatDuration(1001); // '1 second, 1 millisecond'
        EXAMPLE 2: formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
        */
        "formatDuration": ms => {
            if (ms < 0) ms = -ms;
            const time = {
                day: Math.floor(ms / 86400000),
                hour: Math.floor(ms / 3600000) % 24,
                minute: Math.floor(ms / 60000) % 60,
                second: Math.floor(ms / 1000) % 60,
                millisecond: Math.floor(ms) % 1000
            };
            return Object.entries(time)
                .filter(val => val[1] !== 0)
                .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
                .join(', ');
        },
        /*
        How to get the difference (in days) between two dates?
        EXAMPLE: getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
        */
        "getDaysDiffBetweenDates": (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24),
        /*
        How to make a GET request to the passed URL?
        EXAMPLE: httpGet(
            'https://jsonplaceholder.typicode.com/posts/1',
            console.log
        ); // Logs: {"userId": 1, "id": 1, "title": "sample title", "body": "my text"}
        */
        "httpGet": (url, callback, err = console.error) => {
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = () => callback(request.responseText);
            request.onerror = () => err(request);
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
        "httpPost": (url, data, callback, err = console.error) => {
            const request = new XMLHttpRequest();
            request.open('POST', url, true);
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.onload = () => callback(request.responseText);
            request.onerror = () => err(request);
            request.send(data);
        },
        /*
        How to create a counter with the specified range, step and duration for the specified selector?
        EXAMPLE: counter('#my-id', 1, 1000, 5, 2000); // Creates a 2-second timer for the element with id="my-id"
        */
        "counter": (selector, start, end, step = 1, duration = 2000) => {
            let current = start,
            _step = (end - start) * step < 0 ? -step : step,
            timer = setInterval(() => {
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
        "copyToClipboard": (str) => {
            const el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
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
        "isBrowserTabFocused": () => !document.hidden
    }    
}
