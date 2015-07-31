/*!
    localForage -- Offline Storage, Improved
    Version 1.2.4
    https://mozilla.github.io/localForage
    (c) 2013-2015 Mozilla, Apache License 2.0
*/
!function(){var a,b,c,d;!function(){var e={},f={};a=function(a,b,c){e[a]={deps:b,callback:c}},d=c=b=function(a){function c(b){if("."!==b.charAt(0))return b;for(var c=b.split("/"),d=a.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}if(d._eak_seen=e,f[a])return f[a];if(f[a]={},!e[a])throw new Error("Could not find module "+a);for(var g,h=e[a],i=h.deps,j=h.callback,k=[],l=0,m=i.length;m>l;l++)k.push("exports"===i[l]?g={}:b(c(i[l])));var n=j.apply(this,k);return f[a]=g||n}}(),a("promise/all",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to all.");return new b(function(b,c){function d(a){return function(b){f(a,b)}}function f(a,c){h[a]=c,0===--i&&b(h)}var g,h=[],i=a.length;0===i&&b([]);for(var j=0;j<a.length;j++)g=a[j],g&&e(g.then)?g.then(d(j),c):f(j,g)})}var d=a.isArray,e=a.isFunction;b.all=c}),a("promise/asap",["exports"],function(a){"use strict";function b(){return function(){process.nextTick(e)}}function c(){var a=0,b=new i(e),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function d(){return function(){j.setTimeout(e,1)}}function e(){for(var a=0;a<k.length;a++){var b=k[a],c=b[0],d=b[1];c(d)}k=[]}function f(a,b){var c=k.push([a,b]);1===c&&g()}var g,h="undefined"!=typeof window?window:{},i=h.MutationObserver||h.WebKitMutationObserver,j="undefined"!=typeof global?global:void 0===this?window:this,k=[];g="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?b():i?c():d(),a.asap=f}),a("promise/config",["exports"],function(a){"use strict";function b(a,b){return 2!==arguments.length?c[a]:void(c[a]=b)}var c={instrument:!1};a.config=c,a.configure=b}),a("promise/polyfill",["./promise","./utils","exports"],function(a,b,c){"use strict";function d(){var a;a="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self;var b="Promise"in a&&"resolve"in a.Promise&&"reject"in a.Promise&&"all"in a.Promise&&"race"in a.Promise&&function(){var b;return new a.Promise(function(a){b=a}),f(b)}();b||(a.Promise=e)}var e=a.Promise,f=b.isFunction;c.polyfill=d}),a("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){if(!v(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof i))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],j(a,this)}function j(a,b){function c(a){o(b,a)}function d(a){q(b,a)}try{a(c,d)}catch(e){d(e)}}function k(a,b,c,d){var e,f,g,h,i=v(c);if(i)try{e=c(d),g=!0}catch(j){h=!0,f=j}else e=d,g=!0;n(b,e)||(i&&g?o(b,e):h?q(b,f):a===D?o(b,e):a===E&&q(b,e))}function l(a,b,c,d){var e=a._subscribers,f=e.length;e[f]=b,e[f+D]=c,e[f+E]=d}function m(a,b){for(var c,d,e=a._subscribers,f=a._detail,g=0;g<e.length;g+=3)c=e[g],d=e[g+b],k(b,c,d,f);a._subscribers=null}function n(a,b){var c,d=null;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(u(b)&&(d=b.then,v(d)))return d.call(b,function(d){return c?!0:(c=!0,void(b!==d?o(a,d):p(a,d)))},function(b){return c?!0:(c=!0,void q(a,b))}),!0}catch(e){return c?!0:(q(a,e),!0)}return!1}function o(a,b){a===b?p(a,b):n(a,b)||p(a,b)}function p(a,b){a._state===B&&(a._state=C,a._detail=b,t.async(r,a))}function q(a,b){a._state===B&&(a._state=C,a._detail=b,t.async(s,a))}function r(a){m(a,a._state=D)}function s(a){m(a,a._state=E)}var t=a.config,u=(a.configure,b.objectOrFunction),v=b.isFunction,w=(b.now,c.all),x=d.race,y=e.resolve,z=f.reject,A=g.asap;t.async=A;var B=void 0,C=0,D=1,E=2;i.prototype={constructor:i,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(a,b){var c=this,d=new this.constructor(function(){});if(this._state){var e=arguments;t.async(function(){k(c._state,d,e[c._state-1],c._detail)})}else l(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}},i.all=w,i.race=x,i.resolve=y,i.reject=z,h.Promise=i}),a("promise/race",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to race.");return new b(function(b,c){for(var d,e=0;e<a.length;e++)d=a[e],d&&"function"==typeof d.then?d.then(b,c):b(d)})}var d=a.isArray;b.race=c}),a("promise/reject",["exports"],function(a){"use strict";function b(a){var b=this;return new b(function(b,c){c(a)})}a.reject=b}),a("promise/resolve",["exports"],function(a){"use strict";function b(a){if(a&&"object"==typeof a&&a.constructor===this)return a;var b=this;return new b(function(b){b(a)})}a.resolve=b}),a("promise/utils",["exports"],function(a){"use strict";function b(a){return c(a)||"object"==typeof a&&null!==a}function c(a){return"function"==typeof a}function d(a){return"[object Array]"===Object.prototype.toString.call(a)}var e=Date.now||function(){return(new Date).getTime()};a.objectOrFunction=b,a.isFunction=c,a.isArray=d,a.now=e}),b("promise/polyfill").polyfill()}(),function(){"use strict";function a(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(c){if("TypeError"!==c.name)throw c;for(var d=w.BlobBuilder||w.MSBlobBuilder||w.MozBlobBuilder||w.WebKitBlobBuilder,e=new d,f=0;f<a.length;f+=1)e.append(a[f]);return e.getBlob(b.type)}}function b(a,b){var c="";if(a&&(c=a.toString()),a&&("[object ArrayBuffer]"===a.toString()||a.buffer&&"[object ArrayBuffer]"===a.buffer.toString())){var d,f=i;a instanceof ArrayBuffer?(d=a,f+=k):(d=a.buffer,"[object Int8Array]"===c?f+=m:"[object Uint8Array]"===c?f+=n:"[object Uint8ClampedArray]"===c?f+=o:"[object Int16Array]"===c?f+=p:"[object Uint16Array]"===c?f+=r:"[object Int32Array]"===c?f+=q:"[object Uint32Array]"===c?f+=s:"[object Float32Array]"===c?f+=t:"[object Float64Array]"===c?f+=u:b(new Error("Failed to get type for BinaryArray"))),b(f+e(d))}else if("[object Blob]"===c){var h=new FileReader;h.onload=function(){var c=g+a.type+"~"+e(this.result);b(i+l+c)},h.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(j){console.error("Couldn't convert value into a JSON string: ",a),b(null,j)}}function c(b){if(b.substring(0,j)!==i)return JSON.parse(b);var c,e=b.substring(v),f=b.substring(j,v);if(f===l&&h.test(e)){var g=e.match(h);c=g[1],e=e.substring(g[0].length)}var w=d(e);switch(f){case k:return w;case l:return a([w],{type:c});case m:return new Int8Array(w);case n:return new Uint8Array(w);case o:return new Uint8ClampedArray(w);case p:return new Int16Array(w);case r:return new Uint16Array(w);case q:return new Int32Array(w);case s:return new Uint32Array(w);case t:return new Float32Array(w);case u:return new Float64Array(w);default:throw new Error("Unkown type: "+f)}}function d(a){var b,c,d,e,g,h=.75*a.length,i=a.length,j=0;"="===a[a.length-1]&&(h--,"="===a[a.length-2]&&h--);var k=new ArrayBuffer(h),l=new Uint8Array(k);for(b=0;i>b;b+=4)c=f.indexOf(a[b]),d=f.indexOf(a[b+1]),e=f.indexOf(a[b+2]),g=f.indexOf(a[b+3]),l[j++]=c<<2|d>>4,l[j++]=(15&d)<<4|e>>2,l[j++]=(3&e)<<6|63&g;return k}function e(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=f[c[b]>>2],d+=f[(3&c[b])<<4|c[b+1]>>4],d+=f[(15&c[b+1])<<2|c[b+2]>>6],d+=f[63&c[b+2]];return c.length%3===2?d=d.substring(0,d.length-1)+"=":c.length%3===1&&(d=d.substring(0,d.length-2)+"=="),d}var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",g="~~local_forage_type~",h=/^~~local_forage_type~([^~]+)~/,i="__lfsc__:",j=i.length,k="arbf",l="blob",m="si08",n="ui08",o="uic8",p="si16",q="si32",r="ur16",s="ui32",t="fl32",u="fl64",v=j+k.length,w=this,x={serialize:b,deserialize:c,stringToBuffer:d,bufferToString:e};"undefined"!=typeof module&&module.exports&&"undefined"!=typeof require?module.exports=x:"function"==typeof define&&define.amd?define("localforageSerializer",function(){return x}):this.localforageSerializer=x}.call(window),function(){"use strict";function a(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(c){if("TypeError"!==c.name)throw c;for(var d=window.BlobBuilder||window.MSBlobBuilder||window.MozBlobBuilder||window.WebKitBlobBuilder,e=new d,f=0;f<a.length;f+=1)e.append(a[f]);return e.getBlob(b.type)}}function b(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;b>e;e++)d[e]=a.charCodeAt(e);return c}function c(a){return new s(function(b,c){var d=new XMLHttpRequest;d.open("GET",a),d.withCredentials=!0,d.responseType="arraybuffer",d.onreadystatechange=function(){return 4===d.readyState?200===d.status?b({response:d.response,type:d.getResponseHeader("Content-Type")}):void c({status:d.status,response:d.response}):void 0},d.send()})}function d(b){return new s(function(d,e){var f=a([""],{type:"image/png"}),g=b.transaction([v],"readwrite");g.objectStore(v).put(f,"key"),g.oncomplete=function(){var a=b.transaction([v],"readwrite"),f=a.objectStore(v).get("key");f.onerror=e,f.onsuccess=function(a){var b=a.target.result,e=URL.createObjectURL(b);c(e).then(function(a){d(!(!a||"image/png"!==a.type))},function(){d(!1)}).then(function(){URL.revokeObjectURL(e)})}}})["catch"](function(){return!1})}function e(a){return"boolean"==typeof u?s.resolve(u):d(a).then(function(a){return u=a})}function f(a){return new s(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function g(c){var d=b(atob(c.data));return a([d],{type:c.type})}function h(a){return a&&a.__local_forage_encoded_blob}function i(a){var b=this,c={db:null};if(a)for(var d in a)c[d]=a[d];return new s(function(a,d){var e=t.open(c.name,c.version);e.onerror=function(){d(e.error)},e.onupgradeneeded=function(a){e.result.createObjectStore(c.storeName),a.oldVersion<=1&&e.result.createObjectStore(v)},e.onsuccess=function(){c.db=e.result,b._dbInfo=c,a()}})}function j(a,b){var c=this;"string"!=typeof a&&(window.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new s(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),i=f.get(a);i.onsuccess=function(){var a=i.result;void 0===a&&(a=null),h(a)&&(a=g(a)),b(a)},i.onerror=function(){d(i.error)}})["catch"](d)});return r(d,b),d}function k(a,b){var c=this,d=new s(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),i=f.openCursor(),j=1;i.onsuccess=function(){var c=i.result;if(c){var d=c.value;h(d)&&(d=g(d));var e=a(d,c.key,j++);void 0!==e?b(e):c["continue"]()}else b()},i.onerror=function(){d(i.error)}})["catch"](d)});return r(d,b),d}function l(a,b,c){var d=this;"string"!=typeof a&&(window.console.warn(a+" used as a key, but it is not a string."),a=String(a));var g=new s(function(c,g){var h;d.ready().then(function(){return h=d._dbInfo,e(h.db)}).then(function(a){return!a&&b instanceof Blob?f(b):b}).then(function(b){var d=h.db.transaction(h.storeName,"readwrite"),e=d.objectStore(h.storeName);null===b&&(b=void 0);var f=e.put(b,a);d.oncomplete=function(){void 0===b&&(b=null),c(b)},d.onabort=d.onerror=function(){var a=f.error?f.error:f.transaction.error;g(a)}})["catch"](g)});return r(g,c),g}function m(a,b){var c=this;"string"!=typeof a&&(window.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new s(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readwrite"),g=f.objectStore(e.storeName),h=g["delete"](a);f.oncomplete=function(){b()},f.onerror=function(){d(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;d(a)}})["catch"](d)});return r(d,b),d}function n(a){var b=this,c=new s(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readwrite"),f=e.objectStore(d.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}})["catch"](c)});return r(c,a),c}function o(a){var b=this,c=new s(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.count();f.onsuccess=function(){a(f.result)},f.onerror=function(){c(f.error)}})["catch"](c)});return r(c,a),c}function p(a,b){var c=this,d=new s(function(b,d){return 0>a?void b(null):void c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=!1,h=f.openCursor();h.onsuccess=function(){var c=h.result;return c?void(0===a?b(c.key):g?b(c.key):(g=!0,c.advance(a))):void b(null)},h.onerror=function(){d(h.error)}})["catch"](d)});return r(d,b),d}function q(a){var b=this,c=new s(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.openCursor(),g=[];f.onsuccess=function(){var b=f.result;return b?(g.push(b.key),void b["continue"]()):void a(g)},f.onerror=function(){c(f.error)}})["catch"](c)});return r(c,a),c}function r(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}var s="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require?require("promise"):this.Promise,t=t||this.indexedDB||this.webkitIndexedDB||this.mozIndexedDB||this.OIndexedDB||this.msIndexedDB;if(t){var u,v="local-forage-detect-blob-support",w={_driver:"asyncStorage",_initStorage:i,iterate:k,getItem:j,setItem:l,removeItem:m,clear:n,length:o,key:p,keys:q};"undefined"!=typeof module&&module.exports&&"undefined"!=typeof require?module.exports=w:"function"==typeof define&&define.amd?define("asyncStorage",function(){return w}):this.asyncStorage=w}}.call(window),function(){"use strict";function a(a){var b=this,c={};if(a)for(var d in a)c[d]=a[d];c.keyPrefix=c.name+"/",b._dbInfo=c;var e=new k(function(a){q===p.DEFINE?require(["localforageSerializer"],a):a(q===p.EXPORT?require("./../utils/serializer"):l.localforageSerializer)});return e.then(function(a){return m=a,k.resolve()})}function b(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=n.length-1;c>=0;c--){var d=n.key(c);0===d.indexOf(a)&&n.removeItem(d)}});return j(c,a),c}function c(a,b){var c=this;"string"!=typeof a&&(window.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo,d=n.getItem(b.keyPrefix+a);return d&&(d=m.deserialize(d)),d});return j(d,b),d}function d(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo.keyPrefix,d=b.length,e=n.length,f=0;e>f;f++){var g=n.key(f),h=n.getItem(g);if(h&&(h=m.deserialize(h)),h=a(h,g.substring(d),f+1),void 0!==h)return h}});return j(d,b),d}function e(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=n.key(a)}catch(e){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return j(d,b),d}function f(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=n.length,d=[],e=0;c>e;e++)0===n.key(e).indexOf(a.keyPrefix)&&d.push(n.key(e).substring(a.keyPrefix.length));return d});return j(c,a),c}function g(a){var b=this,c=b.keys().then(function(a){return a.length});return j(c,a),c}function h(a,b){var c=this;"string"!=typeof a&&(window.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo;n.removeItem(b.keyPrefix+a)});return j(d,b),d}function i(a,b,c){var d=this;"string"!=typeof a&&(window.console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=d.ready().then(function(){void 0===b&&(b=null);var c=b;return new k(function(e,f){m.serialize(b,function(b,g){if(g)f(g);else try{var h=d._dbInfo;n.setItem(h.keyPrefix+a,b),e(c)}catch(i){("QuotaExceededError"===i.name||"NS_ERROR_DOM_QUOTA_REACHED"===i.name)&&f(i),f(i)}})})});return j(e,c),e}function j(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}var k="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require?require("promise"):this.Promise,l=this,m=null,n=null;try{if(!(this.localStorage&&"setItem"in this.localStorage))return;n=this.localStorage}catch(o){return}var p={DEFINE:1,EXPORT:2,WINDOW:3},q=p.WINDOW;"undefined"!=typeof module&&module.exports&&"undefined"!=typeof require?q=p.EXPORT:"function"==typeof define&&define.amd&&(q=p.DEFINE);var r={_driver:"localStorageWrapper",_initStorage:a,iterate:d,getItem:c,setItem:i,removeItem:h,clear:b,length:g,key:e,keys:f};q===p.EXPORT?module.exports=r:q===p.DEFINE?define("localStorageWrapper",function(){return r}):this.localStorageWrapper=r}.call(window),function(){"use strict";function a(a){var b=this,c={db:null};if(a)for(var d in a)c[d]="string"!=typeof a[d]?a[d].toString():a[d];var e=new k(function(a){p===o.DEFINE?require(["localforageSerializer"],a):a(p===o.EXPORT?require("./../utils/serializer"):l.localforageSerializer)}),f=new k(function(d,e){try{c.db=n(c.name,String(c.version),c.description,c.size)}catch(f){return b.setDriver(b.LOCALSTORAGE).then(function(){return b._initStorage(a)}).then(d)["catch"](e)}c.db.transaction(function(a){a.executeSql("CREATE TABLE IF NOT EXISTS "+c.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){b._dbInfo=c,d()},function(a,b){e(b)})})});return e.then(function(a){return m=a,f})}function b(a,b){var c=this;"string"!=typeof a&&(window.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new k(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[a],function(a,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=m.deserialize(d)),b(d)},function(a,b){d(b)})})})["catch"](d)});return j(d,b),d}function c(a,b){var c=this,d=new k(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName,[],function(c,d){for(var e=d.rows,f=e.length,g=0;f>g;g++){var h=e.item(g),i=h.value;if(i&&(i=m.deserialize(i)),i=a(i,h.key,g+1),void 0!==i)return void b(i)}b()},function(a,b){d(b)})})})["catch"](d)});return j(d,b),d}function d(a,b,c){var d=this;"string"!=typeof a&&(window.console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new k(function(c,e){d.ready().then(function(){void 0===b&&(b=null);var f=b;m.serialize(b,function(b,g){if(g)e(g);else{var h=d._dbInfo;h.db.transaction(function(d){d.executeSql("INSERT OR REPLACE INTO "+h.storeName+" (key, value) VALUES (?, ?)",[a,b],function(){c(f)},function(a,b){e(b)})},function(a){a.code===a.QUOTA_ERR&&e(a)})}})})["catch"](e)});return j(e,c),e}function e(a,b){var c=this;"string"!=typeof a&&(window.console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new k(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("DELETE FROM "+e.storeName+" WHERE key = ?",[a],function(){b()},function(a,b){d(b)})})})["catch"](d)});return j(d,b),d}function f(a){var b=this,c=new k(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})})["catch"](c)});return j(c,a),c}function g(a){var b=this,c=new k(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})})["catch"](c)});return j(c,a),c}function h(a,b){var c=this,d=new k(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})})["catch"](d)});return j(d,b),d}function i(a){var b=this,c=new k(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})})["catch"](c)});return j(c,a),c}function j(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}var k="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require?require("promise"):this.Promise,l=this,m=null,n=this.openDatabase;if(n){var o={DEFINE:1,EXPORT:2,WINDOW:3},p=o.WINDOW;"undefined"!=typeof module&&module.exports&&"undefined"!=typeof require?p=o.EXPORT:"function"==typeof define&&define.amd&&(p=o.DEFINE);var q={_driver:"webSQLStorage",_initStorage:a,iterate:c,getItem:b,setItem:d,removeItem:e,clear:f,length:g,key:h,keys:i};p===o.DEFINE?define("webSQLStorage",function(){return q}):p===o.EXPORT?module.exports=q:this.webSQLStorage=q}}.call(window),function(){"use strict";function a(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function b(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&(arguments[0][c]=n(b[c])?b[c].slice():b[c])}return arguments[0]}function c(a){for(var b in g)if(g.hasOwnProperty(b)&&g[b]===a)return!0;return!1}function d(c){this._config=b({},k,c),this._driverSet=null,this._ready=!1,this._dbInfo=null;for(var d=0;d<i.length;d++)a(this,i[d]);this.setDriver(this._config.driver)}var e="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require?require("promise"):this.Promise,f={},g={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},h=[g.INDEXEDDB,g.WEBSQL,g.LOCALSTORAGE],i=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],j={DEFINE:1,EXPORT:2,WINDOW:3},k={description:"",driver:h.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},l=j.WINDOW;"undefined"!=typeof module&&module.exports&&"undefined"!=typeof require?l=j.EXPORT:"function"==typeof define&&define.amd&&(l=j.DEFINE);var m=function(a){var b=b||a.indexedDB||a.webkitIndexedDB||a.mozIndexedDB||a.OIndexedDB||a.msIndexedDB,c={};return c[g.WEBSQL]=!!a.openDatabase,c[g.INDEXEDDB]=!!function(){if("undefined"!=typeof a.openDatabase&&a.navigator&&a.navigator.userAgent&&/Safari/.test(a.navigator.userAgent)&&!/Chrome/.test(a.navigator.userAgent))return!1;try{return b&&"function"==typeof b.open&&"undefined"!=typeof a.IDBKeyRange}catch(c){return!1}}(),c[g.LOCALSTORAGE]=!!function(){try{return a.localStorage&&"setItem"in a.localStorage&&a.localStorage.setItem}catch(b){return!1}}(),c}(this),n=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},o=this;d.prototype.INDEXEDDB=g.INDEXEDDB,d.prototype.LOCALSTORAGE=g.LOCALSTORAGE,d.prototype.WEBSQL=g.WEBSQL,d.prototype.config=function(a){if("object"==typeof a){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a)"storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),this._config[b]=a[b];return"driver"in a&&a.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof a?this._config[a]:this._config},d.prototype.defineDriver=function(a,b,d){var g=new e(function(b,d){try{var g=a._driver,h=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),j=new Error("Custom driver name already in use: "+a._driver);if(!a._driver)return void d(h);if(c(a._driver))return void d(j);for(var k=i.concat("_initStorage"),l=0;l<k.length;l++){var n=k[l];if(!n||!a[n]||"function"!=typeof a[n])return void d(h)}var o=e.resolve(!0);"_support"in a&&(o=a._support&&"function"==typeof a._support?a._support():e.resolve(!!a._support)),o.then(function(c){m[g]=c,f[g]=a,b()},d)}catch(p){d(p)}});return g.then(b,d),g},d.prototype.driver=function(){return this._driver||null},d.prototype.ready=function(a){var b=this,c=new e(function(a,c){b._driverSet.then(function(){null===b._ready&&(b._ready=b._initStorage(b._config)),b._ready.then(a,c)})["catch"](c)});return c.then(a,a),c},d.prototype.setDriver=function(a,b,d){function g(){h._config.driver=h.driver()}var h=this;return"string"==typeof a&&(a=[a]),this._driverSet=new e(function(b,d){var g=h._getFirstSupportedDriver(a),i=new Error("No available storage method found.");if(!g)return h._driverSet=e.reject(i),void d(i);if(h._dbInfo=null,h._ready=null,c(g)){var k=new e(function(a){if(l===j.DEFINE)require([g],a);else if(l===j.EXPORT)switch(g){case h.INDEXEDDB:a(require("./drivers/indexeddb"));break;case h.LOCALSTORAGE:a(require("./drivers/localstorage"));break;case h.WEBSQL:a(require("./drivers/websql"))}else a(o[g])});k.then(function(a){h._extend(a),b()})}else f[g]?(h._extend(f[g]),b()):(h._driverSet=e.reject(i),d(i))}),this._driverSet.then(g,g),this._driverSet.then(b,d),this._driverSet},d.prototype.supports=function(a){return!!m[a]},d.prototype._extend=function(a){b(this,a)},d.prototype._getFirstSupportedDriver=function(a){if(a&&n(a))for(var b=0;b<a.length;b++){var c=a[b];if(this.supports(c))return c}return null},d.prototype.createInstance=function(a){return new d(a)};var p=new d;l===j.DEFINE?define("localforage",function(){return p}):l===j.EXPORT?module.exports=p:this.localforage=p}.call(window);


/**
Creates the FrontJS manager.
//*/
var Front =
{
	/**
	self reference.
	//*/
	ref: null,
	
	/**
	Model root container.
	//*/
	model: 
	{
		/**
		Check if a given element or element's id is a model.
		If forced checks if inside a model context.
		//*/
		is: function(p_target,p_force)
		{			
			var fjs = Front;
			var ref = this;					
			if(typeof(p_target) =="string") return ref.get(p_target) != null;
			if(p_force) return ref.context(p_target) != null;			
			return fjs.attribute(p_target,"model") != "";
		},
		
		/**
		Returns the model context the target is inserted.		
		//*/
		context: function(p_target)
		{
			var fjs = Front;
			var ref = this;
			var n = p_target;
			if(typeof(p_target) =="string") n = ref.get(p_target);
			while(n!=null)
			{
				var mid = fjs.attribute(n,"model");
				if(mid!="") return n;
				n = n.parentNode;
			}
			return null;
		},
		
		/**
		Will watch a model DOM and report changes as 'model' events.
		//*/
		watch: function(p_id,p_flag) 
		{
			var fjs = Front;
			var m = fjs.find("model",p_id);
			if(m==null) return;			
			m.watch = p_flag==null ? true : p_flag;
		},
		
		/**
		Returns the model DOM element.
		//*/
		get: function(p_id)
		{			
			var fjs = Front;
			return fjs.find("model",p_id);
		},
		
		/**
		Get or Set a model data using the 'model' attribute in the DOM as guide.
		//*/
		data: function(p_id,p_value)
		{
			var fjs = Front;
			var ref = this;
			
			if(p_value != null)
			{
				var m = ref.get(p_id);
				if(m==null) return;
				for(var s in p_value)
				{
					var vn = fjs.find("view",s,m);
					ref.value(vn,p_value[s]);
				}
				return p_value;
			}
			
			var d = { };				
			fjs.traverse(fjs.root,function(n)
			{				
				if(n==null) return;
				var mid = n.getAttribute("model");
				if(mid==null) return;				
				if(mid!=p_id) return;				
				fjs.traverse(n,function(md)
				{
					if(md==n) return;
					var vid = md.getAttribute("view");
					if(vid==null) return;
					var tn  = md.nodeName.toLowerCase();
					if(tn==null) 	return;
					if(tn=="#text") return;					
					var itp = tn=="input" ? (md.type==null ? "" : md.type.toLowerCase()) : "";					
					var s = ref.value(md);					
					d[vid] = s;
				});
			});			
			return d;
		},
		
		/**
		Get or Set the value of the target element.
		//*/
		value: function(p_target,p_value)
		{		
			var fjs = Front;
			var t   = p_target;
			
			if(typeof(t)=="string")
			{
				t = fjs.view.get(t);
				if(t==null) return null;
			}
			
			var tn  = t.nodeName.toLowerCase();
			if(tn==null) 	return p_value;
			if(tn=="#text") return p_value;
			var itp = tn=="input" ? (t.type==null ? "" : t.type.toLowerCase()) : "";			
			switch(tn)
			{
				case "input": 	
				{
					switch(itp)
					{
						case "checkbox": return p_value==null ? t.checked : (t.checked=p_value); break;
						default: 		 return p_value==null ? t.value : (t.value=p_value); 	 break;
					}							
				}
				break;						
				case "select":   return p_value==null ? t.selectedIndex : (t.selectedIndex=p_value); break;
				case "textarea": return p_value==null ? t.value : (t.value=p_value); 	 break;
				default: 		 return p_value==null ? t.textContent : (t.textContent=p_value); break;
			}
			return p_value;
		},
		
		/**
		Callbacks for events.
		//*/
		onevent:function(p_event,p_target)
		{
			var fjs = Front;
			var ref = this;
			var n = p_target;				
			while(n!=null)
			{
				var mid = fjs.attribute(n,"model");					
				if(mid!="")
				if(mid!=null)
				{						
					if(n.watch!=null)
					if(n.watch)
					{
						var d = ref.data(mid);
						fjs.controller.dispatch("model",n,d);
					}
				}					
				n = n.parentNode;
			}
		},
		
		/**
		Returns the 'model' attribute of the target.
		//*/
		attribute: function(p_target) { return Front.attribute(p_target,"model"); },
		
		/**
		Class that handles IndexedDB features using LocalForage from Mozilla and the Controller's notification system.
		//*/
		storage:
		{			
				
			/**
			Retrieves a data from LocalForage.
			//*/
			get: function(p_key,p_notification,p_data)
			{	
				var fjs = Front;
				var c = fjs.controller;
				var n = p_notification;
				var d = p_data;
				fjs.storage.get(p_key,
				function(v,e) { if(e!=null) { c.notify(n+".error","storage.get",fjs.model,e); } else { c.notify(n+".get","storage",fjs.model,d==null ? v : [v,d]); } });
			},
			
			/**
			Stores a data into LocalForage.
			//*/
			set: function(p_key,p_value,p_notification,p_data)
			{	
				var fjs = Front;
				var c = fjs.controller;
				var n = p_notification;
				var d = p_data;
				fjs.storage.set(p_key,p_value,
				function(v,e) { if(e!=null) { c.notify(n+".error","storage.set",fjs.model,e); } else { c.notify(n+".set","storage",fjs.model,d==null ? v : [v,d]); } });
			},
			
			/**
			Retrieves a data from LocalForage.
			//*/
			remove: function(p_key,p_notification,p_data)
			{
				var fjs = Front;
				var c = fjs.controller;
				var n = p_notification;
				var d = p_data;
				fjs.storage.remove(p_key,
				function(v,e) { if(e!=null) { c.notify(n+".error","storage.remove",fjs.model,e); } else { c.notify(n+".remove","storage",fjs.model,d==null ? v : [v,d]); } });							
			},
			
			/**
			Returns the Key Id based on its name.
			//*/
			key: function(p_id,p_notification,p_data)
			{
				var fjs = Front;
				var c = fjs.controller;
				var n = p_notification;
				var d = p_data;
				fjs.storage.key(p_key,
				function(v,e) { if(e!=null) { c.notify(n+".error","storage.key",fjs.model,e); } else { c.notify(n+".key","storage",fjs.model,d==null ? v : [v,d]); } });
			},
			
			/**
			Recovers the keys related to the context. If the context if empty, returns all keys.
			//*/
			keys: function(p_notification,p_data)
			{
				var fjs = Front;
				var c = fjs.controller;
				var n = p_notification;
				var d = p_data;
				fjs.storage.keys(
				function(v,e) { if(e!=null) { c.notify(n+".error","storage.keys",fjs.model,e); } else { c.notify(n+".keys","storage",fjs.model,d==null ? v : [v,d]); } });
			},
			
			/**
			Removes all keys of this context. If the context is empty all data will be excluded.
			//*/
			clear: function(p_notification,p_data)
			{
				var fjs = Front;
				var c = fjs.controller;
				var n = p_notification;
				var d = p_data;
				fjs.storage.clear(
				function(v,e) { if(e!=null) { c.notify(n+".error","storage.count",fjs.model,e); } else { c.notify(n+".count","storage",fjs.model,d==null ? v : [v,d]); } });
			},
			
			/**
			Returns the length of this storage based on the current context.
			//*/
			length:function(p_notification,p_data)
			{
				var fjs = Front;
				var c = fjs.controller;
				var n = p_notification;
				var d = p_data;
				fjs.storage.length(
				function(v,e) { if(e!=null) { c.notify(n+".error","storage.length",fjs.model,e); } else { c.notify(n+".length","storage",fjs.model,d==null ? v : [v,d]); } });
			},
			
			/**
			Removes ALL data from the IndexedDB system.
			//*/
			destroy: function(p_notification,p_data) 
			{ 
				var fjs = Front;
				var c = fjs.controller;
				var n = p_notification;
				var d = p_data;
				fjs.storage.length(
				function(e) { if(e!=null) { c.notify(n+".error","storage.length",fjs.model,e); } else { c.notify(n+".length","storage",fjs.model,d); } });
			},
			
		},
			
	},
	
	/**
	Controller root container.
	//*/
	controller:
	{
		/**
		List of added controllers.
		//*/
		list: [],
				
		/**
		Adds a Controller. If needed a route RegExp can be specified to allow events only of some view contexts.
		//*/
		add: function(p_target,p_route)
		{		
			var ref = this;
			var t = p_target;
			if(ref.list.indexOf(t) < 0) ref.list.push(t);			
			t.route = t.route==null ? (p_route==null ? /(.*?)/ : p_route) : t.route;
			if(t.allow==null) t.allow="";
			//if(t.allow=="") t.allow = "click,change,input,model";
			return t;
		},
		
		/**
		Removes a Controller.
		//*/
		remove: function(p_target)
		{
			var ref = this;
			var t = p_target;
			var pos = ref.list.indexOf(t);
			if(pos >= 0) { ref.list.splice(pos,1); return t; }
			return null;
		},
		
		
		/**
		Returns a flag indicating if the Controller named 'name' exists.
		//*/
		exists:function(p_name) { var ref = this; return ref.find(p_name) != null; },
		
		/**
		Searches a given controller by its name.
		//*/
		find: function(p_name)
		{
			var ref = this; 
			for(var i=0;i<ref.list.length;i++) if(ref.list[i].name != null)if(ref.list[i].name == p_name) return ref.list[i];
			return null;
		},
		
		/**
		Propagates an event to all controllers.
		//*/
		dispatch: function(p_event,p_target,p_data)
		{
			var fjs = Front;
			var ref = this;			
			var vpth = fjs.view.path(p_target,true);			
			ref.notify(vpth,p_event,p_target,p_data);
			
			//Check 'bind' Elements.
			if(("input,change,update").indexOf(p_event)>=0)
			{
				fjs.traverse(fjs.root,function(n)
				{
					var bind = fjs.attribute(n,"bind");
					if(bind=="") return;				
					var tks = bind.split(".");
					var f = tks.pop();
					var m = tks.join(".");							
					if(!fjs.model.is(m)) return;
					var d = fjs.model.data(m);				
					if(d[f]==null) return;
					fjs.model.value(n,d[f]);
				});			
			}
		},
		
		/**
		Propagates a notification to all controllers.
		//*/
		notify: function(p_path,p_event,p_target,p_data)
		{
			var fjs = Front;
			var ref = this;	
			
			for(var i=0;i< ref.list.length;i++)
			{
				var c = ref.list[i];								
				if(c.on != null)
				{
					//Event do not belongs to this controller permited.
					if(c.allow != null) if(c.allow!="") if(c.allow.indexOf(p_event)<0) continue;
					if(p_path!="") if(!c.route.test(p_path)) continue;
					c.on(p_path,p_event,p_target,p_data);
				}
			}
		},
		
		/**
		Wrapper for XMLHttpRequest features.
		//*/
		request:
		{
			/**
			URL for the default notification webservice.
			//*/
			service: "",
			
			/**
			Creates a XMLHttpRequest passing the notification data to it.
			//*/
			create: function(p_url,p_path,p_event,p_data,p_binary,p_method)
			{
				var method = p_method==null ? "get" : p_method;
				var binary = p_binary==null ? false : p_binary;			
				var ctrl = Front.controller;
				var fjs = Front;
				var n   = {};			
				n.path  = p_path;
				n.event = p_event==null ? "" : p_event;
				n.data  = p_data==null ? {} : p_data;				
				if(method=="get")
				{
					var qs = "?notification="+JSON.stringify(n);
					p_url+=qs;
				}
				
				var req =				
				fjs.request.create(p_url,function(d,p,x,err)
				{
					
					if(p<=0) ctrl.notify(p_path+".upload","progress",x,1.0+p);
					if(p>=0) if(p<=1.0) ctrl.notify(p_path+".progress","progress",x,p);					
					if(p>=1.0)
					{
						if(d==null)
						{
							ctrl.notify(p_path+".error","error",x,err);
						}
						else
						{							
							ctrl.notify(p_path+".complete","complete",x,x.response);
							if(!binary)
							{
								var nl = JSON.parse(x.response);
								if(nl == null) { console.error("Controller> Service ["+p_url+"] returned a wrong notification list."); return; }								
								for(var i=0; i<nl.length;i++)
								{
									var n = nl[i];
									if(n.path==null)
									{
										console.error("Controller> Service ["+p_url+"] returned a wrong notification format.");
									}
									else
									{
										
										n.event = n.event==null ? "" : n.event;
										n.data  = n.data==null ? {} : n.data;
										ctrl.notify(n.path,n.event,x,n.data);
									}
								}								
							}
						}						
					}					
				},JSON.stringify(n),binary,method);
				return req;
			},
			
			/**
			Wrapper for a GET request that returns a notification formatted reponse.
			//*/
			get: function(p_url,p_path,p_event,p_data,p_binary)
			{
				var ref = this;
				return ref.create(p_url,p_path,p_event,p_data,p_binary,"get");
			},
			
			/**
			Wrapper for a POST request.
			//*/
			post: function(p_url,p_path,p_event,p_data,p_binary)
			{
				var ref = this;
				return ref.create(p_url,p_path,p_event,p_data,p_binary,"post");
			},
			
			/**
			Creates a request to the default service and sends a notification.
			Default to POST.
			//*/
			notify: function(p_path,p_event,p_data,p_binary,p_method)
			{
				var ref = this;
				var method = p_method==null ? "post" : p_method;
				return ref.create(ref.service,p_path,p_event,p_data,p_binary,method);
			}
			
		},
		
		/**
		Removes all controllers.
		//*/
		clear: function() { var ref = this; ref.list = []; }
	},
	
	/**
	View root container.
	//*/
	view: 
	{
		/**
		Check if a given element or element's id is a view.	If forced checks if inside a view context.
		//*/
		is: function(p_target,p_force)
		{
			var fjs = Front;
			var ref = this;
			if(typeof(p_target) =="string") return ref.get(p_target) != null;
			if(p_force) return ref.context(p_target) != null;			
			return fjs.attribute(p_target,"view") != "";
		},
		
		/**
		Returns the view context the target is inserted.		
		//*/
		context: function(p_target)
		{
			var fjs = Front;
			var n = p_target;
			while(n!=null)
			{
				var vid = fjs.attribute(n,"view");
				if(vid!="") return n;
				n = n.parentNode;
			}
			return null;
		},
		
		/**
		Returns the dot path of all view to this element.
		If the element is not a view an empty string is returned unless, if forced the closest view path that contains this element is returned.
		//*/
		path: function(p_target,p_force)
		{
			var pth = [];
			var vid = "";
			var f = p_force==null ? false : p_force;
			var n = p_target;
			vid = n.getAttribute!=null ? n.getAttribute("view") : "";		
			if(!f)
			{
				//Element isn't a view itself.
				if(vid==null) return "";
				if(vid=="")   return "";			
			}
			if(vid!=null) if(vid!="") pth.push(vid);
			n = n.parentNode;
			while(n!=null)
			{
				vid = n.getAttribute!=null ? n.getAttribute("view") : "";
				if(vid != null) if(vid!="") pth.push(vid);
				n = n.parentNode;
			}
			pth.reverse();
			return pth.join(".");
		},
		
		/**
		Returns the view element's by its path.
		//*/
		get: function(p_path)
		{
			if(p_path==null) return null;			
			var fjs = Front;
			var pth = p_path.split(".");			
			if(pth.length<=0) return null;			
			pth.reverse();					
			var res = null;			
			fjs.traverse(fjs.root,function(n)
			{
				if(pth.length<=0) { return false; }
				var vid = fjs.attribute(n,"view");				
				if(vid=="")   return;
				if(vid==pth[pth.length-1]) pth.pop();				
				if(pth.length<=0) { res = n; return false; }
			});			
			return res;
		},
		
		/**
		Searches a View by its id alone. If the flag 'all' is passed all occurrences are returned.
		//*/
		find: function(p_id,p_all)
		{
			var all = p_all==null ? false : p_all;
			var fjs = Front;
			var res = all ? [] : null;
			fjs.traverse(fjs.root,function(n)
			{
				var vid = fjs.attribute(n,"view");				
				if(vid=="")   return;				
				if(vid==p_id)
				{					
					if(!all) 
					{
						if(res==null) { res = n; return false; }
						if(res!=null) return false;
					}
					res.push(n);
				}
			});	
			return res;
		},
		
		/**
		Clones a given View if the 'template' attribute is available.
		//*/
		clone: function(p_target)
		{
			
			var fjs = Front;
			var ref = this;
			var c = null;
			if(typeof(p_target) =="string")
			{
				var t = ref.get(p_target);
				if(t==null) return null;
				if(t.getAttribute==null) return null;
				if(t.getAttribute("template")==null) return null;
				c = t;
			}
			else
			{
				c = p_target;
			}						
			c = c.cloneNode(true);
			c.removeAttribute("template");
			return c;
		},
		
		/**
		Returns the view's parent.
		//*/
		parent: function(p_target)
		{
			var fjs = Front;
			var ref = this;
			if(p_target==null) return null;
			if(typeof(p_target) =="string")
			{
				var tks = p_path.split(".");
				tks.pop();
				var pth = tks.join(".");
				return ref.get(pth);
			}
			var n = p_target.parentNode;
			while(n != null)
			{
				if(Front.view.is(n)) return n;
				n = n.parentNode;
			}	
			return null;
		},
		
		/**
		Returns the 'view' attribute of the target.
		//*/
		attribute: function(p_target) { return Front.attribute(p_target,"view"); }
		
	},
	
	/**
	Reference to the DOM observer (default or polyfill).
	//*/
	observer: null,
	
	/**
	List of occurred mutations.
	//*/
	mutations: [],
	
	/**
	Default set of events.
	//*/
	events: ["click","input","change"],
	
	/**
	Root of the observed DOM structure.
	//*/
	root: null,
	
	/**
	Flag that indicates the Front manager is active.	
	//*/	
	enabled: true,
	
	/**
	Sets the event handling root element.
	//*/
	setRoot: function(p_root)
	{
		if(ref.root != null)
		{
			for(var i=0;i<ref.events.length;i++) ref.listen(ref.events[i],false);			
			ref.observer.disconnect();
		}		
		
		ref.root = p_root;
		
		if(ref.root != null)
		{
			for(var i=0;i<ref.events.length;i++) ref.listen(ref.events[i],true);
			
			var config = { attributes: true, childList: true, characterData: true, subtree: true };
			ref.observer.observe(ref.root,config);			
			
			//Make 'template' Elements disappear
			var sheet = document.styleSheets[0];
			sheet.insertRule("*[template] { display: none !important; }", 1);
			
		}
	},
	
	/**
	Register an internal handler for the desired event.
	//*/
	listen:function(p_event,p_flag)
	{
		if(ref.root == null) return;
		var e  = ref.root;
		var fn = p_flag ? e.addEventListener : e.removeEventListener;		
		var f  = ("focus,blur".indexOf(p_event) >= 0) && p_flag;
		if(f) fn(p_event,ref.onevent,true); fn(p_event,ref.onevent);
	},
	
	/**
	Global listener
	//*/
	onevent: function(p_event)
	{		
		if(!ref.enabled) return;
		var t = p_event.target;
		var e = p_event.type;		
		switch(e)
		{
			case "change":
			case "input":				
				ref.model.onevent(e,t);
			break;
		}				
		ref.controller.dispatch(e,t,p_event);
	},
	
	/**
	initialize the Front manager.
	//*/
	initialize: function(p_root,p_events)
	{		
		ref = this;
		
		ref.events = p_events==null ? ref.events : p_events;		
		ref.root   = p_root;
		
		if(MutationObserver == null)
		{
			console.warn("FrontJS> MutationObserver class not found.");
		}		
		else
		{
			ref.observer = new MutationObserver(ref.onmutation);		
		}
		
		if(ref.root == null)
		{
			if(document.body == null)
			{
				window.addEventListener("load",ref.onload);
			}
			else
			{
				ref.root = document.body;
			}
		}
		
		
		if(ref.root != null)
		{
			console.log("FrontJS> Initialize ["+ref.root+"]");
			ref.setRoot(ref.root);
		}
	},
	
	/**
	Window onload callback.
	//*/
	onload: function()
	{		
		window.removeEventListener("load",ref.onload);		
		if(ref.root==null)
		{
			ref.root = document.body;
			console.log("FrontJS> Initialize ["+ref.root+"]");
			ref.setRoot(ref.root);
		}
	},
	
	/**
	Returns the target's attribute safely.
	//*/
	attribute: function(p_target,p_attribute)
	{
		if(p_target==null) return "";
		if(p_target.getAttribute==null) return "";
		var a = p_target.getAttribute(p_attribute);
		if(a==null) return "";
		return a;
	},
	
	
	/**
	Searches a given DOM by its attribute and its value.
	//*/
	find: function(p_attrib,p_value,p_from)
	{
		var res = null;
		var t = p_from==null ? ref.root : p_from;
		ref.traverse(t,function(n)
		{
			if(res!=null) return false;
			if(n.getAttribute==null)return;
			var a = n.getAttribute(p_attrib);
			if(a==null) return;
			if(a=="") return;
			if(p_value==null) 	{ res=n; return false; }
			if(p_value=="") 	{ res=n; return false; }
			if(a==p_value) { res=n; return false; }
		});
		return res;
	},
	
	/**
	Callbacks called when the DOM changes somehow.
	//*/
	onmutation: function(p_list)
	{	
		if(!ref.enabled) return;
		ref.mutations = p_list;
		for(var i=0;i<ref.mutations.length;i++)
		{
			var t = ref.mutations[i].target;
			ref.model.onevent("update",t);
		}
		ref.controller.dispatch("update",document.body);
	},
	
	/**
	Traverse the DOM Node, calling a callback.
	If the specified callback returns a Boolean, the traversal can be stopped in the current depth.
	//*/
	traverse: function(n,cb)
	{
		var res = null;
		res = cb(n);
		if(res==false) return;
		var l = n.children;
		for(var i=0;i<l.length;i++) ref.traverse(l[i],cb);
	},
	
	/**
	Class that handles XMLHttpRequest related functionalities.
	//*/
	request:
	{
		/**
		Wrapper for a XMLHttpRequest. Accepts a callback that receives (data,progress,xhr,error).
		//*/
		create: function(p_url,p_callback,p_data,p_binary,p_method)
		{
			var method = p_method==null ? "get" : p_method;
			var binary = p_binary==null ? false : p_binary;		
			var ref = this;
			var ld = new XMLHttpRequest();					
			if(binary)
			{
				if (ld.overrideMimeType != null) {  ld.overrideMimeType("application/octet-stream");  }			
				ld.responseType = "arraybuffer";
			}
			
			ld.onprogress = function(e) 
			{
				var p = (e.total <= 0? 0 : e.loaded / (e.total + 5)) * 0.9999;
				if(p_callback!=null) p_callback(null,p,ld);
			};
			ld.upload.onprogress = 
			function(e) 
			{
				if(p_data!=null)
				{
					var p = (e.total <= 0? 0 : e.loaded / (e.total + 5)) * 0.9999;
					if(p_callback!=null) p_callback(null,-(1.0-p),ld);
				}
			};
			ld.onload = function(e1) { if(p_callback!=null) p_callback(ld.response,1.0,ld); };
			ld.onerror = function(e2){ if(p_callback!=null) p_callback(null,1.0,ld,e2); };			
			ld.open(method,p_url,true);
			if(p_data != null)
			{				
				ld.send(p_data);
			}
			else
			{
				ld.send();
			}
			return ld;
		},
		
		/**
		Creates a GET request.
		//*/
		get: function(p_url,p_callback,p_data,p_binary)
		{
			var ref = this;
			var d  = p_data;			
			if(d != null)
			{
				var qs = "?";
				var kl = [];
				for(var k in d) kl.push(k+"="+d[k]);
				for(var i=0;i<kl.length;i++)
				{					
					qs += kl[i];
					if(i<(kl.length-1)) qs+="&";
				}
				p_url+=qs;
			}
			return ref.create(p_url,p_callback,null,p_binary,"get");
		},
		
		/**
		Creates a POST request.
		//*/
		post: function(p_url,p_callback,p_data,p_binary)
		{	
			var ref = this;
			return ref.create(p_url,p_callback,p_data,p_binary,"post");
		},
	},
	
	/**
	Class that handles IndexedDB features using LocalForage from Mozilla.
	//*/
	storage:
	{
		/**
		String to be used before keys to avoid key collision between different applications.
		//*/
		context: "fjs",
		
		/**
		Chosen name for the database.
		//*/
		database: "frontjs",
		
		/**
		Initializes the storage with custom information.
		/**/
		init: function(p_name)
		{
			var s=this;
			if(p_name!=null) s.database = p_name;
			localforage.config(
			{
				driver: localforage.INDEXEDDB,
				name: s.database 
			});
		},
			
		/**
		Retrieves a data from LocalForage.
		//*/
		get: function(p_key,p_callback)
		{	
			var s=this;
			var p = s.context=="" ? "" : s.context+".";
			localforage.getItem(p+p_key, function(p_error, p_res)
			{
				if(p_error!=null) p_res=null;
				if(p_callback!=null) p_callback(p_res,p_error);
			});								
		},
		
		/**
		Stores a data into LocalForage.
		//*/
		set: function(p_key,p_value,p_callback)
		{	
			var s=this;
			var p = s.context=="" ? "" : s.context+".";
			localforage.setItem(p+p_key,p_value, function(p_error, p_res)
			{					
				if(p_callback!=null) p_callback(p_res,p_error);
			});				
			return p_value;
		},
		
		/**
		Retrieves a data from LocalForage.
		//*/
		remove: function(p_key,p_callback)
		{
			var s=this;
			var p = s.context=="" ? "" : s.context+".";
			localforage.removeItem(p+p_key, function(p_error, p_res)
			{
				if(p_callback!=null) p_callback(p_res,p_error);
			});								
		},
		
		/**
		Returns the Key Id based on its name.
		//*/
		key: function(p_id,p_callback)
		{
			var s=this;
			localforage.key(p_id, function(p_error, p_name) 
			{	
				if(p_error!=null) p_name="";
				if(s.context!="") p_name = p_name.replace(s.context+".","");
				if(p_callback!=null) p_callback(p_name,p_error);
			});
		},
		
		/**
		Recovers the keys related to the context. If the context if empty, returns all keys.
		//*/
		keys: function(p_callback)
		{
			var s=this;
			localforage.keys(function(p_error, p_keys) 
			{
				if(p_error!=null) p_keys=[];
				var kl = [];
				if(s.context!="")
				{	
					for(var i=0;i<p_keys.length;i++) if(p_keys[i].indexOf(s.context)==0) kl.push(p_keys[i].replace(s.context+".",""));
				}
				else
				{					
					kl = p_keys;					
				}
				if(p_callback!=null) p_callback(kl,p_error);
			});
		},
		
		/**
		Removes all keys of this context. If the context is empty all data will be excluded.
		//*/
		clear: function(p_callback)
		{
			var s = this;
			s.keys(function(kl,p_error)
			{
				var t = kl.length;
				var count = t;				
				while(kl.length>0) 
				{ 
					s.remove(kl.pop(),
					function() 
					{ 
						count--; 
						if(count<=0) if(p_callback!=null) p_callback(t,p_error);
					}); 
				}
			});
		},
		
		/**
		Returns the length of this storage based on the current context.
		//*/
		length:function(p_callback)
		{
			var s = this;
			s.keys(function(kl,p_error)
			{
				var t = p_error==null ? kl.length : 0;
				if(p_callback!=null) p_callback(t,p_error);
			});
		},
		
		/**
		Iterates all key-value pairs from this storaged context.
		//*/
		iterate:function(p_callback)
		{
			localforage.iterate(
			function(v, k, i) 
			{		
				var res=null;
				if(p_callback!=null) res = p_callback(k,v,i);	
				if(res!=null) return res;
			},
			function() 
			{
				if(p_callback!=null) p_callback(k,v,-1);	
			});
		},
		
		/**
		Removes ALL data from the IndexedDB system.
		//*/
		destroy: function(p_callback) { localforage.clear(function(p_error) { if(p_callback!=null) p_callback(p_error); }); },
		
	},
	
};


