!function(t,e){if("function"==typeof define&&define.amd)define(["exports","module"],e);else if("undefined"!=typeof exports&&"undefined"!=typeof module)e(exports,module);else{var n={exports:{}};e(n.exports,n),t.ajaxpoop=n.exports}}(this,function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e,n,i,r,o){return new Promise(function(s,u){var a=new XMLHttpRequest;a.open(t,e,!0),a.onreadystatechange=function(){switch(a.readyState){case 4:if(o&&o(a)){var t=new Error("http error "+a.status);t.xhr=a,t.status=a.status,u(t)}else s(a)}},a.ontimeout=function(){u("timed out")},Object.getOwnPropertyNames(i).forEach(function(t){a.setRequestHeader(t,i[t])}),a.withCredentials=r,a.send(n&&"application/json"==i["Content-Type"]?JSON.stringify(n):n)})}function r(t){return new s(t)}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();e.exports=r;var s=function(){function t(e){var i=this;n(this,t),this.u=e,this.h={},this.c=!1,this.p={},this.s=void 0;var r=["get","head","trace","options","delete"],o=["put","post","patch"];r.forEach(function(t){i[t]=function(){return i.getlike(t.toUpperCase())}}),o.forEach(function(t){i[t]=function(e){return i.putlike(t.toUpperCase(),e)}})}return o(t,[{key:"header",value:function(t,e){return this.h[t]=e,this}},{key:"withCred",value:function(t){return this.c=t,this}},{key:"hack",value:function(t){return this.p[t]=!0,this}},{key:"getlike",value:function(t){return i(t,this.u,void 0,this.h,this.c,this.s)}},{key:"putlike",value:function(t,e){return this.h["Content-Type"]||this.p["no-content-type"]||(this.h["Content-Type"]="application/json"),i(t,this.u,e,this.h,this.c,this.s)}},{key:"errorOn",value:function(t){return this.s=t,this}}]),t}()});