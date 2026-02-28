(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))l(f);new MutationObserver(f=>{for(const w of f)if(w.type==="childList")for(const p of w.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function d(f){const w={};return f.integrity&&(w.integrity=f.integrity),f.referrerPolicy&&(w.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?w.credentials="include":f.crossOrigin==="anonymous"?w.credentials="omit":w.credentials="same-origin",w}function l(f){if(f.ep)return;f.ep=!0;const w=d(f);fetch(f.href,w)}})();let br=0,wr=0;function Ut(){const a=Date.now();return a>wr?(wr=a,br=0):br++,`${wr.toString(36)}-${br.toString(36)}`}const Ga=Object.freeze(Object.defineProperty({__proto__:null,now:Ut},Symbol.toStringTag,{value:"Module"}));function be(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,a=>{const s=Math.random()*16|0;return(a==="x"?s:s&3|8).toString(16)})}function Tn(){let a=localStorage.getItem("ts_deviceId");return a||(a=`device-${be().slice(0,8)}`,localStorage.setItem("ts_deviceId",a)),a}const Qa=Object.freeze(Object.defineProperty({__proto__:null,getDeviceId:Tn,uuid:be},Symbol.toStringTag,{value:"Module"}));var Ja=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Za(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var wn={exports:{}},eo=wn.exports,Pi;function to(){return Pi||(Pi=1,(function(a,s){((d,l)=>{a.exports=l()})(eo,function(){var d=function(e,t){return(d=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(n,r){n.__proto__=r}:function(n,r){for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])}))(e,t)},l=function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function f(e,t,n){for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||((r=r||Array.prototype.slice.call(t,0,i))[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}var w=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Ja,p=Object.keys,h=Array.isArray;function E(e,t){return typeof t=="object"&&p(t).forEach(function(n){e[n]=t[n]}),e}typeof Promise>"u"||w.Promise||(w.Promise=Promise);var $=Object.getPrototypeOf,A={}.hasOwnProperty;function B(e,t){return A.call(e,t)}function _(e,t){typeof t=="function"&&(t=t($(e))),(typeof Reflect>"u"?p:Reflect.ownKeys)(t).forEach(function(n){R(e,n,t[n])})}var I=Object.defineProperty;function R(e,t,n,r){I(e,t,E(n&&B(n,"get")&&typeof n.get=="function"?{get:n.get,set:n.set,configurable:!0}:{value:n,configurable:!0,writable:!0},r))}function F(e){return{from:function(t){return e.prototype=Object.create(t.prototype),R(e.prototype,"constructor",e),{extend:_.bind(null,e.prototype)}}}}var te=Object.getOwnPropertyDescriptor,me=[].slice;function at(e,t,n){return me.call(e,t,n)}function _t(e,t){return t(e)}function Fe(e){if(!e)throw new Error("Assertion Failed")}function Vt(e){w.setImmediate?setImmediate(e):setTimeout(e,0)}function Se(e,t){if(typeof t=="string"&&B(e,t))return e[t];if(!t)return e;if(typeof t!="string"){for(var n=[],r=0,i=t.length;r<i;++r){var o=Se(e,t[r]);n.push(o)}return n}var c,u=t.indexOf(".");return u===-1||(c=e[t.substr(0,u)])==null?void 0:Se(c,t.substr(u+1))}function pe(e,t,n){if(e&&t!==void 0&&!("isFrozen"in Object&&Object.isFrozen(e)))if(typeof t!="string"&&"length"in t){Fe(typeof n!="string"&&"length"in n);for(var r=0,i=t.length;r<i;++r)pe(e,t[r],n[r])}else{var o,c,u=t.indexOf(".");u!==-1?(o=t.substr(0,u),(u=t.substr(u+1))===""?n===void 0?h(e)&&!isNaN(parseInt(o))?e.splice(o,1):delete e[o]:e[o]=n:pe(c=(c=e[o])&&B(e,o)?c:e[o]={},u,n)):n===void 0?h(e)&&!isNaN(parseInt(t))?e.splice(t,1):delete e[t]:e[t]=n}}function Rr(e){var t,n={};for(t in e)B(e,t)&&(n[t]=e[t]);return n}var ha=[].concat;function Nr(e){return ha.apply([],e)}var $e="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(Nr([8,16,32,64].map(function(e){return["Int","Uint","Float"].map(function(t){return t+e+"Array"})}))).filter(function(e){return w[e]}),Fr=new Set($e.map(function(e){return w[e]})),xt=null;function ze(e){return xt=new WeakMap,e=(function t(n){if(!n||typeof n!="object")return n;var r=xt.get(n);if(r)return r;if(h(n)){r=[],xt.set(n,r);for(var i=0,o=n.length;i<o;++i)r.push(t(n[i]))}else if(Fr.has(n.constructor))r=n;else{var c,u=$(n);for(c in r=u===Object.prototype?{}:Object.create(u),xt.set(n,r),n)B(n,c)&&(r[c]=t(n[c]))}return r})(e),xt=null,e}var va={}.toString;function Dn(e){return va.call(e).slice(8,-1)}var On=typeof Symbol<"u"?Symbol.iterator:"@@iterator",ya=typeof On=="symbol"?function(e){var t;return e!=null&&(t=e[On])&&t.apply(e)}:function(){return null};function Ue(e,t){t=e.indexOf(t),0<=t&&e.splice(t,1)}var ot={};function Ie(e){var t,n,r,i;if(arguments.length===1){if(h(e))return e.slice();if(this===ot&&typeof e=="string")return[e];if(i=ya(e))for(n=[];!(r=i.next()).done;)n.push(r.value);else{if(e==null)return[e];if(typeof(t=e.length)!="number")return[e];for(n=new Array(t);t--;)n[t]=e[t]}}else for(t=arguments.length,n=new Array(t);t--;)n[t]=arguments[t];return n}var Kn=typeof Symbol<"u"?function(e){return e[Symbol.toStringTag]==="AsyncFunction"}:function(){return!1},$e=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],he=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat($e),ga={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function st(e,t){this.name=e,this.message=t}function zr(e,t){return e+". Errors: "+Object.keys(t).map(function(n){return t[n].toString()}).filter(function(n,r,i){return i.indexOf(n)===r}).join(`
`)}function Xt(e,t,n,r){this.failures=t,this.failedKeys=r,this.successCount=n,this.message=zr(e,t)}function ct(e,t){this.name="BulkError",this.failures=Object.keys(t).map(function(n){return t[n]}),this.failuresByPos=t,this.message=zr(e,this.failures)}F(st).from(Error).extend({toString:function(){return this.name+": "+this.message}}),F(Xt).from(st),F(ct).from(st);var jn=he.reduce(function(e,t){return e[t]=t+"Error",e},{}),ba=st,V=he.reduce(function(e,t){var n=t+"Error";function r(i,o){this.name=n,i?typeof i=="string"?(this.message="".concat(i).concat(o?`
 `+o:""),this.inner=o||null):typeof i=="object"&&(this.message="".concat(i.name," ").concat(i.message),this.inner=i):(this.message=ga[t]||n,this.inner=null)}return F(r).from(ba),e[t]=r,e},{}),Ur=(V.Syntax=SyntaxError,V.Type=TypeError,V.Range=RangeError,$e.reduce(function(e,t){return e[t+"Error"]=V[t],e},{}));$e=he.reduce(function(e,t){return["Syntax","Type","Range"].indexOf(t)===-1&&(e[t+"Error"]=V[t]),e},{});function ne(){}function Pt(e){return e}function wa(e,t){return e==null||e===Pt?t:function(n){return t(e(n))}}function He(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function ka(e,t){return e===ne?t:function(){var n=e.apply(this,arguments),r=(n!==void 0&&(arguments[0]=n),this.onsuccess),i=this.onerror,o=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return r&&(this.onsuccess=this.onsuccess?He(r,this.onsuccess):r),i&&(this.onerror=this.onerror?He(i,this.onerror):i),o!==void 0?o:n}}function Sa(e,t){return e===ne?t:function(){e.apply(this,arguments);var n=this.onsuccess,r=this.onerror;this.onsuccess=this.onerror=null,t.apply(this,arguments),n&&(this.onsuccess=this.onsuccess?He(n,this.onsuccess):n),r&&(this.onerror=this.onerror?He(r,this.onerror):r)}}function Ea(e,t){return e===ne?t:function(i){var r=e.apply(this,arguments),i=(E(i,r),this.onsuccess),o=this.onerror,c=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return i&&(this.onsuccess=this.onsuccess?He(i,this.onsuccess):i),o&&(this.onerror=this.onerror?He(o,this.onerror):o),r===void 0?c===void 0?void 0:c:E(r,c)}}function _a(e,t){return e===ne?t:function(){return t.apply(this,arguments)!==!1&&e.apply(this,arguments)}}function Mn(e,t){return e===ne?t:function(){var n=e.apply(this,arguments);if(n&&typeof n.then=="function"){for(var r=this,i=arguments.length,o=new Array(i);i--;)o[i]=arguments[i];return n.then(function(){return t.apply(r,o)})}return t.apply(this,arguments)}}$e.ModifyError=Xt,$e.DexieError=st,$e.BulkError=ct;var _e=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function Hr(e){_e=e}var Lt={},Vr=100,Ct=typeof Promise>"u"?[]:(he=Promise.resolve(),typeof crypto<"u"&&crypto.subtle?[Ct=crypto.subtle.digest("SHA-512",new Uint8Array([0])),$(Ct),he]:[he,$(he),he]),he=Ct[0],vt=Ct[1],vt=vt&&vt.then,Ve=he&&he.constructor,qn=!!Ct[2],It=function(e,t){$t.push([e,t]),Wt&&(queueMicrotask(Pa),Wt=!1)},Rn=!0,Wt=!0,Xe=[],Yt=[],Nn=Pt,De={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:ne,pgp:!1,env:{},finalize:ne},H=De,$t=[],We=0,Gt=[];function q(e){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this._lib=!1;var t=this._PSD=H;if(typeof e!="function"){if(e!==Lt)throw new TypeError("Not a function");this._state=arguments[1],this._value=arguments[2],this._state===!1&&zn(this,this._value)}else this._state=null,this._value=null,++t.ref,(function n(r,i){try{i(function(o){if(r._state===null){if(o===r)throw new TypeError("A promise cannot be resolved with itself.");var c=r._lib&&lt();o&&typeof o.then=="function"?n(r,function(u,y){o instanceof q?o._then(u,y):o.then(u,y)}):(r._state=!0,r._value=o,Wr(r)),c&&ut()}},zn.bind(null,r))}catch(o){zn(r,o)}})(this,e)}var Fn={get:function(){var e=H,t=en;function n(r,i){var o=this,c=!e.global&&(e!==H||t!==en),u=c&&!Ke(),y=new q(function(P,g){Un(o,new Xr(Gr(r,e,c,u),Gr(i,e,c,u),P,g,e))});return this._consoleTask&&(y._consoleTask=this._consoleTask),y}return n.prototype=Lt,n},set:function(e){R(this,"then",e&&e.prototype===Lt?Fn:{get:function(){return e},set:Fn.set})}};function Xr(e,t,n,r,i){this.onFulfilled=typeof e=="function"?e:null,this.onRejected=typeof t=="function"?t:null,this.resolve=n,this.reject=r,this.psd=i}function zn(e,t){var n,r;Yt.push(t),e._state===null&&(n=e._lib&&lt(),t=Nn(t),e._state=!1,e._value=t,r=e,Xe.some(function(i){return i._value===r._value})||Xe.push(r),Wr(e),n)&&ut()}function Wr(e){var t=e._listeners;e._listeners=[];for(var n=0,r=t.length;n<r;++n)Un(e,t[n]);var i=e._PSD;--i.ref||i.finalize(),We===0&&(++We,It(function(){--We==0&&Hn()},[]))}function Un(e,t){if(e._state===null)e._listeners.push(t);else{var n=e._state?t.onFulfilled:t.onRejected;if(n===null)return(e._state?t.resolve:t.reject)(e._value);++t.psd.ref,++We,It(xa,[n,e,t])}}function xa(e,t,n){try{var r,i=t._value;!t._state&&Yt.length&&(Yt=[]),r=_e&&t._consoleTask?t._consoleTask.run(function(){return e(i)}):e(i),t._state||Yt.indexOf(i)!==-1||(o=>{for(var c=Xe.length;c;)if(Xe[--c]._value===o._value)return Xe.splice(c,1)})(t),n.resolve(r)}catch(o){n.reject(o)}finally{--We==0&&Hn(),--n.psd.ref||n.psd.finalize()}}function Pa(){Ye(De,function(){lt()&&ut()})}function lt(){var e=Rn;return Wt=Rn=!1,e}function ut(){var e,t,n;do for(;0<$t.length;)for(e=$t,$t=[],n=e.length,t=0;t<n;++t){var r=e[t];r[0].apply(null,r[1])}while(0<$t.length);Wt=Rn=!0}function Hn(){for(var e=Xe,t=(Xe=[],e.forEach(function(r){r._PSD.onunhandled.call(null,r._value,r)}),Gt.slice(0)),n=t.length;n;)t[--n]()}function Qt(e){return new q(Lt,!1,e)}function ie(e,t){var n=H;return function(){var r=lt(),i=H;try{return je(n,!0),e.apply(this,arguments)}catch(o){t&&t(o)}finally{je(i,!1),r&&ut()}}}_(q.prototype,{then:Fn,_then:function(e,t){Un(this,new Xr(null,null,e,t,H))},catch:function(e){var t,n;return arguments.length===1?this.then(null,e):(t=e,n=arguments[1],typeof t=="function"?this.then(null,function(r){return(r instanceof t?n:Qt)(r)}):this.then(null,function(r){return(r&&r.name===t?n:Qt)(r)}))},finally:function(e){return this.then(function(t){return q.resolve(e()).then(function(){return t})},function(t){return q.resolve(e()).then(function(){return Qt(t)})})},timeout:function(e,t){var n=this;return e<1/0?new q(function(r,i){var o=setTimeout(function(){return i(new V.Timeout(t))},e);n.then(r,i).finally(clearTimeout.bind(null,o))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&R(q.prototype,Symbol.toStringTag,"Dexie.Promise"),De.env=Yr(),_(q,{all:function(){var e=Ie.apply(null,arguments).map(tn);return new q(function(t,n){e.length===0&&t([]);var r=e.length;e.forEach(function(i,o){return q.resolve(i).then(function(c){e[o]=c,--r||t(e)},n)})})},resolve:function(e){return e instanceof q?e:e&&typeof e.then=="function"?new q(function(t,n){e.then(t,n)}):new q(Lt,!0,e)},reject:Qt,race:function(){var e=Ie.apply(null,arguments).map(tn);return new q(function(t,n){e.map(function(r){return q.resolve(r).then(t,n)})})},PSD:{get:function(){return H},set:function(e){return H=e}},totalEchoes:{get:function(){return en}},newPSD:Oe,usePSD:Ye,scheduler:{get:function(){return It},set:function(e){It=e}},rejectionMapper:{get:function(){return Nn},set:function(e){Nn=e}},follow:function(e,t){return new q(function(n,r){return Oe(function(i,o){var c=H;c.unhandleds=[],c.onunhandled=o,c.finalize=He(function(){var u,y=this;u=function(){y.unhandleds.length===0?i():o(y.unhandleds[0])},Gt.push(function P(){u(),Gt.splice(Gt.indexOf(P),1)}),++We,It(function(){--We==0&&Hn()},[])},c.finalize),e()},t,n,r)})}}),Ve&&(Ve.allSettled&&R(q,"allSettled",function(){var e=Ie.apply(null,arguments).map(tn);return new q(function(t){e.length===0&&t([]);var n=e.length,r=new Array(n);e.forEach(function(i,o){return q.resolve(i).then(function(c){return r[o]={status:"fulfilled",value:c}},function(c){return r[o]={status:"rejected",reason:c}}).then(function(){return--n||t(r)})})})}),Ve.any&&typeof AggregateError<"u"&&R(q,"any",function(){var e=Ie.apply(null,arguments).map(tn);return new q(function(t,n){e.length===0&&n(new AggregateError([]));var r=e.length,i=new Array(r);e.forEach(function(o,c){return q.resolve(o).then(function(u){return t(u)},function(u){i[c]=u,--r||n(new AggregateError(i))})})})}),Ve.withResolvers)&&(q.withResolvers=Ve.withResolvers);var ue={awaits:0,echoes:0,id:0},La=0,Jt=[],Zt=0,en=0,Ca=0;function Oe(e,c,n,r){var i=H,o=Object.create(i),c=(o.parent=i,o.ref=0,o.global=!1,o.id=++Ca,De.env,o.env=qn?{Promise:q,PromiseProp:{value:q,configurable:!0,writable:!0},all:q.all,race:q.race,allSettled:q.allSettled,any:q.any,resolve:q.resolve,reject:q.reject}:{},c&&E(o,c),++i.ref,o.finalize=function(){--this.parent.ref||this.parent.finalize()},Ye(o,e,n,r));return o.ref===0&&o.finalize(),c}function dt(){return ue.id||(ue.id=++La),++ue.awaits,ue.echoes+=Vr,ue.id}function Ke(){return!!ue.awaits&&(--ue.awaits==0&&(ue.id=0),ue.echoes=ue.awaits*Vr,!0)}function tn(e){return ue.echoes&&e&&e.constructor===Ve?(dt(),e.then(function(t){return Ke(),t},function(t){return Ke(),ce(t)})):e}function Ia(){var e=Jt[Jt.length-1];Jt.pop(),je(e,!1)}function je(e,t){var n,r,i=H;(t?!ue.echoes||Zt++&&e===H:!Zt||--Zt&&e===H)||queueMicrotask(t?(function(o){++en,ue.echoes&&--ue.echoes!=0||(ue.echoes=ue.awaits=ue.id=0),Jt.push(H),je(o,!0)}).bind(null,e):Ia),e!==H&&(H=e,i===De&&(De.env=Yr()),qn)&&(n=De.env.Promise,r=e.env,i.global||e.global)&&(Object.defineProperty(w,"Promise",r.PromiseProp),n.all=r.all,n.race=r.race,n.resolve=r.resolve,n.reject=r.reject,r.allSettled&&(n.allSettled=r.allSettled),r.any)&&(n.any=r.any)}function Yr(){var e=w.Promise;return qn?{Promise:e,PromiseProp:Object.getOwnPropertyDescriptor(w,"Promise"),all:e.all,race:e.race,allSettled:e.allSettled,any:e.any,resolve:e.resolve,reject:e.reject}:{}}function Ye(e,t,n,r,i){var o=H;try{return je(e,!0),t(n,r,i)}finally{je(o,!1)}}function Gr(e,t,n,r){return typeof e!="function"?e:function(){var i=H;n&&dt(),je(t,!0);try{return e.apply(this,arguments)}finally{je(i,!1),r&&queueMicrotask(Ke)}}}function Vn(e){Promise===Ve&&ue.echoes===0?Zt===0?e():enqueueNativeMicroTask(e):setTimeout(e,0)}(""+vt).indexOf("[native code]")===-1&&(dt=Ke=ne);var ce=q.reject,Ge="￿",Ae="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",Qr="String expected.",ft=[],nn="__dbnames",Xn="readonly",Wn="readwrite";function Qe(e,t){return e?t?function(){return e.apply(this,arguments)&&t.apply(this,arguments)}:e:t}var Jr={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function rn(e){return typeof e!="string"||/\./.test(e)?function(t){return t}:function(t){return t[e]===void 0&&e in t&&delete(t=ze(t))[e],t}}function Zr(){throw V.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.")}function Q(e,t){try{var n=ei(e),r=ei(t);if(n!==r)return n==="Array"?1:r==="Array"?-1:n==="binary"?1:r==="binary"?-1:n==="string"?1:r==="string"?-1:n==="Date"?1:r!=="Date"?NaN:-1;switch(n){case"number":case"Date":case"string":return t<e?1:e<t?-1:0;case"binary":for(var i=ti(e),o=ti(t),c=i.length,u=o.length,y=c<u?c:u,P=0;P<y;++P)if(i[P]!==o[P])return i[P]<o[P]?-1:1;return c===u?0:c<u?-1:1;case"Array":for(var g=e,m=t,k=g.length,S=m.length,b=k<S?k:S,v=0;v<b;++v){var L=Q(g[v],m[v]);if(L!==0)return L}return k===S?0:k<S?-1:1}}catch{}return NaN}function ei(e){var t=typeof e;return t=="object"&&(ArrayBuffer.isView(e)||(t=Dn(e))==="ArrayBuffer")?"binary":t}function ti(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e)}function an(e,t,n){var r=e.schema.yProps;return r?(t&&0<n.numFailures&&(t=t.filter(function(i,o){return!n.failures[o]})),Promise.all(r.map(function(i){return i=i.updatesTable,t?e.db.table(i).where("k").anyOf(t).delete():e.db.table(i).clear()})).then(function(){return n})):n}ni.prototype.execute=function(e){var t=this["@@propmod"];if(t.add!==void 0){var n=t.add;if(h(n))return f(f([],h(e)?e:[],!0),n).sort();if(typeof n=="number")return(Number(e)||0)+n;if(typeof n=="bigint")try{return BigInt(e)+n}catch{return BigInt(0)+n}throw new TypeError("Invalid term ".concat(n))}if(t.remove!==void 0){var r=t.remove;if(h(r))return h(e)?e.filter(function(i){return!r.includes(i)}).sort():[];if(typeof r=="number")return Number(e)-r;if(typeof r=="bigint")try{return BigInt(e)-r}catch{return BigInt(0)-r}throw new TypeError("Invalid subtrahend ".concat(r))}return n=(n=t.replacePrefix)==null?void 0:n[0],n&&typeof e=="string"&&e.startsWith(n)?t.replacePrefix[1]+e.substring(n.length):e};var At=ni;function ni(e){this["@@propmod"]=e}function ri(e,t){for(var n=p(t),r=n.length,i=!1,o=0;o<r;++o){var c=n[o],u=t[c],y=Se(e,c);u instanceof At?(pe(e,c,u.execute(y)),i=!0):y!==u&&(pe(e,c,u),i=!0)}return i}re.prototype._trans=function(e,t,n){var r=this._tx||H.trans,i=this.name,o=_e&&typeof console<"u"&&console.createTask&&console.createTask("Dexie: ".concat(e==="readonly"?"read":"write"," ").concat(this.name));function c(P,g,m){if(m.schema[i])return t(m.idbtrans,m);throw new V.NotFound("Table "+i+" not part of transaction")}var u=lt();try{var y=r&&r.db._novip===this.db._novip?r===H.trans?r._promise(e,c,n):Oe(function(){return r._promise(e,c,n)},{trans:r,transless:H.transless||H}):(function P(g,m,k,S){if(g.idbdb&&(g._state.openComplete||H.letThrough||g._vip)){var b=g._createTransaction(m,k,g._dbSchema);try{b.create(),g._state.PR1398_maxLoop=3}catch(v){return v.name===jn.InvalidState&&g.isOpen()&&0<--g._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),g.close({disableAutoOpen:!1}),g.open().then(function(){return P(g,m,k,S)})):ce(v)}return b._promise(m,function(v,L){return Oe(function(){return H.trans=b,S(v,L,b)})}).then(function(v){if(m==="readwrite")try{b.idbtrans.commit()}catch{}return m==="readonly"?v:b._completion.then(function(){return v})})}if(g._state.openComplete)return ce(new V.DatabaseClosed(g._state.dbOpenError));if(!g._state.isBeingOpened){if(!g._state.autoOpen)return ce(new V.DatabaseClosed);g.open().catch(ne)}return g._state.dbReadyPromise.then(function(){return P(g,m,k,S)})})(this.db,e,[this.name],c);return o&&(y._consoleTask=o,y=y.catch(function(P){return console.trace(P),ce(P)})),y}finally{u&&ut()}},re.prototype.get=function(e,t){var n=this;return e&&e.constructor===Object?this.where(e).first(t):e==null?ce(new V.Type("Invalid argument to Table.get()")):this._trans("readonly",function(r){return n.core.get({trans:r,key:e}).then(function(i){return n.hook.reading.fire(i)})}).then(t)},re.prototype.where=function(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(h(e))return new this.db.WhereClause(this,"[".concat(e.join("+"),"]"));var t=p(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);var n=this.schema.indexes.concat(this.schema.primKey).filter(function(u){if(u.compound&&t.every(function(P){return 0<=u.keyPath.indexOf(P)})){for(var y=0;y<t.length;++y)if(t.indexOf(u.keyPath[y])===-1)return!1;return!0}return!1}).sort(function(u,y){return u.keyPath.length-y.keyPath.length})[0];if(n&&this.db._maxKey!==Ge)return c=n.keyPath.slice(0,t.length),this.where(c).equals(c.map(function(u){return e[u]}));!n&&_e&&console.warn("The query ".concat(JSON.stringify(e)," on ").concat(this.name," would benefit from a ")+"compound index [".concat(t.join("+"),"]"));var r=this.schema.idxByName;function i(u,y){return Q(u,y)===0}var c=t.reduce(function(g,y){var P=g[0],g=g[1],m=r[y],k=e[y];return[P||m,P||!m?Qe(g,m&&m.multi?function(S){return S=Se(S,y),h(S)&&S.some(function(b){return i(k,b)})}:function(S){return i(k,Se(S,y))}):g]},[null,null]),o=c[0],c=c[1];return o?this.where(o.name).equals(e[o.keyPath]).filter(c):n?this.filter(c):this.where(t).equals("")},re.prototype.filter=function(e){return this.toCollection().and(e)},re.prototype.count=function(e){return this.toCollection().count(e)},re.prototype.offset=function(e){return this.toCollection().offset(e)},re.prototype.limit=function(e){return this.toCollection().limit(e)},re.prototype.each=function(e){return this.toCollection().each(e)},re.prototype.toArray=function(e){return this.toCollection().toArray(e)},re.prototype.toCollection=function(){return new this.db.Collection(new this.db.WhereClause(this))},re.prototype.orderBy=function(e){return new this.db.Collection(new this.db.WhereClause(this,h(e)?"[".concat(e.join("+"),"]"):e))},re.prototype.reverse=function(){return this.toCollection().reverse()},re.prototype.mapToClass=function(e){for(var t=this.db,n=this.name,r=((this.schema.mappedClass=e).prototype instanceof Zr&&(e=(c=>{var u=g,y=c;if(typeof y!="function"&&y!==null)throw new TypeError("Class extends value "+String(y)+" is not a constructor or null");function P(){this.constructor=u}function g(){return c!==null&&c.apply(this,arguments)||this}return d(u,y),u.prototype=y===null?Object.create(y):(P.prototype=y.prototype,new P),Object.defineProperty(g.prototype,"db",{get:function(){return t},enumerable:!1,configurable:!0}),g.prototype.table=function(){return n},g})(e)),new Set),i=e.prototype;i;i=$(i))Object.getOwnPropertyNames(i).forEach(function(c){return r.add(c)});function o(c){if(!c)return c;var u,y=Object.create(e.prototype);for(u in c)if(!r.has(u))try{y[u]=c[u]}catch{}return y}return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=o,this.hook("reading",o),e},re.prototype.defineClass=function(){return this.mapToClass(function(e){E(this,e)})},re.prototype.add=function(e,t){var n=this,r=this.schema.primKey,i=r.auto,o=r.keyPath,c=e;return o&&i&&(c=rn(o)(e)),this._trans("readwrite",function(u){return n.core.mutate({trans:u,type:"add",keys:t!=null?[t]:null,values:[c]})}).then(function(u){return u.numFailures?q.reject(u.failures[0]):u.lastResult}).then(function(u){if(o)try{pe(e,o,u)}catch{}return u})},re.prototype.upsert=function(e,t){var n=this,r=this.schema.primKey.keyPath;return this._trans("readwrite",function(i){return n.core.get({trans:i,key:e}).then(function(o){var c=o??{};return ri(c,t),r&&pe(c,r,e),n.core.mutate({trans:i,type:"put",values:[c],keys:[e],upsert:!0,updates:{keys:[e],changeSpecs:[t]}}).then(function(u){return u.numFailures?q.reject(u.failures[0]):!!o})})})},re.prototype.update=function(e,t){return typeof e!="object"||h(e)?this.where(":id").equals(e).modify(t):(e=Se(e,this.schema.primKey.keyPath))===void 0?ce(new V.InvalidArgument("Given object does not contain its primary key")):this.where(":id").equals(e).modify(t)},re.prototype.put=function(e,t){var n=this,r=this.schema.primKey,i=r.auto,o=r.keyPath,c=e;return o&&i&&(c=rn(o)(e)),this._trans("readwrite",function(u){return n.core.mutate({trans:u,type:"put",values:[c],keys:t!=null?[t]:null})}).then(function(u){return u.numFailures?q.reject(u.failures[0]):u.lastResult}).then(function(u){if(o)try{pe(e,o,u)}catch{}return u})},re.prototype.delete=function(e){var t=this;return this._trans("readwrite",function(n){return t.core.mutate({trans:n,type:"delete",keys:[e]}).then(function(r){return an(t,[e],r)}).then(function(r){return r.numFailures?q.reject(r.failures[0]):void 0})})},re.prototype.clear=function(){var e=this;return this._trans("readwrite",function(t){return e.core.mutate({trans:t,type:"deleteRange",range:Jr}).then(function(n){return an(e,null,n)})}).then(function(t){return t.numFailures?q.reject(t.failures[0]):void 0})},re.prototype.bulkGet=function(e){var t=this;return this._trans("readonly",function(n){return t.core.getMany({keys:e,trans:n}).then(function(r){return r.map(function(i){return t.hook.reading.fire(i)})})})},re.prototype.bulkAdd=function(e,t,n){var r=this,i=Array.isArray(t)?t:void 0,o=(n=n||(i?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(c){var u=r.schema.primKey,P=u.auto,u=u.keyPath;if(u&&i)throw new V.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(i&&i.length!==e.length)throw new V.InvalidArgument("Arguments objects and keys must have the same length");var y=e.length,P=u&&P?e.map(rn(u)):e;return r.core.mutate({trans:c,type:"add",keys:i,values:P,wantResults:o}).then(function(g){var m=g.numFailures,k=g.failures;if(m===0)return o?g.results:g.lastResult;throw new ct("".concat(r.name,".bulkAdd(): ").concat(m," of ").concat(y," operations failed"),k)})})},re.prototype.bulkPut=function(e,t,n){var r=this,i=Array.isArray(t)?t:void 0,o=(n=n||(i?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(c){var u=r.schema.primKey,P=u.auto,u=u.keyPath;if(u&&i)throw new V.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(i&&i.length!==e.length)throw new V.InvalidArgument("Arguments objects and keys must have the same length");var y=e.length,P=u&&P?e.map(rn(u)):e;return r.core.mutate({trans:c,type:"put",keys:i,values:P,wantResults:o}).then(function(g){var m=g.numFailures,k=g.failures;if(m===0)return o?g.results:g.lastResult;throw new ct("".concat(r.name,".bulkPut(): ").concat(m," of ").concat(y," operations failed"),k)})})},re.prototype.bulkUpdate=function(e){var t=this,n=this.core,r=e.map(function(c){return c.key}),i=e.map(function(c){return c.changes}),o=[];return this._trans("readwrite",function(c){return n.getMany({trans:c,keys:r,cache:"clone"}).then(function(u){var y=[],P=[],g=(e.forEach(function(m,k){var S=m.key,b=m.changes,v=u[k];if(v){for(var L=0,C=Object.keys(b);L<C.length;L++){var x=C[L],T=b[x];if(x===t.schema.primKey.keyPath){if(Q(T,S)!==0)throw new V.Constraint("Cannot update primary key in bulkUpdate()")}else pe(v,x,T)}o.push(k),y.push(S),P.push(v)}}),y.length);return n.mutate({trans:c,type:"put",keys:y,values:P,updates:{keys:r,changeSpecs:i}}).then(function(m){var k=m.numFailures,S=m.failures;if(k===0)return g;for(var b=0,v=Object.keys(S);b<v.length;b++){var L,C=v[b],x=o[Number(C)];x!=null&&(L=S[C],delete S[C],S[x]=L)}throw new ct("".concat(t.name,".bulkUpdate(): ").concat(k," of ").concat(g," operations failed"),S)})})})},re.prototype.bulkDelete=function(e){var t=this,n=e.length;return this._trans("readwrite",function(r){return t.core.mutate({trans:r,type:"delete",keys:e}).then(function(i){return an(t,e,i)})}).then(function(r){var i=r.numFailures,o=r.failures;if(i===0)return r.lastResult;throw new ct("".concat(t.name,".bulkDelete(): ").concat(i," of ").concat(n," operations failed"),o)})};var ii=re;function re(){}function Tt(e){function t(c,u){if(u){for(var y=arguments.length,P=new Array(y-1);--y;)P[y-1]=arguments[y];return n[c].subscribe.apply(null,P),e}if(typeof c=="string")return n[c]}var n={};t.addEventType=o;for(var r=1,i=arguments.length;r<i;++r)o(arguments[r]);return t;function o(c,u,y){var P,g;if(typeof c!="object")return u=u||_a,g={subscribers:[],fire:y=y||ne,subscribe:function(m){g.subscribers.indexOf(m)===-1&&(g.subscribers.push(m),g.fire=u(g.fire,m))},unsubscribe:function(m){g.subscribers=g.subscribers.filter(function(k){return k!==m}),g.fire=g.subscribers.reduce(u,y)}},n[c]=t[c]=g;p(P=c).forEach(function(m){var k=P[m];if(h(k))o(m,P[m][0],P[m][1]);else{if(k!=="asap")throw new V.InvalidArgument("Invalid event config");var S=o(m,Pt,function(){for(var b=arguments.length,v=new Array(b);b--;)v[b]=arguments[b];S.subscribers.forEach(function(L){Vt(function(){L.apply(null,v)})})})}})}}function Bt(e,t){return F(t).from({prototype:e}),t}function pt(e,t){return!(e.filter||e.algorithm||e.or)&&(t?e.justLimit:!e.replayFilter)}function Yn(e,t){e.filter=Qe(e.filter,t)}function Gn(e,t,n){var r=e.replayFilter;e.replayFilter=r?function(){return Qe(r(),t())}:t,e.justLimit=n&&!r}function on(e,t){if(e.isPrimKey)return t.primaryKey;var n=t.getIndexByKeyPath(e.index);if(n)return n;throw new V.Schema("KeyPath "+e.index+" on object store "+t.name+" is not indexed")}function ai(e,t,n){var r=on(e,t.schema);return t.openCursor({trans:n,values:!e.keysOnly,reverse:e.dir==="prev",unique:!!e.unique,query:{index:r,range:e.range}})}function sn(e,t,n,r){var i,o,c=e.replayFilter?Qe(e.filter,e.replayFilter()):e.filter;return e.or?(i={},o=function(u,y,P){var g,m;c&&!c(y,P,function(k){return y.stop(k)},function(k){return y.fail(k)})||((m=""+(g=y.primaryKey))=="[object ArrayBuffer]"&&(m=""+new Uint8Array(g)),B(i,m))||(i[m]=!0,t(u,y,P))},Promise.all([e.or._iterate(o,n),oi(ai(e,r,n),e.algorithm,o,!e.keysOnly&&e.valueMapper)])):oi(ai(e,r,n),Qe(e.algorithm,c),t,!e.keysOnly&&e.valueMapper)}function oi(e,t,n,r){var i=ie(r?function(o,c,u){return n(r(o),c,u)}:n);return e.then(function(o){if(o)return o.start(function(){var c=function(){return o.continue()};t&&!t(o,function(u){return c=u},function(u){o.stop(u),c=ne},function(u){o.fail(u),c=ne})||i(o.value,o,function(u){return c=u}),c()})})}Z.prototype._read=function(e,t){var n=this._ctx;return n.error?n.table._trans(null,ce.bind(null,n.error)):n.table._trans("readonly",e).then(t)},Z.prototype._write=function(e){var t=this._ctx;return t.error?t.table._trans(null,ce.bind(null,t.error)):t.table._trans("readwrite",e,"locked")},Z.prototype._addAlgorithm=function(e){var t=this._ctx;t.algorithm=Qe(t.algorithm,e)},Z.prototype._iterate=function(e,t){return sn(this._ctx,e,t,this._ctx.table.core)},Z.prototype.clone=function(e){var t=Object.create(this.constructor.prototype),n=Object.create(this._ctx);return e&&E(n,e),t._ctx=n,t},Z.prototype.raw=function(){return this._ctx.valueMapper=null,this},Z.prototype.each=function(e){var t=this._ctx;return this._read(function(n){return sn(t,e,n,t.table.core)})},Z.prototype.count=function(e){var t=this;return this._read(function(n){var r,i=t._ctx,o=i.table.core;return pt(i,!0)?o.count({trans:n,query:{index:on(i,o.schema),range:i.range}}).then(function(c){return Math.min(c,i.limit)}):(r=0,sn(i,function(){return++r,!1},n,o).then(function(){return r}))}).then(e)},Z.prototype.sortBy=function(e,t){var n=e.split(".").reverse(),r=n[0],i=n.length-1;function o(y,P){return P?o(y[n[P]],P-1):y[r]}var c=this._ctx.dir==="next"?1:-1;function u(y,P){return Q(o(y,i),o(P,i))*c}return this.toArray(function(y){return y.sort(u)}).then(t)},Z.prototype.toArray=function(e){var t=this;return this._read(function(n){var r,i,o,c=t._ctx;return c.dir==="next"&&pt(c,!0)&&0<c.limit?(r=c.valueMapper,i=on(c,c.table.core.schema),c.table.core.query({trans:n,limit:c.limit,values:!0,query:{index:i,range:c.range}}).then(function(u){return u=u.result,r?u.map(r):u})):(o=[],sn(c,function(u){return o.push(u)},n,c.table.core).then(function(){return o}))},e)},Z.prototype.offset=function(e){var t=this._ctx;return e<=0||(t.offset+=e,pt(t)?Gn(t,function(){var n=e;return function(r,i){return n===0||(n===1?--n:i(function(){r.advance(n),n=0}),!1)}}):Gn(t,function(){var n=e;return function(){return--n<0}})),this},Z.prototype.limit=function(e){return this._ctx.limit=Math.min(this._ctx.limit,e),Gn(this._ctx,function(){var t=e;return function(n,r,i){return--t<=0&&r(i),0<=t}},!0),this},Z.prototype.until=function(e,t){return Yn(this._ctx,function(n,r,i){return!e(n.value)||(r(i),t)}),this},Z.prototype.first=function(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)},Z.prototype.last=function(e){return this.reverse().first(e)},Z.prototype.filter=function(e){var t;return Yn(this._ctx,function(n){return e(n.value)}),(t=this._ctx).isMatch=Qe(t.isMatch,e),this},Z.prototype.and=function(e){return this.filter(e)},Z.prototype.or=function(e){return new this.db.WhereClause(this._ctx.table,e,this)},Z.prototype.reverse=function(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},Z.prototype.desc=function(){return this.reverse()},Z.prototype.eachKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,r){e(r.key,r)})},Z.prototype.eachUniqueKey=function(e){return this._ctx.unique="unique",this.eachKey(e)},Z.prototype.eachPrimaryKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,r){e(r.primaryKey,r)})},Z.prototype.keys=function(e){var t=this._ctx,n=(t.keysOnly=!t.isMatch,[]);return this.each(function(r,i){n.push(i.key)}).then(function(){return n}).then(e)},Z.prototype.primaryKeys=function(e){var t=this._ctx;if(t.dir==="next"&&pt(t,!0)&&0<t.limit)return this._read(function(r){var i=on(t,t.table.core.schema);return t.table.core.query({trans:r,values:!1,limit:t.limit,query:{index:i,range:t.range}})}).then(function(r){return r.result}).then(e);t.keysOnly=!t.isMatch;var n=[];return this.each(function(r,i){n.push(i.primaryKey)}).then(function(){return n}).then(e)},Z.prototype.uniqueKeys=function(e){return this._ctx.unique="unique",this.keys(e)},Z.prototype.firstKey=function(e){return this.limit(1).keys(function(t){return t[0]}).then(e)},Z.prototype.lastKey=function(e){return this.reverse().firstKey(e)},Z.prototype.distinct=function(){var e,t=this._ctx,t=t.index&&t.table.schema.idxByName[t.index];return t&&t.multi&&(e={},Yn(this._ctx,function(r){var r=r.primaryKey.toString(),i=B(e,r);return e[r]=!0,!i})),this},Z.prototype.modify=function(e){var t=this,n=this._ctx;return this._write(function(r){function i(v,L){var C=L.failures;k+=v-L.numFailures;for(var x=0,T=p(C);x<T.length;x++){var D=T[x];m.push(C[D])}}var o=typeof e=="function"?e:function(v){return ri(v,e)},c=n.table.core,g=c.schema.primaryKey,u=g.outbound,y=g.extractKey,P=200,g=t.db._options.modifyChunkSize,m=(g&&(P=typeof g=="object"?g[c.name]||g["*"]||200:g),[]),k=0,S=[],b=e===si;return t.clone().primaryKeys().then(function(v){function L(x){var T=Math.min(P,v.length-x),D=v.slice(x,x+T);return(b?Promise.resolve([]):c.getMany({trans:r,keys:D,cache:"immutable"})).then(function(j){var M=[],O=[],z=u?[]:null,N=b?D:[];if(!b)for(var K=0;K<T;++K){var U=j[K],J={value:ze(U),primKey:v[x+K]};o.call(J,J.value,J)!==!1&&(J.value==null?N.push(v[x+K]):u||Q(y(U),y(J.value))===0?(O.push(J.value),u&&z.push(v[x+K])):(N.push(v[x+K]),M.push(J.value)))}return Promise.resolve(0<M.length&&c.mutate({trans:r,type:"add",values:M}).then(function(ee){for(var X in ee.failures)N.splice(parseInt(X),1);i(M.length,ee)})).then(function(){return(0<O.length||C&&typeof e=="object")&&c.mutate({trans:r,type:"put",keys:z,values:O,criteria:C,changeSpec:typeof e!="function"&&e,isAdditionalChunk:0<x}).then(function(ee){return i(O.length,ee)})}).then(function(){return(0<N.length||C&&b)&&c.mutate({trans:r,type:"delete",keys:N,criteria:C,isAdditionalChunk:0<x}).then(function(ee){return an(n.table,N,ee)}).then(function(ee){return i(N.length,ee)})}).then(function(){return v.length>x+T&&L(x+P)})})}var C=pt(n)&&n.limit===1/0&&(typeof e!="function"||b)&&{index:n.index,range:n.range};return L(0).then(function(){if(0<m.length)throw new Xt("Error modifying one or more objects",m,k,S);return v.length})})})},Z.prototype.delete=function(){var e=this._ctx,t=e.range;return!pt(e)||e.table.schema.yProps||!e.isPrimKey&&t.type!==3?this.modify(si):this._write(function(n){var r=e.table.core.schema.primaryKey,i=t;return e.table.core.count({trans:n,query:{index:r,range:i}}).then(function(o){return e.table.core.mutate({trans:n,type:"deleteRange",range:i}).then(function(y){var u=y.failures,y=y.numFailures;if(y)throw new Xt("Could not delete some values",Object.keys(u).map(function(P){return u[P]}),o-y);return o-y})})})};var $a=Z;function Z(){}var si=function(e,t){return t.value=null};function Aa(e,t){return e<t?-1:e===t?0:1}function Ta(e,t){return t<e?-1:e===t?0:1}function ve(e,t,n){return e=e instanceof li?new e.Collection(e):e,e._ctx.error=new(n||TypeError)(t),e}function mt(e){return new e.Collection(e,function(){return ci("")}).limit(0)}function cn(S,t,n,r){var i,o,c,u,y,P,g,m=n.length;if(!n.every(function(v){return typeof v=="string"}))return ve(S,Qr);function k(v){i=v==="next"?function(C){return C.toUpperCase()}:function(C){return C.toLowerCase()},o=v==="next"?function(C){return C.toLowerCase()}:function(C){return C.toUpperCase()},c=v==="next"?Aa:Ta;var L=n.map(function(C){return{lower:o(C),upper:i(C)}}).sort(function(C,x){return c(C.lower,x.lower)});u=L.map(function(C){return C.upper}),y=L.map(function(C){return C.lower}),g=(P=v)==="next"?"":r}k("next");var S=new S.Collection(S,function(){return Me(u[0],y[m-1]+r)}),b=(S._ondirectionchange=function(v){k(v)},0);return S._addAlgorithm(function(v,L,C){var x=v.key;if(typeof x=="string"){var T=o(x);if(t(T,y,b))return!0;for(var D=null,j=b;j<m;++j){var M=((O,z,N,K,U,J)=>{for(var ee=Math.min(O.length,K.length),X=-1,G=0;G<ee;++G){var oe=z[G];if(oe!==K[G])return U(O[G],N[G])<0?O.substr(0,G)+N[G]+N.substr(G+1):U(O[G],K[G])<0?O.substr(0,G)+K[G]+N.substr(G+1):0<=X?O.substr(0,X)+z[X]+N.substr(X+1):null;U(O[G],oe)<0&&(X=G)}return ee<K.length&&J==="next"?O+N.substr(O.length):ee<O.length&&J==="prev"?O.substr(0,N.length):X<0?null:O.substr(0,X)+K[X]+N.substr(X+1)})(x,T,u[j],y[j],c,P);M===null&&D===null?b=j+1:(D===null||0<c(D,M))&&(D=M)}L(D!==null?function(){v.continue(D+g)}:C)}return!1}),S}function Me(e,t,n,r){return{type:2,lower:e,upper:t,lowerOpen:n,upperOpen:r}}function ci(e){return{type:1,lower:e,upper:e}}Object.defineProperty(de.prototype,"Collection",{get:function(){return this._ctx.table.db.Collection},enumerable:!1,configurable:!0}),de.prototype.between=function(e,t,n,r){n=n!==!1,r=r===!0;try{return 0<this._cmp(e,t)||this._cmp(e,t)===0&&(n||r)&&(!n||!r)?mt(this):new this.Collection(this,function(){return Me(e,t,!n,!r)})}catch{return ve(this,Ae)}},de.prototype.equals=function(e){return e==null?ve(this,Ae):new this.Collection(this,function(){return ci(e)})},de.prototype.above=function(e){return e==null?ve(this,Ae):new this.Collection(this,function(){return Me(e,void 0,!0)})},de.prototype.aboveOrEqual=function(e){return e==null?ve(this,Ae):new this.Collection(this,function(){return Me(e,void 0,!1)})},de.prototype.below=function(e){return e==null?ve(this,Ae):new this.Collection(this,function(){return Me(void 0,e,!1,!0)})},de.prototype.belowOrEqual=function(e){return e==null?ve(this,Ae):new this.Collection(this,function(){return Me(void 0,e)})},de.prototype.startsWith=function(e){return typeof e!="string"?ve(this,Qr):this.between(e,e+Ge,!0,!0)},de.prototype.startsWithIgnoreCase=function(e){return e===""?this.startsWith(e):cn(this,function(t,n){return t.indexOf(n[0])===0},[e],Ge)},de.prototype.equalsIgnoreCase=function(e){return cn(this,function(t,n){return t===n[0]},[e],"")},de.prototype.anyOfIgnoreCase=function(){var e=Ie.apply(ot,arguments);return e.length===0?mt(this):cn(this,function(t,n){return n.indexOf(t)!==-1},e,"")},de.prototype.startsWithAnyOfIgnoreCase=function(){var e=Ie.apply(ot,arguments);return e.length===0?mt(this):cn(this,function(t,n){return n.some(function(r){return t.indexOf(r)===0})},e,Ge)},de.prototype.anyOf=function(){var e,t,n=this,r=Ie.apply(ot,arguments),i=this._cmp;try{r.sort(i)}catch{return ve(this,Ae)}return r.length===0?mt(this):((e=new this.Collection(this,function(){return Me(r[0],r[r.length-1])}))._ondirectionchange=function(o){i=o==="next"?n._ascending:n._descending,r.sort(i)},t=0,e._addAlgorithm(function(o,c,u){for(var y=o.key;0<i(y,r[t]);)if(++t===r.length)return c(u),!1;return i(y,r[t])===0||(c(function(){o.continue(r[t])}),!1)}),e)},de.prototype.notEqual=function(e){return this.inAnyRange([[-1/0,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})},de.prototype.noneOf=function(){var e=Ie.apply(ot,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return ve(this,Ae)}var t=e.reduce(function(n,r){return n?n.concat([[n[n.length-1][1],r]]):[[-1/0,r]]},null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})},de.prototype.inAnyRange=function(e,C){var n=this,r=this._cmp,i=this._ascending,o=this._descending,c=this._min,u=this._max;if(e.length===0)return mt(this);if(!e.every(function(x){return x[0]!==void 0&&x[1]!==void 0&&i(x[0],x[1])<=0}))return ve(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",V.InvalidArgument);var y=!C||C.includeLowers!==!1,P=C&&C.includeUppers===!0,g,m=i;function k(x,T){return m(x[0],T[0])}try{(g=e.reduce(function(x,T){for(var D=0,j=x.length;D<j;++D){var M=x[D];if(r(T[0],M[1])<0&&0<r(T[1],M[0])){M[0]=c(M[0],T[0]),M[1]=u(M[1],T[1]);break}}return D===j&&x.push(T),x},[])).sort(k)}catch{return ve(this,Ae)}var S=0,b=P?function(x){return 0<i(x,g[S][1])}:function(x){return 0<=i(x,g[S][1])},v=y?function(x){return 0<o(x,g[S][0])}:function(x){return 0<=o(x,g[S][0])},L=b,C=new this.Collection(this,function(){return Me(g[0][0],g[g.length-1][1],!y,!P)});return C._ondirectionchange=function(x){m=x==="next"?(L=b,i):(L=v,o),g.sort(k)},C._addAlgorithm(function(x,T,D){for(var j,M=x.key;L(M);)if(++S===g.length)return T(D),!1;return!b(j=M)&&!v(j)||(n._cmp(M,g[S][1])===0||n._cmp(M,g[S][0])===0||T(function(){m===i?x.continue(g[S][0]):x.continue(g[S][1])}),!1)}),C},de.prototype.startsWithAnyOf=function(){var e=Ie.apply(ot,arguments);return e.every(function(t){return typeof t=="string"})?e.length===0?mt(this):this.inAnyRange(e.map(function(t){return[t,t+Ge]})):ve(this,"startsWithAnyOf() only works with strings")};var li=de;function de(){}function xe(e){return ie(function(t){return Dt(t),e(t.target.error),!1})}function Dt(e){e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()}var Ot="storagemutated",Qn="x-storagemutated-1",qe=Tt(null,Ot),Ba=(Pe.prototype._lock=function(){return Fe(!H.global),++this._reculock,this._reculock!==1||H.global||(H.lockOwnerFor=this),this},Pe.prototype._unlock=function(){if(Fe(!H.global),--this._reculock==0)for(H.global||(H.lockOwnerFor=null);0<this._blockedFuncs.length&&!this._locked();){var e=this._blockedFuncs.shift();try{Ye(e[1],e[0])}catch{}}return this},Pe.prototype._locked=function(){return this._reculock&&H.lockOwnerFor!==this},Pe.prototype.create=function(e){var t=this;if(this.mode){var n=this.db.idbdb,r=this.db._state.dbOpenError;if(Fe(!this.idbtrans),!e&&!n)switch(r&&r.name){case"DatabaseClosedError":throw new V.DatabaseClosed(r);case"MissingAPIError":throw new V.MissingAPI(r.message,r);default:throw new V.OpenFailed(r)}if(!this.active)throw new V.TransactionInactive;Fe(this._completion._state===null),(e=this.idbtrans=e||(this.db.core||n).transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability})).onerror=ie(function(i){Dt(i),t._reject(e.error)}),e.onabort=ie(function(i){Dt(i),t.active&&t._reject(new V.Abort(e.error)),t.active=!1,t.on("abort").fire(i)}),e.oncomplete=ie(function(){t.active=!1,t._resolve(),"mutatedParts"in e&&qe.storagemutated.fire(e.mutatedParts)})}return this},Pe.prototype._promise=function(e,t,n){var r,i=this;return e==="readwrite"&&this.mode!=="readwrite"?ce(new V.ReadOnly("Transaction is readonly")):this.active?this._locked()?new q(function(o,c){i._blockedFuncs.push([function(){i._promise(e,t,n).then(o,c)},H])}):n?Oe(function(){var o=new q(function(c,u){i._lock();var y=t(c,u,i);y&&y.then&&y.then(c,u)});return o.finally(function(){return i._unlock()}),o._lib=!0,o}):((r=new q(function(o,c){var u=t(o,c,i);u&&u.then&&u.then(o,c)}))._lib=!0,r):ce(new V.TransactionInactive)},Pe.prototype._root=function(){return this.parent?this.parent._root():this},Pe.prototype.waitFor=function(e){var t,n=this._root(),r=q.resolve(e),i=(n._waitingFor?n._waitingFor=n._waitingFor.then(function(){return r}):(n._waitingFor=r,n._waitingQueue=[],t=n.idbtrans.objectStore(n.storeNames[0]),(function o(){for(++n._spinCount;n._waitingQueue.length;)n._waitingQueue.shift()();n._waitingFor&&(t.get(-1/0).onsuccess=o)})()),n._waitingFor);return new q(function(o,c){r.then(function(u){return n._waitingQueue.push(ie(o.bind(null,u)))},function(u){return n._waitingQueue.push(ie(c.bind(null,u)))}).finally(function(){n._waitingFor===i&&(n._waitingFor=null)})})},Pe.prototype.abort=function(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new V.Abort))},Pe.prototype.table=function(e){var t=this._memoizedTables||(this._memoizedTables={});if(B(t,e))return t[e];var n=this.schema[e];if(n)return(n=new this.db.Table(e,n,this)).core=this.db.core.table(e),t[e]=n;throw new V.NotFound("Table "+e+" not part of transaction")},Pe);function Pe(){}function Jn(e,t,n,r,i,o,c,u){return{name:e,keyPath:t,unique:n,multi:r,auto:i,compound:o,src:(n&&!c?"&":"")+(r?"*":"")+(i?"++":"")+ui(t),type:u}}function ui(e){return typeof e=="string"?e:e?"["+[].join.call(e,"+")+"]":""}function Zn(e,t,n){return{name:e,primKey:t,indexes:n,mappedClass:null,idxByName:(r=function(i){return[i.name,i]},n.reduce(function(i,o,c){return o=r(o,c),o&&(i[o[0]]=o[1]),i},{}))};var r}var Kt=function(e){try{return e.only([[]]),Kt=function(){return[[]]},[[]]}catch{return Kt=function(){return Ge},Ge}};function er(e){return e==null?function(){}:typeof e=="string"?(t=e).split(".").length===1?function(n){return n[t]}:function(n){return Se(n,t)}:function(n){return Se(n,e)};var t}function di(e){return[].slice.call(e)}var Da=0;function jt(e){return e==null?":id":typeof e=="string"?e:"[".concat(e.join("+"),"]")}function Oa(e,t,y){function r(b){if(b.type===3)return null;if(b.type===4)throw new Error("Cannot convert never type to IDBKeyRange");var m=b.lower,k=b.upper,S=b.lowerOpen,b=b.upperOpen;return m===void 0?k===void 0?null:t.upperBound(k,!!b):k===void 0?t.lowerBound(m,!!S):t.bound(m,k,!!S,!!b)}function i(g){var m,k=g.name;return{name:k,schema:g,mutate:function(S){var b=S.trans,v=S.type,L=S.keys,C=S.values,x=S.range;return new Promise(function(T,D){T=ie(T);var j=b.objectStore(k),M=j.keyPath==null,O=v==="put"||v==="add";if(!O&&v!=="delete"&&v!=="deleteRange")throw new Error("Invalid operation type: "+v);var z,N=(L||C||{length:1}).length;if(L&&C&&L.length!==C.length)throw new Error("Given keys array must have same length as given values array.");if(N===0)return T({numFailures:0,failures:{},results:[],lastResult:void 0});function K(se){++ee,Dt(se)}var U=[],J=[],ee=0;if(v==="deleteRange"){if(x.type===4)return T({numFailures:ee,failures:J,results:[],lastResult:void 0});x.type===3?U.push(z=j.clear()):U.push(z=j.delete(r(x)))}else{var M=O?M?[C,L]:[C,null]:[L,null],X=M[0],G=M[1];if(O)for(var oe=0;oe<N;++oe)U.push(z=G&&G[oe]!==void 0?j[v](X[oe],G[oe]):j[v](X[oe])),z.onerror=K;else for(oe=0;oe<N;++oe)U.push(z=j[v](X[oe])),z.onerror=K}function we(se){se=se.target.result,U.forEach(function(et,gr){return et.error!=null&&(J[gr]=et.error)}),T({numFailures:ee,failures:J,results:v==="delete"?L:U.map(function(et){return et.result}),lastResult:se})}z.onerror=function(se){K(se),we(se)},z.onsuccess=we})},getMany:function(S){var b=S.trans,v=S.keys;return new Promise(function(L,C){L=ie(L);for(var x,T=b.objectStore(k),D=v.length,j=new Array(D),M=0,O=0,z=function(U){U=U.target,j[U._pos]=U.result,++O===M&&L(j)},N=xe(C),K=0;K<D;++K)v[K]!=null&&((x=T.get(v[K]))._pos=K,x.onsuccess=z,x.onerror=N,++M);M===0&&L(j)})},get:function(S){var b=S.trans,v=S.key;return new Promise(function(L,C){L=ie(L);var x=b.objectStore(k).get(v);x.onsuccess=function(T){return L(T.target.result)},x.onerror=xe(C)})},query:(m=u,function(S){return new Promise(function(b,v){b=ie(b);var L,C,x,O=S.trans,T=S.values,D=S.limit,M=S.query,j=D===1/0?void 0:D,z=M.index,M=M.range,O=O.objectStore(k),O=z.isPrimaryKey?O:O.index(z.name),z=r(M);if(D===0)return b({result:[]});m?((M=T?O.getAll(z,j):O.getAllKeys(z,j)).onsuccess=function(N){return b({result:N.target.result})},M.onerror=xe(v)):(L=0,C=!T&&"openKeyCursor"in O?O.openKeyCursor(z):O.openCursor(z),x=[],C.onsuccess=function(N){var K=C.result;return!K||(x.push(T?K.value:K.primaryKey),++L===D)?b({result:x}):void K.continue()},C.onerror=xe(v))})}),openCursor:function(S){var b=S.trans,v=S.values,L=S.query,C=S.reverse,x=S.unique;return new Promise(function(T,D){T=ie(T);var O=L.index,j=L.range,M=b.objectStore(k),M=O.isPrimaryKey?M:M.index(O.name),O=C?x?"prevunique":"prev":x?"nextunique":"next",z=!v&&"openKeyCursor"in M?M.openKeyCursor(r(j),O):M.openCursor(r(j),O);z.onerror=xe(D),z.onsuccess=ie(function(N){var K,U,J,ee,X=z.result;X?(X.___id=++Da,X.done=!1,K=X.continue.bind(X),U=(U=X.continuePrimaryKey)&&U.bind(X),J=X.advance.bind(X),ee=function(){throw new Error("Cursor not stopped")},X.trans=b,X.stop=X.continue=X.continuePrimaryKey=X.advance=function(){throw new Error("Cursor not started")},X.fail=ie(D),X.next=function(){var G=this,oe=1;return this.start(function(){return oe--?G.continue():G.stop()}).then(function(){return G})},X.start=function(G){function oe(){if(z.result)try{G()}catch(se){X.fail(se)}else X.done=!0,X.start=function(){throw new Error("Cursor behind last entry")},X.stop()}var we=new Promise(function(se,et){se=ie(se),z.onerror=xe(et),X.fail=et,X.stop=function(gr){X.stop=X.continue=X.continuePrimaryKey=X.advance=ee,se(gr)}});return z.onsuccess=ie(function(se){z.onsuccess=oe,oe()}),X.continue=K,X.continuePrimaryKey=U,X.advance=J,oe(),we},T(X)):T(null)},D)})},count:function(S){var b=S.query,v=S.trans,L=b.index,C=b.range;return new Promise(function(x,T){var D=v.objectStore(k),D=L.isPrimaryKey?D:D.index(L.name),j=r(C),j=j?D.count(j):D.count();j.onsuccess=ie(function(M){return x(M.target.result)}),j.onerror=xe(T)})}}}o=y,c=di((y=e).objectStoreNames);var o,y={schema:{name:y.name,tables:c.map(function(g){return o.objectStore(g)}).map(function(g){var m=g.keyPath,k=g.autoIncrement,b=h(m),S={},b={name:g.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:m==null,compound:b,keyPath:m,autoIncrement:k,unique:!0,extractKey:er(m)},indexes:di(g.indexNames).map(function(v){return g.index(v)}).map(function(x){var T=x.name,L=x.unique,C=x.multiEntry,x=x.keyPath,T={name:T,compound:h(x),keyPath:x,unique:L,multiEntry:C,extractKey:er(x)};return S[jt(x)]=T}),getIndexByKeyPath:function(v){return S[jt(v)]}};return S[":id"]=b.primaryKey,m!=null&&(S[jt(m)]=b.primaryKey),b})},hasGetAll:0<c.length&&"getAll"in o.objectStore(c[0])&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604)},c=y.schema,u=y.hasGetAll,y=c.tables.map(i),P={};return y.forEach(function(g){return P[g.name]=g}),{stack:"dbcore",transaction:e.transaction.bind(e),table:function(g){if(P[g])return P[g];throw new Error("Table '".concat(g,"' not found"))},MIN_KEY:-1/0,MAX_KEY:Kt(t),schema:c}}function Ka(e,t,n,r){return n=n.IDBKeyRange,t=Oa(t,n,r),{dbcore:e.dbcore.reduce(function(i,o){return o=o.create,l(l({},i),o(i))},t)}}function ln(e,t){var n=t.db,n=Ka(e._middlewares,n,e._deps,t);e.core=n.dbcore,e.tables.forEach(function(r){var i=r.name;e.core.schema.tables.some(function(o){return o.name===i})&&(r.core=e.core.table(i),e[i]instanceof e.Table)&&(e[i].core=r.core)})}function un(e,t,n,r){n.forEach(function(i){var o=r[i];t.forEach(function(c){var u=(function y(P,g){return te(P,g)||(P=$(P))&&y(P,g)})(c,i);(!u||"value"in u&&u.value===void 0)&&(c===e.Transaction.prototype||c instanceof e.Transaction?R(c,i,{get:function(){return this.table(i)},set:function(y){I(this,i,{value:y,writable:!0,configurable:!0,enumerable:!0})}}):c[i]=new e.Table(i,o))})})}function tr(e,t){t.forEach(function(n){for(var r in n)n[r]instanceof e.Table&&delete n[r]})}function ja(e,t){return e._cfg.version-t._cfg.version}function Ma(e,t,n,r){var i=e._dbSchema,o=(n.objectStoreNames.contains("$meta")&&!i.$meta&&(i.$meta=Zn("$meta",pi("")[0],[]),e._storeNames.push("$meta")),e._createTransaction("readwrite",e._storeNames,i)),c=(o.create(n),o._completion.catch(r),o._reject.bind(o)),u=H.transless||H;Oe(function(){if(H.trans=o,H.transless=u,t!==0)return ln(e,n),P=t,((y=o).storeNames.includes("$meta")?y.table("$meta").get("version").then(function(g){return g??P}):q.resolve(P)).then(function(L){var m=e,k=L,S=o,b=n,v=[],L=m._versions,C=m._dbSchema=fn(0,m.idbdb,b);return(L=L.filter(function(x){return x._cfg.version>=k})).length===0?q.resolve():(L.forEach(function(x){v.push(function(){var T,D,j,M=C,O=x._cfg.dbschema,z=(pn(m,M,b),pn(m,O,b),C=m._dbSchema=O,nr(M,O)),N=(z.add.forEach(function(K){rr(b,K[0],K[1].primKey,K[1].indexes)}),z.change.forEach(function(K){if(K.recreate)throw new V.Upgrade("Not yet support for changing primary key");var U=b.objectStore(K.name);K.add.forEach(function(J){return dn(U,J)}),K.change.forEach(function(J){U.deleteIndex(J.name),dn(U,J)}),K.del.forEach(function(J){return U.deleteIndex(J)})}),x._cfg.contentUpgrade);if(N&&x._cfg.version>k)return ln(m,b),S._memoizedTables={},T=Rr(O),z.del.forEach(function(K){T[K]=M[K]}),tr(m,[m.Transaction.prototype]),un(m,[m.Transaction.prototype],p(T),T),S.schema=T,(D=Kn(N))&&dt(),O=q.follow(function(){var K;(j=N(S))&&D&&(K=Ke.bind(null,null),j.then(K,K))}),j&&typeof j.then=="function"?q.resolve(j):O.then(function(){return j})}),v.push(function(T){var D,j,M=x._cfg.dbschema;D=M,j=T,[].slice.call(j.db.objectStoreNames).forEach(function(O){return D[O]==null&&j.db.deleteObjectStore(O)}),tr(m,[m.Transaction.prototype]),un(m,[m.Transaction.prototype],m._storeNames,m._dbSchema),S.schema=m._dbSchema}),v.push(function(T){m.idbdb.objectStoreNames.contains("$meta")&&(Math.ceil(m.idbdb.version/10)===x._cfg.version?(m.idbdb.deleteObjectStore("$meta"),delete m._dbSchema.$meta,m._storeNames=m._storeNames.filter(function(D){return D!=="$meta"})):T.objectStore("$meta").put(x._cfg.version,"version"))})}),(function x(){return v.length?q.resolve(v.shift()(S.idbtrans)).then(x):q.resolve()})().then(function(){fi(C,b)}))}).catch(c);var y,P;p(i).forEach(function(g){rr(n,g,i[g].primKey,i[g].indexes)}),ln(e,n),q.follow(function(){return e.on.populate.fire(o)}).catch(c)})}function qa(e,t){fi(e._dbSchema,t),t.db.version%10!=0||t.objectStoreNames.contains("$meta")||t.db.createObjectStore("$meta").add(Math.ceil(t.db.version/10-1),"version");var n=fn(0,e.idbdb,t);pn(e,e._dbSchema,t);for(var r=0,i=nr(n,e._dbSchema).change;r<i.length;r++){var o=(c=>{if(c.change.length||c.recreate)return console.warn("Unable to patch indexes of table ".concat(c.name," because it has changes on the type of index or primary key.")),{value:void 0};var u=t.objectStore(c.name);c.add.forEach(function(y){_e&&console.debug("Dexie upgrade patch: Creating missing index ".concat(c.name,".").concat(y.src)),dn(u,y)})})(i[r]);if(typeof o=="object")return o.value}}function nr(e,t){var n,r={del:[],add:[],change:[]};for(n in e)t[n]||r.del.push(n);for(n in t){var i=e[n],o=t[n];if(i){var c={name:n,def:o,recreate:!1,del:[],add:[],change:[]};if(""+(i.primKey.keyPath||"")!=""+(o.primKey.keyPath||"")||i.primKey.auto!==o.primKey.auto)c.recreate=!0,r.change.push(c);else{var u=i.idxByName,y=o.idxByName,P=void 0;for(P in u)y[P]||c.del.push(P);for(P in y){var g=u[P],m=y[P];g?g.src!==m.src&&c.change.push(m):c.add.push(m)}(0<c.del.length||0<c.add.length||0<c.change.length)&&r.change.push(c)}}else r.add.push([n,o])}return r}function rr(e,t,n,r){var i=e.db.createObjectStore(t,n.keyPath?{keyPath:n.keyPath,autoIncrement:n.auto}:{autoIncrement:n.auto});r.forEach(function(o){return dn(i,o)})}function fi(e,t){p(e).forEach(function(n){t.db.objectStoreNames.contains(n)||(_e&&console.debug("Dexie: Creating missing table",n),rr(t,n,e[n].primKey,e[n].indexes))})}function dn(e,t){e.createIndex(t.name,t.keyPath,{unique:t.unique,multiEntry:t.multi})}function fn(e,t,n){var r={};return at(t.objectStoreNames,0).forEach(function(i){for(var o=n.objectStore(i),c=Jn(ui(P=o.keyPath),P||"",!0,!1,!!o.autoIncrement,P&&typeof P!="string",!0),u=[],y=0;y<o.indexNames.length;++y){var g=o.index(o.indexNames[y]),P=g.keyPath,g=Jn(g.name,P,!!g.unique,!!g.multiEntry,!1,P&&typeof P!="string",!1);u.push(g)}r[i]=Zn(i,c,u)}),r}function pn(e,t,n){for(var r=n.db.objectStoreNames,i=0;i<r.length;++i){var o=r[i],c=n.objectStore(o);e._hasGetAll="getAll"in c;for(var u=0;u<c.indexNames.length;++u){var y,P=c.indexNames[u],g=c.index(P).keyPath,g=typeof g=="string"?g:"["+at(g).join("+")+"]";t[o]&&(y=t[o].idxByName[g])&&(y.name=P,delete t[o].idxByName[g],t[o].idxByName[P]=y)}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&w.WorkerGlobalScope&&w instanceof w.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(e._hasGetAll=!1)}function pi(e){return e.split(",").map(function(t,n){var i=t.split(":"),r=(r=i[1])==null?void 0:r.trim(),i=(t=i[0].trim()).replace(/([&*]|\+\+)/g,""),o=/^\[/.test(i)?i.match(/^\[(.*)\]$/)[1].split("+"):i;return Jn(i,o||null,/\&/.test(t),/\*/.test(t),/\+\+/.test(t),h(o),n===0,r)})}ht.prototype._createTableSchema=Zn,ht.prototype._parseIndexSyntax=pi,ht.prototype._parseStoresSpec=function(e,t){var n=this;p(e).forEach(function(r){if(e[r]!==null){var i=n._parseIndexSyntax(e[r]),o=i.shift();if(!o)throw new V.Schema("Invalid schema for table "+r+": "+e[r]);if(o.unique=!0,o.multi)throw new V.Schema("Primary key cannot be multiEntry*");i.forEach(function(c){if(c.auto)throw new V.Schema("Only primary key can be marked as autoIncrement (++)");if(!c.keyPath)throw new V.Schema("Index must have a name and cannot be an empty string")}),o=n._createTableSchema(r,o,i),t[r]=o}})},ht.prototype.stores=function(n){var t=this.db,n=(this._cfg.storesSource=this._cfg.storesSource?E(this._cfg.storesSource,n):n,t._versions),r={},i={};return n.forEach(function(o){E(r,o._cfg.storesSource),i=o._cfg.dbschema={},o._parseStoresSpec(r,i)}),t._dbSchema=i,tr(t,[t._allTables,t,t.Transaction.prototype]),un(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],p(i),i),t._storeNames=p(i),this},ht.prototype.upgrade=function(e){return this._cfg.contentUpgrade=Mn(this._cfg.contentUpgrade||ne,e),this};var Ra=ht;function ht(){}function ir(e,t){var n=e._dbNamesDB;return n||(n=e._dbNamesDB=new Te(nn,{addons:[],indexedDB:e,IDBKeyRange:t})).version(1).stores({dbnames:"name"}),n.table("dbnames")}function ar(e){return e&&typeof e.databases=="function"}function or(e){return Oe(function(){return H.letThrough=!0,e()})}function sr(e){return!("from"in e)}var fe=function(e,t){var n;if(!this)return n=new fe,e&&"d"in e&&E(n,e),n;E(this,arguments.length?{d:1,from:e,to:1<arguments.length?t:e}:{d:0})};function Mt(e,t,n){var r=Q(t,n);if(!isNaN(r)){if(0<r)throw RangeError();if(sr(e))return E(e,{from:t,to:n,d:1});var r=e.l,i=e.r;if(Q(n,e.from)<0)return r?Mt(r,t,n):e.l={from:t,to:n,d:1,l:null,r:null},hi(e);if(0<Q(t,e.to))return i?Mt(i,t,n):e.r={from:t,to:n,d:1,l:null,r:null},hi(e);Q(t,e.from)<0&&(e.from=t,e.l=null,e.d=i?i.d+1:1),0<Q(n,e.to)&&(e.to=n,e.r=null,e.d=e.l?e.l.d+1:1),t=!e.r,r&&!e.l&&qt(e,r),i&&t&&qt(e,i)}}function qt(e,t){sr(t)||(function n(r,i){var o=i.from,c=i.l,u=i.r;Mt(r,o,i.to),c&&n(r,c),u&&n(r,u)})(e,t)}function mi(e,t){var n=mn(t),r=n.next();if(!r.done)for(var i=r.value,o=mn(e),c=o.next(i.from),u=c.value;!r.done&&!c.done;){if(Q(u.from,i.to)<=0&&0<=Q(u.to,i.from))return!0;Q(i.from,u.from)<0?i=(r=n.next(u.from)).value:u=(c=o.next(i.from)).value}return!1}function mn(e){var t=sr(e)?null:{s:0,n:e};return{next:function(n){for(var r=0<arguments.length;t;)switch(t.s){case 0:if(t.s=1,r)for(;t.n.l&&Q(n,t.n.from)<0;)t={up:t,n:t.n.l,s:1};else for(;t.n.l;)t={up:t,n:t.n.l,s:1};case 1:if(t.s=2,!r||Q(n,t.n.to)<=0)return{value:t.n,done:!1};case 2:if(t.n.r){t.s=3,t={up:t,n:t.n.r,s:0};continue}case 3:t=t.up}return{done:!0}}}}function hi(e){var t,n,r,i=(((i=e.r)==null?void 0:i.d)||0)-(((i=e.l)==null?void 0:i.d)||0),i=1<i?"r":i<-1?"l":"";i&&(t=i=="r"?"l":"r",n=l({},e),r=e[i],e.from=r.from,e.to=r.to,e[i]=r[i],n[i]=r[t],(e[t]=n).d=vi(n)),e.d=vi(e)}function vi(n){var t=n.r,n=n.l;return(t?n?Math.max(t.d,n.d):t.d:n?n.d:0)+1}function hn(e,t){return p(t).forEach(function(n){e[n]?qt(e[n],t[n]):e[n]=(function r(i){var o,c,u={};for(o in i)B(i,o)&&(c=i[o],u[o]=!c||typeof c!="object"||Fr.has(c.constructor)?c:r(c));return u})(t[n])}),e}function cr(e,t){return e.all||t.all||Object.keys(e).some(function(n){return t[n]&&mi(t[n],e[n])})}_(fe.prototype,((he={add:function(e){return qt(this,e),this},addKey:function(e){return Mt(this,e,e),this},addKeys:function(e){var t=this;return e.forEach(function(n){return Mt(t,n,n)}),this},hasKey:function(e){var t=mn(this).next(e).value;return t&&Q(t.from,e)<=0&&0<=Q(t.to,e)}})[On]=function(){return mn(this)},he));var Je={},lr={},ur=!1;function vn(e){hn(lr,e),ur||(ur=!0,setTimeout(function(){ur=!1,dr(lr,!(lr={}))},0))}function dr(e,t){t===void 0&&(t=!1);var n=new Set;if(e.all)for(var r=0,i=Object.values(Je);r<i.length;r++)yi(u=i[r],e,n,t);else for(var o in e){var c,u,o=/^idb\:\/\/(.*)\/(.*)\//.exec(o);o&&(c=o[1],o=o[2],u=Je["idb://".concat(c,"/").concat(o)])&&yi(u,e,n,t)}n.forEach(function(y){return y()})}function yi(e,t,n,r){for(var i=[],o=0,c=Object.entries(e.queries.query);o<c.length;o++){for(var u=c[o],y=u[0],P=[],g=0,m=u[1];g<m.length;g++){var k=m[g];cr(t,k.obsSet)?k.subscribers.forEach(function(L){return n.add(L)}):r&&P.push(k)}r&&i.push([y,P])}if(r)for(var S=0,b=i;S<b.length;S++){var v=b[S],y=v[0],P=v[1];e.queries.query[y]=P}}function Na(e){var t=e._state,n=e._deps.indexedDB;if(t.isBeingOpened||e.idbdb)return t.dbReadyPromise.then(function(){return t.dbOpenError?ce(t.dbOpenError):e});t.isBeingOpened=!0,t.dbOpenError=null,t.openComplete=!1;var r=t.openCanceller,i=Math.round(10*e.verno),o=!1;function c(){if(t.openCanceller!==r)throw new V.DatabaseClosed("db.open() was cancelled")}function u(){return new q(function(k,S){if(c(),!n)throw new V.MissingAPI;var b=e.name,v=t.autoSchema||!i?n.open(b):n.open(b,i);if(!v)throw new V.MissingAPI;v.onerror=xe(S),v.onblocked=ie(e._fireOnBlocked),v.onupgradeneeded=ie(function(L){var C;g=v.transaction,t.autoSchema&&!e._options.allowEmptyDB?(v.onerror=Dt,g.abort(),v.result.close(),(C=n.deleteDatabase(b)).onsuccess=C.onerror=ie(function(){S(new V.NoSuchDatabase("Database ".concat(b," doesnt exist")))})):(g.onerror=xe(S),C=L.oldVersion>Math.pow(2,62)?0:L.oldVersion,m=C<1,e.idbdb=v.result,o&&qa(e,g),Ma(e,C/10,g,S))},S),v.onsuccess=ie(function(){g=null;var L,C,x,T,D,j,M=e.idbdb=v.result,O=at(M.objectStoreNames);if(0<O.length)try{var z=M.transaction((D=O).length===1?D[0]:D,"readonly");if(t.autoSchema)j=M,T=z,(x=e).verno=j.version/10,T=x._dbSchema=fn(0,j,T),x._storeNames=at(j.objectStoreNames,0),un(x,[x._allTables],p(T),T);else if(pn(e,e._dbSchema,z),C=z,((C=nr(fn(0,(L=e).idbdb,C),L._dbSchema)).add.length||C.change.some(function(N){return N.add.length||N.change.length}))&&!o)return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."),M.close(),i=M.version+1,o=!0,k(u());ln(e,z)}catch{}ft.push(e),M.onversionchange=ie(function(N){t.vcFired=!0,e.on("versionchange").fire(N)}),M.onclose=ie(function(){e.close({disableAutoOpen:!1})}),m&&(O=e._deps,D=b,ar(j=O.indexedDB)||D===nn||ir(j,O.IDBKeyRange).put({name:D}).catch(ne)),k()},S)}).catch(function(k){switch(k?.name){case"UnknownError":if(0<t.PR1398_maxLoop)return t.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),u();break;case"VersionError":if(0<i)return i=0,u()}return q.reject(k)})}var y,P=t.dbReadyResolve,g=null,m=!1;return q.race([r,(typeof navigator>"u"?q.resolve():!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(k){function S(){return indexedDB.databases().finally(k)}y=setInterval(S,100),S()}).finally(function(){return clearInterval(y)}):Promise.resolve()).then(u)]).then(function(){return c(),t.onReadyBeingFired=[],q.resolve(or(function(){return e.on.ready.fire(e.vip)})).then(function k(){var S;if(0<t.onReadyBeingFired.length)return S=t.onReadyBeingFired.reduce(Mn,ne),t.onReadyBeingFired=[],q.resolve(or(function(){return S(e.vip)})).then(k)})}).finally(function(){t.openCanceller===r&&(t.onReadyBeingFired=null,t.isBeingOpened=!1)}).catch(function(k){t.dbOpenError=k;try{g&&g.abort()}catch{}return r===t.openCanceller&&e._close(),ce(k)}).finally(function(){t.openComplete=!0,P()}).then(function(){var k;return m&&(k={},e.tables.forEach(function(S){S.schema.indexes.forEach(function(b){b.name&&(k["idb://".concat(e.name,"/").concat(S.name,"/").concat(b.name)]=new fe(-1/0,[[[]]]))}),k["idb://".concat(e.name,"/").concat(S.name,"/")]=k["idb://".concat(e.name,"/").concat(S.name,"/:dels")]=new fe(-1/0,[[[]]])}),qe(Ot).fire(k),dr(k,!0)),e})}function fr(e){function t(o){return e.next(o)}var n=i(t),r=i(function(o){return e.throw(o)});function i(o){return function(u){var u=o(u),y=u.value;return u.done?y:y&&typeof y.then=="function"?y.then(n,r):h(y)?Promise.all(y).then(n,r):n(y)}}return i(t)()}function yn(e,t,n){for(var r=h(e)?e.slice():[e],i=0;i<n;++i)r.push(t);return r}var Fa={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(e){return l(l({},e),{table:function(r){var n=e.table(r),r=n.schema,i={},o=[];function c(k,S,b){var x=jt(k),v=i[x]=i[x]||[],L=k==null?0:typeof k=="string"?1:k.length,C=0<S,x=l(l({},b),{name:C?"".concat(x,"(virtual-from:").concat(b.name,")"):b.name,lowLevelIndex:b,isVirtual:C,keyTail:S,keyLength:L,extractKey:er(k),unique:!C&&b.unique});return v.push(x),x.isPrimaryKey||o.push(x),1<L&&c(L===2?k[0]:k.slice(0,L-1),S+1,b),v.sort(function(T,D){return T.keyTail-D.keyTail}),x}var u=c(r.primaryKey.keyPath,0,r.primaryKey);i[":id"]=[u];for(var y=0,P=r.indexes;y<P.length;y++){var g=P[y];c(g.keyPath,0,g)}function m(k){var S,b=k.query.index;return b.isVirtual?l(l({},k),{query:{index:b.lowLevelIndex,range:(S=k.query.range,b=b.keyTail,{type:S.type===1?2:S.type,lower:yn(S.lower,S.lowerOpen?e.MAX_KEY:e.MIN_KEY,b),lowerOpen:!0,upper:yn(S.upper,S.upperOpen?e.MIN_KEY:e.MAX_KEY,b),upperOpen:!0})}}):k}return l(l({},n),{schema:l(l({},r),{primaryKey:u,indexes:o,getIndexByKeyPath:function(k){return(k=i[jt(k)])&&k[0]}}),count:function(k){return n.count(m(k))},query:function(k){return n.query(m(k))},openCursor:function(k){var S=k.query.index,b=S.keyTail,v=S.keyLength;return S.isVirtual?n.openCursor(m(k)).then(function(C){return C&&L(C)}):n.openCursor(k);function L(C){return Object.create(C,{continue:{value:function(x){x!=null?C.continue(yn(x,k.reverse?e.MAX_KEY:e.MIN_KEY,b)):k.unique?C.continue(C.key.slice(0,v).concat(k.reverse?e.MIN_KEY:e.MAX_KEY,b)):C.continue()}},continuePrimaryKey:{value:function(x,T){C.continuePrimaryKey(yn(x,e.MAX_KEY,b),T)}},primaryKey:{get:function(){return C.primaryKey}},key:{get:function(){var x=C.key;return v===1?x[0]:x.slice(0,v)}},value:{get:function(){return C.value}}})}}})}})}};function pr(e,t,n,r){return n=n||{},r=r||"",p(e).forEach(function(i){var o,c,u;B(t,i)?(o=e[i],c=t[i],typeof o=="object"&&typeof c=="object"&&o&&c?(u=Dn(o))!==Dn(c)?n[r+i]=t[i]:u==="Object"?pr(o,c,n,r+i+"."):o!==c&&(n[r+i]=t[i]):o!==c&&(n[r+i]=t[i])):n[r+i]=void 0}),p(t).forEach(function(i){B(e,i)||(n[r+i]=t[i])}),n}function mr(e,t){return t.type==="delete"?t.keys:t.keys||t.values.map(e.extractKey)}var za={stack:"dbcore",name:"HooksMiddleware",level:2,create:function(e){return l(l({},e),{table:function(t){var n=e.table(t),r=n.schema.primaryKey;return l(l({},n),{mutate:function(i){var o=H.trans,c=o.table(t).hook,u=c.deleting,y=c.creating,P=c.updating;switch(i.type){case"add":if(y.fire===ne)break;return o._promise("readwrite",function(){return g(i)},!0);case"put":if(y.fire===ne&&P.fire===ne)break;return o._promise("readwrite",function(){return g(i)},!0);case"delete":if(u.fire===ne)break;return o._promise("readwrite",function(){return g(i)},!0);case"deleteRange":if(u.fire===ne)break;return o._promise("readwrite",function(){return(function m(k,S,b){return n.query({trans:k,values:!1,query:{index:r,range:S},limit:b}).then(function(v){var L=v.result;return g({type:"delete",keys:L,trans:k}).then(function(C){return 0<C.numFailures?Promise.reject(C.failures[0]):L.length<b?{failures:[],numFailures:0,lastResult:void 0}:m(k,l(l({},S),{lower:L[L.length-1],lowerOpen:!0}),b)})})})(i.trans,i.range,1e4)},!0)}return n.mutate(i);function g(m){var k,S,b,v=H.trans,L=m.keys||mr(r,m);if(L)return(m=m.type==="add"||m.type==="put"?l(l({},m),{keys:L}):l({},m)).type!=="delete"&&(m.values=f([],m.values)),m.keys&&(m.keys=f([],m.keys)),k=n,b=L,((S=m).type==="add"?Promise.resolve([]):k.getMany({trans:S.trans,keys:b,cache:"immutable"})).then(function(C){var x=L.map(function(T,D){var j,M,O,z=C[D],N={onerror:null,onsuccess:null};return m.type==="delete"?u.fire.call(N,T,z,v):m.type==="add"||z===void 0?(j=y.fire.call(N,T,m.values[D],v),T==null&&j!=null&&(m.keys[D]=T=j,r.outbound||pe(m.values[D],r.keyPath,T))):(j=pr(z,m.values[D]),(M=P.fire.call(N,j,T,z,v))&&(O=m.values[D],Object.keys(M).forEach(function(K){B(O,K)?O[K]=M[K]:pe(O,K,M[K])}))),N});return n.mutate(m).then(function(T){for(var D=T.failures,j=T.results,M=T.numFailures,T=T.lastResult,O=0;O<L.length;++O){var z=(j||L)[O],N=x[O];z==null?N.onerror&&N.onerror(D[O]):N.onsuccess&&N.onsuccess(m.type==="put"&&C[O]?m.values[O]:z)}return{failures:D,results:j,numFailures:M,lastResult:T}}).catch(function(T){return x.forEach(function(D){return D.onerror&&D.onerror(T)}),Promise.reject(T)})});throw new Error("Keys missing")}}})}})}};function gi(e,t,n){try{if(!t||t.keys.length<e.length)return null;for(var r=[],i=0,o=0;i<t.keys.length&&o<e.length;++i)Q(t.keys[i],e[o])===0&&(r.push(n?ze(t.values[i]):t.values[i]),++o);return r.length===e.length?r:null}catch{return null}}var Ua={stack:"dbcore",level:-1,create:function(e){return{table:function(t){var n=e.table(t);return l(l({},n),{getMany:function(r){var i;return r.cache?(i=gi(r.keys,r.trans._cache,r.cache==="clone"))?q.resolve(i):n.getMany(r).then(function(o){return r.trans._cache={keys:r.keys,values:r.cache==="clone"?ze(o):o},o}):n.getMany(r)},mutate:function(r){return r.type!=="add"&&(r.trans._cache=null),n.mutate(r)}})}}}};function bi(e,t){return e.trans.mode==="readonly"&&!!e.subscr&&!e.trans.explicit&&e.trans.db._options.cache!=="disabled"&&!t.schema.primaryKey.outbound}function wi(e,t){switch(e){case"query":return t.values&&!t.unique;case"get":case"getMany":case"count":case"openCursor":return!1}}var Ha={stack:"dbcore",level:0,name:"Observability",create:function(e){var t=e.schema.name,n=new fe(e.MIN_KEY,e.MAX_KEY);return l(l({},e),{transaction:function(r,i,o){if(H.subscr&&i!=="readonly")throw new V.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(H.querier));return e.transaction(r,i,o)},table:function(r){function i(L){var v,L=L.query;return[v=L.index,new fe((v=(L=L.range).lower)!=null?v:e.MIN_KEY,(v=L.upper)!=null?v:e.MAX_KEY)]}var o=e.table(r),c=o.schema,u=c.primaryKey,y=c.indexes,P=u.extractKey,g=u.outbound,m=u.autoIncrement&&y.filter(function(b){return b.compound&&b.keyPath.includes(u.keyPath)}),k=l(l({},o),{mutate:function(b){function v(U){return U="idb://".concat(t,"/").concat(r,"/").concat(U),D[U]||(D[U]=new fe)}var L,C,x,T=b.trans,D=b.mutatedParts||(b.mutatedParts={}),j=v(""),M=v(":dels"),O=b.type,N=b.type==="deleteRange"?[b.range]:b.type==="delete"?[b.keys]:b.values.length<50?[mr(u,b).filter(function(U){return U}),b.values]:[],z=N[0],N=N[1],K=b.trans._cache;return h(z)?(j.addKeys(z),(O=O==="delete"||z.length===N.length?gi(z,K):null)||M.addKeys(z),(O||N)&&(L=v,C=O,x=N,c.indexes.forEach(function(U){var J=L(U.name||"");function ee(G){return G!=null?U.extractKey(G):null}function X(G){U.multiEntry&&h(G)?G.forEach(function(oe){return J.addKey(oe)}):J.addKey(G)}(C||x).forEach(function(G,se){var we=C&&ee(C[se]),se=x&&ee(x[se]);Q(we,se)!==0&&(we!=null&&X(we),se!=null)&&X(se)})}))):z?(N={from:(K=z.lower)!=null?K:e.MIN_KEY,to:(O=z.upper)!=null?O:e.MAX_KEY},M.add(N),j.add(N)):(j.add(n),M.add(n),c.indexes.forEach(function(U){return v(U.name).add(n)})),o.mutate(b).then(function(U){return!z||b.type!=="add"&&b.type!=="put"||(j.addKeys(U.results),m&&m.forEach(function(J){for(var ee=b.values.map(function(we){return J.extractKey(we)}),X=J.keyPath.findIndex(function(we){return we===u.keyPath}),G=0,oe=U.results.length;G<oe;++G)ee[G][X]=U.results[G];v(J.name).addKeys(ee)})),T.mutatedParts=hn(T.mutatedParts||{},D),U})}}),S={get:function(b){return[u,new fe(b.key)]},getMany:function(b){return[u,new fe().addKeys(b.keys)]},count:i,query:i,openCursor:i};return p(S).forEach(function(b){k[b]=function(v){var L=H.subscr,C=!!L,x=bi(H,o)&&wi(b,v)?v.obsSet={}:L;if(C){var T,L=function(N){return N="idb://".concat(t,"/").concat(r,"/").concat(N),x[N]||(x[N]=new fe)},D=L(""),j=L(":dels"),C=S[b](v),M=C[0],C=C[1];if((b==="query"&&M.isPrimaryKey&&!v.values?j:L(M.name||"")).add(C),!M.isPrimaryKey){if(b!=="count")return T=b==="query"&&g&&v.values&&o.query(l(l({},v),{values:!1})),o[b].apply(this,arguments).then(function(N){if(b==="query"){if(g&&v.values)return T.then(function(ee){return ee=ee.result,D.addKeys(ee),N});var K=v.values?N.result.map(P):N.result;(v.values?D:j).addKeys(K)}else{var U,J;if(b==="openCursor")return J=v.values,(U=N)&&Object.create(U,{key:{get:function(){return j.addKey(U.primaryKey),U.key}},primaryKey:{get:function(){var ee=U.primaryKey;return j.addKey(ee),ee}},value:{get:function(){return J&&D.addKey(U.primaryKey),U.value}}})}return N});j.add(n)}}return o[b].apply(this,arguments)}}),k}})}};function ki(e,t,n){var r;return n.numFailures===0?t:t.type==="deleteRange"||(r=t.keys?t.keys.length:"values"in t&&t.values?t.values.length:1,n.numFailures===r)?null:(r=l({},t),h(r.keys)&&(r.keys=r.keys.filter(function(i,o){return!(o in n.failures)})),"values"in r&&h(r.values)&&(r.values=r.values.filter(function(i,o){return!(o in n.failures)})),r)}function hr(e,t){return n=e,((r=t).lower===void 0||(r.lowerOpen?0<Q(n,r.lower):0<=Q(n,r.lower)))&&(n=e,(r=t).upper===void 0||(r.upperOpen?Q(n,r.upper)<0:Q(n,r.upper)<=0));var n,r}function Si(e,t,n,r,i,o){var c,u,y,P,g,m;return!n||n.length===0||(c=t.query.index,u=c.multiEntry,y=t.query.range,P=r.schema.primaryKey.extractKey,g=c.extractKey,m=(c.lowLevelIndex||c).extractKey,(r=n.reduce(function(k,S){var b=k,v=[];if(S.type==="add"||S.type==="put")for(var L=new fe,C=S.values.length-1;0<=C;--C){var x,T=S.values[C],D=P(T);!L.hasKey(D)&&(x=g(T),u&&h(x)?x.some(function(N){return hr(N,y)}):hr(x,y))&&(L.addKey(D),v.push(T))}switch(S.type){case"add":var j=new fe().addKeys(t.values?k.map(function(K){return P(K)}):k),b=k.concat(t.values?v.filter(function(K){return K=P(K),!j.hasKey(K)&&(j.addKey(K),!0)}):v.map(function(K){return P(K)}).filter(function(K){return!j.hasKey(K)&&(j.addKey(K),!0)}));break;case"put":var M=new fe().addKeys(S.values.map(function(K){return P(K)}));b=k.filter(function(K){return!M.hasKey(t.values?P(K):K)}).concat(t.values?v:v.map(function(K){return P(K)}));break;case"delete":var O=new fe().addKeys(S.keys);b=k.filter(function(K){return!O.hasKey(t.values?P(K):K)});break;case"deleteRange":var z=S.range;b=k.filter(function(K){return!hr(P(K),z)})}return b},e))===e)?e:(r.sort(function(k,S){return Q(m(k),m(S))||Q(P(k),P(S))}),t.limit&&t.limit<1/0&&(r.length>t.limit?r.length=t.limit:e.length===t.limit&&r.length<t.limit&&(i.dirty=!0)),o?Object.freeze(r):r)}function Ei(e,t){return Q(e.lower,t.lower)===0&&Q(e.upper,t.upper)===0&&!!e.lowerOpen==!!t.lowerOpen&&!!e.upperOpen==!!t.upperOpen}function Va(e,t){return((n,r,i,o)=>{if(n===void 0)return r!==void 0?-1:0;if(r===void 0)return 1;if((n=Q(n,r))===0){if(i&&o)return 0;if(i)return 1;if(o)return-1}return n})(e.lower,t.lower,e.lowerOpen,t.lowerOpen)<=0&&0<=((n,r,i,o)=>{if(n===void 0)return r!==void 0?1:0;if(r===void 0)return-1;if((n=Q(n,r))===0){if(i&&o)return 0;if(i)return-1;if(o)return 1}return n})(e.upper,t.upper,e.upperOpen,t.upperOpen)}function Xa(e,t,n,r){e.subscribers.add(n),r.addEventListener("abort",function(){var i,o;e.subscribers.delete(n),e.subscribers.size===0&&(i=e,o=t,setTimeout(function(){i.subscribers.size===0&&Ue(o,i)},3e3))})}var Wa={stack:"dbcore",level:0,name:"Cache",create:function(e){var t=e.schema.name;return l(l({},e),{transaction:function(n,r,i){var o,c,u=e.transaction(n,r,i);return r==="readwrite"&&(i=(o=new AbortController).signal,u.addEventListener("abort",(c=function(y){return function(){if(o.abort(),r==="readwrite"){for(var P=new Set,g=0,m=n;g<m.length;g++){var k=m[g],S=Je["idb://".concat(t,"/").concat(k)];if(S){var b=e.table(k),v=S.optimisticOps.filter(function(U){return U.trans===u});if(u._explicit&&y&&u.mutatedParts)for(var L=0,C=Object.values(S.queries.query);L<C.length;L++)for(var x=0,T=(M=C[L]).slice();x<T.length;x++)cr((O=T[x]).obsSet,u.mutatedParts)&&(Ue(M,O),O.subscribers.forEach(function(U){return P.add(U)}));else if(0<v.length){S.optimisticOps=S.optimisticOps.filter(function(U){return U.trans!==u});for(var D=0,j=Object.values(S.queries.query);D<j.length;D++)for(var M,O,z,N=0,K=(M=j[D]).slice();N<K.length;N++)(O=K[N]).res!=null&&u.mutatedParts&&(y&&!O.dirty?(z=Object.isFrozen(O.res),z=Si(O.res,O.req,v,b,O,z),O.dirty?(Ue(M,O),O.subscribers.forEach(function(U){return P.add(U)})):z!==O.res&&(O.res=z,O.promise=q.resolve({result:z}))):(O.dirty&&Ue(M,O),O.subscribers.forEach(function(U){return P.add(U)})))}}}P.forEach(function(U){return U()})}}})(!1),{signal:i}),u.addEventListener("error",c(!1),{signal:i}),u.addEventListener("complete",c(!0),{signal:i})),u},table:function(n){var r=e.table(n),i=r.schema.primaryKey;return l(l({},r),{mutate:function(o){var c,u=H.trans;return!i.outbound&&u.db._options.cache!=="disabled"&&!u.explicit&&u.idbtrans.mode==="readwrite"&&(c=Je["idb://".concat(t,"/").concat(n)])?(u=r.mutate(o),o.type!=="add"&&o.type!=="put"||!(50<=o.values.length||mr(i,o).some(function(y){return y==null}))?(c.optimisticOps.push(o),o.mutatedParts&&vn(o.mutatedParts),u.then(function(y){0<y.numFailures&&(Ue(c.optimisticOps,o),(y=ki(0,o,y))&&c.optimisticOps.push(y),o.mutatedParts)&&vn(o.mutatedParts)}),u.catch(function(){Ue(c.optimisticOps,o),o.mutatedParts&&vn(o.mutatedParts)})):u.then(function(y){var P=ki(0,l(l({},o),{values:o.values.map(function(g,m){var k;return y.failures[m]?g:(pe(k=(k=i.keyPath)!=null&&k.includes(".")?ze(g):l({},g),i.keyPath,y.results[m]),k)})}),y);c.optimisticOps.push(P),queueMicrotask(function(){return o.mutatedParts&&vn(o.mutatedParts)})}),u):r.mutate(o)},query:function(o){var c,u,y,P,g,m,k;return bi(H,r)&&wi("query",o)?(c=((y=H.trans)==null?void 0:y.db._options.cache)==="immutable",u=(y=H).requery,y=y.signal,m=((S,b,v,L)=>{var C=Je["idb://".concat(S,"/").concat(b)];if(!C)return[];if(!(S=C.queries[v]))return[null,!1,C,null];var x=S[(L.query?L.query.index.name:null)||""];if(!x)return[null,!1,C,null];switch(v){case"query":var T=x.find(function(D){return D.req.limit===L.limit&&D.req.values===L.values&&Ei(D.req.query.range,L.query.range)});return T?[T,!0,C,x]:[x.find(function(D){return("limit"in D.req?D.req.limit:1/0)>=L.limit&&(!L.values||D.req.values)&&Va(D.req.query.range,L.query.range)}),!1,C,x];case"count":return T=x.find(function(D){return Ei(D.req.query.range,L.query.range)}),[T,!!T,C,x]}})(t,n,"query",o),k=m[0],P=m[2],g=m[3],k&&m[1]?k.obsSet=o.obsSet:(m=r.query(o).then(function(S){var b=S.result;if(k&&(k.res=b),c){for(var v=0,L=b.length;v<L;++v)Object.freeze(b[v]);Object.freeze(b)}else S.result=ze(b);return S}).catch(function(S){return g&&k&&Ue(g,k),Promise.reject(S)}),k={obsSet:o.obsSet,promise:m,subscribers:new Set,type:"query",req:o,dirty:!1},g?g.push(k):(g=[k],(P=P||(Je["idb://".concat(t,"/").concat(n)]={queries:{query:{},count:{}},objs:new Map,optimisticOps:[],unsignaledParts:{}})).queries.query[o.query.index.name||""]=g)),Xa(k,g,u,y),k.promise.then(function(S){return{result:Si(S.result,o,P?.optimisticOps,r,k,c)}})):r.query(o)}})}})}};function gn(e,t){return new Proxy(e,{get:function(n,r,i){return r==="db"?t:Reflect.get(n,r,i)}})}le.prototype.version=function(e){if(isNaN(e)||e<.1)throw new V.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new V.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);var t=this._versions,n=t.filter(function(r){return r._cfg.version===e})[0];return n||(n=new this.Version(e),t.push(n),t.sort(ja),n.stores({}),this._state.autoSchema=!1),n},le.prototype._whenReady=function(e){var t=this;return this.idbdb&&(this._state.openComplete||H.letThrough||this._vip)?e():new q(function(n,r){if(t._state.openComplete)return r(new V.DatabaseClosed(t._state.dbOpenError));if(!t._state.isBeingOpened){if(!t._state.autoOpen)return void r(new V.DatabaseClosed);t.open().catch(ne)}t._state.dbReadyPromise.then(n,r)}).then(e)},le.prototype.use=function(i){var t=i.stack,n=i.create,r=i.level,i=i.name,o=(i&&this.unuse({stack:t,name:i}),this._middlewares[t]||(this._middlewares[t]=[]));return o.push({stack:t,create:n,level:r??10,name:i}),o.sort(function(c,u){return c.level-u.level}),this},le.prototype.unuse=function(e){var t=e.stack,n=e.name,r=e.create;return t&&this._middlewares[t]&&(this._middlewares[t]=this._middlewares[t].filter(function(i){return r?i.create!==r:!!n&&i.name!==n})),this},le.prototype.open=function(){var e=this;return Ye(De,function(){return Na(e)})},le.prototype._close=function(){this.on.close.fire(new CustomEvent("close"));var e=this._state,t=ft.indexOf(this);if(0<=t&&ft.splice(t,1),this.idbdb){try{this.idbdb.close()}catch{}this.idbdb=null}e.isBeingOpened||(e.dbReadyPromise=new q(function(n){e.dbReadyResolve=n}),e.openCanceller=new q(function(n,r){e.cancelOpen=r}))},le.prototype.close=function(t){var t=(t===void 0?{disableAutoOpen:!0}:t).disableAutoOpen,n=this._state;t?(n.isBeingOpened&&n.cancelOpen(new V.DatabaseClosed),this._close(),n.autoOpen=!1,n.dbOpenError=new V.DatabaseClosed):(this._close(),n.autoOpen=this._options.autoOpen||n.isBeingOpened,n.openComplete=!1,n.dbOpenError=null)},le.prototype.delete=function(e){var t=this,n=(e===void 0&&(e={disableAutoOpen:!0}),0<arguments.length&&typeof arguments[0]!="object"),r=this._state;return new q(function(i,o){function c(){t.close(e);var u=t._deps.indexedDB.deleteDatabase(t.name);u.onsuccess=ie(function(){var y,P,g;y=t._deps,P=t.name,ar(g=y.indexedDB)||P===nn||ir(g,y.IDBKeyRange).delete(P).catch(ne),i()}),u.onerror=xe(o),u.onblocked=t._fireOnBlocked}if(n)throw new V.InvalidArgument("Invalid closeOptions argument to db.delete()");r.isBeingOpened?r.dbReadyPromise.then(c):c()})},le.prototype.backendDB=function(){return this.idbdb},le.prototype.isOpen=function(){return this.idbdb!==null},le.prototype.hasBeenClosed=function(){var e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"},le.prototype.hasFailed=function(){return this._state.dbOpenError!==null},le.prototype.dynamicallyOpened=function(){return this._state.autoSchema},Object.defineProperty(le.prototype,"tables",{get:function(){var e=this;return p(this._allTables).map(function(t){return e._allTables[t]})},enumerable:!1,configurable:!0}),le.prototype.transaction=function(){var e=(function(t,n,r){var i=arguments.length;if(i<2)throw new V.InvalidArgument("Too few arguments");for(var o=new Array(i-1);--i;)o[i-1]=arguments[i];return r=o.pop(),[t,Nr(o),r]}).apply(this,arguments);return this._transaction.apply(this,e)},le.prototype._transaction=function(e,t,n){var r,i,o=this,c=H.trans,u=(c&&c.db===this&&e.indexOf("!")===-1||(c=null),e.indexOf("?")!==-1);e=e.replace("!","").replace("?","");try{if(i=t.map(function(P){if(P=P instanceof o.Table?P.name:P,typeof P!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return P}),e=="r"||e===Xn)r=Xn;else{if(e!="rw"&&e!=Wn)throw new V.InvalidArgument("Invalid transaction mode: "+e);r=Wn}if(c){if(c.mode===Xn&&r===Wn){if(!u)throw new V.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");c=null}c&&i.forEach(function(P){if(c&&c.storeNames.indexOf(P)===-1){if(!u)throw new V.SubTransaction("Table "+P+" not included in parent transaction.");c=null}}),u&&c&&!c.active&&(c=null)}}catch(P){return c?c._promise(null,function(g,m){m(P)}):ce(P)}var y=(function P(g,m,k,S,b){return q.resolve().then(function(){var x=H.transless||H,v=g._createTransaction(m,k,g._dbSchema,S),x=(v.explicit=!0,{trans:v,transless:x});if(S)v.idbtrans=S.idbtrans;else try{v.create(),v.idbtrans._explicit=!0,g._state.PR1398_maxLoop=3}catch(T){return T.name===jn.InvalidState&&g.isOpen()&&0<--g._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),g.close({disableAutoOpen:!1}),g.open().then(function(){return P(g,m,k,null,b)})):ce(T)}var L,C=Kn(b),x=(C&&dt(),q.follow(function(){var T;(L=b.call(v,v))&&(C?(T=Ke.bind(null,null),L.then(T,T)):typeof L.next=="function"&&typeof L.throw=="function"&&(L=fr(L)))},x));return(L&&typeof L.then=="function"?q.resolve(L).then(function(T){return v.active?T:ce(new V.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))}):x.then(function(){return L})).then(function(T){return S&&v._resolve(),v._completion.then(function(){return T})}).catch(function(T){return v._reject(T),ce(T)})})}).bind(null,this,r,i,c,n);return c?c._promise(r,y,"lock"):H.trans?Ye(H.transless,function(){return o._whenReady(y)}):this._whenReady(y)},le.prototype.table=function(e){if(B(this._allTables,e))return this._allTables[e];throw new V.InvalidTable("Table ".concat(e," does not exist"))};var Te=le;function le(e,t){var n,r,i,o,c,u=this,y=(this._middlewares={},this.verno=0,le.dependencies),y=(this._options=t=l({addons:le.addons,autoOpen:!0,indexedDB:y.indexedDB,IDBKeyRange:y.IDBKeyRange,cache:"cloned"},t),this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange},t.addons),P=(this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this,{dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:ne,dbReadyPromise:null,cancelOpen:ne,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3,autoOpen:t.autoOpen}),g=(P.dbReadyPromise=new q(function(m){P.dbReadyResolve=m}),P.openCanceller=new q(function(m,k){P.cancelOpen=k}),this._state=P,this.name=e,this.on=Tt(this,"populate","blocked","versionchange","close",{ready:[Mn,ne]}),this.once=function(m,k){var S=function(){for(var b=[],v=0;v<arguments.length;v++)b[v]=arguments[v];u.on(m).unsubscribe(S),k.apply(u,b)};return u.on(m,S)},this.on.ready.subscribe=_t(this.on.ready.subscribe,function(m){return function(k,S){le.vip(function(){var b,v=u._state;v.openComplete?(v.dbOpenError||q.resolve().then(k),S&&m(k)):v.onReadyBeingFired?(v.onReadyBeingFired.push(k),S&&m(k)):(m(k),b=u,S||m(function L(){b.on.ready.unsubscribe(k),b.on.ready.unsubscribe(L)}))})}}),this.Collection=(n=this,Bt($a.prototype,function(L,v){this.db=n;var S=Jr,b=null;if(v)try{S=v()}catch(x){b=x}var v=L._ctx,L=v.table,C=L.hook.reading.fire;this._ctx={table:L,index:v.index,isPrimKey:!v.index||L.schema.primKey.keyPath&&v.index===L.schema.primKey.name,range:S,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:b,or:v.or,valueMapper:C!==Pt?C:null}})),this.Table=(r=this,Bt(ii.prototype,function(m,k,S){this.db=r,this._tx=S,this.name=m,this.schema=k,this.hook=r._allTables[m]?r._allTables[m].hook:Tt(null,{creating:[ka,ne],reading:[wa,Pt],updating:[Ea,ne],deleting:[Sa,ne]})})),this.Transaction=(i=this,Bt(Ba.prototype,function(m,k,S,b,v){var L=this;m!=="readonly"&&k.forEach(function(C){C=(C=S[C])==null?void 0:C.yProps,C&&(k=k.concat(C.map(function(x){return x.updatesTable})))}),this.db=i,this.mode=m,this.storeNames=k,this.schema=S,this.chromeTransactionDurability=b,this.idbtrans=null,this.on=Tt(this,"complete","error","abort"),this.parent=v||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new q(function(C,x){L._resolve=C,L._reject=x}),this._completion.then(function(){L.active=!1,L.on.complete.fire()},function(C){var x=L.active;return L.active=!1,L.on.error.fire(C),L.parent?L.parent._reject(C):x&&L.idbtrans&&L.idbtrans.abort(),ce(C)})})),this.Version=(o=this,Bt(Ra.prototype,function(m){this.db=o,this._cfg={version:m,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})),this.WhereClause=(c=this,Bt(li.prototype,function(m,k,S){if(this.db=c,this._ctx={table:m,index:k===":id"?null:k,or:S},this._cmp=this._ascending=Q,this._descending=function(b,v){return Q(v,b)},this._max=function(b,v){return 0<Q(b,v)?b:v},this._min=function(b,v){return Q(b,v)<0?b:v},this._IDBKeyRange=c._deps.IDBKeyRange,!this._IDBKeyRange)throw new V.MissingAPI})),this.on("versionchange",function(m){0<m.newVersion?console.warn("Another connection wants to upgrade database '".concat(u.name,"'. Closing db now to resume the upgrade.")):console.warn("Another connection wants to delete database '".concat(u.name,"'. Closing db now to resume the delete request.")),u.close({disableAutoOpen:!1})}),this.on("blocked",function(m){!m.newVersion||m.newVersion<m.oldVersion?console.warn("Dexie.delete('".concat(u.name,"') was blocked")):console.warn("Upgrade '".concat(u.name,"' blocked by other connection holding version ").concat(m.oldVersion/10))}),this._maxKey=Kt(t.IDBKeyRange),this._createTransaction=function(m,k,S,b){return new u.Transaction(m,k,S,u._options.chromeTransactionDurability,b)},this._fireOnBlocked=function(m){u.on("blocked").fire(m),ft.filter(function(k){return k.name===u.name&&k!==u&&!k._state.vcFired}).map(function(k){return k.on("versionchange").fire(m)})},this.use(Ua),this.use(Wa),this.use(Ha),this.use(Fa),this.use(za),new Proxy(this,{get:function(m,k,S){var b;return k==="_vip"||(k==="table"?function(v){return gn(u.table(v),g)}:(b=Reflect.get(m,k,S))instanceof ii?gn(b,g):k==="tables"?b.map(function(v){return gn(v,g)}):k==="_createTransaction"?function(){return gn(b.apply(this,arguments),g)}:b)}}));this.vip=g,y.forEach(function(m){return m(u)})}var bn,vt=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable",Ya=(vr.prototype.subscribe=function(e,t,n){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:n})},vr.prototype[vt]=function(){return this},vr);function vr(e){this._subscribe=e}try{bn={indexedDB:w.indexedDB||w.mozIndexedDB||w.webkitIndexedDB||w.msIndexedDB,IDBKeyRange:w.IDBKeyRange||w.webkitIDBKeyRange}}catch{bn={indexedDB:null,IDBKeyRange:null}}function _i(e){var t,n=!1,r=new Ya(function(i){var o=Kn(e),c,u=!1,y={},P={},g={get closed(){return u},unsubscribe:function(){u||(u=!0,c&&c.abort(),m&&qe.storagemutated.unsubscribe(S))}},m=(i.start&&i.start(g),!1),k=function(){return Vn(b)},S=function(v){hn(y,v),cr(P,y)&&k()},b=function(){var v,L,C;!u&&bn.indexedDB&&(y={},v={},c&&c.abort(),c=new AbortController,C=(x=>{var T=lt();try{o&&dt();var D=Oe(e,x);return D=o?D.finally(Ke):D}finally{T&&ut()}})(L={subscr:v,signal:c.signal,requery:k,querier:e,trans:null}),Promise.resolve(C).then(function(x){n=!0,t=x,u||L.signal.aborted||(y={},(T=>{for(var D in T)if(B(T,D))return;return 1})(P=v)||m||(qe(Ot,S),m=!0),Vn(function(){return!u&&i.next&&i.next(x)}))},function(x){n=!1,["DatabaseClosedError","AbortError"].includes(x?.name)||u||Vn(function(){u||i.error&&i.error(x)})}))};return setTimeout(k,0),g});return r.hasValue=function(){return n},r.getValue=function(){return t},r}var Ze=Te;function yr(e){var t=Re;try{Re=!0,qe.storagemutated.fire(e),dr(e,!0)}finally{Re=t}}_(Ze,l(l({},$e),{delete:function(e){return new Ze(e,{addons:[]}).delete()},exists:function(e){return new Ze(e,{addons:[]}).open().then(function(t){return t.close(),!0}).catch("NoSuchDatabaseError",function(){return!1})},getDatabaseNames:function(e){try{return t=Ze.dependencies,n=t.indexedDB,t=t.IDBKeyRange,(ar(n)?Promise.resolve(n.databases()).then(function(r){return r.map(function(i){return i.name}).filter(function(i){return i!==nn})}):ir(n,t).toCollection().primaryKeys()).then(e)}catch{return ce(new V.MissingAPI)}var t,n},defineClass:function(){return function(e){E(this,e)}},ignoreTransaction:function(e){return H.trans?Ye(H.transless,e):e()},vip:or,async:function(e){return function(){try{var t=fr(e.apply(this,arguments));return t&&typeof t.then=="function"?t:q.resolve(t)}catch(n){return ce(n)}}},spawn:function(e,t,n){try{var r=fr(e.apply(n,t||[]));return r&&typeof r.then=="function"?r:q.resolve(r)}catch(i){return ce(i)}},currentTransaction:{get:function(){return H.trans||null}},waitFor:function(e,t){return e=q.resolve(typeof e=="function"?Ze.ignoreTransaction(e):e).timeout(t||6e4),H.trans?H.trans.waitFor(e):e},Promise:q,debug:{get:function(){return _e},set:function(e){Hr(e)}},derive:F,extend:E,props:_,override:_t,Events:Tt,on:qe,liveQuery:_i,extendObservabilitySet:hn,getByKeyPath:Se,setByKeyPath:pe,delByKeyPath:function(e,t){typeof t=="string"?pe(e,t,void 0):"length"in t&&[].map.call(t,function(n){pe(e,n,void 0)})},shallowClone:Rr,deepClone:ze,getObjectDiff:pr,cmp:Q,asap:Vt,minKey:-1/0,addons:[],connections:ft,errnames:jn,dependencies:bn,cache:Je,semVer:"4.3.0",version:"4.3.0".split(".").map(function(e){return parseInt(e)}).reduce(function(e,t,n){return e+t/Math.pow(10,2*n)})})),Ze.maxKey=Kt(Ze.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(qe(Ot,function(e){Re||(e=new CustomEvent(Qn,{detail:e}),Re=!0,dispatchEvent(e),Re=!1)}),addEventListener(Qn,function(e){e=e.detail,Re||yr(e)}));var yt,Re=!1,xi=function(){};return typeof BroadcastChannel<"u"&&((xi=function(){(yt=new BroadcastChannel(Qn)).onmessage=function(e){return e.data&&yr(e.data)}})(),typeof yt.unref=="function"&&yt.unref(),qe(Ot,function(e){Re||yt.postMessage(e)})),typeof addEventListener<"u"&&(addEventListener("pagehide",function(e){if(!Te.disableBfCache&&e.persisted){_e&&console.debug("Dexie: handling persisted pagehide"),yt?.close();for(var t=0,n=ft;t<n.length;t++)n[t].close({disableAutoOpen:!1})}}),addEventListener("pageshow",function(e){!Te.disableBfCache&&e.persisted&&(_e&&console.debug("Dexie: handling persisted pageshow"),xi(),yr({all:new fe(-1/0,[[]])}))})),q.rejectionMapper=function(e,t){return!e||e instanceof st||e instanceof TypeError||e instanceof SyntaxError||!e.name||!Ur[e.name]?e:(t=new Ur[e.name](t||e.message,e),"stack"in e&&R(t,"stack",{get:function(){return this.inner.stack}}),t)},Hr(_e),l(Te,Object.freeze({__proto__:null,Dexie:Te,Entity:Zr,PropModification:At,RangeSet:fe,add:function(e){return new At({add:e})},cmp:Q,default:Te,liveQuery:_i,mergeRanges:qt,rangesOverlap:mi,remove:function(e){return new At({remove:e})},replacePrefix:function(e,t){return new At({replacePrefix:[e,t]})}}),{default:Te}),Te})})(wn)),wn.exports}var no=to();const Er=Za(no),Li=Symbol.for("Dexie"),Pn=globalThis[Li]||(globalThis[Li]=Er);if(Er.semVer!==Pn.semVer)throw new Error(`Two different versions of Dexie loaded in the same app: ${Er.semVer} and ${Pn.semVer}`);const{liveQuery:es,mergeRanges:ts,rangesOverlap:ns,RangeSet:rs,cmp:is,Entity:as,PropModification:os,replacePrefix:ss,add:cs,remove:ls,DexieYProvider:us}=Pn,Y=new Pn("TradeSync");Y.version(2).stores({profiles:"id, name, pin, role, phone, createdAt",products:"id, name, category, price, stock, emoji, unit, costPrice, sku, description, lowStockThreshold, _hlc, _tombstone",sales:"id, items, total, paymentMethod, profileId, profileName, saleTime, createdAt, receiptId, _hlc, _tombstone",credits:"id, customerName, phone, amount, originalAmount, payments, createdAt, _hlc, _tombstone",debits:"id, customerName, phone, initialDeposit, balance, transactions, createdAt, _hlc, _tombstone",receipts:"id, saleId, receiptData, qrData, createdAt",syncQueue:"id, table, recordId, operation, delta, hlc, retries, status, createdAt",syncLog:"id, action, table, recordId, timestamp, details"});const kr=Tn();function Le(a,s=!1){const d=Ut();return s&&(a.id=a.id||be(),a.createdAt=Date.now()),a._hlc=d,a._lastModified=Date.now(),a._deviceId=kr,a._tombstone=a._tombstone||!1,a._vectorClock=a._vectorClock||{},a._vectorClock[kr]=(a._vectorClock[kr]||0)+1,a}async function Ce(a,s,d,l){await Y.syncQueue.add({id:be(),table:a,recordId:s,operation:d,delta:l,hlc:Ut(),retries:0,status:"pending",createdAt:Date.now()})}function ge(a,s){const d=parseFloat(a);if(isNaN(d)||d<0)throw new Error(`${s} must be a non-negative number`);return d}async function Bn(){return Y.profiles.toArray()}async function Mi(){return await Y.profiles.count()===0}async function Br(a,s,d="staff",l=null,f=null){if(await Mi())d="admin",l={canSell:!0,canAddStock:!0,canManageCredits:!0,canViewReports:!0,canManageDebits:!0};else{if(f){const E=await Y.profiles.get(f);if(!E||E.role!=="admin")throw new Error("Only admin can create profiles")}l||(l={canSell:!0,canAddStock:!1,canManageCredits:!1,canViewReports:!1,canManageDebits:!1})}const p=["#0d9488","#14b8a6","#f97316","#fb923c","#ef4444","#3b82f6","#8b5cf6","#ec4899"],h={id:be(),name:a,pin:s,role:d,privileges:l,color:p[Math.floor(Math.random()*p.length)],createdAt:Date.now()};return await Y.profiles.add(h),h}async function qi(a,s){return await Y.profiles.update(a,s),Y.profiles.get(a)}async function Ri(a){if((await Y.profiles.get(a))?.role==="admin")throw new Error("Cannot delete the admin profile");await Y.profiles.delete(a)}async function Ni(a,s){const d=await Y.profiles.get(a);return d&&d.pin===s}function nt(a,s){return a?a.role==="admin"?!0:a.privileges?.[s]===!0:!1}async function Et(){return Y.products.filter(a=>!a._tombstone).toArray()}async function Fi(a){ge(a.price,"Price"),ge(a.stock,"Stock"),a.costPrice!==void 0&&a.costPrice!==""&&ge(a.costPrice,"Cost price");const s=Le({...a},!0);return await Y.products.add(s),await Ce("products",s.id,"CREATE",a),s}async function Dr(a,s){const d=await Y.products.get(a);if(!d)return null;s.price!==void 0&&ge(s.price,"Price"),s.stock!==void 0&&ge(s.stock,"Stock"),s.costPrice!==void 0&&s.costPrice!==""&&ge(s.costPrice,"Cost price");const l=Le({...d,...s});return await Y.products.put(l),await Ce("products",a,"UPDATE",s),l}async function zi(a){const s=await Y.products.get(a);if(!s)return;const d=Le({...s,_tombstone:!0});await Y.products.put(d),await Ce("products",a,"DELETE",{_tombstone:!0})}async function Ui(){const a=new Date;return a.setHours(0,0,0,0),Y.sales.filter(s=>!s._tombstone&&s.createdAt>=a.getTime()).toArray()}async function Ln(a,s,d,l,f,w=null){ge(s,"Total"),a.forEach(A=>{ge(A.price,"Item price"),ge(A.quantity,"Item quantity")});const p=`TS-${Date.now().toString(36).toUpperCase()}-${be().substr(0,4).toUpperCase()}`,h=new Date().toISOString(),E={items:a,total:s,paymentMethod:d,customerCreditId:w,profileId:l,profileName:f||"Unknown",saleTime:h,receiptId:p},$=Le({...E},!0);await Y.sales.add($);for(const A of a){const B=await Y.products.get(A.productId);B&&await Dr(A.productId,{stock:Math.max(0,B.stock-A.quantity)})}return await Ce("sales",$.id,"CREATE",E),$}async function Ht(){return Y.credits.filter(a=>!a._tombstone).toArray()}async function Hi(a){if(!a)return null;const s=a.replace(/\s/g,"");return(await Y.credits.filter(l=>!l._tombstone).toArray()).find(l=>l.phone===s)||null}async function Or(a,s,d,l){ge(d,"Credit amount");const f=s?s.replace(/\s/g,""):"";if(f){const h=await Hi(f);if(h){const E=h.amount+d,$=(h.originalAmount||h.amount)+d,A={amount:E,originalAmount:$,customerName:a||h.customerName},B=Le({...h,...A});return await Y.credits.put(B),await Ce("credits",h.id,"UPDATE",A),B}}const w={customerName:a,phone:f,amount:d,originalAmount:d,payments:[],trustScore:50,profileId:l},p=Le({...w},!0);return await Y.credits.add(p),await Ce("credits",p.id,"CREATE",w),p}async function Vi(a,s){const d=await Y.credits.get(a);if(!d)return null;const l=parseFloat(s);if(isNaN(l)||l<=0)throw new Error("Payment amount must be greater than 0");if(l>d.amount)throw new Error(`Payment amount (${l}) cannot exceed outstanding balance (${d.amount})`);const f={id:be(),amount:l,date:Date.now()},w=[...d.payments||[],f],p=Math.min(100,(d.trustScore||50)+10),h=Math.max(0,d.amount-l),E={payments:w,trustScore:p,amount:h},$=Le({...d,...E});return await Y.credits.put($),await Ce("credits",a,"UPDATE",E),$}async function Kr(){return Y.debits.filter(a=>!a._tombstone).toArray()}async function Xi(a,s,d){ge(d,"Initial deposit");const l=s?s.replace(/\s/g,""):"",f={customerName:a,phone:l,initialDeposit:d,balance:d,transactions:[{id:be(),type:"deposit",amount:d,description:"Initial deposit",date:Date.now()}]},w=Le({...f},!0);return await Y.debits.add(w),await Ce("debits",w.id,"CREATE",f),w}async function Wi(a,s,d="Purchase"){const l=await Y.debits.get(a);if(!l)return null;const f=ge(s,"Purchase amount");if(f>l.balance)throw new Error(`Insufficient balance. Available: KSh ${l.balance}, Requested: KSh ${f}`);const w={id:be(),type:"purchase",amount:f,description:d,date:Date.now()},p=[...l.transactions||[],w],h=l.balance-f,E={transactions:p,balance:h},$=Le({...l,...E});return await Y.debits.put($),await Ce("debits",a,"UPDATE",E),$}async function Yi(a,s){const d=await Y.debits.get(a);if(!d)return null;const l=ge(s,"Top-up amount"),f={id:be(),type:"deposit",amount:l,description:"Top-up",date:Date.now()},w=[...d.transactions||[],f],p=d.balance+l,h={transactions:w,balance:p},E=Le({...d,...h});return await Y.debits.put(E),await Ce("debits",a,"UPDATE",h),E}async function jr(){return Y.syncQueue.where("status").equals("pending").toArray()}async function kn(a,s){await Y.syncQueue.update(a,s)}async function Gi(){await Y.syncQueue.where("status").equals("done").delete()}async function Rt(a,s,d,l=""){await Y.syncLog.add({id:be(),action:a,table:s,recordId:d,timestamp:Date.now(),details:l})}async function Qi(a=50){return Y.syncLog.reverse().limit(a).toArray()}async function Ji(a){const s=await Ui(),d=await Et(),l=await Ht(),f=s.reduce((E,$)=>E+$.total,0),w=s.reduce((E,$)=>E+$.items.reduce((A,B)=>A+B.quantity,0),0),p=d.filter(E=>E.stock<=(E.lowStockThreshold||5)),h=l.reduce((E,$)=>E+$.amount,0);return{totalRevenue:f,itemsSold:w,salesCount:s.length,lowStock:p,totalOwed:h,totalProducts:d.length,totalCredits:l.length}}async function Zi(a=null,s=null,d=null,l=null){let f=await Y.sales.filter(_=>!_._tombstone).toArray();a&&(f=f.filter(_=>_.createdAt>=a)),s&&(f=f.filter(_=>_.createdAt<=s)),d&&(f=f.filter(_=>_.paymentMethod===d)),l&&(f=f.filter(_=>_.profileId===l)),f.sort((_,I)=>I.createdAt-_.createdAt);const w=f.reduce((_,I)=>_+I.total,0),p=f.reduce((_,I)=>_+I.items.reduce((R,F)=>R+F.quantity,0),0),h=f.length>0?w/f.length:0,E={};f.forEach(_=>{_.items.forEach(I=>{E[I.name]||(E[I.name]={name:I.name,quantity:0,revenue:0}),E[I.name].quantity+=I.quantity,E[I.name].revenue+=I.subtotal})});const $=Object.values(E).sort((_,I)=>I.revenue-_.revenue).slice(0,10),A={};f.forEach(_=>{A[_.paymentMethod]||(A[_.paymentMethod]={count:0,total:0}),A[_.paymentMethod].count++,A[_.paymentMethod].total+=_.total});const B={};return f.forEach(_=>{const I=_.profileName||"Unknown";B[I]||(B[I]={count:0,total:0}),B[I].count++,B[I].total+=_.total}),{sales:f,totalRevenue:w,totalItems:p,totalSales:f.length,avgSaleSize:h,topProducts:$,byMethod:A,byProfile:B}}const ea=Object.freeze(Object.defineProperty({__proto__:null,addCredit:Or,addPayment:Vi,addProduct:Fi,addSyncLog:Rt,clearCompletedSync:Gi,createDebit:Xi,createProfile:Br,db:Y,debitPurchase:Wi,debitTopUp:Yi,deleteProduct:zi,deleteProfile:Ri,findCreditByPhone:Hi,getCredits:Ht,getDashboardStats:Ji,getDebits:Kr,getPendingSync:jr,getProducts:Et,getProfiles:Bn,getSalesReport:Zi,getSyncLogs:Qi,getTodaysSales:Ui,hasPrivilege:nt,isFirstProfile:Mi,recordSale:Ln,updateProduct:Dr,updateProfile:qi,updateSyncEntry:kn,verifyPin:Ni},Symbol.toStringTag,{value:"Module"}));let Sr=[];const ro=3e3;function W(a,s="info"){const d=document.getElementById("toast-container");if(!d)return;const l=document.createElement("div");l.className=`toast ${s}`;const f={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};l.innerHTML=`
        <span style="font-size: 14px; font-weight: 800;">${f[s]||"ℹ"}</span>
        <span>${a}</span>
    `,d.appendChild(l),Sr.push(l),setTimeout(()=>{l.style.opacity="0",l.style.transform="translateY(-8px)",l.style.transition="all 0.25s ease",setTimeout(()=>{l.remove(),Sr=Sr.filter(w=>w!==l)},250)},ro)}let Cn=null,ye="",Ee="",_r=null;function it(){return{pinLock:document.getElementById("pin-lock"),mainApp:document.getElementById("main-app"),pinProfiles:document.getElementById("pin-profiles"),pinEntry:document.getElementById("pin-entry"),pinDots:document.querySelector("#pin-entry .pin-dots"),addProfileBtn:document.getElementById("add-profile-btn"),newProfileForm:document.getElementById("new-profile-form"),profileNameInput:document.getElementById("profile-name"),newPinDots:document.getElementById("new-pin-dots"),newPinKeypad:document.getElementById("new-pin-keypad"),createProfileBtn:document.getElementById("create-profile-btn"),cancelProfileBtn:document.getElementById("cancel-profile-btn"),pinCancel:document.getElementById("pin-cancel"),activeUser:document.getElementById("active-user")}}async function ta(){const a=it(),s=await Bn();if(s.length===0){a.pinProfiles.innerHTML=`
            <div class="empty-state" style="padding: 16px;">
                <p style="font-size: 0.85rem; color: var(--text-muted);">
                    Create the admin profile to get started
                </p>
            </div>`,a.addProfileBtn&&(a.addProfileBtn.textContent="+ Create Admin");return}a.pinProfiles.innerHTML=s.map(d=>`
        <div class="profile-circle" data-id="${d.id}">
            <div class="profile-avatar" style="background: ${d.color}">
                ${d.name.charAt(0).toUpperCase()}
                ${d.role==="admin"?'<span class="admin-crown">👑</span>':""}
            </div>
            <span class="profile-name">${d.name}</span>
            <span class="profile-role-badge ${d.role}">${d.role==="admin"?"Admin":"Staff"}</span>
        </div>
    `).join(""),a.addProfileBtn&&(a.addProfileBtn.style.display="none"),a.pinProfiles.querySelectorAll(".profile-circle").forEach(d=>{d.addEventListener("click",()=>io(d.dataset.id,s))})}function io(a,s){const d=it();Cn=s.find(l=>l.id===a),ye="",d.pinProfiles.querySelectorAll(".profile-circle").forEach(l=>{l.classList.toggle("selected",l.dataset.id===a)}),d.pinEntry.classList.remove("hidden"),d.addProfileBtn&&d.addProfileBtn.classList.add("hidden"),rt(d.pinDots,ye.length)}function rt(a,s){a.querySelectorAll(".dot").forEach((l,f)=>{l.classList.toggle("filled",f<s),l.classList.remove("error")})}function ao(a){a.querySelectorAll(".dot").forEach(s=>{s.classList.add("error")}),setTimeout(()=>{a.querySelectorAll(".dot").forEach(s=>s.classList.remove("error"))},500)}async function oo(a){const s=it();if(a==="back"){ye=ye.slice(0,-1),rt(s.pinDots,ye.length);return}ye.length>=4||(ye+=a,rt(s.pinDots,ye.length),ye.length===4&&(await Ni(Cn.id,ye)?na(Cn):(ao(s.pinDots),ye="",setTimeout(()=>rt(s.pinDots,0),500))))}function so(a){const s=it();if(a==="back"){Ee=Ee.slice(0,-1),rt(s.newPinDots,Ee.length),s.createProfileBtn.disabled=!0;return}Ee.length>=4||(Ee+=a,rt(s.newPinDots,Ee.length),Ee.length===4&&(s.createProfileBtn.disabled=!1))}function na(a){const s=it();s.pinLock.classList.remove("active"),s.mainApp.classList.add("active");const d=a.role==="admin"?" 👑":"";s.activeUser.textContent=a.name+d,_r&&_r(a)}function ra(){const a=it();a.mainApp.classList.remove("active"),a.pinLock.classList.add("active"),Cn=null,ye="",a.pinEntry.classList.add("hidden"),a.newProfileForm.classList.add("hidden"),a.addProfileBtn&&a.addProfileBtn.classList.remove("hidden"),ta()}function co(a){_r=a;const s=it();s.pinEntry.querySelector(".pin-keypad").addEventListener("click",l=>{const f=l.target.closest(".key")?.dataset?.key;f&&oo(f)}),s.pinCancel.addEventListener("click",()=>{ye="",s.pinEntry.classList.add("hidden"),s.addProfileBtn&&s.addProfileBtn.classList.remove("hidden"),s.pinProfiles.querySelectorAll(".profile-circle").forEach(l=>{l.classList.remove("selected")})}),s.addProfileBtn.addEventListener("click",async()=>{s.addProfileBtn.classList.add("hidden"),s.pinProfiles.classList.add("hidden"),s.newProfileForm.classList.remove("hidden"),Ee="",s.profileNameInput.value="",s.createProfileBtn.disabled=!0,rt(s.newPinDots,0),s.profileNameInput.focus()}),s.newPinKeypad.addEventListener("click",l=>{const f=l.target.closest(".key")?.dataset?.key;f&&so(f)}),s.createProfileBtn.addEventListener("click",async()=>{const l=s.profileNameInput.value.trim();if(!(!l||Ee.length!==4))try{const f=await Br(l,Ee);s.newProfileForm.classList.add("hidden"),s.pinProfiles.classList.remove("hidden"),s.addProfileBtn&&s.addProfileBtn.classList.remove("hidden"),W(f.role==="admin"?`Admin profile "${l}" created! 👑`:`Profile "${l}" created!`,"success"),na(f)}catch(f){W(f.message,"error")}}),s.cancelProfileBtn.addEventListener("click",()=>{s.newProfileForm.classList.add("hidden"),s.pinProfiles.classList.remove("hidden"),s.addProfileBtn&&s.addProfileBtn.classList.remove("hidden"),Ee=""}),ta()}let ia="dashboard",xr=null;function lo(a,s){xr=a,document.getElementById("bottom-nav").addEventListener("click",l=>{const f=l.target.closest(".nav-btn");if(!f)return;const w=f.dataset.page;w&&w!==ia&&Mr(w)})}function Mr(a){ia=a,document.getElementById("bottom-nav").querySelectorAll(".nav-btn").forEach(d=>{d.classList.toggle("active",d.dataset.page===a)}),history.replaceState(null,"",`#${a}`),xr&&xr(a)}function uo(a){const s=document.getElementById("bottom-nav"),d=s.querySelector('[data-page="sales"]'),l=s.querySelector('[data-page="inventory"]'),f=s.querySelector('[data-page="credits"]'),w=s.querySelector('[data-page="settings"]');d&&(d.style.display=nt(a,"canSell")?"":"none"),l&&(l.style.display=nt(a,"canAddStock")?"":"none"),f&&(f.style.display=nt(a,"canManageCredits")?"":"none"),w&&(a.role==="admin"?(w.dataset.page="admin",w.querySelector("span").textContent="Admin"):(w.dataset.page="settings",w.querySelector("span").textContent="More"))}const Pr=new Set;let wt=navigator.onLine,aa=null,Lr="unknown",kt=parseInt(localStorage.getItem("ts_lastOnline")||"0"),Sn=null;function Cr(){return wt}function qr(){return wt||!kt?0:Date.now()-kt}function oa(){const a=qr();if(a===0)return"";const s=Math.floor(a/36e5),d=Math.floor(s/24);return d>0?`${d} day${d>1?"s":""} offline`:s>0?`${s} hour${s>1?"s":""} offline`:"Recently offline"}function fo(a){return Pr.add(a),()=>Pr.delete(a)}function Ft(a){const s=wt!==a;wt=a,a&&(kt=Date.now(),localStorage.setItem("ts_lastOnline",String(kt))),s&&In()}function In(){Pr.forEach(a=>a({online:wt,battery:aa,connectionType:Lr,offlineDuration:qr()}))}async function Ir(){if(!navigator.onLine){Ft(!1);return}try{const a=new AbortController,s=setTimeout(()=>a.abort(),5e3),d=await fetch("/api/health",{method:"GET",cache:"no-store",signal:a.signal});clearTimeout(s),Ft(d.ok)}catch{Ft(navigator.onLine)}}function po(a=1e4){mo(),Ir(),Sn=setInterval(Ir,a)}function mo(){Sn&&(clearInterval(Sn),Sn=null)}window.addEventListener("online",()=>{Ft(!0),setTimeout(Ir,1e3)});window.addEventListener("offline",()=>{Ft(!1)});navigator.connection&&(Lr=navigator.connection.effectiveType||"unknown",navigator.connection.addEventListener("change",()=>{Lr=navigator.connection.effectiveType||"unknown",In()}));navigator.getBattery&&navigator.getBattery().then(a=>{aa=a,a.addEventListener("levelchange",In),a.addEventListener("chargingchange",In)}).catch(()=>{});wt&&(kt=Date.now(),localStorage.setItem("ts_lastOnline",String(kt)));const ho="/api/sync";let En=null,Ne=!1,gt=null,_n=[];function vo(a){return _n.push(a),()=>{_n=_n.filter(s=>s!==a)}}function tt(a){_n.forEach(s=>s(a))}async function yo(){const a=await jr();return{isSyncing:Ne,lastSyncTime:gt,pendingCount:a.length}}async function go(){Ne||await sa()}function bo(a=3e4){wo(),En=setInterval(async()=>{!Ne&&Cr()&&await sa()},a)}function wo(){En&&(clearInterval(En),En=null)}async function sa(){if(!Ne){Ne=!0,tt({status:"syncing",pendingCount:0});try{const a=await jr();if(a.length===0){Ne=!1,gt=Date.now(),tt({status:"synced",lastSync:gt,pendingCount:0});return}qr()>864e5&&tt({status:"syncing",detail:`Syncing ${a.length} queued changes...`,pendingCount:a.length});const d=10;let l=0,f=0;for(let w=0;w<a.length;w+=d){const p=a.slice(w,w+d);try{const h=p.map($=>({table:$.table,id:$.recordId,operation:$.operation,delta:$.delta,hlc:$.hlc})),E=await fetch(ho,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({deviceId:localStorage.getItem("ts_deviceId")||"unknown",operations:h,timestamp:Date.now()})});if(E.ok){for(const $ of p)await kn($.id,{status:"done"});l+=p.length,await Rt("SYNC_SUCCESS",p[0].table,p[0].recordId,`Synced ${p.length} operations`)}else{for(const $ of p)await kn($.id,{retries:($.retries||0)+1,status:"pending",lastError:`Server returned ${E.status}`});f+=p.length,await Rt("SYNC_SERVER_ERROR",p[0].table,p[0].recordId,`Server error: ${E.status}`)}}catch{for(const E of p)await kn(E.id,{retries:(E.retries||0)+1,status:"pending"});f+=p.length,await Rt("SYNC_NETWORK_ERROR",p[0]?.table,p[0]?.recordId,"Network unreachable")}tt({status:"syncing",detail:`${l}/${a.length} synced`,pendingCount:a.length-l})}await Gi(),gt=Date.now(),Ne=!1,f>0?tt({status:"partial",detail:`${l} synced, ${f} pending`,lastSync:gt,pendingCount:f}):tt({status:"synced",lastSync:gt,pendingCount:0})}catch(a){Ne=!1,console.error("[Sync] Error:",a),await Rt("SYNC_ERROR","","",a.message),tt({status:"error",detail:a.message,pendingCount:-1})}}}function ko(){const a=document.querySelector(".sync-dot"),s=document.querySelector(".sync-text"),d=document.getElementById("sync-now-btn"),l=document.getElementById("sync-pending-badge");function f(p){if(!a||!s)return;if(a.className="sync-dot",Cr())if(p?.status==="syncing")a.classList.add("syncing"),s.textContent="Syncing...",d?.classList.add("spinning");else if(p?.status==="retry")a.classList.add("syncing"),s.textContent=p.detail||"Retrying...";else if(p?.status==="partial")a.classList.add("syncing"),s.textContent=p.detail||"Partial sync";else if(a.classList.add("online"),d?.classList.remove("spinning"),p?.lastSync){const E=So(p.lastSync);s.textContent=`Online — Synced ${E}`}else s.textContent="Online — Synced";else{a.classList.add("offline");const E=oa();s.textContent=E?`Offline — ${E}`:"Offline — changes queued"}l&&p?.pendingCount!==void 0&&(p.pendingCount>0?(l.textContent=p.pendingCount,l.classList.remove("hidden")):l.classList.add("hidden"))}vo(p=>f(p)),fo(({online:p})=>{f({status:p?"synced":"offline"})}),d?.addEventListener("click",async()=>{d.classList.add("spinning"),await go(),setTimeout(()=>d.classList.remove("spinning"),1e3)});const w=async()=>{const p=await yo();f({status:Cr()?p.isSyncing?"syncing":"synced":"offline",lastSync:p.lastSyncTime,pendingCount:p.pendingCount})};w(),setInterval(w,5e3)}function So(a){const s=Date.now()-a;return s<6e4?"just now":s<36e5?`${Math.floor(s/6e4)}m ago`:s<864e5?`${Math.floor(s/36e5)}h ago`:"a while ago"}async function Eo(a,s,d,{navigateTo:l,addToCart:f}){const w=await Ji(),p=await Et(),h=p.slice(0,6),E=new Date,$=E.getHours()<12?"Good morning":E.getHours()<17?"Good afternoon":"Good evening",A=E.toLocaleDateString("en-KE",{weekday:"long",month:"short",day:"numeric"}),B=oa();a.innerHTML=`
        <div class="page active" id="page-dashboard">
            <div class="page-header">
                <div>
                    <h2>${$}, ${d?.name||""} ${d?.role==="admin"?"👑":""}!</h2>
                    <div class="subtitle">${A}</div>
                </div>
            </div>

            ${B?`
                <div class="offline-banner">
                    <span>⚡</span> ${B} — your data is safe locally
                </div>
            `:""}

            <div class="stats-grid">
                <div class="stat-card revenue-card">
                    <div class="stat-label">Today's Revenue</div>
                    <div class="stat-value">KSh ${w.totalRevenue.toLocaleString()}</div>
                    <div class="stat-sub">${w.salesCount} sale${w.salesCount!==1?"s":""} · ${w.itemsSold} items</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Products</div>
                    <div class="stat-value">${w.totalProducts}</div>
                    <div class="stat-sub">in catalog</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Owed to You</div>
                    <div class="stat-value" style="color: var(--accent-secondary);">KSh ${w.totalOwed.toLocaleString()}</div>
                    <div class="stat-sub">${w.totalCredits} customer${w.totalCredits!==1?"s":""}</div>
                </div>
            </div>

            ${w.lowStock.length>0?`
                <div class="section-header">
                    <h3>⚠️ Low Stock Alerts</h3>
                    <button class="view-all" id="dash-view-inventory">View All</button>
                </div>
                <div class="alerts-list">
                    ${w.lowStock.map(_=>`
                        <div class="alert-item">
                            <div class="alert-icon low-stock">${_.emoji||"📦"}</div>
                            <div class="alert-info">
                                <div class="alert-title">${_.name}</div>
                                <div class="alert-desc">${_.stock} ${_.unit||"pcs"} left — restock soon</div>
                            </div>
                            <span class="badge badge-warning">${_.stock}</span>
                        </div>
                    `).join("")}
                </div>
            `:""}

            ${h.length>0&&nt(d,"canSell")?`
                <div class="section-header">
                    <h3>⚡ Quick Sell</h3>
                    <button class="view-all" id="dash-view-sales">Sell Page →</button>
                </div>
                <div class="quick-sell-grid">
                    ${h.map(_=>`
                        <div class="quick-sell-item" data-id="${_.id}">
                            <span class="qs-emoji">${_.emoji||"📦"}</span>
                            <span class="qs-name">${_.name}</span>
                            <span class="qs-price">KSh ${_.price.toLocaleString()}</span>
                        </div>
                    `).join("")}
                </div>
            `:h.length===0?`
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                    </svg>
                    <h3>No products yet</h3>
                    <p>Head to the Stock page to add your first product</p>
                </div>
            `:""}
        </div>
    `,a.querySelectorAll(".quick-sell-item").forEach(_=>{_.addEventListener("click",()=>{const I=p.find(R=>R.id===_.dataset.id);I&&I.stock>0?(f(I),W(`${I.name} added to cart`,"success"),l("sales")):W("Out of stock!","warning")})}),a.querySelector("#dash-view-inventory")?.addEventListener("click",()=>l("inventory")),a.querySelector("#dash-view-sales")?.addEventListener("click",()=>l("sales"))}function _o(a,s){const d=document.createElement("div");d.className=`product-tile${a.stock<=0?" out-of-stock":""}`,d.dataset.id=a.id;const l=a.stock<=(a.lowStockThreshold||5)?" low":"",f=a.unit&&a.unit!=="pcs"?`/${a.unit}`:"";return d.innerHTML=`
        <span class="pt-emoji">${a.emoji||"📦"}</span>
        <span class="pt-name">${a.name}</span>
        <span class="pt-price">KSh ${a.price.toLocaleString()}${f}</span>
        <span class="pt-stock${l}">${a.stock} ${a.unit||"pcs"}</span>
        <span class="pt-add-badge">+</span>
    `,s&&d.addEventListener("click",()=>s(a)),d}function xo(a,s){const d=document.createElement("div");d.className="inventory-item",d.dataset.id=a.id;const l=a.stock<=0?"out":a.stock<=(a.lowStockThreshold||5)?"low":"",f=a.unit||"pcs",w=a.costPrice&&a.price?Math.round((a.price-a.costPrice)/a.price*100):null;return d.innerHTML=`
        <span class="inv-emoji">${a.emoji||"📦"}</span>
        <div class="inv-info">
            <div class="inv-name">${a.name}</div>
            <div class="inv-meta">${a.category||"General"} · KSh ${a.price.toLocaleString()}/${f}</div>
            ${a.description?`<div class="inv-desc">${a.description}</div>`:""}
            ${a.sku?`<div class="inv-sku">SKU: ${a.sku}</div>`:""}
        </div>
        <div class="inv-stock ${l}">
            <div class="stock-count">${a.stock}</div>
            <div class="stock-label">${f}</div>
            ${w!==null?`<div class="stock-margin ${w>=20?"good":"low"}">${w}% margin</div>`:""}
        </div>
    `,s&&d.addEventListener("click",()=>s(a)),d}const zt=new Uint8Array(256),$r=new Uint8Array(256);(function(){let s=1;for(let d=0;d<255;d++)zt[d]=s,$r[s]=d,s=s<<1^(s&128?285:0);zt[255]=zt[0]})();function ca(a,s){return a===0||s===0?0:zt[($r[a]+$r[s])%255]}function Po(a){let s=[1];for(let d=0;d<a;d++){const l=new Array(s.length+1).fill(0);for(let f=0;f<s.length;f++)l[f]^=s[f],l[f+1]^=ca(s[f],zt[d]);s=l}return s}function Lo(a,s){const d=Po(s),l=new Array(a.length+s).fill(0);for(let f=0;f<a.length;f++)l[f]=a[f];for(let f=0;f<a.length;f++){const w=l[f];if(w!==0)for(let p=1;p<d.length;p++)l[f+p]^=ca(d[p],w)}return l.slice(a.length)}const la={1:{size:21,dataCodewords:19,ecCodewords:7},2:{size:25,dataCodewords:34,ecCodewords:10},3:{size:29,dataCodewords:55,ecCodewords:15},4:{size:33,dataCodewords:80,ecCodewords:20},5:{size:37,dataCodewords:108,ecCodewords:26},6:{size:41,dataCodewords:136,ecCodewords:18},7:{size:45,dataCodewords:156,ecCodewords:20},8:{size:49,dataCodewords:194,ecCodewords:24},9:{size:53,dataCodewords:232,ecCodewords:30},10:{size:57,dataCodewords:274,ecCodewords:18},11:{size:61,dataCodewords:321,ecCodewords:20},12:{size:65,dataCodewords:370,ecCodewords:24},13:{size:69,dataCodewords:428,ecCodewords:26},14:{size:73,dataCodewords:461,ecCodewords:30},15:{size:77,dataCodewords:523,ecCodewords:22},16:{size:81,dataCodewords:589,ecCodewords:24},17:{size:85,dataCodewords:614,ecCodewords:28},18:{size:89,dataCodewords:664,ecCodewords:30},19:{size:93,dataCodewords:718,ecCodewords:28},20:{size:97,dataCodewords:775,ecCodewords:28}},Ci=20;function Co(a){for(let s=1;s<=Ci;s++){const l=4+(s<=9?8:16)+a*8;if(la[s].dataCodewords*8>=l)return s}return Ci}function Io(a){let s=new TextEncoder().encode(a);const d=Co(s.length),l=la[d],f=l.dataCodewords*8,w=d<=9?8:16,p=Math.floor((f-4-w)/8);s.length>p&&(s=s.slice(0,p));let h="0100";h+=s.length.toString(2).padStart(w,"0");for(const I of s)h+=I.toString(2).padStart(8,"0");const E=Math.min(4,f-h.length);for(h+="0".repeat(E);h.length%8!==0&&h.length<f;)h+="0";const $=["11101100","00010001"];let A=0;for(;h.length<f;)h+=$[A%2],A++;h=h.substring(0,f);const B=[];for(let I=0;I<h.length;I+=8)B.push(parseInt(h.substr(I,8),2));const _=Lo(B,l.ecCodewords);return{version:d,config:l,codewords:[...B,..._]}}function $o(a){if(!a||a.length===0)return[];const{config:s,codewords:d}=Io(a),l=s.size,f=Array.from({length:l},()=>Array(l).fill(null)),w=Array.from({length:l},()=>Array(l).fill(!1));function p(_,I){for(let R=-1;R<=7;R++)for(let F=-1;F<=7;F++){const te=_+R,me=I+F;te<0||te>=l||me<0||me>=l||(R===-1||R===7||F===-1||F===7?f[te][me]=!1:R===0||R===6||F===0||F===6||R>=2&&R<=4&&F>=2&&F<=4?f[te][me]=!0:f[te][me]=!1,w[te][me]=!0)}}p(0,0),p(0,l-7),p(l-7,0);for(let _=8;_<l-8;_++)f[6][_]=_%2===0,f[_][6]=_%2===0,w[6][_]=!0,w[_][6]=!0;f[l-8][8]=!0,w[l-8][8]=!0;for(let _=0;_<9;_++)_<l&&(8<l&&(w[8][_]=!0),w[_][8]=!0);for(let _=0;_<8;_++){const I=l-8+_,R=l-7+_;I>=0&&I<l&&(w[8][I]=!0),R>=0&&R<l&&(w[R][8]=!0)}const h=[];for(const _ of d)for(let I=7;I>=0;I--)h.push(_>>I&1);let E=0,$=!0;for(let _=l-1;_>=0;_-=2){_===6&&(_=5);const I=$?Array.from({length:l},(R,F)=>l-1-F):Array.from({length:l},(R,F)=>F);for(const R of I)for(const F of[_,_-1])F<0||F>=l||R<0||R>=l||w[R][F]||(f[R][F]=E<h.length?h[E++]===1:!1);$=!$}for(let _=0;_<l;_++)for(let I=0;I<l;I++)w[_][I]||(_+I)%2===0&&(f[_][I]=!f[_][I]);const A=[!0,!0,!0,!1,!0,!0,!0,!0,!0,!1,!1,!1,!0,!1,!1],B=[];for(let _=0;_<6;_++)B.push([8,_]);B.push([8,7],[8,8],[7,8]);for(let _=5;_>=0;_--)B.push([_,8]);for(let _=0;_<7;_++)B.push([l-1-_,8]);B.push([8,l-8]);for(let _=1;_<8;_++)B.push([8,l-8+_]);for(let _=0;_<Math.min(A.length,B.length);_++){const[I,R]=B[_];I>=0&&I<l&&R>=0&&R<l&&(f[I][R]=A[_])}return f}function Ao(a,s=4,d=4){const l=$o(a);if(l.length===0)return"";const f=l.length,w=(f+d*2)*s,p=document.createElement("canvas");p.width=w,p.height=w;const h=p.getContext("2d");h.fillStyle="#ffffff",h.fillRect(0,0,w,w),h.fillStyle="#000000";for(let E=0;E<f;E++)for(let $=0;$<f;$++)l[E][$]&&h.fillRect(($+d)*s,(E+d)*s,s,s);return p.toDataURL("image/png")}const ua=Tn();function To(){const a=new Uint8Array(16);if(typeof crypto<"u"&&crypto.getRandomValues)crypto.getRandomValues(a);else for(let s=0;s<16;s++)a[s]=Math.floor(Math.random()*256);return Array.from(a,s=>s.toString(16).padStart(2,"0")).join("")}function da(){const a=localStorage.getItem("ts_merchantId");if(a)return a;const s=`TSM-${ua.substr(0,8).toUpperCase()}`;return localStorage.setItem("ts_merchantId",s),s}async function Bo(a){const s=JSON.stringify(a);if(typeof crypto<"u"&&crypto.subtle)try{const f=new TextEncoder().encode(s),w=await crypto.subtle.digest("SHA-256",f);return Array.from(new Uint8Array(w)).map(h=>h.toString(16).padStart(2,"0")).join("")}catch{}let d=0;for(let l=0;l<s.length;l++){const f=s.charCodeAt(l);d=(d<<5)-d+f,d=d&d}return Math.abs(d).toString(16).padStart(8,"0")}async function Do(a){const s=da(),d=To(),l=Date.now(),f=Ut(),w={version:"1.0",type:"SALE",merchantId:s,deviceId:ua,transactionId:a.receiptId||be(),nonce:d,timestamp:l,hlc:f,amount:a.total,currency:"KES",paymentMethod:a.paymentMethod,itemCount:a.items?a.items.length:0,items:a.items?a.items.map(h=>({name:h.name,qty:h.quantity,price:h.price,subtotal:h.subtotal})):[],profileName:a.profileName,saleTime:a.saleTime,status:navigator.onLine?"confirmed":"pending_sync",offlineCreated:!navigator.onLine},p={merchantId:w.merchantId,transactionId:w.transactionId,nonce:w.nonce,amount:w.amount,timestamp:w.timestamp,deviceId:w.deviceId};return w.signature=await Bo(p),w}function Oo(a){const s={v:a.version,mid:a.merchantId,tid:a.transactionId,n:a.nonce,ts:a.timestamp,amt:a.amount,cur:a.currency,pm:a.paymentMethod,cnt:a.itemCount,sig:a.signature,st:a.status};return JSON.stringify(s)}function Ko(){return da()}async function Ar(a){const s=await Do(a),d=Oo(s);let l="";try{l=Ao(d,3,2)}catch(B){console.warn("[Receipt] QR generation failed, showing receipt without QR:",B.message)}const f=Ko(),w=new Date(a.saleTime||a.createdAt),p=w.toLocaleDateString("en-KE",{weekday:"short",year:"numeric",month:"short",day:"numeric"}),h=w.toLocaleTimeString("en-KE",{hour:"2-digit",minute:"2-digit"}),E={cash:"💵 Cash",credit:"📝 Credit",mpesa:"📱 M-Pesa",airtel:"📱 Airtel Money"},$=document.getElementById("modal-backdrop"),A=document.getElementById("modal");A.innerHTML=`
        <div class="modal-handle"></div>
        <div class="receipt-container" id="receipt-content">
            <div class="receipt-header">
                <div class="receipt-logo">TradeSync</div>
                <div class="receipt-sub">Sales Receipt</div>
                <div class="receipt-merchant">${f}</div>
            </div>
            <div class="receipt-divider">─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─</div>
            <div class="receipt-info">
                <div class="receipt-row">
                    <span>Receipt #</span>
                    <span>${a.receiptId||"N/A"}</span>
                </div>
                <div class="receipt-row">
                    <span>Date</span>
                    <span>${p}</span>
                </div>
                <div class="receipt-row">
                    <span>Time</span>
                    <span>${h}</span>
                </div>
                <div class="receipt-row">
                    <span>Served by</span>
                    <span>${a.profileName||"Staff"}</span>
                </div>
                <div class="receipt-row">
                    <span>Payment</span>
                    <span>${E[a.paymentMethod]||a.paymentMethod}</span>
                </div>
            </div>
            <div class="receipt-divider">─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─</div>
            <div class="receipt-items">
                ${a.items.map(B=>`
                    <div class="receipt-item">
                        <div class="receipt-item-name">${B.name}</div>
                        <div class="receipt-item-detail">
                            <span>${B.quantity} × KSh ${B.price.toLocaleString()}</span>
                            <span>KSh ${B.subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
            <div class="receipt-divider">─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─</div>
            <div class="receipt-total">
                <span>TOTAL</span>
                <span>KSh ${a.total.toLocaleString()}</span>
            </div>
            <div class="receipt-qr">
                ${l?`<img src="${l}" alt="Transaction QR" />`:`<div style="text-align:center;padding:8px;color:var(--text-tertiary);font-size:12px;">TX: ${s.transactionId}</div>`}
                <div class="receipt-qr-label">Scan to verify transaction</div>
            </div>
            <div class="receipt-footer">
                <div class="receipt-status ${s.status==="confirmed"?"confirmed":"pending"}">
                    ${s.status==="confirmed"?"✓ Verified":"⏳ Pending Sync"}
                </div>
                <div class="receipt-sig">Sig: ${s.signature.substr(0,12)}...</div>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="receipt-close">Close</button>
            <button class="btn btn-primary" id="receipt-download">📥 Download</button>
        </div>
    `,$.classList.remove("hidden"),A.classList.remove("hidden"),document.getElementById("receipt-close").addEventListener("click",Ii),$.addEventListener("click",Ii),document.getElementById("receipt-download").addEventListener("click",()=>jo(a.receiptId))}function Ii(){document.getElementById("modal-backdrop").classList.add("hidden"),document.getElementById("modal").classList.add("hidden")}function jo(a){const s=document.getElementById("receipt-content");if(!s)return;const d=document.createElement("canvas"),l=2;d.width=s.offsetWidth*l,d.height=s.offsetHeight*l;const f=d.getContext("2d");f.scale(l,l);const w=getComputedStyle(document.documentElement),p=w.getPropertyValue("--bg-primary").trim()||"#f8fafc",h=w.getPropertyValue("--text-primary").trim()||"#0f172a",E=w.getPropertyValue("--accent-primary").trim()||"#00A9E0";f.fillStyle=p,f.fillRect(0,0,d.width,d.height),f.font="14px Inter, sans-serif",f.textAlign="center",f.fillText(`Receipt #${a||"N/A"}`,d.width/(2*l),30);const _=`
        <!DOCTYPE html><html><head>
        <style>
            body { background: ${p}; color: ${h}; font-family: 'Inter', sans-serif;
                   max-width: 320px; margin: 0 auto; padding: 16px; }
            .receipt-header { text-align: center; margin-bottom: 12px; }
            .receipt-logo { font-size: 20px; font-weight: 800; color: ${E}; }
            .receipt-row { display: flex; justify-content: space-between; padding: 2px 0; font-size: 13px; }
            .receipt-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; padding: 8px 0; }
            .receipt-divider { text-align: center; color: #94a3b8; font-size: 11px; margin: 8px 0; }
            img { display: block; margin: 12px auto; }
        </style>
        </head><body>${s.innerHTML}</body></html>
    `,I=new Blob([_],{type:"text/html"}),R=URL.createObjectURL(I),F=document.createElement("a");F.href=R,F.download=`receipt-${a||"sale"}.html`,F.click(),URL.revokeObjectURL(R)}function Mo(a,s,d,l){const f=document.getElementById("modal-backdrop"),w=document.getElementById("modal"),p=a.reduce((E,$)=>E+$.subtotal,0);w.innerHTML=`
        <div class="modal-handle"></div>
        <h2>Checkout — KSh ${p.toLocaleString()}</h2>
        <div class="cart-summary-modal">
            <div class="cart-items" style="max-height: 120px; overflow-y: auto;">
                ${a.map(E=>`
                    <div class="cart-item">
                        <span style="font-size: 18px;">${E.emoji||"📦"}</span>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${E.name}</div>
                            <div class="cart-item-price">KSh ${E.price} × ${E.quantity}</div>
                        </div>
                        <div class="cart-item-total">KSh ${E.subtotal.toLocaleString()}</div>
                    </div>
                `).join("")}
            </div>
            <div class="cart-total">
                <span>Total</span>
                <span>KSh ${p.toLocaleString()}</span>
            </div>
        </div>

        <div class="payment-methods" id="payment-methods">
            <div class="payment-method-label">Select Payment Method</div>
            <div class="payment-grid">
                <button class="payment-btn cash" data-method="cash">
                    <span class="pm-icon">💵</span>
                    <span class="pm-label">Cash</span>
                </button>
                <button class="payment-btn mpesa" data-method="mpesa">
                    <span class="pm-icon">📱</span>
                    <span class="pm-label">M-Pesa</span>
                </button>
                <button class="payment-btn airtel" data-method="airtel">
                    <span class="pm-icon">📲</span>
                    <span class="pm-label">Airtel Money</span>
                </button>
                <button class="payment-btn credit" data-method="credit">
                    <span class="pm-icon">📝</span>
                    <span class="pm-label">Credit</span>
                </button>
            </div>
        </div>

        <div id="payment-form" class="hidden"></div>

        <div class="modal-actions">
            <button class="btn btn-ghost" id="checkout-cancel">Cancel</button>
        </div>
    `,f.classList.remove("hidden"),w.classList.remove("hidden");const h=document.getElementById("payment-form");document.querySelectorAll(".payment-btn").forEach(E=>{E.addEventListener("click",()=>{const $=E.dataset.method;document.querySelectorAll(".payment-btn").forEach(A=>A.classList.remove("selected")),E.classList.add("selected"),qo($,h,a,p,s,d,l)})}),document.getElementById("checkout-cancel").addEventListener("click",Be),f.addEventListener("click",Be)}function qo(a,s,d,l,f,w,p){switch(s.classList.remove("hidden"),a){case"cash":s.innerHTML=`
                <div class="payment-confirm">
                    <div class="payment-confirm-icon cash-icon">💵</div>
                    <div class="payment-confirm-text">Cash Payment — KSh ${l.toLocaleString()}</div>
                    <button class="btn btn-success btn-lg btn-full" id="confirm-cash">Confirm Cash Payment</button>
                </div>
            `,document.getElementById("confirm-cash").addEventListener("click",async()=>{try{const h=Tr(d),E=await Ln(h,l,"cash",f,w);Be(),W(`Sale — KSh ${l.toLocaleString()} ✓`,"success"),await Ar(E),p&&p()}catch(h){W(`Error: ${h.message}`,"error"),console.error("[Cash checkout]",h)}});break;case"mpesa":s.innerHTML=`
                <div class="mpesa-form">
                    <div class="payment-brand mpesa-brand">
                        <span class="brand-logo">M</span>-PESA
                    </div>
                    <div class="form-group">
                        <label>Customer's Phone Number</label>
                        <input type="tel" id="mpesa-phone" placeholder="07XX XXX XXX" maxlength="12" />
                    </div>
                    <button class="btn btn-lg btn-full mpesa-btn" id="send-stk">
                        📲 Send STK Push — KSh ${l.toLocaleString()}
                    </button>
                </div>
                <div id="stk-progress" class="hidden"></div>
            `,document.getElementById("send-stk").addEventListener("click",()=>{const h=document.getElementById("mpesa-phone").value.trim();if(!h||h.length<10){W("Enter a valid phone number","warning");return}$i("mpesa",h,l,d,f,w,p)});break;case"airtel":s.innerHTML=`
                <div class="airtel-form">
                    <div class="payment-brand airtel-brand">
                        <span class="brand-logo">A</span>irtel Money
                    </div>
                    <div class="form-group">
                        <label>Customer's Phone Number</label>
                        <input type="tel" id="airtel-phone" placeholder="07XX XXX XXX" maxlength="12" />
                    </div>
                    <button class="btn btn-lg btn-full airtel-btn" id="send-airtel-stk">
                        📲 Send STK Push — KSh ${l.toLocaleString()}
                    </button>
                </div>
            `,document.getElementById("send-airtel-stk").addEventListener("click",()=>{const h=document.getElementById("airtel-phone").value.trim();if(!h||h.length<10){W("Enter a valid phone number","warning");return}$i("airtel",h,l,d,f,w,p)});break;case"credit":s.innerHTML=`
                <div class="credit-checkout-form">
                    <div class="form-group">
                        <label>Customer Name</label>
                        <input type="text" id="credit-cust-name" placeholder="Customer name" />
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="credit-cust-phone" placeholder="07XX XXX XXX" maxlength="12" />
                    </div>
                    <button class="btn btn-lg btn-full" id="confirm-credit" style="background: var(--accent-secondary); color: white;">
                        📝 Add to Customer Tab — KSh ${l.toLocaleString()}
                    </button>
                </div>
            `,document.getElementById("confirm-credit").addEventListener("click",async()=>{const h=document.getElementById("credit-cust-name").value.trim(),E=document.getElementById("credit-cust-phone").value.trim();if(!h){W("Enter customer name","warning");return}try{const $=Tr(d),A=await Ln($,l,"credit",f,w);await Or(h,E,l,f),Be(),W(`Credit — KSh ${l.toLocaleString()} on ${h}'s tab`,"success"),await Ar(A),p&&p()}catch($){W(`Error: ${$.message}`,"error"),console.error("[Credit checkout]",$)}});break}}function $i(a,s,d,l,f,w,p){const h=document.getElementById("payment-form"),E=a==="mpesa"?"M-PESA":"Airtel Money",$=a==="mpesa"?"mpesa":"airtel";h.innerHTML=`
        <div class="stk-simulation">
            <div class="stk-step active" id="stk-1">
                <div class="stk-loader ${$}"></div>
                <div class="stk-msg">Sending STK push to ${s}...</div>
            </div>
            <div class="stk-step hidden" id="stk-2">
                <div class="stk-loader ${$}"></div>
                <div class="stk-msg">Waiting for ${E} confirmation...</div>
                <div class="stk-sub">Customer should enter PIN on their phone</div>
            </div>
            <div class="stk-step hidden" id="stk-3">
                <div class="stk-success">✓</div>
                <div class="stk-msg stk-done">Payment Confirmed!</div>
                <div class="stk-sub">KSh ${d.toLocaleString()} via ${E}</div>
            </div>
        </div>
    `,setTimeout(()=>{document.getElementById("stk-1")?.classList.add("hidden"),document.getElementById("stk-2")?.classList.remove("hidden")},1500),setTimeout(async()=>{document.getElementById("stk-2")?.classList.add("hidden"),document.getElementById("stk-3")?.classList.remove("hidden");const A=Tr(l),B=await Ln(A,d,a,f,w);setTimeout(async()=>{Be(),W(`${E} — KSh ${d.toLocaleString()} ✓`,"success"),await Ar(B),p&&p()},1200)},3500)}function Tr(a){return a.map(s=>({productId:s.productId,name:s.name,quantity:s.quantity,price:s.price,subtotal:s.subtotal}))}const Ro={Food:["🍞","🥚","🍚","🌽","🫓","🍖","🥩","🧈","🫘","🥬","🍅","🧅","🥕","🥔","🍌","🥭","🍉"],Drinks:["🥛","🥤","🧃","☕","🍵","🧊","💧","🍺","🥂","🫗"],Snacks:["🍪","🍩","🍿","🧁","🍬","🍫","🥜","🌰"],Household:["🧹","🧴","🧼","🧽","🪣","🧻","💡","🪥","🧯"],Electronics:["📱","🔋","🔌","💻","🎧","📺","⌚","🔦"],Clothing:["👕","👖","👗","👟","🧢","🧣","🧤","👜"],Other:["📦","🎁","💊","✏️","📒","🔑","🪙","🏷️","🧲","⚽"]};function Ai(a,s,d){const l=document.getElementById("modal-backdrop"),f=document.getElementById("modal"),w=!a,p=a||{name:"",price:"",stock:"",category:"General",emoji:"📦",lowStockThreshold:5,description:"",unit:"pcs",costPrice:"",sku:""},h=["General","Food","Drinks","Snacks","Household","Electronics","Clothing","Other"];f.innerHTML=`
        <div class="modal-handle"></div>
        <h2>${w?"Add Product":"Edit Product"}</h2>

        <div class="form-group">
            <label>Product Name</label>
            <input type="text" id="prod-name" value="${p.name}" placeholder="e.g. White Bread 400g" />
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="prod-desc" placeholder="Brief description..." rows="2" style="resize:none;">${p.description||""}</textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Selling Price (KSh)</label>
                <input type="number" id="prod-price" value="${p.price}" placeholder="0" min="0" />
            </div>
            <div class="form-group">
                <label>Cost Price (KSh)</label>
                <input type="number" id="prod-cost" value="${p.costPrice||""}" placeholder="Optional" min="0" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Stock Qty</label>
                <input type="number" id="prod-stock" value="${p.stock}" placeholder="0" min="0" />
            </div>
            <div class="form-group">
                <label>Unit</label>
                <select id="prod-unit">
                    ${["pcs","kg","g","litre","ml","pack","box","tray","dozen","pair"].map(A=>`<option value="${A}" ${A===(p.unit||"pcs")?"selected":""}>${A}</option>`).join("")}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Category</label>
                <select id="prod-category">
                    ${h.map(A=>`<option value="${A}" ${A===p.category?"selected":""}>${A}</option>`).join("")}
                </select>
            </div>
            <div class="form-group">
                <label>SKU / Barcode</label>
                <input type="text" id="prod-sku" value="${p.sku||""}" placeholder="Optional" />
            </div>
        </div>
        <div class="form-group">
            <label>Icon — Select or Search</label>
            <input type="search" id="emoji-search" placeholder="Search emojis..." class="emoji-search-input" />
            <div class="emoji-picker-grid" id="emoji-picker"></div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Low Stock Alert</label>
                <input type="number" id="prod-threshold" value="${p.lowStockThreshold||5}" min="1" />
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="prod-cancel">Cancel</button>
            ${w?"":'<button class="btn btn-danger" id="prod-delete">Delete</button>'}
            <button class="btn btn-primary" id="prod-save">${w?"Add Product":"Save Changes"}</button>
        </div>
    `,l.classList.remove("hidden"),f.classList.remove("hidden");let E=p.emoji;function $(A=""){const B=document.getElementById("emoji-picker");let _="";for(const[I,R]of Object.entries(Ro)){const F=A?R.filter(()=>!0):R;if(F.length!==0){_+=`<div class="emoji-cat-label">${I}</div><div class="emoji-cat-row">`;for(const te of F)_+=`<button type="button" class="emoji-btn ${te===E?"active":""}" data-emoji="${te}">${te}</button>`;_+="</div>"}}B.innerHTML=_,B.querySelectorAll(".emoji-btn").forEach(I=>{I.addEventListener("click",()=>{E=I.dataset.emoji,B.querySelectorAll(".emoji-btn").forEach(R=>R.classList.remove("active")),I.classList.add("active")})})}$(),document.getElementById("emoji-search").addEventListener("input",A=>{$(A.target.value)}),document.getElementById("prod-save").addEventListener("click",()=>{const A=document.getElementById("prod-name").value.trim(),B=parseFloat(document.getElementById("prod-price").value),_=parseInt(document.getElementById("prod-stock").value);if(!A){W("Product name is required","warning");return}if(isNaN(B)||B<0){W("Enter a valid price (≥ 0)","warning");return}if(isNaN(_)||_<0){W("Enter a valid stock (≥ 0)","warning");return}const I=document.getElementById("prod-cost").value;if(I&&(isNaN(parseFloat(I))||parseFloat(I)<0)){W("Cost price must be ≥ 0","warning");return}const R={name:A,price:B,stock:_,category:document.getElementById("prod-category").value,emoji:E,lowStockThreshold:parseInt(document.getElementById("prod-threshold").value)||5,description:document.getElementById("prod-desc").value.trim(),unit:document.getElementById("prod-unit").value,costPrice:I?parseFloat(I):null,sku:document.getElementById("prod-sku").value.trim()};Be(),s&&s(R,a?.id)}),w||document.getElementById("prod-delete").addEventListener("click",()=>{Be(),d&&d(a.id)}),document.getElementById("prod-cancel").addEventListener("click",Be),l.addEventListener("click",Be)}function Be(){document.getElementById("modal-backdrop").classList.add("hidden"),document.getElementById("modal").classList.add("hidden")}let ae=[];function fa(a){const s=ae.find(d=>d.productId===a.id);if(s)s.quantity<a.stock?(s.quantity++,s.subtotal=s.quantity*s.price):W("Not enough stock!","warning");else{if(a.stock<=0){W("Out of stock!","warning");return}ae.push({productId:a.id,name:a.name,emoji:a.emoji,price:a.price,quantity:1,subtotal:a.price})}}async function pa(a,s,d){if(!nt(d,"canSell")){a.innerHTML=`<div class="page active"><div class="empty-state"><h3>Access Denied</h3><p>You don't have permission to make sales</p></div></div>`;return}const l=await Et(),f=["All",...new Set(l.map(E=>E.category||"General"))];a.innerHTML=`
        <div class="page active" id="page-sales">
            <div class="page-header">
                <div>
                    <h2>Sell</h2>
                    <div class="subtitle">Tap products to add to cart</div>
                </div>
            </div>

            <div class="search-bar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input type="search" id="sale-search" placeholder="Search products..." />
            </div>

            <div class="category-filters" id="sale-categories">
                ${f.map((E,$)=>`
                    <button class="cat-filter ${$===0?"active":""}" data-cat="${E}">${E}</button>
                `).join("")}
            </div>

            <div class="pos-products" id="product-grid"></div>

            <div class="cart-section ${ae.length===0?"hidden":""}" id="cart-section">
                <div class="cart-header">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h3>Cart</h3>
                        <span class="cart-count" id="cart-count">${ae.length}</span>
                    </div>
                    <button class="cart-clear" id="cart-clear">Clear</button>
                </div>
                <div class="cart-items" id="cart-items"></div>
                <div class="cart-total">
                    <span>Total</span>
                    <span id="cart-total">KSh 0</span>
                </div>
                <div class="checkout-btns">
                    <button class="btn btn-success btn-lg" id="checkout-btn">💵 Checkout</button>
                </div>
            </div>
        </div>
    `;let w="All";function p(E=""){const $=document.getElementById("product-grid");$.innerHTML="";let A=l;if(w!=="All"&&(A=A.filter(B=>(B.category||"General")===w)),E){const B=E.toLowerCase();A=A.filter(_=>_.name.toLowerCase().includes(B))}if(A.length===0){$.innerHTML=`
                <div class="empty-state" style="grid-column: 1/-1;">
                    <h3>No products found</h3>
                    <p>Try a different search or category</p>
                </div>
            `;return}A.forEach(B=>{$.appendChild(_o(B,_=>{fa(_),h(),W(`${_.name} added`,"success")}))})}function h(){const E=document.getElementById("cart-section"),$=document.getElementById("cart-items"),A=document.getElementById("cart-count"),B=document.getElementById("cart-total");if(ae.length===0){E.classList.add("hidden");return}E.classList.remove("hidden"),A.textContent=ae.reduce((_,I)=>_+I.quantity,0),$.innerHTML=ae.map((_,I)=>`
            <div class="cart-item">
                <span style="font-size: 18px;">${_.emoji||"📦"}</span>
                <div class="cart-item-info">
                    <div class="cart-item-name">${_.name}</div>
                    <div class="cart-item-price">KSh ${_.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-qty">
                    <button data-action="dec" data-idx="${I}">−</button>
                    <span>${_.quantity}</span>
                    <button data-action="inc" data-idx="${I}">+</button>
                </div>
                <div class="cart-item-total">KSh ${_.subtotal.toLocaleString()}</div>
            </div>
        `).join(""),B.textContent=`KSh ${ae.reduce((_,I)=>_+I.subtotal,0).toLocaleString()}`,$.querySelectorAll("button").forEach(_=>{_.addEventListener("click",()=>{const I=parseInt(_.dataset.idx);if(_.dataset.action==="inc"){const R=l.find(F=>F.id===ae[I].productId);R&&ae[I].quantity<R.stock&&(ae[I].quantity++,ae[I].subtotal=ae[I].quantity*ae[I].price)}else ae[I].quantity--,ae[I].quantity<=0?ae.splice(I,1):ae[I].subtotal=ae[I].quantity*ae[I].price;h()})})}document.getElementById("sale-search").addEventListener("input",E=>{p(E.target.value)}),document.getElementById("sale-categories").addEventListener("click",E=>{const $=E.target.closest(".cat-filter");$&&(w=$.dataset.cat,document.querySelectorAll("#sale-categories .cat-filter").forEach(A=>A.classList.remove("active")),$.classList.add("active"),p(document.getElementById("sale-search").value))}),document.getElementById("cart-clear").addEventListener("click",()=>{ae=[],h()}),document.getElementById("checkout-btn").addEventListener("click",()=>{ae.length!==0&&Mo(ae,s,d?.name||"Staff",()=>{ae=[],pa(a,s,d)})}),p(),h()}async function xn(a,s,d){const l=nt(d,"canAddStock"),f=await Et(),w=["All",...new Set(f.map(A=>A.category||"General"))],p=f.reduce((A,B)=>A+B.price*B.stock,0),h=f.filter(A=>A.stock<=(A.lowStockThreshold||5)).length;f.reduce((A,B)=>A+(B.costPrice||0)*B.stock,0),a.innerHTML=`
        <div class="page active" id="page-inventory">
            <div class="page-header">
                <div>
                    <h2>Stock</h2>
                    <div class="subtitle">${f.length} products · KSh ${p.toLocaleString()} value</div>
                </div>
                ${l?'<button class="btn btn-primary" id="add-product-btn">+ Add</button>':""}
            </div>

            ${h>0?`
                <div class="low-stock-banner">
                    ⚠️ <strong>${h}</strong> product${h>1?"s":""} running low
                </div>
            `:""}

            <div class="search-bar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input type="search" id="inv-search" placeholder="Search products..." />
            </div>

            <div class="category-filters" id="inv-categories">
                ${w.map((A,B)=>`
                    <button class="cat-filter ${B===0?"active":""}" data-cat="${A}">${A}</button>
                `).join("")}
            </div>

            <div class="inventory-list" id="inv-list"></div>
        </div>
    `;let E="All";function $(A=""){const B=document.getElementById("inv-list");let _=f;if(E!=="All"&&(_=_.filter(I=>(I.category||"General")===E)),A){const I=A.toLowerCase();_=_.filter(R=>R.name.toLowerCase().includes(I)||R.sku&&R.sku.toLowerCase().includes(I))}if(_.length===0){B.innerHTML=`
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                    </svg>
                    <h3>No products</h3>
                    <p>Tap "+ Add" to add your first product</p>
                </div>
            `;return}B.innerHTML="",_.forEach(I=>{B.appendChild(xo(I,R=>{if(!l){W("You don't have permission to edit stock","warning");return}Ai(R,async(F,te)=>{await Dr(te,F),W(`${F.name} updated`,"success"),xn(a,s,d)},async F=>{await zi(F),W("Product deleted","info"),xn(a,s,d)})}))})}document.getElementById("inv-search").addEventListener("input",A=>{$(A.target.value)}),document.getElementById("inv-categories").addEventListener("click",A=>{const B=A.target.closest(".cat-filter");B&&(E=B.dataset.cat,document.querySelectorAll("#inv-categories .cat-filter").forEach(_=>_.classList.remove("active")),B.classList.add("active"),$(document.getElementById("inv-search").value))}),l&&document.getElementById("add-product-btn")?.addEventListener("click",()=>{Ai(null,async A=>{await Fi(A),W(`${A.name} added to inventory`,"success"),xn(a,s,d)})}),$()}const No="modulepreload",Fo=function(a){return"/"+a},Ti={},Nt=function(s,d,l){let f=Promise.resolve();if(d&&d.length>0){let $=function(A){return Promise.all(A.map(B=>Promise.resolve(B).then(_=>({status:"fulfilled",value:_}),_=>({status:"rejected",reason:_}))))};var p=$;document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),E=h?.nonce||h?.getAttribute("nonce");f=$(d.map(A=>{if(A=Fo(A),A in Ti)return;Ti[A]=!0;const B=A.endsWith(".css"),_=B?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${A}"]${_}`))return;const I=document.createElement("link");if(I.rel=B?"stylesheet":No,B||(I.as="script"),I.crossOrigin="",I.href=A,E&&I.setAttribute("nonce",E),document.head.appendChild(I),B)return new Promise((R,F)=>{I.addEventListener("load",R),I.addEventListener("error",()=>F(new Error(`Unable to preload CSS for ${A}`)))})}))}function w(h){const E=new Event("vite:preloadError",{cancelable:!0});if(E.payload=h,window.dispatchEvent(E),!E.defaultPrevented)throw h}return f.then(h=>{for(const E of h||[])E.status==="rejected"&&w(E.reason);return s().catch(w)})};let bt="credits";async function St(a,s,d){const l=await Ht(),f=await Kr();l.reduce((w,p)=>w+p.amount,0),f.reduce((w,p)=>w+p.balance,0),a.innerHTML=`
        <div class="page active" id="page-credits">
            <div class="page-header">
                <div>
                    <h2>Accounts</h2>
                    <div class="subtitle">Credits & Deposits</div>
                </div>
            </div>

            <div class="tab-bar">
                <button class="tab-btn ${bt==="credits"?"active":""}" data-tab="credits">
                    📝 Credits <span class="tab-badge">${l.length}</span>
                </button>
                <button class="tab-btn ${bt==="debits"?"active":""}" data-tab="debits">
                    💰 Deposits <span class="tab-badge">${f.length}</span>
                </button>
            </div>

            <div id="tab-content"></div>
        </div>
    `,a.querySelectorAll(".tab-btn").forEach(w=>{w.addEventListener("click",()=>{bt=w.dataset.tab,a.querySelectorAll(".tab-btn").forEach(p=>p.classList.toggle("active",p.dataset.tab===bt)),Bi(a,s,d)})}),Bi(a,s,d)}async function Bi(a,s,d){const l=document.getElementById("tab-content");bt==="credits"?await zo(l,s,d,a):await Uo(l,s,d,a)}async function zo(a,s,d,l){const f=await Ht(),w=f.reduce((E,$)=>E+$.amount,0);a.innerHTML=`
        <div class="credit-controls">
            <div class="search-bar" style="margin-bottom: 8px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input type="search" id="credit-search" placeholder="Search by name or phone..." />
            </div>
            <div class="credit-filter-row">
                <select id="credit-amount-filter">
                    <option value="">All amounts</option>
                    <option value="0-500">KSh 0 - 500</option>
                    <option value="500-1000">KSh 500 - 1,000</option>
                    <option value="1000-5000">KSh 1,000 - 5,000</option>
                    <option value="5000+">KSh 5,000+</option>
                </select>
                <button class="btn btn-primary" id="add-credit-btn">+ Add</button>
            </div>
        </div>

        ${f.length>0?`
            <div class="stats-grid" style="margin-bottom: var(--space-md);">
                <div class="stat-card">
                    <div class="stat-label">Total Owed</div>
                    <div class="stat-value" style="color: var(--accent-secondary);">KSh ${w.toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Customers</div>
                    <div class="stat-value">${f.length}</div>
                </div>
            </div>
        `:""}

        <div class="credit-list" id="credit-list"></div>
    `;function p(E="",$=null,A=null){const B=document.getElementById("credit-list");let _=f;if(E){const I=E.toLowerCase();_=_.filter(R=>R.customerName.toLowerCase().includes(I)||R.phone&&R.phone.includes(I))}if($!==null&&(_=_.filter(I=>I.amount>=$)),A!==null&&(_=_.filter(I=>I.amount<=A)),_.length===0){B.innerHTML=`
                <div class="empty-state">
                    <h3>No matching records</h3>
                    <p>Try a different search or filter</p>
                </div>
            `;return}B.innerHTML=_.map(I=>{const R=I.trustScore||50,F=R>=70?"high":R>=40?"medium":"low",te=["#0d9488","#14b8a6","#f97316","#fb923c","#ef4444","#3b82f6"],me=te[I.customerName.charCodeAt(0)%te.length],at=I.amount>0&&I.createdAt<Date.now()-7*864e5,_t=(I.payments||[]).reduce((Vt,Se)=>Vt+Se.amount,0),Fe=I.originalAmount||I.amount+_t;return`
                <div class="credit-item" data-id="${I.id}">
                    <div class="credit-avatar" style="background: ${me}">
                        ${I.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div class="credit-info">
                        <div class="credit-name">${I.customerName}</div>
                        <div class="credit-meta">
                            ${I.phone?`📞 ${I.phone} · `:""}
                            ${I.payments?.length||0} payment${(I.payments?.length||0)!==1?"s":""}
                            ${at?' · <span style="color:var(--danger)">Overdue</span>':""}
                        </div>
                        <div class="credit-history-mini">
                            Borrowed: KSh ${Fe.toLocaleString()} · Paid: KSh ${_t.toLocaleString()}
                        </div>
                        <div class="trust-bar">
                            <div class="trust-fill ${F}" style="width: ${R}%"></div>
                        </div>
                    </div>
                    <div class="credit-amount ${I.amount<=0?"paid":""}">
                        <div class="amount-value">KSh ${I.amount.toLocaleString()}</div>
                        <div class="amount-label">${I.amount<=0?"Paid":"owes"}</div>
                    </div>
                </div>
            `}).join("")}p(),document.getElementById("credit-search")?.addEventListener("input",E=>{const $=document.getElementById("credit-amount-filter").value,{min:A,max:B}=Di($);p(E.target.value,A,B)}),document.getElementById("credit-amount-filter")?.addEventListener("change",E=>{const $=document.getElementById("credit-search").value,{min:A,max:B}=Di(E.target.value);p($,A,B)}),a.querySelectorAll(".credit-item").forEach(E=>{E.addEventListener("click",()=>{const $=f.find(A=>A.id===E.dataset.id);$&&Oi($,s,d,l)})});const h=()=>{document.querySelectorAll(".credit-item").forEach(E=>{E.addEventListener("click",()=>{const $=f.find(A=>A.id===E.dataset.id);$&&Oi($,s,d,l)})})};document.getElementById("credit-search")?.addEventListener("input",()=>setTimeout(h,50)),document.getElementById("credit-amount-filter")?.addEventListener("change",()=>setTimeout(h,50)),document.getElementById("add-credit-btn")?.addEventListener("click",()=>{Ho(s,d,l)})}function Di(a){return a?a==="0-500"?{min:0,max:500}:a==="500-1000"?{min:500,max:1e3}:a==="1000-5000"?{min:1e3,max:5e3}:a==="5000+"?{min:5e3,max:null}:{min:null,max:null}:{min:null,max:null}}async function Uo(a,s,d,l){const f=await Kr(),w=f.reduce((p,h)=>p+h.balance,0);a.innerHTML=`
        <div style="display: flex; justify-content: flex-end; margin-bottom: var(--space-md);">
            <button class="btn btn-primary" id="add-debit-btn">+ New Deposit</button>
        </div>

        ${f.length>0?`
            <div class="stats-grid" style="margin-bottom: var(--space-md);">
                <div class="stat-card">
                    <div class="stat-label">Total Deposits Held</div>
                    <div class="stat-value" style="color: var(--success);">KSh ${w.toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Accounts</div>
                    <div class="stat-value">${f.length}</div>
                </div>
            </div>
        `:""}

        <div class="credit-list" id="debit-list">
            ${f.length===0?`
                <div class="empty-state">
                    <h3>No deposit accounts</h3>
                    <p>Create a deposit account for customers who pre-pay</p>
                </div>
            `:f.map(p=>{const h=p.initialDeposit>0?Math.round(p.balance/p.initialDeposit*100):0,E=h<20;return`
                    <div class="credit-item debit-item" data-id="${p.id}">
                        <div class="credit-avatar" style="background: var(--success)">
                            ${p.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div class="credit-info">
                            <div class="credit-name">${p.customerName}</div>
                            <div class="credit-meta">
                                ${p.phone?`📞 ${p.phone} · `:""}
                                ${p.transactions?.length||0} transaction${(p.transactions?.length||0)!==1?"s":""}
                                · Started ${new Date(p.createdAt).toLocaleDateString()}
                            </div>
                            <div class="trust-bar">
                                <div class="trust-fill ${E?"low":"high"}" style="width: ${h}%"></div>
                            </div>
                            ${E?'<div style="font-size: 11px; color: var(--danger); margin-top: 2px;">⚠ Low balance</div>':""}
                        </div>
                        <div class="credit-amount paid">
                            <div class="amount-value">KSh ${p.balance.toLocaleString()}</div>
                            <div class="amount-label">balance</div>
                        </div>
                    </div>
                `}).join("")}
        </div>
    `,a.querySelectorAll(".debit-item").forEach(p=>{p.addEventListener("click",()=>{const h=f.find(E=>E.id===p.dataset.id);h&&Vo(h,s,d,l)})}),document.getElementById("add-debit-btn")?.addEventListener("click",()=>{Xo(s,d,l)})}function Oi(a,s,d,l){const f=document.getElementById("modal-backdrop"),w=document.getElementById("modal"),p=(a.payments||[]).reduce((E,$)=>E+$.amount,0),h=a.originalAmount||a.amount+p;w.innerHTML=`
        <div class="modal-handle"></div>
        <h2>${a.customerName}</h2>
        ${a.phone?`<div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 8px;">📞 ${a.phone}</div>`:""}
        <div style="margin-bottom: var(--space-md);">
            <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--accent-secondary);">
                KSh ${a.amount.toLocaleString()}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted);">Outstanding balance</div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 4px;">
                Total borrowed: KSh ${h.toLocaleString()} · Total paid: KSh ${p.toLocaleString()}
            </div>
        </div>

        ${a.payments&&a.payments.length>0?`
            <div class="section-header"><h3>Payment History</h3></div>
            <div style="margin-bottom: var(--space-md); max-height: 150px; overflow-y: auto;">
                ${a.payments.map(E=>`
                    <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-light); font-size: var(--font-size-sm);">
                        <span style="color: var(--text-muted);">${new Date(E.date).toLocaleDateString()} ${new Date(E.date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                        <span style="color: var(--success); font-weight: 600;">KSh ${E.amount.toLocaleString()}</span>
                    </div>
                `).join("")}
            </div>
        `:""}

        ${a.amount>0?`
            <div class="form-group">
                <label>Record Payment (max: KSh ${a.amount.toLocaleString()})</label>
                <input type="number" id="payment-amount" placeholder="Amount paid" min="1" max="${a.amount}" />
            </div>
            <div class="modal-actions">
                <button class="btn btn-ghost" id="pay-cancel">Cancel</button>
                <button class="btn btn-success" id="pay-record">Record Payment</button>
            </div>
        `:`
            <div class="modal-actions">
                <button class="btn btn-ghost" id="pay-cancel">Close</button>
            </div>
        `}
    `,f.classList.remove("hidden"),w.classList.remove("hidden"),a.amount>0&&document.getElementById("pay-record").addEventListener("click",async()=>{const E=parseFloat(document.getElementById("payment-amount").value);if(!E||E<=0){W("Enter a valid amount (> 0)","warning");return}if(E>a.amount){W(`Payment cannot exceed KSh ${a.amount.toLocaleString()}`,"warning");return}try{await Vi(a.id,E),f.classList.add("hidden"),w.classList.add("hidden"),W(`Payment of KSh ${E.toLocaleString()} recorded ✓`,"success"),St(l,s,d)}catch($){W($.message,"error")}}),document.getElementById("pay-cancel").addEventListener("click",()=>{f.classList.add("hidden"),w.classList.add("hidden")}),f.addEventListener("click",()=>{f.classList.add("hidden"),w.classList.add("hidden")})}function Ho(a,s,d){const l=document.getElementById("modal-backdrop"),f=document.getElementById("modal");f.innerHTML=`
        <div class="modal-handle"></div>
        <h2>Add Customer Tab</h2>
        <div class="form-group">
            <label>Customer Name</label>
            <input type="text" id="credit-name" placeholder="Customer name" />
        </div>
        <div class="form-group">
            <label>Phone Number (unique identifier)</label>
            <input type="tel" id="credit-phone" placeholder="07XX XXX XXX" maxlength="12" />
        </div>
        <div class="form-group">
            <label>Amount Owed (KSh)</label>
            <input type="number" id="credit-amount" placeholder="0" min="1" />
        </div>
        <div id="existing-customer-msg" class="hidden" style="padding: 8px; background: var(--accent-primary); background: rgba(13,148,136,0.15); border-radius: 8px; font-size: 12px; color: var(--accent-primary); margin-bottom: 12px;">
            ℹ️ This phone already has a tab — amount will be added to existing balance
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="credit-cancel">Cancel</button>
            <button class="btn btn-primary" id="credit-save">Add Tab</button>
        </div>
    `,l.classList.remove("hidden"),f.classList.remove("hidden");const w=document.getElementById("credit-phone"),p=document.getElementById("existing-customer-msg");w.addEventListener("input",async()=>{const h=w.value.trim();if(h.length>=10){const{findCreditByPhone:E}=await Nt(async()=>{const{findCreditByPhone:A}=await Promise.resolve().then(()=>ea);return{findCreditByPhone:A}},void 0),$=await E(h);$?(p.classList.remove("hidden"),p.textContent=`ℹ️ ${$.customerName} already has a tab (KSh ${$.amount}) — amount will be added`,document.getElementById("credit-name").value=$.customerName):p.classList.add("hidden")}else p.classList.add("hidden")}),document.getElementById("credit-save").addEventListener("click",async()=>{const h=document.getElementById("credit-name").value.trim(),E=document.getElementById("credit-phone").value.trim(),$=parseFloat(document.getElementById("credit-amount").value);if(!h){W("Enter customer name","warning");return}if(!$||$<=0){W("Enter a valid amount (> 0)","warning");return}try{await Or(h,E,$,a),l.classList.add("hidden"),f.classList.add("hidden"),W(`${h}'s tab updated — KSh ${$.toLocaleString()}`,"success"),St(d,a,s)}catch(A){W(A.message,"error")}}),document.getElementById("credit-cancel").addEventListener("click",()=>{l.classList.add("hidden"),f.classList.add("hidden")}),l.addEventListener("click",()=>{l.classList.add("hidden"),f.classList.add("hidden")})}function Vo(a,s,d,l){const f=document.getElementById("modal-backdrop"),w=document.getElementById("modal"),p=a.initialDeposit>0?Math.round(a.balance/a.initialDeposit*100):0;w.innerHTML=`
        <div class="modal-handle"></div>
        <h2>${a.customerName}</h2>
        ${a.phone?`<div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 8px;">📞 ${a.phone}</div>`:""}
        <div style="margin-bottom: var(--space-md);">
            <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--success);">
                KSh ${a.balance.toLocaleString()}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
                Remaining balance (${p}% of KSh ${a.initialDeposit.toLocaleString()})
            </div>
        </div>

        <div class="section-header"><h3>Transaction History</h3></div>
        <div style="margin-bottom: var(--space-md); max-height: 180px; overflow-y: auto;">
            ${(a.transactions||[]).map(h=>`
                <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-light); font-size: var(--font-size-sm);">
                    <div>
                        <div style="font-weight: 500;">${h.description}</div>
                        <div style="font-size: 11px; color: var(--text-muted);">${new Date(h.date).toLocaleString()}</div>
                    </div>
                    <span style="color: ${h.type==="deposit"?"var(--success)":"var(--accent-secondary)"}; font-weight: 600;">
                        ${h.type==="deposit"?"+":"-"}KSh ${h.amount.toLocaleString()}
                    </span>
                </div>
            `).join("")}
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>Deduct Purchase</label>
                <input type="number" id="debit-purchase" placeholder="Amount" min="1" max="${a.balance}" />
            </div>
            <div class="form-group">
                <label>Top Up</label>
                <input type="number" id="debit-topup" placeholder="Amount" min="1" />
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" id="debit-desc" placeholder="What was purchased?" />
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="debit-cancel">Cancel</button>
            <button class="btn btn-success" id="debit-topup-btn">+ Top Up</button>
            <button class="btn btn-primary" id="debit-purchase-btn">- Deduct</button>
        </div>
    `,f.classList.remove("hidden"),w.classList.remove("hidden"),document.getElementById("debit-purchase-btn").addEventListener("click",async()=>{const h=parseFloat(document.getElementById("debit-purchase").value),E=document.getElementById("debit-desc").value.trim()||"Purchase";if(!h||h<=0){W("Enter a valid amount","warning");return}try{await Wi(a.id,h,E),f.classList.add("hidden"),w.classList.add("hidden"),W(`KSh ${h.toLocaleString()} deducted ✓`,"success"),St(l,s,d)}catch($){W($.message,"error")}}),document.getElementById("debit-topup-btn").addEventListener("click",async()=>{const h=parseFloat(document.getElementById("debit-topup").value);if(!h||h<=0){W("Enter a valid amount","warning");return}try{await Yi(a.id,h),f.classList.add("hidden"),w.classList.add("hidden"),W(`KSh ${h.toLocaleString()} added ✓`,"success"),St(l,s,d)}catch(E){W(E.message,"error")}}),document.getElementById("debit-cancel").addEventListener("click",()=>{f.classList.add("hidden"),w.classList.add("hidden")}),f.addEventListener("click",()=>{f.classList.add("hidden"),w.classList.add("hidden")})}function Xo(a,s,d){const l=document.getElementById("modal-backdrop"),f=document.getElementById("modal");f.innerHTML=`
        <div class="modal-handle"></div>
        <h2>New Deposit Account</h2>
        <div class="form-group">
            <label>Customer Name</label>
            <input type="text" id="debit-name" placeholder="Customer name" />
        </div>
        <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" id="debit-phone" placeholder="07XX XXX XXX" maxlength="12" />
        </div>
        <div class="form-group">
            <label>Initial Deposit (KSh)</label>
            <input type="number" id="debit-amount" placeholder="0" min="1" />
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="debit-cancel">Cancel</button>
            <button class="btn btn-success" id="debit-save">Create Account</button>
        </div>
    `,l.classList.remove("hidden"),f.classList.remove("hidden"),document.getElementById("debit-save").addEventListener("click",async()=>{const w=document.getElementById("debit-name").value.trim(),p=document.getElementById("debit-phone").value.trim(),h=parseFloat(document.getElementById("debit-amount").value);if(!w){W("Enter customer name","warning");return}if(!h||h<=0){W("Enter a valid deposit amount","warning");return}try{await Xi(w,p,h),l.classList.add("hidden"),f.classList.add("hidden"),W(`${w}'s deposit account — KSh ${h.toLocaleString()} ✓`,"success"),bt="debits",St(d,a,s)}catch(E){W(E.message,"error")}}),document.getElementById("debit-cancel").addEventListener("click",()=>{l.classList.add("hidden"),f.classList.add("hidden")}),l.addEventListener("click",()=>{l.classList.add("hidden"),f.classList.add("hidden")})}async function $n(a,s,d,{onLock:l}){const w=(localStorage.getItem("ts_theme")||"dark")==="dark",p=await Qi(20);a.innerHTML=`
        <div class="page active" id="page-settings">
            <div class="page-header">
                <div>
                    <h2>Settings</h2>
                    <div class="subtitle">Preferences & Tools</div>
                </div>
            </div>

            <div class="settings-list">
                <div class="settings-item" id="toggle-theme">
                    <div class="settings-icon" style="background: var(--accent-primary); background: rgba(13,148,136,0.15);">
                        ${w?"🌙":"☀️"}
                    </div>
                    <div class="settings-info">
                        <div class="settings-label">Theme</div>
                        <div class="settings-desc">${w?"Dark Mode":"Light Mode"}</div>
                    </div>
                    <label class="toggle">
                        <input type="checkbox" id="theme-switch" ${w?"":"checked"} />
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="settings-item" id="load-demo-data">
                    <div class="settings-icon" style="background: rgba(249,115,22,0.15);">📦</div>
                    <div class="settings-info">
                        <div class="settings-label">Load Demo Data</div>
                        <div class="settings-desc">Add sample products and customers</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>

                <div class="settings-item" id="view-reports">
                    <div class="settings-icon" style="background: rgba(59,130,246,0.15);">📊</div>
                    <div class="settings-info">
                        <div class="settings-label">Sales Reports</div>
                        <div class="settings-desc">Detailed sales analytics</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>

                <div class="settings-item" id="settings-lock">
                    <div class="settings-icon" style="background: rgba(239,68,68,0.15);">🔒</div>
                    <div class="settings-info">
                        <div class="settings-label">Lock App</div>
                        <div class="settings-desc">Return to lock screen</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>
            </div>

            ${p.length>0?`
                <div class="section-header" style="margin-top: var(--space-lg);">
                    <h3>Sync Activity</h3>
                </div>
                <div class="sync-log">
                    ${p.map(h=>`
                        <div class="sync-log-item">
                            <span class="sync-log-time">${new Date(h.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                            <span class="sync-log-msg">${h.action}</span>
                            <span class="sync-log-status">${h.details||""}</span>
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,document.getElementById("theme-switch").addEventListener("change",h=>{const E=h.target.checked?"light":"dark";localStorage.setItem("ts_theme",E),document.documentElement.setAttribute("data-theme",E),$n(a,s,d,{onLock:l})}),document.getElementById("load-demo-data").addEventListener("click",async()=>{await Wo(),W("Demo data loaded! 🎉","success"),$n(a,s,d,{onLock:l})}),document.getElementById("view-reports").addEventListener("click",()=>{location.hash="#reports"}),document.getElementById("settings-lock").addEventListener("click",l)}async function Wo(){const a=Ut(),s=[{name:"White Bread 400g",price:60,stock:48,category:"Food",emoji:"🍞",unit:"pcs",costPrice:45,description:"Premium white bread, soft and fresh",lowStockThreshold:10},{name:"Fresh Milk 500ml",price:75,stock:30,category:"Drinks",emoji:"🥛",unit:"pcs",costPrice:55,description:"Pasteurized fresh milk",lowStockThreshold:8},{name:"Farm Eggs (Tray)",price:450,stock:15,category:"Food",emoji:"🥚",unit:"tray",costPrice:380,description:"Farm fresh eggs, 30 per tray",lowStockThreshold:3},{name:"Maize Flour 2kg",price:180,stock:40,category:"Food",emoji:"🌽",unit:"pcs",costPrice:150,description:"Fine maize flour for ugali",lowStockThreshold:8},{name:"Cooking Oil 1L",price:320,stock:22,category:"Food",emoji:"🫗",unit:"litre",costPrice:280,description:"Pure vegetable cooking oil",lowStockThreshold:5},{name:"Rice 2kg",price:280,stock:25,category:"Food",emoji:"🍚",unit:"pcs",costPrice:230,description:"Pishori long-grain rice",lowStockThreshold:5},{name:"Sugar 1kg",price:160,stock:35,category:"Food",emoji:"🧊",unit:"kg",costPrice:130,description:"White refined sugar",lowStockThreshold:8},{name:"Washing Soap",price:45,stock:60,category:"Household",emoji:"🧼",unit:"pcs",costPrice:30,description:"Multipurpose bar soap",lowStockThreshold:15},{name:"Phone Charger",price:350,stock:10,category:"Electronics",emoji:"🔌",unit:"pcs",costPrice:200,description:"Fast charging USB cable",lowStockThreshold:3},{name:"Soda 500ml",price:80,stock:50,category:"Drinks",emoji:"🥤",unit:"pcs",costPrice:55,description:"Assorted soft drinks",lowStockThreshold:10},{name:"Bread Spread",price:120,stock:18,category:"Food",emoji:"🧈",unit:"pcs",costPrice:90,description:"Butter spread 250g",lowStockThreshold:4},{name:"Tea Leaves 100g",price:85,stock:35,category:"Drinks",emoji:"🍵",unit:"pcs",costPrice:60,description:"Kenya highland tea",lowStockThreshold:8}];for(const d of s)await Y.products.filter(f=>f.name===d.name&&!f._tombstone).first()||await Y.products.add({id:be(),...d,_hlc:a,_tombstone:!1,_lastModified:Date.now(),createdAt:Date.now()})}const Yo=Object.freeze(Object.defineProperty({__proto__:null,renderSettings:$n},Symbol.toStringTag,{value:"Module"}));async function Go(a,s,d){const l=await Bn(),f=new Date,w=new Date(f);w.setHours(0,0,0,0);const p=new Date(f);p.setDate(f.getDate()-f.getDay()),p.setHours(0,0,0,0);const h=new Date(f.getFullYear(),f.getMonth(),1);let E=w.getTime(),$=null,A="",B="";async function _(){const I=await Zi(E,$,A||null,B||null),R={cash:"💵 Cash",credit:"📝 Credit",mpesa:"📱 M-Pesa",airtel:"📲 Airtel"};a.innerHTML=`
            <div class="page active" id="page-reports">
                <div class="page-header">
                    <div>
                        <h2>Sales Report</h2>
                        <div class="subtitle">${I.totalSales} sales · KSh ${I.totalRevenue.toLocaleString()}</div>
                    </div>
                    <button class="btn btn-ghost" id="export-csv">📥 Export</button>
                </div>

                <div class="report-filters">
                    <select id="rpt-date-range">
                        <option value="today" selected>Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="all">All Time</option>
                    </select>
                    <select id="rpt-method">
                        <option value="">All Methods</option>
                        <option value="cash">Cash</option>
                        <option value="mpesa">M-Pesa</option>
                        <option value="airtel">Airtel</option>
                        <option value="credit">Credit</option>
                    </select>
                    <select id="rpt-profile">
                        <option value="">All Staff</option>
                        ${l.map(F=>`<option value="${F.id}">${F.name}</option>`).join("")}
                    </select>
                </div>

                <div class="stats-grid" style="margin-bottom: var(--space-md);">
                    <div class="stat-card revenue-card">
                        <div class="stat-label">Revenue</div>
                        <div class="stat-value">KSh ${I.totalRevenue.toLocaleString()}</div>
                        <div class="stat-sub">${I.totalSales} sales · ${I.totalItems} items</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Avg Sale</div>
                        <div class="stat-value">KSh ${Math.round(I.avgSaleSize).toLocaleString()}</div>
                    </div>
                </div>

                ${Object.keys(I.byMethod).length>0?`
                    <div class="section-header"><h3>By Payment Method</h3></div>
                    <div class="report-method-grid">
                        ${Object.entries(I.byMethod).map(([F,te])=>`
                            <div class="report-method-card">
                                <div class="report-method-icon">${R[F]?.split(" ")[0]||"💰"}</div>
                                <div class="report-method-info">
                                    <div class="report-method-name">${R[F]||F}</div>
                                    <div class="report-method-value">KSh ${te.total.toLocaleString()} · ${te.count} sales</div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                `:""}

                ${I.topProducts.length>0?`
                    <div class="section-header" style="margin-top: var(--space-md);"><h3>Top Products</h3></div>
                    <div class="report-top-products">
                        ${I.topProducts.slice(0,5).map((F,te)=>`
                            <div class="report-product-row">
                                <span class="report-rank">#${te+1}</span>
                                <div class="report-product-info">
                                    <div class="report-product-name">${F.name}</div>
                                    <div class="report-product-meta">${F.quantity} sold</div>
                                </div>
                                <span class="report-product-revenue">KSh ${F.revenue.toLocaleString()}</span>
                            </div>
                        `).join("")}
                    </div>
                `:""}

                <div class="section-header" style="margin-top: var(--space-md);"><h3>Sales Detail</h3></div>
                <div class="report-table-wrapper">
                    <div class="report-table">
                        ${I.sales.length===0?`
                            <div class="empty-state"><h3>No sales in this period</h3></div>
                        `:I.sales.map(F=>`
                            <div class="report-sale-row">
                                <div class="report-sale-main">
                                    <div class="report-sale-who">${F.profileName||"Unknown"}</div>
                                    <div class="report-sale-what">${F.items.map(te=>`${te.name} ×${te.quantity}`).join(", ")}</div>
                                    <div class="report-sale-when">${new Date(F.saleTime||F.createdAt).toLocaleString("en-KE",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>
                                </div>
                                <div class="report-sale-right">
                                    <div class="report-sale-amount">KSh ${F.total.toLocaleString()}</div>
                                    <div class="report-sale-items">${F.items.reduce((te,me)=>te+me.quantity,0)} items</div>
                                    <div class="report-sale-method">${R[F.paymentMethod]||F.paymentMethod}</div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `,document.getElementById("rpt-date-range").addEventListener("change",F=>{switch(F.target.value){case"today":E=w.getTime(),$=null;break;case"week":E=p.getTime(),$=null;break;case"month":E=h.getTime(),$=null;break;case"all":E=null,$=null;break}_()}),document.getElementById("rpt-method").addEventListener("change",F=>{A=F.target.value,_()}),document.getElementById("rpt-profile").addEventListener("change",F=>{B=F.target.value,_()}),document.getElementById("export-csv").addEventListener("click",()=>{Qo(I)})}_()}function Qo(a){const s=["Receipt #","Date","Time","Staff","Items","Qty","Amount","Payment Method"],d=a.sales.map(h=>{const E=new Date(h.saleTime||h.createdAt);return[h.receiptId||"",E.toLocaleDateString(),E.toLocaleTimeString(),h.profileName||"",h.items.map($=>$.name).join("; "),h.items.reduce(($,A)=>$+A.quantity,0),h.total,h.paymentMethod].join(",")}),l=[s.join(","),...d].join(`
`),f=new Blob([l],{type:"text/csv"}),w=URL.createObjectURL(f),p=document.createElement("a");p.href=w,p.download=`tradesync-report-${new Date().toISOString().split("T")[0]}.csv`,p.click(),URL.revokeObjectURL(w)}async function An(a,s){if(s.role!=="admin"){a.innerHTML='<div class="page active"><div class="empty-state"><h3>Access Denied</h3><p>Only admin users can access this page</p></div></div>';return}const d=await Bn(),l=await Et();await Ht();const w=(localStorage.getItem("ts_theme")||"dark")==="dark";a.innerHTML=`
        <div class="page active" id="page-admin">
            <div class="page-header">
                <div>
                    <h2>Admin Panel 👑</h2>
                    <div class="subtitle">Manage profiles & system</div>
                </div>
            </div>

            <div class="stats-grid" style="margin-bottom: var(--space-lg);">
                <div class="stat-card">
                    <div class="stat-label">Profiles</div>
                    <div class="stat-value">${d.length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Products</div>
                    <div class="stat-value">${l.length}</div>
                </div>
            </div>

            <div class="section-header">
                <h3>Team Members</h3>
                <button class="btn btn-primary" id="admin-add-profile">+ Add Profile</button>
            </div>

            <div class="admin-profile-list" id="admin-profiles">
                ${d.map(p=>`
                    <div class="admin-profile-card" data-id="${p.id}">
                        <div class="admin-profile-header">
                            <div class="credit-avatar" style="background: ${p.color}">
                                ${p.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="admin-profile-info">
                                <div class="admin-profile-name">
                                    ${p.name} ${p.role==="admin"?"👑":""}
                                </div>
                                <div class="admin-profile-role">${p.role==="admin"?"Administrator":"Staff"}</div>
                            </div>
                            ${p.role!=="admin"?`<button class="btn btn-ghost btn-sm admin-delete-profile" data-id="${p.id}">🗑️</button>`:""}
                        </div>
                        ${p.role!=="admin"?`
                            <div class="admin-privileges">
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canSell" ${p.privileges?.canSell?"checked":""} />
                                    <span>Can Sell</span>
                                </label>
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canAddStock" ${p.privileges?.canAddStock?"checked":""} />
                                    <span>Can Manage Stock</span>
                                </label>
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canManageCredits" ${p.privileges?.canManageCredits?"checked":""} />
                                    <span>Can Manage Credits</span>
                                </label>
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canViewReports" ${p.privileges?.canViewReports?"checked":""} />
                                    <span>Can View Reports</span>
                                </label>
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canManageDebits" ${p.privileges?.canManageDebits?"checked":""} />
                                    <span>Can Manage Deposits</span>
                                </label>
                            </div>
                        `:`
                            <div class="admin-privileges">
                                <div style="font-size: var(--font-size-xs); color: var(--text-muted); padding: 8px;">
                                    Full access to all features
                                </div>
                            </div>
                        `}
                    </div>
                `).join("")}
            </div>

            <div class="settings-list" style="margin-top: var(--space-lg);">
                <div class="section-header"><h3>System</h3></div>
                <div class="settings-item" id="admin-toggle-theme">
                    <div class="settings-icon" style="background: rgba(13,148,136,0.15);">
                        ${w?"🌙":"☀️"}
                    </div>
                    <div class="settings-info">
                        <div class="settings-label">Theme</div>
                        <div class="settings-desc">${w?"Dark Mode":"Light Mode"}</div>
                    </div>
                    <label class="toggle">
                        <input type="checkbox" id="admin-theme-switch" ${w?"":"checked"} />
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="settings-item" id="admin-demo-data">
                    <div class="settings-icon" style="background: rgba(249,115,22,0.15);">📦</div>
                    <div class="settings-info">
                        <div class="settings-label">Load Demo Data</div>
                        <div class="settings-desc">Add sample products</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>
                <div class="settings-item" id="admin-view-reports">
                    <div class="settings-icon" style="background: rgba(59,130,246,0.15);">📊</div>
                    <div class="settings-info">
                        <div class="settings-label">Sales Reports</div>
                        <div class="settings-desc">Detailed analytics</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>
                <div class="settings-item" id="admin-lock">
                    <div class="settings-icon" style="background: rgba(239,68,68,0.15);">🔒</div>
                    <div class="settings-info">
                        <div class="settings-label">Lock App</div>
                        <div class="settings-desc">Return to lock screen</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>
            </div>
        </div>
    `,a.querySelectorAll(".admin-priv-toggle input").forEach(p=>{p.addEventListener("change",async h=>{const E=h.target.dataset.id,$=h.target.dataset.priv,A=d.find(B=>B.id===E);if(A){const B={...A.privileges,[$]:h.target.checked};await qi(E,{privileges:B}),W(`${A.name}'s permissions updated`,"success")}})}),a.querySelectorAll(".admin-delete-profile").forEach(p=>{p.addEventListener("click",async h=>{h.stopPropagation();const E=p.dataset.id,$=d.find(A=>A.id===E);if(confirm(`Delete profile "${$?.name}"? This cannot be undone.`))try{await Ri(E),W(`${$.name} deleted`,"info"),An(a,s)}catch(A){W(A.message,"error")}})}),document.getElementById("admin-add-profile").addEventListener("click",()=>{Jo(a,s)}),document.getElementById("admin-theme-switch")?.addEventListener("change",p=>{const h=p.target.checked?"light":"dark";localStorage.setItem("ts_theme",h),document.documentElement.setAttribute("data-theme",h),An(a,s)}),document.getElementById("admin-demo-data")?.addEventListener("click",async()=>{const{renderSettings:p}=await Nt(async()=>{const{renderSettings:_}=await Promise.resolve().then(()=>Yo);return{renderSettings:_}},void 0),{db:h}=await Nt(async()=>{const{db:_}=await Promise.resolve().then(()=>ea);return{db:_}},void 0),{uuid:E}=await Nt(async()=>{const{uuid:_}=await Promise.resolve().then(()=>Qa);return{uuid:_}},void 0),{now:$}=await Nt(async()=>{const{now:_}=await Promise.resolve().then(()=>Ga);return{now:_}},void 0),A=$(),B=[{name:"White Bread 400g",price:60,stock:48,category:"Food",emoji:"🍞",unit:"pcs",costPrice:45,description:"Premium white bread",lowStockThreshold:10},{name:"Fresh Milk 500ml",price:75,stock:30,category:"Drinks",emoji:"🥛",unit:"pcs",costPrice:55,description:"Pasteurized fresh milk",lowStockThreshold:8},{name:"Farm Eggs (Tray)",price:450,stock:15,category:"Food",emoji:"🥚",unit:"tray",costPrice:380,description:"Farm fresh eggs, 30 per tray",lowStockThreshold:3},{name:"Maize Flour 2kg",price:180,stock:40,category:"Food",emoji:"🌽",unit:"pcs",costPrice:150,description:"Fine maize flour for ugali",lowStockThreshold:8},{name:"Cooking Oil 1L",price:320,stock:22,category:"Food",emoji:"🫗",unit:"litre",costPrice:280,description:"Pure vegetable cooking oil",lowStockThreshold:5},{name:"Soda 500ml",price:80,stock:50,category:"Drinks",emoji:"🥤",unit:"pcs",costPrice:55,description:"Assorted soft drinks",lowStockThreshold:10}];for(const _ of B)await h.products.filter(R=>R.name===_.name&&!R._tombstone).first()||await h.products.add({id:E(),..._,_hlc:A,_tombstone:!1,_lastModified:Date.now(),createdAt:Date.now()});W("Demo data loaded! 🎉","success")}),document.getElementById("admin-view-reports")?.addEventListener("click",()=>{location.hash="#reports"}),document.getElementById("admin-lock")?.addEventListener("click",()=>{sessionStorage.removeItem("ts_profileId");const{lock:p}=require("../components/pin-lock.js")||{};location.hash="#dashboard",location.reload()})}function Jo(a,s){const d=document.getElementById("modal-backdrop"),l=document.getElementById("modal");l.innerHTML=`
        <div class="modal-handle"></div>
        <h2>Add Team Member</h2>
        <div class="form-group">
            <label>Name</label>
            <input type="text" id="new-staff-name" placeholder="Staff name" />
        </div>
        <div class="form-group">
            <label>4-Digit PIN</label>
            <input type="password" id="new-staff-pin" placeholder="••••" maxlength="4" inputmode="numeric" />
        </div>
        <div class="form-group">
            <label>Permissions</label>
            <div class="admin-privileges-modal">
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canSell" checked /><span>Can Sell</span></label>
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canAddStock" /><span>Can Manage Stock</span></label>
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canManageCredits" /><span>Can Manage Credits</span></label>
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canViewReports" /><span>Can View Reports</span></label>
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canManageDebits" /><span>Can Manage Deposits</span></label>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="np-cancel">Cancel</button>
            <button class="btn btn-primary" id="np-save">Create Profile</button>
        </div>
    `,d.classList.remove("hidden"),l.classList.remove("hidden"),document.getElementById("np-save").addEventListener("click",async()=>{const f=document.getElementById("new-staff-name").value.trim(),w=document.getElementById("new-staff-pin").value.trim();if(!f){W("Enter staff name","warning");return}if(w.length!==4){W("PIN must be 4 digits","warning");return}const p={canSell:document.getElementById("np-canSell").checked,canAddStock:document.getElementById("np-canAddStock").checked,canManageCredits:document.getElementById("np-canManageCredits").checked,canViewReports:document.getElementById("np-canViewReports").checked,canManageDebits:document.getElementById("np-canManageDebits").checked};try{await Br(f,w,"staff",p,s.id),d.classList.add("hidden"),l.classList.add("hidden"),W(`${f} added to team ✓`,"success"),An(a,s)}catch(h){W(h.message,"error")}}),document.getElementById("np-cancel").addEventListener("click",()=>{d.classList.add("hidden"),l.classList.add("hidden")}),d.addEventListener("click",()=>{d.classList.add("hidden"),l.classList.add("hidden")})}let ke=null,ma="dashboard";function Zo(){const a=localStorage.getItem("ts_theme")||"light";document.documentElement.setAttribute("data-theme",a)}async function Ki(a){ma=a;const s=`#${a}`;location.hash!==s&&history.replaceState(null,"",s);const d=document.getElementById("page-container");if(d.innerHTML="",!ke)return;const l=ke.id;switch(a){case"dashboard":await Eo(d,l,ke,{navigateTo:f=>Mr(f),addToCart:fa});break;case"sales":await pa(d,l,ke);break;case"inventory":await xn(d,l,ke);break;case"credits":await St(d,l,ke);break;case"reports":await Go(d);break;case"settings":await $n(d,l,ke,{onLock:()=>{ke=null,sessionStorage.removeItem("ts_profileId"),ra()}});break;case"admin":await An(d,ke);break}}function ji(){Zo(),Tn(),po(1e4),co(a=>{ke=a,sessionStorage.setItem("ts_profileId",a.id),lo(f=>Ki(f)),uo(a),ko(),bo(3e4);const s=location.hash.replace("#","")||"dashboard",l=["dashboard","sales","inventory","credits","reports","settings","admin"].includes(s)?s:"dashboard";Ki(l)}),document.getElementById("lock-btn").addEventListener("click",()=>{ke=null,sessionStorage.removeItem("ts_profileId"),ra()}),window.addEventListener("hashchange",()=>{if(!ke)return;const a=location.hash.replace("#","")||"dashboard";a!==ma&&Mr(a)}),"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(a=>console.log("SW registered:",a.scope)).catch(a=>console.log("SW registration failed:",a))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ji):ji();
