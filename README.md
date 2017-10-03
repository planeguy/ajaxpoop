# ajaxpoop
because i don't like your ajax microframework i want headers and status dammit

# DEPRICATED just use a fetch like unfetch or just fetch if you're ~ bold ~
it's good stuff and much better than $.ajax(). I'll keep this here for my legacy pojects using this and you can see that I once made a fetch-like for fun and non-profit

## use
```js
import poop from 'vendor/ajaxpoop';
```
```js
poop('http://google.com')
.get()
.then((xhr)=>{
    console.log(xhr.response);
});
```
```js
poop('http://my-service/things/3')
.put(thing)
.then((xhr)=>{
    if(xhr.status=200) console.log('saved!');
    else console.log(xhr.status, xhr.statusText);
});
```
```js
poop('http://my-service/things')
.header('Accept', 'application/json')
.withCred(true)
.post(thing)
.then((xhr)=>{
    if(xhr.status=201) console.log('created!', xhr.getResponseHeader('Location'));
    else console.log(xhr.status, xhr.statusText);
});
```
```js
poop('http://google.com?manageyourownurlstuff=yes#upyours')
.header('If-Modified-Since','2015-02-01T13:53:00.000Z')
.get()
.then((xhr)=>{
    if(xhr.status===304) console.log('unchanged.');
    else console.log('changed!');
}).catch((err)=>{
    console.log('dammit');
});
```
```js
poop('http://google.com/some-bad-resource')
.errorOn((xhr)=>{ return xhr.status===404; })
.get((xhr)=>{
    if(xhr.status===404) console.log('You\'ll never see this because we error on 404s.');
    console.log('No error!');
}).catch((err)=>{
    console.log('An error ocurred');
    if(err.xhr && err.xhr.status===404) console.log('We get the xhr in the error so we can see if it\'s something we expect or not');
});
        
```
## don't have es6
in the release, there is a version transpiled to es5 using <s>6to5</s>babel (ajaxpoop-es5.js). the only thing in the babel polyfill I actually use is promises, so you can use the babel polyfill if you like large js files **or** you can use *any other* promises polyfill (I like to [lie](https://github.com/calvinmetcalf/lie)), but more importantly 9.81 jiggawatts marty welcome to the fucking future maybe you'll enjoy not thrashing around in asynchronous callback hell.

but seriously it's 2016 just use jspm and rocket face-first into last year like a pro
