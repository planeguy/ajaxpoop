"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

module.exports = poop;
function r(m, u, d, h, c) {
    return new Promise(function (resolve, rejext) {
        var x = new XMLHttpRequest();
        x.open(m.toUpperCase(), u, true);

        x.onreadystatechange = function (e) {
            switch (x.readyState) {
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                case 4:
                    resolve(x);
            }
        };
        x.ontimeout = function (e) {
            reject("timed out");
        };


        var ks = Object.keys(h).filter(function (j) {
            return h.hasOwnProperty(j);
        });
        ks.map(function (k) {
            x.setRequestHeader(k, h[k]);
        });
        if (c) x.withCredentials = c;

        if (d) x.send(d);else x.send();
    });
}

var req = (function () {
    function req(u) {
        _classCallCheck(this, req);

        this.u = u;
        this.h = {};
        this.c = false;
    }

    _prototypeProperties(req, null, {
        header: {
            value: function header(k, v) {
                this.h.k = v;
                return this;
            },
            writable: true,
            configurable: true
        },
        withCredentials: {
            value: function withCredentials(c) {
                this.c = c;
                return this;
            },
            writable: true,
            configurable: true
        },
        get: {
            value: function get() {
                return r("GET", this.u, undefined, this.h, this.c);
            },
            writable: true,
            configurable: true
        },
        put: {
            value: function put(d) {
                if (!this.h["Content-Type"]) this.h["Content-Type"] = "application/json";
                return r("PUT", this.u, d, this.h, this.c);
            },
            writable: true,
            configurable: true
        },
        post: {
            value: function post(d) {
                if (!this.h["Content-Type"]) this.h["Content-Type"] = "application/json";
                return r("POST", this.u, d, this.h, this.c);
            },
            writable: true,
            configurable: true
        },
        "delete": {
            value: function _delete() {
                return r("DELETE", this.u, undefined, this.h, this.c);
            },
            writable: true,
            configurable: true
        }
    });

    return req;
})();

function poop(u) {
    return new req(u);
}