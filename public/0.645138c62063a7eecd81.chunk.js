(this.webpackJsonp=this.webpackJsonp||[]).push([[0,20],{113:function(e,t,s){"use strict";s.d(t,"a",(function(){return a}));var r={name:"tweb"+(s(59).a.test?"_test":""),version:7,stores:[{name:"session"},{name:"stickerSets"},{name:"users"},{name:"chats"},{name:"dialogs"},{name:"messages"}]},n=s(84),o=s(19),i=s(24);class a{constructor(e){this.storageIsAvailable=!0,this.name=r.name,this.version=r.version,this.stores=r.stores,Object(o.g)(this,e),this.log=Object(i.b)("IDB-"+this.storeName),this.openDatabase(!0),a.STORAGES.push(this)}static closeDatabases(){this.STORAGES.forEach(e=>{const t=e.db;t&&(t.onclose=()=>{},t.close())})}static deleteDatabase(){return this.closeDatabases(),new Promise((e,t)=>{const s=indexedDB.deleteDatabase(r.name);s.onerror=()=>{t()},s.onsuccess=()=>{e()}})}isAvailable(){return this.storageIsAvailable}openDatabase(e=!1){if(this.openDbPromise&&!e)return this.openDbPromise;try{var t=indexedDB.open(this.name,this.version);if(!t)return Promise.reject()}catch(e){return this.log.error("error opening db",e.message),this.storageIsAvailable=!1,Promise.reject(e)}let s=!1;return setTimeout(()=>{s||t.onerror({type:"IDB_CREATE_TIMEOUT"})},3e3),this.openDbPromise=new Promise((e,r)=>{t.onsuccess=n=>{s=!0;const o=t.result;let i=!1;this.log("Opened"),o.onerror=e=>{this.storageIsAvailable=!1,this.log.error("Error creating/accessing IndexedDB database",e),r(e)},o.onclose=e=>{this.log.error("closed:",e),!i&&this.openDatabase()},o.onabort=e=>{this.log.error("abort:",e);const t=e.target;this.openDatabase(i=!0),t.onerror&&t.onerror(e),o.close()},o.onversionchange=e=>{this.log.error("onversionchange, lol?")},e(this.db=o)},t.onerror=e=>{s=!0,this.storageIsAvailable=!1,this.log.error("Error creating/accessing IndexedDB database",e),r(e)},t.onupgradeneeded=e=>{s=!0,this.log.warn("performing idb upgrade from",e.oldVersion,"to",e.newVersion);var t=e.target.result;this.stores.forEach(e=>{t.objectStoreNames.contains(e.name)||((e,t)=>{var s;const r=e.createObjectStore(t.name);if(null===(s=t.indexes)||void 0===s?void 0:s.length)for(const e of t.indexes)r.createIndex(e.indexName,e.keyPath,e.objectParameters)})(t,e)})}})}delete(e){return Array.isArray(e)||(e=[].concat(e)),this.getObjectStore("readwrite",t=>e.map(e=>t.delete(e)),"")}deleteAll(){return this.getObjectStore("readwrite",e=>e.clear(),"")}save(e,t){return Array.isArray(e)||(e=[].concat(e),t=[].concat(t)),this.getObjectStore("readwrite",s=>e.map((e,r)=>s.put(t[r],e)),"")}saveFile(e,t){return t instanceof Blob||(t=Object(n.a)([t])),this.save(e,t)}get(e){return Array.isArray(e)||(e=[].concat(e)),this.getObjectStore("readonly",t=>e.map(e=>t.get(e)),"")}getObjectStore(e,t,s){let r;return s&&(r=performance.now(),this.log(s+": start")),this.openDatabase().then(n=>new Promise((o,i)=>{const a=n.transaction([this.storeName],e);a.onerror=e=>{clearTimeout(c),i(a.error)},a.oncomplete=e=>{clearTimeout(c),s&&this.log(s+": end",performance.now()-r);const t=h.map(e=>e.result);o(u?t:t[0])};const c=setTimeout(()=>{this.log.error("transaction not finished",a)},1e4),l=t(a.objectStore(this.storeName)),u=Array.isArray(l),h=u?l:[].concat(l)}))}getAll(){return this.getObjectStore("readonly",e=>e.getAll(),"")}}a.STORAGES=[]},13:function(e,t,s){"use strict";function r(e,t,s=!0,r=!0){let n=null;return(...o)=>{n?(clearTimeout(n),n=null):s&&e(...o),n=setTimeout(()=>{r&&e(...o),n=null},t)}}function n(e,t,s=!0){let r,n,o=null;return(...i)=>{r=!0,n=i,o||(s&&(r=!1,e(...n)),o=setInterval(()=>{if(!r)return clearInterval(o),void(o=null);r=!1,e(...n)},t))}}s.d(t,"a",(function(){return r})),s.d(t,"e",(function(){return n})),s.d(t,"d",(function(){return o})),s.d(t,"c",(function(){return a})),s.d(t,"b",(function(){return c}));const o=e=>new Promise(t=>{setTimeout(t,e)});let i;function a(e){i?i.push(e):(i=[e],requestAnimationFrame(()=>{const e=i;i=void 0,e.forEach(e=>e())}))}function c(){return new Promise(e=>{a(()=>{a(e)})})}},19:function(e,t,s){"use strict";function r(e){if(null===e||"object"!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());if(Array.isArray(e)){return e.map(e=>r(e))}let t=new e.constructor;for(var s in e)e.hasOwnProperty(s)&&(t[s]=r(e[s]));return t}function n(e,t){const s=Object.keys,r=typeof e;return e&&t&&"object"===r&&r===typeof t?s(e).length===s(t).length&&s(e).every(s=>n(e[s],t[s])):e===t}function o(e,t){const s={writable:!0,configurable:!0},r={};t.forEach(t=>{void 0===e[t]&&(r[t]=s)}),Object.defineProperties(e,r)}function i(e,t="asc"){if(!e)return[];const s=Object.keys(e).map(e=>+e);return"asc"===t?s.sort((e,t)=>e-t):s.sort((e,t)=>t-e)}function a(e,t){if(!e)return t;for(var s in e)t.hasOwnProperty(s)||delete e[s];for(var s in t)e[s]=t[s];return e}function c(e,t,s){"byteLength"in s[e]&&(s[e]=[...s[e]]),t&&t[e]!==s[e]&&(t[e].length=s[e].length,s[e].forEach((s,r)=>{t[e][r]=s}),s[e]=t[e])}function l(e){return"object"==typeof e&&null!==e}function u(e,t){const s=t.split(".");let r=e;return s.forEach(e=>{e&&(r=r[e])}),r}function h(e,t,s){const r=t.split(".");u(e,r.slice(0,-1).join("."))[r.pop()]=s}function d(e,t,s,n){for(const o in e)typeof t[o]!=typeof e[o]?(t[o]=r(e[o]),s&&s(n||o)):l(e[o])&&d(e[o],t[o],s,n||o)}function f(e,t){if(t)for(let s in t)void 0!==t[s]&&(e[s]=t[s])}s.d(t,"a",(function(){return r})),s.d(t,"b",(function(){return n})),s.d(t,"c",(function(){return o})),s.d(t,"e",(function(){return i})),s.d(t,"i",(function(){return a})),s.d(t,"h",(function(){return c})),s.d(t,"f",(function(){return l})),s.d(t,"d",(function(){return u})),s.d(t,"j",(function(){return h})),s.d(t,"k",(function(){return d})),s.d(t,"g",(function(){return f}))},23:function(e,t,s){"use strict";function r(){let e={isFulfilled:!1,isRejected:!1,notify:()=>{},notifyAll:(...t)=>{e.lastNotify=t,e.listeners.forEach(e=>e(...t))},lastNotify:void 0,listeners:[],addNotifyListener:t=>{e.lastNotify&&t(...e.lastNotify),e.listeners.push(t)}},t=new Promise((s,r)=>{e.resolve=e=>{t.isFulfilled||(t.isFulfilled=!0,s(e))},e.reject=(...e)=>{t.isRejected||(t.isRejected=!0,r(...e))}});return t.finally(()=>{t.notify=null,t.listeners.length=0,t.lastNotify=null,t.cancel&&(t.cancel=()=>{})}),Object.assign(t,e),t}s.d(t,"a",(function(){return r}))},24:function(e,t,s){"use strict";s.d(t,"a",(function(){return r})),s.d(t,"b",(function(){return c}));var r,n=s(9);!function(e){e[e.None=0]="None",e[e.Error=1]="Error",e[e.Warn=2]="Warn",e[e.Log=4]="Log",e[e.Debug=8]="Debug"}(r||(r={}));const o=[r.None,r.Error,r.Warn,r.Log,r.Debug],i=Date.now();function a(){return"["+((Date.now()-i)/1e3).toFixed(3)+"]"}function c(e,t=r.Log|r.Warn|r.Error){function s(...s){return t&r.Log&&console.log(a(),e,...s)}return n.b||(t=r.Error),s.warn=function(...s){return t&r.Warn&&console.warn(a(),e,...s)},s.info=function(...s){return t&r.Log&&console.info(a(),e,...s)},s.error=function(...s){return t&r.Error&&console.error(a(),e,...s)},s.trace=function(...s){return t&r.Log&&console.trace(a(),e,...s)},s.debug=function(...s){return t&r.Debug&&console.debug(a(),e,...s)},s.setPrefix=function(t){e="["+t+"]:"},s.setPrefix(e),s.setLevel=function(e){t=o.slice(0,e+1).reduce((e,t)=>e|t,0)},s}},33:function(e,t,s){"use strict";s.d(t,"a",(function(){return r}));class r{constructor(e){this._constructor(e)}_constructor(e=!1){this.reuseResults=e,this.listeners={},this.listenerResults={}}addEventListener(e,t,s){var r;this.listenerResults.hasOwnProperty(e)&&(t(...this.listenerResults[e]),s)||(null!==(r=this.listeners[e])&&void 0!==r?r:this.listeners[e]=[]).push({callback:t,once:s})}addMultipleEventsListeners(e){for(const t in e)this.addEventListener(t,e[t])}removeEventListener(e,t){this.listeners[e]&&this.listeners[e].findAndSplice(e=>e.callback===t)}dispatchEvent(e,...t){this.reuseResults&&(this.listenerResults[e]=t);const s=[],r=this.listeners[e];if(r){r.slice().forEach(n=>{-1!==r.findIndex(e=>e.callback===n.callback)&&(s.push(n.callback(...t)),n.once&&this.removeEventListener(e,n.callback))})}return s}cleanup(){this.listeners={},this.listenerResults={}}}},48:function(e,t,s){"use strict";var r=s(9);const n=new(s(62).a)({storeName:"session"});r.a.appStorage=n,t.a=n},59:function(e,t,s){"use strict";const r={test:location.search.indexOf("test=1")>0,debug:location.search.indexOf("debug=1")>0,http:!1,ssl:!0,multipleConnections:!0,asServiceWorker:!1};t.a=r},62:function(e,t,s){"use strict";s.d(t,"a",(function(){return c}));var r=s(23),n=s(13),o=s(113),i=function(e,t,s,r){return new(s||(s=Promise))((function(n,o){function i(e){try{c(r.next(e))}catch(e){o(e)}}function a(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(i,a)}c((r=r.apply(e,t||[])).next())}))};function a(){}class c{constructor(e){this.cache={},this.useStorage=!0,this.getPromises=new Map,this.keysToSet=new Set,this.saveDeferred=Object(r.a)(),this.keysToDelete=new Set,this.deleteDeferred=Object(r.a)(),this.storage=new o.a(e),c.STORAGES.push(this),this.saveThrottled=Object(n.e)(()=>i(this,void 0,void 0,(function*(){const e=this.saveDeferred;this.saveDeferred=Object(r.a)();const t=this.keysToSet;if(t.size){const e=Array.from(t.values());t.clear();try{yield this.storage.save(e,e.map(e=>this.cache[e]))}catch(t){console.error("[AS]: set error:",t,e)}}e.resolve(),t.size&&this.saveThrottled()})),16,!1),this.deleteThrottled=Object(n.e)(()=>i(this,void 0,void 0,(function*(){const e=this.deleteDeferred;this.deleteDeferred=Object(r.a)();const t=this.keysToDelete;if(t.size){const e=Array.from(t.values());t.clear();try{yield this.storage.delete(e)}catch(t){console.error("[AS]: delete error:",t,e)}}e.resolve(),t.size&&this.deleteThrottled()})),16,!1),this.getThrottled=Object(n.e)(()=>i(this,void 0,void 0,(function*(){const t=Array.from(this.getPromises.keys());this.storage.get(t).then(e=>{for(let s=0,r=t.length;s<r;++s){const r=t[s],n=this.getPromises.get(r);n&&(n.resolve(this.cache[r]=e[s]),this.getPromises.delete(r))}},s=>{["NO_ENTRY_FOUND","STORAGE_OFFLINE"].includes(s)||(this.useStorage=!1,console.error("[AS]: get error:",s,t,e.storeName));for(let e=0,s=t.length;e<s;++e){const s=t[e],r=this.getPromises.get(s);r&&(r.resolve(),this.getPromises.delete(s))}}).finally(()=>{this.getPromises.size&&this.getThrottled()})})),16,!1)}isAvailable(){return this.useStorage}getCache(){return this.cache}getFromCache(e){return this.cache[e]}setToCache(e,t){return this.cache[e]=t}get(e){return i(this,void 0,void 0,(function*(){if(this.cache.hasOwnProperty(e))return this.getFromCache(e);if(this.useStorage){const t=this.getPromises.get(e);if(t)return t;const s=Object(r.a)();return this.getPromises.set(e,s),this.getThrottled(),s}}))}getAll(){return this.storage.getAll().catch(()=>[])}set(e,t=!1){for(const s in e)if(e.hasOwnProperty(s)){const r=e[s];this.setToCache(s,r),this.useStorage&&!t&&(this.keysToSet.add(s),this.keysToDelete.delete(s),this.saveThrottled())}return this.useStorage?this.saveDeferred:Promise.resolve()}delete(e,t=!1){return e=""+e,t||delete this.cache[e],this.useStorage&&(this.keysToSet.delete(e),this.keysToDelete.add(e),this.deleteThrottled()),this.useStorage?this.deleteDeferred:Promise.resolve()}clear(){return this.storage.deleteAll().catch(a)}static toggleStorage(e){return Promise.all(this.STORAGES.map(t=>(t.useStorage=e,e?t.set(t.cache):(t.keysToSet.clear(),t.keysToDelete.clear(),t.getPromises.forEach(e=>e.resolve()),t.getPromises.clear(),t.clear())))).catch(a)}deleteDatabase(){return o.a.deleteDatabase().catch(a)}}c.STORAGES=[]},8:function(e,t,s){"use strict";s.r(t),s.d(t,"RootScope",(function(){return o}));var r=s(33),n=s(9);class o extends r.a{constructor(){super(),this._overlayIsActive=!1,this.myId=0,this.idle={isIDLE:!0,focusPromise:Promise.resolve(),focusResolve:()=>{}},this.connectionStatus={},this.peerId=0,this.broadcast=(e,t)=>{this.dispatchEvent(e,t)},this.on=(e,t,s)=>{super.addEventListener(e,t,s)},this.addEventListener=this.on,this.off=(e,t)=>{super.removeEventListener(e,t)},this.removeEventListener=this.off,this.on("peer_changed",e=>{this.peerId=e}),this.on("user_auth",e=>{this.myId=e}),this.on("connection_status_change",e=>{const t=e;this.connectionStatus[e.name]=t}),this.on("idle",e=>{e?this.idle.focusPromise=new Promise(e=>{this.idle.focusResolve=e}):this.idle.focusResolve()})}setThemeListener(){const e=window.matchMedia("(prefers-color-scheme: dark)"),t=()=>{this.systemTheme=e.matches?"night":"day",this.myId?this.broadcast("theme_change"):this.setTheme()};e.addEventListener("change",t),t()}setTheme(){const e="night"===this.getTheme().name,t=document.head.querySelector('[name="color-scheme"]');t&&t.setAttribute("content",e?"dark":"light"),document.documentElement.classList.toggle("night",e)}get overlayIsActive(){return this._overlayIsActive}set overlayIsActive(e){this._overlayIsActive=e,this.broadcast("overlay_toggle",e)}getTheme(e=("system"===this.settings.theme?this.systemTheme:this.settings.theme)){return this.settings.themes.find(t=>t.name===e)}}const i=new o;n.a.rootScope=i,t.default=i},84:function(e,t,s){"use strict";s.d(t,"b",(function(){return r})),s.d(t,"a",(function(){return n}));const r=e=>new Promise(t=>{const s=new FileReader;s.addEventListener("loadend",e=>{t(e.srcElement.result)}),s.readAsText(e)});function n(e,t=""){let s;const r=function(e){if(-1===["image/jpeg","image/png","image/gif","image/webp","image/bmp","video/mp4","video/webm","video/quicktime","audio/ogg","audio/mpeg","audio/mp4","application/json","application/pdf"].indexOf(e))return"application/octet-stream";return e}(t);try{s=new Blob(e,{type:r})}catch(t){let n=new BlobBuilder;e.forEach(e=>{n.append(e)}),s=n.getBlob(r)}return s}},9:function(e,t,s){"use strict";s.d(t,"a",(function(){return n}));const r=s(59).a.debug,n="undefined"!=typeof window?window:self;t.b=r}}]);
//# sourceMappingURL=0.645138c62063a7eecd81.chunk.js.map