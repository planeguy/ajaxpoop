#ajaxpoop
because i don't like your ajax microframework i need headers and status dammit

##use
```js
import ajax from 'vendor/ajaxpoop';
```
```js
ajax('http://google.com')
.get()
.then((xhr)=>{
    console.log(xhr.response);
});
```
```js
ajax('http://my-service/things/3')
.put(thing)
.then((xhr)=>{
    if(xhr.status=200) console.log('saved!');
    else console.log(xhr.status, xhr.statusText);
});
```
```js
ajax('http://my-service/things')
.header('Accept', 'application/json')
.useCredentials(true)
.post(thing)
.then((xhr)=>{
    if(xhr.status=201) console.log('created!', xhr.getResponseHeader('Location'));
    else console.log(xhr.status, xhr.statusText);
});
```
```js
ajax('http://google.com')
.header('If-Modified-Since','2015-02-01T13:53:00.000Z')
.get()
.then((xhr)=>{
    if(xhr.status===304) console.log('unchanged.');
    else console.log('changed!');
}).catch((err)=>{
    console.log('dammit');
});
```
##don't have es6
in the release, there is a version transpiled to es5 using 6to5 (ajaxpoop-es5.js). you can use the 6to5 polyfill or any other promises polyfill, but 9.81 jiggawatts marty welcome to the future maybe you'll enjoy not thrashing around in asynchronous callback hell
