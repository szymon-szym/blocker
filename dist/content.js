parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pILq":[function(require,module,exports) {
var e=document.querySelectorAll("iframe[id*='google_ads']");console.log("adds found ".concat(e.length)),e.forEach(function(e){console.log("replacing");var t=document.createElement("img");t.src="https://placekitten.com/g/".concat(e.width,"/").concat(e.height),e.replaceWith(t)});var t=["google_ads_"],o=new MutationObserver(function(e){e.forEach(function(e){if(e.addedNodes)for(var o=function(o){var c=e.addedNodes[o];"IFRAME"===c.nodeName&&t.forEach(function(e){if(c.id.includes(e)){console.log("iframe to replace ".concat(c.id));var t=document.createElement("img");return t.src="https://placekitten.com/g/".concat(c.width,"/").concat(c.height),void c.replaceWith(t)}})},c=0;c<e.addedNodes.length;c++)o(c)})});o.observe(document.body,{childList:!0,subtree:!0,attributes:!1,characterData:!1});
},{}]},{},["pILq"], null)
//# sourceMappingURL=/content.js.map