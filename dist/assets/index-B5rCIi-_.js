(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Bx(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var _0={exports:{}},Uc={},x0={exports:{}},$e={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pa=Symbol.for("react.element"),Hx=Symbol.for("react.portal"),Vx=Symbol.for("react.fragment"),Gx=Symbol.for("react.strict_mode"),Wx=Symbol.for("react.profiler"),Xx=Symbol.for("react.provider"),jx=Symbol.for("react.context"),qx=Symbol.for("react.forward_ref"),Yx=Symbol.for("react.suspense"),$x=Symbol.for("react.memo"),Kx=Symbol.for("react.lazy"),Up=Symbol.iterator;function Zx(n){return n===null||typeof n!="object"?null:(n=Up&&n[Up]||n["@@iterator"],typeof n=="function"?n:null)}var y0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S0=Object.assign,M0={};function go(n,e,t){this.props=n,this.context=e,this.refs=M0,this.updater=t||y0}go.prototype.isReactComponent={};go.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};go.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function E0(){}E0.prototype=go.prototype;function cf(n,e,t){this.props=n,this.context=e,this.refs=M0,this.updater=t||y0}var uf=cf.prototype=new E0;uf.constructor=cf;S0(uf,go.prototype);uf.isPureReactComponent=!0;var Fp=Array.isArray,w0=Object.prototype.hasOwnProperty,hf={current:null},T0={key:!0,ref:!0,__self:!0,__source:!0};function A0(n,e,t){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)w0.call(e,i)&&!T0.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Pa,type:n,key:s,ref:o,props:r,_owner:hf.current}}function Jx(n,e){return{$$typeof:Pa,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function df(n){return typeof n=="object"&&n!==null&&n.$$typeof===Pa}function Qx(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var Op=/\/+/g;function lu(n,e){return typeof n=="object"&&n!==null&&n.key!=null?Qx(""+n.key):e.toString(36)}function kl(n,e,t,i,r){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case Pa:case Hx:o=!0}}if(o)return o=n,r=r(o),n=i===""?"."+lu(o,0):i,Fp(r)?(t="",n!=null&&(t=n.replace(Op,"$&/")+"/"),kl(r,e,t,"",function(c){return c})):r!=null&&(df(r)&&(r=Jx(r,t+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Op,"$&/")+"/")+n)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Fp(n))for(var a=0;a<n.length;a++){s=n[a];var l=i+lu(s,a);o+=kl(s,e,t,l,r)}else if(l=Zx(n),typeof l=="function")for(n=l.call(n),a=0;!(s=n.next()).done;)s=s.value,l=i+lu(s,a++),o+=kl(s,e,t,l,r);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Va(n,e,t){if(n==null)return n;var i=[],r=0;return kl(n,i,"","",function(s){return e.call(t,s,r++)}),i}function ey(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var an={current:null},Bl={transition:null},ty={ReactCurrentDispatcher:an,ReactCurrentBatchConfig:Bl,ReactCurrentOwner:hf};function C0(){throw Error("act(...) is not supported in production builds of React.")}$e.Children={map:Va,forEach:function(n,e,t){Va(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return Va(n,function(){e++}),e},toArray:function(n){return Va(n,function(e){return e})||[]},only:function(n){if(!df(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};$e.Component=go;$e.Fragment=Vx;$e.Profiler=Wx;$e.PureComponent=cf;$e.StrictMode=Gx;$e.Suspense=Yx;$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ty;$e.act=C0;$e.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var i=S0({},n.props),r=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=hf.current),e.key!==void 0&&(r=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in e)w0.call(e,l)&&!T0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=t;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Pa,type:n.type,key:r,ref:s,props:i,_owner:o}};$e.createContext=function(n){return n={$$typeof:jx,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:Xx,_context:n},n.Consumer=n};$e.createElement=A0;$e.createFactory=function(n){var e=A0.bind(null,n);return e.type=n,e};$e.createRef=function(){return{current:null}};$e.forwardRef=function(n){return{$$typeof:qx,render:n}};$e.isValidElement=df;$e.lazy=function(n){return{$$typeof:Kx,_payload:{_status:-1,_result:n},_init:ey}};$e.memo=function(n,e){return{$$typeof:$x,type:n,compare:e===void 0?null:e}};$e.startTransition=function(n){var e=Bl.transition;Bl.transition={};try{n()}finally{Bl.transition=e}};$e.unstable_act=C0;$e.useCallback=function(n,e){return an.current.useCallback(n,e)};$e.useContext=function(n){return an.current.useContext(n)};$e.useDebugValue=function(){};$e.useDeferredValue=function(n){return an.current.useDeferredValue(n)};$e.useEffect=function(n,e){return an.current.useEffect(n,e)};$e.useId=function(){return an.current.useId()};$e.useImperativeHandle=function(n,e,t){return an.current.useImperativeHandle(n,e,t)};$e.useInsertionEffect=function(n,e){return an.current.useInsertionEffect(n,e)};$e.useLayoutEffect=function(n,e){return an.current.useLayoutEffect(n,e)};$e.useMemo=function(n,e){return an.current.useMemo(n,e)};$e.useReducer=function(n,e,t){return an.current.useReducer(n,e,t)};$e.useRef=function(n){return an.current.useRef(n)};$e.useState=function(n){return an.current.useState(n)};$e.useSyncExternalStore=function(n,e,t){return an.current.useSyncExternalStore(n,e,t)};$e.useTransition=function(){return an.current.useTransition()};$e.version="18.3.1";x0.exports=$e;var _t=x0.exports;const ny=Bx(_t);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iy=_t,ry=Symbol.for("react.element"),sy=Symbol.for("react.fragment"),oy=Object.prototype.hasOwnProperty,ay=iy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ly={key:!0,ref:!0,__self:!0,__source:!0};function R0(n,e,t){var i,r={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)oy.call(e,i)&&!ly.hasOwnProperty(i)&&(r[i]=e[i]);if(n&&n.defaultProps)for(i in e=n.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:ry,type:n,key:s,ref:o,props:r,_owner:ay.current}}Uc.Fragment=sy;Uc.jsx=R0;Uc.jsxs=R0;_0.exports=Uc;var G=_0.exports,b0={exports:{}},bn={},P0={exports:{}},L0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(I,U){var j=I.length;I.push(U);e:for(;0<j;){var Q=j-1>>>1,ne=I[Q];if(0<r(ne,U))I[Q]=U,I[j]=ne,j=Q;else break e}}function t(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var U=I[0],j=I.pop();if(j!==U){I[0]=j;e:for(var Q=0,ne=I.length,Fe=ne>>>1;Q<Fe;){var K=2*(Q+1)-1,oe=I[K],me=K+1,he=I[me];if(0>r(oe,j))me<ne&&0>r(he,oe)?(I[Q]=he,I[me]=j,Q=me):(I[Q]=oe,I[K]=j,Q=K);else if(me<ne&&0>r(he,j))I[Q]=he,I[me]=j,Q=me;else break e}}return U}function r(I,U){var j=I.sortIndex-U.sortIndex;return j!==0?j:I.id-U.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();n.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,d=null,h=3,p=!1,g=!1,_=!1,m=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(I){for(var U=t(c);U!==null;){if(U.callback===null)i(c);else if(U.startTime<=I)i(c),U.sortIndex=U.expirationTime,e(l,U);else break;U=t(c)}}function S(I){if(_=!1,x(I),!g)if(t(l)!==null)g=!0,D(R);else{var U=t(c);U!==null&&$(S,U.startTime-I)}}function R(I,U){g=!1,_&&(_=!1,f(P),P=-1),p=!0;var j=h;try{for(x(U),d=t(l);d!==null&&(!(d.expirationTime>U)||I&&!M());){var Q=d.callback;if(typeof Q=="function"){d.callback=null,h=d.priorityLevel;var ne=Q(d.expirationTime<=U);U=n.unstable_now(),typeof ne=="function"?d.callback=ne:d===t(l)&&i(l),x(U)}else i(l);d=t(l)}if(d!==null)var Fe=!0;else{var K=t(c);K!==null&&$(S,K.startTime-U),Fe=!1}return Fe}finally{d=null,h=j,p=!1}}var A=!1,w=null,P=-1,W=5,y=-1;function M(){return!(n.unstable_now()-y<W)}function B(){if(w!==null){var I=n.unstable_now();y=I;var U=!0;try{U=w(!0,I)}finally{U?N():(A=!1,w=null)}}else A=!1}var N;if(typeof v=="function")N=function(){v(B)};else if(typeof MessageChannel<"u"){var F=new MessageChannel,O=F.port2;F.port1.onmessage=B,N=function(){O.postMessage(null)}}else N=function(){m(B,0)};function D(I){w=I,A||(A=!0,N())}function $(I,U){P=m(function(){I(n.unstable_now())},U)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(I){I.callback=null},n.unstable_continueExecution=function(){g||p||(g=!0,D(R))},n.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):W=0<I?Math.floor(1e3/I):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(I){switch(h){case 1:case 2:case 3:var U=3;break;default:U=h}var j=h;h=U;try{return I()}finally{h=j}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(I,U){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var j=h;h=I;try{return U()}finally{h=j}},n.unstable_scheduleCallback=function(I,U,j){var Q=n.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?Q+j:Q):j=Q,I){case 1:var ne=-1;break;case 2:ne=250;break;case 5:ne=1073741823;break;case 4:ne=1e4;break;default:ne=5e3}return ne=j+ne,I={id:u++,callback:U,priorityLevel:I,startTime:j,expirationTime:ne,sortIndex:-1},j>Q?(I.sortIndex=j,e(c,I),t(l)===null&&I===t(c)&&(_?(f(P),P=-1):_=!0,$(S,j-Q))):(I.sortIndex=ne,e(l,I),g||p||(g=!0,D(R))),I},n.unstable_shouldYield=M,n.unstable_wrapCallback=function(I){var U=h;return function(){var j=h;h=U;try{return I.apply(this,arguments)}finally{h=j}}}})(L0);P0.exports=L0;var cy=P0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uy=_t,Rn=cy;function ae(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var N0=new Set,la={};function ls(n,e){no(n,e),no(n+"Capture",e)}function no(n,e){for(la[n]=e,n=0;n<e.length;n++)N0.add(e[n])}var Gi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Th=Object.prototype.hasOwnProperty,hy=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zp={},kp={};function dy(n){return Th.call(kp,n)?!0:Th.call(zp,n)?!1:hy.test(n)?kp[n]=!0:(zp[n]=!0,!1)}function fy(n,e,t,i){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function py(n,e,t,i){if(e===null||typeof e>"u"||fy(n,e,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ln(n,e,t,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var qt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){qt[n]=new ln(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];qt[e]=new ln(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){qt[n]=new ln(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){qt[n]=new ln(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){qt[n]=new ln(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){qt[n]=new ln(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){qt[n]=new ln(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){qt[n]=new ln(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){qt[n]=new ln(n,5,!1,n.toLowerCase(),null,!1,!1)});var ff=/[\-:]([a-z])/g;function pf(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(ff,pf);qt[e]=new ln(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(ff,pf);qt[e]=new ln(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(ff,pf);qt[e]=new ln(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){qt[n]=new ln(n,1,!1,n.toLowerCase(),null,!1,!1)});qt.xlinkHref=new ln("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){qt[n]=new ln(n,1,!1,n.toLowerCase(),null,!0,!0)});function mf(n,e,t,i){var r=qt.hasOwnProperty(e)?qt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(py(e,t,r,i)&&(t=null),i||r===null?dy(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):r.mustUseProperty?n[r.propertyName]=t===null?r.type===3?!1:"":t:(e=r.attributeName,i=r.attributeNamespace,t===null?n.removeAttribute(e):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,i?n.setAttributeNS(i,e,t):n.setAttribute(e,t))))}var Yi=uy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ga=Symbol.for("react.element"),Ls=Symbol.for("react.portal"),Ns=Symbol.for("react.fragment"),gf=Symbol.for("react.strict_mode"),Ah=Symbol.for("react.profiler"),I0=Symbol.for("react.provider"),D0=Symbol.for("react.context"),vf=Symbol.for("react.forward_ref"),Ch=Symbol.for("react.suspense"),Rh=Symbol.for("react.suspense_list"),_f=Symbol.for("react.memo"),sr=Symbol.for("react.lazy"),U0=Symbol.for("react.offscreen"),Bp=Symbol.iterator;function Mo(n){return n===null||typeof n!="object"?null:(n=Bp&&n[Bp]||n["@@iterator"],typeof n=="function"?n:null)}var wt=Object.assign,cu;function Go(n){if(cu===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);cu=e&&e[1]||""}return`
`+cu+n}var uu=!1;function hu(n,e){if(!n||uu)return"";uu=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){i=c}n.call(e.prototype)}else{try{throw Error()}catch(c){i=c}n()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=o&&0<=a);break}}}finally{uu=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?Go(n):""}function my(n){switch(n.tag){case 5:return Go(n.type);case 16:return Go("Lazy");case 13:return Go("Suspense");case 19:return Go("SuspenseList");case 0:case 2:case 15:return n=hu(n.type,!1),n;case 11:return n=hu(n.type.render,!1),n;case 1:return n=hu(n.type,!0),n;default:return""}}function bh(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case Ns:return"Fragment";case Ls:return"Portal";case Ah:return"Profiler";case gf:return"StrictMode";case Ch:return"Suspense";case Rh:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case D0:return(n.displayName||"Context")+".Consumer";case I0:return(n._context.displayName||"Context")+".Provider";case vf:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case _f:return e=n.displayName||null,e!==null?e:bh(n.type)||"Memo";case sr:e=n._payload,n=n._init;try{return bh(n(e))}catch{}}return null}function gy(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return bh(e);case 8:return e===gf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Mr(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function F0(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function vy(n){var e=F0(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Wa(n){n._valueTracker||(n._valueTracker=vy(n))}function O0(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=F0(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function sc(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Ph(n,e){var t=e.checked;return wt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function Hp(n,e){var t=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;t=Mr(e.value!=null?e.value:t),n._wrapperState={initialChecked:i,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function z0(n,e){e=e.checked,e!=null&&mf(n,"checked",e,!1)}function Lh(n,e){z0(n,e);var t=Mr(e.value),i=e.type;if(t!=null)i==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(i==="submit"||i==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?Nh(n,e.type,t):e.hasOwnProperty("defaultValue")&&Nh(n,e.type,Mr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function Vp(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function Nh(n,e,t){(e!=="number"||sc(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var Wo=Array.isArray;function js(n,e,t,i){if(n=n.options,e){e={};for(var r=0;r<t.length;r++)e["$"+t[r]]=!0;for(t=0;t<n.length;t++)r=e.hasOwnProperty("$"+n[t].value),n[t].selected!==r&&(n[t].selected=r),r&&i&&(n[t].defaultSelected=!0)}else{for(t=""+Mr(t),e=null,r=0;r<n.length;r++){if(n[r].value===t){n[r].selected=!0,i&&(n[r].defaultSelected=!0);return}e!==null||n[r].disabled||(e=n[r])}e!==null&&(e.selected=!0)}}function Ih(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ae(91));return wt({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Gp(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(ae(92));if(Wo(t)){if(1<t.length)throw Error(ae(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:Mr(t)}}function k0(n,e){var t=Mr(e.value),i=Mr(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),i!=null&&(n.defaultValue=""+i)}function Wp(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function B0(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Dh(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?B0(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Xa,H0=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,i,r){MSApp.execUnsafeLocalFunction(function(){return n(e,t,i,r)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(Xa=Xa||document.createElement("div"),Xa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Xa.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function ca(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var $o={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_y=["Webkit","ms","Moz","O"];Object.keys($o).forEach(function(n){_y.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),$o[e]=$o[n]})});function V0(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||$o.hasOwnProperty(n)&&$o[n]?(""+e).trim():e+"px"}function G0(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var i=t.indexOf("--")===0,r=V0(t,e[t],i);t==="float"&&(t="cssFloat"),i?n.setProperty(t,r):n[t]=r}}var xy=wt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Uh(n,e){if(e){if(xy[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ae(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ae(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ae(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ae(62))}}function Fh(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Oh=null;function xf(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var zh=null,qs=null,Ys=null;function Xp(n){if(n=Ia(n)){if(typeof zh!="function")throw Error(ae(280));var e=n.stateNode;e&&(e=Bc(e),zh(n.stateNode,n.type,e))}}function W0(n){qs?Ys?Ys.push(n):Ys=[n]:qs=n}function X0(){if(qs){var n=qs,e=Ys;if(Ys=qs=null,Xp(n),e)for(n=0;n<e.length;n++)Xp(e[n])}}function j0(n,e){return n(e)}function q0(){}var du=!1;function Y0(n,e,t){if(du)return n(e,t);du=!0;try{return j0(n,e,t)}finally{du=!1,(qs!==null||Ys!==null)&&(q0(),X0())}}function ua(n,e){var t=n.stateNode;if(t===null)return null;var i=Bc(t);if(i===null)return null;t=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(ae(231,e,typeof t));return t}var kh=!1;if(Gi)try{var Eo={};Object.defineProperty(Eo,"passive",{get:function(){kh=!0}}),window.addEventListener("test",Eo,Eo),window.removeEventListener("test",Eo,Eo)}catch{kh=!1}function yy(n,e,t,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(t,c)}catch(u){this.onError(u)}}var Ko=!1,oc=null,ac=!1,Bh=null,Sy={onError:function(n){Ko=!0,oc=n}};function My(n,e,t,i,r,s,o,a,l){Ko=!1,oc=null,yy.apply(Sy,arguments)}function Ey(n,e,t,i,r,s,o,a,l){if(My.apply(this,arguments),Ko){if(Ko){var c=oc;Ko=!1,oc=null}else throw Error(ae(198));ac||(ac=!0,Bh=c)}}function cs(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function $0(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function jp(n){if(cs(n)!==n)throw Error(ae(188))}function wy(n){var e=n.alternate;if(!e){if(e=cs(n),e===null)throw Error(ae(188));return e!==n?null:n}for(var t=n,i=e;;){var r=t.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){t=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===t)return jp(r),n;if(s===i)return jp(r),e;s=s.sibling}throw Error(ae(188))}if(t.return!==i.return)t=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===t){o=!0,t=r,i=s;break}if(a===i){o=!0,i=r,t=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===t){o=!0,t=s,i=r;break}if(a===i){o=!0,i=s,t=r;break}a=a.sibling}if(!o)throw Error(ae(189))}}if(t.alternate!==i)throw Error(ae(190))}if(t.tag!==3)throw Error(ae(188));return t.stateNode.current===t?n:e}function K0(n){return n=wy(n),n!==null?Z0(n):null}function Z0(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=Z0(n);if(e!==null)return e;n=n.sibling}return null}var J0=Rn.unstable_scheduleCallback,qp=Rn.unstable_cancelCallback,Ty=Rn.unstable_shouldYield,Ay=Rn.unstable_requestPaint,bt=Rn.unstable_now,Cy=Rn.unstable_getCurrentPriorityLevel,yf=Rn.unstable_ImmediatePriority,Q0=Rn.unstable_UserBlockingPriority,lc=Rn.unstable_NormalPriority,Ry=Rn.unstable_LowPriority,ev=Rn.unstable_IdlePriority,Fc=null,gi=null;function by(n){if(gi&&typeof gi.onCommitFiberRoot=="function")try{gi.onCommitFiberRoot(Fc,n,void 0,(n.current.flags&128)===128)}catch{}}var ri=Math.clz32?Math.clz32:Ny,Py=Math.log,Ly=Math.LN2;function Ny(n){return n>>>=0,n===0?32:31-(Py(n)/Ly|0)|0}var ja=64,qa=4194304;function Xo(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function cc(n,e){var t=n.pendingLanes;if(t===0)return 0;var i=0,r=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var a=o&~r;a!==0?i=Xo(a):(s&=o,s!==0&&(i=Xo(s)))}else o=t&~r,o!==0?i=Xo(o):s!==0&&(i=Xo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=i;0<e;)t=31-ri(e),r=1<<t,i|=n[t],e&=~r;return i}function Iy(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Dy(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,r=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-ri(s),a=1<<o,l=r[o];l===-1?(!(a&t)||a&i)&&(r[o]=Iy(a,e)):l<=e&&(n.expiredLanes|=a),s&=~a}}function Hh(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function tv(){var n=ja;return ja<<=1,!(ja&4194240)&&(ja=64),n}function fu(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function La(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-ri(e),n[e]=t}function Uy(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var i=n.eventTimes;for(n=n.expirationTimes;0<t;){var r=31-ri(t),s=1<<r;e[r]=0,i[r]=-1,n[r]=-1,t&=~s}}function Sf(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-ri(t),r=1<<i;r&e|n[i]&e&&(n[i]|=e),t&=~r}}var ct=0;function nv(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var iv,Mf,rv,sv,ov,Vh=!1,Ya=[],dr=null,fr=null,pr=null,ha=new Map,da=new Map,ar=[],Fy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Yp(n,e){switch(n){case"focusin":case"focusout":dr=null;break;case"dragenter":case"dragleave":fr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":ha.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":da.delete(e.pointerId)}}function wo(n,e,t,i,r,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Ia(e),e!==null&&Mf(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),n)}function Oy(n,e,t,i,r){switch(e){case"focusin":return dr=wo(dr,n,e,t,i,r),!0;case"dragenter":return fr=wo(fr,n,e,t,i,r),!0;case"mouseover":return pr=wo(pr,n,e,t,i,r),!0;case"pointerover":var s=r.pointerId;return ha.set(s,wo(ha.get(s)||null,n,e,t,i,r)),!0;case"gotpointercapture":return s=r.pointerId,da.set(s,wo(da.get(s)||null,n,e,t,i,r)),!0}return!1}function av(n){var e=qr(n.target);if(e!==null){var t=cs(e);if(t!==null){if(e=t.tag,e===13){if(e=$0(t),e!==null){n.blockedOn=e,ov(n.priority,function(){rv(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Hl(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=Gh(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);Oh=i,t.target.dispatchEvent(i),Oh=null}else return e=Ia(t),e!==null&&Mf(e),n.blockedOn=t,!1;e.shift()}return!0}function $p(n,e,t){Hl(n)&&t.delete(e)}function zy(){Vh=!1,dr!==null&&Hl(dr)&&(dr=null),fr!==null&&Hl(fr)&&(fr=null),pr!==null&&Hl(pr)&&(pr=null),ha.forEach($p),da.forEach($p)}function To(n,e){n.blockedOn===e&&(n.blockedOn=null,Vh||(Vh=!0,Rn.unstable_scheduleCallback(Rn.unstable_NormalPriority,zy)))}function fa(n){function e(r){return To(r,n)}if(0<Ya.length){To(Ya[0],n);for(var t=1;t<Ya.length;t++){var i=Ya[t];i.blockedOn===n&&(i.blockedOn=null)}}for(dr!==null&&To(dr,n),fr!==null&&To(fr,n),pr!==null&&To(pr,n),ha.forEach(e),da.forEach(e),t=0;t<ar.length;t++)i=ar[t],i.blockedOn===n&&(i.blockedOn=null);for(;0<ar.length&&(t=ar[0],t.blockedOn===null);)av(t),t.blockedOn===null&&ar.shift()}var $s=Yi.ReactCurrentBatchConfig,uc=!0;function ky(n,e,t,i){var r=ct,s=$s.transition;$s.transition=null;try{ct=1,Ef(n,e,t,i)}finally{ct=r,$s.transition=s}}function By(n,e,t,i){var r=ct,s=$s.transition;$s.transition=null;try{ct=4,Ef(n,e,t,i)}finally{ct=r,$s.transition=s}}function Ef(n,e,t,i){if(uc){var r=Gh(n,e,t,i);if(r===null)Eu(n,e,i,hc,t),Yp(n,i);else if(Oy(r,n,e,t,i))i.stopPropagation();else if(Yp(n,i),e&4&&-1<Fy.indexOf(n)){for(;r!==null;){var s=Ia(r);if(s!==null&&iv(s),s=Gh(n,e,t,i),s===null&&Eu(n,e,i,hc,t),s===r)break;r=s}r!==null&&i.stopPropagation()}else Eu(n,e,i,null,t)}}var hc=null;function Gh(n,e,t,i){if(hc=null,n=xf(i),n=qr(n),n!==null)if(e=cs(n),e===null)n=null;else if(t=e.tag,t===13){if(n=$0(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return hc=n,null}function lv(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Cy()){case yf:return 1;case Q0:return 4;case lc:case Ry:return 16;case ev:return 536870912;default:return 16}default:return 16}}var ur=null,wf=null,Vl=null;function cv(){if(Vl)return Vl;var n,e=wf,t=e.length,i,r="value"in ur?ur.value:ur.textContent,s=r.length;for(n=0;n<t&&e[n]===r[n];n++);var o=t-n;for(i=1;i<=o&&e[t-i]===r[s-i];i++);return Vl=r.slice(n,1<i?1-i:void 0)}function Gl(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function $a(){return!0}function Kp(){return!1}function Pn(n){function e(t,i,r,s,o){this._reactName=t,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?$a:Kp,this.isPropagationStopped=Kp,this}return wt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=$a)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=$a)},persist:function(){},isPersistent:$a}),e}var vo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Tf=Pn(vo),Na=wt({},vo,{view:0,detail:0}),Hy=Pn(Na),pu,mu,Ao,Oc=wt({},Na,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Af,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Ao&&(Ao&&n.type==="mousemove"?(pu=n.screenX-Ao.screenX,mu=n.screenY-Ao.screenY):mu=pu=0,Ao=n),pu)},movementY:function(n){return"movementY"in n?n.movementY:mu}}),Zp=Pn(Oc),Vy=wt({},Oc,{dataTransfer:0}),Gy=Pn(Vy),Wy=wt({},Na,{relatedTarget:0}),gu=Pn(Wy),Xy=wt({},vo,{animationName:0,elapsedTime:0,pseudoElement:0}),jy=Pn(Xy),qy=wt({},vo,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),Yy=Pn(qy),$y=wt({},vo,{data:0}),Jp=Pn($y),Ky={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Zy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Jy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Qy(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=Jy[n])?!!e[n]:!1}function Af(){return Qy}var eS=wt({},Na,{key:function(n){if(n.key){var e=Ky[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Gl(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?Zy[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Af,charCode:function(n){return n.type==="keypress"?Gl(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Gl(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),tS=Pn(eS),nS=wt({},Oc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qp=Pn(nS),iS=wt({},Na,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Af}),rS=Pn(iS),sS=wt({},vo,{propertyName:0,elapsedTime:0,pseudoElement:0}),oS=Pn(sS),aS=wt({},Oc,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),lS=Pn(aS),cS=[9,13,27,32],Cf=Gi&&"CompositionEvent"in window,Zo=null;Gi&&"documentMode"in document&&(Zo=document.documentMode);var uS=Gi&&"TextEvent"in window&&!Zo,uv=Gi&&(!Cf||Zo&&8<Zo&&11>=Zo),em=" ",tm=!1;function hv(n,e){switch(n){case"keyup":return cS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function dv(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Is=!1;function hS(n,e){switch(n){case"compositionend":return dv(e);case"keypress":return e.which!==32?null:(tm=!0,em);case"textInput":return n=e.data,n===em&&tm?null:n;default:return null}}function dS(n,e){if(Is)return n==="compositionend"||!Cf&&hv(n,e)?(n=cv(),Vl=wf=ur=null,Is=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return uv&&e.locale!=="ko"?null:e.data;default:return null}}var fS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function nm(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!fS[n.type]:e==="textarea"}function fv(n,e,t,i){W0(i),e=dc(e,"onChange"),0<e.length&&(t=new Tf("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var Jo=null,pa=null;function pS(n){wv(n,0)}function zc(n){var e=Fs(n);if(O0(e))return n}function mS(n,e){if(n==="change")return e}var pv=!1;if(Gi){var vu;if(Gi){var _u="oninput"in document;if(!_u){var im=document.createElement("div");im.setAttribute("oninput","return;"),_u=typeof im.oninput=="function"}vu=_u}else vu=!1;pv=vu&&(!document.documentMode||9<document.documentMode)}function rm(){Jo&&(Jo.detachEvent("onpropertychange",mv),pa=Jo=null)}function mv(n){if(n.propertyName==="value"&&zc(pa)){var e=[];fv(e,pa,n,xf(n)),Y0(pS,e)}}function gS(n,e,t){n==="focusin"?(rm(),Jo=e,pa=t,Jo.attachEvent("onpropertychange",mv)):n==="focusout"&&rm()}function vS(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return zc(pa)}function _S(n,e){if(n==="click")return zc(e)}function xS(n,e){if(n==="input"||n==="change")return zc(e)}function yS(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var oi=typeof Object.is=="function"?Object.is:yS;function ma(n,e){if(oi(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var r=t[i];if(!Th.call(e,r)||!oi(n[r],e[r]))return!1}return!0}function sm(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function om(n,e){var t=sm(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=sm(t)}}function gv(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?gv(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function vv(){for(var n=window,e=sc();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=sc(n.document)}return e}function Rf(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function SS(n){var e=vv(),t=n.focusedElem,i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&gv(t.ownerDocument.documentElement,t)){if(i!==null&&Rf(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var r=t.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!n.extend&&s>i&&(r=i,i=s,s=r),r=om(t,s);var o=om(t,i);r&&o&&(n.rangeCount!==1||n.anchorNode!==r.node||n.anchorOffset!==r.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),n.removeAllRanges(),s>i?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var MS=Gi&&"documentMode"in document&&11>=document.documentMode,Ds=null,Wh=null,Qo=null,Xh=!1;function am(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Xh||Ds==null||Ds!==sc(i)||(i=Ds,"selectionStart"in i&&Rf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Qo&&ma(Qo,i)||(Qo=i,i=dc(Wh,"onSelect"),0<i.length&&(e=new Tf("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=Ds)))}function Ka(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var Us={animationend:Ka("Animation","AnimationEnd"),animationiteration:Ka("Animation","AnimationIteration"),animationstart:Ka("Animation","AnimationStart"),transitionend:Ka("Transition","TransitionEnd")},xu={},_v={};Gi&&(_v=document.createElement("div").style,"AnimationEvent"in window||(delete Us.animationend.animation,delete Us.animationiteration.animation,delete Us.animationstart.animation),"TransitionEvent"in window||delete Us.transitionend.transition);function kc(n){if(xu[n])return xu[n];if(!Us[n])return n;var e=Us[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in _v)return xu[n]=e[t];return n}var xv=kc("animationend"),yv=kc("animationiteration"),Sv=kc("animationstart"),Mv=kc("transitionend"),Ev=new Map,lm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ar(n,e){Ev.set(n,e),ls(e,[n])}for(var yu=0;yu<lm.length;yu++){var Su=lm[yu],ES=Su.toLowerCase(),wS=Su[0].toUpperCase()+Su.slice(1);Ar(ES,"on"+wS)}Ar(xv,"onAnimationEnd");Ar(yv,"onAnimationIteration");Ar(Sv,"onAnimationStart");Ar("dblclick","onDoubleClick");Ar("focusin","onFocus");Ar("focusout","onBlur");Ar(Mv,"onTransitionEnd");no("onMouseEnter",["mouseout","mouseover"]);no("onMouseLeave",["mouseout","mouseover"]);no("onPointerEnter",["pointerout","pointerover"]);no("onPointerLeave",["pointerout","pointerover"]);ls("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ls("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ls("onBeforeInput",["compositionend","keypress","textInput","paste"]);ls("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ls("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ls("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var jo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),TS=new Set("cancel close invalid load scroll toggle".split(" ").concat(jo));function cm(n,e,t){var i=n.type||"unknown-event";n.currentTarget=t,Ey(i,e,void 0,n),n.currentTarget=null}function wv(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;cm(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;cm(r,a,c),s=l}}}if(ac)throw n=Bh,ac=!1,Bh=null,n}function mt(n,e){var t=e[Kh];t===void 0&&(t=e[Kh]=new Set);var i=n+"__bubble";t.has(i)||(Tv(e,n,2,!1),t.add(i))}function Mu(n,e,t){var i=0;e&&(i|=4),Tv(t,n,i,e)}var Za="_reactListening"+Math.random().toString(36).slice(2);function ga(n){if(!n[Za]){n[Za]=!0,N0.forEach(function(t){t!=="selectionchange"&&(TS.has(t)||Mu(t,!1,n),Mu(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Za]||(e[Za]=!0,Mu("selectionchange",!1,e))}}function Tv(n,e,t,i){switch(lv(e)){case 1:var r=ky;break;case 4:r=By;break;default:r=Ef}t=r.bind(null,e,t,n),r=void 0,!kh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?n.addEventListener(e,t,{capture:!0,passive:r}):n.addEventListener(e,t,!0):r!==void 0?n.addEventListener(e,t,{passive:r}):n.addEventListener(e,t,!1)}function Eu(n,e,t,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=qr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Y0(function(){var c=s,u=xf(t),d=[];e:{var h=Ev.get(n);if(h!==void 0){var p=Tf,g=n;switch(n){case"keypress":if(Gl(t)===0)break e;case"keydown":case"keyup":p=tS;break;case"focusin":g="focus",p=gu;break;case"focusout":g="blur",p=gu;break;case"beforeblur":case"afterblur":p=gu;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Zp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Gy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=rS;break;case xv:case yv:case Sv:p=jy;break;case Mv:p=oS;break;case"scroll":p=Hy;break;case"wheel":p=lS;break;case"copy":case"cut":case"paste":p=Yy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Qp}var _=(e&4)!==0,m=!_&&n==="scroll",f=_?h!==null?h+"Capture":null:h;_=[];for(var v=c,x;v!==null;){x=v;var S=x.stateNode;if(x.tag===5&&S!==null&&(x=S,f!==null&&(S=ua(v,f),S!=null&&_.push(va(v,S,x)))),m)break;v=v.return}0<_.length&&(h=new p(h,g,null,t,u),d.push({event:h,listeners:_}))}}if(!(e&7)){e:{if(h=n==="mouseover"||n==="pointerover",p=n==="mouseout"||n==="pointerout",h&&t!==Oh&&(g=t.relatedTarget||t.fromElement)&&(qr(g)||g[Wi]))break e;if((p||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,p?(g=t.relatedTarget||t.toElement,p=c,g=g?qr(g):null,g!==null&&(m=cs(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=c),p!==g)){if(_=Zp,S="onMouseLeave",f="onMouseEnter",v="mouse",(n==="pointerout"||n==="pointerover")&&(_=Qp,S="onPointerLeave",f="onPointerEnter",v="pointer"),m=p==null?h:Fs(p),x=g==null?h:Fs(g),h=new _(S,v+"leave",p,t,u),h.target=m,h.relatedTarget=x,S=null,qr(u)===c&&(_=new _(f,v+"enter",g,t,u),_.target=x,_.relatedTarget=m,S=_),m=S,p&&g)t:{for(_=p,f=g,v=0,x=_;x;x=hs(x))v++;for(x=0,S=f;S;S=hs(S))x++;for(;0<v-x;)_=hs(_),v--;for(;0<x-v;)f=hs(f),x--;for(;v--;){if(_===f||f!==null&&_===f.alternate)break t;_=hs(_),f=hs(f)}_=null}else _=null;p!==null&&um(d,h,p,_,!1),g!==null&&m!==null&&um(d,m,g,_,!0)}}e:{if(h=c?Fs(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var R=mS;else if(nm(h))if(pv)R=xS;else{R=vS;var A=gS}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(R=_S);if(R&&(R=R(n,c))){fv(d,R,t,u);break e}A&&A(n,h,c),n==="focusout"&&(A=h._wrapperState)&&A.controlled&&h.type==="number"&&Nh(h,"number",h.value)}switch(A=c?Fs(c):window,n){case"focusin":(nm(A)||A.contentEditable==="true")&&(Ds=A,Wh=c,Qo=null);break;case"focusout":Qo=Wh=Ds=null;break;case"mousedown":Xh=!0;break;case"contextmenu":case"mouseup":case"dragend":Xh=!1,am(d,t,u);break;case"selectionchange":if(MS)break;case"keydown":case"keyup":am(d,t,u)}var w;if(Cf)e:{switch(n){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Is?hv(n,t)&&(P="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(P="onCompositionStart");P&&(uv&&t.locale!=="ko"&&(Is||P!=="onCompositionStart"?P==="onCompositionEnd"&&Is&&(w=cv()):(ur=u,wf="value"in ur?ur.value:ur.textContent,Is=!0)),A=dc(c,P),0<A.length&&(P=new Jp(P,n,null,t,u),d.push({event:P,listeners:A}),w?P.data=w:(w=dv(t),w!==null&&(P.data=w)))),(w=uS?hS(n,t):dS(n,t))&&(c=dc(c,"onBeforeInput"),0<c.length&&(u=new Jp("onBeforeInput","beforeinput",null,t,u),d.push({event:u,listeners:c}),u.data=w))}wv(d,e)})}function va(n,e,t){return{instance:n,listener:e,currentTarget:t}}function dc(n,e){for(var t=e+"Capture",i=[];n!==null;){var r=n,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ua(n,t),s!=null&&i.unshift(va(n,s,r)),s=ua(n,e),s!=null&&i.push(va(n,s,r))),n=n.return}return i}function hs(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function um(n,e,t,i,r){for(var s=e._reactName,o=[];t!==null&&t!==i;){var a=t,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=ua(t,s),l!=null&&o.unshift(va(t,l,a))):r||(l=ua(t,s),l!=null&&o.push(va(t,l,a)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var AS=/\r\n?/g,CS=/\u0000|\uFFFD/g;function hm(n){return(typeof n=="string"?n:""+n).replace(AS,`
`).replace(CS,"")}function Ja(n,e,t){if(e=hm(e),hm(n)!==e&&t)throw Error(ae(425))}function fc(){}var jh=null,qh=null;function Yh(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var $h=typeof setTimeout=="function"?setTimeout:void 0,RS=typeof clearTimeout=="function"?clearTimeout:void 0,dm=typeof Promise=="function"?Promise:void 0,bS=typeof queueMicrotask=="function"?queueMicrotask:typeof dm<"u"?function(n){return dm.resolve(null).then(n).catch(PS)}:$h;function PS(n){setTimeout(function(){throw n})}function wu(n,e){var t=e,i=0;do{var r=t.nextSibling;if(n.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(i===0){n.removeChild(r),fa(e);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=r}while(t);fa(e)}function mr(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function fm(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var _o=Math.random().toString(36).slice(2),mi="__reactFiber$"+_o,_a="__reactProps$"+_o,Wi="__reactContainer$"+_o,Kh="__reactEvents$"+_o,LS="__reactListeners$"+_o,NS="__reactHandles$"+_o;function qr(n){var e=n[mi];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Wi]||t[mi]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=fm(n);n!==null;){if(t=n[mi])return t;n=fm(n)}return e}n=t,t=n.parentNode}return null}function Ia(n){return n=n[mi]||n[Wi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Fs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(ae(33))}function Bc(n){return n[_a]||null}var Zh=[],Os=-1;function Cr(n){return{current:n}}function vt(n){0>Os||(n.current=Zh[Os],Zh[Os]=null,Os--)}function dt(n,e){Os++,Zh[Os]=n.current,n.current=e}var Er={},en=Cr(Er),mn=Cr(!1),es=Er;function io(n,e){var t=n.type.contextTypes;if(!t)return Er;var i=n.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in t)r[s]=e[s];return i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=r),r}function gn(n){return n=n.childContextTypes,n!=null}function pc(){vt(mn),vt(en)}function pm(n,e,t){if(en.current!==Er)throw Error(ae(168));dt(en,e),dt(mn,t)}function Av(n,e,t){var i=n.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ae(108,gy(n)||"Unknown",r));return wt({},t,i)}function mc(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Er,es=en.current,dt(en,n),dt(mn,mn.current),!0}function mm(n,e,t){var i=n.stateNode;if(!i)throw Error(ae(169));t?(n=Av(n,e,es),i.__reactInternalMemoizedMergedChildContext=n,vt(mn),vt(en),dt(en,n)):vt(mn),dt(mn,t)}var Ui=null,Hc=!1,Tu=!1;function Cv(n){Ui===null?Ui=[n]:Ui.push(n)}function IS(n){Hc=!0,Cv(n)}function Rr(){if(!Tu&&Ui!==null){Tu=!0;var n=0,e=ct;try{var t=Ui;for(ct=1;n<t.length;n++){var i=t[n];do i=i(!0);while(i!==null)}Ui=null,Hc=!1}catch(r){throw Ui!==null&&(Ui=Ui.slice(n+1)),J0(yf,Rr),r}finally{ct=e,Tu=!1}}return null}var zs=[],ks=0,gc=null,vc=0,Un=[],Fn=0,ts=null,Oi=1,zi="";function zr(n,e){zs[ks++]=vc,zs[ks++]=gc,gc=n,vc=e}function Rv(n,e,t){Un[Fn++]=Oi,Un[Fn++]=zi,Un[Fn++]=ts,ts=n;var i=Oi;n=zi;var r=32-ri(i)-1;i&=~(1<<r),t+=1;var s=32-ri(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Oi=1<<32-ri(e)+r|t<<r|i,zi=s+n}else Oi=1<<s|t<<r|i,zi=n}function bf(n){n.return!==null&&(zr(n,1),Rv(n,1,0))}function Pf(n){for(;n===gc;)gc=zs[--ks],zs[ks]=null,vc=zs[--ks],zs[ks]=null;for(;n===ts;)ts=Un[--Fn],Un[Fn]=null,zi=Un[--Fn],Un[Fn]=null,Oi=Un[--Fn],Un[Fn]=null}var Cn=null,An=null,xt=!1,Qn=null;function bv(n,e){var t=On(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function gm(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,Cn=n,An=mr(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,Cn=n,An=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=ts!==null?{id:Oi,overflow:zi}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=On(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,Cn=n,An=null,!0):!1;default:return!1}}function Jh(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Qh(n){if(xt){var e=An;if(e){var t=e;if(!gm(n,e)){if(Jh(n))throw Error(ae(418));e=mr(t.nextSibling);var i=Cn;e&&gm(n,e)?bv(i,t):(n.flags=n.flags&-4097|2,xt=!1,Cn=n)}}else{if(Jh(n))throw Error(ae(418));n.flags=n.flags&-4097|2,xt=!1,Cn=n}}}function vm(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Cn=n}function Qa(n){if(n!==Cn)return!1;if(!xt)return vm(n),xt=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!Yh(n.type,n.memoizedProps)),e&&(e=An)){if(Jh(n))throw Pv(),Error(ae(418));for(;e;)bv(n,e),e=mr(e.nextSibling)}if(vm(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(ae(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){An=mr(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}An=null}}else An=Cn?mr(n.stateNode.nextSibling):null;return!0}function Pv(){for(var n=An;n;)n=mr(n.nextSibling)}function ro(){An=Cn=null,xt=!1}function Lf(n){Qn===null?Qn=[n]:Qn.push(n)}var DS=Yi.ReactCurrentBatchConfig;function Co(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(ae(309));var i=t.stateNode}if(!i)throw Error(ae(147,n));var r=i,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(ae(284));if(!t._owner)throw Error(ae(290,n))}return n}function el(n,e){throw n=Object.prototype.toString.call(e),Error(ae(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function _m(n){var e=n._init;return e(n._payload)}function Lv(n){function e(f,v){if(n){var x=f.deletions;x===null?(f.deletions=[v],f.flags|=16):x.push(v)}}function t(f,v){if(!n)return null;for(;v!==null;)e(f,v),v=v.sibling;return null}function i(f,v){for(f=new Map;v!==null;)v.key!==null?f.set(v.key,v):f.set(v.index,v),v=v.sibling;return f}function r(f,v){return f=xr(f,v),f.index=0,f.sibling=null,f}function s(f,v,x){return f.index=x,n?(x=f.alternate,x!==null?(x=x.index,x<v?(f.flags|=2,v):x):(f.flags|=2,v)):(f.flags|=1048576,v)}function o(f){return n&&f.alternate===null&&(f.flags|=2),f}function a(f,v,x,S){return v===null||v.tag!==6?(v=Nu(x,f.mode,S),v.return=f,v):(v=r(v,x),v.return=f,v)}function l(f,v,x,S){var R=x.type;return R===Ns?u(f,v,x.props.children,S,x.key):v!==null&&(v.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===sr&&_m(R)===v.type)?(S=r(v,x.props),S.ref=Co(f,v,x),S.return=f,S):(S=Kl(x.type,x.key,x.props,null,f.mode,S),S.ref=Co(f,v,x),S.return=f,S)}function c(f,v,x,S){return v===null||v.tag!==4||v.stateNode.containerInfo!==x.containerInfo||v.stateNode.implementation!==x.implementation?(v=Iu(x,f.mode,S),v.return=f,v):(v=r(v,x.children||[]),v.return=f,v)}function u(f,v,x,S,R){return v===null||v.tag!==7?(v=Qr(x,f.mode,S,R),v.return=f,v):(v=r(v,x),v.return=f,v)}function d(f,v,x){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Nu(""+v,f.mode,x),v.return=f,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ga:return x=Kl(v.type,v.key,v.props,null,f.mode,x),x.ref=Co(f,null,v),x.return=f,x;case Ls:return v=Iu(v,f.mode,x),v.return=f,v;case sr:var S=v._init;return d(f,S(v._payload),x)}if(Wo(v)||Mo(v))return v=Qr(v,f.mode,x,null),v.return=f,v;el(f,v)}return null}function h(f,v,x,S){var R=v!==null?v.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return R!==null?null:a(f,v,""+x,S);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ga:return x.key===R?l(f,v,x,S):null;case Ls:return x.key===R?c(f,v,x,S):null;case sr:return R=x._init,h(f,v,R(x._payload),S)}if(Wo(x)||Mo(x))return R!==null?null:u(f,v,x,S,null);el(f,x)}return null}function p(f,v,x,S,R){if(typeof S=="string"&&S!==""||typeof S=="number")return f=f.get(x)||null,a(v,f,""+S,R);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Ga:return f=f.get(S.key===null?x:S.key)||null,l(v,f,S,R);case Ls:return f=f.get(S.key===null?x:S.key)||null,c(v,f,S,R);case sr:var A=S._init;return p(f,v,x,A(S._payload),R)}if(Wo(S)||Mo(S))return f=f.get(x)||null,u(v,f,S,R,null);el(v,S)}return null}function g(f,v,x,S){for(var R=null,A=null,w=v,P=v=0,W=null;w!==null&&P<x.length;P++){w.index>P?(W=w,w=null):W=w.sibling;var y=h(f,w,x[P],S);if(y===null){w===null&&(w=W);break}n&&w&&y.alternate===null&&e(f,w),v=s(y,v,P),A===null?R=y:A.sibling=y,A=y,w=W}if(P===x.length)return t(f,w),xt&&zr(f,P),R;if(w===null){for(;P<x.length;P++)w=d(f,x[P],S),w!==null&&(v=s(w,v,P),A===null?R=w:A.sibling=w,A=w);return xt&&zr(f,P),R}for(w=i(f,w);P<x.length;P++)W=p(w,f,P,x[P],S),W!==null&&(n&&W.alternate!==null&&w.delete(W.key===null?P:W.key),v=s(W,v,P),A===null?R=W:A.sibling=W,A=W);return n&&w.forEach(function(M){return e(f,M)}),xt&&zr(f,P),R}function _(f,v,x,S){var R=Mo(x);if(typeof R!="function")throw Error(ae(150));if(x=R.call(x),x==null)throw Error(ae(151));for(var A=R=null,w=v,P=v=0,W=null,y=x.next();w!==null&&!y.done;P++,y=x.next()){w.index>P?(W=w,w=null):W=w.sibling;var M=h(f,w,y.value,S);if(M===null){w===null&&(w=W);break}n&&w&&M.alternate===null&&e(f,w),v=s(M,v,P),A===null?R=M:A.sibling=M,A=M,w=W}if(y.done)return t(f,w),xt&&zr(f,P),R;if(w===null){for(;!y.done;P++,y=x.next())y=d(f,y.value,S),y!==null&&(v=s(y,v,P),A===null?R=y:A.sibling=y,A=y);return xt&&zr(f,P),R}for(w=i(f,w);!y.done;P++,y=x.next())y=p(w,f,P,y.value,S),y!==null&&(n&&y.alternate!==null&&w.delete(y.key===null?P:y.key),v=s(y,v,P),A===null?R=y:A.sibling=y,A=y);return n&&w.forEach(function(B){return e(f,B)}),xt&&zr(f,P),R}function m(f,v,x,S){if(typeof x=="object"&&x!==null&&x.type===Ns&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Ga:e:{for(var R=x.key,A=v;A!==null;){if(A.key===R){if(R=x.type,R===Ns){if(A.tag===7){t(f,A.sibling),v=r(A,x.props.children),v.return=f,f=v;break e}}else if(A.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===sr&&_m(R)===A.type){t(f,A.sibling),v=r(A,x.props),v.ref=Co(f,A,x),v.return=f,f=v;break e}t(f,A);break}else e(f,A);A=A.sibling}x.type===Ns?(v=Qr(x.props.children,f.mode,S,x.key),v.return=f,f=v):(S=Kl(x.type,x.key,x.props,null,f.mode,S),S.ref=Co(f,v,x),S.return=f,f=S)}return o(f);case Ls:e:{for(A=x.key;v!==null;){if(v.key===A)if(v.tag===4&&v.stateNode.containerInfo===x.containerInfo&&v.stateNode.implementation===x.implementation){t(f,v.sibling),v=r(v,x.children||[]),v.return=f,f=v;break e}else{t(f,v);break}else e(f,v);v=v.sibling}v=Iu(x,f.mode,S),v.return=f,f=v}return o(f);case sr:return A=x._init,m(f,v,A(x._payload),S)}if(Wo(x))return g(f,v,x,S);if(Mo(x))return _(f,v,x,S);el(f,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,v!==null&&v.tag===6?(t(f,v.sibling),v=r(v,x),v.return=f,f=v):(t(f,v),v=Nu(x,f.mode,S),v.return=f,f=v),o(f)):t(f,v)}return m}var so=Lv(!0),Nv=Lv(!1),_c=Cr(null),xc=null,Bs=null,Nf=null;function If(){Nf=Bs=xc=null}function Df(n){var e=_c.current;vt(_c),n._currentValue=e}function ed(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function Ks(n,e){xc=n,Nf=Bs=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(pn=!0),n.firstContext=null)}function Bn(n){var e=n._currentValue;if(Nf!==n)if(n={context:n,memoizedValue:e,next:null},Bs===null){if(xc===null)throw Error(ae(308));Bs=n,xc.dependencies={lanes:0,firstContext:n}}else Bs=Bs.next=n;return e}var Yr=null;function Uf(n){Yr===null?Yr=[n]:Yr.push(n)}function Iv(n,e,t,i){var r=e.interleaved;return r===null?(t.next=t,Uf(e)):(t.next=r.next,r.next=t),e.interleaved=t,Xi(n,i)}function Xi(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var or=!1;function Ff(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Dv(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Hi(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function gr(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,tt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Xi(n,t)}return r=i.interleaved,r===null?(e.next=e,Uf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Xi(n,t)}function Wl(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,Sf(n,t)}}function xm(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var r=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?r=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?r=s=e:s=s.next=e}else r=s=e;t={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function yc(n,e,t,i){var r=n.updateQueue;or=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=n.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,u=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=n,_=a;switch(h=e,p=t,_.tag){case 1:if(g=_.payload,typeof g=="function"){d=g.call(p,d,h);break e}d=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=_.payload,h=typeof g=="function"?g.call(p,d,h):g,h==null)break e;d=wt({},d,h);break e;case 2:or=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=d):u=u.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(u===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);is|=o,n.lanes=o,n.memoizedState=d}}function ym(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var i=n[e],r=i.callback;if(r!==null){if(i.callback=null,i=t,typeof r!="function")throw Error(ae(191,r));r.call(i)}}}var Da={},vi=Cr(Da),xa=Cr(Da),ya=Cr(Da);function $r(n){if(n===Da)throw Error(ae(174));return n}function Of(n,e){switch(dt(ya,e),dt(xa,n),dt(vi,Da),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Dh(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=Dh(e,n)}vt(vi),dt(vi,e)}function oo(){vt(vi),vt(xa),vt(ya)}function Uv(n){$r(ya.current);var e=$r(vi.current),t=Dh(e,n.type);e!==t&&(dt(xa,n),dt(vi,t))}function zf(n){xa.current===n&&(vt(vi),vt(xa))}var St=Cr(0);function Sc(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Au=[];function kf(){for(var n=0;n<Au.length;n++)Au[n]._workInProgressVersionPrimary=null;Au.length=0}var Xl=Yi.ReactCurrentDispatcher,Cu=Yi.ReactCurrentBatchConfig,ns=0,Et=null,Ut=null,Bt=null,Mc=!1,ea=!1,Sa=0,US=0;function Yt(){throw Error(ae(321))}function Bf(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!oi(n[t],e[t]))return!1;return!0}function Hf(n,e,t,i,r,s){if(ns=s,Et=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Xl.current=n===null||n.memoizedState===null?kS:BS,n=t(i,r),ea){s=0;do{if(ea=!1,Sa=0,25<=s)throw Error(ae(301));s+=1,Bt=Ut=null,e.updateQueue=null,Xl.current=HS,n=t(i,r)}while(ea)}if(Xl.current=Ec,e=Ut!==null&&Ut.next!==null,ns=0,Bt=Ut=Et=null,Mc=!1,e)throw Error(ae(300));return n}function Vf(){var n=Sa!==0;return Sa=0,n}function fi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Bt===null?Et.memoizedState=Bt=n:Bt=Bt.next=n,Bt}function Hn(){if(Ut===null){var n=Et.alternate;n=n!==null?n.memoizedState:null}else n=Ut.next;var e=Bt===null?Et.memoizedState:Bt.next;if(e!==null)Bt=e,Ut=n;else{if(n===null)throw Error(ae(310));Ut=n,n={memoizedState:Ut.memoizedState,baseState:Ut.baseState,baseQueue:Ut.baseQueue,queue:Ut.queue,next:null},Bt===null?Et.memoizedState=Bt=n:Bt=Bt.next=n}return Bt}function Ma(n,e){return typeof e=="function"?e(n):e}function Ru(n){var e=Hn(),t=e.queue;if(t===null)throw Error(ae(311));t.lastRenderedReducer=n;var i=Ut,r=i.baseQueue,s=t.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,t.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((ns&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:n(i,c.action);else{var d={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,Et.lanes|=u,is|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,oi(i,e.memoizedState)||(pn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,t.lastRenderedState=i}if(n=t.interleaved,n!==null){r=n;do s=r.lane,Et.lanes|=s,is|=s,r=r.next;while(r!==n)}else r===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function bu(n){var e=Hn(),t=e.queue;if(t===null)throw Error(ae(311));t.lastRenderedReducer=n;var i=t.dispatch,r=t.pending,s=e.memoizedState;if(r!==null){t.pending=null;var o=r=r.next;do s=n(s,o.action),o=o.next;while(o!==r);oi(s,e.memoizedState)||(pn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,i]}function Fv(){}function Ov(n,e){var t=Et,i=Hn(),r=e(),s=!oi(i.memoizedState,r);if(s&&(i.memoizedState=r,pn=!0),i=i.queue,Gf(Bv.bind(null,t,i,n),[n]),i.getSnapshot!==e||s||Bt!==null&&Bt.memoizedState.tag&1){if(t.flags|=2048,Ea(9,kv.bind(null,t,i,r,e),void 0,null),Ht===null)throw Error(ae(349));ns&30||zv(t,e,r)}return r}function zv(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=Et.updateQueue,e===null?(e={lastEffect:null,stores:null},Et.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function kv(n,e,t,i){e.value=t,e.getSnapshot=i,Hv(e)&&Vv(n)}function Bv(n,e,t){return t(function(){Hv(e)&&Vv(n)})}function Hv(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!oi(n,t)}catch{return!0}}function Vv(n){var e=Xi(n,1);e!==null&&si(e,n,1,-1)}function Sm(n){var e=fi();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:n},e.queue=n,n=n.dispatch=zS.bind(null,Et,n),[e.memoizedState,n]}function Ea(n,e,t,i){return n={tag:n,create:e,destroy:t,deps:i,next:null},e=Et.updateQueue,e===null?(e={lastEffect:null,stores:null},Et.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n)),n}function Gv(){return Hn().memoizedState}function jl(n,e,t,i){var r=fi();Et.flags|=n,r.memoizedState=Ea(1|e,t,void 0,i===void 0?null:i)}function Vc(n,e,t,i){var r=Hn();i=i===void 0?null:i;var s=void 0;if(Ut!==null){var o=Ut.memoizedState;if(s=o.destroy,i!==null&&Bf(i,o.deps)){r.memoizedState=Ea(e,t,s,i);return}}Et.flags|=n,r.memoizedState=Ea(1|e,t,s,i)}function Mm(n,e){return jl(8390656,8,n,e)}function Gf(n,e){return Vc(2048,8,n,e)}function Wv(n,e){return Vc(4,2,n,e)}function Xv(n,e){return Vc(4,4,n,e)}function jv(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function qv(n,e,t){return t=t!=null?t.concat([n]):null,Vc(4,4,jv.bind(null,e,n),t)}function Wf(){}function Yv(n,e){var t=Hn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&Bf(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function $v(n,e){var t=Hn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&Bf(e,i[1])?i[0]:(n=n(),t.memoizedState=[n,e],n)}function Kv(n,e,t){return ns&21?(oi(t,e)||(t=tv(),Et.lanes|=t,is|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,pn=!0),n.memoizedState=t)}function FS(n,e){var t=ct;ct=t!==0&&4>t?t:4,n(!0);var i=Cu.transition;Cu.transition={};try{n(!1),e()}finally{ct=t,Cu.transition=i}}function Zv(){return Hn().memoizedState}function OS(n,e,t){var i=_r(n);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},Jv(n))Qv(e,t);else if(t=Iv(n,e,t,i),t!==null){var r=sn();si(t,n,i,r),e_(t,e,i)}}function zS(n,e,t){var i=_r(n),r={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(Jv(n))Qv(e,r);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,t);if(r.hasEagerState=!0,r.eagerState=a,oi(a,o)){var l=e.interleaved;l===null?(r.next=r,Uf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}t=Iv(n,e,r,i),t!==null&&(r=sn(),si(t,n,i,r),e_(t,e,i))}}function Jv(n){var e=n.alternate;return n===Et||e!==null&&e===Et}function Qv(n,e){ea=Mc=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function e_(n,e,t){if(t&4194240){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,Sf(n,t)}}var Ec={readContext:Bn,useCallback:Yt,useContext:Yt,useEffect:Yt,useImperativeHandle:Yt,useInsertionEffect:Yt,useLayoutEffect:Yt,useMemo:Yt,useReducer:Yt,useRef:Yt,useState:Yt,useDebugValue:Yt,useDeferredValue:Yt,useTransition:Yt,useMutableSource:Yt,useSyncExternalStore:Yt,useId:Yt,unstable_isNewReconciler:!1},kS={readContext:Bn,useCallback:function(n,e){return fi().memoizedState=[n,e===void 0?null:e],n},useContext:Bn,useEffect:Mm,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,jl(4194308,4,jv.bind(null,e,n),t)},useLayoutEffect:function(n,e){return jl(4194308,4,n,e)},useInsertionEffect:function(n,e){return jl(4,2,n,e)},useMemo:function(n,e){var t=fi();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var i=fi();return e=t!==void 0?t(e):e,i.memoizedState=i.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},i.queue=n,n=n.dispatch=OS.bind(null,Et,n),[i.memoizedState,n]},useRef:function(n){var e=fi();return n={current:n},e.memoizedState=n},useState:Sm,useDebugValue:Wf,useDeferredValue:function(n){return fi().memoizedState=n},useTransition:function(){var n=Sm(!1),e=n[0];return n=FS.bind(null,n[1]),fi().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var i=Et,r=fi();if(xt){if(t===void 0)throw Error(ae(407));t=t()}else{if(t=e(),Ht===null)throw Error(ae(349));ns&30||zv(i,e,t)}r.memoizedState=t;var s={value:t,getSnapshot:e};return r.queue=s,Mm(Bv.bind(null,i,s,n),[n]),i.flags|=2048,Ea(9,kv.bind(null,i,s,t,e),void 0,null),t},useId:function(){var n=fi(),e=Ht.identifierPrefix;if(xt){var t=zi,i=Oi;t=(i&~(1<<32-ri(i)-1)).toString(32)+t,e=":"+e+"R"+t,t=Sa++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=US++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},BS={readContext:Bn,useCallback:Yv,useContext:Bn,useEffect:Gf,useImperativeHandle:qv,useInsertionEffect:Wv,useLayoutEffect:Xv,useMemo:$v,useReducer:Ru,useRef:Gv,useState:function(){return Ru(Ma)},useDebugValue:Wf,useDeferredValue:function(n){var e=Hn();return Kv(e,Ut.memoizedState,n)},useTransition:function(){var n=Ru(Ma)[0],e=Hn().memoizedState;return[n,e]},useMutableSource:Fv,useSyncExternalStore:Ov,useId:Zv,unstable_isNewReconciler:!1},HS={readContext:Bn,useCallback:Yv,useContext:Bn,useEffect:Gf,useImperativeHandle:qv,useInsertionEffect:Wv,useLayoutEffect:Xv,useMemo:$v,useReducer:bu,useRef:Gv,useState:function(){return bu(Ma)},useDebugValue:Wf,useDeferredValue:function(n){var e=Hn();return Ut===null?e.memoizedState=n:Kv(e,Ut.memoizedState,n)},useTransition:function(){var n=bu(Ma)[0],e=Hn().memoizedState;return[n,e]},useMutableSource:Fv,useSyncExternalStore:Ov,useId:Zv,unstable_isNewReconciler:!1};function Zn(n,e){if(n&&n.defaultProps){e=wt({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function td(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:wt({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var Gc={isMounted:function(n){return(n=n._reactInternals)?cs(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var i=sn(),r=_r(n),s=Hi(i,r);s.payload=e,t!=null&&(s.callback=t),e=gr(n,s,r),e!==null&&(si(e,n,r,i),Wl(e,n,r))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=sn(),r=_r(n),s=Hi(i,r);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=gr(n,s,r),e!==null&&(si(e,n,r,i),Wl(e,n,r))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=sn(),i=_r(n),r=Hi(t,i);r.tag=2,e!=null&&(r.callback=e),e=gr(n,r,i),e!==null&&(si(e,n,i,t),Wl(e,n,i))}};function Em(n,e,t,i,r,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!ma(t,i)||!ma(r,s):!0}function t_(n,e,t){var i=!1,r=Er,s=e.contextType;return typeof s=="object"&&s!==null?s=Bn(s):(r=gn(e)?es:en.current,i=e.contextTypes,s=(i=i!=null)?io(n,r):Er),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Gc,n.stateNode=e,e._reactInternals=n,i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=s),e}function wm(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&Gc.enqueueReplaceState(e,e.state,null)}function nd(n,e,t,i){var r=n.stateNode;r.props=t,r.state=n.memoizedState,r.refs={},Ff(n);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Bn(s):(s=gn(e)?es:en.current,r.context=io(n,s)),r.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(td(n,e,s,t),r.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Gc.enqueueReplaceState(r,r.state,null),yc(n,t,r,i),r.state=n.memoizedState),typeof r.componentDidMount=="function"&&(n.flags|=4194308)}function ao(n,e){try{var t="",i=e;do t+=my(i),i=i.return;while(i);var r=t}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:r,digest:null}}function Pu(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function id(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var VS=typeof WeakMap=="function"?WeakMap:Map;function n_(n,e,t){t=Hi(-1,t),t.tag=3,t.payload={element:null};var i=e.value;return t.callback=function(){Tc||(Tc=!0,fd=i),id(n,e)},t}function i_(n,e,t){t=Hi(-1,t),t.tag=3;var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;t.payload=function(){return i(r)},t.callback=function(){id(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){id(n,e),typeof i!="function"&&(vr===null?vr=new Set([this]):vr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function Tm(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new VS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(t)||(r.add(t),n=nM.bind(null,n,e,t),e.then(n,n))}function Am(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Cm(n,e,t,i,r){return n.mode&1?(n.flags|=65536,n.lanes=r,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Hi(-1,1),e.tag=2,gr(t,e,1))),t.lanes|=1),n)}var GS=Yi.ReactCurrentOwner,pn=!1;function rn(n,e,t,i){e.child=n===null?Nv(e,null,t,i):so(e,n.child,t,i)}function Rm(n,e,t,i,r){t=t.render;var s=e.ref;return Ks(e,r),i=Hf(n,e,t,i,s,r),t=Vf(),n!==null&&!pn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,ji(n,e,r)):(xt&&t&&bf(e),e.flags|=1,rn(n,e,i,r),e.child)}function bm(n,e,t,i,r){if(n===null){var s=t.type;return typeof s=="function"&&!Jf(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,r_(n,e,s,i,r)):(n=Kl(t.type,null,i,e,e.mode,r),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,!(n.lanes&r)){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:ma,t(o,i)&&n.ref===e.ref)return ji(n,e,r)}return e.flags|=1,n=xr(s,i),n.ref=e.ref,n.return=e,e.child=n}function r_(n,e,t,i,r){if(n!==null){var s=n.memoizedProps;if(ma(s,i)&&n.ref===e.ref)if(pn=!1,e.pendingProps=i=s,(n.lanes&r)!==0)n.flags&131072&&(pn=!0);else return e.lanes=n.lanes,ji(n,e,r)}return rd(n,e,t,i,r)}function s_(n,e,t){var i=e.pendingProps,r=i.children,s=n!==null?n.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},dt(Vs,En),En|=t;else{if(!(t&1073741824))return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,dt(Vs,En),En|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:t,dt(Vs,En),En|=i}else s!==null?(i=s.baseLanes|t,e.memoizedState=null):i=t,dt(Vs,En),En|=i;return rn(n,e,r,t),e.child}function o_(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function rd(n,e,t,i,r){var s=gn(t)?es:en.current;return s=io(e,s),Ks(e,r),t=Hf(n,e,t,i,s,r),i=Vf(),n!==null&&!pn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,ji(n,e,r)):(xt&&i&&bf(e),e.flags|=1,rn(n,e,t,r),e.child)}function Pm(n,e,t,i,r){if(gn(t)){var s=!0;mc(e)}else s=!1;if(Ks(e,r),e.stateNode===null)ql(n,e),t_(e,t,i),nd(e,t,i,r),i=!0;else if(n===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=t.contextType;typeof c=="object"&&c!==null?c=Bn(c):(c=gn(t)?es:en.current,c=io(e,c));var u=t.getDerivedStateFromProps,d=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&wm(e,o,i,c),or=!1;var h=e.memoizedState;o.state=h,yc(e,i,o,r),l=e.memoizedState,a!==i||h!==l||mn.current||or?(typeof u=="function"&&(td(e,t,u,i),l=e.memoizedState),(a=or||Em(e,t,a,i,h,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Dv(n,e),a=e.memoizedProps,c=e.type===e.elementType?a:Zn(e.type,a),o.props=c,d=e.pendingProps,h=o.context,l=t.contextType,typeof l=="object"&&l!==null?l=Bn(l):(l=gn(t)?es:en.current,l=io(e,l));var p=t.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||h!==l)&&wm(e,o,i,l),or=!1,h=e.memoizedState,o.state=h,yc(e,i,o,r);var g=e.memoizedState;a!==d||h!==g||mn.current||or?(typeof p=="function"&&(td(e,t,p,i),g=e.memoizedState),(c=or||Em(e,t,c,i,h,g,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),i=!1)}return sd(n,e,t,i,s,r)}function sd(n,e,t,i,r,s){o_(n,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&mm(e,t,!1),ji(n,e,s);i=e.stateNode,GS.current=e;var a=o&&typeof t.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,n!==null&&o?(e.child=so(e,n.child,null,s),e.child=so(e,null,a,s)):rn(n,e,a,s),e.memoizedState=i.state,r&&mm(e,t,!0),e.child}function a_(n){var e=n.stateNode;e.pendingContext?pm(n,e.pendingContext,e.pendingContext!==e.context):e.context&&pm(n,e.context,!1),Of(n,e.containerInfo)}function Lm(n,e,t,i,r){return ro(),Lf(r),e.flags|=256,rn(n,e,t,i),e.child}var od={dehydrated:null,treeContext:null,retryLane:0};function ad(n){return{baseLanes:n,cachePool:null,transitions:null}}function l_(n,e,t){var i=e.pendingProps,r=St.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=n!==null&&n.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(r|=1),dt(St,r&1),n===null)return Qh(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,n=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=jc(o,i,0,null),n=Qr(n,i,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=ad(t),e.memoizedState=od,n):Xf(e,o));if(r=n.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return WS(n,e,o,i,a,r,t);if(s){s=i.fallback,o=e.mode,r=n.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=xr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=xr(a,s):(s=Qr(s,o,t,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=n.child.memoizedState,o=o===null?ad(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=od,i}return s=n.child,n=s.sibling,i=xr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=t),i.return=e,i.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=i,e.memoizedState=null,i}function Xf(n,e){return e=jc({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function tl(n,e,t,i){return i!==null&&Lf(i),so(e,n.child,null,t),n=Xf(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function WS(n,e,t,i,r,s,o){if(t)return e.flags&256?(e.flags&=-257,i=Pu(Error(ae(422))),tl(n,e,o,i)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=jc({mode:"visible",children:i.children},r,0,null),s=Qr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&so(e,n.child,null,o),e.child.memoizedState=ad(o),e.memoizedState=od,s);if(!(e.mode&1))return tl(n,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ae(419)),i=Pu(s,i,void 0),tl(n,e,o,i)}if(a=(o&n.childLanes)!==0,pn||a){if(i=Ht,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Xi(n,r),si(i,n,r,-1))}return Zf(),i=Pu(Error(ae(421))),tl(n,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=n.child,e=iM.bind(null,n),r._reactRetry=e,null):(n=s.treeContext,An=mr(r.nextSibling),Cn=e,xt=!0,Qn=null,n!==null&&(Un[Fn++]=Oi,Un[Fn++]=zi,Un[Fn++]=ts,Oi=n.id,zi=n.overflow,ts=e),e=Xf(e,i.children),e.flags|=4096,e)}function Nm(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),ed(n.return,e,t)}function Lu(n,e,t,i,r){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=t,s.tailMode=r)}function c_(n,e,t){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(rn(n,e,i.children,t),i=St.current,i&2)i=i&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Nm(n,t,e);else if(n.tag===19)Nm(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}if(dt(St,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(t=e.child,r=null;t!==null;)n=t.alternate,n!==null&&Sc(n)===null&&(r=t),t=t.sibling;t=r,t===null?(r=e.child,e.child=null):(r=t.sibling,t.sibling=null),Lu(e,!1,r,t,s);break;case"backwards":for(t=null,r=e.child,e.child=null;r!==null;){if(n=r.alternate,n!==null&&Sc(n)===null){e.child=r;break}n=r.sibling,r.sibling=t,t=r,r=n}Lu(e,!0,t,null,s);break;case"together":Lu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ql(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function ji(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),is|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(ae(153));if(e.child!==null){for(n=e.child,t=xr(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=xr(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function XS(n,e,t){switch(e.tag){case 3:a_(e),ro();break;case 5:Uv(e);break;case 1:gn(e.type)&&mc(e);break;case 4:Of(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;dt(_c,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(dt(St,St.current&1),e.flags|=128,null):t&e.child.childLanes?l_(n,e,t):(dt(St,St.current&1),n=ji(n,e,t),n!==null?n.sibling:null);dt(St,St.current&1);break;case 19:if(i=(t&e.childLanes)!==0,n.flags&128){if(i)return c_(n,e,t);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),dt(St,St.current),i)break;return null;case 22:case 23:return e.lanes=0,s_(n,e,t)}return ji(n,e,t)}var u_,ld,h_,d_;u_=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};ld=function(){};h_=function(n,e,t,i){var r=n.memoizedProps;if(r!==i){n=e.stateNode,$r(vi.current);var s=null;switch(t){case"input":r=Ph(n,r),i=Ph(n,i),s=[];break;case"select":r=wt({},r,{value:void 0}),i=wt({},i,{value:void 0}),s=[];break;case"textarea":r=Ih(n,r),i=Ih(n,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(n.onclick=fc)}Uh(t,i);var o;t=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(la.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r?.[c],i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(t||(t={}),t[o]=l[o])}else t||(s||(s=[]),s.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(la.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&mt("scroll",n),s||a===l||(s=[])):(s=s||[]).push(c,l))}t&&(s=s||[]).push("style",t);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};d_=function(n,e,t,i){t!==i&&(e.flags|=4)};function Ro(n,e){if(!xt)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function $t(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=n,r=r.sibling;else for(r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=n,r=r.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function jS(n,e,t){var i=e.pendingProps;switch(Pf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $t(e),null;case 1:return gn(e.type)&&pc(),$t(e),null;case 3:return i=e.stateNode,oo(),vt(mn),vt(en),kf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(n===null||n.child===null)&&(Qa(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Qn!==null&&(gd(Qn),Qn=null))),ld(n,e),$t(e),null;case 5:zf(e);var r=$r(ya.current);if(t=e.type,n!==null&&e.stateNode!=null)h_(n,e,t,i,r),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ae(166));return $t(e),null}if(n=$r(vi.current),Qa(e)){i=e.stateNode,t=e.type;var s=e.memoizedProps;switch(i[mi]=e,i[_a]=s,n=(e.mode&1)!==0,t){case"dialog":mt("cancel",i),mt("close",i);break;case"iframe":case"object":case"embed":mt("load",i);break;case"video":case"audio":for(r=0;r<jo.length;r++)mt(jo[r],i);break;case"source":mt("error",i);break;case"img":case"image":case"link":mt("error",i),mt("load",i);break;case"details":mt("toggle",i);break;case"input":Hp(i,s),mt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},mt("invalid",i);break;case"textarea":Gp(i,s),mt("invalid",i)}Uh(t,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Ja(i.textContent,a,n),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Ja(i.textContent,a,n),r=["children",""+a]):la.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&mt("scroll",i)}switch(t){case"input":Wa(i),Vp(i,s,!0);break;case"textarea":Wa(i),Wp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=fc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=B0(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof i.is=="string"?n=o.createElement(t,{is:i.is}):(n=o.createElement(t),t==="select"&&(o=n,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):n=o.createElementNS(n,t),n[mi]=e,n[_a]=i,u_(n,e,!1,!1),e.stateNode=n;e:{switch(o=Fh(t,i),t){case"dialog":mt("cancel",n),mt("close",n),r=i;break;case"iframe":case"object":case"embed":mt("load",n),r=i;break;case"video":case"audio":for(r=0;r<jo.length;r++)mt(jo[r],n);r=i;break;case"source":mt("error",n),r=i;break;case"img":case"image":case"link":mt("error",n),mt("load",n),r=i;break;case"details":mt("toggle",n),r=i;break;case"input":Hp(n,i),r=Ph(n,i),mt("invalid",n);break;case"option":r=i;break;case"select":n._wrapperState={wasMultiple:!!i.multiple},r=wt({},i,{value:void 0}),mt("invalid",n);break;case"textarea":Gp(n,i),r=Ih(n,i),mt("invalid",n);break;default:r=i}Uh(t,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?G0(n,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&H0(n,l)):s==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&ca(n,l):typeof l=="number"&&ca(n,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(la.hasOwnProperty(s)?l!=null&&s==="onScroll"&&mt("scroll",n):l!=null&&mf(n,s,l,o))}switch(t){case"input":Wa(n),Vp(n,i,!1);break;case"textarea":Wa(n),Wp(n);break;case"option":i.value!=null&&n.setAttribute("value",""+Mr(i.value));break;case"select":n.multiple=!!i.multiple,s=i.value,s!=null?js(n,!!i.multiple,s,!1):i.defaultValue!=null&&js(n,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(n.onclick=fc)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return $t(e),null;case 6:if(n&&e.stateNode!=null)d_(n,e,n.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ae(166));if(t=$r(ya.current),$r(vi.current),Qa(e)){if(i=e.stateNode,t=e.memoizedProps,i[mi]=e,(s=i.nodeValue!==t)&&(n=Cn,n!==null))switch(n.tag){case 3:Ja(i.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ja(i.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[mi]=e,e.stateNode=i}return $t(e),null;case 13:if(vt(St),i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(xt&&An!==null&&e.mode&1&&!(e.flags&128))Pv(),ro(),e.flags|=98560,s=!1;else if(s=Qa(e),i!==null&&i.dehydrated!==null){if(n===null){if(!s)throw Error(ae(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ae(317));s[mi]=e}else ro(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;$t(e),s=!1}else Qn!==null&&(gd(Qn),Qn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(i=i!==null,i!==(n!==null&&n.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(n===null||St.current&1?Ft===0&&(Ft=3):Zf())),e.updateQueue!==null&&(e.flags|=4),$t(e),null);case 4:return oo(),ld(n,e),n===null&&ga(e.stateNode.containerInfo),$t(e),null;case 10:return Df(e.type._context),$t(e),null;case 17:return gn(e.type)&&pc(),$t(e),null;case 19:if(vt(St),s=e.memoizedState,s===null)return $t(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Ro(s,!1);else{if(Ft!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(o=Sc(n),o!==null){for(e.flags|=128,Ro(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=t,t=e.child;t!==null;)s=t,n=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return dt(St,St.current&1|2),e.child}n=n.sibling}s.tail!==null&&bt()>lo&&(e.flags|=128,i=!0,Ro(s,!1),e.lanes=4194304)}else{if(!i)if(n=Sc(o),n!==null){if(e.flags|=128,i=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Ro(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!xt)return $t(e),null}else 2*bt()-s.renderingStartTime>lo&&t!==1073741824&&(e.flags|=128,i=!0,Ro(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=bt(),e.sibling=null,t=St.current,dt(St,i?t&1|2:t&1),e):($t(e),null);case 22:case 23:return Kf(),i=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?En&1073741824&&($t(e),e.subtreeFlags&6&&(e.flags|=8192)):$t(e),null;case 24:return null;case 25:return null}throw Error(ae(156,e.tag))}function qS(n,e){switch(Pf(e),e.tag){case 1:return gn(e.type)&&pc(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return oo(),vt(mn),vt(en),kf(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return zf(e),null;case 13:if(vt(St),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(ae(340));ro()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return vt(St),null;case 4:return oo(),null;case 10:return Df(e.type._context),null;case 22:case 23:return Kf(),null;case 24:return null;default:return null}}var nl=!1,Jt=!1,YS=typeof WeakSet=="function"?WeakSet:Set,Ae=null;function Hs(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){At(n,e,i)}else t.current=null}function cd(n,e,t){try{t()}catch(i){At(n,e,i)}}var Im=!1;function $S(n,e){if(jh=uc,n=vv(),Rf(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,a=-1,l=-1,c=0,u=0,d=n,h=null;t:for(;;){for(var p;d!==t||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)h=d,d=p;for(;;){if(d===n)break t;if(h===t&&++c===r&&(a=o),h===s&&++u===i&&(l=o),(p=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=p}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(qh={focusedElem:n,selectionRange:t},uc=!1,Ae=e;Ae!==null;)if(e=Ae,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,Ae=n;else for(;Ae!==null;){e=Ae;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var _=g.memoizedProps,m=g.memoizedState,f=e.stateNode,v=f.getSnapshotBeforeUpdate(e.elementType===e.type?_:Zn(e.type,_),m);f.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ae(163))}}catch(S){At(e,e.return,S)}if(n=e.sibling,n!==null){n.return=e.return,Ae=n;break}Ae=e.return}return g=Im,Im=!1,g}function ta(n,e,t){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&n)===n){var s=r.destroy;r.destroy=void 0,s!==void 0&&cd(e,t,s)}r=r.next}while(r!==i)}}function Wc(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var i=t.create;t.destroy=i()}t=t.next}while(t!==e)}}function ud(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function f_(n){var e=n.alternate;e!==null&&(n.alternate=null,f_(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[mi],delete e[_a],delete e[Kh],delete e[LS],delete e[NS])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function p_(n){return n.tag===5||n.tag===3||n.tag===4}function Dm(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||p_(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function hd(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=fc));else if(i!==4&&(n=n.child,n!==null))for(hd(n,e,t),n=n.sibling;n!==null;)hd(n,e,t),n=n.sibling}function dd(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(n=n.child,n!==null))for(dd(n,e,t),n=n.sibling;n!==null;)dd(n,e,t),n=n.sibling}var Gt=null,Jn=!1;function Ki(n,e,t){for(t=t.child;t!==null;)m_(n,e,t),t=t.sibling}function m_(n,e,t){if(gi&&typeof gi.onCommitFiberUnmount=="function")try{gi.onCommitFiberUnmount(Fc,t)}catch{}switch(t.tag){case 5:Jt||Hs(t,e);case 6:var i=Gt,r=Jn;Gt=null,Ki(n,e,t),Gt=i,Jn=r,Gt!==null&&(Jn?(n=Gt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):Gt.removeChild(t.stateNode));break;case 18:Gt!==null&&(Jn?(n=Gt,t=t.stateNode,n.nodeType===8?wu(n.parentNode,t):n.nodeType===1&&wu(n,t),fa(n)):wu(Gt,t.stateNode));break;case 4:i=Gt,r=Jn,Gt=t.stateNode.containerInfo,Jn=!0,Ki(n,e,t),Gt=i,Jn=r;break;case 0:case 11:case 14:case 15:if(!Jt&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&cd(t,e,o),r=r.next}while(r!==i)}Ki(n,e,t);break;case 1:if(!Jt&&(Hs(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(a){At(t,e,a)}Ki(n,e,t);break;case 21:Ki(n,e,t);break;case 22:t.mode&1?(Jt=(i=Jt)||t.memoizedState!==null,Ki(n,e,t),Jt=i):Ki(n,e,t);break;default:Ki(n,e,t)}}function Um(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new YS),e.forEach(function(i){var r=rM.bind(null,n,i);t.has(i)||(t.add(i),i.then(r,r))})}}function Wn(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var r=t[i];try{var s=n,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Gt=a.stateNode,Jn=!1;break e;case 3:Gt=a.stateNode.containerInfo,Jn=!0;break e;case 4:Gt=a.stateNode.containerInfo,Jn=!0;break e}a=a.return}if(Gt===null)throw Error(ae(160));m_(s,o,r),Gt=null,Jn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){At(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)g_(e,n),e=e.sibling}function g_(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Wn(e,n),ai(n),i&4){try{ta(3,n,n.return),Wc(3,n)}catch(_){At(n,n.return,_)}try{ta(5,n,n.return)}catch(_){At(n,n.return,_)}}break;case 1:Wn(e,n),ai(n),i&512&&t!==null&&Hs(t,t.return);break;case 5:if(Wn(e,n),ai(n),i&512&&t!==null&&Hs(t,t.return),n.flags&32){var r=n.stateNode;try{ca(r,"")}catch(_){At(n,n.return,_)}}if(i&4&&(r=n.stateNode,r!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&z0(r,s),Fh(a,o);var c=Fh(a,s);for(o=0;o<l.length;o+=2){var u=l[o],d=l[o+1];u==="style"?G0(r,d):u==="dangerouslySetInnerHTML"?H0(r,d):u==="children"?ca(r,d):mf(r,u,d,c)}switch(a){case"input":Lh(r,s);break;case"textarea":k0(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?js(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?js(r,!!s.multiple,s.defaultValue,!0):js(r,!!s.multiple,s.multiple?[]:"",!1))}r[_a]=s}catch(_){At(n,n.return,_)}}break;case 6:if(Wn(e,n),ai(n),i&4){if(n.stateNode===null)throw Error(ae(162));r=n.stateNode,s=n.memoizedProps;try{r.nodeValue=s}catch(_){At(n,n.return,_)}}break;case 3:if(Wn(e,n),ai(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{fa(e.containerInfo)}catch(_){At(n,n.return,_)}break;case 4:Wn(e,n),ai(n);break;case 13:Wn(e,n),ai(n),r=n.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Yf=bt())),i&4&&Um(n);break;case 22:if(u=t!==null&&t.memoizedState!==null,n.mode&1?(Jt=(c=Jt)||u,Wn(e,n),Jt=c):Wn(e,n),ai(n),i&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!u&&n.mode&1)for(Ae=n,u=n.child;u!==null;){for(d=Ae=u;Ae!==null;){switch(h=Ae,p=h.child,h.tag){case 0:case 11:case 14:case 15:ta(4,h,h.return);break;case 1:Hs(h,h.return);var g=h.stateNode;if(typeof g.componentWillUnmount=="function"){i=h,t=h.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(_){At(i,t,_)}}break;case 5:Hs(h,h.return);break;case 22:if(h.memoizedState!==null){Om(d);continue}}p!==null?(p.return=h,Ae=p):Om(d)}u=u.sibling}e:for(u=null,d=n;;){if(d.tag===5){if(u===null){u=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=V0("display",o))}catch(_){At(n,n.return,_)}}}else if(d.tag===6){if(u===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(_){At(n,n.return,_)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===n)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===n)break e;for(;d.sibling===null;){if(d.return===null||d.return===n)break e;u===d&&(u=null),d=d.return}u===d&&(u=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Wn(e,n),ai(n),i&4&&Um(n);break;case 21:break;default:Wn(e,n),ai(n)}}function ai(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(p_(t)){var i=t;break e}t=t.return}throw Error(ae(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(ca(r,""),i.flags&=-33);var s=Dm(n);dd(n,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Dm(n);hd(n,a,o);break;default:throw Error(ae(161))}}catch(l){At(n,n.return,l)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function KS(n,e,t){Ae=n,v_(n)}function v_(n,e,t){for(var i=(n.mode&1)!==0;Ae!==null;){var r=Ae,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||nl;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Jt;a=nl;var c=Jt;if(nl=o,(Jt=l)&&!c)for(Ae=r;Ae!==null;)o=Ae,l=o.child,o.tag===22&&o.memoizedState!==null?zm(r):l!==null?(l.return=o,Ae=l):zm(r);for(;s!==null;)Ae=s,v_(s),s=s.sibling;Ae=r,nl=a,Jt=c}Fm(n)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Ae=s):Fm(n)}}function Fm(n){for(;Ae!==null;){var e=Ae;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Jt||Wc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Jt)if(t===null)i.componentDidMount();else{var r=e.elementType===e.type?t.memoizedProps:Zn(e.type,t.memoizedProps);i.componentDidUpdate(r,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&ym(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}ym(e,o,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var d=u.dehydrated;d!==null&&fa(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ae(163))}Jt||e.flags&512&&ud(e)}catch(h){At(e,e.return,h)}}if(e===n){Ae=null;break}if(t=e.sibling,t!==null){t.return=e.return,Ae=t;break}Ae=e.return}}function Om(n){for(;Ae!==null;){var e=Ae;if(e===n){Ae=null;break}var t=e.sibling;if(t!==null){t.return=e.return,Ae=t;break}Ae=e.return}}function zm(n){for(;Ae!==null;){var e=Ae;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{Wc(4,e)}catch(l){At(e,t,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){At(e,r,l)}}var s=e.return;try{ud(e)}catch(l){At(e,s,l)}break;case 5:var o=e.return;try{ud(e)}catch(l){At(e,o,l)}}}catch(l){At(e,e.return,l)}if(e===n){Ae=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Ae=a;break}Ae=e.return}}var ZS=Math.ceil,wc=Yi.ReactCurrentDispatcher,jf=Yi.ReactCurrentOwner,kn=Yi.ReactCurrentBatchConfig,tt=0,Ht=null,It=null,Xt=0,En=0,Vs=Cr(0),Ft=0,wa=null,is=0,Xc=0,qf=0,na=null,fn=null,Yf=0,lo=1/0,Ii=null,Tc=!1,fd=null,vr=null,il=!1,hr=null,Ac=0,ia=0,pd=null,Yl=-1,$l=0;function sn(){return tt&6?bt():Yl!==-1?Yl:Yl=bt()}function _r(n){return n.mode&1?tt&2&&Xt!==0?Xt&-Xt:DS.transition!==null?($l===0&&($l=tv()),$l):(n=ct,n!==0||(n=window.event,n=n===void 0?16:lv(n.type)),n):1}function si(n,e,t,i){if(50<ia)throw ia=0,pd=null,Error(ae(185));La(n,t,i),(!(tt&2)||n!==Ht)&&(n===Ht&&(!(tt&2)&&(Xc|=t),Ft===4&&lr(n,Xt)),vn(n,i),t===1&&tt===0&&!(e.mode&1)&&(lo=bt()+500,Hc&&Rr()))}function vn(n,e){var t=n.callbackNode;Dy(n,e);var i=cc(n,n===Ht?Xt:0);if(i===0)t!==null&&qp(t),n.callbackNode=null,n.callbackPriority=0;else if(e=i&-i,n.callbackPriority!==e){if(t!=null&&qp(t),e===1)n.tag===0?IS(km.bind(null,n)):Cv(km.bind(null,n)),bS(function(){!(tt&6)&&Rr()}),t=null;else{switch(nv(i)){case 1:t=yf;break;case 4:t=Q0;break;case 16:t=lc;break;case 536870912:t=ev;break;default:t=lc}t=T_(t,__.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function __(n,e){if(Yl=-1,$l=0,tt&6)throw Error(ae(327));var t=n.callbackNode;if(Zs()&&n.callbackNode!==t)return null;var i=cc(n,n===Ht?Xt:0);if(i===0)return null;if(i&30||i&n.expiredLanes||e)e=Cc(n,i);else{e=i;var r=tt;tt|=2;var s=y_();(Ht!==n||Xt!==e)&&(Ii=null,lo=bt()+500,Jr(n,e));do try{eM();break}catch(a){x_(n,a)}while(!0);If(),wc.current=s,tt=r,It!==null?e=0:(Ht=null,Xt=0,e=Ft)}if(e!==0){if(e===2&&(r=Hh(n),r!==0&&(i=r,e=md(n,r))),e===1)throw t=wa,Jr(n,0),lr(n,i),vn(n,bt()),t;if(e===6)lr(n,i);else{if(r=n.current.alternate,!(i&30)&&!JS(r)&&(e=Cc(n,i),e===2&&(s=Hh(n),s!==0&&(i=s,e=md(n,s))),e===1))throw t=wa,Jr(n,0),lr(n,i),vn(n,bt()),t;switch(n.finishedWork=r,n.finishedLanes=i,e){case 0:case 1:throw Error(ae(345));case 2:kr(n,fn,Ii);break;case 3:if(lr(n,i),(i&130023424)===i&&(e=Yf+500-bt(),10<e)){if(cc(n,0)!==0)break;if(r=n.suspendedLanes,(r&i)!==i){sn(),n.pingedLanes|=n.suspendedLanes&r;break}n.timeoutHandle=$h(kr.bind(null,n,fn,Ii),e);break}kr(n,fn,Ii);break;case 4:if(lr(n,i),(i&4194240)===i)break;for(e=n.eventTimes,r=-1;0<i;){var o=31-ri(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=bt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*ZS(i/1960))-i,10<i){n.timeoutHandle=$h(kr.bind(null,n,fn,Ii),i);break}kr(n,fn,Ii);break;case 5:kr(n,fn,Ii);break;default:throw Error(ae(329))}}}return vn(n,bt()),n.callbackNode===t?__.bind(null,n):null}function md(n,e){var t=na;return n.current.memoizedState.isDehydrated&&(Jr(n,e).flags|=256),n=Cc(n,e),n!==2&&(e=fn,fn=t,e!==null&&gd(e)),n}function gd(n){fn===null?fn=n:fn.push.apply(fn,n)}function JS(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var r=t[i],s=r.getSnapshot;r=r.value;try{if(!oi(s(),r))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function lr(n,e){for(e&=~qf,e&=~Xc,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-ri(e),i=1<<t;n[t]=-1,e&=~i}}function km(n){if(tt&6)throw Error(ae(327));Zs();var e=cc(n,0);if(!(e&1))return vn(n,bt()),null;var t=Cc(n,e);if(n.tag!==0&&t===2){var i=Hh(n);i!==0&&(e=i,t=md(n,i))}if(t===1)throw t=wa,Jr(n,0),lr(n,e),vn(n,bt()),t;if(t===6)throw Error(ae(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,kr(n,fn,Ii),vn(n,bt()),null}function $f(n,e){var t=tt;tt|=1;try{return n(e)}finally{tt=t,tt===0&&(lo=bt()+500,Hc&&Rr())}}function rs(n){hr!==null&&hr.tag===0&&!(tt&6)&&Zs();var e=tt;tt|=1;var t=kn.transition,i=ct;try{if(kn.transition=null,ct=1,n)return n()}finally{ct=i,kn.transition=t,tt=e,!(tt&6)&&Rr()}}function Kf(){En=Vs.current,vt(Vs)}function Jr(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,RS(t)),It!==null)for(t=It.return;t!==null;){var i=t;switch(Pf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&pc();break;case 3:oo(),vt(mn),vt(en),kf();break;case 5:zf(i);break;case 4:oo();break;case 13:vt(St);break;case 19:vt(St);break;case 10:Df(i.type._context);break;case 22:case 23:Kf()}t=t.return}if(Ht=n,It=n=xr(n.current,null),Xt=En=e,Ft=0,wa=null,qf=Xc=is=0,fn=na=null,Yr!==null){for(e=0;e<Yr.length;e++)if(t=Yr[e],i=t.interleaved,i!==null){t.interleaved=null;var r=i.next,s=t.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}t.pending=i}Yr=null}return n}function x_(n,e){do{var t=It;try{if(If(),Xl.current=Ec,Mc){for(var i=Et.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Mc=!1}if(ns=0,Bt=Ut=Et=null,ea=!1,Sa=0,jf.current=null,t===null||t.return===null){Ft=1,wa=e,It=null;break}e:{var s=n,o=t.return,a=t,l=e;if(e=Xt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,d=u.tag;if(!(u.mode&1)&&(d===0||d===11||d===15)){var h=u.alternate;h?(u.updateQueue=h.updateQueue,u.memoizedState=h.memoizedState,u.lanes=h.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=Am(o);if(p!==null){p.flags&=-257,Cm(p,o,a,s,e),p.mode&1&&Tm(s,c,e),e=p,l=c;var g=e.updateQueue;if(g===null){var _=new Set;_.add(l),e.updateQueue=_}else g.add(l);break e}else{if(!(e&1)){Tm(s,c,e),Zf();break e}l=Error(ae(426))}}else if(xt&&a.mode&1){var m=Am(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Cm(m,o,a,s,e),Lf(ao(l,a));break e}}s=l=ao(l,a),Ft!==4&&(Ft=2),na===null?na=[s]:na.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var f=n_(s,l,e);xm(s,f);break e;case 1:a=l;var v=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(vr===null||!vr.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=i_(s,a,e);xm(s,S);break e}}s=s.return}while(s!==null)}M_(t)}catch(R){e=R,It===t&&t!==null&&(It=t=t.return);continue}break}while(!0)}function y_(){var n=wc.current;return wc.current=Ec,n===null?Ec:n}function Zf(){(Ft===0||Ft===3||Ft===2)&&(Ft=4),Ht===null||!(is&268435455)&&!(Xc&268435455)||lr(Ht,Xt)}function Cc(n,e){var t=tt;tt|=2;var i=y_();(Ht!==n||Xt!==e)&&(Ii=null,Jr(n,e));do try{QS();break}catch(r){x_(n,r)}while(!0);if(If(),tt=t,wc.current=i,It!==null)throw Error(ae(261));return Ht=null,Xt=0,Ft}function QS(){for(;It!==null;)S_(It)}function eM(){for(;It!==null&&!Ty();)S_(It)}function S_(n){var e=w_(n.alternate,n,En);n.memoizedProps=n.pendingProps,e===null?M_(n):It=e,jf.current=null}function M_(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=qS(t,e),t!==null){t.flags&=32767,It=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Ft=6,It=null;return}}else if(t=jS(t,e,En),t!==null){It=t;return}if(e=e.sibling,e!==null){It=e;return}It=e=n}while(e!==null);Ft===0&&(Ft=5)}function kr(n,e,t){var i=ct,r=kn.transition;try{kn.transition=null,ct=1,tM(n,e,t,i)}finally{kn.transition=r,ct=i}return null}function tM(n,e,t,i){do Zs();while(hr!==null);if(tt&6)throw Error(ae(327));t=n.finishedWork;var r=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(ae(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(Uy(n,s),n===Ht&&(It=Ht=null,Xt=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||il||(il=!0,T_(lc,function(){return Zs(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=kn.transition,kn.transition=null;var o=ct;ct=1;var a=tt;tt|=4,jf.current=null,$S(n,t),g_(t,n),SS(qh),uc=!!jh,qh=jh=null,n.current=t,KS(t),Ay(),tt=a,ct=o,kn.transition=s}else n.current=t;if(il&&(il=!1,hr=n,Ac=r),s=n.pendingLanes,s===0&&(vr=null),by(t.stateNode),vn(n,bt()),e!==null)for(i=n.onRecoverableError,t=0;t<e.length;t++)r=e[t],i(r.value,{componentStack:r.stack,digest:r.digest});if(Tc)throw Tc=!1,n=fd,fd=null,n;return Ac&1&&n.tag!==0&&Zs(),s=n.pendingLanes,s&1?n===pd?ia++:(ia=0,pd=n):ia=0,Rr(),null}function Zs(){if(hr!==null){var n=nv(Ac),e=kn.transition,t=ct;try{if(kn.transition=null,ct=16>n?16:n,hr===null)var i=!1;else{if(n=hr,hr=null,Ac=0,tt&6)throw Error(ae(331));var r=tt;for(tt|=4,Ae=n.current;Ae!==null;){var s=Ae,o=s.child;if(Ae.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Ae=c;Ae!==null;){var u=Ae;switch(u.tag){case 0:case 11:case 15:ta(8,u,s)}var d=u.child;if(d!==null)d.return=u,Ae=d;else for(;Ae!==null;){u=Ae;var h=u.sibling,p=u.return;if(f_(u),u===c){Ae=null;break}if(h!==null){h.return=p,Ae=h;break}Ae=p}}}var g=s.alternate;if(g!==null){var _=g.child;if(_!==null){g.child=null;do{var m=_.sibling;_.sibling=null,_=m}while(_!==null)}}Ae=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Ae=o;else e:for(;Ae!==null;){if(s=Ae,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ta(9,s,s.return)}var f=s.sibling;if(f!==null){f.return=s.return,Ae=f;break e}Ae=s.return}}var v=n.current;for(Ae=v;Ae!==null;){o=Ae;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,Ae=x;else e:for(o=v;Ae!==null;){if(a=Ae,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Wc(9,a)}}catch(R){At(a,a.return,R)}if(a===o){Ae=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,Ae=S;break e}Ae=a.return}}if(tt=r,Rr(),gi&&typeof gi.onPostCommitFiberRoot=="function")try{gi.onPostCommitFiberRoot(Fc,n)}catch{}i=!0}return i}finally{ct=t,kn.transition=e}}return!1}function Bm(n,e,t){e=ao(t,e),e=n_(n,e,1),n=gr(n,e,1),e=sn(),n!==null&&(La(n,1,e),vn(n,e))}function At(n,e,t){if(n.tag===3)Bm(n,n,t);else for(;e!==null;){if(e.tag===3){Bm(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(vr===null||!vr.has(i))){n=ao(t,n),n=i_(e,n,1),e=gr(e,n,1),n=sn(),e!==null&&(La(e,1,n),vn(e,n));break}}e=e.return}}function nM(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),e=sn(),n.pingedLanes|=n.suspendedLanes&t,Ht===n&&(Xt&t)===t&&(Ft===4||Ft===3&&(Xt&130023424)===Xt&&500>bt()-Yf?Jr(n,0):qf|=t),vn(n,e)}function E_(n,e){e===0&&(n.mode&1?(e=qa,qa<<=1,!(qa&130023424)&&(qa=4194304)):e=1);var t=sn();n=Xi(n,e),n!==null&&(La(n,e,t),vn(n,t))}function iM(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),E_(n,t)}function rM(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,r=n.memoizedState;r!==null&&(t=r.retryLane);break;case 19:i=n.stateNode;break;default:throw Error(ae(314))}i!==null&&i.delete(e),E_(n,t)}var w_;w_=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||mn.current)pn=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return pn=!1,XS(n,e,t);pn=!!(n.flags&131072)}else pn=!1,xt&&e.flags&1048576&&Rv(e,vc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;ql(n,e),n=e.pendingProps;var r=io(e,en.current);Ks(e,t),r=Hf(null,e,i,n,r,t);var s=Vf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,gn(i)?(s=!0,mc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Ff(e),r.updater=Gc,e.stateNode=r,r._reactInternals=e,nd(e,i,n,t),e=sd(null,e,i,!0,s,t)):(e.tag=0,xt&&s&&bf(e),rn(null,e,r,t),e=e.child),e;case 16:i=e.elementType;e:{switch(ql(n,e),n=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=oM(i),n=Zn(i,n),r){case 0:e=rd(null,e,i,n,t);break e;case 1:e=Pm(null,e,i,n,t);break e;case 11:e=Rm(null,e,i,n,t);break e;case 14:e=bm(null,e,i,Zn(i.type,n),t);break e}throw Error(ae(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Zn(i,r),rd(n,e,i,r,t);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Zn(i,r),Pm(n,e,i,r,t);case 3:e:{if(a_(e),n===null)throw Error(ae(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Dv(n,e),yc(e,i,null,t);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=ao(Error(ae(423)),e),e=Lm(n,e,i,t,r);break e}else if(i!==r){r=ao(Error(ae(424)),e),e=Lm(n,e,i,t,r);break e}else for(An=mr(e.stateNode.containerInfo.firstChild),Cn=e,xt=!0,Qn=null,t=Nv(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ro(),i===r){e=ji(n,e,t);break e}rn(n,e,i,t)}e=e.child}return e;case 5:return Uv(e),n===null&&Qh(e),i=e.type,r=e.pendingProps,s=n!==null?n.memoizedProps:null,o=r.children,Yh(i,r)?o=null:s!==null&&Yh(i,s)&&(e.flags|=32),o_(n,e),rn(n,e,o,t),e.child;case 6:return n===null&&Qh(e),null;case 13:return l_(n,e,t);case 4:return Of(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=so(e,null,i,t):rn(n,e,i,t),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Zn(i,r),Rm(n,e,i,r,t);case 7:return rn(n,e,e.pendingProps,t),e.child;case 8:return rn(n,e,e.pendingProps.children,t),e.child;case 12:return rn(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,dt(_c,i._currentValue),i._currentValue=o,s!==null)if(oi(s.value,o)){if(s.children===r.children&&!mn.current){e=ji(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Hi(-1,t&-t),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),ed(s.return,t,e),a.lanes|=t;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ae(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),ed(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}rn(n,e,r.children,t),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Ks(e,t),r=Bn(r),i=i(r),e.flags|=1,rn(n,e,i,t),e.child;case 14:return i=e.type,r=Zn(i,e.pendingProps),r=Zn(i.type,r),bm(n,e,i,r,t);case 15:return r_(n,e,e.type,e.pendingProps,t);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Zn(i,r),ql(n,e),e.tag=1,gn(i)?(n=!0,mc(e)):n=!1,Ks(e,t),t_(e,i,r),nd(e,i,r,t),sd(null,e,i,!0,n,t);case 19:return c_(n,e,t);case 22:return s_(n,e,t)}throw Error(ae(156,e.tag))};function T_(n,e){return J0(n,e)}function sM(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function On(n,e,t,i){return new sM(n,e,t,i)}function Jf(n){return n=n.prototype,!(!n||!n.isReactComponent)}function oM(n){if(typeof n=="function")return Jf(n)?1:0;if(n!=null){if(n=n.$$typeof,n===vf)return 11;if(n===_f)return 14}return 2}function xr(n,e){var t=n.alternate;return t===null?(t=On(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function Kl(n,e,t,i,r,s){var o=2;if(i=n,typeof n=="function")Jf(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case Ns:return Qr(t.children,r,s,e);case gf:o=8,r|=8;break;case Ah:return n=On(12,t,e,r|2),n.elementType=Ah,n.lanes=s,n;case Ch:return n=On(13,t,e,r),n.elementType=Ch,n.lanes=s,n;case Rh:return n=On(19,t,e,r),n.elementType=Rh,n.lanes=s,n;case U0:return jc(t,r,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case I0:o=10;break e;case D0:o=9;break e;case vf:o=11;break e;case _f:o=14;break e;case sr:o=16,i=null;break e}throw Error(ae(130,n==null?n:typeof n,""))}return e=On(o,t,e,r),e.elementType=n,e.type=i,e.lanes=s,e}function Qr(n,e,t,i){return n=On(7,n,i,e),n.lanes=t,n}function jc(n,e,t,i){return n=On(22,n,i,e),n.elementType=U0,n.lanes=t,n.stateNode={isHidden:!1},n}function Nu(n,e,t){return n=On(6,n,null,e),n.lanes=t,n}function Iu(n,e,t){return e=On(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function aM(n,e,t,i,r){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=fu(0),this.expirationTimes=fu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fu(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Qf(n,e,t,i,r,s,o,a,l){return n=new aM(n,e,t,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=On(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ff(s),n}function lM(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ls,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}function A_(n){if(!n)return Er;n=n._reactInternals;e:{if(cs(n)!==n||n.tag!==1)throw Error(ae(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(gn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ae(171))}if(n.tag===1){var t=n.type;if(gn(t))return Av(n,t,e)}return e}function C_(n,e,t,i,r,s,o,a,l){return n=Qf(t,i,!0,n,r,s,o,a,l),n.context=A_(null),t=n.current,i=sn(),r=_r(t),s=Hi(i,r),s.callback=e??null,gr(t,s,r),n.current.lanes=r,La(n,r,i),vn(n,i),n}function qc(n,e,t,i){var r=e.current,s=sn(),o=_r(r);return t=A_(t),e.context===null?e.context=t:e.pendingContext=t,e=Hi(s,o),e.payload={element:n},i=i===void 0?null:i,i!==null&&(e.callback=i),n=gr(r,e,o),n!==null&&(si(n,r,o,s),Wl(n,r,o)),o}function Rc(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Hm(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function ep(n,e){Hm(n,e),(n=n.alternate)&&Hm(n,e)}function cM(){return null}var R_=typeof reportError=="function"?reportError:function(n){console.error(n)};function tp(n){this._internalRoot=n}Yc.prototype.render=tp.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(ae(409));qc(n,e,null,null)};Yc.prototype.unmount=tp.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;rs(function(){qc(null,n,null,null)}),e[Wi]=null}};function Yc(n){this._internalRoot=n}Yc.prototype.unstable_scheduleHydration=function(n){if(n){var e=sv();n={blockedOn:null,target:n,priority:e};for(var t=0;t<ar.length&&e!==0&&e<ar[t].priority;t++);ar.splice(t,0,n),t===0&&av(n)}};function np(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function $c(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Vm(){}function uM(n,e,t,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Rc(o);s.call(c)}}var o=C_(e,i,n,0,null,!1,!1,"",Vm);return n._reactRootContainer=o,n[Wi]=o.current,ga(n.nodeType===8?n.parentNode:n),rs(),o}for(;r=n.lastChild;)n.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Rc(l);a.call(c)}}var l=Qf(n,0,!1,null,null,!1,!1,"",Vm);return n._reactRootContainer=l,n[Wi]=l.current,ga(n.nodeType===8?n.parentNode:n),rs(function(){qc(e,l,t,i)}),l}function Kc(n,e,t,i,r){var s=t._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Rc(o);a.call(l)}}qc(e,o,n,r)}else o=uM(t,e,n,r,i);return Rc(o)}iv=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=Xo(e.pendingLanes);t!==0&&(Sf(e,t|1),vn(e,bt()),!(tt&6)&&(lo=bt()+500,Rr()))}break;case 13:rs(function(){var i=Xi(n,1);if(i!==null){var r=sn();si(i,n,1,r)}}),ep(n,1)}};Mf=function(n){if(n.tag===13){var e=Xi(n,134217728);if(e!==null){var t=sn();si(e,n,134217728,t)}ep(n,134217728)}};rv=function(n){if(n.tag===13){var e=_r(n),t=Xi(n,e);if(t!==null){var i=sn();si(t,n,e,i)}ep(n,e)}};sv=function(){return ct};ov=function(n,e){var t=ct;try{return ct=n,e()}finally{ct=t}};zh=function(n,e,t){switch(e){case"input":if(Lh(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var r=Bc(i);if(!r)throw Error(ae(90));O0(i),Lh(i,r)}}}break;case"textarea":k0(n,t);break;case"select":e=t.value,e!=null&&js(n,!!t.multiple,e,!1)}};j0=$f;q0=rs;var hM={usingClientEntryPoint:!1,Events:[Ia,Fs,Bc,W0,X0,$f]},bo={findFiberByHostInstance:qr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},dM={bundleType:bo.bundleType,version:bo.version,rendererPackageName:bo.rendererPackageName,rendererConfig:bo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Yi.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=K0(n),n===null?null:n.stateNode},findFiberByHostInstance:bo.findFiberByHostInstance||cM,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var rl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rl.isDisabled&&rl.supportsFiber)try{Fc=rl.inject(dM),gi=rl}catch{}}bn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=hM;bn.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!np(e))throw Error(ae(200));return lM(n,e,null,t)};bn.createRoot=function(n,e){if(!np(n))throw Error(ae(299));var t=!1,i="",r=R_;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Qf(n,1,!1,null,null,t,!1,i,r),n[Wi]=e.current,ga(n.nodeType===8?n.parentNode:n),new tp(e)};bn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(ae(188)):(n=Object.keys(n).join(","),Error(ae(268,n)));return n=K0(e),n=n===null?null:n.stateNode,n};bn.flushSync=function(n){return rs(n)};bn.hydrate=function(n,e,t){if(!$c(e))throw Error(ae(200));return Kc(null,n,e,!0,t)};bn.hydrateRoot=function(n,e,t){if(!np(n))throw Error(ae(405));var i=t!=null&&t.hydratedSources||null,r=!1,s="",o=R_;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=C_(e,null,n,1,t??null,r,!1,s,o),n[Wi]=e.current,ga(n),i)for(n=0;n<i.length;n++)t=i[n],r=t._getVersion,r=r(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r);return new Yc(e)};bn.render=function(n,e,t){if(!$c(e))throw Error(ae(200));return Kc(null,n,e,!1,t)};bn.unmountComponentAtNode=function(n){if(!$c(n))throw Error(ae(40));return n._reactRootContainer?(rs(function(){Kc(null,null,n,!1,function(){n._reactRootContainer=null,n[Wi]=null})}),!0):!1};bn.unstable_batchedUpdates=$f;bn.unstable_renderSubtreeIntoContainer=function(n,e,t,i){if(!$c(t))throw Error(ae(200));if(n==null||n._reactInternals===void 0)throw Error(ae(38));return Kc(n,e,t,!1,i)};bn.version="18.3.1-next-f1338f8080-20240426";function b_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b_)}catch(n){console.error(n)}}b_(),b0.exports=bn;var fM=b0.exports,P_,Gm=fM;P_=Gm.createRoot,Gm.hydrateRoot;const Wm={munition:"Shahed-136-class OWA loitering munition",operation:"Operation True Promise IV"},Xn={id:"launch-iran",name:"Bandar Abbas, Iran (Hormozgan)",short:"LAUNCH · BANDAR ABBAS",lon:56.2892533,lat:27.1842023,height:12,note:"OWA staging origin at Bandar Abbas, Hormozgan Province, Iran. Shahed-136-class one-way-attack munitions launched on a south-westerly great-circle heading across the Strait of Hormuz and the southern Gulf toward Dubai.",accent:"#ff453a"},Xm={lat:25.453046,lon:55.51106},Ye={id:"warda",name:"Jenna Apartments (Warda), Al Warqa, Dubai",short:"JENNA / WARDA",lon:55.4045442,lat:25.1857908,height:14,role:"Residential",address:"Jenna Apartments (Warda), Al Warqa'a 1, Al Warqa, Dubai, UAE",plusCode:"5MJP+",postcode:"",geocode:{lat:25.1857908,lon:55.4045442,source:"reverse-geocode (resolved, Al Warqa’a 1)"},analystContext:{timezone:"Asia/Dubai (+04:00)",region:"Dubai Emirate",isoRegion:"AE-DU"},casualties:{kia:0,wounded:0},note:"Residential strike at the Jenna Apartments (Warda) block in Al Warqa, Dubai. Reconstruction shows a Shahed-136 terminal nose-down dive onto the building.",accent:"#af52de"},Di={cruiseAltM:2400,cruiseSpeedKmh:185,waypoints:[{id:"WP1",name:"Bandar Abbas (launch)",lat:27.1842023,lon:56.2892533,legOrder:1,phase:"Launch",note:"Bandar Abbas, Hormozgan — OWA release, climb to cruise."},{id:"WP2",name:"Strait of Hormuz",lat:26.566,lon:56.247,legOrder:2,phase:"Ingress",note:"Crosses the Strait of Hormuz chokepoint at cruise altitude."},{id:"WP3",name:"Southern Gulf",lat:25.98,lon:55.95,legOrder:3,phase:"Transit",note:"Mid-Gulf transit leg, terrain-masking over open water."},{id:"WP4",name:"UAE Coast-In",lat:25.52,lon:55.56,legOrder:4,phase:"Coast-in",note:"Feet-dry over the Sharjah/Dubai littoral."},{id:"WP5",name:"Terminal Approach",lat:25.3,lon:55.47,legOrder:5,phase:"Terminal",note:"Descent and terminal run-in toward Al Warqa, Dubai."},{id:"WP6",name:"Jenna/Warda (impact)",lat:25.1857908,lon:55.4045442,legOrder:6,phase:"Impact",note:"Terminal nose-down dive onto Jenna Apartments (Warda), Al Warqa’a 1, Dubai."}]};(function(){const e=[[56.2892533,27.1842023],[56.247,26.566],[55.95,25.98],[55.56,25.52],[55.47,25.3],[55.4045442,25.1857908]],t=[],i=24;for(let r=0;r<e.length-1;r++){const[s,o]=e[r],[a,l]=e[r+1];for(let c=0;c<i;c++){const u=c/i;t.push([s+(a-s)*u,o+(l-o)*u])}}return t.push(e[e.length-1]),t})();(function(){const e=[[55.56,25.45],[55.49,25.36],[55.45,25.28],[55.42,25.22],[55.4045442,25.1857908],[55.34,25.08],[55.27,24.98],[55.2,24.88]],t=[],r=Math.floor(120/(e.length-1));for(let a=0;a<e.length-1;a++){const[l,c]=e[a],[u,d]=e[a+1];for(let h=0;h<r;h++){const p=h/r,g=.006*Math.sin(p*Math.PI*2+a);t.push([l+(u-l)*p+g,c+(d-c)*p])}}t.push(e[e.length-1]);const s=121,o=[];for(let a=0;a<s;a++){const l=a/(s-1)*(t.length-1),c=Math.min(t.length-2,Math.floor(l)),u=l-c;o.push([t[c][0]+(t[c+1][0]-t[c][0])*u,t[c][1]+(t[c+1][1]-t[c][1])*u])}return o})();function jm(){return Di.waypoints.map(n=>[n.lon,n.lat])}const nn={radiusKm:66.7,radiusM:66700,centerLon:Ye.lon,centerLat:Ye.lat,earlierWarningMin:8.2,earlierWarningNote:"A 66.7 km endurance-derived geofence tripwire yields +8.2 minutes of additional early warning versus point-defence cueing alone — time enough to launch DiaB overwatch (<60 s) and cue interceptors."};(function(){const e=Ye.lon,t=Ye.lat,i=66.7,r=i/111,s=i/(111*Math.cos(t*Math.PI/180)),o=[];for(let a=0;a<=360;a+=6){const l=a*Math.PI/180,c=1+.04*Math.sin(3*l)-.03*Math.cos(2*l);o.push([e+s*c*Math.cos(l),t+r*c*Math.sin(l)])}return{type:"MultiPolygon",coordinates:[[o]]}})();const ip=[{lat:25.02413,lon:55.08971,brightTi4:315.33,acqDate:"2026-06-22",acqTime:"2155",frp:1.05,daynight:"N"},{lat:25.29588,lon:55.61697,brightTi4:315.82,acqDate:"2026-06-22",acqTime:"2155",frp:1.58,daynight:"N"},{lat:24.97314,lon:55.62793,brightTi4:322.69,acqDate:"2026-06-24",acqTime:"2121",frp:1.73,daynight:"N"},{lat:24.97403,lon:55.63094,brightTi4:317.34,acqDate:"2026-06-24",acqTime:"2301",frp:2.27,daynight:"N"},{lat:24.97419,lon:55.6271,brightTi4:312.46,acqDate:"2026-06-24",acqTime:"2301",frp:2.71,daynight:"N"},{lat:24.75826,lon:55.49352,brightTi4:338.02,acqDate:"2026-06-25",acqTime:"0835",frp:4.53,daynight:"D"},{lat:24.973,lon:55.63183,brightTi4:344.49,acqDate:"2026-06-25",acqTime:"1013",frp:8.89,daynight:"D"},{lat:24.96994,lon:55.62728,brightTi4:318.35,acqDate:"2026-06-25",acqTime:"2059",frp:2.89,daynight:"N"},{lat:24.97339,lon:55.629,brightTi4:318.07,acqDate:"2026-06-25",acqTime:"2059",frp:4.5,daynight:"N"},{lat:24.973,lon:55.62851,brightTi4:329.08,acqDate:"2026-06-25",acqTime:"2240",frp:3.24,daynight:"N"}];function L_(n=ip){const i=new Map;n.forEach(l=>{const c=`${l.lat.toFixed(2)},${l.lon.toFixed(2)}`;i.has(c)||i.set(c,[]),i.get(c).push(l)});const r=n.map((l,c)=>{const u=`${l.lat.toFixed(2)},${l.lon.toFixed(2)}`,d=i.get(u).length,h=l.frp>=4||d>=3;return{...l,idx:c,clusterN:d,suspicious:h,severity:l.frp>=8?"CRITICAL":l.frp>=4?"HIGH":d>=3?"ELEVATED":"NOMINAL"}}),s=r.reduce((l,c)=>c.frp>l.frp?c:l,r[0]),o=r.filter(l=>l.suspicious).length;let a=null;return i.forEach((l,c)=>{if(!a||l.length>a.n){const u=l.reduce((h,p)=>h+p.lat,0)/l.length,d=l.reduce((h,p)=>h+p.lon,0)/l.length;a={key:c,n:l.length,lat:u,lon:d,peakFrp:Math.max(...l.map(h=>h.frp))}}}),{alerts:r,peak:s,flagged:o,total:n.length,topCluster:a,CLUSTER_M:1500}}const qm={uaeMod:{dronesDetected:941,fellInUaeTerritory:65}},Ps={droneHero:"/imagery/alwarqa-3d.png",heroVariations:["/imagery/alwarqa-2d.png","/imagery/dubai-3d.png","/imagery/alwarqa-3d.png"],heroLabels:["Top-down 2D (impact)","Dubai 3D corridor","Terminal approach"],backdrop:{groundOverlay:"/imagery/dubai-2d.png",dubai3d:"/imagery/dubai-3d.png",launchArea:"/imagery/bandar-abbas-3d.png",corridorMid:"/imagery/gulf-midpoint-3d.png"}},Du={ballisticMissiles:189,owaDrones:941,durationDays:5},pM=[{id:"launch",name:"Launch Site",icon:"launch",hint:"Locked on the Iran launch site at OWA release."},{id:"orbit",name:"Orbit",icon:"orbit",hint:"Cinematic orbit around the live munition."},{id:"chase",name:"Chase",icon:"chase",hint:"Tail-chase camera riding behind the drone."},{id:"topdown",name:"Top-Down",icon:"topdown",hint:"Map-style nadir tracking of the corridor."},{id:"freefly",name:"Free-Fly",icon:"freefly",hint:"Unlocked free-orbit manual camera."},{id:"thermal",name:"Thermal/IR",icon:"thermal",hint:"EO/IR heat-signature mode (VIIRS-driven)."},{id:"impact",name:"Impact",icon:"impact",hint:"Locked on the Warda Apartments impact point."},{id:"cinema",name:"Cinematic",icon:"cinema",hint:"Auto-cut director camera across the corridor."}],mM={flightSeconds:48};class ni{constructor(e){e===void 0&&(e=[0,0,0,0,0,0,0,0,0]),this.elements=e}identity(){const e=this.elements;e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1}setZero(){const e=this.elements;e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0}setTrace(e){const t=this.elements;t[0]=e.x,t[4]=e.y,t[8]=e.z}getTrace(e){e===void 0&&(e=new T);const t=this.elements;return e.x=t[0],e.y=t[4],e.z=t[8],e}vmult(e,t){t===void 0&&(t=new T);const i=this.elements,r=e.x,s=e.y,o=e.z;return t.x=i[0]*r+i[1]*s+i[2]*o,t.y=i[3]*r+i[4]*s+i[5]*o,t.z=i[6]*r+i[7]*s+i[8]*o,t}smult(e){for(let t=0;t<this.elements.length;t++)this.elements[t]*=e}mmult(e,t){t===void 0&&(t=new ni);const i=this.elements,r=e.elements,s=t.elements,o=i[0],a=i[1],l=i[2],c=i[3],u=i[4],d=i[5],h=i[6],p=i[7],g=i[8],_=r[0],m=r[1],f=r[2],v=r[3],x=r[4],S=r[5],R=r[6],A=r[7],w=r[8];return s[0]=o*_+a*v+l*R,s[1]=o*m+a*x+l*A,s[2]=o*f+a*S+l*w,s[3]=c*_+u*v+d*R,s[4]=c*m+u*x+d*A,s[5]=c*f+u*S+d*w,s[6]=h*_+p*v+g*R,s[7]=h*m+p*x+g*A,s[8]=h*f+p*S+g*w,t}scale(e,t){t===void 0&&(t=new ni);const i=this.elements,r=t.elements;for(let s=0;s!==3;s++)r[3*s+0]=e.x*i[3*s+0],r[3*s+1]=e.y*i[3*s+1],r[3*s+2]=e.z*i[3*s+2];return t}solve(e,t){t===void 0&&(t=new T);const i=3,r=4,s=[];let o,a;for(o=0;o<i*r;o++)s.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)s[o+r*a]=this.elements[o+3*a];s[3+4*0]=e.x,s[3+4*1]=e.y,s[3+4*2]=e.z;let l=3;const c=l;let u;const d=4;let h;do{if(o=c-l,s[o+r*o]===0){for(a=o+1;a<c;a++)if(s[o+r*a]!==0){u=d;do h=d-u,s[h+r*o]+=s[h+r*a];while(--u);break}}if(s[o+r*o]!==0)for(a=o+1;a<c;a++){const p=s[o+r*a]/s[o+r*o];u=d;do h=d-u,s[h+r*a]=h<=o?0:s[h+r*a]-s[h+r*o]*p;while(--u)}}while(--l);if(t.z=s[2*r+3]/s[2*r+2],t.y=(s[1*r+3]-s[1*r+2]*t.z)/s[1*r+1],t.x=(s[0*r+3]-s[0*r+2]*t.z-s[0*r+1]*t.y)/s[0*r+0],isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||t.x===1/0||t.y===1/0||t.z===1/0)throw`Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;return t}e(e,t,i){if(i===void 0)return this.elements[t+3*e];this.elements[t+3*e]=i}copy(e){for(let t=0;t<e.elements.length;t++)this.elements[t]=e.elements[t];return this}toString(){let e="";const t=",";for(let i=0;i<9;i++)e+=this.elements[i]+t;return e}reverse(e){e===void 0&&(e=new ni);const t=3,i=6,r=gM;let s,o;for(s=0;s<3;s++)for(o=0;o<3;o++)r[s+i*o]=this.elements[s+3*o];r[3+6*0]=1,r[3+6*1]=0,r[3+6*2]=0,r[4+6*0]=0,r[4+6*1]=1,r[4+6*2]=0,r[5+6*0]=0,r[5+6*1]=0,r[5+6*2]=1;let a=3;const l=a;let c;const u=i;let d;do{if(s=l-a,r[s+i*s]===0){for(o=s+1;o<l;o++)if(r[s+i*o]!==0){c=u;do d=u-c,r[d+i*s]+=r[d+i*o];while(--c);break}}if(r[s+i*s]!==0)for(o=s+1;o<l;o++){const h=r[s+i*o]/r[s+i*s];c=u;do d=u-c,r[d+i*o]=d<=s?0:r[d+i*o]-r[d+i*s]*h;while(--c)}}while(--a);s=2;do{o=s-1;do{const h=r[s+i*o]/r[s+i*s];c=i;do d=i-c,r[d+i*o]=r[d+i*o]-r[d+i*s]*h;while(--c)}while(o--)}while(--s);s=2;do{const h=1/r[s+i*s];c=i;do d=i-c,r[d+i*s]=r[d+i*s]*h;while(--c)}while(s--);s=2;do{o=2;do{if(d=r[t+o+i*s],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;e.e(s,o,d)}while(o--)}while(s--);return e}setRotationFromQuaternion(e){const t=e.x,i=e.y,r=e.z,s=e.w,o=t+t,a=i+i,l=r+r,c=t*o,u=t*a,d=t*l,h=i*a,p=i*l,g=r*l,_=s*o,m=s*a,f=s*l,v=this.elements;return v[3*0+0]=1-(h+g),v[3*0+1]=u-f,v[3*0+2]=d+m,v[3*1+0]=u+f,v[3*1+1]=1-(c+g),v[3*1+2]=p-_,v[3*2+0]=d-m,v[3*2+1]=p+_,v[3*2+2]=1-(c+h),this}transpose(e){e===void 0&&(e=new ni);const t=this.elements,i=e.elements;let r;return i[0]=t[0],i[4]=t[4],i[8]=t[8],r=t[1],i[1]=t[3],i[3]=r,r=t[2],i[2]=t[6],i[6]=r,r=t[5],i[5]=t[7],i[7]=r,e}}const gM=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class T{constructor(e,t,i){e===void 0&&(e=0),t===void 0&&(t=0),i===void 0&&(i=0),this.x=e,this.y=t,this.z=i}cross(e,t){t===void 0&&(t=new T);const i=e.x,r=e.y,s=e.z,o=this.x,a=this.y,l=this.z;return t.x=a*s-l*r,t.y=l*i-o*s,t.z=o*r-a*i,t}set(e,t,i){return this.x=e,this.y=t,this.z=i,this}setZero(){this.x=this.y=this.z=0}vadd(e,t){if(t)t.x=e.x+this.x,t.y=e.y+this.y,t.z=e.z+this.z;else return new T(this.x+e.x,this.y+e.y,this.z+e.z)}vsub(e,t){if(t)t.x=this.x-e.x,t.y=this.y-e.y,t.z=this.z-e.z;else return new T(this.x-e.x,this.y-e.y,this.z-e.z)}crossmat(){return new ni([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const e=this.x,t=this.y,i=this.z,r=Math.sqrt(e*e+t*t+i*i);if(r>0){const s=1/r;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return r}unit(e){e===void 0&&(e=new T);const t=this.x,i=this.y,r=this.z;let s=Math.sqrt(t*t+i*i+r*r);return s>0?(s=1/s,e.x=t*s,e.y=i*s,e.z=r*s):(e.x=1,e.y=0,e.z=0),e}length(){const e=this.x,t=this.y,i=this.z;return Math.sqrt(e*e+t*t+i*i)}lengthSquared(){return this.dot(this)}distanceTo(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z;return Math.sqrt((s-t)*(s-t)+(o-i)*(o-i)+(a-r)*(a-r))}distanceSquared(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z;return(s-t)*(s-t)+(o-i)*(o-i)+(a-r)*(a-r)}scale(e,t){t===void 0&&(t=new T);const i=this.x,r=this.y,s=this.z;return t.x=e*i,t.y=e*r,t.z=e*s,t}vmul(e,t){return t===void 0&&(t=new T),t.x=e.x*this.x,t.y=e.y*this.y,t.z=e.z*this.z,t}addScaledVector(e,t,i){return i===void 0&&(i=new T),i.x=this.x+e*t.x,i.y=this.y+e*t.y,i.z=this.z+e*t.z,i}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(e){return e===void 0&&(e=new T),e.x=-this.x,e.y=-this.y,e.z=-this.z,e}tangents(e,t){const i=this.length();if(i>0){const r=vM,s=1/i;r.set(this.x*s,this.y*s,this.z*s);const o=_M;Math.abs(r.x)<.9?(o.set(1,0,0),r.cross(o,e)):(o.set(0,1,0),r.cross(o,e)),r.cross(e,t)}else e.set(1,0,0),t.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}lerp(e,t,i){const r=this.x,s=this.y,o=this.z;i.x=r+(e.x-r)*t,i.y=s+(e.y-s)*t,i.z=o+(e.z-o)*t}almostEquals(e,t){return t===void 0&&(t=1e-6),!(Math.abs(this.x-e.x)>t||Math.abs(this.y-e.y)>t||Math.abs(this.z-e.z)>t)}almostZero(e){return e===void 0&&(e=1e-6),!(Math.abs(this.x)>e||Math.abs(this.y)>e||Math.abs(this.z)>e)}isAntiparallelTo(e,t){return this.negate(Ym),Ym.almostEquals(e,t)}clone(){return new T(this.x,this.y,this.z)}}T.ZERO=new T(0,0,0);T.UNIT_X=new T(1,0,0);T.UNIT_Y=new T(0,1,0);T.UNIT_Z=new T(0,0,1);const vM=new T,_M=new T,Ym=new T;class Ln{constructor(e){e===void 0&&(e={}),this.lowerBound=new T,this.upperBound=new T,e.lowerBound&&this.lowerBound.copy(e.lowerBound),e.upperBound&&this.upperBound.copy(e.upperBound)}setFromPoints(e,t,i,r){const s=this.lowerBound,o=this.upperBound,a=i;s.copy(e[0]),a&&a.vmult(s,s),o.copy(s);for(let l=1;l<e.length;l++){let c=e[l];a&&(a.vmult(c,$m),c=$m),c.x>o.x&&(o.x=c.x),c.x<s.x&&(s.x=c.x),c.y>o.y&&(o.y=c.y),c.y<s.y&&(s.y=c.y),c.z>o.z&&(o.z=c.z),c.z<s.z&&(s.z=c.z)}return t&&(t.vadd(s,s),t.vadd(o,o)),r&&(s.x-=r,s.y-=r,s.z-=r,o.x+=r,o.y+=r,o.z+=r),this}copy(e){return this.lowerBound.copy(e.lowerBound),this.upperBound.copy(e.upperBound),this}clone(){return new Ln().copy(this)}extend(e){this.lowerBound.x=Math.min(this.lowerBound.x,e.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,e.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,e.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,e.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,e.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,e.upperBound.z)}overlaps(e){const t=this.lowerBound,i=this.upperBound,r=e.lowerBound,s=e.upperBound,o=r.x<=i.x&&i.x<=s.x||t.x<=s.x&&s.x<=i.x,a=r.y<=i.y&&i.y<=s.y||t.y<=s.y&&s.y<=i.y,l=r.z<=i.z&&i.z<=s.z||t.z<=s.z&&s.z<=i.z;return o&&a&&l}volume(){const e=this.lowerBound,t=this.upperBound;return(t.x-e.x)*(t.y-e.y)*(t.z-e.z)}contains(e){const t=this.lowerBound,i=this.upperBound,r=e.lowerBound,s=e.upperBound;return t.x<=r.x&&i.x>=s.x&&t.y<=r.y&&i.y>=s.y&&t.z<=r.z&&i.z>=s.z}getCorners(e,t,i,r,s,o,a,l){const c=this.lowerBound,u=this.upperBound;e.copy(c),t.set(u.x,c.y,c.z),i.set(u.x,u.y,c.z),r.set(c.x,u.y,u.z),s.set(u.x,c.y,u.z),o.set(c.x,u.y,c.z),a.set(c.x,c.y,u.z),l.copy(u)}toLocalFrame(e,t){const i=Km,r=i[0],s=i[1],o=i[2],a=i[3],l=i[4],c=i[5],u=i[6],d=i[7];this.getCorners(r,s,o,a,l,c,u,d);for(let h=0;h!==8;h++){const p=i[h];e.pointToLocal(p,p)}return t.setFromPoints(i)}toWorldFrame(e,t){const i=Km,r=i[0],s=i[1],o=i[2],a=i[3],l=i[4],c=i[5],u=i[6],d=i[7];this.getCorners(r,s,o,a,l,c,u,d);for(let h=0;h!==8;h++){const p=i[h];e.pointToWorld(p,p)}return t.setFromPoints(i)}overlapsRay(e){const{direction:t,from:i}=e,r=1/t.x,s=1/t.y,o=1/t.z,a=(this.lowerBound.x-i.x)*r,l=(this.upperBound.x-i.x)*r,c=(this.lowerBound.y-i.y)*s,u=(this.upperBound.y-i.y)*s,d=(this.lowerBound.z-i.z)*o,h=(this.upperBound.z-i.z)*o,p=Math.max(Math.max(Math.min(a,l),Math.min(c,u)),Math.min(d,h)),g=Math.min(Math.min(Math.max(a,l),Math.max(c,u)),Math.max(d,h));return!(g<0||p>g)}}const $m=new T,Km=[new T,new T,new T,new T,new T,new T,new T,new T];class Zm{constructor(){this.matrix=[]}get(e,t){let{index:i}=e,{index:r}=t;if(r>i){const s=r;r=i,i=s}return this.matrix[(i*(i+1)>>1)+r-1]}set(e,t,i){let{index:r}=e,{index:s}=t;if(s>r){const o=s;s=r,r=o}this.matrix[(r*(r+1)>>1)+s-1]=i?1:0}reset(){for(let e=0,t=this.matrix.length;e!==t;e++)this.matrix[e]=0}setNumObjects(e){this.matrix.length=e*(e-1)>>1}}class N_{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;return i[e]===void 0&&(i[e]=[]),i[e].includes(t)||i[e].push(t),this}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return!!(i[e]!==void 0&&i[e].includes(t))}hasAnyEventListener(e){return this._listeners===void 0?!1:this._listeners[e]!==void 0}removeEventListener(e,t){if(this._listeners===void 0)return this;const i=this._listeners;if(i[e]===void 0)return this;const r=i[e].indexOf(t);return r!==-1&&i[e].splice(r,1),this}dispatchEvent(e){if(this._listeners===void 0)return this;const i=this._listeners[e.type];if(i!==void 0){e.target=this;for(let r=0,s=i.length;r<s;r++)i[r].call(this,e)}return this}}let Tn=class Br{constructor(e,t,i,r){e===void 0&&(e=0),t===void 0&&(t=0),i===void 0&&(i=0),r===void 0&&(r=1),this.x=e,this.y=t,this.z=i,this.w=r}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(e,t){const i=Math.sin(t*.5);return this.x=e.x*i,this.y=e.y*i,this.z=e.z*i,this.w=Math.cos(t*.5),this}toAxisAngle(e){e===void 0&&(e=new T),this.normalize();const t=2*Math.acos(this.w),i=Math.sqrt(1-this.w*this.w);return i<.001?(e.x=this.x,e.y=this.y,e.z=this.z):(e.x=this.x/i,e.y=this.y/i,e.z=this.z/i),[e,t]}setFromVectors(e,t){if(e.isAntiparallelTo(t)){const i=xM,r=yM;e.tangents(i,r),this.setFromAxisAngle(i,Math.PI)}else{const i=e.cross(t);this.x=i.x,this.y=i.y,this.z=i.z,this.w=Math.sqrt(e.length()**2*t.length()**2)+e.dot(t),this.normalize()}return this}mult(e,t){t===void 0&&(t=new Br);const i=this.x,r=this.y,s=this.z,o=this.w,a=e.x,l=e.y,c=e.z,u=e.w;return t.x=i*u+o*a+r*c-s*l,t.y=r*u+o*l+s*a-i*c,t.z=s*u+o*c+i*l-r*a,t.w=o*u-i*a-r*l-s*c,t}inverse(e){e===void 0&&(e=new Br);const t=this.x,i=this.y,r=this.z,s=this.w;this.conjugate(e);const o=1/(t*t+i*i+r*r+s*s);return e.x*=o,e.y*=o,e.z*=o,e.w*=o,e}conjugate(e){return e===void 0&&(e=new Br),e.x=-this.x,e.y=-this.y,e.z=-this.z,e.w=this.w,e}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(e=1/e,this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}normalizeFast(){const e=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}vmult(e,t){t===void 0&&(t=new T);const i=e.x,r=e.y,s=e.z,o=this.x,a=this.y,l=this.z,c=this.w,u=c*i+a*s-l*r,d=c*r+l*i-o*s,h=c*s+o*r-a*i,p=-o*i-a*r-l*s;return t.x=u*c+p*-o+d*-l-h*-a,t.y=d*c+p*-a+h*-o-u*-l,t.z=h*c+p*-l+u*-a-d*-o,t}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}toEuler(e,t){t===void 0&&(t="YZX");let i,r,s;const o=this.x,a=this.y,l=this.z,c=this.w;switch(t){case"YZX":const u=o*a+l*c;if(u>.499&&(i=2*Math.atan2(o,c),r=Math.PI/2,s=0),u<-.499&&(i=-2*Math.atan2(o,c),r=-Math.PI/2,s=0),i===void 0){const d=o*o,h=a*a,p=l*l;i=Math.atan2(2*a*c-2*o*l,1-2*h-2*p),r=Math.asin(2*u),s=Math.atan2(2*o*c-2*a*l,1-2*d-2*p)}break;default:throw new Error(`Euler order ${t} not supported yet.`)}e.y=i,e.z=r,e.x=s}setFromEuler(e,t,i,r){r===void 0&&(r="XYZ");const s=Math.cos(e/2),o=Math.cos(t/2),a=Math.cos(i/2),l=Math.sin(e/2),c=Math.sin(t/2),u=Math.sin(i/2);return r==="XYZ"?(this.x=l*o*a+s*c*u,this.y=s*c*a-l*o*u,this.z=s*o*u+l*c*a,this.w=s*o*a-l*c*u):r==="YXZ"?(this.x=l*o*a+s*c*u,this.y=s*c*a-l*o*u,this.z=s*o*u-l*c*a,this.w=s*o*a+l*c*u):r==="ZXY"?(this.x=l*o*a-s*c*u,this.y=s*c*a+l*o*u,this.z=s*o*u+l*c*a,this.w=s*o*a-l*c*u):r==="ZYX"?(this.x=l*o*a-s*c*u,this.y=s*c*a+l*o*u,this.z=s*o*u-l*c*a,this.w=s*o*a+l*c*u):r==="YZX"?(this.x=l*o*a+s*c*u,this.y=s*c*a+l*o*u,this.z=s*o*u-l*c*a,this.w=s*o*a-l*c*u):r==="XZY"&&(this.x=l*o*a-s*c*u,this.y=s*c*a-l*o*u,this.z=s*o*u+l*c*a,this.w=s*o*a+l*c*u),this}clone(){return new Br(this.x,this.y,this.z,this.w)}slerp(e,t,i){i===void 0&&(i=new Br);const r=this.x,s=this.y,o=this.z,a=this.w;let l=e.x,c=e.y,u=e.z,d=e.w,h,p,g,_,m;return p=r*l+s*c+o*u+a*d,p<0&&(p=-p,l=-l,c=-c,u=-u,d=-d),1-p>1e-6?(h=Math.acos(p),g=Math.sin(h),_=Math.sin((1-t)*h)/g,m=Math.sin(t*h)/g):(_=1-t,m=t),i.x=_*r+m*l,i.y=_*s+m*c,i.z=_*o+m*u,i.w=_*a+m*d,i}integrate(e,t,i,r){r===void 0&&(r=new Br);const s=e.x*i.x,o=e.y*i.y,a=e.z*i.z,l=this.x,c=this.y,u=this.z,d=this.w,h=t*.5;return r.x+=h*(s*d+o*u-a*c),r.y+=h*(o*d+a*l-s*u),r.z+=h*(a*d+s*c-o*l),r.w+=h*(-s*l-o*c-a*u),r}};const xM=new T,yM=new T,SM={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};let Pe=class I_{constructor(e){e===void 0&&(e={}),this.id=I_.idCounter++,this.type=e.type||0,this.boundingSphereRadius=0,this.collisionResponse=e.collisionResponse?e.collisionResponse:!0,this.collisionFilterGroup=e.collisionFilterGroup!==void 0?e.collisionFilterGroup:1,this.collisionFilterMask=e.collisionFilterMask!==void 0?e.collisionFilterMask:-1,this.material=e.material?e.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(e,t){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(e,t,i,r){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}};Pe.idCounter=0;Pe.types=SM;class rt{constructor(e){e===void 0&&(e={}),this.position=new T,this.quaternion=new Tn,e.position&&this.position.copy(e.position),e.quaternion&&this.quaternion.copy(e.quaternion)}pointToLocal(e,t){return rt.pointToLocalFrame(this.position,this.quaternion,e,t)}pointToWorld(e,t){return rt.pointToWorldFrame(this.position,this.quaternion,e,t)}vectorToWorldFrame(e,t){return t===void 0&&(t=new T),this.quaternion.vmult(e,t),t}static pointToLocalFrame(e,t,i,r){return r===void 0&&(r=new T),i.vsub(e,r),t.conjugate(Jm),Jm.vmult(r,r),r}static pointToWorldFrame(e,t,i,r){return r===void 0&&(r=new T),t.vmult(i,r),r.vadd(e,r),r}static vectorToWorldFrame(e,t,i){return i===void 0&&(i=new T),e.vmult(t,i),i}static vectorToLocalFrame(e,t,i,r){return r===void 0&&(r=new T),t.w*=-1,t.vmult(i,r),t.w*=-1,r}}const Jm=new Tn;class ra extends Pe{constructor(e){e===void 0&&(e={});const{vertices:t=[],faces:i=[],normals:r=[],axes:s,boundingSphereRadius:o}=e;super({type:Pe.types.CONVEXPOLYHEDRON}),this.vertices=t,this.faces=i,this.faceNormals=r,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const e=this.faces,t=this.vertices,i=this.uniqueEdges;i.length=0;const r=new T;for(let s=0;s!==e.length;s++){const o=e[s],a=o.length;for(let l=0;l!==a;l++){const c=(l+1)%a;t[o[l]].vsub(t[o[c]],r),r.normalize();let u=!1;for(let d=0;d!==i.length;d++)if(i[d].almostEquals(r)||i[d].almostEquals(r)){u=!0;break}u||i.push(r.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let e=0;e<this.faces.length;e++){for(let r=0;r<this.faces[e].length;r++)if(!this.vertices[this.faces[e][r]])throw new Error(`Vertex ${this.faces[e][r]} not found!`);const t=this.faceNormals[e]||new T;this.getFaceNormal(e,t),t.negate(t),this.faceNormals[e]=t;const i=this.vertices[this.faces[e][0]];if(t.dot(i)<0){console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let r=0;r<this.faces[e].length;r++)console.warn(`.vertices[${this.faces[e][r]}] = Vec3(${this.vertices[this.faces[e][r]].toString()})`)}}}getFaceNormal(e,t){const i=this.faces[e],r=this.vertices[i[0]],s=this.vertices[i[1]],o=this.vertices[i[2]];ra.computeNormal(r,s,o,t)}static computeNormal(e,t,i,r){const s=new T,o=new T;t.vsub(e,o),i.vsub(t,s),s.cross(o,r),r.isZero()||r.normalize()}clipAgainstHull(e,t,i,r,s,o,a,l,c){const u=new T;let d=-1,h=-Number.MAX_VALUE;for(let g=0;g<i.faces.length;g++){u.copy(i.faceNormals[g]),s.vmult(u,u);const _=u.dot(o);_>h&&(h=_,d=g)}const p=[];for(let g=0;g<i.faces[d].length;g++){const _=i.vertices[i.faces[d][g]],m=new T;m.copy(_),s.vmult(m,m),r.vadd(m,m),p.push(m)}d>=0&&this.clipFaceAgainstHull(o,e,t,p,a,l,c)}findSeparatingAxis(e,t,i,r,s,o,a,l){const c=new T,u=new T,d=new T,h=new T,p=new T,g=new T;let _=Number.MAX_VALUE;const m=this;if(m.uniqueAxes)for(let f=0;f!==m.uniqueAxes.length;f++){i.vmult(m.uniqueAxes[f],c);const v=m.testSepAxis(c,e,t,i,r,s);if(v===!1)return!1;v<_&&(_=v,o.copy(c))}else{const f=a?a.length:m.faces.length;for(let v=0;v<f;v++){const x=a?a[v]:v;c.copy(m.faceNormals[x]),i.vmult(c,c);const S=m.testSepAxis(c,e,t,i,r,s);if(S===!1)return!1;S<_&&(_=S,o.copy(c))}}if(e.uniqueAxes)for(let f=0;f!==e.uniqueAxes.length;f++){s.vmult(e.uniqueAxes[f],u);const v=m.testSepAxis(u,e,t,i,r,s);if(v===!1)return!1;v<_&&(_=v,o.copy(u))}else{const f=l?l.length:e.faces.length;for(let v=0;v<f;v++){const x=l?l[v]:v;u.copy(e.faceNormals[x]),s.vmult(u,u);const S=m.testSepAxis(u,e,t,i,r,s);if(S===!1)return!1;S<_&&(_=S,o.copy(u))}}for(let f=0;f!==m.uniqueEdges.length;f++){i.vmult(m.uniqueEdges[f],h);for(let v=0;v!==e.uniqueEdges.length;v++)if(s.vmult(e.uniqueEdges[v],p),h.cross(p,g),!g.almostZero()){g.normalize();const x=m.testSepAxis(g,e,t,i,r,s);if(x===!1)return!1;x<_&&(_=x,o.copy(g))}}return r.vsub(t,d),d.dot(o)>0&&o.negate(o),!0}testSepAxis(e,t,i,r,s,o){const a=this;ra.project(a,e,i,r,Uu),ra.project(t,e,s,o,Fu);const l=Uu[0],c=Uu[1],u=Fu[0],d=Fu[1];if(l<d||u<c)return!1;const h=l-d,p=u-c;return h<p?h:p}calculateLocalInertia(e,t){const i=new T,r=new T;this.computeLocalAABB(r,i);const s=i.x-r.x,o=i.y-r.y,a=i.z-r.z;t.x=1/12*e*(2*o*2*o+2*a*2*a),t.y=1/12*e*(2*s*2*s+2*a*2*a),t.z=1/12*e*(2*o*2*o+2*s*2*s)}getPlaneConstantOfFace(e){const t=this.faces[e],i=this.faceNormals[e],r=this.vertices[t[0]];return-i.dot(r)}clipFaceAgainstHull(e,t,i,r,s,o,a){const l=new T,c=new T,u=new T,d=new T,h=new T,p=new T,g=new T,_=new T,m=this,f=[],v=r,x=f;let S=-1,R=Number.MAX_VALUE;for(let y=0;y<m.faces.length;y++){l.copy(m.faceNormals[y]),i.vmult(l,l);const M=l.dot(e);M<R&&(R=M,S=y)}if(S<0)return;const A=m.faces[S];A.connectedFaces=[];for(let y=0;y<m.faces.length;y++)for(let M=0;M<m.faces[y].length;M++)A.indexOf(m.faces[y][M])!==-1&&y!==S&&A.connectedFaces.indexOf(y)===-1&&A.connectedFaces.push(y);const w=A.length;for(let y=0;y<w;y++){const M=m.vertices[A[y]],B=m.vertices[A[(y+1)%w]];M.vsub(B,c),u.copy(c),i.vmult(u,u),t.vadd(u,u),d.copy(this.faceNormals[S]),i.vmult(d,d),t.vadd(d,d),u.cross(d,h),h.negate(h),p.copy(M),i.vmult(p,p),t.vadd(p,p);const N=A.connectedFaces[y];g.copy(this.faceNormals[N]);const F=this.getPlaneConstantOfFace(N);_.copy(g),i.vmult(_,_);const O=F-_.dot(t);for(this.clipFaceAgainstPlane(v,x,_,O);v.length;)v.shift();for(;x.length;)v.push(x.shift())}g.copy(this.faceNormals[S]);const P=this.getPlaneConstantOfFace(S);_.copy(g),i.vmult(_,_);const W=P-_.dot(t);for(let y=0;y<v.length;y++){let M=_.dot(v[y])+W;if(M<=s&&(console.log(`clamped: depth=${M} to minDist=${s}`),M=s),M<=o){const B=v[y];if(M<=1e-6){const N={point:B,normal:_,depth:M};a.push(N)}}}}clipFaceAgainstPlane(e,t,i,r){let s,o;const a=e.length;if(a<2)return t;let l=e[e.length-1],c=e[0];s=i.dot(l)+r;for(let u=0;u<a;u++){if(c=e[u],o=i.dot(c)+r,s<0)if(o<0){const d=new T;d.copy(c),t.push(d)}else{const d=new T;l.lerp(c,s/(s-o),d),t.push(d)}else if(o<0){const d=new T;l.lerp(c,s/(s-o),d),t.push(d),t.push(c)}l=c,s=o}return t}computeWorldVertices(e,t){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new T);const i=this.vertices,r=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)t.vmult(i[s],r[s]),e.vadd(r[s],r[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(e,t){const i=this.vertices;e.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),t.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let r=0;r<this.vertices.length;r++){const s=i[r];s.x<e.x?e.x=s.x:s.x>t.x&&(t.x=s.x),s.y<e.y?e.y=s.y:s.y>t.y&&(t.y=s.y),s.z<e.z?e.z=s.z:s.z>t.z&&(t.z=s.z)}}computeWorldFaceNormals(e){const t=this.faceNormals.length;for(;this.worldFaceNormals.length<t;)this.worldFaceNormals.push(new T);const i=this.faceNormals,r=this.worldFaceNormals;for(let s=0;s!==t;s++)e.vmult(i[s],r[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let e=0;const t=this.vertices;for(let i=0;i!==t.length;i++){const r=t[i].lengthSquared();r>e&&(e=r)}this.boundingSphereRadius=Math.sqrt(e)}calculateWorldAABB(e,t,i,r){const s=this.vertices;let o,a,l,c,u,d,h=new T;for(let p=0;p<s.length;p++){h.copy(s[p]),t.vmult(h,h),e.vadd(h,h);const g=h;(o===void 0||g.x<o)&&(o=g.x),(c===void 0||g.x>c)&&(c=g.x),(a===void 0||g.y<a)&&(a=g.y),(u===void 0||g.y>u)&&(u=g.y),(l===void 0||g.z<l)&&(l=g.z),(d===void 0||g.z>d)&&(d=g.z)}i.set(o,a,l),r.set(c,u,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(e){e===void 0&&(e=new T);const t=this.vertices;for(let i=0;i<t.length;i++)e.vadd(t[i],e);return e.scale(1/t.length,e),e}transformAllPoints(e,t){const i=this.vertices.length,r=this.vertices;if(t){for(let s=0;s<i;s++){const o=r[s];t.vmult(o,o)}for(let s=0;s<this.faceNormals.length;s++){const o=this.faceNormals[s];t.vmult(o,o)}}if(e)for(let s=0;s<i;s++){const o=r[s];o.vadd(e,o)}}pointIsInside(e){const t=this.vertices,i=this.faces,r=this.faceNormals,s=new T;this.getAveragePointLocal(s);for(let o=0;o<this.faces.length;o++){let a=r[o];const l=t[i[o][0]],c=new T;e.vsub(l,c);const u=a.dot(c),d=new T;s.vsub(l,d);const h=a.dot(d);if(u<0&&h>0||u>0&&h<0)return!1}return-1}static project(e,t,i,r,s){const o=e.vertices.length,a=MM;let l=0,c=0;const u=EM,d=e.vertices;u.setZero(),rt.vectorToLocalFrame(i,r,t,a),rt.pointToLocalFrame(i,r,u,u);const h=u.dot(a);c=l=d[0].dot(a);for(let p=1;p<o;p++){const g=d[p].dot(a);g>l&&(l=g),g<c&&(c=g)}if(c-=h,l-=h,c>l){const p=c;c=l,l=p}s[0]=l,s[1]=c}}const Uu=[],Fu=[];new T;const MM=new T,EM=new T;class rp extends Pe{constructor(e){super({type:Pe.types.BOX}),this.halfExtents=e,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const e=this.halfExtents.x,t=this.halfExtents.y,i=this.halfExtents.z,r=T,s=[new r(-e,-t,-i),new r(e,-t,-i),new r(e,t,-i),new r(-e,t,-i),new r(-e,-t,i),new r(e,-t,i),new r(e,t,i),new r(-e,t,i)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new r(0,0,1),new r(0,1,0),new r(1,0,0)],l=new ra({vertices:s,faces:o,axes:a});this.convexPolyhedronRepresentation=l,l.material=this.material}calculateLocalInertia(e,t){return t===void 0&&(t=new T),rp.calculateInertia(this.halfExtents,e,t),t}static calculateInertia(e,t,i){const r=e;i.x=1/12*t*(2*r.y*2*r.y+2*r.z*2*r.z),i.y=1/12*t*(2*r.x*2*r.x+2*r.z*2*r.z),i.z=1/12*t*(2*r.y*2*r.y+2*r.x*2*r.x)}getSideNormals(e,t){const i=e,r=this.halfExtents;if(i[0].set(r.x,0,0),i[1].set(0,r.y,0),i[2].set(0,0,r.z),i[3].set(-r.x,0,0),i[4].set(0,-r.y,0),i[5].set(0,0,-r.z),t!==void 0)for(let s=0;s!==i.length;s++)t.vmult(i[s],i[s]);return i}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(e,t,i){const r=this.halfExtents,s=[[r.x,r.y,r.z],[-r.x,r.y,r.z],[-r.x,-r.y,r.z],[-r.x,-r.y,-r.z],[r.x,-r.y,-r.z],[r.x,r.y,-r.z],[-r.x,r.y,-r.z],[r.x,-r.y,r.z]];for(let o=0;o<s.length;o++)Zi.set(s[o][0],s[o][1],s[o][2]),t.vmult(Zi,Zi),e.vadd(Zi,Zi),i(Zi.x,Zi.y,Zi.z)}calculateWorldAABB(e,t,i,r){const s=this.halfExtents;li[0].set(s.x,s.y,s.z),li[1].set(-s.x,s.y,s.z),li[2].set(-s.x,-s.y,s.z),li[3].set(-s.x,-s.y,-s.z),li[4].set(s.x,-s.y,-s.z),li[5].set(s.x,s.y,-s.z),li[6].set(-s.x,s.y,-s.z),li[7].set(s.x,-s.y,s.z);const o=li[0];t.vmult(o,o),e.vadd(o,o),r.copy(o),i.copy(o);for(let a=1;a<8;a++){const l=li[a];t.vmult(l,l),e.vadd(l,l);const c=l.x,u=l.y,d=l.z;c>r.x&&(r.x=c),u>r.y&&(r.y=u),d>r.z&&(r.z=d),c<i.x&&(i.x=c),u<i.y&&(i.y=u),d<i.z&&(i.z=d)}}}const Zi=new T,li=[new T,new T,new T,new T,new T,new T,new T,new T],sp={DYNAMIC:1,STATIC:2,KINEMATIC:4},op={AWAKE:0,SLEEPY:1,SLEEPING:2};class Re extends N_{constructor(e){e===void 0&&(e={}),super(),this.id=Re.idCounter++,this.index=-1,this.world=null,this.vlambda=new T,this.collisionFilterGroup=typeof e.collisionFilterGroup=="number"?e.collisionFilterGroup:1,this.collisionFilterMask=typeof e.collisionFilterMask=="number"?e.collisionFilterMask:-1,this.collisionResponse=typeof e.collisionResponse=="boolean"?e.collisionResponse:!0,this.position=new T,this.previousPosition=new T,this.interpolatedPosition=new T,this.initPosition=new T,e.position&&(this.position.copy(e.position),this.previousPosition.copy(e.position),this.interpolatedPosition.copy(e.position),this.initPosition.copy(e.position)),this.velocity=new T,e.velocity&&this.velocity.copy(e.velocity),this.initVelocity=new T,this.force=new T;const t=typeof e.mass=="number"?e.mass:0;this.mass=t,this.invMass=t>0?1/t:0,this.material=e.material||null,this.linearDamping=typeof e.linearDamping=="number"?e.linearDamping:.01,this.type=t<=0?Re.STATIC:Re.DYNAMIC,typeof e.type==typeof Re.STATIC&&(this.type=e.type),this.allowSleep=typeof e.allowSleep<"u"?e.allowSleep:!0,this.sleepState=Re.AWAKE,this.sleepSpeedLimit=typeof e.sleepSpeedLimit<"u"?e.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof e.sleepTimeLimit<"u"?e.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new T,this.quaternion=new Tn,this.initQuaternion=new Tn,this.previousQuaternion=new Tn,this.interpolatedQuaternion=new Tn,e.quaternion&&(this.quaternion.copy(e.quaternion),this.initQuaternion.copy(e.quaternion),this.previousQuaternion.copy(e.quaternion),this.interpolatedQuaternion.copy(e.quaternion)),this.angularVelocity=new T,e.angularVelocity&&this.angularVelocity.copy(e.angularVelocity),this.initAngularVelocity=new T,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new T,this.invInertia=new T,this.invInertiaWorld=new ni,this.invMassSolve=0,this.invInertiaSolve=new T,this.invInertiaWorldSolve=new ni,this.fixedRotation=typeof e.fixedRotation<"u"?e.fixedRotation:!1,this.angularDamping=typeof e.angularDamping<"u"?e.angularDamping:.01,this.linearFactor=new T(1,1,1),e.linearFactor&&this.linearFactor.copy(e.linearFactor),this.angularFactor=new T(1,1,1),e.angularFactor&&this.angularFactor.copy(e.angularFactor),this.aabb=new Ln,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new T,this.isTrigger=!!e.isTrigger,e.shape&&this.addShape(e.shape),this.updateMassProperties()}wakeUp(){const e=this.sleepState;this.sleepState=Re.AWAKE,this.wakeUpAfterNarrowphase=!1,e===Re.SLEEPING&&this.dispatchEvent(Re.wakeupEvent)}sleep(){this.sleepState=Re.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(e){if(this.allowSleep){const t=this.sleepState,i=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),r=this.sleepSpeedLimit**2;t===Re.AWAKE&&i<r?(this.sleepState=Re.SLEEPY,this.timeLastSleepy=e,this.dispatchEvent(Re.sleepyEvent)):t===Re.SLEEPY&&i>r?this.wakeUp():t===Re.SLEEPY&&e-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(Re.sleepEvent))}}updateSolveMassProperties(){this.sleepState===Re.SLEEPING||this.type===Re.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(e,t){return t===void 0&&(t=new T),e.vsub(this.position,t),this.quaternion.conjugate().vmult(t,t),t}vectorToLocalFrame(e,t){return t===void 0&&(t=new T),this.quaternion.conjugate().vmult(e,t),t}pointToWorldFrame(e,t){return t===void 0&&(t=new T),this.quaternion.vmult(e,t),t.vadd(this.position,t),t}vectorToWorldFrame(e,t){return t===void 0&&(t=new T),this.quaternion.vmult(e,t),t}addShape(e,t,i){const r=new T,s=new Tn;return t&&r.copy(t),i&&s.copy(i),this.shapes.push(e),this.shapeOffsets.push(r),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=this,this}removeShape(e){const t=this.shapes.indexOf(e);return t===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(t,1),this.shapeOffsets.splice(t,1),this.shapeOrientations.splice(t,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=null,this)}updateBoundingRadius(){const e=this.shapes,t=this.shapeOffsets,i=e.length;let r=0;for(let s=0;s!==i;s++){const o=e[s];o.updateBoundingSphereRadius();const a=t[s].length(),l=o.boundingSphereRadius;a+l>r&&(r=a+l)}this.boundingRadius=r}updateAABB(){const e=this.shapes,t=this.shapeOffsets,i=this.shapeOrientations,r=e.length,s=wM,o=TM,a=this.quaternion,l=this.aabb,c=AM;for(let u=0;u!==r;u++){const d=e[u];a.vmult(t[u],s),s.vadd(this.position,s),a.mult(i[u],o),d.calculateWorldAABB(s,o,c.lowerBound,c.upperBound),u===0?l.copy(c):l.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(e){const t=this.invInertia;if(!(t.x===t.y&&t.y===t.z&&!e)){const i=CM,r=RM;i.setRotationFromQuaternion(this.quaternion),i.transpose(r),i.scale(t,i),i.mmult(r,this.invInertiaWorld)}}applyForce(e,t){if(t===void 0&&(t=new T),this.type!==Re.DYNAMIC)return;this.sleepState===Re.SLEEPING&&this.wakeUp();const i=bM;t.cross(e,i),this.force.vadd(e,this.force),this.torque.vadd(i,this.torque)}applyLocalForce(e,t){if(t===void 0&&(t=new T),this.type!==Re.DYNAMIC)return;const i=PM,r=LM;this.vectorToWorldFrame(e,i),this.vectorToWorldFrame(t,r),this.applyForce(i,r)}applyTorque(e){this.type===Re.DYNAMIC&&(this.sleepState===Re.SLEEPING&&this.wakeUp(),this.torque.vadd(e,this.torque))}applyImpulse(e,t){if(t===void 0&&(t=new T),this.type!==Re.DYNAMIC)return;this.sleepState===Re.SLEEPING&&this.wakeUp();const i=t,r=NM;r.copy(e),r.scale(this.invMass,r),this.velocity.vadd(r,this.velocity);const s=IM;i.cross(e,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(e,t){if(t===void 0&&(t=new T),this.type!==Re.DYNAMIC)return;const i=DM,r=UM;this.vectorToWorldFrame(e,i),this.vectorToWorldFrame(t,r),this.applyImpulse(i,r)}updateMassProperties(){const e=FM;this.invMass=this.mass>0?1/this.mass:0;const t=this.inertia,i=this.fixedRotation;this.updateAABB(),e.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),rp.calculateInertia(e,this.mass,t),this.invInertia.set(t.x>0&&!i?1/t.x:0,t.y>0&&!i?1/t.y:0,t.z>0&&!i?1/t.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(e,t){const i=new T;return e.vsub(this.position,i),this.angularVelocity.cross(i,t),this.velocity.vadd(t,t),t}integrate(e,t,i){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===Re.DYNAMIC||this.type===Re.KINEMATIC)||this.sleepState===Re.SLEEPING)return;const r=this.velocity,s=this.angularVelocity,o=this.position,a=this.force,l=this.torque,c=this.quaternion,u=this.invMass,d=this.invInertiaWorld,h=this.linearFactor,p=u*e;r.x+=a.x*p*h.x,r.y+=a.y*p*h.y,r.z+=a.z*p*h.z;const g=d.elements,_=this.angularFactor,m=l.x*_.x,f=l.y*_.y,v=l.z*_.z;s.x+=e*(g[0]*m+g[1]*f+g[2]*v),s.y+=e*(g[3]*m+g[4]*f+g[5]*v),s.z+=e*(g[6]*m+g[7]*f+g[8]*v),o.x+=r.x*e,o.y+=r.y*e,o.z+=r.z*e,c.integrate(this.angularVelocity,e,this.angularFactor,c),t&&(i?c.normalizeFast():c.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}Re.idCounter=0;Re.COLLIDE_EVENT_NAME="collide";Re.DYNAMIC=sp.DYNAMIC;Re.STATIC=sp.STATIC;Re.KINEMATIC=sp.KINEMATIC;Re.AWAKE=op.AWAKE;Re.SLEEPY=op.SLEEPY;Re.SLEEPING=op.SLEEPING;Re.wakeupEvent={type:"wakeup"};Re.sleepyEvent={type:"sleepy"};Re.sleepEvent={type:"sleep"};const wM=new T,TM=new Tn,AM=new Ln,CM=new ni,RM=new ni;new ni;const bM=new T,PM=new T,LM=new T,NM=new T,IM=new T,DM=new T,UM=new T,FM=new T;class OM{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(e,t,i){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(e,t){return!(!(e.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&e.collisionFilterMask)||(e.type&Re.STATIC||e.sleepState===Re.SLEEPING)&&(t.type&Re.STATIC||t.sleepState===Re.SLEEPING))}intersectionTest(e,t,i,r){this.useBoundingBoxes?this.doBoundingBoxBroadphase(e,t,i,r):this.doBoundingSphereBroadphase(e,t,i,r)}doBoundingSphereBroadphase(e,t,i,r){const s=zM;t.position.vsub(e.position,s);const o=(e.boundingRadius+t.boundingRadius)**2;s.lengthSquared()<o&&(i.push(e),r.push(t))}doBoundingBoxBroadphase(e,t,i,r){e.aabbNeedsUpdate&&e.updateAABB(),t.aabbNeedsUpdate&&t.updateAABB(),e.aabb.overlaps(t.aabb)&&(i.push(e),r.push(t))}makePairsUnique(e,t){const i=kM,r=BM,s=HM,o=e.length;for(let a=0;a!==o;a++)r[a]=e[a],s[a]=t[a];e.length=0,t.length=0;for(let a=0;a!==o;a++){const l=r[a].id,c=s[a].id,u=l<c?`${l},${c}`:`${c},${l}`;i[u]=a,i.keys.push(u)}for(let a=0;a!==i.keys.length;a++){const l=i.keys.pop(),c=i[l];e.push(r[c]),t.push(s[c]),delete i[l]}}setWorld(e){}static boundingSphereCheck(e,t){const i=new T;e.position.vsub(t.position,i);const r=e.shapes[0],s=t.shapes[0];return Math.pow(r.boundingSphereRadius+s.boundingSphereRadius,2)>i.lengthSquared()}aabbQuery(e,t,i){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const zM=new T;new T;new Tn;new T;const kM={keys:[]},BM=[],HM=[];new T;new T;new T;class VM extends OM{constructor(){super()}collisionPairs(e,t,i){const r=e.bodies,s=r.length;let o,a;for(let l=0;l!==s;l++)for(let c=0;c!==l;c++)o=r[l],a=r[c],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,t,i)}aabbQuery(e,t,i){i===void 0&&(i=[]);for(let r=0;r<e.bodies.length;r++){const s=e.bodies[r];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(t)&&i.push(s)}return i}}class bc{constructor(){this.rayFromWorld=new T,this.rayToWorld=new T,this.hitNormalWorld=new T,this.hitPointWorld=new T,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(e,t,i,r,s,o,a){this.rayFromWorld.copy(e),this.rayToWorld.copy(t),this.hitNormalWorld.copy(i),this.hitPointWorld.copy(r),this.shape=s,this.body=o,this.distance=a}}let D_,U_,F_,O_,z_,k_,B_;const ap={CLOSEST:1,ANY:2,ALL:4};D_=Pe.types.SPHERE;U_=Pe.types.PLANE;F_=Pe.types.BOX;O_=Pe.types.CYLINDER;z_=Pe.types.CONVEXPOLYHEDRON;k_=Pe.types.HEIGHTFIELD;B_=Pe.types.TRIMESH;let _i=class di{get[D_](){return this._intersectSphere}get[U_](){return this._intersectPlane}get[F_](){return this._intersectBox}get[O_](){return this._intersectConvex}get[z_](){return this._intersectConvex}get[k_](){return this._intersectHeightfield}get[B_](){return this._intersectTrimesh}constructor(e,t){e===void 0&&(e=new T),t===void 0&&(t=new T),this.from=e.clone(),this.to=t.clone(),this.direction=new T,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=di.ANY,this.result=new bc,this.hasHit=!1,this.callback=i=>{}}intersectWorld(e,t){return this.mode=t.mode||di.ANY,this.result=t.result||new bc,this.skipBackfaces=!!t.skipBackfaces,this.collisionFilterMask=typeof t.collisionFilterMask<"u"?t.collisionFilterMask:-1,this.collisionFilterGroup=typeof t.collisionFilterGroup<"u"?t.collisionFilterGroup:-1,this.checkCollisionResponse=typeof t.checkCollisionResponse<"u"?t.checkCollisionResponse:!0,t.from&&this.from.copy(t.from),t.to&&this.to.copy(t.to),this.callback=t.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Qm),Ou.length=0,e.broadphase.aabbQuery(e,Qm,Ou),this.intersectBodies(Ou),this.hasHit}intersectBody(e,t){t&&(this.result=t,this.updateDirection());const i=this.checkCollisionResponse;if(i&&!e.collisionResponse||!(this.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&this.collisionFilterMask))return;const r=GM,s=WM;for(let o=0,a=e.shapes.length;o<a;o++){const l=e.shapes[o];if(!(i&&!l.collisionResponse)&&(e.quaternion.mult(e.shapeOrientations[o],s),e.quaternion.vmult(e.shapeOffsets[o],r),r.vadd(e.position,r),this.intersectShape(l,s,r,e),this.result.shouldStop))break}}intersectBodies(e,t){t&&(this.result=t,this.updateDirection());for(let i=0,r=e.length;!this.result.shouldStop&&i<r;i++)this.intersectBody(e[i])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(e,t,i,r){const s=this.from;if(rE(s,this.direction,i)>e.boundingSphereRadius)return;const a=this[e.type];a&&a.call(this,e,t,i,r,e)}_intersectBox(e,t,i,r,s){return this._intersectConvex(e.convexPolyhedronRepresentation,t,i,r,s)}_intersectPlane(e,t,i,r,s){const o=this.from,a=this.to,l=this.direction,c=new T(0,0,1);t.vmult(c,c);const u=new T;o.vsub(i,u);const d=u.dot(c);a.vsub(i,u);const h=u.dot(c);if(d*h>0||o.distanceTo(a)<d)return;const p=c.dot(l);if(Math.abs(p)<this.precision)return;const g=new T,_=new T,m=new T;o.vsub(i,g);const f=-c.dot(g)/p;l.scale(f,_),o.vadd(_,m),this.reportIntersection(c,m,s,r,-1)}getAABB(e){const{lowerBound:t,upperBound:i}=e,r=this.to,s=this.from;t.x=Math.min(r.x,s.x),t.y=Math.min(r.y,s.y),t.z=Math.min(r.z,s.z),i.x=Math.max(r.x,s.x),i.y=Math.max(r.y,s.y),i.z=Math.max(r.z,s.z)}_intersectHeightfield(e,t,i,r,s){e.data,e.elementSize;const o=XM;o.from.copy(this.from),o.to.copy(this.to),rt.pointToLocalFrame(i,t,o.from,o.from),rt.pointToLocalFrame(i,t,o.to,o.to),o.updateDirection();const a=jM;let l,c,u,d;l=c=0,u=d=e.data.length-1;const h=new Ln;o.getAABB(h),e.getIndexOfPosition(h.lowerBound.x,h.lowerBound.y,a,!0),l=Math.max(l,a[0]),c=Math.max(c,a[1]),e.getIndexOfPosition(h.upperBound.x,h.upperBound.y,a,!0),u=Math.min(u,a[0]+1),d=Math.min(d,a[1]+1);for(let p=l;p<u;p++)for(let g=c;g<d;g++){if(this.result.shouldStop)return;if(e.getAabbAtIndex(p,g,h),!!h.overlapsRay(o)){if(e.getConvexTrianglePillar(p,g,!1),rt.pointToWorldFrame(i,t,e.pillarOffset,sl),this._intersectConvex(e.pillarConvex,t,sl,r,s,eg),this.result.shouldStop)return;e.getConvexTrianglePillar(p,g,!0),rt.pointToWorldFrame(i,t,e.pillarOffset,sl),this._intersectConvex(e.pillarConvex,t,sl,r,s,eg)}}}_intersectSphere(e,t,i,r,s){const o=this.from,a=this.to,l=e.radius,c=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,u=2*((a.x-o.x)*(o.x-i.x)+(a.y-o.y)*(o.y-i.y)+(a.z-o.z)*(o.z-i.z)),d=(o.x-i.x)**2+(o.y-i.y)**2+(o.z-i.z)**2-l**2,h=u**2-4*c*d,p=qM,g=YM;if(!(h<0))if(h===0)o.lerp(a,h,p),p.vsub(i,g),g.normalize(),this.reportIntersection(g,p,s,r,-1);else{const _=(-u-Math.sqrt(h))/(2*c),m=(-u+Math.sqrt(h))/(2*c);if(_>=0&&_<=1&&(o.lerp(a,_,p),p.vsub(i,g),g.normalize(),this.reportIntersection(g,p,s,r,-1)),this.result.shouldStop)return;m>=0&&m<=1&&(o.lerp(a,m,p),p.vsub(i,g),g.normalize(),this.reportIntersection(g,p,s,r,-1))}}_intersectConvex(e,t,i,r,s,o){const a=$M,l=tg,c=o&&o.faceList||null,u=e.faces,d=e.vertices,h=e.faceNormals,p=this.direction,g=this.from,_=this.to,m=g.distanceTo(_),f=c?c.length:u.length,v=this.result;for(let x=0;!v.shouldStop&&x<f;x++){const S=c?c[x]:x,R=u[S],A=h[S],w=t,P=i;l.copy(d[R[0]]),w.vmult(l,l),l.vadd(P,l),l.vsub(g,l),w.vmult(A,a);const W=p.dot(a);if(Math.abs(W)<this.precision)continue;const y=a.dot(l)/W;if(!(y<0)){p.scale(y,hn),hn.vadd(g,hn),jn.copy(d[R[0]]),w.vmult(jn,jn),P.vadd(jn,jn);for(let M=1;!v.shouldStop&&M<R.length-1;M++){ci.copy(d[R[M]]),ui.copy(d[R[M+1]]),w.vmult(ci,ci),w.vmult(ui,ui),P.vadd(ci,ci),P.vadd(ui,ui);const B=hn.distanceTo(g);!(di.pointInTriangle(hn,jn,ci,ui)||di.pointInTriangle(hn,ci,jn,ui))||B>m||this.reportIntersection(a,hn,s,r,S)}}}}_intersectTrimesh(e,t,i,r,s,o){const a=KM,l=nE,c=iE,u=tg,d=ZM,h=JM,p=QM,g=tE,_=eE,m=e.indices;e.vertices;const f=this.from,v=this.to,x=this.direction;c.position.copy(i),c.quaternion.copy(t),rt.vectorToLocalFrame(i,t,x,d),rt.pointToLocalFrame(i,t,f,h),rt.pointToLocalFrame(i,t,v,p),p.x*=e.scale.x,p.y*=e.scale.y,p.z*=e.scale.z,h.x*=e.scale.x,h.y*=e.scale.y,h.z*=e.scale.z,p.vsub(h,d),d.normalize();const S=h.distanceSquared(p);e.tree.rayQuery(this,c,l);for(let R=0,A=l.length;!this.result.shouldStop&&R!==A;R++){const w=l[R];e.getNormal(w,a),e.getVertex(m[w*3],jn),jn.vsub(h,u);const P=d.dot(a),W=a.dot(u)/P;if(W<0)continue;d.scale(W,hn),hn.vadd(h,hn),e.getVertex(m[w*3+1],ci),e.getVertex(m[w*3+2],ui);const y=hn.distanceSquared(h);!(di.pointInTriangle(hn,ci,jn,ui)||di.pointInTriangle(hn,jn,ci,ui))||y>S||(rt.vectorToWorldFrame(t,a,_),rt.pointToWorldFrame(i,t,hn,g),this.reportIntersection(_,g,s,r,w))}l.length=0}reportIntersection(e,t,i,r,s){const o=this.from,a=this.to,l=o.distanceTo(t),c=this.result;if(!(this.skipBackfaces&&e.dot(this.direction)>0))switch(c.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case di.ALL:this.hasHit=!0,c.set(o,a,e,t,i,r,l),c.hasHit=!0,this.callback(c);break;case di.CLOSEST:(l<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(o,a,e,t,i,r,l));break;case di.ANY:this.hasHit=!0,c.hasHit=!0,c.set(o,a,e,t,i,r,l),c.shouldStop=!0;break}}static pointInTriangle(e,t,i,r){r.vsub(t,Gr),i.vsub(t,Po),e.vsub(t,zu);const s=Gr.dot(Gr),o=Gr.dot(Po),a=Gr.dot(zu),l=Po.dot(Po),c=Po.dot(zu);let u,d;return(u=l*a-o*c)>=0&&(d=s*c-o*a)>=0&&u+d<s*l-o*o}};_i.CLOSEST=ap.CLOSEST;_i.ANY=ap.ANY;_i.ALL=ap.ALL;const Qm=new Ln,Ou=[],Po=new T,zu=new T,GM=new T,WM=new Tn,hn=new T,jn=new T,ci=new T,ui=new T;new T;new bc;const eg={faceList:[0]},sl=new T,XM=new _i,jM=[],qM=new T,YM=new T,$M=new T;new T;new T;const tg=new T,KM=new T,ZM=new T,JM=new T,QM=new T,eE=new T,tE=new T;new Ln;const nE=[],iE=new rt,Gr=new T,ol=new T;function rE(n,e,t){t.vsub(n,Gr);const i=Gr.dot(e);return e.scale(i,ol),ol.vadd(n,ol),t.distanceTo(ol)}class sE{static defaults(e,t){e===void 0&&(e={});for(let i in t)i in e||(e[i]=t[i]);return e}}class ng{constructor(){this.spatial=new T,this.rotational=new T}multiplyElement(e){return e.spatial.dot(this.spatial)+e.rotational.dot(this.rotational)}multiplyVectors(e,t){return e.dot(this.spatial)+t.dot(this.rotational)}}class Ua{constructor(e,t,i,r){i===void 0&&(i=-1e6),r===void 0&&(r=1e6),this.id=Ua.idCounter++,this.minForce=i,this.maxForce=r,this.bi=e,this.bj=t,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new ng,this.jacobianElementB=new ng,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(e,t,i){const r=t,s=e,o=i;this.a=4/(o*(1+4*r)),this.b=4*r/(1+4*r),this.eps=4/(o*o*s*(1+4*r))}computeB(e,t,i){const r=this.computeGW(),s=this.computeGq(),o=this.computeGiMf();return-s*e-r*t-o*i}computeGq(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.position,o=r.position;return e.spatial.dot(s)+t.spatial.dot(o)}computeGW(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.velocity,o=r.velocity,a=i.angularVelocity,l=r.angularVelocity;return e.multiplyVectors(s,a)+t.multiplyVectors(o,l)}computeGWlambda(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.vlambda,o=r.vlambda,a=i.wlambda,l=r.wlambda;return e.multiplyVectors(s,a)+t.multiplyVectors(o,l)}computeGiMf(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.force,o=i.torque,a=r.force,l=r.torque,c=i.invMassSolve,u=r.invMassSolve;return s.scale(c,ig),a.scale(u,rg),i.invInertiaWorldSolve.vmult(o,sg),r.invInertiaWorldSolve.vmult(l,og),e.multiplyVectors(ig,sg)+t.multiplyVectors(rg,og)}computeGiMGt(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.invMassSolve,o=r.invMassSolve,a=i.invInertiaWorldSolve,l=r.invInertiaWorldSolve;let c=s+o;return a.vmult(e.rotational,al),c+=al.dot(e.rotational),l.vmult(t.rotational,al),c+=al.dot(t.rotational),c}addToWlambda(e){const t=this.jacobianElementA,i=this.jacobianElementB,r=this.bi,s=this.bj,o=oE;r.vlambda.addScaledVector(r.invMassSolve*e,t.spatial,r.vlambda),s.vlambda.addScaledVector(s.invMassSolve*e,i.spatial,s.vlambda),r.invInertiaWorldSolve.vmult(t.rotational,o),r.wlambda.addScaledVector(e,o,r.wlambda),s.invInertiaWorldSolve.vmult(i.rotational,o),s.wlambda.addScaledVector(e,o,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Ua.idCounter=0;const ig=new T,rg=new T,sg=new T,og=new T,al=new T,oE=new T;class aE extends Ua{constructor(e,t,i){i===void 0&&(i=1e6),super(e,t,0,i),this.restitution=0,this.ri=new T,this.rj=new T,this.ni=new T}computeB(e){const t=this.a,i=this.b,r=this.bi,s=this.bj,o=this.ri,a=this.rj,l=lE,c=cE,u=r.velocity,d=r.angularVelocity;r.force,r.torque;const h=s.velocity,p=s.angularVelocity;s.force,s.torque;const g=uE,_=this.jacobianElementA,m=this.jacobianElementB,f=this.ni;o.cross(f,l),a.cross(f,c),f.negate(_.spatial),l.negate(_.rotational),m.spatial.copy(f),m.rotational.copy(c),g.copy(s.position),g.vadd(a,g),g.vsub(r.position,g),g.vsub(o,g);const v=f.dot(g),x=this.restitution+1,S=x*h.dot(f)-x*u.dot(f)+p.dot(c)-d.dot(l),R=this.computeGiMf();return-v*t-S*i-e*R}getImpactVelocityAlongNormal(){const e=hE,t=dE,i=fE,r=pE,s=mE;return this.bi.position.vadd(this.ri,i),this.bj.position.vadd(this.rj,r),this.bi.getVelocityAtWorldPoint(i,e),this.bj.getVelocityAtWorldPoint(r,t),e.vsub(t,s),this.ni.dot(s)}}const lE=new T,cE=new T,uE=new T,hE=new T,dE=new T,fE=new T,pE=new T,mE=new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;class ag extends Ua{constructor(e,t,i){super(e,t,-i,i),this.ri=new T,this.rj=new T,this.t=new T}computeB(e){this.a;const t=this.b;this.bi,this.bj;const i=this.ri,r=this.rj,s=gE,o=vE,a=this.t;i.cross(a,s),r.cross(a,o);const l=this.jacobianElementA,c=this.jacobianElementB;a.negate(l.spatial),s.negate(l.rotational),c.spatial.copy(a),c.rotational.copy(o);const u=this.computeGW(),d=this.computeGiMf();return-u*t-e*d}}const gE=new T,vE=new T;class Zc{constructor(e,t,i){i=sE.defaults(i,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=Zc.idCounter++,this.materials=[e,t],this.friction=i.friction,this.restitution=i.restitution,this.contactEquationStiffness=i.contactEquationStiffness,this.contactEquationRelaxation=i.contactEquationRelaxation,this.frictionEquationStiffness=i.frictionEquationStiffness,this.frictionEquationRelaxation=i.frictionEquationRelaxation}}Zc.idCounter=0;let H_=class V_{constructor(e){e===void 0&&(e={});let t="";typeof e=="string"&&(t=e,e={}),this.name=t,this.id=V_.idCounter++,this.friction=typeof e.friction<"u"?e.friction:-1,this.restitution=typeof e.restitution<"u"?e.restitution:-1}};H_.idCounter=0;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new _i;new T;new T;new T;new T(1,0,0),new T(0,1,0),new T(0,0,1);new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new Ln;new T;new Ln;new T;new T;new T;new T;new T;new T;new T;new Ln;new T;new rt;new Ln;class _E{constructor(){this.equations=[]}solve(e,t){return 0}addEquation(e){e.enabled&&!e.bi.isTrigger&&!e.bj.isTrigger&&this.equations.push(e)}removeEquation(e){const t=this.equations,i=t.indexOf(e);i!==-1&&t.splice(i,1)}removeAllEquations(){this.equations.length=0}}class xE extends _E{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(e,t){let i=0;const r=this.iterations,s=this.tolerance*this.tolerance,o=this.equations,a=o.length,l=t.bodies,c=l.length,u=e;let d,h,p,g,_,m;if(a!==0)for(let S=0;S!==c;S++)l[S].updateSolveMassProperties();const f=SE,v=ME,x=yE;f.length=a,v.length=a,x.length=a;for(let S=0;S!==a;S++){const R=o[S];x[S]=0,v[S]=R.computeB(u),f[S]=1/R.computeC()}if(a!==0){for(let A=0;A!==c;A++){const w=l[A],P=w.vlambda,W=w.wlambda;P.set(0,0,0),W.set(0,0,0)}for(i=0;i!==r;i++){g=0;for(let A=0;A!==a;A++){const w=o[A];d=v[A],h=f[A],m=x[A],_=w.computeGWlambda(),p=h*(d-_-w.eps*m),m+p<w.minForce?p=w.minForce-m:m+p>w.maxForce&&(p=w.maxForce-m),x[A]+=p,g+=p>0?p:-p,w.addToWlambda(p)}if(g*g<s)break}for(let A=0;A!==c;A++){const w=l[A],P=w.velocity,W=w.angularVelocity;w.vlambda.vmul(w.linearFactor,w.vlambda),P.vadd(w.vlambda,P),w.wlambda.vmul(w.angularFactor,w.wlambda),W.vadd(w.wlambda,W)}let S=o.length;const R=1/u;for(;S--;)o[S].multiplier=x[S]*R}return i}}const yE=[],SE=[],ME=[];class EE{constructor(){this.objects=[],this.type=Object}release(){const e=arguments.length;for(let t=0;t!==e;t++)this.objects.push(t<0||arguments.length<=t?void 0:arguments[t]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(e){const t=this.objects;for(;t.length>e;)t.pop();for(;t.length<e;)t.push(this.constructObject());return this}}class wE extends EE{constructor(){super(...arguments),this.type=T}constructObject(){return new T}}const pt={sphereSphere:Pe.types.SPHERE,spherePlane:Pe.types.SPHERE|Pe.types.PLANE,boxBox:Pe.types.BOX|Pe.types.BOX,sphereBox:Pe.types.SPHERE|Pe.types.BOX,planeBox:Pe.types.PLANE|Pe.types.BOX,convexConvex:Pe.types.CONVEXPOLYHEDRON,sphereConvex:Pe.types.SPHERE|Pe.types.CONVEXPOLYHEDRON,planeConvex:Pe.types.PLANE|Pe.types.CONVEXPOLYHEDRON,boxConvex:Pe.types.BOX|Pe.types.CONVEXPOLYHEDRON,sphereHeightfield:Pe.types.SPHERE|Pe.types.HEIGHTFIELD,boxHeightfield:Pe.types.BOX|Pe.types.HEIGHTFIELD,convexHeightfield:Pe.types.CONVEXPOLYHEDRON|Pe.types.HEIGHTFIELD,sphereParticle:Pe.types.PARTICLE|Pe.types.SPHERE,planeParticle:Pe.types.PLANE|Pe.types.PARTICLE,boxParticle:Pe.types.BOX|Pe.types.PARTICLE,convexParticle:Pe.types.PARTICLE|Pe.types.CONVEXPOLYHEDRON,cylinderCylinder:Pe.types.CYLINDER,sphereCylinder:Pe.types.SPHERE|Pe.types.CYLINDER,planeCylinder:Pe.types.PLANE|Pe.types.CYLINDER,boxCylinder:Pe.types.BOX|Pe.types.CYLINDER,convexCylinder:Pe.types.CONVEXPOLYHEDRON|Pe.types.CYLINDER,heightfieldCylinder:Pe.types.HEIGHTFIELD|Pe.types.CYLINDER,particleCylinder:Pe.types.PARTICLE|Pe.types.CYLINDER,sphereTrimesh:Pe.types.SPHERE|Pe.types.TRIMESH,planeTrimesh:Pe.types.PLANE|Pe.types.TRIMESH};class TE{get[pt.sphereSphere](){return this.sphereSphere}get[pt.spherePlane](){return this.spherePlane}get[pt.boxBox](){return this.boxBox}get[pt.sphereBox](){return this.sphereBox}get[pt.planeBox](){return this.planeBox}get[pt.convexConvex](){return this.convexConvex}get[pt.sphereConvex](){return this.sphereConvex}get[pt.planeConvex](){return this.planeConvex}get[pt.boxConvex](){return this.boxConvex}get[pt.sphereHeightfield](){return this.sphereHeightfield}get[pt.boxHeightfield](){return this.boxHeightfield}get[pt.convexHeightfield](){return this.convexHeightfield}get[pt.sphereParticle](){return this.sphereParticle}get[pt.planeParticle](){return this.planeParticle}get[pt.boxParticle](){return this.boxParticle}get[pt.convexParticle](){return this.convexParticle}get[pt.cylinderCylinder](){return this.convexConvex}get[pt.sphereCylinder](){return this.sphereConvex}get[pt.planeCylinder](){return this.planeConvex}get[pt.boxCylinder](){return this.boxConvex}get[pt.convexCylinder](){return this.convexConvex}get[pt.heightfieldCylinder](){return this.heightfieldCylinder}get[pt.particleCylinder](){return this.particleCylinder}get[pt.sphereTrimesh](){return this.sphereTrimesh}get[pt.planeTrimesh](){return this.planeTrimesh}constructor(e){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new wE,this.world=e,this.currentContactMaterial=e.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(e,t,i,r,s,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=e,a.bj=t):a=new aE(e,t),a.enabled=e.collisionResponse&&t.collisionResponse&&i.collisionResponse&&r.collisionResponse;const l=this.currentContactMaterial;a.restitution=l.restitution,a.setSpookParams(l.contactEquationStiffness,l.contactEquationRelaxation,this.world.dt);const c=i.material||e.material,u=r.material||t.material;return c&&u&&c.restitution>=0&&u.restitution>=0&&(a.restitution=c.restitution*u.restitution),a.si=s||i,a.sj=o||r,a}createFrictionEquationsFromContact(e,t){const i=e.bi,r=e.bj,s=e.si,o=e.sj,a=this.world,l=this.currentContactMaterial;let c=l.friction;const u=s.material||i.material,d=o.material||r.material;if(u&&d&&u.friction>=0&&d.friction>=0&&(c=u.friction*d.friction),c>0){const h=c*(a.frictionGravity||a.gravity).length();let p=i.invMass+r.invMass;p>0&&(p=1/p);const g=this.frictionEquationPool,_=g.length?g.pop():new ag(i,r,h*p),m=g.length?g.pop():new ag(i,r,h*p);return _.bi=m.bi=i,_.bj=m.bj=r,_.minForce=m.minForce=-h*p,_.maxForce=m.maxForce=h*p,_.ri.copy(e.ri),_.rj.copy(e.rj),m.ri.copy(e.ri),m.rj.copy(e.rj),e.ni.tangents(_.t,m.t),_.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),m.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),_.enabled=m.enabled=e.enabled,t.push(_,m),!0}return!1}createFrictionFromAverage(e){let t=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(t,this.frictionResult)||e===1)return;const i=this.frictionResult[this.frictionResult.length-2],r=this.frictionResult[this.frictionResult.length-1];Lr.setZero(),ds.setZero(),fs.setZero();const s=t.bi;t.bj;for(let a=0;a!==e;a++)t=this.result[this.result.length-1-a],t.bi!==s?(Lr.vadd(t.ni,Lr),ds.vadd(t.ri,ds),fs.vadd(t.rj,fs)):(Lr.vsub(t.ni,Lr),ds.vadd(t.rj,ds),fs.vadd(t.ri,fs));const o=1/e;ds.scale(o,i.ri),fs.scale(o,i.rj),r.ri.copy(i.ri),r.rj.copy(i.rj),Lr.normalize(),Lr.tangents(i.t,r.t)}getContacts(e,t,i,r,s,o,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=r,this.frictionResult=o;const l=RE,c=bE,u=AE,d=CE;for(let h=0,p=e.length;h!==p;h++){const g=e[h],_=t[h];let m=null;g.material&&_.material&&(m=i.getContactMaterial(g.material,_.material)||null);const f=g.type&Re.KINEMATIC&&_.type&Re.STATIC||g.type&Re.STATIC&&_.type&Re.KINEMATIC||g.type&Re.KINEMATIC&&_.type&Re.KINEMATIC;for(let v=0;v<g.shapes.length;v++){g.quaternion.mult(g.shapeOrientations[v],l),g.quaternion.vmult(g.shapeOffsets[v],u),u.vadd(g.position,u);const x=g.shapes[v];for(let S=0;S<_.shapes.length;S++){_.quaternion.mult(_.shapeOrientations[S],c),_.quaternion.vmult(_.shapeOffsets[S],d),d.vadd(_.position,d);const R=_.shapes[S];if(!(x.collisionFilterMask&R.collisionFilterGroup&&R.collisionFilterMask&x.collisionFilterGroup)||u.distanceTo(d)>x.boundingSphereRadius+R.boundingSphereRadius)continue;let A=null;x.material&&R.material&&(A=i.getContactMaterial(x.material,R.material)||null),this.currentContactMaterial=A||m||i.defaultContactMaterial;const w=x.type|R.type,P=this[w];if(P){let W=!1;x.type<R.type?W=P.call(this,x,R,u,d,l,c,g,_,x,R,f):W=P.call(this,R,x,d,u,c,l,_,g,x,R,f),W&&f&&(i.shapeOverlapKeeper.set(x.id,R.id),i.bodyOverlapKeeper.set(g.id,_.id))}}}}}sphereSphere(e,t,i,r,s,o,a,l,c,u,d){if(d)return i.distanceSquared(r)<(e.radius+t.radius)**2;const h=this.createContactEquation(a,l,e,t,c,u);r.vsub(i,h.ni),h.ni.normalize(),h.ri.copy(h.ni),h.rj.copy(h.ni),h.ri.scale(e.radius,h.ri),h.rj.scale(-t.radius,h.rj),h.ri.vadd(i,h.ri),h.ri.vsub(a.position,h.ri),h.rj.vadd(r,h.rj),h.rj.vsub(l.position,h.rj),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}spherePlane(e,t,i,r,s,o,a,l,c,u,d){const h=this.createContactEquation(a,l,e,t,c,u);if(h.ni.set(0,0,1),o.vmult(h.ni,h.ni),h.ni.negate(h.ni),h.ni.normalize(),h.ni.scale(e.radius,h.ri),i.vsub(r,ll),h.ni.scale(h.ni.dot(ll),lg),ll.vsub(lg,h.rj),-ll.dot(h.ni)<=e.radius){if(d)return!0;const p=h.ri,g=h.rj;p.vadd(i,p),p.vsub(a.position,p),g.vadd(r,g),g.vsub(l.position,g),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}}boxBox(e,t,i,r,s,o,a,l,c,u,d){return e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t.convexPolyhedronRepresentation,i,r,s,o,a,l,e,t,d)}sphereBox(e,t,i,r,s,o,a,l,c,u,d){const h=this.v3pool,p=tw;i.vsub(r,cl),t.getSideNormals(p,o);const g=e.radius;let _=!1;const m=iw,f=rw,v=sw;let x=null,S=0,R=0,A=0,w=null;for(let D=0,$=p.length;D!==$&&_===!1;D++){const I=JE;I.copy(p[D]);const U=I.length();I.normalize();const j=cl.dot(I);if(j<U+g&&j>0){const Q=QE,ne=ew;Q.copy(p[(D+1)%3]),ne.copy(p[(D+2)%3]);const Fe=Q.length(),K=ne.length();Q.normalize(),ne.normalize();const oe=cl.dot(Q),me=cl.dot(ne);if(oe<Fe&&oe>-Fe&&me<K&&me>-K){const he=Math.abs(j-U-g);if((w===null||he<w)&&(w=he,R=oe,A=me,x=U,m.copy(I),f.copy(Q),v.copy(ne),S++,d))return!0}}}if(S){_=!0;const D=this.createContactEquation(a,l,e,t,c,u);m.scale(-g,D.ri),D.ni.copy(m),D.ni.negate(D.ni),m.scale(x,m),f.scale(R,f),m.vadd(f,m),v.scale(A,v),m.vadd(v,D.rj),D.ri.vadd(i,D.ri),D.ri.vsub(a.position,D.ri),D.rj.vadd(r,D.rj),D.rj.vsub(l.position,D.rj),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}let P=h.get();const W=nw;for(let D=0;D!==2&&!_;D++)for(let $=0;$!==2&&!_;$++)for(let I=0;I!==2&&!_;I++)if(P.set(0,0,0),D?P.vadd(p[0],P):P.vsub(p[0],P),$?P.vadd(p[1],P):P.vsub(p[1],P),I?P.vadd(p[2],P):P.vsub(p[2],P),r.vadd(P,W),W.vsub(i,W),W.lengthSquared()<g*g){if(d)return!0;_=!0;const U=this.createContactEquation(a,l,e,t,c,u);U.ri.copy(W),U.ri.normalize(),U.ni.copy(U.ri),U.ri.scale(g,U.ri),U.rj.copy(P),U.ri.vadd(i,U.ri),U.ri.vsub(a.position,U.ri),U.rj.vadd(r,U.rj),U.rj.vsub(l.position,U.rj),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}h.release(P),P=null;const y=h.get(),M=h.get(),B=h.get(),N=h.get(),F=h.get(),O=p.length;for(let D=0;D!==O&&!_;D++)for(let $=0;$!==O&&!_;$++)if(D%3!==$%3){p[$].cross(p[D],y),y.normalize(),p[D].vadd(p[$],M),B.copy(i),B.vsub(M,B),B.vsub(r,B);const I=B.dot(y);y.scale(I,N);let U=0;for(;U===D%3||U===$%3;)U++;F.copy(i),F.vsub(N,F),F.vsub(M,F),F.vsub(r,F);const j=Math.abs(I),Q=F.length();if(j<p[U].length()&&Q<g){if(d)return!0;_=!0;const ne=this.createContactEquation(a,l,e,t,c,u);M.vadd(N,ne.rj),ne.rj.copy(ne.rj),F.negate(ne.ni),ne.ni.normalize(),ne.ri.copy(ne.rj),ne.ri.vadd(r,ne.ri),ne.ri.vsub(i,ne.ri),ne.ri.normalize(),ne.ri.scale(g,ne.ri),ne.ri.vadd(i,ne.ri),ne.ri.vsub(a.position,ne.ri),ne.rj.vadd(r,ne.rj),ne.rj.vsub(l.position,ne.rj),this.result.push(ne),this.createFrictionEquationsFromContact(ne,this.frictionResult)}}h.release(y,M,B,N,F)}planeBox(e,t,i,r,s,o,a,l,c,u,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,t.convexPolyhedronRepresentation.id=t.id,this.planeConvex(e,t.convexPolyhedronRepresentation,i,r,s,o,a,l,e,t,d)}convexConvex(e,t,i,r,s,o,a,l,c,u,d,h,p){const g=yw;if(!(i.distanceTo(r)>e.boundingSphereRadius+t.boundingSphereRadius)&&e.findSeparatingAxis(t,i,s,r,o,g,h,p)){const _=[],m=Sw;e.clipAgainstHull(i,s,t,r,o,g,-100,100,_);let f=0;for(let v=0;v!==_.length;v++){if(d)return!0;const x=this.createContactEquation(a,l,e,t,c,u),S=x.ri,R=x.rj;g.negate(x.ni),_[v].normal.negate(m),m.scale(_[v].depth,m),_[v].point.vadd(m,S),R.copy(_[v].point),S.vsub(i,S),R.vsub(r,R),S.vadd(i,S),S.vsub(a.position,S),R.vadd(r,R),R.vsub(l.position,R),this.result.push(x),f++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&f&&this.createFrictionFromAverage(f)}}sphereConvex(e,t,i,r,s,o,a,l,c,u,d){const h=this.v3pool;i.vsub(r,ow);const p=t.faceNormals,g=t.faces,_=t.vertices,m=e.radius;let f=!1;for(let v=0;v!==_.length;v++){const x=_[v],S=uw;o.vmult(x,S),r.vadd(S,S);const R=cw;if(S.vsub(i,R),R.lengthSquared()<m*m){if(d)return!0;f=!0;const A=this.createContactEquation(a,l,e,t,c,u);A.ri.copy(R),A.ri.normalize(),A.ni.copy(A.ri),A.ri.scale(m,A.ri),S.vsub(r,A.rj),A.ri.vadd(i,A.ri),A.ri.vsub(a.position,A.ri),A.rj.vadd(r,A.rj),A.rj.vsub(l.position,A.rj),this.result.push(A),this.createFrictionEquationsFromContact(A,this.frictionResult);return}}for(let v=0,x=g.length;v!==x&&f===!1;v++){const S=p[v],R=g[v],A=hw;o.vmult(S,A);const w=dw;o.vmult(_[R[0]],w),w.vadd(r,w);const P=fw;A.scale(-m,P),i.vadd(P,P);const W=pw;P.vsub(w,W);const y=W.dot(A),M=mw;if(i.vsub(w,M),y<0&&M.dot(A)>0){const B=[];for(let N=0,F=R.length;N!==F;N++){const O=h.get();o.vmult(_[R[N]],O),r.vadd(O,O),B.push(O)}if(ZE(B,A,i)){if(d)return!0;f=!0;const N=this.createContactEquation(a,l,e,t,c,u);A.scale(-m,N.ri),A.negate(N.ni);const F=h.get();A.scale(-y,F);const O=h.get();A.scale(-m,O),i.vsub(r,N.rj),N.rj.vadd(O,N.rj),N.rj.vadd(F,N.rj),N.rj.vadd(r,N.rj),N.rj.vsub(l.position,N.rj),N.ri.vadd(i,N.ri),N.ri.vsub(a.position,N.ri),h.release(F),h.release(O),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult);for(let D=0,$=B.length;D!==$;D++)h.release(B[D]);return}else for(let N=0;N!==R.length;N++){const F=h.get(),O=h.get();o.vmult(_[R[(N+1)%R.length]],F),o.vmult(_[R[(N+2)%R.length]],O),r.vadd(F,F),r.vadd(O,O);const D=aw;O.vsub(F,D);const $=lw;D.unit($);const I=h.get(),U=h.get();i.vsub(F,U);const j=U.dot($);$.scale(j,I),I.vadd(F,I);const Q=h.get();if(I.vsub(i,Q),j>0&&j*j<D.lengthSquared()&&Q.lengthSquared()<m*m){if(d)return!0;const ne=this.createContactEquation(a,l,e,t,c,u);I.vsub(r,ne.rj),I.vsub(i,ne.ni),ne.ni.normalize(),ne.ni.scale(m,ne.ri),ne.rj.vadd(r,ne.rj),ne.rj.vsub(l.position,ne.rj),ne.ri.vadd(i,ne.ri),ne.ri.vsub(a.position,ne.ri),this.result.push(ne),this.createFrictionEquationsFromContact(ne,this.frictionResult);for(let Fe=0,K=B.length;Fe!==K;Fe++)h.release(B[Fe]);h.release(F),h.release(O),h.release(I),h.release(Q),h.release(U);return}h.release(F),h.release(O),h.release(I),h.release(Q),h.release(U)}for(let N=0,F=B.length;N!==F;N++)h.release(B[N])}}}planeConvex(e,t,i,r,s,o,a,l,c,u,d){const h=gw,p=vw;p.set(0,0,1),s.vmult(p,p);let g=0;const _=_w;for(let m=0;m!==t.vertices.length;m++)if(h.copy(t.vertices[m]),o.vmult(h,h),r.vadd(h,h),h.vsub(i,_),p.dot(_)<=0){if(d)return!0;const v=this.createContactEquation(a,l,e,t,c,u),x=xw;p.scale(p.dot(_),x),h.vsub(x,x),x.vsub(i,v.ri),v.ni.copy(p),h.vsub(r,v.rj),v.ri.vadd(i,v.ri),v.ri.vsub(a.position,v.ri),v.rj.vadd(r,v.rj),v.rj.vsub(l.position,v.rj),this.result.push(v),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(v,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(e,t,i,r,s,o,a,l,c,u,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t,i,r,s,o,a,l,e,t,d)}sphereHeightfield(e,t,i,r,s,o,a,l,c,u,d){const h=t.data,p=e.radius,g=t.elementSize,_=Iw,m=Nw;rt.pointToLocalFrame(r,o,i,m);let f=Math.floor((m.x-p)/g)-1,v=Math.ceil((m.x+p)/g)+1,x=Math.floor((m.y-p)/g)-1,S=Math.ceil((m.y+p)/g)+1;if(v<0||S<0||f>h.length||x>h[0].length)return;f<0&&(f=0),v<0&&(v=0),x<0&&(x=0),S<0&&(S=0),f>=h.length&&(f=h.length-1),v>=h.length&&(v=h.length-1),S>=h[0].length&&(S=h[0].length-1),x>=h[0].length&&(x=h[0].length-1);const R=[];t.getRectMinMax(f,x,v,S,R);const A=R[0],w=R[1];if(m.z-p>w||m.z+p<A)return;const P=this.result;for(let W=f;W<v;W++)for(let y=x;y<S;y++){const M=P.length;let B=!1;if(t.getConvexTrianglePillar(W,y,!1),rt.pointToWorldFrame(r,o,t.pillarOffset,_),i.distanceTo(_)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(B=this.sphereConvex(e,t.pillarConvex,i,_,s,o,a,l,e,t,d)),d&&B||(t.getConvexTrianglePillar(W,y,!0),rt.pointToWorldFrame(r,o,t.pillarOffset,_),i.distanceTo(_)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(B=this.sphereConvex(e,t.pillarConvex,i,_,s,o,a,l,e,t,d)),d&&B))return!0;if(P.length-M>2)return}}boxHeightfield(e,t,i,r,s,o,a,l,c,u,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexHeightfield(e.convexPolyhedronRepresentation,t,i,r,s,o,a,l,e,t,d)}convexHeightfield(e,t,i,r,s,o,a,l,c,u,d){const h=t.data,p=t.elementSize,g=e.boundingSphereRadius,_=Pw,m=Lw,f=bw;rt.pointToLocalFrame(r,o,i,f);let v=Math.floor((f.x-g)/p)-1,x=Math.ceil((f.x+g)/p)+1,S=Math.floor((f.y-g)/p)-1,R=Math.ceil((f.y+g)/p)+1;if(x<0||R<0||v>h.length||S>h[0].length)return;v<0&&(v=0),x<0&&(x=0),S<0&&(S=0),R<0&&(R=0),v>=h.length&&(v=h.length-1),x>=h.length&&(x=h.length-1),R>=h[0].length&&(R=h[0].length-1),S>=h[0].length&&(S=h[0].length-1);const A=[];t.getRectMinMax(v,S,x,R,A);const w=A[0],P=A[1];if(!(f.z-g>P||f.z+g<w))for(let W=v;W<x;W++)for(let y=S;y<R;y++){let M=!1;if(t.getConvexTrianglePillar(W,y,!1),rt.pointToWorldFrame(r,o,t.pillarOffset,_),i.distanceTo(_)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(M=this.convexConvex(e,t.pillarConvex,i,_,s,o,a,l,null,null,d,m,null)),d&&M||(t.getConvexTrianglePillar(W,y,!0),rt.pointToWorldFrame(r,o,t.pillarOffset,_),i.distanceTo(_)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(M=this.convexConvex(e,t.pillarConvex,i,_,s,o,a,l,null,null,d,m,null)),d&&M))return!0}}sphereParticle(e,t,i,r,s,o,a,l,c,u,d){const h=Tw;if(h.set(0,0,1),r.vsub(i,h),h.lengthSquared()<=e.radius*e.radius){if(d)return!0;const g=this.createContactEquation(l,a,t,e,c,u);h.normalize(),g.rj.copy(h),g.rj.scale(e.radius,g.rj),g.ni.copy(h),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(e,t,i,r,s,o,a,l,c,u,d){const h=Mw;h.set(0,0,1),a.quaternion.vmult(h,h);const p=Ew;if(r.vsub(a.position,p),h.dot(p)<=0){if(d)return!0;const _=this.createContactEquation(l,a,t,e,c,u);_.ni.copy(h),_.ni.negate(_.ni),_.ri.set(0,0,0);const m=ww;h.scale(h.dot(r),m),r.vsub(m,m),_.rj.copy(m),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}boxParticle(e,t,i,r,s,o,a,l,c,u,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexParticle(e.convexPolyhedronRepresentation,t,i,r,s,o,a,l,e,t,d)}convexParticle(e,t,i,r,s,o,a,l,c,u,d){let h=-1;const p=Cw,g=Rw;let _=null;const m=Aw;if(m.copy(r),m.vsub(i,m),s.conjugate(cg),cg.vmult(m,m),e.pointIsInside(m)){e.worldVerticesNeedsUpdate&&e.computeWorldVertices(i,s),e.worldFaceNormalsNeedsUpdate&&e.computeWorldFaceNormals(s);for(let f=0,v=e.faces.length;f!==v;f++){const x=[e.worldVertices[e.faces[f][0]]],S=e.worldFaceNormals[f];r.vsub(x[0],ug);const R=-S.dot(ug);if(_===null||Math.abs(R)<Math.abs(_)){if(d)return!0;_=R,h=f,p.copy(S)}}if(h!==-1){const f=this.createContactEquation(l,a,t,e,c,u);p.scale(_,g),g.vadd(r,g),g.vsub(i,g),f.rj.copy(g),p.negate(f.ni),f.ri.set(0,0,0);const v=f.ri,x=f.rj;v.vadd(r,v),v.vsub(l.position,v),x.vadd(i,x),x.vsub(a.position,x),this.result.push(f),this.createFrictionEquationsFromContact(f,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(e,t,i,r,s,o,a,l,c,u,d){return this.convexHeightfield(t,e,r,i,o,s,l,a,c,u,d)}particleCylinder(e,t,i,r,s,o,a,l,c,u,d){return this.convexParticle(t,e,r,i,o,s,l,a,c,u,d)}sphereTrimesh(e,t,i,r,s,o,a,l,c,u,d){const h=OE,p=zE,g=kE,_=BE,m=HE,f=VE,v=jE,x=FE,S=DE,R=qE;rt.pointToLocalFrame(r,o,i,m);const A=e.radius;v.lowerBound.set(m.x-A,m.y-A,m.z-A),v.upperBound.set(m.x+A,m.y+A,m.z+A),t.getTrianglesInAABB(v,R);const w=UE,P=e.radius*e.radius;for(let N=0;N<R.length;N++)for(let F=0;F<3;F++)if(t.getVertex(t.indices[R[N]*3+F],w),w.vsub(m,S),S.lengthSquared()<=P){if(x.copy(w),rt.pointToWorldFrame(r,o,x,w),w.vsub(i,S),d)return!0;let O=this.createContactEquation(a,l,e,t,c,u);O.ni.copy(S),O.ni.normalize(),O.ri.copy(O.ni),O.ri.scale(e.radius,O.ri),O.ri.vadd(i,O.ri),O.ri.vsub(a.position,O.ri),O.rj.copy(w),O.rj.vsub(l.position,O.rj),this.result.push(O),this.createFrictionEquationsFromContact(O,this.frictionResult)}for(let N=0;N<R.length;N++)for(let F=0;F<3;F++){t.getVertex(t.indices[R[N]*3+F],h),t.getVertex(t.indices[R[N]*3+(F+1)%3],p),p.vsub(h,g),m.vsub(p,f);const O=f.dot(g);m.vsub(h,f);let D=f.dot(g);if(D>0&&O<0&&(m.vsub(h,f),_.copy(g),_.normalize(),D=f.dot(_),_.scale(D,f),f.vadd(h,f),f.distanceTo(m)<e.radius)){if(d)return!0;const I=this.createContactEquation(a,l,e,t,c,u);f.vsub(m,I.ni),I.ni.normalize(),I.ni.scale(e.radius,I.ri),I.ri.vadd(i,I.ri),I.ri.vsub(a.position,I.ri),rt.pointToWorldFrame(r,o,f,f),f.vsub(l.position,I.rj),rt.vectorToWorldFrame(o,I.ni,I.ni),rt.vectorToWorldFrame(o,I.ri,I.ri),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}}const W=GE,y=WE,M=XE,B=IE;for(let N=0,F=R.length;N!==F;N++){t.getTriangleVertices(R[N],W,y,M),t.getNormal(R[N],B),m.vsub(W,f);let O=f.dot(B);if(B.scale(O,f),m.vsub(f,f),O=f.distanceTo(m),_i.pointInTriangle(f,W,y,M)&&O<e.radius){if(d)return!0;let D=this.createContactEquation(a,l,e,t,c,u);f.vsub(m,D.ni),D.ni.normalize(),D.ni.scale(e.radius,D.ri),D.ri.vadd(i,D.ri),D.ri.vsub(a.position,D.ri),rt.pointToWorldFrame(r,o,f,f),f.vsub(l.position,D.rj),rt.vectorToWorldFrame(o,D.ni,D.ni),rt.vectorToWorldFrame(o,D.ri,D.ri),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}}R.length=0}planeTrimesh(e,t,i,r,s,o,a,l,c,u,d){const h=new T,p=PE;p.set(0,0,1),s.vmult(p,p);for(let g=0;g<t.vertices.length/3;g++){t.getVertex(g,h);const _=new T;_.copy(h),rt.pointToWorldFrame(r,o,_,h);const m=LE;if(h.vsub(i,m),p.dot(m)<=0){if(d)return!0;const v=this.createContactEquation(a,l,e,t,c,u);v.ni.copy(p);const x=NE;p.scale(m.dot(p),x),h.vsub(x,x),v.ri.copy(x),v.ri.vsub(a.position,v.ri),v.rj.copy(h),v.rj.vsub(l.position,v.rj),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}}}const Lr=new T,ds=new T,fs=new T,AE=new T,CE=new T,RE=new Tn,bE=new Tn,PE=new T,LE=new T,NE=new T,IE=new T,DE=new T;new T;const UE=new T,FE=new T,OE=new T,zE=new T,kE=new T,BE=new T,HE=new T,VE=new T,GE=new T,WE=new T,XE=new T,jE=new Ln,qE=[],ll=new T,lg=new T,YE=new T,$E=new T,KE=new T;function ZE(n,e,t){let i=null;const r=n.length;for(let s=0;s!==r;s++){const o=n[s],a=YE;n[(s+1)%r].vsub(o,a);const l=$E;a.cross(e,l);const c=KE;t.vsub(o,c);const u=l.dot(c);if(i===null||u>0&&i===!0||u<=0&&i===!1){i===null&&(i=u>0);continue}else return!1}return!0}const cl=new T,JE=new T,QE=new T,ew=new T,tw=[new T,new T,new T,new T,new T,new T],nw=new T,iw=new T,rw=new T,sw=new T,ow=new T,aw=new T,lw=new T,cw=new T,uw=new T,hw=new T,dw=new T,fw=new T,pw=new T,mw=new T;new T;new T;const gw=new T,vw=new T,_w=new T,xw=new T,yw=new T,Sw=new T,Mw=new T,Ew=new T,ww=new T,Tw=new T,cg=new Tn,Aw=new T;new T;const Cw=new T,ug=new T,Rw=new T,bw=new T,Pw=new T,Lw=[0],Nw=new T,Iw=new T;class hg{constructor(){this.current=[],this.previous=[]}getKey(e,t){if(t<e){const i=t;t=e,e=i}return e<<16|t}set(e,t){const i=this.getKey(e,t),r=this.current;let s=0;for(;i>r[s];)s++;if(i!==r[s]){for(let o=r.length-1;o>=s;o--)r[o+1]=r[o];r[s]=i}}tick(){const e=this.current;this.current=this.previous,this.previous=e,this.current.length=0}getDiff(e,t){const i=this.current,r=this.previous,s=i.length,o=r.length;let a=0;for(let l=0;l<s;l++){let c=!1;const u=i[l];for(;u>r[a];)a++;c=u===r[a],c||dg(e,u)}a=0;for(let l=0;l<o;l++){let c=!1;const u=r[l];for(;u>i[a];)a++;c=i[a]===u,c||dg(t,u)}}}function dg(n,e){n.push((e&4294901760)>>16,e&65535)}const ku=(n,e)=>n<e?`${n}-${e}`:`${e}-${n}`;class Dw{constructor(){this.data={keys:[]}}get(e,t){const i=ku(e,t);return this.data[i]}set(e,t,i){const r=ku(e,t);this.get(e,t)||this.data.keys.push(r),this.data[r]=i}delete(e,t){const i=ku(e,t),r=this.data.keys.indexOf(i);r!==-1&&this.data.keys.splice(r,1),delete this.data[i]}reset(){const e=this.data,t=e.keys;for(;t.length>0;){const i=t.pop();delete e[i]}}}class Uw extends N_{constructor(e){e===void 0&&(e={}),super(),this.dt=-1,this.allowSleep=!!e.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=e.quatNormalizeSkip!==void 0?e.quatNormalizeSkip:0,this.quatNormalizeFast=e.quatNormalizeFast!==void 0?e.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new T,e.gravity&&this.gravity.copy(e.gravity),e.frictionGravity&&(this.frictionGravity=new T,this.frictionGravity.copy(e.frictionGravity)),this.broadphase=e.broadphase!==void 0?e.broadphase:new VM,this.bodies=[],this.hasActiveBodies=!1,this.solver=e.solver!==void 0?e.solver:new xE,this.constraints=[],this.narrowphase=new TE(this),this.collisionMatrix=new Zm,this.collisionMatrixPrevious=new Zm,this.bodyOverlapKeeper=new hg,this.shapeOverlapKeeper=new hg,this.contactmaterials=[],this.contactMaterialTable=new Dw,this.defaultMaterial=new H_("default"),this.defaultContactMaterial=new Zc(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(e,t){return this.contactMaterialTable.get(e.id,t.id)}collisionMatrixTick(){const e=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=e,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(e){this.constraints.push(e)}removeConstraint(e){const t=this.constraints.indexOf(e);t!==-1&&this.constraints.splice(t,1)}rayTest(e,t,i){i instanceof bc?this.raycastClosest(e,t,{skipBackfaces:!0},i):this.raycastAll(e,t,{skipBackfaces:!0},i)}raycastAll(e,t,i,r){return i===void 0&&(i={}),i.mode=_i.ALL,i.from=e,i.to=t,i.callback=r,Bu.intersectWorld(this,i)}raycastAny(e,t,i,r){return i===void 0&&(i={}),i.mode=_i.ANY,i.from=e,i.to=t,i.result=r,Bu.intersectWorld(this,i)}raycastClosest(e,t,i,r){return i===void 0&&(i={}),i.mode=_i.CLOSEST,i.from=e,i.to=t,i.result=r,Bu.intersectWorld(this,i)}addBody(e){this.bodies.includes(e)||(e.index=this.bodies.length,this.bodies.push(e),e.world=this,e.initPosition.copy(e.position),e.initVelocity.copy(e.velocity),e.timeLastSleepy=this.time,e instanceof Re&&(e.initAngularVelocity.copy(e.angularVelocity),e.initQuaternion.copy(e.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=e,this.idToBodyMap[e.id]=e,this.dispatchEvent(this.addBodyEvent))}removeBody(e){e.world=null;const t=this.bodies.length-1,i=this.bodies,r=i.indexOf(e);if(r!==-1){i.splice(r,1);for(let s=0;s!==i.length;s++)i[s].index=s;this.collisionMatrix.setNumObjects(t),this.removeBodyEvent.body=e,delete this.idToBodyMap[e.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(e){return this.idToBodyMap[e]}getShapeById(e){const t=this.bodies;for(let i=0;i<t.length;i++){const r=t[i].shapes;for(let s=0;s<r.length;s++){const o=r[s];if(o.id===e)return o}}return null}addContactMaterial(e){this.contactmaterials.push(e),this.contactMaterialTable.set(e.materials[0].id,e.materials[1].id,e)}removeContactMaterial(e){const t=this.contactmaterials.indexOf(e);t!==-1&&(this.contactmaterials.splice(t,1),this.contactMaterialTable.delete(e.materials[0].id,e.materials[1].id))}fixedStep(e,t){e===void 0&&(e=1/60),t===void 0&&(t=10);const i=Dt.now()/1e3;if(!this.lastCallTime)this.step(e,void 0,t);else{const r=i-this.lastCallTime;this.step(e,r,t)}this.lastCallTime=i}step(e,t,i){if(i===void 0&&(i=10),t===void 0)this.internalStep(e),this.time+=e;else{this.accumulator+=t;const r=Dt.now();let s=0;for(;this.accumulator>=e&&s<i&&(this.internalStep(e),this.accumulator-=e,s++,!(Dt.now()-r>e*1e3)););this.accumulator=this.accumulator%e;const o=this.accumulator/e;for(let a=0;a!==this.bodies.length;a++){const l=this.bodies[a];l.previousPosition.lerp(l.position,o,l.interpolatedPosition),l.previousQuaternion.slerp(l.quaternion,o,l.interpolatedQuaternion),l.previousQuaternion.normalize()}this.time+=t}}internalStep(e){this.dt=e;const t=this.contacts,i=Bw,r=Hw,s=this.bodies.length,o=this.bodies,a=this.solver,l=this.gravity,c=this.doProfiling,u=this.profile,d=Re.DYNAMIC;let h=-1/0;const p=this.constraints,g=kw;l.length();const _=l.x,m=l.y,f=l.z;let v=0;for(c&&(h=Dt.now()),v=0;v!==s;v++){const N=o[v];if(N.type===d){const F=N.force,O=N.mass;F.x+=O*_,F.y+=O*m,F.z+=O*f}}for(let N=0,F=this.subsystems.length;N!==F;N++)this.subsystems[N].update();c&&(h=Dt.now()),i.length=0,r.length=0,this.broadphase.collisionPairs(this,i,r),c&&(u.broadphase=Dt.now()-h);let x=p.length;for(v=0;v!==x;v++){const N=p[v];if(!N.collideConnected)for(let F=i.length-1;F>=0;F-=1)(N.bodyA===i[F]&&N.bodyB===r[F]||N.bodyB===i[F]&&N.bodyA===r[F])&&(i.splice(F,1),r.splice(F,1))}this.collisionMatrixTick(),c&&(h=Dt.now());const S=zw,R=t.length;for(v=0;v!==R;v++)S.push(t[v]);t.length=0;const A=this.frictionEquations.length;for(v=0;v!==A;v++)g.push(this.frictionEquations[v]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(i,r,this,t,S,this.frictionEquations,g),c&&(u.narrowphase=Dt.now()-h),c&&(h=Dt.now()),v=0;v<this.frictionEquations.length;v++)a.addEquation(this.frictionEquations[v]);const w=t.length;for(let N=0;N!==w;N++){const F=t[N],O=F.bi,D=F.bj,$=F.si,I=F.sj;let U;if(O.material&&D.material?U=this.getContactMaterial(O.material,D.material)||this.defaultContactMaterial:U=this.defaultContactMaterial,U.friction,O.material&&D.material&&(O.material.friction>=0&&D.material.friction>=0&&O.material.friction*D.material.friction,O.material.restitution>=0&&D.material.restitution>=0&&(F.restitution=O.material.restitution*D.material.restitution)),a.addEquation(F),O.allowSleep&&O.type===Re.DYNAMIC&&O.sleepState===Re.SLEEPING&&D.sleepState===Re.AWAKE&&D.type!==Re.STATIC){const j=D.velocity.lengthSquared()+D.angularVelocity.lengthSquared(),Q=D.sleepSpeedLimit**2;j>=Q*2&&(O.wakeUpAfterNarrowphase=!0)}if(D.allowSleep&&D.type===Re.DYNAMIC&&D.sleepState===Re.SLEEPING&&O.sleepState===Re.AWAKE&&O.type!==Re.STATIC){const j=O.velocity.lengthSquared()+O.angularVelocity.lengthSquared(),Q=O.sleepSpeedLimit**2;j>=Q*2&&(D.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(O,D,!0),this.collisionMatrixPrevious.get(O,D)||(Lo.body=D,Lo.contact=F,O.dispatchEvent(Lo),Lo.body=O,D.dispatchEvent(Lo)),this.bodyOverlapKeeper.set(O.id,D.id),this.shapeOverlapKeeper.set($.id,I.id)}for(this.emitContactEvents(),c&&(u.makeContactConstraints=Dt.now()-h,h=Dt.now()),v=0;v!==s;v++){const N=o[v];N.wakeUpAfterNarrowphase&&(N.wakeUp(),N.wakeUpAfterNarrowphase=!1)}for(x=p.length,v=0;v!==x;v++){const N=p[v];N.update();for(let F=0,O=N.equations.length;F!==O;F++){const D=N.equations[F];a.addEquation(D)}}a.solve(e,this),c&&(u.solve=Dt.now()-h),a.removeAllEquations();const P=Math.pow;for(v=0;v!==s;v++){const N=o[v];if(N.type&d){const F=P(1-N.linearDamping,e),O=N.velocity;O.scale(F,O);const D=N.angularVelocity;if(D){const $=P(1-N.angularDamping,e);D.scale($,D)}}}this.dispatchEvent(Ow),c&&(h=Dt.now());const y=this.stepnumber%(this.quatNormalizeSkip+1)===0,M=this.quatNormalizeFast;for(v=0;v!==s;v++)o[v].integrate(e,y,M);this.clearForces(),this.broadphase.dirty=!0,c&&(u.integrate=Dt.now()-h),this.stepnumber+=1,this.dispatchEvent(Fw);let B=!0;if(this.allowSleep)for(B=!1,v=0;v!==s;v++){const N=o[v];N.sleepTick(this.time),N.sleepState!==Re.SLEEPING&&(B=!0)}this.hasActiveBodies=B}emitContactEvents(){const e=this.hasAnyEventListener("beginContact"),t=this.hasAnyEventListener("endContact");if((e||t)&&this.bodyOverlapKeeper.getDiff(Ei,wi),e){for(let s=0,o=Ei.length;s<o;s+=2)No.bodyA=this.getBodyById(Ei[s]),No.bodyB=this.getBodyById(Ei[s+1]),this.dispatchEvent(No);No.bodyA=No.bodyB=null}if(t){for(let s=0,o=wi.length;s<o;s+=2)Io.bodyA=this.getBodyById(wi[s]),Io.bodyB=this.getBodyById(wi[s+1]),this.dispatchEvent(Io);Io.bodyA=Io.bodyB=null}Ei.length=wi.length=0;const i=this.hasAnyEventListener("beginShapeContact"),r=this.hasAnyEventListener("endShapeContact");if((i||r)&&this.shapeOverlapKeeper.getDiff(Ei,wi),i){for(let s=0,o=Ei.length;s<o;s+=2){const a=this.getShapeById(Ei[s]),l=this.getShapeById(Ei[s+1]);Ti.shapeA=a,Ti.shapeB=l,a&&(Ti.bodyA=a.body),l&&(Ti.bodyB=l.body),this.dispatchEvent(Ti)}Ti.bodyA=Ti.bodyB=Ti.shapeA=Ti.shapeB=null}if(r){for(let s=0,o=wi.length;s<o;s+=2){const a=this.getShapeById(wi[s]),l=this.getShapeById(wi[s+1]);Ai.shapeA=a,Ai.shapeB=l,a&&(Ai.bodyA=a.body),l&&(Ai.bodyB=l.body),this.dispatchEvent(Ai)}Ai.bodyA=Ai.bodyB=Ai.shapeA=Ai.shapeB=null}}clearForces(){const e=this.bodies,t=e.length;for(let i=0;i!==t;i++){const r=e[i];r.force,r.torque,r.force.set(0,0,0),r.torque.set(0,0,0)}}}new Ln;const Bu=new _i,Dt=globalThis.performance||{};if(!Dt.now){let n=Date.now();Dt.timing&&Dt.timing.navigationStart&&(n=Dt.timing.navigationStart),Dt.now=()=>Date.now()-n}new T;const Fw={type:"postStep"},Ow={type:"preStep"},Lo={type:Re.COLLIDE_EVENT_NAME,body:null,contact:null},zw=[],kw=[],Bw=[],Hw=[],Ei=[],wi=[],No={type:"beginContact",bodyA:null,bodyB:null},Io={type:"endContact",bodyA:null,bodyB:null},Ti={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Ai={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Vw=Math.PI/180,Gw=180/Math.PI,G_=6371e3;function Wt(n){return n*Vw}function Ta(n){return n*Gw}function Zl(n,e,t,i){const r=Wt(i-e),s=Wt(t-n),o=Math.sin(r/2)**2+Math.cos(Wt(e))*Math.cos(Wt(i))*Math.sin(s/2)**2;return 2*G_*Math.asin(Math.min(1,Math.sqrt(o)))}function Ww(n,e,t,i,r){const s=Wt(e),o=Wt(n),a=Wt(i),l=Wt(t),c=2*Math.asin(Math.sqrt(Math.sin((a-s)/2)**2+Math.cos(s)*Math.cos(a)*Math.sin((l-o)/2)**2));if(c===0)return[n,e];const u=Math.sin((1-r)*c)/Math.sin(c),d=Math.sin(r*c)/Math.sin(c),h=u*Math.cos(s)*Math.cos(o)+d*Math.cos(a)*Math.cos(l),p=u*Math.cos(s)*Math.sin(o)+d*Math.cos(a)*Math.sin(l),g=u*Math.sin(s)+d*Math.sin(a),_=Math.atan2(g,Math.sqrt(h*h+p*p)),m=Math.atan2(p,h);return[Ta(m),Ta(_)]}function fg(n,e,t,i){const r=Wt(e),s=Wt(i),o=Wt(t-n),a=Math.sin(o)*Math.cos(s),l=Math.cos(r)*Math.sin(s)-Math.sin(r)*Math.cos(s)*Math.cos(o);return(Ta(Math.atan2(a,l))+360)%360}function Do(n,e,t,i){const r=i/G_,s=Wt(t),o=Wt(e),a=Wt(n),l=Math.asin(Math.sin(o)*Math.cos(r)+Math.cos(o)*Math.sin(r)*Math.cos(s)),c=a+Math.atan2(Math.sin(s)*Math.sin(r)*Math.cos(o),Math.cos(r)-Math.sin(o)*Math.sin(l));return[Ta(c),Ta(l)]}function Xw(n,e=48){const t=[],i=[0],r=[],s=[0];for(let l=0;l<n.length-1;l++){const c=n[l],u=n[l+1];for(let d=0;d<e;d++){const h=d/e,[p,g]=Ww(c[0],c[1],u[0],u[1],h);if(t.length){const _=t[t.length-1];i.push(i[i.length-1]+Zl(_[0],_[1],p,g))}t.push([p,g]),r.push(l)}s.push(i[i.length-1]+Zl(t[t.length-1][0],t[t.length-1][1],u[0],u[1]))}const o=n[n.length-1],a=t[t.length-1];return i.push(i[i.length-1]+Zl(a[0],a[1],o[0],o[1])),t.push(o),r.push(n.length-2),{pts:t,cum:i,legIdx:r,legStartDist:s,total:i[i.length-1]}}function jw(n,e){const t=Math.max(0,Math.min(1,e))*n.total;let i=0;for(let l=0;l<n.legStartDist.length-1;l++){if(t>=n.legStartDist[l]&&t<n.legStartDist[l+1]){i=l;break}i=l}const r=n.legStartDist[i],s=n.legStartDist[i+1]??n.total,o=Math.max(1,s-r),a=t-r;return{leg:i,legFrac:Math.max(0,Math.min(1,a/o)),legRemainingM:Math.max(0,s-t),legLenM:o,travelledM:t,totalM:n.total}}function pg(n,e){const t=Math.max(0,Math.min(1,e))*n.total,{cum:i,pts:r}=n;let s=0,o=i.length-1;for(;s<o;){const _=s+o>>1;i[_]<t?s=_+1:o=_}const a=Math.max(1,s),l=i[a]-i[a-1]||1,c=(t-i[a-1])/l,u=r[a-1],d=r[a],h=u[0]+(d[0]-u[0])*c,p=u[1]+(d[1]-u[1])*c,g=Math.atan2(d[0]-u[0],d[1]-u[1]);return{lon:h,lat:p,heading:g}}const qw={massKg:200,thrustN:520,dragCoeff:.06,cruiseAltM:2400,cruiseSpeedMs:50,g:9.81},hi={designation:"HESA Shahed-136 (Geran-2) — OWA loitering munition",cruiseSpeedKmh:"~180 km/h (sources cite ~120–180 km/h; ~50 m/s)",rangeKm:"~1,000–2,000 km",cruiseAltM:"typical ~60–2,400 m; operational ceiling up to ~4,000 m",warheadKg:"~40–50 kg HE/fragmentation (estimates 20–50 kg)",lengthM:"~3.5 m",wingspanM:"~2.5 m",planform:"delta-wing, rear-mounted pusher piston engine",terminalDiveDeg:"~-60° to -65°",cite:["CSIS Missile Threat","IISS Military Balance","UK MoD / open-source intelligence reporting"]};function Yw(n,e={}){const t={...qw,...e},i=e.climbFrac??.1,r=e.diveFrac??.86,s=e.impactAngleDeg??62,o=new Uw({gravity:new T(0,-t.g,0)}),a=new Re({mass:t.massKg,position:new T(0,0,0)});o.addBody(a),a.velocity.set(t.cruiseSpeedMs,0,0);const l=2e3,c=n/l,u=[];let d=0,h=0,p=t.cruiseSpeedMs;const g=t.cruiseAltM;for(let _=0;_<=l;_++){const m=_*c,f=n>0?m/n:1,v=c/Math.max(8,Math.min(160,p));let x;if(f<i){const R=t.thrustN/t.massKg*Math.sin(.21)+.8,A=t.thrustN/t.massKg-t.dragCoeff*p*p/t.massKg;p=Math.max(8,Math.min(160,p+A*v)),h=h+R*v,d=d+h*v,d>=g&&(d=g,h=0),x=Math.atan2(h,p)}else if(f<r){const R=t.thrustN/t.massKg-t.dragCoeff*p*p/t.massKg;p=Math.max(8,Math.min(160,p+R*v)),d=g,h=0,x=0}else{const R=r<1?(f-r)/(1-r):1,A=d;d=Math.max(0,g*Math.pow(1-R,1.7)),p=Math.min(140,p+t.g*Math.sin(Wt(s))*v*.4),h=(d-A)/v,x=-Wt(s)*(.35+.65*R)}d=Math.max(0,d),o.step(v);const S=Math.hypot(p,h)||1;u.push({t:Math.min(1,f),s:m,h:d,pitch:x,speed:S})}return u.push({t:1,s:n,h:0,pitch:-Wt(s),speed:p}),{profile:u,params:t,impactAngleDeg:s,climbEnd:i,diveStart:r}}function Hu(n,e){const t=n.profile,i=Math.max(0,Math.min(1,e));let r=0,s=t.length-1;for(;r<s;){const d=r+s>>1;t[d].t<i?r=d+1:s=d}const o=Math.max(1,r),a=t[o-1],l=t[o],c=l.t-a.t||1,u=(i-a.t)/c;return{height:a.h+(l.h-a.h)*u,pitch:a.pitch+(l.pitch-a.pitch)*u,speed:a.speed+(l.speed-a.speed)*u}}const qn={primary:"#0B3D2E",accent:"#7BE0AD",accent2:"#36C98D",warn:"#ffcf3f"},ul=n=>"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(n.trim()),$w=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 48" role="img" aria-label="OnDemand">
  <defs>
    <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7BE0AD"/><stop offset="1" stop-color="#36C98D"/>
    </linearGradient>
  </defs>
  <g>
    <circle cx="24" cy="24" r="18" fill="#0B3D2E" stroke="url(#og)" stroke-width="2.5"/>
    <circle cx="24" cy="24" r="9" fill="none" stroke="#7BE0AD" stroke-width="2.5"/>
    <circle cx="24" cy="24" r="2.6" fill="#7BE0AD"/>
    <path d="M24 6 v6 M24 36 v6 M6 24 h6 M36 24 h6" stroke="#36C98D" stroke-width="2.2" stroke-linecap="round"/>
  </g>
  <text x="52" y="31" font-family="'Segoe UI',Arial,sans-serif" font-size="22" font-weight="700" fill="#E8FFF5">On<tspan fill="#7BE0AD">Demand</tspan></text>
</svg>`,Kw=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
  <defs>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7BE0AD" stop-opacity="0.55"/>
      <stop offset="0.5" stop-color="#36C98D" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#0B3D2E" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="1580" height="880" rx="14" fill="none" stroke="url(#edge)" stroke-width="2"/>
  <g stroke="#7BE0AD" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M22 70 V30 H62"/><path d="M1538 30 H1578 V70"/>
    <path d="M1578 830 V870 H1538"/><path d="M62 870 H22 V830"/>
  </g>
  <g fill="#7BE0AD" opacity="0.5" font-family="monospace" font-size="13">
    <text x="34" y="26">ONDEMAND · SENTINEL</text>
    <text x="1430" y="26">IMP-08 // WARDA</text>
  </g>
  <line x1="800" y1="30" x2="800" y2="58" stroke="#7BE0AD" stroke-width="1.5" opacity="0.4"/>
  <text x="772" y="74" fill="#7BE0AD" opacity="0.45" font-family="monospace" font-size="12">N</text>
</svg>`,Ji=n=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${n}</svg>`,Zw={launch:Ji('<path d="M12 2c3 2.5 4 6 4 9l-4 4-4-4c0-3 1-6.5 4-9z"/><circle cx="12" cy="9" r="1.6"/><path d="M9 16l-2 5 5-2 5 2-2-5"/>'),orbit:Ji('<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><circle cx="22" cy="12" r="1.2" fill="currentColor"/>'),chase:Ji('<path d="M3 17l6-2 4-7 5 2-3 6 5 1"/><circle cx="9" cy="15" r="1.4"/>'),topdown:Ji('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 4v16M4 12h16"/><circle cx="12" cy="12" r="2"/>'),freefly:Ji('<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="4"/><path d="M12 8l0 0"/>'),thermal:Ji('<path d="M14 14.5V6a2 2 0 1 0-4 0v8.5a4 4 0 1 0 4 0z"/><path d="M12 8v6"/>'),impact:Ji('<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>'),cinema:Ji('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M8 6v12M16 6v12"/>')},Jw=`
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="sh" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfeede"/><stop offset="1" stop-color="#5a8f78"/>
    </linearGradient>
  </defs>
  <g transform="translate(32,32)">
    <!-- fuselage -->
    <rect x="-2.4" y="-26" width="4.8" height="48" rx="2.4" fill="url(#sh)" stroke="#0B3D2E" stroke-width="1"/>
    <!-- delta wing -->
    <path d="M0 -6 L26 16 L0 8 L-26 16 Z" fill="url(#sh)" stroke="#0B3D2E" stroke-width="1"/>
    <!-- tail fins -->
    <path d="M0 18 L8 26 L0 22 L-8 26 Z" fill="#7BE0AD" stroke="#0B3D2E" stroke-width="0.8"/>
    <!-- warhead nose -->
    <circle cx="0" cy="-24" r="3.2" fill="#ff453a" stroke="#0B3D2E" stroke-width="1"/>
    <!-- prop -->
    <line x1="-6" y1="24" x2="6" y2="24" stroke="#0B3D2E" stroke-width="1.4"/>
  </g>
</svg>`;function Qw(n,e=!1){const t=e?"#7BE0AD":"#0B3D2E",i=e?"#072A20":"#7BE0AD",r=e?"#E8FFF5":"#36C98D";return`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 56">
  <path d="M24 54 C8 36 4 28 4 20 a20 20 0 0 1 40 0 c0 8-4 16-20 34z" fill="${t}" stroke="${r}" stroke-width="2.5"/>
  <circle cx="24" cy="20" r="12" fill="#072A20" stroke="${r}" stroke-width="1.5"/>
  <text x="24" y="25.5" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="800" fill="${i}">${n}</text>
</svg>`}const W_=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path d="M24 4 L44 40 H4 Z" fill="#1a0d00" stroke="#ff7a18" stroke-width="2.5"/>
  <path d="M24 14 c4 4 5 7 5 10 a5 5 0 1 1-10 0 c0-3 1-6 5-10z" fill="#ff453a"/>
  <rect x="22.5" y="22" width="3" height="9" rx="1.5" fill="#ffcf3f"/>
  <circle cx="24" cy="35" r="1.9" fill="#ffcf3f"/>
</svg>`,e1=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="26" fill="none" stroke="#7BE0AD" stroke-width="2" stroke-dasharray="5 5"/>
  <circle cx="32" cy="32" r="17" fill="none" stroke="#36C98D" stroke-width="1.4" stroke-dasharray="3 4" opacity="0.7"/>
  <circle cx="32" cy="32" r="3" fill="#ff453a"/>
  <path d="M32 6 v8" stroke="#7BE0AD" stroke-width="2" stroke-linecap="round"/>
</svg>`,hl={launch:ul('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 56"><path d="M24 54 C8 36 4 28 4 20 a20 20 0 0 1 40 0 c0 8-4 16-20 34z" fill="#ff453a" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="20" r="11" fill="#1a0d00" stroke="#fff" stroke-width="1.5"/><path d="M24 13c3 2.4 4 5 4 7l-4 3-4-3c0-2 1-4.6 4-7z" fill="#ffcf3f"/></svg>'),impact:ul('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 56"><path d="M24 54 C8 36 4 28 4 20 a20 20 0 0 1 40 0 c0 8-4 16-20 34z" fill="#af52de" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="20" r="11" fill="#1a0a1f" stroke="#fff" stroke-width="1.5"/><circle cx="24" cy="20" r="6" fill="none" stroke="#ff7a18" stroke-width="2"/><circle cx="24" cy="20" r="1.6" fill="#ff453a"/></svg>'),shahed:ul(Jw),thermalAlert:ul(W_)},Z=Cesium,Rt=(n,e,t=0)=>Z.Cartesian3.fromDegrees(n,e,t),Ke=(n,e=0)=>Number.isFinite(n)?n:e,qo=(n,e,t)=>Math.min(t,Math.max(e,Ke(n,e))),dl=(n,e,t,i)=>{const r=Ke(n,e),s=Ke(e,r);return r+(s-r)*(1-Math.exp(-t*Math.max(0,Math.min(.1,i))))},mg=(n,e,t,i)=>{let r=Ke(n,e),o=(Ke(e,r)-r+540)%360-180;return r+o*(1-Math.exp(-t*Math.max(0,Math.min(.1,i))))},fl=n=>!!n&&Number.isFinite(n.x)&&Number.isFinite(n.y)&&Number.isFinite(n.z),pl=(n,e)=>{try{const t=document.createElement("canvas");t.width=t.height=64;const i=t.getContext("2d");if(!i)return;const r=i.createRadialGradient(32,32,0,32,32,32);return r.addColorStop(0,n),r.addColorStop(.5,e),r.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=r,i.beginPath(),i.arc(32,32,32,0,Math.PI*2),i.fill(),t.toDataURL("image/png")}catch{return}},X_=-85,j_=-10,Vu=n=>qo(n,X_,j_),Uo={launch:()=>Rt(56.2808,27.1865,40),gulfMid:()=>Rt(55.835,26.1822,0),dubai:()=>Rt(55.2744,25.1972,0),impact:()=>Rt(55.3892,25.1779,20)};class t1{constructor(e){this.container=e,this._destroyed=!1,this.ionMode="free",this.camMode="orbit",this.thermal=!1,this.progress=0,this._cbReady=null,this._cbPick=null,this._cbTick=null,this._orbitAngle=0,this._playing=!1,this._trackMode="launch",this._camState=null,this._rafId=0,this._lastT=0,this._impactFired=!1;const t=jm();this.path=Xw(t,90),this.cruiseAlt=Di.cruiseAltM,this.ballistic=Yw(this.path.total,{cruiseAltM:Di.cruiseAltM,impactAngleDeg:62,climbFrac:.1,diveFrac:.86}),this.thermalReport=L_(ip),this._initViewer(),this._buildStatic(),this._buildDrone(),this._buildThermalLayer(),this._installPick(),this._installResize(),this.setProgress(0),this.setCamMode("launch"),this._startLoop(),this._cbReady&&this._cbReady()}onReady(e){this._cbReady=e,this.viewer&&e()}onPick(e){this._cbPick=e}onTick(e){this._cbTick=e}_startLoop(){cancelAnimationFrame(this._rafId),this._lastT=performance.now();const e=t=>{if(this._destroyed)return;const i=Math.max(0,Math.min(.1,(t-this._lastT)/1e3));if(this._lastT=t,this._playing){let r=this.progress+i/mM.flightSeconds;r>=1&&(r=1,this._playing=!1),this._setProgressInternal(r)}this._driveCamera(i),this._cbTick&&(this._playing!==this._lastEmitPlaying||Math.abs(this.progress-(this._lastEmitProgress??-1))>1e-4)&&(this._lastEmitPlaying=this._playing,this._lastEmitProgress=this.progress,this._cbTick(this.readout(),{playing:this._playing,progress:this.progress})),this._rafId=requestAnimationFrame(e)};this._rafId=requestAnimationFrame(e)}_installResize(){this._onResize=()=>{if(!(!this.viewer||this._destroyed))try{this.viewer.resize(),this._applyFrustum(this._trackMode)}catch{}},window.addEventListener("resize",this._onResize);try{this._ro=new ResizeObserver(()=>this._onResize()),this._ro.observe(this.container)}catch{this._ro=null}}_applyFrustum(e){const t=this.viewer?.camera;if(!t||!t.frustum||t.frustum.near==null)return;const i=e==="impact"||e==="chase"||e==="thermal"||e==="topdown";t.frustum.near=i?1:5,t.frustum.far=3e7}_altAt(e){const t=Hu(this.ballistic,e).height;return Math.max(Ye.height,t)}_pitchAt(e){return Hu(this.ballistic,e).pitch}_posAt(e){const t=pg(this.path,e),i=Hu(this.ballistic,e);return{lon:t.lon,lat:t.lat,height:Math.max(Ye.height,i.height),heading:t.heading,pitch:i.pitch,speed:i.speed}}_initViewer(){this.viewer=new Z.Viewer(this.container,{baseLayer:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,animation:!1,timeline:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:Z.ShadowMode.ENABLED,requestRenderMode:!1,contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance"}}}),this.viewer._cesiumWidget._creditContainer.style.display="none",this._addCapturedImagery();const e=this.viewer.scene;try{e.rethrowRenderErrors=!1,e.renderError.addEventListener((i,r)=>{if(!this._renderRecovered){this._renderRecovered=!0,console.warn("[CesiumScene] renderError — disabling post-processing and recovering:",r);try{const s=e.postProcessStages;s&&(s.bloom&&(s.bloom.enabled=!1),s.fxaa&&(s.fxaa.enabled=!1),s.removeAll&&s.removeAll())}catch{}try{e.highDynamicRange=!1}catch{}try{e.msaaSamples=1}catch{}try{e.requestRender()}catch{}}})}catch{}try{e.highDynamicRangeSupported!==!1&&(e.highDynamicRange=!0)}catch{}try{e.msaaSupported!==!1?e.msaaSamples=4:e.msaaSamples=1}catch{try{e.msaaSamples=1}catch{}}try{e.postProcessStages&&e.postProcessStages.fxaa&&(e.postProcessStages.fxaa.enabled=!0)}catch{}e.globe.enableLighting=!0,e.globe.dynamicAtmosphereLighting=!0,e.globe.dynamicAtmosphereLightingFromSun=!0,e.globe.showGroundAtmosphere=!0,e.globe.atmosphereLightIntensity=14;try{e.globe.lightingFadeOutDistance=4e4,e.globe.lightingFadeInDistance=2e4,e.globe.nightFadeOutDistance=4e4,e.globe.atmosphereScatteringIntensity=2.6,e.light&&(e.light.intensity=3),"imageBasedLighting"in e&&e.imageBasedLighting&&(e.imageBasedLighting.imageBasedLightingFactor=new Z.Cartesian2(1,1),e.imageBasedLighting.luminanceAtZenith=.5),"sphericalHarmonicCoefficients"in e}catch{}e.globe.depthTestAgainstTerrain=!0,e.globe.baseColor=Z.Color.fromCssColorString("#0b1424"),e.globe.maximumScreenSpaceError=1.5,e.globe.preloadSiblings=!0,e.fog.enabled=!0,e.fog.density=12e-5,e.fog.screenSpaceErrorFactor=4,e.skyAtmosphere.show=!0,e.skyAtmosphere.atmosphereLightIntensity=18;try{"Tonemapper"in Z&&e.postProcessStages&&"tonemapper"in e.postProcessStages&&(e.postProcessStages.tonemapper=Z.Tonemapper.ACES)}catch{}try{e.preloadFlightDestinations=!0,e.camera.percentageChanged=.1}catch{}try{const i=e.postProcessStages.bloom;i&&(i.enabled=!0,i.uniforms.glowOnly=!1,i.uniforms.contrast=128,i.uniforms.brightness=-.2,i.uniforms.delta=1,i.uniforms.sigma=2.6,i.uniforms.stepSize=1)}catch{}try{const i=Z.PostProcessStageLibrary;if((typeof i.isSilhouetteSupported=="function"?i.isSilhouetteSupported(e):!1)&&!this._sharpenAdded){const s=i.createEdgeDetectionStage();s.uniforms.length=.1,s.uniforms.color=Z.Color.fromCssColorString("#0b3d2e").withAlpha(.16);const o=i.createSilhouetteStage([s]);e.postProcessStages.add(o),this._sharpenAdded=!0}}catch{}const t=e.screenSpaceCameraController;t.enableCollisionDetection=!0,t.enableInputs=!0,t.enableRotate=!0,t.enableZoom=!0,t.enableTilt=!0,t.enableTranslate=!0,t.enableLook=!0,t.inertiaSpin=.85,t.inertiaTranslate=.85,t.inertiaZoom=.82,t.enableZoom=!0,t.minimumZoomDistance=5,t.maximumZoomDistance=2e7,this._userControls=t,e.camera.frustum&&e.camera.frustum.near!=null&&(e.camera.frustum.near=1,e.camera.frustum.far=3e7);try{this._dayIso="2025-06-21T09:30:00Z",this._applyDaylight(),e.sun&&(e.sun.show=!0),e.moon&&(e.moon.show=!1),e.globe.enableLighting=!0,e.globe.atmosphereLightIntensity=20,e.light&&(e.light=new Z.SunLight,e.light.intensity=3)}catch{}this.flyOverview(0)}_applyDaylight(){try{const e=this.viewer&&this.viewer.scene;if(!e)return;this._dayIso&&(this.viewer.clock.currentTime=Z.JulianDate.fromIso8601(this._dayIso)),e.globe.enableLighting=!0,e.sun&&(e.sun.show=!0),e.moon&&(e.moon.show=!1),e.skyAtmosphere&&(e.skyAtmosphere.show=!0),e.fog&&(e.fog.enabled=!0),e.globe.showGroundAtmosphere=!0;try{e.light instanceof Z.SunLight||(e.light=new Z.SunLight,e.light.intensity=3)}catch{}}catch{}}_addCapturedImagery(){const e=this.viewer.imageryLayers,t=(r,s,o,a,l)=>{try{const c=Z.Rectangle.fromDegrees(s-a,o-a,s+a,o+a),u=new Z.SingleTileImageryProvider({url:r,rectangle:c,tileWidth:256,tileHeight:256}),d=e.addImageryProvider(u);l!=null&&(d.alpha=l);try{d.magnificationFilter=Z.TextureMagnificationFilter.LINEAR,d.minificationFilter=Z.TextureMinificationFilter.LINEAR,d.contrast=1.06,d.saturation=1.08,d.gamma=1.02,d.brightness=1.02}catch{}return d}catch{return null}},i=Ps.backdrop||{};t(i.groundOverlay||"/imagery/dubai-2d.png",55.2708,25.2048,.45,1),t(i.launchArea||"/imagery/bandar-abbas-3d.png",56.2893,27.1842,.3,.95),t(i.corridorMid||"/imagery/gulf-midpoint-3d.png",55.8469,26.185,.3,.95),t("/imagery/alwarqa-2d.png",55.4045,25.1858,.06,1)}flyOverview(e=2.2){this._flyToFrame(Uo.dubai(),-18,-55,38e4,Math.max(.001,e))}_buildStatic(){const e=this.viewer,t=[],i=240;for(let r=0;r<=i;r++){const s=r/i,o=this._posAt(s);t.push(o.lon,o.lat,o.height)}this.corridorEntity=e.entities.add({polyline:{positions:Z.Cartesian3.fromDegreesArrayHeights(t),width:3,material:new Z.PolylineGlowMaterialProperty({glowPower:.28,color:Z.Color.fromCssColorString(qn.accent)})}}),e.entities.add({polyline:{positions:Z.Cartesian3.fromDegreesArray(jm().flat()),width:2,clampToGround:!0,material:new Z.PolylineDashMaterialProperty({color:Z.Color.fromCssColorString(qn.accent2).withAlpha(.5),dashLength:16})}}),this.waypointEntities=Di.waypoints.map((r,s)=>e.entities.add({id:`wp-${s}`,position:Rt(r.lon,r.lat,this._altAt(s/(Di.waypoints.length-1))+200),point:{pixelSize:11,color:Z.Color.fromCssColorString(qn.accent),outlineColor:Z.Color.WHITE,outlineWidth:2,disableDepthTestDistance:Number.POSITIVE_INFINITY},label:{text:`${r.legOrder}  ${r.name}`,font:"600 14px Segoe UI, sans-serif",fillColor:Z.Color.WHITE,showBackground:!0,backgroundColor:Z.Color.fromCssColorString(qn.primary).withAlpha(.82),backgroundPadding:new Z.Cartesian2(8,5),pixelOffset:new Z.Cartesian2(0,-26),style:Z.LabelStyle.FILL,disableDepthTestDistance:Number.POSITIVE_INFINITY,scaleByDistance:new Z.NearFarScalar(6e4,1,14e5,.4)},_wp:r})),e.entities.add({id:"launch-site",position:Rt(Xn.lon,Xn.lat,Xn.height),billboard:{image:hl.launch,width:40,height:47,verticalOrigin:Z.VerticalOrigin.BOTTOM,disableDepthTestDistance:Number.POSITIVE_INFINITY},label:{text:"IRAN LAUNCH SITE",font:"700 13px Segoe UI",fillColor:Z.Color.fromCssColorString("#ff8a7a"),showBackground:!0,backgroundColor:Z.Color.fromCssColorString("#2a0c08").withAlpha(.85),pixelOffset:new Z.Cartesian2(0,14),disableDepthTestDistance:Number.POSITIVE_INFINITY},_site:Xn}),e.entities.add({id:"impact-site",position:Rt(Ye.lon,Ye.lat,Ye.height),billboard:{image:hl.impact,width:40,height:47,verticalOrigin:Z.VerticalOrigin.BOTTOM,disableDepthTestDistance:Number.POSITIVE_INFINITY},label:{text:"WARDA APTS · IMPACT",font:"700 13px Segoe UI",fillColor:Z.Color.fromCssColorString("#e0b3ff"),showBackground:!0,backgroundColor:Z.Color.fromCssColorString("#1a0a1f").withAlpha(.85),pixelOffset:new Z.Cartesian2(0,14),disableDepthTestDistance:Number.POSITIVE_INFINITY},_site:Ye}),this.geofenceEntity=e.entities.add({position:Rt(nn.centerLon,nn.centerLat,0),ellipse:{semiMajorAxis:nn.radiusM,semiMinorAxis:nn.radiusM,material:Z.Color.fromCssColorString(qn.accent).withAlpha(.06),outline:!0,outlineColor:Z.Color.fromCssColorString(qn.accent).withAlpha(.9),outlineWidth:2,height:0,heightReference:Z.HeightReference.NONE}}),e.entities.add({position:Rt(nn.centerLon,nn.centerLat,0),ellipse:{semiMajorAxis:nn.radiusM,semiMinorAxis:nn.radiusM,fill:!1,outline:!0,outlineColor:Z.Color.fromCssColorString(qn.warn).withAlpha(.55),outlineWidth:1,height:1500}}),this._geofenceCross=this._findGeofenceCrossing(),this._geofenceCross&&e.entities.add({position:Rt(this._geofenceCross.lon,this._geofenceCross.lat,this._altAt(this._geofenceCross.t)+200),point:{pixelSize:10,color:Z.Color.fromCssColorString(qn.warn),outlineColor:Z.Color.BLACK,outlineWidth:2,disableDepthTestDistance:Number.POSITIVE_INFINITY},label:{text:"GEOFENCE TRIPWIRE · +8.2 min warning",font:"600 12px Segoe UI",fillColor:Z.Color.fromCssColorString(qn.warn),showBackground:!0,backgroundColor:Z.Color.fromCssColorString("#2a2400").withAlpha(.85),pixelOffset:new Z.Cartesian2(0,-22),disableDepthTestDistance:Number.POSITIVE_INFINITY}})}_findGeofenceCrossing(){let e=null;for(let t=0;t<=400;t++){const i=t/400,r=pg(this.path,i),s=Zl(r.lon,r.lat,nn.centerLon,nn.centerLat);if(e&&e.d>nn.radiusM&&s<=nn.radiusM)return{lon:r.lon,lat:r.lat,t:i};e={d:s}}return null}_buildDrone(){const e=this.viewer;this._dronePos=Rt(Xn.lon,Xn.lat,Xn.height),this._droneHeading=0,this._trail=[];const t=new Z.CallbackProperty(()=>this._dronePos,!1),i=new Z.CallbackProperty(()=>{try{const r=new Z.HeadingPitchRoll(Ke(this._droneHeading,0),Ke(this._dronePitch,0),0);return Z.Transforms.headingPitchRollQuaternion(this._dronePos,r)}catch{return}},!1);this._modelFailed=!1,this.droneEntity=e.entities.add({position:t,orientation:i,model:{uri:"/shahed136.glb",minimumPixelSize:64,maximumScale:2e3,scale:12,runAnimations:!1,heightReference:Z.HeightReference.NONE},billboard:{image:hl.shahed,width:46,height:46,rotation:new Z.CallbackProperty(()=>-this._droneHeading,!1),alignedAxis:Z.Cartesian3.UNIT_Z,disableDepthTestDistance:Number.POSITIVE_INFINITY,scaleByDistance:new Z.NearFarScalar(3e3,1.6,6e5,.35),show:new Z.CallbackProperty(()=>this._modelFailed===!0,!1)},label:{text:"SHAHED-136 · OWA",font:"600 12px Segoe UI",fillColor:Z.Color.fromCssColorString(qn.accent),showBackground:!0,backgroundColor:Z.Color.fromCssColorString(qn.primary).withAlpha(.8),pixelOffset:new Z.Cartesian2(0,26),disableDepthTestDistance:Number.POSITIVE_INFINITY,scaleByDistance:new Z.NearFarScalar(4e4,1,5e5,0)}});try{const r=this.droneEntity.model;r&&r.readyEvent&&r.errorEvent&&r.errorEvent.addEventListener(s=>{console.warn("[CesiumScene] drone model failed to load → billboard fallback:",s),this._modelFailed=!0})}catch{}this.trailEntity=e.entities.add({polyline:{positions:new Z.CallbackProperty(()=>this._trail,!1),width:3,material:new Z.PolylineGlowMaterialProperty({glowPower:.5,color:Z.Color.fromCssColorString("#ff7a18")})}})}_buildThermalLayer(){const e=this.viewer;this.thermalEntities=[],this.thermalReport.alerts.forEach(t=>{const i=t.severity==="CRITICAL"?"#ff2d1a":t.severity==="HIGH"?"#ff7a18":t.severity==="ELEVATED"?"#ffcf3f":"#ffe9a8",r=600+t.frp*320,s=e.entities.add({show:!1,position:Rt(t.lon,t.lat,30),ellipse:{semiMajorAxis:r,semiMinorAxis:r,material:Z.Color.fromCssColorString(i).withAlpha(.35),outline:!0,outlineColor:Z.Color.fromCssColorString(i).withAlpha(.9),height:20},point:{pixelSize:6+Math.min(14,t.frp*1.4),color:Z.Color.fromCssColorString(i),outlineColor:Z.Color.BLACK,outlineWidth:1,disableDepthTestDistance:Number.POSITIVE_INFINITY},_thermal:t});if(this.thermalEntities.push(s),t.suspicious){const o=e.entities.add({show:!1,position:Rt(t.lon,t.lat,30),billboard:{image:hl.thermalAlert,width:26,height:26,pixelOffset:new Z.Cartesian2(0,-20),disableDepthTestDistance:Number.POSITIVE_INFINITY},label:{text:`${t.severity} · ${t.frp.toFixed(1)} MW`,font:"600 11px monospace",fillColor:Z.Color.fromCssColorString(i),showBackground:!0,backgroundColor:Z.Color.BLACK.withAlpha(.7),pixelOffset:new Z.Cartesian2(0,-40),disableDepthTestDistance:Number.POSITIVE_INFINITY},_thermal:t});this.thermalEntities.push(o)}})}setThermal(e){this.thermal=e,this.thermalEntities.forEach(i=>i.show=e);const t=this.viewer.scene;t.globe.baseColor=e?Z.Color.fromCssColorString("#0a0a0a"):Z.Color.fromCssColorString("#0b1424");try{t.postProcessStages&&t.postProcessStages.bloom&&(t.postProcessStages.bloom.uniforms.brightness=e?.25:-.2)}catch{}t.globe.atmosphereLightIntensity=e?3:20,this.imageryAlpha(e?.32:1),e||this._applyDaylight(),e&&this.setCamMode("thermal")}imageryAlpha(e){const t=this.viewer.imageryLayers;t.length&&(t.get(0).alpha=e)}setProgress(e){return this._setProgressInternal(e),this.readout()}setPlaying(e){this._playing=!!e,this._playing&&this.progress>=1&&this._setProgressInternal(0),this._lastT=performance.now(),this._playing&&this._applyDaylight();try{if(this.viewer){const t=this.viewer.scene;this._playing?(this.viewer.clock.shouldAnimate=!0,t.requestRenderMode=!1,t.maximumRenderTimeChange=1/0,t.requestRender()):this.viewer.clock.shouldAnimate=!1}if(this._playing&&!this._destroyed&&!this._rafId&&this._startLoop(),!this._playing&&this.viewer){this._camSettled=!0,this._impactHold=!1;try{this.viewer.camera.lookAtTransform(Z.Matrix4.IDENTITY)}catch{}const t=this._userControls;t&&(t.enableInputs=!0,t.enableZoom=!0,t.enableRotate=!0,t.enableTranslate=!0,t.enableTilt=!0)}}catch{}return this._playing}_setProgressInternal(e){this.progress=qo(e,0,1);const t=this._posAt(this.progress),i=Ke(t.lon),r=Ke(t.lat),s=Ke(t.height,Ye.height),o=Rt(i,r,s);fl(o)&&(this._dronePos=o);const a=this._posAt(Math.min(1,this.progress+.004)),l=Math.atan2(Ke(a.lon)-i,Ke(a.lat)-r);this._droneHeading=Ke(l,this._droneHeading||0),this._dronePitch=Ke(t.pitch,0);const c=[],u=80;for(let d=0;d<=u;d++){const h=d/u*this.progress,p=this._posAt(h);Number.isFinite(p.lon)&&Number.isFinite(p.lat)&&c.push(p.lon,p.lat,Ke(p.height,Ye.height))}this._trail=Z.Cartesian3.fromDegreesArrayHeights(c),this.progress>.985&&!this._impactFired?(this._fireImpact(),this._impactFired=!0):this.progress<.9&&(this._impactFired=!1)}_fireImpact(){const e=this.viewer;this._impactHold=!0,this._prevTrackMode=this._trackMode,this._trackMode="impact",this._camSettled=!0;try{this._flyToFrame(Uo.impact(),18,-45,2600,2.2)}catch{}if(this._impactHoldTimer)try{clearTimeout(this._impactHoldTimer)}catch{}this._impactHoldTimer=setTimeout(()=>{if(!this._destroyed){this._impactHold=!1,this._camSettled=!0;try{this._setUserControls(!0)}catch{}}},5200);let t=null;try{const u=pl("rgba(255,255,255,1)","rgba(255,240,200,0.85)");u&&(t=e.entities.add({position:Rt(Ye.lon,Ye.lat,Ye.height+30),billboard:{image:u,width:480,height:480,disableDepthTestDistance:Number.POSITIVE_INFINITY,color:Z.Color.WHITE.withAlpha(1)}}))}catch{}const i=e.entities.add({position:Rt(Ye.lon,Ye.lat,Ye.height),ellipse:{semiMajorAxis:650,semiMinorAxis:650,material:Z.Color.fromCssColorString("#ff7a18").withAlpha(.85),height:10},point:{pixelSize:40,color:Z.Color.fromCssColorString("#fffceb"),disableDepthTestDistance:Number.POSITIVE_INFINITY}}),r=e.entities.add({position:Rt(Ye.lon,Ye.lat,Ye.height+4),ellipse:{semiMajorAxis:150,semiMinorAxis:150,height:12,fill:!1,outline:!0,outlineColor:Z.Color.fromCssColorString("#ffe6a6").withAlpha(.95),outlineWidth:6}});let s=650,o=.85,a=150,l=1;const c=setInterval(()=>{if(s+=300,o-=.035,a+=900,l-=.08,t)try{t.billboard.color=Z.Color.WHITE.withAlpha(Math.max(0,l))}catch{}if(o<=0||this._destroyed){clearInterval(c);try{e.entities.remove(i),e.entities.remove(r),t&&e.entities.remove(t)}catch{}return}i.ellipse.semiMajorAxis=s,i.ellipse.semiMinorAxis=s,i.ellipse.material=Z.Color.fromCssColorString("#ff7a18").withAlpha(Math.max(0,o)),r.ellipse.semiMajorAxis=a,r.ellipse.semiMinorAxis=a,r.ellipse.outlineColor=Z.Color.fromCssColorString("#ffe6a6").withAlpha(Math.max(0,o))},60);try{this._spawnImpactParticles()}catch{}try{const u=e.scene.postProcessStages&&e.scene.postProcessStages.bloom;if(u){const d=u.uniforms.brightness;u.enabled=!0,u.uniforms.brightness=.9,setTimeout(()=>{try{u.uniforms.brightness=this.thermal?.25:d}catch{}},1800)}}catch{}}_spawnImpactParticles(){const e=this.viewer.scene;if(!Z.ParticleSystem||!Z.CircleEmitter)return;const t=Rt(Ye.lon,Ye.lat,Ye.height+6);if(!fl(t))return;const i=Z.Transforms.eastNorthUpToFixedFrame(t),r="/",s=`${r}explosion-fireball.png`,o=`${r}explosion-smoke.png`,a=`${r}explosion-debris.png`,l=pl("rgba(255,244,190,1)","rgba(255,122,24,0.9)"),c=pl("rgba(90,90,90,0.9)","rgba(40,40,40,0.6)"),u=pl("rgba(60,40,24,1)","rgba(20,14,8,0.7)"),d=[];d.push(new Z.ParticleSystem({image:s,modelMatrix:i,startColor:Z.Color.fromCssColorString("#fff6d0").withAlpha(1),endColor:Z.Color.fromCssColorString("#ff3a12").withAlpha(0),startScale:1.6,endScale:9,minimumParticleLife:.9,maximumParticleLife:2.4,minimumSpeed:28,maximumSpeed:95,imageSize:new Z.Cartesian2(90,90),emissionRate:0,bursts:[new Z.ParticleBurst({time:0,minimum:320,maximum:460}),new Z.ParticleBurst({time:.25,minimum:120,maximum:200})],lifetime:2.4,emitter:new Z.SphereEmitter(10)})),d.push(new Z.ParticleSystem({image:o,modelMatrix:i,startColor:Z.Color.fromCssColorString("#4a4a4d").withAlpha(.9),endColor:Z.Color.fromCssColorString("#161618").withAlpha(0),startScale:3,endScale:22,minimumParticleLife:2.6,maximumParticleLife:5,minimumSpeed:6,maximumSpeed:22,imageSize:new Z.Cartesian2(120,120),emissionRate:140,lifetime:3.4,emitter:new Z.CircleEmitter(12)})),d.push(new Z.ParticleSystem({image:a,modelMatrix:i,startColor:Z.Color.fromCssColorString("#ff7a2a").withAlpha(1),endColor:Z.Color.fromCssColorString("#140e08").withAlpha(0),startScale:1,endScale:.3,minimumParticleLife:1,maximumParticleLife:2.6,minimumSpeed:45,maximumSpeed:130,imageSize:new Z.Cartesian2(18,18),emissionRate:0,bursts:[new Z.ParticleBurst({time:0,minimum:140,maximum:220})],lifetime:2.4,emitter:new Z.ConeEmitter(Z.Math.toRadians(62))}));const h=[l,c,u];d.forEach((p,g)=>{try{e.primitives.add(p)}catch{}try{if(h[g]){const _=new Image;_.onerror=()=>{try{p.image=h[g]}catch{}},_.src=[s,o,a][g]}}catch{}}),setTimeout(()=>{d.forEach(p=>{try{(!p.isDestroyed||!p.isDestroyed())&&e.primitives.remove(p)}catch{}})},6500)}readout(){const e=jw(this.path,this.progress),t=this._posAt(this.progress),i=Di.waypoints,r=Math.min(i.length-2,e.leg),s=(1-this.progress)*this.path.total,o=(t.speed||Di.cruiseSpeedKmh/3.6)*3.6,a=s/1e3/Math.max(1,o)*60,l=-Z.Math.toDegrees(t.pitch||0);return{progress:this.progress,lon:t.lon,lat:t.lat,altM:t.height,legFrom:i[r]?.name,legTo:i[r+1]?.name,phase:i[r]?.phase,travelledKm:e.travelledM/1e3,totalKm:this.path.total/1e3,distToImpactKm:s/1e3,etaMin:a,speedKmh:o,divePitchDeg:l}}setCamMode(e){this.camMode=e,this._trackMode=e,this._camSettled=!1,this._camFrame=this._currentCameraFrame()||this._camFrame,this._applyFrustum(e),this._applyDaylight();try{this.viewer.resize()}catch{}return e==="launch"?this._flyToFrame(Uo.launch(),20,-32,9e3,2.2):e==="impact"?this._flyToFrame(Uo.impact(),18,-42,4200,2.2):e==="freefly"&&this._flyToFrame(Uo.dubai(),-18,-55,36e4,2.4),this.readout()}_currentCameraFrame(){try{const e=this.viewer.camera,t=e.positionCartographic;return!t||!Number.isFinite(t.height)?null:{lon:Z.Math.toDegrees(t.longitude),lat:Z.Math.toDegrees(t.latitude),h:t.height,heading:Z.Math.toDegrees(e.heading),pitch:Z.Math.toDegrees(e.pitch)}}catch{return null}}_setUserControls(e){const t=this._userControls;if(t&&t.enableInputs!==e){if(e&&this.viewer){try{this.viewer.camera.lookAtTransform(Z.Matrix4.IDENTITY)}catch{}t.enableZoom=!0,t.enableRotate=!0,t.enableTranslate=!0,t.enableTilt=!0}t.enableInputs=e}}_flyToFrame(e,t,i,r,s=2){if(!this.viewer||!fl(e))return;const o=this.viewer.camera,a=Vu(i),l=Math.max(120,Ke(r,5e3)),c=new Z.HeadingPitchRange(Z.Math.toRadians(Ke(t,0)),Z.Math.toRadians(a),l),u=new Z.BoundingSphere(e,Math.max(1,l*.1));try{o.cancelFlight()}catch{}this._flying=!0,this._camSettled=!0,o.flyToBoundingSphere(u,{offset:c,duration:Ke(s,2),easingFunction:Z.EasingFunction.QUADRATIC_IN_OUT,complete:()=>{this._flying=!1;try{o.lookAtTransform(Z.Matrix4.IDENTITY)}catch{}this._camFrame=this._currentCameraFrame()||this._camFrame},cancel:()=>{this._flying=!1}})}_clampUserPitch(e){if(this._flying||!this.viewer)return;const t=this.viewer.camera,i=Z.Math.toDegrees(t.pitch);if(!Number.isFinite(i)||i>=X_&&i<=j_)return;const r=mg(i,Vu(i),6,e),s=t.positionCartographic;!s||!Number.isFinite(s.height)||t.setView({destination:Rt(Z.Math.toDegrees(s.longitude),Z.Math.toDegrees(s.latitude),s.height),orientation:{heading:t.heading,pitch:Z.Math.toRadians(r),roll:0}})}_targetFrame(e){const t=(p,g,_,m,f)=>!Number.isFinite(p)||!Number.isFinite(g)||!Number.isFinite(_)?null:{lon:p,lat:g,h:_,heading:Ke(m,0),pitch:Vu(f)},i=this._posAt(this.progress),r=Ke(i.lon),s=Ke(i.lat),o=Ke(i.height,Ye.height),a=this.progress>=(this.ballistic?.diveStart??.86),l=a?Ke(Z.Math.toDegrees(Ke(i.pitch))):0,c=this._posAt(Math.max(0,this.progress-.01)),u=Ke(fg(Ke(c.lon,r),Ke(c.lat,s),r,s),this._camFrame?.heading||0),d=this._posAt(Math.min(1,this.progress+.02)),h=Ke(fg(r,s,Ke(d.lon,r),Ke(d.lat,s)),u);switch(e){case"launch":return t(Xn.lon-.04,Xn.lat-.05,6500,20,-28);case"impact":return t(Ye.lon-.02,Ye.lat-.03,4200,18,-32);case"freefly":{const p=(Xn.lon+Ye.lon)/2,g=(Xn.lat+Ye.lat)/2;return t(p-.2,g-1.5,36e4,-18,-46)}case"waypoint":return this._waypointTarget||null;case"chase":{const p=Do(r,s,(h+180)%360,a?900:1400);return t(p[0],p[1],o+(a?320:500),h,-12+(a?l*.7:0))}case"topdown":return t(r,s,Math.max(9e3,o+9e3),u,-89.9);case"orbit":{this._orbitAngle+=.0035;const p=Do(r,s,this._orbitAngle*57.3%360,2200);return t(p[0],p[1],o+1200,(this._orbitAngle*57.3+180)%360,-20)}case"thermal":{const p=Do(r,s,(u+180)%360,a?800:1100);return t(p[0],p[1],o+(a?500:700),u,-22+(a?l*.6:0))}case"cinema":{const p=this.progress;if(p<.15){const _=Do(r,s,(u+120)%360,1800);return t(_[0],_[1],o+900,(u+300)%360,-16)}if(p>.85)return t(Ye.lon-.015,Ye.lat-.02,3e3,18,-30);const g=Do(r,s,(u+200)%360,1600);return t(g[0],g[1],o+600,(u+20)%360,-10)}default:return null}}_driveCamera(e){if(!this.viewer)return;if(this._flying){this._setUserControls(!1);return}const t=this._trackMode,i=t==="orbit"||t==="cinema",r=t==="chase"||t==="topdown"||t==="thermal";let s;if(i||this._playing&&r?s=!0:s=!this._camSettled,this._setUserControls(!s),!s){this._clampUserPitch(e);return}const o=this._targetFrame(t);if(!o){this._camSettled=!0;return}const a=i?3:4.5,l=this._camFrame?{...this._camFrame}:{...o};l.lon=dl(l.lon,o.lon,a,e),l.lat=dl(l.lat,o.lat,a,e),l.h=dl(l.h,o.h,a,e),l.heading=mg(l.heading,o.heading,a,e),l.pitch=qo(dl(l.pitch,o.pitch,a,e),-89.9,89.9);const c=Rt(Ke(l.lon),Ke(l.lat),Ke(l.h,100));!fl(c)||!Number.isFinite(l.heading)||!Number.isFinite(l.pitch)||(this._camFrame=l,this.viewer.camera.setView({destination:c,orientation:{heading:Z.Math.toRadians(l.heading),pitch:Z.Math.toRadians(l.pitch),roll:0}}),!i&&!(this._playing&&r)&&Math.abs(l.lon-o.lon)<1e-4&&Math.abs(l.lat-o.lat)<1e-4&&Math.abs(l.h-o.h)<Math.max(2,Math.abs(o.h)*.01)&&(this._camSettled=!0))}gotoWaypoint(e){const t=Di.waypoints,i=qo(e,0,t.length-1),r=i/(t.length-1);this._playing=!1,this._setProgressInternal(r),this._applyDaylight();const s=t[i];this.camMode="waypoint",this._trackMode="waypoint",this._applyFrustum("waypoint");try{this.viewer.resize()}catch{}const o=Ke(this._altAt(r),s.alt||0),a=Rt(Ke(s.lon),Ke(s.lat),o),l=qo(4200+o*1.2,3200,14e3);return this._flyToFrame(a,18,-38,l,1.8),{idx:i,...this.readout()}}setLayer(e,t){e==="corridor"&&this.corridorEntity&&(this.corridorEntity.show=t),e==="geofence"&&this.geofenceEntity&&(this.geofenceEntity.show=t),e==="waypoints"&&this.waypointEntities.forEach(i=>i.show=t)}_tuneTileset(e){if(!e)return e;try{e.maximumScreenSpaceError=8,e.maximumMemoryUsage=1024,e.skipLevelOfDetail=!0,e.baseScreenSpaceError=1024,e.skipScreenSpaceErrorFactor=16,e.skipLevels=1,e.immediatelyLoadDesiredLevelOfDetail=!1,e.loadSiblings=!0,e.preloadWhenHidden=!0,e.preloadFlightDestinations=!0,e.cullWithChildrenBounds=!0,e.dynamicScreenSpaceError=!0,e.dynamicScreenSpaceErrorDensity=.00278,e.dynamicScreenSpaceErrorFactor=4,"imageBasedLighting"in e&&this.viewer?.scene?.imageBasedLighting&&(e.imageBasedLighting=this.viewer.scene.imageBasedLighting),"enableModelExperimental"in e&&(e.enableModelExperimental=!0),e.maximumTextureSize=4096}catch{}return e}async setIonToken(e){if(!e)return{ok:!1,msg:"empty token"};try{Z.Ion.defaultAccessToken=e,this.ionMode="ion";const t=await Z.createWorldTerrainAsync({requestVertexNormals:!0,requestWaterMask:!0});if(this._destroyed)return{ok:!1};this.viewer.terrainProvider=t;try{const i=await Z.createGooglePhotorealistic3DTileset();return this._destroyed?{ok:!1}:(this._tuneTileset(i),this.viewer.scene.primitives.add(i),this._photoreal=i,{ok:!0,msg:"Google Photorealistic 3D Tiles + World Terrain active"})}catch{try{const r=await Z.createOsmBuildingsAsync();return this._tuneTileset(r),this.viewer.scene.primitives.add(r),{ok:!0,msg:"World Terrain + OSM Buildings active (Google tiles unavailable on this token)"}}catch{return{ok:!0,msg:"World Terrain active"}}}}catch(t){return this.ionMode="free",{ok:!1,msg:"Invalid Ion token: "+(t?.message||t)}}}_installPick(){this.handler=new Z.ScreenSpaceEventHandler(this.viewer.scene.canvas),this.handler.setInputAction(e=>{const t=this.viewer.scene.pick(e.position);if(t&&t.id&&this._cbPick){const i=t.id;i._site?this._cbPick({type:"site",data:i._site}):i._wp?this._cbPick({type:"waypoint",data:i._wp}):i._thermal&&this._cbPick({type:"thermal",data:i._thermal})}},Z.ScreenSpaceEventType.LEFT_CLICK)}destroy(){this._destroyed=!0,cancelAnimationFrame(this._rafId);try{this._impactHoldTimer&&clearTimeout(this._impactHoldTimer)}catch{}try{this._onResize&&window.removeEventListener("resize",this._onResize)}catch{}try{this._ro&&this._ro.disconnect()}catch{}try{this.handler&&this.handler.destroy()}catch{}try{this.viewer&&this.viewer.destroy()}catch{}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lp="169",n1=0,gg=1,i1=2,q_=1,r1=2,Ni=3,wr=0,on=1,Fi=2,yr=0,Js=1,vg=2,_g=3,xg=4,s1=5,Wr=100,o1=101,a1=102,l1=103,c1=104,u1=200,h1=201,d1=202,f1=203,vd=204,_d=205,p1=206,m1=207,g1=208,v1=209,_1=210,x1=211,y1=212,S1=213,M1=214,xd=0,yd=1,Sd=2,co=3,Md=4,Ed=5,wd=6,Td=7,Y_=0,E1=1,w1=2,Sr=0,T1=1,A1=2,C1=3,$_=4,R1=5,b1=6,P1=7,K_=300,uo=301,ho=302,Ad=303,Cd=304,Jc=306,Rd=1e3,Kr=1001,bd=1002,zn=1003,L1=1004,ml=1005,ei=1006,Gu=1007,Zr=1008,qi=1009,Z_=1010,J_=1011,Aa=1012,cp=1013,ss=1014,ki=1015,Fa=1016,up=1017,hp=1018,fo=1020,Q_=35902,ex=1021,tx=1022,ii=1023,nx=1024,ix=1025,Qs=1026,po=1027,rx=1028,dp=1029,sx=1030,fp=1031,pp=1033,Jl=33776,Ql=33777,ec=33778,tc=33779,Pd=35840,Ld=35841,Nd=35842,Id=35843,Dd=36196,Ud=37492,Fd=37496,Od=37808,zd=37809,kd=37810,Bd=37811,Hd=37812,Vd=37813,Gd=37814,Wd=37815,Xd=37816,jd=37817,qd=37818,Yd=37819,$d=37820,Kd=37821,nc=36492,Zd=36494,Jd=36495,ox=36283,Qd=36284,ef=36285,tf=36286,N1=3200,I1=3201,ax=0,D1=1,cr="",Dn="srgb",br="srgb-linear",mp="display-p3",Qc="display-p3-linear",Pc="linear",gt="srgb",Lc="rec709",Nc="p3",ps=7680,yg=519,U1=512,F1=513,O1=514,lx=515,z1=516,k1=517,B1=518,H1=519,Sg=35044,Mg="300 es",Bi=2e3,Ic=2001;class xo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wu=Math.PI/180,nf=180/Math.PI;function yo(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function Qt(n,e,t){return Math.max(e,Math.min(t,n))}function V1(n,e){return(n%e+e)%e}function Xu(n,e,t){return(1-t)*n+t*e}function Fo(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function dn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class _e{constructor(e=0,t=0){_e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,t,i,r,s,o,a,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],g=i[8],_=r[0],m=r[3],f=r[6],v=r[1],x=r[4],S=r[7],R=r[2],A=r[5],w=r[8];return s[0]=o*_+a*v+l*R,s[3]=o*m+a*x+l*A,s[6]=o*f+a*S+l*w,s[1]=c*_+u*v+d*R,s[4]=c*m+u*x+d*A,s[7]=c*f+u*S+d*w,s[2]=h*_+p*v+g*R,s[5]=h*m+p*x+g*A,s[8]=h*f+p*S+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,p=c*s-o*l,g=t*d+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ju.makeScale(e,t)),this}rotate(e){return this.premultiply(ju.makeRotation(-e)),this}translate(e,t){return this.premultiply(ju.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ju=new je;function cx(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Dc(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function G1(){const n=Dc("canvas");return n.style.display="block",n}const Eg={};function ic(n){n in Eg||(Eg[n]=!0,console.warn(n))}function W1(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function X1(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function j1(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const wg=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Tg=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Oo={[br]:{transfer:Pc,primaries:Lc,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Dn]:{transfer:gt,primaries:Lc,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Qc]:{transfer:Pc,primaries:Nc,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Tg),fromReference:n=>n.applyMatrix3(wg)},[mp]:{transfer:gt,primaries:Nc,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Tg),fromReference:n=>n.applyMatrix3(wg).convertLinearToSRGB()}},q1=new Set([br,Qc]),at={enabled:!0,_workingColorSpace:br,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!q1.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Oo[e].toReference,r=Oo[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Oo[n].primaries},getTransfer:function(n){return n===cr?Pc:Oo[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(Oo[e].luminanceCoefficients)}};function eo(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function qu(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ms;class Y1{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ms===void 0&&(ms=Dc("canvas")),ms.width=e.width,ms.height=e.height;const i=ms.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ms}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Dc("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=eo(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(eo(t[i]/255)*255):t[i]=eo(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let $1=0;class ux{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$1++}),this.uuid=yo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Yu(r[o].image)):s.push(Yu(r[o]))}else s=Yu(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Yu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Y1.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let K1=0;class _n extends xo{constructor(e=_n.DEFAULT_IMAGE,t=_n.DEFAULT_MAPPING,i=Kr,r=Kr,s=ei,o=Zr,a=ii,l=qi,c=_n.DEFAULT_ANISOTROPY,u=cr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:K1++}),this.uuid=yo(),this.name="",this.source=new ux(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new _e(0,0),this.repeat=new _e(1,1),this.center=new _e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==K_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rd:e.x=e.x-Math.floor(e.x);break;case Kr:e.x=e.x<0?0:1;break;case bd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rd:e.y=e.y-Math.floor(e.y);break;case Kr:e.y=e.y<0?0:1;break;case bd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_n.DEFAULT_IMAGE=null;_n.DEFAULT_MAPPING=K_;_n.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,t=0,i=0,r=1){ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,S=(p+1)/2,R=(f+1)/2,A=(u+h)/4,w=(d+_)/4,P=(g+m)/4;return x>S&&x>R?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=A/i,s=w/i):S>R?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=A/r,s=P/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=w/s,r=P/s),this.set(i,r,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-_)/v,this.z=(h-u)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Z1 extends xo{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new _n(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ux(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class os extends Z1{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class hx extends _n{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=zn,this.minFilter=zn,this.wrapR=Kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class J1 extends _n{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=zn,this.minFilter=zn,this.wrapR=Kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oa{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const h=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==h||c!==p||u!==g){let m=1-a;const f=l*h+c*p+u*g+d*_,v=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const R=Math.sqrt(x),A=Math.atan2(R,f*v);m=Math.sin(m*A)/R,a=Math.sin(a*A)/R}const S=a*v;if(l=l*m+h*S,c=c*m+p*S,u=u*m+g*S,d=d*m+_*S,m===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=R,c*=R,u*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],h=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+u*d+l*p-c*h,e[t+1]=l*g+u*h+c*d-a*p,e[t+2]=c*g+u*p+a*h-l*d,e[t+3]=u*g-a*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),h=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"YZX":this._x=h*u*d+c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d-h*p*g;break;case"XZY":this._x=h*u*d-c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,i=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ag.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ag.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return $u.copy(this).projectOnVector(e),this.sub($u)}reflect(e){return this.sub($u.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $u=new z,Ag=new Oa;class za{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Yn):Yn.fromBufferAttribute(s,o),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),gl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),gl.copy(i.boundingBox)),gl.applyMatrix4(e.matrixWorld),this.union(gl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zo),vl.subVectors(this.max,zo),gs.subVectors(e.a,zo),vs.subVectors(e.b,zo),_s.subVectors(e.c,zo),Qi.subVectors(vs,gs),er.subVectors(_s,vs),Nr.subVectors(gs,_s);let t=[0,-Qi.z,Qi.y,0,-er.z,er.y,0,-Nr.z,Nr.y,Qi.z,0,-Qi.x,er.z,0,-er.x,Nr.z,0,-Nr.x,-Qi.y,Qi.x,0,-er.y,er.x,0,-Nr.y,Nr.x,0];return!Ku(t,gs,vs,_s,vl)||(t=[1,0,0,0,1,0,0,0,1],!Ku(t,gs,vs,_s,vl))?!1:(_l.crossVectors(Qi,er),t=[_l.x,_l.y,_l.z],Ku(t,gs,vs,_s,vl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ci=[new z,new z,new z,new z,new z,new z,new z,new z],Yn=new z,gl=new za,gs=new z,vs=new z,_s=new z,Qi=new z,er=new z,Nr=new z,zo=new z,vl=new z,_l=new z,Ir=new z;function Ku(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ir.fromArray(n,s);const a=r.x*Math.abs(Ir.x)+r.y*Math.abs(Ir.y)+r.z*Math.abs(Ir.z),l=e.dot(Ir),c=t.dot(Ir),u=i.dot(Ir);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Q1=new za,ko=new z,Zu=new z;class gp{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Q1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ko.subVectors(e,this.center);const t=ko.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ko,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ko.copy(e.center).add(Zu)),this.expandByPoint(ko.copy(e.center).sub(Zu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ri=new z,Ju=new z,xl=new z,tr=new z,Qu=new z,yl=new z,eh=new z;class eT{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.origin).addScaledVector(this.direction,t),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ju.copy(e).add(t).multiplyScalar(.5),xl.copy(t).sub(e).normalize(),tr.copy(this.origin).sub(Ju);const s=e.distanceTo(t)*.5,o=-this.direction.dot(xl),a=tr.dot(this.direction),l=-tr.dot(xl),c=tr.lengthSq(),u=Math.abs(1-o*o);let d,h,p,g;if(u>0)if(d=o*l-a,h=o*a-l,g=s*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,p=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ju).addScaledVector(xl,h),p}intersectSphere(e,t){Ri.subVectors(e.center,this.origin);const i=Ri.dot(this.direction),r=Ri.dot(Ri)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,i,r,s){Qu.subVectors(t,e),yl.subVectors(i,e),eh.crossVectors(Qu,yl);let o=this.direction.dot(eh),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;tr.subVectors(this.origin,e);const l=a*this.direction.dot(yl.crossVectors(tr,yl));if(l<0)return null;const c=a*this.direction.dot(Qu.cross(tr));if(c<0||l+c>o)return null;const u=-a*tr.dot(eh);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,i,r,s,o,a,l,c,u,d,h,p,g,_,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,h,p,g,_,m)}set(e,t,i,r,s,o,a,l,c,u,d,h,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/xs.setFromMatrixColumn(e,0).length(),s=1/xs.setFromMatrixColumn(e,1).length(),o=1/xs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,p=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,p=l*d,g=c*u,_=c*d;t[0]=h+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,p=l*d,g=c*u,_=c*d;t[0]=h-_*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,p=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*d,t[8]=g*d+p,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=o*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tT,e,nT)}lookAt(e,t,i){const r=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),nr.crossVectors(i,Sn),nr.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),nr.crossVectors(i,Sn)),nr.normalize(),Sl.crossVectors(Sn,nr),r[0]=nr.x,r[4]=Sl.x,r[8]=Sn.x,r[1]=nr.y,r[5]=Sl.y,r[9]=Sn.y,r[2]=nr.z,r[6]=Sl.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],v=i[3],x=i[7],S=i[11],R=i[15],A=r[0],w=r[4],P=r[8],W=r[12],y=r[1],M=r[5],B=r[9],N=r[13],F=r[2],O=r[6],D=r[10],$=r[14],I=r[3],U=r[7],j=r[11],Q=r[15];return s[0]=o*A+a*y+l*F+c*I,s[4]=o*w+a*M+l*O+c*U,s[8]=o*P+a*B+l*D+c*j,s[12]=o*W+a*N+l*$+c*Q,s[1]=u*A+d*y+h*F+p*I,s[5]=u*w+d*M+h*O+p*U,s[9]=u*P+d*B+h*D+p*j,s[13]=u*W+d*N+h*$+p*Q,s[2]=g*A+_*y+m*F+f*I,s[6]=g*w+_*M+m*O+f*U,s[10]=g*P+_*B+m*D+f*j,s[14]=g*W+_*N+m*$+f*Q,s[3]=v*A+x*y+S*F+R*I,s[7]=v*w+x*M+S*O+R*U,s[11]=v*P+x*B+S*D+R*j,s[15]=v*W+x*N+S*$+R*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+s*l*d-r*c*d-s*a*h+i*c*h+r*a*p-i*l*p)+_*(+t*l*p-t*c*h+s*o*h-r*o*p+r*c*u-s*l*u)+m*(+t*c*d-t*a*p-s*o*d+i*o*p+s*a*u-i*c*u)+f*(-r*a*u-t*l*d+t*a*h+r*o*d-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],v=d*m*c-_*h*c+_*l*p-a*m*p-d*l*f+a*h*f,x=g*h*c-u*m*c-g*l*p+o*m*p+u*l*f-o*h*f,S=u*_*c-g*d*c+g*a*p-o*_*p-u*a*f+o*d*f,R=g*d*l-u*_*l-g*a*h+o*_*h+u*a*m-o*d*m,A=t*v+i*x+r*S+s*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=v*w,e[1]=(_*h*s-d*m*s-_*r*p+i*m*p+d*r*f-i*h*f)*w,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*f+i*l*f)*w,e[3]=(d*l*s-a*h*s-d*r*c+i*h*c+a*r*p-i*l*p)*w,e[4]=x*w,e[5]=(u*m*s-g*h*s+g*r*p-t*m*p-u*r*f+t*h*f)*w,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*f-t*l*f)*w,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*p+t*l*p)*w,e[8]=S*w,e[9]=(g*d*s-u*_*s-g*i*p+t*_*p+u*i*f-t*d*f)*w,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*f+t*a*f)*w,e[11]=(u*a*s-o*d*s-u*i*c+t*d*c+o*i*p-t*a*p)*w,e[12]=R*w,e[13]=(u*_*r-g*d*r+g*i*h-t*_*h-u*i*m+t*d*m)*w,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*m-t*a*m)*w,e[15]=(o*d*r-u*a*r+u*i*l-t*d*l-o*i*h+t*a*h)*w,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,h=s*c,p=s*u,g=s*d,_=o*u,m=o*d,f=a*d,v=l*c,x=l*u,S=l*d,R=i.x,A=i.y,w=i.z;return r[0]=(1-(_+f))*R,r[1]=(p+S)*R,r[2]=(g-x)*R,r[3]=0,r[4]=(p-S)*A,r[5]=(1-(h+f))*A,r[6]=(m+v)*A,r[7]=0,r[8]=(g+x)*w,r[9]=(m-v)*w,r[10]=(1-(h+_))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=xs.set(r[0],r[1],r[2]).length();const o=xs.set(r[4],r[5],r[6]).length(),a=xs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],$n.copy(this);const c=1/s,u=1/o,d=1/a;return $n.elements[0]*=c,$n.elements[1]*=c,$n.elements[2]*=c,$n.elements[4]*=u,$n.elements[5]*=u,$n.elements[6]*=u,$n.elements[8]*=d,$n.elements[9]*=d,$n.elements[10]*=d,t.setFromRotationMatrix($n),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Bi){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),d=(t+e)/(t-e),h=(i+r)/(i-r);let p,g;if(a===Bi)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ic)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Bi){const l=this.elements,c=1/(t-e),u=1/(i-r),d=1/(o-s),h=(t+e)*c,p=(i+r)*u;let g,_;if(a===Bi)g=(o+s)*d,_=-2*d;else if(a===Ic)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const xs=new z,$n=new yt,tT=new z(0,0,0),nT=new z(1,1,1),nr=new z,Sl=new z,Sn=new z,Cg=new yt,Rg=new Oa;class yi{constructor(e=0,t=0,i=0,r=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Cg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cg,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rg.setFromEuler(this),this.setFromQuaternion(Rg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class dx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let iT=0;const bg=new z,ys=new Oa,bi=new yt,Ml=new z,Bo=new z,rT=new z,sT=new Oa,Pg=new z(1,0,0),Lg=new z(0,1,0),Ng=new z(0,0,1),Ig={type:"added"},oT={type:"removed"},Ss={type:"childadded",child:null},th={type:"childremoved",child:null};class jt extends xo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iT++}),this.uuid=yo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new z,t=new yi,i=new Oa,r=new z(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new yt},normalMatrix:{value:new je}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(Pg,e)}rotateY(e){return this.rotateOnAxis(Lg,e)}rotateZ(e){return this.rotateOnAxis(Ng,e)}translateOnAxis(e,t){return bg.copy(e).applyQuaternion(this.quaternion),this.position.add(bg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pg,e)}translateY(e){return this.translateOnAxis(Lg,e)}translateZ(e){return this.translateOnAxis(Ng,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ml.copy(e):Ml.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(Bo,Ml,this.up):bi.lookAt(Ml,Bo,this.up),this.quaternion.setFromRotationMatrix(bi),r&&(bi.extractRotation(r.matrixWorld),ys.setFromRotationMatrix(bi),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ig),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(oT),th.child=e,this.dispatchEvent(th),th.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ig),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,e,rT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,sT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}jt.DEFAULT_UP=new z(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kn=new z,Pi=new z,nh=new z,Li=new z,Ms=new z,Es=new z,Dg=new z,ih=new z,rh=new z,sh=new z,oh=new ut,ah=new ut,lh=new ut;class ti{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Kn.subVectors(e,t),r.cross(Kn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Kn.subVectors(r,t),Pi.subVectors(i,t),nh.subVectors(e,t);const o=Kn.dot(Kn),a=Kn.dot(Pi),l=Kn.dot(nh),c=Pi.dot(Pi),u=Pi.dot(nh),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Li)===null?!1:Li.x>=0&&Li.y>=0&&Li.x+Li.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Li.x),l.addScaledVector(o,Li.y),l.addScaledVector(a,Li.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return oh.setScalar(0),ah.setScalar(0),lh.setScalar(0),oh.fromBufferAttribute(e,t),ah.fromBufferAttribute(e,i),lh.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(oh,s.x),o.addScaledVector(ah,s.y),o.addScaledVector(lh,s.z),o}static isFrontFacing(e,t,i,r){return Kn.subVectors(i,t),Pi.subVectors(e,t),Kn.cross(Pi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),Kn.cross(Pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ti.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ti.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return ti.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return ti.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ti.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Ms.subVectors(r,i),Es.subVectors(s,i),ih.subVectors(e,i);const l=Ms.dot(ih),c=Es.dot(ih);if(l<=0&&c<=0)return t.copy(i);rh.subVectors(e,r);const u=Ms.dot(rh),d=Es.dot(rh);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ms,o);sh.subVectors(e,s);const p=Ms.dot(sh),g=Es.dot(sh);if(g>=0&&p<=g)return t.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Es,a);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Dg.subVectors(s,r),a=(d-u)/(d-u+(p-g)),t.copy(r).addScaledVector(Dg,a);const f=1/(m+_+h);return o=_*f,a=h*f,t.copy(i).addScaledVector(Ms,o).addScaledVector(Es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const fx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ir={h:0,s:0,l:0},El={h:0,s:0,l:0};function ch(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class nt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=at.workingColorSpace){if(e=V1(e,1),t=Qt(t,0,1),i=Qt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=ch(o,s,e+1/3),this.g=ch(o,s,e),this.b=ch(o,s,e-1/3)}return at.toWorkingColorSpace(this,r),this}setStyle(e,t=Dn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dn){const i=fx[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=eo(e.r),this.g=eo(e.g),this.b=eo(e.b),this}copyLinearToSRGB(e){return this.r=qu(e.r),this.g=qu(e.g),this.b=qu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dn){return at.fromWorkingColorSpace(Zt.copy(this),e),Math.round(Qt(Zt.r*255,0,255))*65536+Math.round(Qt(Zt.g*255,0,255))*256+Math.round(Qt(Zt.b*255,0,255))}getHexString(e=Dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(Zt.copy(this),t);const i=Zt.r,r=Zt.g,s=Zt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Dn){at.fromWorkingColorSpace(Zt.copy(this),e);const t=Zt.r,i=Zt.g,r=Zt.b;return e!==Dn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ir),this.setHSL(ir.h+e,ir.s+t,ir.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ir),e.getHSL(El);const i=Xu(ir.h,El.h,t),r=Xu(ir.s,El.s,t),s=Xu(ir.l,El.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new nt;nt.NAMES=fx;let aT=0;class ka extends xo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:aT++}),this.uuid=yo(),this.name="",this.type="Material",this.blending=Js,this.side=wr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vd,this.blendDst=_d,this.blendEquation=Wr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=co,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ps,this.stencilZFail=ps,this.stencilZPass=ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Js&&(i.blending=this.blending),this.side!==wr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==vd&&(i.blendSrc=this.blendSrc),this.blendDst!==_d&&(i.blendDst=this.blendDst),this.blendEquation!==Wr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==co&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ps&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ps&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ps&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class eu extends ka{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Y_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nt=new z,wl=new _e;class xi{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Sg,this.updateRanges=[],this.gpuType=ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)wl.fromBufferAttribute(this,t),wl.applyMatrix3(e),this.setXY(t,wl.x,wl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Fo(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=dn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Fo(t,this.array)),t}setX(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Fo(t,this.array)),t}setY(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Fo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Fo(t,this.array)),t}setW(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),r=dn(r,this.array),s=dn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Sg&&(e.usage=this.usage),e}}class px extends xi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class mx extends xi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Pt extends xi{constructor(e,t,i){super(new Float32Array(e),t,i)}}let lT=0;const In=new yt,uh=new jt,ws=new z,Mn=new za,Ho=new za,kt=new z;class Vn extends xo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lT++}),this.uuid=yo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cx(e)?mx:px)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,i){return In.makeTranslation(e,t,i),this.applyMatrix4(In),this}scale(e,t,i){return In.makeScale(e,t,i),this.applyMatrix4(In),this}lookAt(e){return uh.lookAt(e),uh.updateMatrix(),this.applyMatrix4(uh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Pt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new za);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gp);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ho.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(Mn.min,Ho.min),Mn.expandByPoint(kt),kt.addVectors(Mn.max,Ho.max),Mn.expandByPoint(kt)):(Mn.expandByPoint(Ho.min),Mn.expandByPoint(Ho.max))}Mn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(kt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)kt.fromBufferAttribute(a,c),l&&(ws.fromBufferAttribute(e,c),kt.add(ws)),r=Math.max(r,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xi(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new z,l[P]=new z;const c=new z,u=new z,d=new z,h=new _e,p=new _e,g=new _e,_=new z,m=new z;function f(P,W,y){c.fromBufferAttribute(i,P),u.fromBufferAttribute(i,W),d.fromBufferAttribute(i,y),h.fromBufferAttribute(s,P),p.fromBufferAttribute(s,W),g.fromBufferAttribute(s,y),u.sub(c),d.sub(c),p.sub(h),g.sub(h);const M=1/(p.x*g.y-g.x*p.y);isFinite(M)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(M),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(M),a[P].add(_),a[W].add(_),a[y].add(_),l[P].add(m),l[W].add(m),l[y].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let P=0,W=v.length;P<W;++P){const y=v[P],M=y.start,B=y.count;for(let N=M,F=M+B;N<F;N+=3)f(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const x=new z,S=new z,R=new z,A=new z;function w(P){R.fromBufferAttribute(r,P),A.copy(R);const W=a[P];x.copy(W),x.sub(R.multiplyScalar(R.dot(W))).normalize(),S.crossVectors(A,W);const M=S.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,M)}for(let P=0,W=v.length;P<W;++P){const y=v[P],M=y.start,B=y.count;for(let N=M,F=M+B;N<F;N+=3)w(e.getX(N+0)),w(e.getX(N+1)),w(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new xi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new z,s=new z,o=new z,a=new z,l=new z,c=new z,u=new z,d=new z;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let f=0;f<u;f++)h[g++]=c[p++]}return new xi(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ug=new yt,Dr=new eT,Tl=new gp,Fg=new z,Al=new z,Cl=new z,Rl=new z,hh=new z,bl=new z,Og=new z,Pl=new z;class et extends jt{constructor(e=new Vn,t=new eu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){bl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(hh.fromBufferAttribute(d,e),o?bl.addScaledVector(hh,u):bl.addScaledVector(hh.sub(t),u))}t.add(bl)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Tl.copy(i.boundingSphere),Tl.applyMatrix4(s),Dr.copy(e.ray).recast(e.near),!(Tl.containsPoint(Dr.origin)===!1&&(Dr.intersectSphere(Tl,Fg)===null||Dr.origin.distanceToSquared(Fg)>(e.far-e.near)**2))&&(Ug.copy(s).invert(),Dr.copy(e.ray).applyMatrix4(Ug),!(i.boundingBox!==null&&Dr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Dr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,R=x;S<R;S+=3){const A=a.getX(S),w=a.getX(S+1),P=a.getX(S+2);r=Ll(this,f,e,i,c,u,d,A,w,P),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const v=a.getX(m),x=a.getX(m+1),S=a.getX(m+2);r=Ll(this,o,e,i,c,u,d,v,x,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,R=x;S<R;S+=3){const A=S,w=S+1,P=S+2;r=Ll(this,f,e,i,c,u,d,A,w,P),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const v=m,x=m+1,S=m+2;r=Ll(this,o,e,i,c,u,d,v,x,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function cT(n,e,t,i,r,s,o,a){let l;if(e.side===on?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===wr,a),l===null)return null;Pl.copy(a),Pl.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Pl);return c<t.near||c>t.far?null:{distance:c,point:Pl.clone(),object:n}}function Ll(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,Al),n.getVertexPosition(l,Cl),n.getVertexPosition(c,Rl);const u=cT(n,e,t,i,Al,Cl,Rl,Og);if(u){const d=new z;ti.getBarycoord(Og,Al,Cl,Rl,d),r&&(u.uv=ti.getInterpolatedAttribute(r,a,l,c,d,new _e)),s&&(u.uv1=ti.getInterpolatedAttribute(s,a,l,c,d,new _e)),o&&(u.normal=ti.getInterpolatedAttribute(o,a,l,c,d,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new z,materialIndex:0};ti.getNormal(Al,Cl,Rl,h.normal),u.face=h,u.barycoord=d}return u}class Vi extends Vn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Pt(c,3)),this.setAttribute("normal",new Pt(u,3)),this.setAttribute("uv",new Pt(d,2));function g(_,m,f,v,x,S,R,A,w,P,W){const y=S/w,M=R/P,B=S/2,N=R/2,F=A/2,O=w+1,D=P+1;let $=0,I=0;const U=new z;for(let j=0;j<D;j++){const Q=j*M-N;for(let ne=0;ne<O;ne++){const Fe=ne*y-B;U[_]=Fe*v,U[m]=Q*x,U[f]=F,c.push(U.x,U.y,U.z),U[_]=0,U[m]=0,U[f]=A>0?1:-1,u.push(U.x,U.y,U.z),d.push(ne/w),d.push(1-j/P),$+=1}}for(let j=0;j<P;j++)for(let Q=0;Q<w;Q++){const ne=h+Q+O*j,Fe=h+Q+O*(j+1),K=h+(Q+1)+O*(j+1),oe=h+(Q+1)+O*j;l.push(ne,Fe,oe),l.push(Fe,K,oe),I+=6}a.addGroup(p,I,W),p+=I,h+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function mo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function tn(n){const e={};for(let t=0;t<n.length;t++){const i=mo(n[t]);for(const r in i)e[r]=i[r]}return e}function uT(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function gx(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const hT={clone:mo,merge:tn};var dT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tr extends ka{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dT,this.fragmentShader=fT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mo(e.uniforms),this.uniformsGroups=uT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class vx extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=Bi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const rr=new z,zg=new _e,kg=new _e;class wn extends vx{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=nf*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return nf*2*Math.atan(Math.tan(Wu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(rr.x,rr.y).multiplyScalar(-e/rr.z),rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rr.x,rr.y).multiplyScalar(-e/rr.z)}getViewSize(e,t){return this.getViewBounds(e,zg,kg),t.subVectors(kg,zg)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Wu*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ts=-90,As=1;class pT extends jt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new wn(Ts,As,e,t);r.layers=this.layers,this.add(r);const s=new wn(Ts,As,e,t);s.layers=this.layers,this.add(s);const o=new wn(Ts,As,e,t);o.layers=this.layers,this.add(o);const a=new wn(Ts,As,e,t);a.layers=this.layers,this.add(a);const l=new wn(Ts,As,e,t);l.layers=this.layers,this.add(l);const c=new wn(Ts,As,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Bi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ic)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class _x extends _n{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:uo,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class mT extends os{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new _x(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ei}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Vi(5,5,5),s=new Tr({name:"CubemapFromEquirect",uniforms:mo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:yr});s.uniforms.tEquirect.value=t;const o=new et(r,s),a=t.minFilter;return t.minFilter===Zr&&(t.minFilter=ei),new pT(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const dh=new z,gT=new z,vT=new je;class Hr{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=dh.subVectors(i,t).cross(gT.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(dh),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||vT.getNormalMatrix(e),r=this.coplanarPoint(dh).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ur=new gp,Nl=new z;class vp{constructor(e=new Hr,t=new Hr,i=new Hr,r=new Hr,s=new Hr,o=new Hr){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Bi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],d=r[6],h=r[7],p=r[8],g=r[9],_=r[10],m=r[11],f=r[12],v=r[13],x=r[14],S=r[15];if(i[0].setComponents(l-s,h-c,m-p,S-f).normalize(),i[1].setComponents(l+s,h+c,m+p,S+f).normalize(),i[2].setComponents(l+o,h+u,m+g,S+v).normalize(),i[3].setComponents(l-o,h-u,m-g,S-v).normalize(),i[4].setComponents(l-a,h-d,m-_,S-x).normalize(),t===Bi)i[5].setComponents(l+a,h+d,m+_,S+x).normalize();else if(t===Ic)i[5].setComponents(a,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ur.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ur)}intersectsSprite(e){return Ur.center.set(0,0,0),Ur.radius=.7071067811865476,Ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ur)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Nl.x=r.normal.x>0?e.max.x:e.min.x,Nl.y=r.normal.y>0?e.max.y:e.min.y,Nl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Nl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function xx(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function _T(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class tu extends Vn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,h=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<u;f++){const v=f*h-o;for(let x=0;x<c;x++){const S=x*d-s;g.push(S,-v,0),_.push(0,0,1),m.push(x/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<a;v++){const x=v+c*f,S=v+c*(f+1),R=v+1+c*(f+1),A=v+1+c*f;p.push(x,S,A),p.push(S,R,A)}this.setIndex(p),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tu(e.width,e.height,e.widthSegments,e.heightSegments)}}var xT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ST=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,MT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ET=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,TT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,AT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,CT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,RT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,PT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,LT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,NT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,IT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,DT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,UT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,FT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,OT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zT=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,BT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,HT=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,VT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,GT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,WT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,XT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,YT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$T="gl_FragColor = linearToOutputTexel( gl_FragColor );",KT=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ZT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,JT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,QT=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,eA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,nA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,iA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,oA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,aA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cA=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uA=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,hA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,dA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fA=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mA=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gA=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vA=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_A=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xA=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,yA=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,SA=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,MA=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,EA=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wA=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,TA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,AA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,CA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,RA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,PA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,LA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,NA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,IA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,DA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,UA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,FA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,OA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,BA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,HA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,VA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,GA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,WA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,XA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,YA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$A=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,KA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ZA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,JA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,QA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eC=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,tC=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nC=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,iC=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rC=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sC=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,oC=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,aC=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lC=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cC=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,uC=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hC=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dC=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fC=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,pC=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mC=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gC=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vC=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _C=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xC=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,SC=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,EC=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wC=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,TC=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,AC=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,CC=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,RC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bC=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PC=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,LC=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,NC=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,IC=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DC=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,UC=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FC=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,OC=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zC=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kC=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,BC=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,HC=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VC=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,GC=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WC=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,XC=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jC=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YC=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$C=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,KC=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ZC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:xT,alphahash_pars_fragment:yT,alphamap_fragment:ST,alphamap_pars_fragment:MT,alphatest_fragment:ET,alphatest_pars_fragment:wT,aomap_fragment:TT,aomap_pars_fragment:AT,batching_pars_vertex:CT,batching_vertex:RT,begin_vertex:bT,beginnormal_vertex:PT,bsdfs:LT,iridescence_fragment:NT,bumpmap_pars_fragment:IT,clipping_planes_fragment:DT,clipping_planes_pars_fragment:UT,clipping_planes_pars_vertex:FT,clipping_planes_vertex:OT,color_fragment:zT,color_pars_fragment:kT,color_pars_vertex:BT,color_vertex:HT,common:VT,cube_uv_reflection_fragment:GT,defaultnormal_vertex:WT,displacementmap_pars_vertex:XT,displacementmap_vertex:jT,emissivemap_fragment:qT,emissivemap_pars_fragment:YT,colorspace_fragment:$T,colorspace_pars_fragment:KT,envmap_fragment:ZT,envmap_common_pars_fragment:JT,envmap_pars_fragment:QT,envmap_pars_vertex:eA,envmap_physical_pars_fragment:hA,envmap_vertex:tA,fog_vertex:nA,fog_pars_vertex:iA,fog_fragment:rA,fog_pars_fragment:sA,gradientmap_pars_fragment:oA,lightmap_pars_fragment:aA,lights_lambert_fragment:lA,lights_lambert_pars_fragment:cA,lights_pars_begin:uA,lights_toon_fragment:dA,lights_toon_pars_fragment:fA,lights_phong_fragment:pA,lights_phong_pars_fragment:mA,lights_physical_fragment:gA,lights_physical_pars_fragment:vA,lights_fragment_begin:_A,lights_fragment_maps:xA,lights_fragment_end:yA,logdepthbuf_fragment:SA,logdepthbuf_pars_fragment:MA,logdepthbuf_pars_vertex:EA,logdepthbuf_vertex:wA,map_fragment:TA,map_pars_fragment:AA,map_particle_fragment:CA,map_particle_pars_fragment:RA,metalnessmap_fragment:bA,metalnessmap_pars_fragment:PA,morphinstance_vertex:LA,morphcolor_vertex:NA,morphnormal_vertex:IA,morphtarget_pars_vertex:DA,morphtarget_vertex:UA,normal_fragment_begin:FA,normal_fragment_maps:OA,normal_pars_fragment:zA,normal_pars_vertex:kA,normal_vertex:BA,normalmap_pars_fragment:HA,clearcoat_normal_fragment_begin:VA,clearcoat_normal_fragment_maps:GA,clearcoat_pars_fragment:WA,iridescence_pars_fragment:XA,opaque_fragment:jA,packing:qA,premultiplied_alpha_fragment:YA,project_vertex:$A,dithering_fragment:KA,dithering_pars_fragment:ZA,roughnessmap_fragment:JA,roughnessmap_pars_fragment:QA,shadowmap_pars_fragment:eC,shadowmap_pars_vertex:tC,shadowmap_vertex:nC,shadowmask_pars_fragment:iC,skinbase_vertex:rC,skinning_pars_vertex:sC,skinning_vertex:oC,skinnormal_vertex:aC,specularmap_fragment:lC,specularmap_pars_fragment:cC,tonemapping_fragment:uC,tonemapping_pars_fragment:hC,transmission_fragment:dC,transmission_pars_fragment:fC,uv_pars_fragment:pC,uv_pars_vertex:mC,uv_vertex:gC,worldpos_vertex:vC,background_vert:_C,background_frag:xC,backgroundCube_vert:yC,backgroundCube_frag:SC,cube_vert:MC,cube_frag:EC,depth_vert:wC,depth_frag:TC,distanceRGBA_vert:AC,distanceRGBA_frag:CC,equirect_vert:RC,equirect_frag:bC,linedashed_vert:PC,linedashed_frag:LC,meshbasic_vert:NC,meshbasic_frag:IC,meshlambert_vert:DC,meshlambert_frag:UC,meshmatcap_vert:FC,meshmatcap_frag:OC,meshnormal_vert:zC,meshnormal_frag:kC,meshphong_vert:BC,meshphong_frag:HC,meshphysical_vert:VC,meshphysical_frag:GC,meshtoon_vert:WC,meshtoon_frag:XC,points_vert:jC,points_frag:qC,shadow_vert:YC,shadow_frag:$C,sprite_vert:KC,sprite_frag:ZC},ve={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new _e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new _e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},pi={basic:{uniforms:tn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:tn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new nt(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:tn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:tn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:tn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new nt(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:tn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:tn([ve.points,ve.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:tn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:tn([ve.common,ve.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:tn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:tn([ve.sprite,ve.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:tn([ve.common,ve.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:tn([ve.lights,ve.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};pi.physical={uniforms:tn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new _e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new _e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new _e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Il={r:0,b:0,g:0},Fr=new yi,JC=new yt;function QC(n,e,t,i,r,s,o){const a=new nt(0);let l=s===!0?0:1,c,u,d=null,h=0,p=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const S=g(v);S===null?f(a,l):S&&S.isColor&&(f(S,1),x=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(v,x){const S=g(x);S&&(S.isCubeTexture||S.mapping===Jc)?(u===void 0&&(u=new et(new Vi(1,1,1),new Tr({name:"BackgroundCubeMaterial",uniforms:mo(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Fr.copy(x.backgroundRotation),Fr.x*=-1,Fr.y*=-1,Fr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Fr.y*=-1,Fr.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(JC.makeRotationFromEuler(Fr)),u.material.toneMapped=at.getTransfer(S.colorSpace)!==gt,(d!==S||h!==S.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=S,h=S.version,p=n.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new et(new tu(2,2),new Tr({name:"BackgroundMaterial",uniforms:mo(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:wr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=at.getTransfer(S.colorSpace)!==gt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||h!==S.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=S,h=S.version,p=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function f(v,x){v.getRGB(Il,gx(n)),i.buffers.color.setClear(Il.r,Il.g,Il.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,f(a,l)},render:_,addToRenderList:m}}function e2(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(y,M,B,N,F){let O=!1;const D=d(N,B,M);s!==D&&(s=D,c(s.object)),O=p(y,N,B,F),O&&g(y,N,B,F),F!==null&&e.update(F,n.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,S(y,M,B,N),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function d(y,M,B){const N=B.wireframe===!0;let F=i[y.id];F===void 0&&(F={},i[y.id]=F);let O=F[M.id];O===void 0&&(O={},F[M.id]=O);let D=O[N];return D===void 0&&(D=h(l()),O[N]=D),D}function h(y){const M=[],B=[],N=[];for(let F=0;F<t;F++)M[F]=0,B[F]=0,N[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:B,attributeDivisors:N,object:y,attributes:{},index:null}}function p(y,M,B,N){const F=s.attributes,O=M.attributes;let D=0;const $=B.getAttributes();for(const I in $)if($[I].location>=0){const j=F[I];let Q=O[I];if(Q===void 0&&(I==="instanceMatrix"&&y.instanceMatrix&&(Q=y.instanceMatrix),I==="instanceColor"&&y.instanceColor&&(Q=y.instanceColor)),j===void 0||j.attribute!==Q||Q&&j.data!==Q.data)return!0;D++}return s.attributesNum!==D||s.index!==N}function g(y,M,B,N){const F={},O=M.attributes;let D=0;const $=B.getAttributes();for(const I in $)if($[I].location>=0){let j=O[I];j===void 0&&(I==="instanceMatrix"&&y.instanceMatrix&&(j=y.instanceMatrix),I==="instanceColor"&&y.instanceColor&&(j=y.instanceColor));const Q={};Q.attribute=j,j&&j.data&&(Q.data=j.data),F[I]=Q,D++}s.attributes=F,s.attributesNum=D,s.index=N}function _(){const y=s.newAttributes;for(let M=0,B=y.length;M<B;M++)y[M]=0}function m(y){f(y,0)}function f(y,M){const B=s.newAttributes,N=s.enabledAttributes,F=s.attributeDivisors;B[y]=1,N[y]===0&&(n.enableVertexAttribArray(y),N[y]=1),F[y]!==M&&(n.vertexAttribDivisor(y,M),F[y]=M)}function v(){const y=s.newAttributes,M=s.enabledAttributes;for(let B=0,N=M.length;B<N;B++)M[B]!==y[B]&&(n.disableVertexAttribArray(B),M[B]=0)}function x(y,M,B,N,F,O,D){D===!0?n.vertexAttribIPointer(y,M,B,F,O):n.vertexAttribPointer(y,M,B,N,F,O)}function S(y,M,B,N){_();const F=N.attributes,O=B.getAttributes(),D=M.defaultAttributeValues;for(const $ in O){const I=O[$];if(I.location>=0){let U=F[$];if(U===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(U=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(U=y.instanceColor)),U!==void 0){const j=U.normalized,Q=U.itemSize,ne=e.get(U);if(ne===void 0)continue;const Fe=ne.buffer,K=ne.type,oe=ne.bytesPerElement,me=K===n.INT||K===n.UNSIGNED_INT||U.gpuType===cp;if(U.isInterleavedBufferAttribute){const he=U.data,ze=he.stride,Oe=U.offset;if(he.isInstancedInterleavedBuffer){for(let Ge=0;Ge<I.locationSize;Ge++)f(I.location+Ge,he.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ge=0;Ge<I.locationSize;Ge++)m(I.location+Ge);n.bindBuffer(n.ARRAY_BUFFER,Fe);for(let Ge=0;Ge<I.locationSize;Ge++)x(I.location+Ge,Q/I.locationSize,K,j,ze*oe,(Oe+Q/I.locationSize*Ge)*oe,me)}else{if(U.isInstancedBufferAttribute){for(let he=0;he<I.locationSize;he++)f(I.location+he,U.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=U.meshPerAttribute*U.count)}else for(let he=0;he<I.locationSize;he++)m(I.location+he);n.bindBuffer(n.ARRAY_BUFFER,Fe);for(let he=0;he<I.locationSize;he++)x(I.location+he,Q/I.locationSize,K,j,Q*oe,Q/I.locationSize*he*oe,me)}}else if(D!==void 0){const j=D[$];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(I.location,j);break;case 3:n.vertexAttrib3fv(I.location,j);break;case 4:n.vertexAttrib4fv(I.location,j);break;default:n.vertexAttrib1fv(I.location,j)}}}}v()}function R(){P();for(const y in i){const M=i[y];for(const B in M){const N=M[B];for(const F in N)u(N[F].object),delete N[F];delete M[B]}delete i[y]}}function A(y){if(i[y.id]===void 0)return;const M=i[y.id];for(const B in M){const N=M[B];for(const F in N)u(N[F].object),delete N[F];delete M[B]}delete i[y.id]}function w(y){for(const M in i){const B=i[M];if(B[y.id]===void 0)continue;const N=B[y.id];for(const F in N)u(N[F].object),delete N[F];delete B[y.id]}}function P(){W(),o=!0,s!==r&&(s=r,c(s.object))}function W(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:W,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function t2(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];t.update(p,i,1)}function l(c,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];for(let _=0;_<h.length;_++)t.update(g,i,h[_])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function n2(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==ii&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const P=w===Fa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==qi&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ki&&!P)}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(h===!0){const w=e.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:S,vertexTextures:R,maxSamples:A}}function i2(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Hr,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const v=s?0:i,x=v*4;let S=f.clippingState||null;l.value=S,S=u(g,h,x,p);for(let R=0;R!==x;++R)S[R]=t[R];f.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,S=p;x!==_;++x,S+=4)o.copy(d[x]).applyMatrix4(v,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function r2(n){let e=new WeakMap;function t(o,a){return a===Ad?o.mapping=uo:a===Cd&&(o.mapping=ho),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ad||a===Cd)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new mT(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class yx extends vx{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Gs=4,Bg=[.125,.215,.35,.446,.526,.582],Xr=20,fh=new yx,Hg=new nt;let ph=null,mh=0,gh=0,vh=!1;const Vr=(1+Math.sqrt(5))/2,Cs=1/Vr,Vg=[new z(-Vr,Cs,0),new z(Vr,Cs,0),new z(-Cs,0,Vr),new z(Cs,0,Vr),new z(0,Vr,-Cs),new z(0,Vr,Cs),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class rf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){ph=this._renderer.getRenderTarget(),mh=this._renderer.getActiveCubeFace(),gh=this._renderer.getActiveMipmapLevel(),vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ph,mh,gh),this._renderer.xr.enabled=vh,e.scissorTest=!1,Dl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===uo||e.mapping===ho?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ph=this._renderer.getRenderTarget(),mh=this._renderer.getActiveCubeFace(),gh=this._renderer.getActiveMipmapLevel(),vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:Fa,format:ii,colorSpace:br,depthBuffer:!1},r=Gg(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gg(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=s2(s)),this._blurMaterial=o2(s,e,t)}return r}_compileMaterial(e){const t=new et(this._lodPlanes[0],e);this._renderer.compile(t,fh)}_sceneToCubeUV(e,t,i,r){const a=new wn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Hg),u.toneMapping=Sr,u.autoClear=!1;const p=new eu({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),g=new et(new Vi,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Hg),_=!0);for(let f=0;f<6;f++){const v=f%3;v===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):v===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const x=this._cubeSize;Dl(r,v*x,f>2?x:0,x,x),u.setRenderTarget(r),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===uo||e.mapping===ho;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new et(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Dl(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,fh)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Vg[(r-s-1)%Vg.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new et(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Xr-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Xr;m>Xr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xr}`);const f=[];let v=0;for(let w=0;w<Xr;++w){const P=w/_,W=Math.exp(-P*P/2);f.push(W),w===0?v+=W:w<m&&(v+=2*W)}for(let w=0;w<f.length;w++)f[w]=f[w]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const S=this._sizeLods[r],R=3*S*(r>x-Gs?r-x+Gs:0),A=4*(this._cubeSize-S);Dl(t,R,A,3*S,2*S),l.setRenderTarget(t),l.render(d,fh)}}function s2(n){const e=[],t=[],i=[];let r=n;const s=n-Gs+1+Bg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-Gs?l=Bg[o-n+Gs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,_=3,m=2,f=1,v=new Float32Array(_*g*p),x=new Float32Array(m*g*p),S=new Float32Array(f*g*p);for(let A=0;A<p;A++){const w=A%3*2/3-1,P=A>2?0:-1,W=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];v.set(W,_*g*A),x.set(h,m*g*A);const y=[A,A,A,A,A,A];S.set(y,f*g*A)}const R=new Vn;R.setAttribute("position",new xi(v,_)),R.setAttribute("uv",new xi(x,m)),R.setAttribute("faceIndex",new xi(S,f)),e.push(R),r>Gs&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Gg(n,e,t){const i=new os(n,e,t);return i.texture.mapping=Jc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Dl(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function o2(n,e,t){const i=new Float32Array(Xr),r=new z(0,1,0);return new Tr({name:"SphericalGaussianBlur",defines:{n:Xr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:_p(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function Wg(){return new Tr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_p(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function Xg(){return new Tr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_p(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function _p(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function a2(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ad||l===Cd,u=l===uo||l===ho;if(c||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new rf(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new rf(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function l2(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&ic("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function c2(n,e,t,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(d){const h=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const v=p.array;_=p.version;for(let x=0,S=v.length;x<S;x+=3){const R=v[x+0],A=v[x+1],w=v[x+2];h.push(R,A,A,w,w,R)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,S=v.length/3-1;x<S;x+=3){const R=x+0,A=x+1,w=x+2;h.push(R,A,A,w,w,R)}}else return;const m=new(cx(h)?mx:px)(h,1);m.version=_;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function u2(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,p){n.drawElements(i,p,s,h*o),t.update(p,i,1)}function c(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,h*o,g),t.update(p,i,g))}function u(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,i,1)}function d(h,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)c(h[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,_,0,g);let f=0;for(let v=0;v<g;v++)f+=p[v];for(let v=0;v<_.length;v++)t.update(f,i,_[v])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function h2(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function d2(n,e,t){const i=new WeakMap,r=new ut;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let y=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var p=y;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let R=a.attributes.position.count*S,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const w=new Float32Array(R*A*4*d),P=new hx(w,R,A,d);P.type=ki,P.needsUpdate=!0;const W=S*4;for(let M=0;M<d;M++){const B=f[M],N=v[M],F=x[M],O=R*A*4*M;for(let D=0;D<B.count;D++){const $=D*W;g===!0&&(r.fromBufferAttribute(B,D),w[O+$+0]=r.x,w[O+$+1]=r.y,w[O+$+2]=r.z,w[O+$+3]=0),_===!0&&(r.fromBufferAttribute(N,D),w[O+$+4]=r.x,w[O+$+5]=r.y,w[O+$+6]=r.z,w[O+$+7]=0),m===!0&&(r.fromBufferAttribute(F,D),w[O+$+8]=r.x,w[O+$+9]=r.y,w[O+$+10]=r.z,w[O+$+11]=F.itemSize===4?r.w:1)}}h={count:d,texture:P,size:new _e(R,A)},i.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function f2(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class Sx extends _n{constructor(e,t,i,r,s,o,a,l,c,u=Qs){if(u!==Qs&&u!==po)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Qs&&(i=ss),i===void 0&&u===po&&(i=fo),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:zn,this.minFilter=l!==void 0?l:zn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Mx=new _n,jg=new Sx(1,1),Ex=new hx,wx=new J1,Tx=new _x,qg=[],Yg=[],$g=new Float32Array(16),Kg=new Float32Array(9),Zg=new Float32Array(4);function So(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=qg[r];if(s===void 0&&(s=new Float32Array(r),qg[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Ot(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function nu(n,e){let t=Yg[e];t===void 0&&(t=new Int32Array(e),Yg[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function p2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function m2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function g2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function v2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function _2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Ot(t,i))return;Zg.set(i),n.uniformMatrix2fv(this.addr,!1,Zg),zt(t,i)}}function x2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Ot(t,i))return;Kg.set(i),n.uniformMatrix3fv(this.addr,!1,Kg),zt(t,i)}}function y2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Ot(t,i))return;$g.set(i),n.uniformMatrix4fv(this.addr,!1,$g),zt(t,i)}}function S2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function M2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function E2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function w2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function T2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function A2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function C2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function R2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function b2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(jg.compareFunction=lx,s=jg):s=Mx,t.setTexture2D(e||s,r)}function P2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||wx,r)}function L2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Tx,r)}function N2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ex,r)}function I2(n){switch(n){case 5126:return p2;case 35664:return m2;case 35665:return g2;case 35666:return v2;case 35674:return _2;case 35675:return x2;case 35676:return y2;case 5124:case 35670:return S2;case 35667:case 35671:return M2;case 35668:case 35672:return E2;case 35669:case 35673:return w2;case 5125:return T2;case 36294:return A2;case 36295:return C2;case 36296:return R2;case 35678:case 36198:case 36298:case 36306:case 35682:return b2;case 35679:case 36299:case 36307:return P2;case 35680:case 36300:case 36308:case 36293:return L2;case 36289:case 36303:case 36311:case 36292:return N2}}function D2(n,e){n.uniform1fv(this.addr,e)}function U2(n,e){const t=So(e,this.size,2);n.uniform2fv(this.addr,t)}function F2(n,e){const t=So(e,this.size,3);n.uniform3fv(this.addr,t)}function O2(n,e){const t=So(e,this.size,4);n.uniform4fv(this.addr,t)}function z2(n,e){const t=So(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function k2(n,e){const t=So(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function B2(n,e){const t=So(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function H2(n,e){n.uniform1iv(this.addr,e)}function V2(n,e){n.uniform2iv(this.addr,e)}function G2(n,e){n.uniform3iv(this.addr,e)}function W2(n,e){n.uniform4iv(this.addr,e)}function X2(n,e){n.uniform1uiv(this.addr,e)}function j2(n,e){n.uniform2uiv(this.addr,e)}function q2(n,e){n.uniform3uiv(this.addr,e)}function Y2(n,e){n.uniform4uiv(this.addr,e)}function $2(n,e,t){const i=this.cache,r=e.length,s=nu(t,r);Ot(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Mx,s[o])}function K2(n,e,t){const i=this.cache,r=e.length,s=nu(t,r);Ot(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||wx,s[o])}function Z2(n,e,t){const i=this.cache,r=e.length,s=nu(t,r);Ot(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Tx,s[o])}function J2(n,e,t){const i=this.cache,r=e.length,s=nu(t,r);Ot(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Ex,s[o])}function Q2(n){switch(n){case 5126:return D2;case 35664:return U2;case 35665:return F2;case 35666:return O2;case 35674:return z2;case 35675:return k2;case 35676:return B2;case 5124:case 35670:return H2;case 35667:case 35671:return V2;case 35668:case 35672:return G2;case 35669:case 35673:return W2;case 5125:return X2;case 36294:return j2;case 36295:return q2;case 36296:return Y2;case 35678:case 36198:case 36298:case 36306:case 35682:return $2;case 35679:case 36299:case 36307:return K2;case 35680:case 36300:case 36308:case 36293:return Z2;case 36289:case 36303:case 36311:case 36292:return J2}}class eR{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=I2(t.type)}}class tR{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Q2(t.type)}}class nR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const _h=/(\w+)(\])?(\[|\.)?/g;function Jg(n,e){n.seq.push(e),n.map[e.id]=e}function iR(n,e,t){const i=n.name,r=i.length;for(_h.lastIndex=0;;){const s=_h.exec(i),o=_h.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Jg(t,c===void 0?new eR(a,n,e):new tR(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new nR(a),Jg(t,d)),t=d}}}class rc{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);iR(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Qg(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const rR=37297;let sR=0;function oR(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function aR(n){const e=at.getPrimaries(at.workingColorSpace),t=at.getPrimaries(n);let i;switch(e===t?i="":e===Nc&&t===Lc?i="LinearDisplayP3ToLinearSRGB":e===Lc&&t===Nc&&(i="LinearSRGBToLinearDisplayP3"),n){case br:case Qc:return[i,"LinearTransferOETF"];case Dn:case mp:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function e0(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+oR(n.getShaderSource(e),o)}else return r}function lR(n,e){const t=aR(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function cR(n,e){let t;switch(e){case T1:t="Linear";break;case A1:t="Reinhard";break;case C1:t="Cineon";break;case $_:t="ACESFilmic";break;case b1:t="AgX";break;case P1:t="Neutral";break;case R1:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ul=new z;function uR(){at.getLuminanceCoefficients(Ul);const n=Ul.x.toFixed(4),e=Ul.y.toFixed(4),t=Ul.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hR(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yo).join(`
`)}function dR(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function fR(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Yo(n){return n!==""}function t0(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function n0(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pR=/^[ \t]*#include +<([\w\d./]+)>/gm;function sf(n){return n.replace(pR,gR)}const mR=new Map;function gR(n,e){let t=Xe[e];if(t===void 0){const i=mR.get(e);if(i!==void 0)t=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return sf(t)}const vR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function i0(n){return n.replace(vR,_R)}function _R(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function r0(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function xR(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===q_?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===r1?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ni&&(e="SHADOWMAP_TYPE_VSM"),e}function yR(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case uo:case ho:e="ENVMAP_TYPE_CUBE";break;case Jc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function SR(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ho:e="ENVMAP_MODE_REFRACTION";break}return e}function MR(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Y_:e="ENVMAP_BLENDING_MULTIPLY";break;case E1:e="ENVMAP_BLENDING_MIX";break;case w1:e="ENVMAP_BLENDING_ADD";break}return e}function ER(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function wR(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=xR(t),c=yR(t),u=SR(t),d=MR(t),h=ER(t),p=hR(t),g=dR(s),_=r.createProgram();let m,f,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Yo).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Yo).join(`
`),f.length>0&&(f+=`
`)):(m=[r0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yo).join(`
`),f=[r0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Sr?"#define TONE_MAPPING":"",t.toneMapping!==Sr?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Sr?cR("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,lR("linearToOutputTexel",t.outputColorSpace),uR(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Yo).join(`
`)),o=sf(o),o=t0(o,t),o=n0(o,t),a=sf(a),a=t0(a,t),a=n0(a,t),o=i0(o),a=i0(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Mg?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=v+m+o,S=v+f+a,R=Qg(r,r.VERTEX_SHADER,x),A=Qg(r,r.FRAGMENT_SHADER,S);r.attachShader(_,R),r.attachShader(_,A),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(M){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(_).trim(),N=r.getShaderInfoLog(R).trim(),F=r.getShaderInfoLog(A).trim();let O=!0,D=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,R,A);else{const $=e0(r,R,"vertex"),I=e0(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+B+`
`+$+`
`+I)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(N===""||F==="")&&(D=!1);D&&(M.diagnostics={runnable:O,programLog:B,vertexShader:{log:N,prefix:m},fragmentShader:{log:F,prefix:f}})}r.deleteShader(R),r.deleteShader(A),P=new rc(r,_),W=fR(r,_)}let P;this.getUniforms=function(){return P===void 0&&w(this),P};let W;this.getAttributes=function(){return W===void 0&&w(this),W};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,rR)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sR++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let TR=0;class AR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new CR(e),t.set(e,i)),i}}class CR{constructor(e){this.id=TR++,this.code=e,this.usedTimes=0}}function RR(n,e,t,i,r,s,o){const a=new dx,l=new AR,c=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.reverseDepthBuffer,p=r.vertexTextures;let g=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return c.add(y),y===0?"uv":`uv${y}`}function f(y,M,B,N,F){const O=N.fog,D=F.geometry,$=y.isMeshStandardMaterial?N.environment:null,I=(y.isMeshStandardMaterial?t:e).get(y.envMap||$),U=I&&I.mapping===Jc?I.image.height:null,j=_[y.type];y.precision!==null&&(g=r.getMaxPrecision(y.precision),g!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",g,"instead."));const Q=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ne=Q!==void 0?Q.length:0;let Fe=0;D.morphAttributes.position!==void 0&&(Fe=1),D.morphAttributes.normal!==void 0&&(Fe=2),D.morphAttributes.color!==void 0&&(Fe=3);let K,oe,me,he;if(j){const un=pi[j];K=un.vertexShader,oe=un.fragmentShader}else K=y.vertexShader,oe=y.fragmentShader,l.update(y),me=l.getVertexShaderID(y),he=l.getFragmentShaderID(y);const ze=n.getRenderTarget(),Oe=F.isInstancedMesh===!0,Ge=F.isBatchedMesh===!0,qe=!!y.map,ie=!!y.matcap,L=!!I,fe=!!y.aoMap,de=!!y.lightMap,le=!!y.bumpMap,pe=!!y.normalMap,De=!!y.displacementMap,Se=!!y.emissiveMap,b=!!y.metalnessMap,E=!!y.roughnessMap,X=y.anisotropy>0,ee=y.clearcoat>0,re=y.dispersion>0,te=y.iridescence>0,Le=y.sheen>0,ge=y.transmission>0,we=X&&!!y.anisotropyMap,Ze=ee&&!!y.clearcoatMap,ce=ee&&!!y.clearcoatNormalMap,Te=ee&&!!y.clearcoatRoughnessMap,He=te&&!!y.iridescenceMap,Ve=te&&!!y.iridescenceThicknessMap,Ce=Le&&!!y.sheenColorMap,Je=Le&&!!y.sheenRoughnessMap,We=!!y.specularMap,ht=!!y.specularColorMap,k=!!y.specularIntensityMap,Me=ge&&!!y.transmissionMap,J=ge&&!!y.thicknessMap,se=!!y.gradientMap,xe=!!y.alphaMap,Ee=y.alphaTest>0,Qe=!!y.alphaHash,Lt=!!y.extensions;let cn=Sr;y.toneMapped&&(ze===null||ze.isXRRenderTarget===!0)&&(cn=n.toneMapping);const it={shaderID:j,shaderType:y.type,shaderName:y.name,vertexShader:K,fragmentShader:oe,defines:y.defines,customVertexShaderID:me,customFragmentShaderID:he,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:g,batching:Ge,batchingColor:Ge&&F._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&F.instanceColor!==null,instancingMorph:Oe&&F.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ze===null?n.outputColorSpace:ze.isXRRenderTarget===!0?ze.texture.colorSpace:br,alphaToCoverage:!!y.alphaToCoverage,map:qe,matcap:ie,envMap:L,envMapMode:L&&I.mapping,envMapCubeUVHeight:U,aoMap:fe,lightMap:de,bumpMap:le,normalMap:pe,displacementMap:p&&De,emissiveMap:Se,normalMapObjectSpace:pe&&y.normalMapType===D1,normalMapTangentSpace:pe&&y.normalMapType===ax,metalnessMap:b,roughnessMap:E,anisotropy:X,anisotropyMap:we,clearcoat:ee,clearcoatMap:Ze,clearcoatNormalMap:ce,clearcoatRoughnessMap:Te,dispersion:re,iridescence:te,iridescenceMap:He,iridescenceThicknessMap:Ve,sheen:Le,sheenColorMap:Ce,sheenRoughnessMap:Je,specularMap:We,specularColorMap:ht,specularIntensityMap:k,transmission:ge,transmissionMap:Me,thicknessMap:J,gradientMap:se,opaque:y.transparent===!1&&y.blending===Js&&y.alphaToCoverage===!1,alphaMap:xe,alphaTest:Ee,alphaHash:Qe,combine:y.combine,mapUv:qe&&m(y.map.channel),aoMapUv:fe&&m(y.aoMap.channel),lightMapUv:de&&m(y.lightMap.channel),bumpMapUv:le&&m(y.bumpMap.channel),normalMapUv:pe&&m(y.normalMap.channel),displacementMapUv:De&&m(y.displacementMap.channel),emissiveMapUv:Se&&m(y.emissiveMap.channel),metalnessMapUv:b&&m(y.metalnessMap.channel),roughnessMapUv:E&&m(y.roughnessMap.channel),anisotropyMapUv:we&&m(y.anisotropyMap.channel),clearcoatMapUv:Ze&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:ce&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ve&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:Je&&m(y.sheenRoughnessMap.channel),specularMapUv:We&&m(y.specularMap.channel),specularColorMapUv:ht&&m(y.specularColorMap.channel),specularIntensityMapUv:k&&m(y.specularIntensityMap.channel),transmissionMapUv:Me&&m(y.transmissionMap.channel),thicknessMapUv:J&&m(y.thicknessMap.channel),alphaMapUv:xe&&m(y.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(pe||X),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!D.attributes.uv&&(qe||xe),fog:!!O,useFog:y.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:h,skinning:F.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:Fe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:cn,decodeVideoTexture:qe&&y.map.isVideoTexture===!0&&at.getTransfer(y.map.colorSpace)===gt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Fi,flipSided:y.side===on,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Lt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&y.extensions.multiDraw===!0||Ge)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return it.vertexUv1s=c.has(1),it.vertexUv2s=c.has(2),it.vertexUv3s=c.has(3),c.clear(),it}function v(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const B in y.defines)M.push(B),M.push(y.defines[B]);return y.isRawShaderMaterial===!1&&(x(M,y),S(M,y),M.push(n.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function x(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function S(y,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.alphaToCoverage&&a.enable(20),y.push(a.mask)}function R(y){const M=_[y.type];let B;if(M){const N=pi[M];B=hT.clone(N.uniforms)}else B=y.uniforms;return B}function A(y,M){let B;for(let N=0,F=u.length;N<F;N++){const O=u[N];if(O.cacheKey===M){B=O,++B.usedTimes;break}}return B===void 0&&(B=new wR(n,M,y,s),u.push(B)),B}function w(y){if(--y.usedTimes===0){const M=u.indexOf(y);u[M]=u[u.length-1],u.pop(),y.destroy()}}function P(y){l.remove(y)}function W(){l.dispose()}return{getParameters:f,getProgramCacheKey:v,getUniforms:R,acquireProgram:A,releaseProgram:w,releaseShaderCache:P,programs:u,dispose:W}}function bR(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function PR(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function s0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function o0(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,h,p,g,_,m){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),e++,f}function a(d,h,p,g,_,m){const f=o(d,h,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):t.push(f)}function l(d,h,p,g,_,m){const f=o(d,h,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function c(d,h){t.length>1&&t.sort(d||PR),i.length>1&&i.sort(h||s0),r.length>1&&r.sort(h||s0)}function u(){for(let d=e,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function LR(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new o0,n.set(i,[o])):r>=s.length?(o=new o0,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function NR(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new nt};break;case"SpotLight":t={position:new z,direction:new z,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function IR(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let DR=0;function UR(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function FR(n){const e=new NR,t=IR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const r=new z,s=new yt,o=new yt;function a(c){let u=0,d=0,h=0;for(let W=0;W<9;W++)i.probe[W].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,v=0,x=0,S=0,R=0,A=0,w=0;c.sort(UR);for(let W=0,y=c.length;W<y;W++){const M=c[W],B=M.color,N=M.intensity,F=M.distance,O=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)u+=B.r*N,d+=B.g*N,h+=B.b*N;else if(M.isLightProbe){for(let D=0;D<9;D++)i.probe[D].addScaledVector(M.sh.coefficients[D],N);w++}else if(M.isDirectionalLight){const D=e.get(M);if(D.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const $=M.shadow,I=t.get(M);I.shadowIntensity=$.intensity,I.shadowBias=$.bias,I.shadowNormalBias=$.normalBias,I.shadowRadius=$.radius,I.shadowMapSize=$.mapSize,i.directionalShadow[p]=I,i.directionalShadowMap[p]=O,i.directionalShadowMatrix[p]=M.shadow.matrix,v++}i.directional[p]=D,p++}else if(M.isSpotLight){const D=e.get(M);D.position.setFromMatrixPosition(M.matrixWorld),D.color.copy(B).multiplyScalar(N),D.distance=F,D.coneCos=Math.cos(M.angle),D.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),D.decay=M.decay,i.spot[_]=D;const $=M.shadow;if(M.map&&(i.spotLightMap[R]=M.map,R++,$.updateMatrices(M),M.castShadow&&A++),i.spotLightMatrix[_]=$.matrix,M.castShadow){const I=t.get(M);I.shadowIntensity=$.intensity,I.shadowBias=$.bias,I.shadowNormalBias=$.normalBias,I.shadowRadius=$.radius,I.shadowMapSize=$.mapSize,i.spotShadow[_]=I,i.spotShadowMap[_]=O,S++}_++}else if(M.isRectAreaLight){const D=e.get(M);D.color.copy(B).multiplyScalar(N),D.halfWidth.set(M.width*.5,0,0),D.halfHeight.set(0,M.height*.5,0),i.rectArea[m]=D,m++}else if(M.isPointLight){const D=e.get(M);if(D.color.copy(M.color).multiplyScalar(M.intensity),D.distance=M.distance,D.decay=M.decay,M.castShadow){const $=M.shadow,I=t.get(M);I.shadowIntensity=$.intensity,I.shadowBias=$.bias,I.shadowNormalBias=$.normalBias,I.shadowRadius=$.radius,I.shadowMapSize=$.mapSize,I.shadowCameraNear=$.camera.near,I.shadowCameraFar=$.camera.far,i.pointShadow[g]=I,i.pointShadowMap[g]=O,i.pointShadowMatrix[g]=M.shadow.matrix,x++}i.point[g]=D,g++}else if(M.isHemisphereLight){const D=e.get(M);D.skyColor.copy(M.color).multiplyScalar(N),D.groundColor.copy(M.groundColor).multiplyScalar(N),i.hemi[f]=D,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const P=i.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==f||P.numDirectionalShadows!==v||P.numPointShadows!==x||P.numSpotShadows!==S||P.numSpotMaps!==R||P.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=S+R-A,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=w,P.directionalLength=p,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=f,P.numDirectionalShadows=v,P.numPointShadows=x,P.numSpotShadows=S,P.numSpotMaps=R,P.numLightProbes=w,i.version=DR++)}function l(c,u){let d=0,h=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let f=0,v=c.length;f<v;f++){const x=c[f];if(x.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(x.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const S=i.hemi[_];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function a0(n){const e=new FR(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function OR(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new a0(n),e.set(r,[a])):s>=o.length?(a=new a0(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class zR extends ka{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=N1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class kR extends ka{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const BR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,HR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function VR(n,e,t){let i=new vp;const r=new _e,s=new _e,o=new ut,a=new zR({depthPacking:I1}),l=new kR,c={},u=t.maxTextureSize,d={[wr]:on,[on]:wr,[Fi]:Fi},h=new Tr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _e},radius:{value:4}},vertexShader:BR,fragmentShader:HR}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Vn;g.setAttribute("position",new xi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new et(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=q_;let f=this.type;this.render=function(A,w,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const W=n.getRenderTarget(),y=n.getActiveCubeFace(),M=n.getActiveMipmapLevel(),B=n.state;B.setBlending(yr),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const N=f!==Ni&&this.type===Ni,F=f===Ni&&this.type!==Ni;for(let O=0,D=A.length;O<D;O++){const $=A[O],I=$.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;r.copy(I.mapSize);const U=I.getFrameExtents();if(r.multiply(U),s.copy(I.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/U.x),r.x=s.x*U.x,I.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/U.y),r.y=s.y*U.y,I.mapSize.y=s.y)),I.map===null||N===!0||F===!0){const Q=this.type!==Ni?{minFilter:zn,magFilter:zn}:{};I.map!==null&&I.map.dispose(),I.map=new os(r.x,r.y,Q),I.map.texture.name=$.name+".shadowMap",I.camera.updateProjectionMatrix()}n.setRenderTarget(I.map),n.clear();const j=I.getViewportCount();for(let Q=0;Q<j;Q++){const ne=I.getViewport(Q);o.set(s.x*ne.x,s.y*ne.y,s.x*ne.z,s.y*ne.w),B.viewport(o),I.updateMatrices($,Q),i=I.getFrustum(),S(w,P,I.camera,$,this.type)}I.isPointLightShadow!==!0&&this.type===Ni&&v(I,P),I.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(W,y,M)};function v(A,w){const P=e.update(_);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new os(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(w,null,P,h,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(w,null,P,p,_,null)}function x(A,w,P,W){let y=null;const M=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(M!==void 0)y=M;else if(y=P.isPointLight===!0?l:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const B=y.uuid,N=w.uuid;let F=c[B];F===void 0&&(F={},c[B]=F);let O=F[N];O===void 0&&(O=y.clone(),F[N]=O,w.addEventListener("dispose",R)),y=O}if(y.visible=w.visible,y.wireframe=w.wireframe,W===Ni?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:d[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=n.properties.get(y);B.light=P}return y}function S(A,w,P,W,y){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Ni)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const N=e.update(A),F=A.material;if(Array.isArray(F)){const O=N.groups;for(let D=0,$=O.length;D<$;D++){const I=O[D],U=F[I.materialIndex];if(U&&U.visible){const j=x(A,U,W,y);A.onBeforeShadow(n,A,w,P,N,j,I),n.renderBufferDirect(P,null,N,j,A,I),A.onAfterShadow(n,A,w,P,N,j,I)}}}else if(F.visible){const O=x(A,F,W,y);A.onBeforeShadow(n,A,w,P,N,O,null),n.renderBufferDirect(P,null,N,O,A,null),A.onAfterShadow(n,A,w,P,N,O,null)}}const B=A.children;for(let N=0,F=B.length;N<F;N++)S(B[N],w,P,W,y)}function R(A){A.target.removeEventListener("dispose",R);for(const P in c){const W=c[P],y=A.target.uuid;y in W&&(W[y].dispose(),delete W[y])}}}const GR={[xd]:yd,[Sd]:wd,[Md]:Td,[co]:Ed,[yd]:xd,[wd]:Sd,[Td]:Md,[Ed]:co};function WR(n){function e(){let k=!1;const Me=new ut;let J=null;const se=new ut(0,0,0,0);return{setMask:function(xe){J!==xe&&!k&&(n.colorMask(xe,xe,xe,xe),J=xe)},setLocked:function(xe){k=xe},setClear:function(xe,Ee,Qe,Lt,cn){cn===!0&&(xe*=Lt,Ee*=Lt,Qe*=Lt),Me.set(xe,Ee,Qe,Lt),se.equals(Me)===!1&&(n.clearColor(xe,Ee,Qe,Lt),se.copy(Me))},reset:function(){k=!1,J=null,se.set(-1,0,0,0)}}}function t(){let k=!1,Me=!1,J=null,se=null,xe=null;return{setReversed:function(Ee){Me=Ee},setTest:function(Ee){Ee?me(n.DEPTH_TEST):he(n.DEPTH_TEST)},setMask:function(Ee){J!==Ee&&!k&&(n.depthMask(Ee),J=Ee)},setFunc:function(Ee){if(Me&&(Ee=GR[Ee]),se!==Ee){switch(Ee){case xd:n.depthFunc(n.NEVER);break;case yd:n.depthFunc(n.ALWAYS);break;case Sd:n.depthFunc(n.LESS);break;case co:n.depthFunc(n.LEQUAL);break;case Md:n.depthFunc(n.EQUAL);break;case Ed:n.depthFunc(n.GEQUAL);break;case wd:n.depthFunc(n.GREATER);break;case Td:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}se=Ee}},setLocked:function(Ee){k=Ee},setClear:function(Ee){xe!==Ee&&(n.clearDepth(Ee),xe=Ee)},reset:function(){k=!1,J=null,se=null,xe=null}}}function i(){let k=!1,Me=null,J=null,se=null,xe=null,Ee=null,Qe=null,Lt=null,cn=null;return{setTest:function(it){k||(it?me(n.STENCIL_TEST):he(n.STENCIL_TEST))},setMask:function(it){Me!==it&&!k&&(n.stencilMask(it),Me=it)},setFunc:function(it,un,Mi){(J!==it||se!==un||xe!==Mi)&&(n.stencilFunc(it,un,Mi),J=it,se=un,xe=Mi)},setOp:function(it,un,Mi){(Ee!==it||Qe!==un||Lt!==Mi)&&(n.stencilOp(it,un,Mi),Ee=it,Qe=un,Lt=Mi)},setLocked:function(it){k=it},setClear:function(it){cn!==it&&(n.clearStencil(it),cn=it)},reset:function(){k=!1,Me=null,J=null,se=null,xe=null,Ee=null,Qe=null,Lt=null,cn=null}}}const r=new e,s=new t,o=new i,a=new WeakMap,l=new WeakMap;let c={},u={},d=new WeakMap,h=[],p=null,g=!1,_=null,m=null,f=null,v=null,x=null,S=null,R=null,A=new nt(0,0,0),w=0,P=!1,W=null,y=null,M=null,B=null,N=null;const F=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,D=0;const $=n.getParameter(n.VERSION);$.indexOf("WebGL")!==-1?(D=parseFloat(/^WebGL (\d)/.exec($)[1]),O=D>=1):$.indexOf("OpenGL ES")!==-1&&(D=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),O=D>=2);let I=null,U={};const j=n.getParameter(n.SCISSOR_BOX),Q=n.getParameter(n.VIEWPORT),ne=new ut().fromArray(j),Fe=new ut().fromArray(Q);function K(k,Me,J,se){const xe=new Uint8Array(4),Ee=n.createTexture();n.bindTexture(k,Ee),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Qe=0;Qe<J;Qe++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(Me,0,n.RGBA,1,1,se,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(Me+Qe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return Ee}const oe={};oe[n.TEXTURE_2D]=K(n.TEXTURE_2D,n.TEXTURE_2D,1),oe[n.TEXTURE_CUBE_MAP]=K(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[n.TEXTURE_2D_ARRAY]=K(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),oe[n.TEXTURE_3D]=K(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),me(n.DEPTH_TEST),s.setFunc(co),de(!1),le(gg),me(n.CULL_FACE),L(yr);function me(k){c[k]!==!0&&(n.enable(k),c[k]=!0)}function he(k){c[k]!==!1&&(n.disable(k),c[k]=!1)}function ze(k,Me){return u[k]!==Me?(n.bindFramebuffer(k,Me),u[k]=Me,k===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Me),k===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Me),!0):!1}function Oe(k,Me){let J=h,se=!1;if(k){J=d.get(Me),J===void 0&&(J=[],d.set(Me,J));const xe=k.textures;if(J.length!==xe.length||J[0]!==n.COLOR_ATTACHMENT0){for(let Ee=0,Qe=xe.length;Ee<Qe;Ee++)J[Ee]=n.COLOR_ATTACHMENT0+Ee;J.length=xe.length,se=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,se=!0);se&&n.drawBuffers(J)}function Ge(k){return p!==k?(n.useProgram(k),p=k,!0):!1}const qe={[Wr]:n.FUNC_ADD,[o1]:n.FUNC_SUBTRACT,[a1]:n.FUNC_REVERSE_SUBTRACT};qe[l1]=n.MIN,qe[c1]=n.MAX;const ie={[u1]:n.ZERO,[h1]:n.ONE,[d1]:n.SRC_COLOR,[vd]:n.SRC_ALPHA,[_1]:n.SRC_ALPHA_SATURATE,[g1]:n.DST_COLOR,[p1]:n.DST_ALPHA,[f1]:n.ONE_MINUS_SRC_COLOR,[_d]:n.ONE_MINUS_SRC_ALPHA,[v1]:n.ONE_MINUS_DST_COLOR,[m1]:n.ONE_MINUS_DST_ALPHA,[x1]:n.CONSTANT_COLOR,[y1]:n.ONE_MINUS_CONSTANT_COLOR,[S1]:n.CONSTANT_ALPHA,[M1]:n.ONE_MINUS_CONSTANT_ALPHA};function L(k,Me,J,se,xe,Ee,Qe,Lt,cn,it){if(k===yr){g===!0&&(he(n.BLEND),g=!1);return}if(g===!1&&(me(n.BLEND),g=!0),k!==s1){if(k!==_||it!==P){if((m!==Wr||x!==Wr)&&(n.blendEquation(n.FUNC_ADD),m=Wr,x=Wr),it)switch(k){case Js:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vg:n.blendFunc(n.ONE,n.ONE);break;case _g:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xg:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Js:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vg:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case _g:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xg:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}f=null,v=null,S=null,R=null,A.set(0,0,0),w=0,_=k,P=it}return}xe=xe||Me,Ee=Ee||J,Qe=Qe||se,(Me!==m||xe!==x)&&(n.blendEquationSeparate(qe[Me],qe[xe]),m=Me,x=xe),(J!==f||se!==v||Ee!==S||Qe!==R)&&(n.blendFuncSeparate(ie[J],ie[se],ie[Ee],ie[Qe]),f=J,v=se,S=Ee,R=Qe),(Lt.equals(A)===!1||cn!==w)&&(n.blendColor(Lt.r,Lt.g,Lt.b,cn),A.copy(Lt),w=cn),_=k,P=!1}function fe(k,Me){k.side===Fi?he(n.CULL_FACE):me(n.CULL_FACE);let J=k.side===on;Me&&(J=!J),de(J),k.blending===Js&&k.transparent===!1?L(yr):L(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),s.setFunc(k.depthFunc),s.setTest(k.depthTest),s.setMask(k.depthWrite),r.setMask(k.colorWrite);const se=k.stencilWrite;o.setTest(se),se&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),De(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?me(n.SAMPLE_ALPHA_TO_COVERAGE):he(n.SAMPLE_ALPHA_TO_COVERAGE)}function de(k){W!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),W=k)}function le(k){k!==n1?(me(n.CULL_FACE),k!==y&&(k===gg?n.cullFace(n.BACK):k===i1?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):he(n.CULL_FACE),y=k}function pe(k){k!==M&&(O&&n.lineWidth(k),M=k)}function De(k,Me,J){k?(me(n.POLYGON_OFFSET_FILL),(B!==Me||N!==J)&&(n.polygonOffset(Me,J),B=Me,N=J)):he(n.POLYGON_OFFSET_FILL)}function Se(k){k?me(n.SCISSOR_TEST):he(n.SCISSOR_TEST)}function b(k){k===void 0&&(k=n.TEXTURE0+F-1),I!==k&&(n.activeTexture(k),I=k)}function E(k,Me,J){J===void 0&&(I===null?J=n.TEXTURE0+F-1:J=I);let se=U[J];se===void 0&&(se={type:void 0,texture:void 0},U[J]=se),(se.type!==k||se.texture!==Me)&&(I!==J&&(n.activeTexture(J),I=J),n.bindTexture(k,Me||oe[k]),se.type=k,se.texture=Me)}function X(){const k=U[I];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ee(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function te(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ge(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function we(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ze(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ce(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Te(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function He(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ve(k){ne.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),ne.copy(k))}function Ce(k){Fe.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),Fe.copy(k))}function Je(k,Me){let J=l.get(Me);J===void 0&&(J=new WeakMap,l.set(Me,J));let se=J.get(k);se===void 0&&(se=n.getUniformBlockIndex(Me,k.name),J.set(k,se))}function We(k,Me){const se=l.get(Me).get(k);a.get(Me)!==se&&(n.uniformBlockBinding(Me,se,k.__bindingPointIndex),a.set(Me,se))}function ht(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},I=null,U={},u={},d=new WeakMap,h=[],p=null,g=!1,_=null,m=null,f=null,v=null,x=null,S=null,R=null,A=new nt(0,0,0),w=0,P=!1,W=null,y=null,M=null,B=null,N=null,ne.set(0,0,n.canvas.width,n.canvas.height),Fe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:me,disable:he,bindFramebuffer:ze,drawBuffers:Oe,useProgram:Ge,setBlending:L,setMaterial:fe,setFlipSided:de,setCullFace:le,setLineWidth:pe,setPolygonOffset:De,setScissorTest:Se,activeTexture:b,bindTexture:E,unbindTexture:X,compressedTexImage2D:ee,compressedTexImage3D:re,texImage2D:Te,texImage3D:He,updateUBOMapping:Je,uniformBlockBinding:We,texStorage2D:Ze,texStorage3D:ce,texSubImage2D:te,texSubImage3D:Le,compressedTexSubImage2D:ge,compressedTexSubImage3D:we,scissor:Ve,viewport:Ce,reset:ht}}function l0(n,e,t,i){const r=XR(i);switch(t){case ex:return n*e;case nx:return n*e;case ix:return n*e*2;case rx:return n*e/r.components*r.byteLength;case dp:return n*e/r.components*r.byteLength;case sx:return n*e*2/r.components*r.byteLength;case fp:return n*e*2/r.components*r.byteLength;case tx:return n*e*3/r.components*r.byteLength;case ii:return n*e*4/r.components*r.byteLength;case pp:return n*e*4/r.components*r.byteLength;case Jl:case Ql:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ec:case tc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ld:case Id:return Math.max(n,16)*Math.max(e,8)/4;case Pd:case Nd:return Math.max(n,8)*Math.max(e,8)/2;case Dd:case Ud:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Fd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Od:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zd:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case kd:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Bd:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Hd:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Vd:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Gd:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Wd:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Xd:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case jd:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case qd:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Yd:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case $d:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Kd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case nc:case Zd:case Jd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ox:case Qd:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ef:case tf:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function XR(n){switch(n){case qi:case Z_:return{byteLength:1,components:1};case Aa:case J_:case Fa:return{byteLength:2,components:1};case up:case hp:return{byteLength:2,components:4};case ss:case cp:case ki:return{byteLength:4,components:1};case Q_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function jR(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _e,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,E){return p?new OffscreenCanvas(b,E):Dc("canvas")}function _(b,E,X){let ee=1;const re=Se(b);if((re.width>X||re.height>X)&&(ee=X/Math.max(re.width,re.height)),ee<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const te=Math.floor(ee*re.width),Le=Math.floor(ee*re.height);d===void 0&&(d=g(te,Le));const ge=E?g(te,Le):d;return ge.width=te,ge.height=Le,ge.getContext("2d").drawImage(b,0,0,te,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+te+"x"+Le+")."),ge}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),b;return b}function m(b){return b.generateMipmaps&&b.minFilter!==zn&&b.minFilter!==ei}function f(b){n.generateMipmap(b)}function v(b,E,X,ee,re=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let te=E;if(E===n.RED&&(X===n.FLOAT&&(te=n.R32F),X===n.HALF_FLOAT&&(te=n.R16F),X===n.UNSIGNED_BYTE&&(te=n.R8)),E===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(te=n.R8UI),X===n.UNSIGNED_SHORT&&(te=n.R16UI),X===n.UNSIGNED_INT&&(te=n.R32UI),X===n.BYTE&&(te=n.R8I),X===n.SHORT&&(te=n.R16I),X===n.INT&&(te=n.R32I)),E===n.RG&&(X===n.FLOAT&&(te=n.RG32F),X===n.HALF_FLOAT&&(te=n.RG16F),X===n.UNSIGNED_BYTE&&(te=n.RG8)),E===n.RG_INTEGER&&(X===n.UNSIGNED_BYTE&&(te=n.RG8UI),X===n.UNSIGNED_SHORT&&(te=n.RG16UI),X===n.UNSIGNED_INT&&(te=n.RG32UI),X===n.BYTE&&(te=n.RG8I),X===n.SHORT&&(te=n.RG16I),X===n.INT&&(te=n.RG32I)),E===n.RGB_INTEGER&&(X===n.UNSIGNED_BYTE&&(te=n.RGB8UI),X===n.UNSIGNED_SHORT&&(te=n.RGB16UI),X===n.UNSIGNED_INT&&(te=n.RGB32UI),X===n.BYTE&&(te=n.RGB8I),X===n.SHORT&&(te=n.RGB16I),X===n.INT&&(te=n.RGB32I)),E===n.RGBA_INTEGER&&(X===n.UNSIGNED_BYTE&&(te=n.RGBA8UI),X===n.UNSIGNED_SHORT&&(te=n.RGBA16UI),X===n.UNSIGNED_INT&&(te=n.RGBA32UI),X===n.BYTE&&(te=n.RGBA8I),X===n.SHORT&&(te=n.RGBA16I),X===n.INT&&(te=n.RGBA32I)),E===n.RGB&&X===n.UNSIGNED_INT_5_9_9_9_REV&&(te=n.RGB9_E5),E===n.RGBA){const Le=re?Pc:at.getTransfer(ee);X===n.FLOAT&&(te=n.RGBA32F),X===n.HALF_FLOAT&&(te=n.RGBA16F),X===n.UNSIGNED_BYTE&&(te=Le===gt?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT_4_4_4_4&&(te=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(te=n.RGB5_A1)}return(te===n.R16F||te===n.R32F||te===n.RG16F||te===n.RG32F||te===n.RGBA16F||te===n.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function x(b,E){let X;return b?E===null||E===ss||E===fo?X=n.DEPTH24_STENCIL8:E===ki?X=n.DEPTH32F_STENCIL8:E===Aa&&(X=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ss||E===fo?X=n.DEPTH_COMPONENT24:E===ki?X=n.DEPTH_COMPONENT32F:E===Aa&&(X=n.DEPTH_COMPONENT16),X}function S(b,E){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==zn&&b.minFilter!==ei?Math.log2(Math.max(E.width,E.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?E.mipmaps.length:1}function R(b){const E=b.target;E.removeEventListener("dispose",R),w(E),E.isVideoTexture&&u.delete(E)}function A(b){const E=b.target;E.removeEventListener("dispose",A),W(E)}function w(b){const E=i.get(b);if(E.__webglInit===void 0)return;const X=b.source,ee=h.get(X);if(ee){const re=ee[E.__cacheKey];re.usedTimes--,re.usedTimes===0&&P(b),Object.keys(ee).length===0&&h.delete(X)}i.remove(b)}function P(b){const E=i.get(b);n.deleteTexture(E.__webglTexture);const X=b.source,ee=h.get(X);delete ee[E.__cacheKey],o.memory.textures--}function W(b){const E=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(E.__webglFramebuffer[ee]))for(let re=0;re<E.__webglFramebuffer[ee].length;re++)n.deleteFramebuffer(E.__webglFramebuffer[ee][re]);else n.deleteFramebuffer(E.__webglFramebuffer[ee]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[ee])}else{if(Array.isArray(E.__webglFramebuffer))for(let ee=0;ee<E.__webglFramebuffer.length;ee++)n.deleteFramebuffer(E.__webglFramebuffer[ee]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ee=0;ee<E.__webglColorRenderbuffer.length;ee++)E.__webglColorRenderbuffer[ee]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[ee]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const X=b.textures;for(let ee=0,re=X.length;ee<re;ee++){const te=i.get(X[ee]);te.__webglTexture&&(n.deleteTexture(te.__webglTexture),o.memory.textures--),i.remove(X[ee])}i.remove(b)}let y=0;function M(){y=0}function B(){const b=y;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),y+=1,b}function N(b){const E=[];return E.push(b.wrapS),E.push(b.wrapT),E.push(b.wrapR||0),E.push(b.magFilter),E.push(b.minFilter),E.push(b.anisotropy),E.push(b.internalFormat),E.push(b.format),E.push(b.type),E.push(b.generateMipmaps),E.push(b.premultiplyAlpha),E.push(b.flipY),E.push(b.unpackAlignment),E.push(b.colorSpace),E.join()}function F(b,E){const X=i.get(b);if(b.isVideoTexture&&pe(b),b.isRenderTargetTexture===!1&&b.version>0&&X.__version!==b.version){const ee=b.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Fe(X,b,E);return}}t.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+E)}function O(b,E){const X=i.get(b);if(b.version>0&&X.__version!==b.version){Fe(X,b,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+E)}function D(b,E){const X=i.get(b);if(b.version>0&&X.__version!==b.version){Fe(X,b,E);return}t.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+E)}function $(b,E){const X=i.get(b);if(b.version>0&&X.__version!==b.version){K(X,b,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+E)}const I={[Rd]:n.REPEAT,[Kr]:n.CLAMP_TO_EDGE,[bd]:n.MIRRORED_REPEAT},U={[zn]:n.NEAREST,[L1]:n.NEAREST_MIPMAP_NEAREST,[ml]:n.NEAREST_MIPMAP_LINEAR,[ei]:n.LINEAR,[Gu]:n.LINEAR_MIPMAP_NEAREST,[Zr]:n.LINEAR_MIPMAP_LINEAR},j={[U1]:n.NEVER,[H1]:n.ALWAYS,[F1]:n.LESS,[lx]:n.LEQUAL,[O1]:n.EQUAL,[B1]:n.GEQUAL,[z1]:n.GREATER,[k1]:n.NOTEQUAL};function Q(b,E){if(E.type===ki&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===ei||E.magFilter===Gu||E.magFilter===ml||E.magFilter===Zr||E.minFilter===ei||E.minFilter===Gu||E.minFilter===ml||E.minFilter===Zr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,I[E.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,I[E.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,I[E.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,U[E.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,U[E.minFilter]),E.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,j[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===zn||E.minFilter!==ml&&E.minFilter!==Zr||E.type===ki&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function ne(b,E){let X=!1;b.__webglInit===void 0&&(b.__webglInit=!0,E.addEventListener("dispose",R));const ee=E.source;let re=h.get(ee);re===void 0&&(re={},h.set(ee,re));const te=N(E);if(te!==b.__cacheKey){re[te]===void 0&&(re[te]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,X=!0),re[te].usedTimes++;const Le=re[b.__cacheKey];Le!==void 0&&(re[b.__cacheKey].usedTimes--,Le.usedTimes===0&&P(E)),b.__cacheKey=te,b.__webglTexture=re[te].texture}return X}function Fe(b,E,X){let ee=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ee=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ee=n.TEXTURE_3D);const re=ne(b,E),te=E.source;t.bindTexture(ee,b.__webglTexture,n.TEXTURE0+X);const Le=i.get(te);if(te.version!==Le.__version||re===!0){t.activeTexture(n.TEXTURE0+X);const ge=at.getPrimaries(at.workingColorSpace),we=E.colorSpace===cr?null:at.getPrimaries(E.colorSpace),Ze=E.colorSpace===cr||ge===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let ce=_(E.image,!1,r.maxTextureSize);ce=De(E,ce);const Te=s.convert(E.format,E.colorSpace),He=s.convert(E.type);let Ve=v(E.internalFormat,Te,He,E.colorSpace,E.isVideoTexture);Q(ee,E);let Ce;const Je=E.mipmaps,We=E.isVideoTexture!==!0,ht=Le.__version===void 0||re===!0,k=te.dataReady,Me=S(E,ce);if(E.isDepthTexture)Ve=x(E.format===po,E.type),ht&&(We?t.texStorage2D(n.TEXTURE_2D,1,Ve,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,Ve,ce.width,ce.height,0,Te,He,null));else if(E.isDataTexture)if(Je.length>0){We&&ht&&t.texStorage2D(n.TEXTURE_2D,Me,Ve,Je[0].width,Je[0].height);for(let J=0,se=Je.length;J<se;J++)Ce=Je[J],We?k&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,Ce.width,Ce.height,Te,He,Ce.data):t.texImage2D(n.TEXTURE_2D,J,Ve,Ce.width,Ce.height,0,Te,He,Ce.data);E.generateMipmaps=!1}else We?(ht&&t.texStorage2D(n.TEXTURE_2D,Me,Ve,ce.width,ce.height),k&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ce.width,ce.height,Te,He,ce.data)):t.texImage2D(n.TEXTURE_2D,0,Ve,ce.width,ce.height,0,Te,He,ce.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){We&&ht&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,Ve,Je[0].width,Je[0].height,ce.depth);for(let J=0,se=Je.length;J<se;J++)if(Ce=Je[J],E.format!==ii)if(Te!==null)if(We){if(k)if(E.layerUpdates.size>0){const xe=l0(Ce.width,Ce.height,E.format,E.type);for(const Ee of E.layerUpdates){const Qe=Ce.data.subarray(Ee*xe/Ce.data.BYTES_PER_ELEMENT,(Ee+1)*xe/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,Ee,Ce.width,Ce.height,1,Te,Qe,0,0)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Ce.width,Ce.height,ce.depth,Te,Ce.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,Ve,Ce.width,Ce.height,ce.depth,0,Ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?k&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Ce.width,Ce.height,ce.depth,Te,He,Ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,Ve,Ce.width,Ce.height,ce.depth,0,Te,He,Ce.data)}else{We&&ht&&t.texStorage2D(n.TEXTURE_2D,Me,Ve,Je[0].width,Je[0].height);for(let J=0,se=Je.length;J<se;J++)Ce=Je[J],E.format!==ii?Te!==null?We?k&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,Ce.width,Ce.height,Te,Ce.data):t.compressedTexImage2D(n.TEXTURE_2D,J,Ve,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?k&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,Ce.width,Ce.height,Te,He,Ce.data):t.texImage2D(n.TEXTURE_2D,J,Ve,Ce.width,Ce.height,0,Te,He,Ce.data)}else if(E.isDataArrayTexture)if(We){if(ht&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,Ve,ce.width,ce.height,ce.depth),k)if(E.layerUpdates.size>0){const J=l0(ce.width,ce.height,E.format,E.type);for(const se of E.layerUpdates){const xe=ce.data.subarray(se*J/ce.data.BYTES_PER_ELEMENT,(se+1)*J/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,se,ce.width,ce.height,1,Te,He,xe)}E.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Te,He,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ve,ce.width,ce.height,ce.depth,0,Te,He,ce.data);else if(E.isData3DTexture)We?(ht&&t.texStorage3D(n.TEXTURE_3D,Me,Ve,ce.width,ce.height,ce.depth),k&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Te,He,ce.data)):t.texImage3D(n.TEXTURE_3D,0,Ve,ce.width,ce.height,ce.depth,0,Te,He,ce.data);else if(E.isFramebufferTexture){if(ht)if(We)t.texStorage2D(n.TEXTURE_2D,Me,Ve,ce.width,ce.height);else{let J=ce.width,se=ce.height;for(let xe=0;xe<Me;xe++)t.texImage2D(n.TEXTURE_2D,xe,Ve,J,se,0,Te,He,null),J>>=1,se>>=1}}else if(Je.length>0){if(We&&ht){const J=Se(Je[0]);t.texStorage2D(n.TEXTURE_2D,Me,Ve,J.width,J.height)}for(let J=0,se=Je.length;J<se;J++)Ce=Je[J],We?k&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,Te,He,Ce):t.texImage2D(n.TEXTURE_2D,J,Ve,Te,He,Ce);E.generateMipmaps=!1}else if(We){if(ht){const J=Se(ce);t.texStorage2D(n.TEXTURE_2D,Me,Ve,J.width,J.height)}k&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Te,He,ce)}else t.texImage2D(n.TEXTURE_2D,0,Ve,Te,He,ce);m(E)&&f(ee),Le.__version=te.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function K(b,E,X){if(E.image.length!==6)return;const ee=ne(b,E),re=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+X);const te=i.get(re);if(re.version!==te.__version||ee===!0){t.activeTexture(n.TEXTURE0+X);const Le=at.getPrimaries(at.workingColorSpace),ge=E.colorSpace===cr?null:at.getPrimaries(E.colorSpace),we=E.colorSpace===cr||Le===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Ze=E.isCompressedTexture||E.image[0].isCompressedTexture,ce=E.image[0]&&E.image[0].isDataTexture,Te=[];for(let se=0;se<6;se++)!Ze&&!ce?Te[se]=_(E.image[se],!0,r.maxCubemapSize):Te[se]=ce?E.image[se].image:E.image[se],Te[se]=De(E,Te[se]);const He=Te[0],Ve=s.convert(E.format,E.colorSpace),Ce=s.convert(E.type),Je=v(E.internalFormat,Ve,Ce,E.colorSpace),We=E.isVideoTexture!==!0,ht=te.__version===void 0||ee===!0,k=re.dataReady;let Me=S(E,He);Q(n.TEXTURE_CUBE_MAP,E);let J;if(Ze){We&&ht&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,Je,He.width,He.height);for(let se=0;se<6;se++){J=Te[se].mipmaps;for(let xe=0;xe<J.length;xe++){const Ee=J[xe];E.format!==ii?Ve!==null?We?k&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe,0,0,Ee.width,Ee.height,Ve,Ee.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe,Je,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe,0,0,Ee.width,Ee.height,Ve,Ce,Ee.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe,Je,Ee.width,Ee.height,0,Ve,Ce,Ee.data)}}}else{if(J=E.mipmaps,We&&ht){J.length>0&&Me++;const se=Se(Te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,Je,se.width,se.height)}for(let se=0;se<6;se++)if(ce){We?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Te[se].width,Te[se].height,Ve,Ce,Te[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Je,Te[se].width,Te[se].height,0,Ve,Ce,Te[se].data);for(let xe=0;xe<J.length;xe++){const Qe=J[xe].image[se].image;We?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe+1,0,0,Qe.width,Qe.height,Ve,Ce,Qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe+1,Je,Qe.width,Qe.height,0,Ve,Ce,Qe.data)}}else{We?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ve,Ce,Te[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Je,Ve,Ce,Te[se]);for(let xe=0;xe<J.length;xe++){const Ee=J[xe];We?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe+1,0,0,Ve,Ce,Ee.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe+1,Je,Ve,Ce,Ee.image[se])}}}m(E)&&f(n.TEXTURE_CUBE_MAP),te.__version=re.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function oe(b,E,X,ee,re,te){const Le=s.convert(X.format,X.colorSpace),ge=s.convert(X.type),we=v(X.internalFormat,Le,ge,X.colorSpace);if(!i.get(E).__hasExternalTextures){const ce=Math.max(1,E.width>>te),Te=Math.max(1,E.height>>te);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,te,we,ce,Te,E.depth,0,Le,ge,null):t.texImage2D(re,te,we,ce,Te,0,Le,ge,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),le(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,re,i.get(X).__webglTexture,0,de(E)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ee,re,i.get(X).__webglTexture,te),t.bindFramebuffer(n.FRAMEBUFFER,null)}function me(b,E,X){if(n.bindRenderbuffer(n.RENDERBUFFER,b),E.depthBuffer){const ee=E.depthTexture,re=ee&&ee.isDepthTexture?ee.type:null,te=x(E.stencilBuffer,re),Le=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=de(E);le(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ge,te,E.width,E.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,ge,te,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,te,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Le,n.RENDERBUFFER,b)}else{const ee=E.textures;for(let re=0;re<ee.length;re++){const te=ee[re],Le=s.convert(te.format,te.colorSpace),ge=s.convert(te.type),we=v(te.internalFormat,Le,ge,te.colorSpace),Ze=de(E);X&&le(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ze,we,E.width,E.height):le(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ze,we,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,we,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function he(b,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),F(E.depthTexture,0);const ee=i.get(E.depthTexture).__webglTexture,re=de(E);if(E.depthTexture.format===Qs)le(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,re):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(E.depthTexture.format===po)le(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,re):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function ze(b){const E=i.get(b),X=b.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==b.depthTexture){const ee=b.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ee){const re=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ee.removeEventListener("dispose",re)};ee.addEventListener("dispose",re),E.__depthDisposeCallback=re}E.__boundDepthTexture=ee}if(b.depthTexture&&!E.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");he(E.__webglFramebuffer,b)}else if(X){E.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[ee]),E.__webglDepthbuffer[ee]===void 0)E.__webglDepthbuffer[ee]=n.createRenderbuffer(),me(E.__webglDepthbuffer[ee],b,!1);else{const re=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=E.__webglDepthbuffer[ee];n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,te)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),me(E.__webglDepthbuffer,b,!1);else{const ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,re)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(b,E,X){const ee=i.get(b);E!==void 0&&oe(ee.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&ze(b)}function Ge(b){const E=b.texture,X=i.get(b),ee=i.get(E);b.addEventListener("dispose",A);const re=b.textures,te=b.isWebGLCubeRenderTarget===!0,Le=re.length>1;if(Le||(ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture()),ee.__version=E.version,o.memory.textures++),te){X.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer[ge]=[];for(let we=0;we<E.mipmaps.length;we++)X.__webglFramebuffer[ge][we]=n.createFramebuffer()}else X.__webglFramebuffer[ge]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer=[];for(let ge=0;ge<E.mipmaps.length;ge++)X.__webglFramebuffer[ge]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(Le)for(let ge=0,we=re.length;ge<we;ge++){const Ze=i.get(re[ge]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&le(b)===!1){X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ge=0;ge<re.length;ge++){const we=re[ge];X.__webglColorRenderbuffer[ge]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[ge]);const Ze=s.convert(we.format,we.colorSpace),ce=s.convert(we.type),Te=v(we.internalFormat,Ze,ce,we.colorSpace,b.isXRRenderTarget===!0),He=de(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,He,Te,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,X.__webglColorRenderbuffer[ge])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),me(X.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(te){t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),Q(n.TEXTURE_CUBE_MAP,E);for(let ge=0;ge<6;ge++)if(E.mipmaps&&E.mipmaps.length>0)for(let we=0;we<E.mipmaps.length;we++)oe(X.__webglFramebuffer[ge][we],b,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,we);else oe(X.__webglFramebuffer[ge],b,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(E)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let ge=0,we=re.length;ge<we;ge++){const Ze=re[ge],ce=i.get(Ze);t.bindTexture(n.TEXTURE_2D,ce.__webglTexture),Q(n.TEXTURE_2D,Ze),oe(X.__webglFramebuffer,b,Ze,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,0),m(Ze)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let ge=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ge=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,ee.__webglTexture),Q(ge,E),E.mipmaps&&E.mipmaps.length>0)for(let we=0;we<E.mipmaps.length;we++)oe(X.__webglFramebuffer[we],b,E,n.COLOR_ATTACHMENT0,ge,we);else oe(X.__webglFramebuffer,b,E,n.COLOR_ATTACHMENT0,ge,0);m(E)&&f(ge),t.unbindTexture()}b.depthBuffer&&ze(b)}function qe(b){const E=b.textures;for(let X=0,ee=E.length;X<ee;X++){const re=E[X];if(m(re)){const te=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Le=i.get(re).__webglTexture;t.bindTexture(te,Le),f(te),t.unbindTexture()}}}const ie=[],L=[];function fe(b){if(b.samples>0){if(le(b)===!1){const E=b.textures,X=b.width,ee=b.height;let re=n.COLOR_BUFFER_BIT;const te=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Le=i.get(b),ge=E.length>1;if(ge)for(let we=0;we<E.length;we++)t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let we=0;we<E.length;we++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),ge){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Le.__webglColorRenderbuffer[we]);const Ze=i.get(E[we]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ze,0)}n.blitFramebuffer(0,0,X,ee,0,0,X,ee,re,n.NEAREST),l===!0&&(ie.length=0,L.length=0,ie.push(n.COLOR_ATTACHMENT0+we),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ie.push(te),L.push(te),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,L)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ie))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ge)for(let we=0;we<E.length;we++){t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,Le.__webglColorRenderbuffer[we]);const Ze=i.get(E[we]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,Ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const E=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function de(b){return Math.min(r.maxSamples,b.samples)}function le(b){const E=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function pe(b){const E=o.render.frame;u.get(b)!==E&&(u.set(b,E),b.update())}function De(b,E){const X=b.colorSpace,ee=b.format,re=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||X!==br&&X!==cr&&(at.getTransfer(X)===gt?(ee!==ii||re!==qi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),E}function Se(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=M,this.setTexture2D=F,this.setTexture2DArray=O,this.setTexture3D=D,this.setTextureCube=$,this.rebindTextures=Oe,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=qe,this.updateMultisampleRenderTarget=fe,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=le}function qR(n,e){function t(i,r=cr){let s;const o=at.getTransfer(r);if(i===qi)return n.UNSIGNED_BYTE;if(i===up)return n.UNSIGNED_SHORT_4_4_4_4;if(i===hp)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Q_)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Z_)return n.BYTE;if(i===J_)return n.SHORT;if(i===Aa)return n.UNSIGNED_SHORT;if(i===cp)return n.INT;if(i===ss)return n.UNSIGNED_INT;if(i===ki)return n.FLOAT;if(i===Fa)return n.HALF_FLOAT;if(i===ex)return n.ALPHA;if(i===tx)return n.RGB;if(i===ii)return n.RGBA;if(i===nx)return n.LUMINANCE;if(i===ix)return n.LUMINANCE_ALPHA;if(i===Qs)return n.DEPTH_COMPONENT;if(i===po)return n.DEPTH_STENCIL;if(i===rx)return n.RED;if(i===dp)return n.RED_INTEGER;if(i===sx)return n.RG;if(i===fp)return n.RG_INTEGER;if(i===pp)return n.RGBA_INTEGER;if(i===Jl||i===Ql||i===ec||i===tc)if(o===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Jl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ql)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ec)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===tc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Jl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ql)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ec)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===tc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pd||i===Ld||i===Nd||i===Id)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Pd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ld)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Nd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Id)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Dd||i===Ud||i===Fd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Dd||i===Ud)return o===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Fd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Od||i===zd||i===kd||i===Bd||i===Hd||i===Vd||i===Gd||i===Wd||i===Xd||i===jd||i===qd||i===Yd||i===$d||i===Kd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Od)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===zd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===kd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Hd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Vd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Gd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Wd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Xd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===jd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===qd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Yd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===$d)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Kd)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===nc||i===Zd||i===Jd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===nc)return o===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Zd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ox||i===Qd||i===ef||i===tf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===nc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Qd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ef)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===tf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class YR extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ws extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $R={type:"move"};class xh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ws,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ws,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ws,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($R)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ws;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const KR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ZR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class JR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new _n,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Tr({vertexShader:KR,fragmentShader:ZR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new et(new tu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class QR extends xo{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,g=null;const _=new JR,m=t.getContextAttributes();let f=null,v=null;const x=[],S=[],R=new _e;let A=null;const w=new wn;w.layers.enable(1),w.viewport=new ut;const P=new wn;P.layers.enable(2),P.viewport=new ut;const W=[w,P],y=new YR;y.layers.enable(1),y.layers.enable(2);let M=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let oe=x[K];return oe===void 0&&(oe=new xh,x[K]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(K){let oe=x[K];return oe===void 0&&(oe=new xh,x[K]=oe),oe.getGripSpace()},this.getHand=function(K){let oe=x[K];return oe===void 0&&(oe=new xh,x[K]=oe),oe.getHandSpace()};function N(K){const oe=S.indexOf(K.inputSource);if(oe===-1)return;const me=x[oe];me!==void 0&&(me.update(K.inputSource,K.frame,c||o),me.dispatchEvent({type:K.type,data:K.inputSource}))}function F(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",F),r.removeEventListener("inputsourceschange",O);for(let K=0;K<x.length;K++){const oe=S[K];oe!==null&&(S[K]=null,x[K].disconnect(oe))}M=null,B=null,_.reset(),e.setRenderTarget(f),p=null,h=null,d=null,r=null,v=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",F),r.addEventListener("inputsourceschange",O),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const oe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,oe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new os(p.framebufferWidth,p.framebufferHeight,{format:ii,type:qi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let oe=null,me=null,he=null;m.depth&&(he=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=m.stencil?po:Qs,me=m.stencil?fo:ss);const ze={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(ze),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new os(h.textureWidth,h.textureHeight,{format:ii,type:qi,depthTexture:new Sx(h.textureWidth,h.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Fe.setContext(r),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function O(K){for(let oe=0;oe<K.removed.length;oe++){const me=K.removed[oe],he=S.indexOf(me);he>=0&&(S[he]=null,x[he].disconnect(me))}for(let oe=0;oe<K.added.length;oe++){const me=K.added[oe];let he=S.indexOf(me);if(he===-1){for(let Oe=0;Oe<x.length;Oe++)if(Oe>=S.length){S.push(me),he=Oe;break}else if(S[Oe]===null){S[Oe]=me,he=Oe;break}if(he===-1)break}const ze=x[he];ze&&ze.connect(me)}}const D=new z,$=new z;function I(K,oe,me){D.setFromMatrixPosition(oe.matrixWorld),$.setFromMatrixPosition(me.matrixWorld);const he=D.distanceTo($),ze=oe.projectionMatrix.elements,Oe=me.projectionMatrix.elements,Ge=ze[14]/(ze[10]-1),qe=ze[14]/(ze[10]+1),ie=(ze[9]+1)/ze[5],L=(ze[9]-1)/ze[5],fe=(ze[8]-1)/ze[0],de=(Oe[8]+1)/Oe[0],le=Ge*fe,pe=Ge*de,De=he/(-fe+de),Se=De*-fe;if(oe.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Se),K.translateZ(De),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ze[10]===-1)K.projectionMatrix.copy(oe.projectionMatrix),K.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const b=Ge+De,E=qe+De,X=le-Se,ee=pe+(he-Se),re=ie*qe/E*b,te=L*qe/E*b;K.projectionMatrix.makePerspective(X,ee,re,te,b,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function U(K,oe){oe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(oe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let oe=K.near,me=K.far;_.texture!==null&&(_.depthNear>0&&(oe=_.depthNear),_.depthFar>0&&(me=_.depthFar)),y.near=P.near=w.near=oe,y.far=P.far=w.far=me,(M!==y.near||B!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),M=y.near,B=y.far);const he=K.parent,ze=y.cameras;U(y,he);for(let Oe=0;Oe<ze.length;Oe++)U(ze[Oe],he);ze.length===2?I(y,w,P):y.projectionMatrix.copy(w.projectionMatrix),j(K,y,he)};function j(K,oe,me){me===null?K.matrix.copy(oe.matrixWorld):(K.matrix.copy(me.matrixWorld),K.matrix.invert(),K.matrix.multiply(oe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(oe.projectionMatrix),K.projectionMatrixInverse.copy(oe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=nf*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let Q=null;function ne(K,oe){if(u=oe.getViewerPose(c||o),g=oe,u!==null){const me=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let he=!1;me.length!==y.cameras.length&&(y.cameras.length=0,he=!0);for(let Oe=0;Oe<me.length;Oe++){const Ge=me[Oe];let qe=null;if(p!==null)qe=p.getViewport(Ge);else{const L=d.getViewSubImage(h,Ge);qe=L.viewport,Oe===0&&(e.setRenderTargetTextures(v,L.colorTexture,h.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(v))}let ie=W[Oe];ie===void 0&&(ie=new wn,ie.layers.enable(Oe),ie.viewport=new ut,W[Oe]=ie),ie.matrix.fromArray(Ge.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(Ge.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(qe.x,qe.y,qe.width,qe.height),Oe===0&&(y.matrix.copy(ie.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),he===!0&&y.cameras.push(ie)}const ze=r.enabledFeatures;if(ze&&ze.includes("depth-sensing")){const Oe=d.getDepthInformation(me[0]);Oe&&Oe.isValid&&Oe.texture&&_.init(e,Oe,r.renderState)}}for(let me=0;me<x.length;me++){const he=S[me],ze=x[me];he!==null&&ze!==void 0&&ze.update(he,oe,c||o)}Q&&Q(K,oe),oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:oe}),g=null}const Fe=new xx;Fe.setAnimationLoop(ne),this.setAnimationLoop=function(K){Q=K},this.dispose=function(){}}}const Or=new yi,eb=new yt;function tb(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,gx(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,v,x,S){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,v,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===on&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===on&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=e.get(f),x=v.envMap,S=v.envMapRotation;x&&(m.envMap.value=x,Or.copy(S),Or.x*=-1,Or.y*=-1,Or.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Or.y*=-1,Or.z*=-1),m.envMapRotation.value.setFromMatrix4(eb.makeRotationFromEuler(Or)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=x*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===on&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function nb(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const S=x.program;i.uniformBlockBinding(v,S)}function c(v,x){let S=r[v.id];S===void 0&&(g(v),S=u(v),r[v.id]=S,v.addEventListener("dispose",m));const R=x.program;i.updateUBOMapping(v,R);const A=e.render.frame;s[v.id]!==A&&(h(v),s[v.id]=A)}function u(v){const x=d();v.__bindingPointIndex=x;const S=n.createBuffer(),R=v.__size,A=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,R,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,S),S}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const x=r[v.id],S=v.uniforms,R=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let A=0,w=S.length;A<w;A++){const P=Array.isArray(S[A])?S[A]:[S[A]];for(let W=0,y=P.length;W<y;W++){const M=P[W];if(p(M,A,W,R)===!0){const B=M.__offset,N=Array.isArray(M.value)?M.value:[M.value];let F=0;for(let O=0;O<N.length;O++){const D=N[O],$=_(D);typeof D=="number"||typeof D=="boolean"?(M.__data[0]=D,n.bufferSubData(n.UNIFORM_BUFFER,B+F,M.__data)):D.isMatrix3?(M.__data[0]=D.elements[0],M.__data[1]=D.elements[1],M.__data[2]=D.elements[2],M.__data[3]=0,M.__data[4]=D.elements[3],M.__data[5]=D.elements[4],M.__data[6]=D.elements[5],M.__data[7]=0,M.__data[8]=D.elements[6],M.__data[9]=D.elements[7],M.__data[10]=D.elements[8],M.__data[11]=0):(D.toArray(M.__data,F),F+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,M.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,x,S,R){const A=v.value,w=x+"_"+S;if(R[w]===void 0)return typeof A=="number"||typeof A=="boolean"?R[w]=A:R[w]=A.clone(),!0;{const P=R[w];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return R[w]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function g(v){const x=v.uniforms;let S=0;const R=16;for(let w=0,P=x.length;w<P;w++){const W=Array.isArray(x[w])?x[w]:[x[w]];for(let y=0,M=W.length;y<M;y++){const B=W[y],N=Array.isArray(B.value)?B.value:[B.value];for(let F=0,O=N.length;F<O;F++){const D=N[F],$=_(D),I=S%R,U=I%$.boundary,j=I+U;S+=U,j!==0&&R-j<$.storage&&(S+=R-j),B.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=$.storage}}}const A=S%R;return A>0&&(S+=R-A),v.__size=S,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const S=o.indexOf(x.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function f(){for(const v in r)n.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class ib{constructor(e={}){const{canvas:t=G1(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const f=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Dn,this.toneMapping=Sr,this.toneMappingExposure=1;const x=this;let S=!1,R=0,A=0,w=null,P=-1,W=null;const y=new ut,M=new ut;let B=null;const N=new nt(0);let F=0,O=t.width,D=t.height,$=1,I=null,U=null;const j=new ut(0,0,O,D),Q=new ut(0,0,O,D);let ne=!1;const Fe=new vp;let K=!1,oe=!1;const me=new yt,he=new yt,ze=new z,Oe=new ut,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qe=!1;function ie(){return w===null?$:1}let L=i;function fe(C,H){return t.getContext(C,H)}try{const C={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${lp}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",Ee,!1),L===null){const H="webgl2";if(L=fe(H,C),L===null)throw fe(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let de,le,pe,De,Se,b,E,X,ee,re,te,Le,ge,we,Ze,ce,Te,He,Ve,Ce,Je,We,ht,k;function Me(){de=new l2(L),de.init(),We=new qR(L,de),le=new n2(L,de,e,We),pe=new WR(L),le.reverseDepthBuffer&&pe.buffers.depth.setReversed(!0),De=new h2(L),Se=new bR,b=new jR(L,de,pe,Se,le,We,De),E=new r2(x),X=new a2(x),ee=new _T(L),ht=new e2(L,ee),re=new c2(L,ee,De,ht),te=new f2(L,re,ee,De),Ve=new d2(L,le,b),ce=new i2(Se),Le=new RR(x,E,X,de,le,ht,ce),ge=new tb(x,Se),we=new LR,Ze=new OR(de),He=new QC(x,E,X,pe,te,h,l),Te=new VR(x,te,le),k=new nb(L,De,le,pe),Ce=new t2(L,de,De),Je=new u2(L,de,De),De.programs=Le.programs,x.capabilities=le,x.extensions=de,x.properties=Se,x.renderLists=we,x.shadowMap=Te,x.state=pe,x.info=De}Me();const J=new QR(x,L);this.xr=J,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const C=de.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=de.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(C){C!==void 0&&($=C,this.setSize(O,D,!1))},this.getSize=function(C){return C.set(O,D)},this.setSize=function(C,H,q=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=C,D=H,t.width=Math.floor(C*$),t.height=Math.floor(H*$),q===!0&&(t.style.width=C+"px",t.style.height=H+"px"),this.setViewport(0,0,C,H)},this.getDrawingBufferSize=function(C){return C.set(O*$,D*$).floor()},this.setDrawingBufferSize=function(C,H,q){O=C,D=H,$=q,t.width=Math.floor(C*q),t.height=Math.floor(H*q),this.setViewport(0,0,C,H)},this.getCurrentViewport=function(C){return C.copy(y)},this.getViewport=function(C){return C.copy(j)},this.setViewport=function(C,H,q,Y){C.isVector4?j.set(C.x,C.y,C.z,C.w):j.set(C,H,q,Y),pe.viewport(y.copy(j).multiplyScalar($).round())},this.getScissor=function(C){return C.copy(Q)},this.setScissor=function(C,H,q,Y){C.isVector4?Q.set(C.x,C.y,C.z,C.w):Q.set(C,H,q,Y),pe.scissor(M.copy(Q).multiplyScalar($).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(C){pe.setScissorTest(ne=C)},this.setOpaqueSort=function(C){I=C},this.setTransparentSort=function(C){U=C},this.getClearColor=function(C){return C.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor.apply(He,arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha.apply(He,arguments)},this.clear=function(C=!0,H=!0,q=!0){let Y=0;if(C){let V=!1;if(w!==null){const ue=w.texture.format;V=ue===pp||ue===fp||ue===dp}if(V){const ue=w.texture.type,ye=ue===qi||ue===ss||ue===Aa||ue===fo||ue===up||ue===hp,be=He.getClearColor(),Ne=He.getClearAlpha(),ke=be.r,Be=be.g,Ie=be.b;ye?(p[0]=ke,p[1]=Be,p[2]=Ie,p[3]=Ne,L.clearBufferuiv(L.COLOR,0,p)):(g[0]=ke,g[1]=Be,g[2]=Ie,g[3]=Ne,L.clearBufferiv(L.COLOR,0,g))}else Y|=L.COLOR_BUFFER_BIT}H&&(Y|=L.DEPTH_BUFFER_BIT,L.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),q&&(Y|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),we.dispose(),Ze.dispose(),Se.dispose(),E.dispose(),X.dispose(),te.dispose(),ht.dispose(),k.dispose(),Le.dispose(),J.dispose(),J.removeEventListener("sessionstart",Cp),J.removeEventListener("sessionend",Rp),Pr.stop()};function se(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const C=De.autoReset,H=Te.enabled,q=Te.autoUpdate,Y=Te.needsUpdate,V=Te.type;Me(),De.autoReset=C,Te.enabled=H,Te.autoUpdate=q,Te.needsUpdate=Y,Te.type=V}function Ee(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Qe(C){const H=C.target;H.removeEventListener("dispose",Qe),Lt(H)}function Lt(C){cn(C),Se.remove(C)}function cn(C){const H=Se.get(C).programs;H!==void 0&&(H.forEach(function(q){Le.releaseProgram(q)}),C.isShaderMaterial&&Le.releaseShaderCache(C))}this.renderBufferDirect=function(C,H,q,Y,V,ue){H===null&&(H=Ge);const ye=V.isMesh&&V.matrixWorld.determinant()<0,be=Fx(C,H,q,Y,V);pe.setMaterial(Y,ye);let Ne=q.index,ke=1;if(Y.wireframe===!0){if(Ne=re.getWireframeAttribute(q),Ne===void 0)return;ke=2}const Be=q.drawRange,Ie=q.attributes.position;let lt=Be.start*ke,ft=(Be.start+Be.count)*ke;ue!==null&&(lt=Math.max(lt,ue.start*ke),ft=Math.min(ft,(ue.start+ue.count)*ke)),Ne!==null?(lt=Math.max(lt,0),ft=Math.min(ft,Ne.count)):Ie!=null&&(lt=Math.max(lt,0),ft=Math.min(ft,Ie.count));const Tt=ft-lt;if(Tt<0||Tt===1/0)return;ht.setup(V,Y,be,q,Ne);let xn,st=Ce;if(Ne!==null&&(xn=ee.get(Ne),st=Je,st.setIndex(xn)),V.isMesh)Y.wireframe===!0?(pe.setLineWidth(Y.wireframeLinewidth*ie()),st.setMode(L.LINES)):st.setMode(L.TRIANGLES);else if(V.isLine){let Ue=Y.linewidth;Ue===void 0&&(Ue=1),pe.setLineWidth(Ue*ie()),V.isLineSegments?st.setMode(L.LINES):V.isLineLoop?st.setMode(L.LINE_LOOP):st.setMode(L.LINE_STRIP)}else V.isPoints?st.setMode(L.POINTS):V.isSprite&&st.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)st.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(de.get("WEBGL_multi_draw"))st.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Ue=V._multiDrawStarts,Vt=V._multiDrawCounts,ot=V._multiDrawCount,Gn=Ne?ee.get(Ne).bytesPerElement:1,us=Se.get(Y).currentProgram.getUniforms();for(let yn=0;yn<ot;yn++)us.setValue(L,"_gl_DrawID",yn),st.render(Ue[yn]/Gn,Vt[yn])}else if(V.isInstancedMesh)st.renderInstances(lt,Tt,V.count);else if(q.isInstancedBufferGeometry){const Ue=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Vt=Math.min(q.instanceCount,Ue);st.renderInstances(lt,Tt,Vt)}else st.render(lt,Tt)};function it(C,H,q){C.transparent===!0&&C.side===Fi&&C.forceSinglePass===!1?(C.side=on,C.needsUpdate=!0,Ha(C,H,q),C.side=wr,C.needsUpdate=!0,Ha(C,H,q),C.side=Fi):Ha(C,H,q)}this.compile=function(C,H,q=null){q===null&&(q=C),m=Ze.get(q),m.init(H),v.push(m),q.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),C!==q&&C.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),m.setupLights();const Y=new Set;return C.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ue=V.material;if(ue)if(Array.isArray(ue))for(let ye=0;ye<ue.length;ye++){const be=ue[ye];it(be,q,V),Y.add(be)}else it(ue,q,V),Y.add(ue)}),v.pop(),m=null,Y},this.compileAsync=function(C,H,q=null){const Y=this.compile(C,H,q);return new Promise(V=>{function ue(){if(Y.forEach(function(ye){Se.get(ye).currentProgram.isReady()&&Y.delete(ye)}),Y.size===0){V(C);return}setTimeout(ue,10)}de.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let un=null;function Mi(C){un&&un(C)}function Cp(){Pr.stop()}function Rp(){Pr.start()}const Pr=new xx;Pr.setAnimationLoop(Mi),typeof self<"u"&&Pr.setContext(self),this.setAnimationLoop=function(C){un=C,J.setAnimationLoop(C),C===null?Pr.stop():Pr.start()},J.addEventListener("sessionstart",Cp),J.addEventListener("sessionend",Rp),this.render=function(C,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(H),H=J.getCamera()),C.isScene===!0&&C.onBeforeRender(x,C,H,w),m=Ze.get(C,v.length),m.init(H),v.push(m),he.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Fe.setFromProjectionMatrix(he),oe=this.localClippingEnabled,K=ce.init(this.clippingPlanes,oe),_=we.get(C,f.length),_.init(),f.push(_),J.enabled===!0&&J.isPresenting===!0){const ue=x.xr.getDepthSensingMesh();ue!==null&&ru(ue,H,-1/0,x.sortObjects)}ru(C,H,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(I,U),qe=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,qe&&He.addToRenderList(_,C),this.info.render.frame++,K===!0&&ce.beginShadows();const q=m.state.shadowsArray;Te.render(q,C,H),K===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=_.opaque,V=_.transmissive;if(m.setupLights(),H.isArrayCamera){const ue=H.cameras;if(V.length>0)for(let ye=0,be=ue.length;ye<be;ye++){const Ne=ue[ye];Pp(Y,V,C,Ne)}qe&&He.render(C);for(let ye=0,be=ue.length;ye<be;ye++){const Ne=ue[ye];bp(_,C,Ne,Ne.viewport)}}else V.length>0&&Pp(Y,V,C,H),qe&&He.render(C),bp(_,C,H);w!==null&&(b.updateMultisampleRenderTarget(w),b.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(x,C,H),ht.resetDefaultState(),P=-1,W=null,v.pop(),v.length>0?(m=v[v.length-1],K===!0&&ce.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function ru(C,H,q,Y){if(C.visible===!1)return;if(C.layers.test(H.layers)){if(C.isGroup)q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(H);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Fe.intersectsSprite(C)){Y&&Oe.setFromMatrixPosition(C.matrixWorld).applyMatrix4(he);const ye=te.update(C),be=C.material;be.visible&&_.push(C,ye,be,q,Oe.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Fe.intersectsObject(C))){const ye=te.update(C),be=C.material;if(Y&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Oe.copy(C.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Oe.copy(ye.boundingSphere.center)),Oe.applyMatrix4(C.matrixWorld).applyMatrix4(he)),Array.isArray(be)){const Ne=ye.groups;for(let ke=0,Be=Ne.length;ke<Be;ke++){const Ie=Ne[ke],lt=be[Ie.materialIndex];lt&&lt.visible&&_.push(C,ye,lt,q,Oe.z,Ie)}}else be.visible&&_.push(C,ye,be,q,Oe.z,null)}}const ue=C.children;for(let ye=0,be=ue.length;ye<be;ye++)ru(ue[ye],H,q,Y)}function bp(C,H,q,Y){const V=C.opaque,ue=C.transmissive,ye=C.transparent;m.setupLightsView(q),K===!0&&ce.setGlobalState(x.clippingPlanes,q),Y&&pe.viewport(y.copy(Y)),V.length>0&&Ba(V,H,q),ue.length>0&&Ba(ue,H,q),ye.length>0&&Ba(ye,H,q),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Pp(C,H,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Y.id]===void 0&&(m.state.transmissionRenderTarget[Y.id]=new os(1,1,{generateMipmaps:!0,type:de.has("EXT_color_buffer_half_float")||de.has("EXT_color_buffer_float")?Fa:qi,minFilter:Zr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const ue=m.state.transmissionRenderTarget[Y.id],ye=Y.viewport||y;ue.setSize(ye.z,ye.w);const be=x.getRenderTarget();x.setRenderTarget(ue),x.getClearColor(N),F=x.getClearAlpha(),F<1&&x.setClearColor(16777215,.5),x.clear(),qe&&He.render(q);const Ne=x.toneMapping;x.toneMapping=Sr;const ke=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),m.setupLightsView(Y),K===!0&&ce.setGlobalState(x.clippingPlanes,Y),Ba(C,q,Y),b.updateMultisampleRenderTarget(ue),b.updateRenderTargetMipmap(ue),de.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let Ie=0,lt=H.length;Ie<lt;Ie++){const ft=H[Ie],Tt=ft.object,xn=ft.geometry,st=ft.material,Ue=ft.group;if(st.side===Fi&&Tt.layers.test(Y.layers)){const Vt=st.side;st.side=on,st.needsUpdate=!0,Lp(Tt,q,Y,xn,st,Ue),st.side=Vt,st.needsUpdate=!0,Be=!0}}Be===!0&&(b.updateMultisampleRenderTarget(ue),b.updateRenderTargetMipmap(ue))}x.setRenderTarget(be),x.setClearColor(N,F),ke!==void 0&&(Y.viewport=ke),x.toneMapping=Ne}function Ba(C,H,q){const Y=H.isScene===!0?H.overrideMaterial:null;for(let V=0,ue=C.length;V<ue;V++){const ye=C[V],be=ye.object,Ne=ye.geometry,ke=Y===null?ye.material:Y,Be=ye.group;be.layers.test(q.layers)&&Lp(be,H,q,Ne,ke,Be)}}function Lp(C,H,q,Y,V,ue){C.onBeforeRender(x,H,q,Y,V,ue),C.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),V.onBeforeRender(x,H,q,Y,C,ue),V.transparent===!0&&V.side===Fi&&V.forceSinglePass===!1?(V.side=on,V.needsUpdate=!0,x.renderBufferDirect(q,H,Y,V,C,ue),V.side=wr,V.needsUpdate=!0,x.renderBufferDirect(q,H,Y,V,C,ue),V.side=Fi):x.renderBufferDirect(q,H,Y,V,C,ue),C.onAfterRender(x,H,q,Y,V,ue)}function Ha(C,H,q){H.isScene!==!0&&(H=Ge);const Y=Se.get(C),V=m.state.lights,ue=m.state.shadowsArray,ye=V.state.version,be=Le.getParameters(C,V.state,ue,H,q),Ne=Le.getProgramCacheKey(be);let ke=Y.programs;Y.environment=C.isMeshStandardMaterial?H.environment:null,Y.fog=H.fog,Y.envMap=(C.isMeshStandardMaterial?X:E).get(C.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&C.envMap===null?H.environmentRotation:C.envMapRotation,ke===void 0&&(C.addEventListener("dispose",Qe),ke=new Map,Y.programs=ke);let Be=ke.get(Ne);if(Be!==void 0){if(Y.currentProgram===Be&&Y.lightsStateVersion===ye)return Ip(C,be),Be}else be.uniforms=Le.getUniforms(C),C.onBeforeCompile(be,x),Be=Le.acquireProgram(be,Ne),ke.set(Ne,Be),Y.uniforms=be.uniforms;const Ie=Y.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ie.clippingPlanes=ce.uniform),Ip(C,be),Y.needsLights=zx(C),Y.lightsStateVersion=ye,Y.needsLights&&(Ie.ambientLightColor.value=V.state.ambient,Ie.lightProbe.value=V.state.probe,Ie.directionalLights.value=V.state.directional,Ie.directionalLightShadows.value=V.state.directionalShadow,Ie.spotLights.value=V.state.spot,Ie.spotLightShadows.value=V.state.spotShadow,Ie.rectAreaLights.value=V.state.rectArea,Ie.ltc_1.value=V.state.rectAreaLTC1,Ie.ltc_2.value=V.state.rectAreaLTC2,Ie.pointLights.value=V.state.point,Ie.pointLightShadows.value=V.state.pointShadow,Ie.hemisphereLights.value=V.state.hemi,Ie.directionalShadowMap.value=V.state.directionalShadowMap,Ie.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ie.spotShadowMap.value=V.state.spotShadowMap,Ie.spotLightMatrix.value=V.state.spotLightMatrix,Ie.spotLightMap.value=V.state.spotLightMap,Ie.pointShadowMap.value=V.state.pointShadowMap,Ie.pointShadowMatrix.value=V.state.pointShadowMatrix),Y.currentProgram=Be,Y.uniformsList=null,Be}function Np(C){if(C.uniformsList===null){const H=C.currentProgram.getUniforms();C.uniformsList=rc.seqWithValue(H.seq,C.uniforms)}return C.uniformsList}function Ip(C,H){const q=Se.get(C);q.outputColorSpace=H.outputColorSpace,q.batching=H.batching,q.batchingColor=H.batchingColor,q.instancing=H.instancing,q.instancingColor=H.instancingColor,q.instancingMorph=H.instancingMorph,q.skinning=H.skinning,q.morphTargets=H.morphTargets,q.morphNormals=H.morphNormals,q.morphColors=H.morphColors,q.morphTargetsCount=H.morphTargetsCount,q.numClippingPlanes=H.numClippingPlanes,q.numIntersection=H.numClipIntersection,q.vertexAlphas=H.vertexAlphas,q.vertexTangents=H.vertexTangents,q.toneMapping=H.toneMapping}function Fx(C,H,q,Y,V){H.isScene!==!0&&(H=Ge),b.resetTextureUnits();const ue=H.fog,ye=Y.isMeshStandardMaterial?H.environment:null,be=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:br,Ne=(Y.isMeshStandardMaterial?X:E).get(Y.envMap||ye),ke=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Be=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ie=!!q.morphAttributes.position,lt=!!q.morphAttributes.normal,ft=!!q.morphAttributes.color;let Tt=Sr;Y.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Tt=x.toneMapping);const xn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,st=xn!==void 0?xn.length:0,Ue=Se.get(Y),Vt=m.state.lights;if(K===!0&&(oe===!0||C!==W)){const Nn=C===W&&Y.id===P;ce.setState(Y,C,Nn)}let ot=!1;Y.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==Vt.state.version||Ue.outputColorSpace!==be||V.isBatchedMesh&&Ue.batching===!1||!V.isBatchedMesh&&Ue.batching===!0||V.isBatchedMesh&&Ue.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Ue.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Ue.instancing===!1||!V.isInstancedMesh&&Ue.instancing===!0||V.isSkinnedMesh&&Ue.skinning===!1||!V.isSkinnedMesh&&Ue.skinning===!0||V.isInstancedMesh&&Ue.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ue.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ue.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ue.instancingMorph===!1&&V.morphTexture!==null||Ue.envMap!==Ne||Y.fog===!0&&Ue.fog!==ue||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ce.numPlanes||Ue.numIntersection!==ce.numIntersection)||Ue.vertexAlphas!==ke||Ue.vertexTangents!==Be||Ue.morphTargets!==Ie||Ue.morphNormals!==lt||Ue.morphColors!==ft||Ue.toneMapping!==Tt||Ue.morphTargetsCount!==st)&&(ot=!0):(ot=!0,Ue.__version=Y.version);let Gn=Ue.currentProgram;ot===!0&&(Gn=Ha(Y,H,V));let us=!1,yn=!1,su=!1;const Ct=Gn.getUniforms(),$i=Ue.uniforms;if(pe.useProgram(Gn.program)&&(us=!0,yn=!0,su=!0),Y.id!==P&&(P=Y.id,yn=!0),us||W!==C){le.reverseDepthBuffer?(me.copy(C.projectionMatrix),X1(me),j1(me),Ct.setValue(L,"projectionMatrix",me)):Ct.setValue(L,"projectionMatrix",C.projectionMatrix),Ct.setValue(L,"viewMatrix",C.matrixWorldInverse);const Nn=Ct.map.cameraPosition;Nn!==void 0&&Nn.setValue(L,ze.setFromMatrixPosition(C.matrixWorld)),le.logarithmicDepthBuffer&&Ct.setValue(L,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ct.setValue(L,"isOrthographic",C.isOrthographicCamera===!0),W!==C&&(W=C,yn=!0,su=!0)}if(V.isSkinnedMesh){Ct.setOptional(L,V,"bindMatrix"),Ct.setOptional(L,V,"bindMatrixInverse");const Nn=V.skeleton;Nn&&(Nn.boneTexture===null&&Nn.computeBoneTexture(),Ct.setValue(L,"boneTexture",Nn.boneTexture,b))}V.isBatchedMesh&&(Ct.setOptional(L,V,"batchingTexture"),Ct.setValue(L,"batchingTexture",V._matricesTexture,b),Ct.setOptional(L,V,"batchingIdTexture"),Ct.setValue(L,"batchingIdTexture",V._indirectTexture,b),Ct.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&Ct.setValue(L,"batchingColorTexture",V._colorsTexture,b));const ou=q.morphAttributes;if((ou.position!==void 0||ou.normal!==void 0||ou.color!==void 0)&&Ve.update(V,q,Gn),(yn||Ue.receiveShadow!==V.receiveShadow)&&(Ue.receiveShadow=V.receiveShadow,Ct.setValue(L,"receiveShadow",V.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&($i.envMap.value=Ne,$i.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&H.environment!==null&&($i.envMapIntensity.value=H.environmentIntensity),yn&&(Ct.setValue(L,"toneMappingExposure",x.toneMappingExposure),Ue.needsLights&&Ox($i,su),ue&&Y.fog===!0&&ge.refreshFogUniforms($i,ue),ge.refreshMaterialUniforms($i,Y,$,D,m.state.transmissionRenderTarget[C.id]),rc.upload(L,Np(Ue),$i,b)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(rc.upload(L,Np(Ue),$i,b),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ct.setValue(L,"center",V.center),Ct.setValue(L,"modelViewMatrix",V.modelViewMatrix),Ct.setValue(L,"normalMatrix",V.normalMatrix),Ct.setValue(L,"modelMatrix",V.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Nn=Y.uniformsGroups;for(let au=0,kx=Nn.length;au<kx;au++){const Dp=Nn[au];k.update(Dp,Gn),k.bind(Dp,Gn)}}return Gn}function Ox(C,H){C.ambientLightColor.needsUpdate=H,C.lightProbe.needsUpdate=H,C.directionalLights.needsUpdate=H,C.directionalLightShadows.needsUpdate=H,C.pointLights.needsUpdate=H,C.pointLightShadows.needsUpdate=H,C.spotLights.needsUpdate=H,C.spotLightShadows.needsUpdate=H,C.rectAreaLights.needsUpdate=H,C.hemisphereLights.needsUpdate=H}function zx(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,H,q){Se.get(C.texture).__webglTexture=H,Se.get(C.depthTexture).__webglTexture=q;const Y=Se.get(C);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||de.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,H){const q=Se.get(C);q.__webglFramebuffer=H,q.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(C,H=0,q=0){w=C,R=H,A=q;let Y=!0,V=null,ue=!1,ye=!1;if(C){const Ne=Se.get(C);if(Ne.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(L.FRAMEBUFFER,null),Y=!1;else if(Ne.__webglFramebuffer===void 0)b.setupRenderTarget(C);else if(Ne.__hasExternalTextures)b.rebindTextures(C,Se.get(C.texture).__webglTexture,Se.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ie=C.depthTexture;if(Ne.__boundDepthTexture!==Ie){if(Ie!==null&&Se.has(Ie)&&(C.width!==Ie.image.width||C.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(C)}}const ke=C.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(ye=!0);const Be=Se.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Be[H])?V=Be[H][q]:V=Be[H],ue=!0):C.samples>0&&b.useMultisampledRTT(C)===!1?V=Se.get(C).__webglMultisampledFramebuffer:Array.isArray(Be)?V=Be[q]:V=Be,y.copy(C.viewport),M.copy(C.scissor),B=C.scissorTest}else y.copy(j).multiplyScalar($).floor(),M.copy(Q).multiplyScalar($).floor(),B=ne;if(pe.bindFramebuffer(L.FRAMEBUFFER,V)&&Y&&pe.drawBuffers(C,V),pe.viewport(y),pe.scissor(M),pe.setScissorTest(B),ue){const Ne=Se.get(C.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ne.__webglTexture,q)}else if(ye){const Ne=Se.get(C.texture),ke=H||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ne.__webglTexture,q||0,ke)}P=-1},this.readRenderTargetPixels=function(C,H,q,Y,V,ue,ye){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Se.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ye!==void 0&&(be=be[ye]),be){pe.bindFramebuffer(L.FRAMEBUFFER,be);try{const Ne=C.texture,ke=Ne.format,Be=Ne.type;if(!le.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!le.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=C.width-Y&&q>=0&&q<=C.height-V&&L.readPixels(H,q,Y,V,We.convert(ke),We.convert(Be),ue)}finally{const Ne=w!==null?Se.get(w).__webglFramebuffer:null;pe.bindFramebuffer(L.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(C,H,q,Y,V,ue,ye){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Se.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ye!==void 0&&(be=be[ye]),be){const Ne=C.texture,ke=Ne.format,Be=Ne.type;if(!le.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!le.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=C.width-Y&&q>=0&&q<=C.height-V){pe.bindFramebuffer(L.FRAMEBUFFER,be);const Ie=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ie),L.bufferData(L.PIXEL_PACK_BUFFER,ue.byteLength,L.STREAM_READ),L.readPixels(H,q,Y,V,We.convert(ke),We.convert(Be),0);const lt=w!==null?Se.get(w).__webglFramebuffer:null;pe.bindFramebuffer(L.FRAMEBUFFER,lt);const ft=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await W1(L,ft,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ie),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ue),L.deleteBuffer(Ie),L.deleteSync(ft),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,H=null,q=0){C.isTexture!==!0&&(ic("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,C=arguments[1]);const Y=Math.pow(2,-q),V=Math.floor(C.image.width*Y),ue=Math.floor(C.image.height*Y),ye=H!==null?H.x:0,be=H!==null?H.y:0;b.setTexture2D(C,0),L.copyTexSubImage2D(L.TEXTURE_2D,q,0,0,ye,be,V,ue),pe.unbindTexture()},this.copyTextureToTexture=function(C,H,q=null,Y=null,V=0){C.isTexture!==!0&&(ic("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,C=arguments[1],H=arguments[2],V=arguments[3]||0,q=null);let ue,ye,be,Ne,ke,Be;q!==null?(ue=q.max.x-q.min.x,ye=q.max.y-q.min.y,be=q.min.x,Ne=q.min.y):(ue=C.image.width,ye=C.image.height,be=0,Ne=0),Y!==null?(ke=Y.x,Be=Y.y):(ke=0,Be=0);const Ie=We.convert(H.format),lt=We.convert(H.type);b.setTexture2D(H,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,H.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,H.unpackAlignment);const ft=L.getParameter(L.UNPACK_ROW_LENGTH),Tt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),xn=L.getParameter(L.UNPACK_SKIP_PIXELS),st=L.getParameter(L.UNPACK_SKIP_ROWS),Ue=L.getParameter(L.UNPACK_SKIP_IMAGES),Vt=C.isCompressedTexture?C.mipmaps[V]:C.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,Vt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Vt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,be),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ne),C.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,V,ke,Be,ue,ye,Ie,lt,Vt.data):C.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,V,ke,Be,Vt.width,Vt.height,Ie,Vt.data):L.texSubImage2D(L.TEXTURE_2D,V,ke,Be,ue,ye,Ie,lt,Vt),L.pixelStorei(L.UNPACK_ROW_LENGTH,ft),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Tt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,xn),L.pixelStorei(L.UNPACK_SKIP_ROWS,st),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ue),V===0&&H.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(C,H,q=null,Y=null,V=0){C.isTexture!==!0&&(ic("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,Y=arguments[1]||null,C=arguments[2],H=arguments[3],V=arguments[4]||0);let ue,ye,be,Ne,ke,Be,Ie,lt,ft;const Tt=C.isCompressedTexture?C.mipmaps[V]:C.image;q!==null?(ue=q.max.x-q.min.x,ye=q.max.y-q.min.y,be=q.max.z-q.min.z,Ne=q.min.x,ke=q.min.y,Be=q.min.z):(ue=Tt.width,ye=Tt.height,be=Tt.depth,Ne=0,ke=0,Be=0),Y!==null?(Ie=Y.x,lt=Y.y,ft=Y.z):(Ie=0,lt=0,ft=0);const xn=We.convert(H.format),st=We.convert(H.type);let Ue;if(H.isData3DTexture)b.setTexture3D(H,0),Ue=L.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)b.setTexture2DArray(H,0),Ue=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,H.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,H.unpackAlignment);const Vt=L.getParameter(L.UNPACK_ROW_LENGTH),ot=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Gn=L.getParameter(L.UNPACK_SKIP_PIXELS),us=L.getParameter(L.UNPACK_SKIP_ROWS),yn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Tt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Tt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ne),L.pixelStorei(L.UNPACK_SKIP_ROWS,ke),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Be),C.isDataTexture||C.isData3DTexture?L.texSubImage3D(Ue,V,Ie,lt,ft,ue,ye,be,xn,st,Tt.data):H.isCompressedArrayTexture?L.compressedTexSubImage3D(Ue,V,Ie,lt,ft,ue,ye,be,xn,Tt.data):L.texSubImage3D(Ue,V,Ie,lt,ft,ue,ye,be,xn,st,Tt),L.pixelStorei(L.UNPACK_ROW_LENGTH,Vt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ot),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Gn),L.pixelStorei(L.UNPACK_SKIP_ROWS,us),L.pixelStorei(L.UNPACK_SKIP_IMAGES,yn),V===0&&H.generateMipmaps&&L.generateMipmap(Ue),pe.unbindTexture()},this.initRenderTarget=function(C){Se.get(C).__webglFramebuffer===void 0&&b.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?b.setTextureCube(C,0):C.isData3DTexture?b.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?b.setTexture2DArray(C,0):b.setTexture2D(C,0),pe.unbindTexture()},this.resetState=function(){R=0,A=0,w=null,pe.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===mp?"display-p3":"srgb",t.unpackColorSpace=at.workingColorSpace===Qc?"display-p3":"srgb"}}class Ax extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Si{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let r=0;const s=i.length;let o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],h=i[r+1]-u,p=(o-u)/h;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new _e:new z);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new z,r=[],s=[],o=[],a=new z,l=new yt;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new z)}s[0]=new z,o[0]=new z;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Qt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(Qt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class xp extends Si{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new _e){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*u-p*d+this.aX,c=h*d+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class rb extends xp{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function yp(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,d){let h=(o-s)/c-(a-s)/(c+u)+(a-o)/u,p=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,p*=u,r(o,a,h,p)},calc:function(s){const o=s*s,a=o*s;return n+e*s+t*o+i*a}}}const Fl=new z,yh=new yp,Sh=new yp,Mh=new yp;class sb extends Si{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new z){const i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(Fl.subVectors(r[0],r[1]).add(r[0]),c=Fl);const d=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Fl.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Fl),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),p),_=Math.pow(d.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(u),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),yh.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,_,m),Sh.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,_,m),Mh.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(yh.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Sh.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Mh.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(yh.calc(l),Sh.calc(l),Mh.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new z().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function c0(n,e,t,i,r){const s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function ob(n,e){const t=1-n;return t*t*e}function ab(n,e){return 2*(1-n)*n*e}function lb(n,e){return n*n*e}function sa(n,e,t,i){return ob(n,e)+ab(n,t)+lb(n,i)}function cb(n,e){const t=1-n;return t*t*t*e}function ub(n,e){const t=1-n;return 3*t*t*n*e}function hb(n,e){return 3*(1-n)*n*n*e}function db(n,e){return n*n*n*e}function oa(n,e,t,i,r){return cb(n,e)+ub(n,t)+hb(n,i)+db(n,r)}class Cx extends Si{constructor(e=new _e,t=new _e,i=new _e,r=new _e){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new _e){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(oa(e,r.x,s.x,o.x,a.x),oa(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fb extends Si{constructor(e=new z,t=new z,i=new z,r=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new z){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(oa(e,r.x,s.x,o.x,a.x),oa(e,r.y,s.y,o.y,a.y),oa(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rx extends Si{constructor(e=new _e,t=new _e){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new _e){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new _e){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pb extends Si{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bx extends Si{constructor(e=new _e,t=new _e,i=new _e){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new _e){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(sa(e,r.x,s.x,o.x),sa(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mb extends Si{constructor(e=new z,t=new z,i=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new z){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(sa(e,r.x,s.x,o.x),sa(e,r.y,s.y,o.y),sa(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Px extends Si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new _e){const i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],d=r[o>r.length-3?r.length-1:o+2];return i.set(c0(a,l.x,c.x,u.x,d.x),c0(a,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new _e().fromArray(r))}return this}}var of=Object.freeze({__proto__:null,ArcCurve:rb,CatmullRomCurve3:sb,CubicBezierCurve:Cx,CubicBezierCurve3:fb,EllipseCurve:xp,LineCurve:Rx,LineCurve3:pb,QuadraticBezierCurve:bx,QuadraticBezierCurve3:mb,SplineCurve:Px});class gb extends Si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new of[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new of[r.type]().fromJSON(r))}return this}}class u0 extends gb{constructor(e){super(),this.type="Path",this.currentPoint=new _e,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Rx(this.currentPoint.clone(),new _e(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new bx(this.currentPoint.clone(),new _e(e,t),new _e(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,o){const a=new Cx(this.currentPoint.clone(),new _e(e,t),new _e(i,r),new _e(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Px(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,r,s,o),this}absarc(e,t,i,r,s,o){return this.absellipse(e,t,i,i,r,s,o),this}ellipse(e,t,i,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,o,a,l),this}absellipse(e,t,i,r,s,o,a,l){const c=new xp(e,t,i,r,s,o,a,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Sp extends Vn{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new z,u=new _e;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const p=i+d/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/e+1)/2,u.y=(o[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Pt(o,3)),this.setAttribute("normal",new Pt(a,3)),this.setAttribute("uv",new Pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sp(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class to extends Vn{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],h=[],p=[];let g=0;const _=[],m=i/2;let f=0;v(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Pt(d,3)),this.setAttribute("normal",new Pt(h,3)),this.setAttribute("uv",new Pt(p,2));function v(){const S=new z,R=new z;let A=0;const w=(t-e)/i;for(let P=0;P<=s;P++){const W=[],y=P/s,M=y*(t-e)+e;for(let B=0;B<=r;B++){const N=B/r,F=N*l+a,O=Math.sin(F),D=Math.cos(F);R.x=M*O,R.y=-y*i+m,R.z=M*D,d.push(R.x,R.y,R.z),S.set(O,w,D).normalize(),h.push(S.x,S.y,S.z),p.push(N,1-y),W.push(g++)}_.push(W)}for(let P=0;P<r;P++)for(let W=0;W<s;W++){const y=_[W][P],M=_[W+1][P],B=_[W+1][P+1],N=_[W][P+1];e>0&&(u.push(y,M,N),A+=3),t>0&&(u.push(M,B,N),A+=3)}c.addGroup(f,A,0),f+=A}function x(S){const R=g,A=new _e,w=new z;let P=0;const W=S===!0?e:t,y=S===!0?1:-1;for(let B=1;B<=r;B++)d.push(0,m*y,0),h.push(0,y,0),p.push(.5,.5),g++;const M=g;for(let B=0;B<=r;B++){const F=B/r*l+a,O=Math.cos(F),D=Math.sin(F);w.x=W*D,w.y=m*y,w.z=W*O,d.push(w.x,w.y,w.z),h.push(0,y,0),A.x=O*.5+.5,A.y=D*.5*y+.5,p.push(A.x,A.y),g++}for(let B=0;B<r;B++){const N=R+B,F=M+B;S===!0?u.push(F,F+1,N):u.push(F+1,F,N),P+=3}c.addGroup(f,P,S===!0?1:2),f+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new to(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Mp extends to{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Mp(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Lx extends u0{constructor(e){super(e),this.uuid=yo(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new u0().fromJSON(r))}return this}}const vb={triangulate:function(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Nx(n,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,d,h,p;if(i&&(s=Mb(n,e,s,t)),n.length>80*t){a=c=n[0],l=u=n[1];for(let g=t;g<r;g+=t)d=n[g],h=n[g+1],d<a&&(a=d),h<l&&(l=h),d>c&&(c=d),h>u&&(u=h);p=Math.max(c-a,u-l),p=p!==0?32767/p:0}return Ca(s,o,t,a,l,p,0),o}};function Nx(n,e,t,i,r){let s,o;if(r===Ib(n,e,t,i)>0)for(s=e;s<t;s+=i)o=h0(s,n[s],n[s+1],o);else for(s=t-i;s>=e;s-=i)o=h0(s,n[s],n[s+1],o);return o&&iu(o,o.next)&&(ba(o),o=o.next),o}function as(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(iu(t,t.next)||Mt(t.prev,t,t.next)===0)){if(ba(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Ca(n,e,t,i,r,s,o){if(!n)return;!o&&s&&Cb(n,i,r,s);let a=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,s?xb(n,i,r,s):_b(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(c.i/t|0),ba(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=yb(as(n),e,t),Ca(n,e,t,i,r,s,2)):o===2&&Sb(n,e,t,i,r,s):Ca(as(n),e,t,i,r,s,1);break}}}function _b(n){const e=n.prev,t=n,i=n.next;if(Mt(e,t,i)>=0)return!1;const r=e.x,s=t.x,o=i.x,a=e.y,l=t.y,c=i.y,u=r<s?r<o?r:o:s<o?s:o,d=a<l?a<c?a:c:l<c?l:c,h=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c;let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=p&&Xs(r,a,s,l,o,c,g.x,g.y)&&Mt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function xb(n,e,t,i){const r=n.prev,s=n,o=n.next;if(Mt(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,d=s.y,h=o.y,p=a<l?a<c?a:c:l<c?l:c,g=u<d?u<h?u:h:d<h?d:h,_=a>l?a>c?a:c:l>c?l:c,m=u>d?u>h?u:h:d>h?d:h,f=af(p,g,e,t,i),v=af(_,m,e,t,i);let x=n.prevZ,S=n.nextZ;for(;x&&x.z>=f&&S&&S.z<=v;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&Xs(a,u,l,d,c,h,x.x,x.y)&&Mt(x.prev,x,x.next)>=0||(x=x.prevZ,S.x>=p&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&Xs(a,u,l,d,c,h,S.x,S.y)&&Mt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;x&&x.z>=f;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&Xs(a,u,l,d,c,h,x.x,x.y)&&Mt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;S&&S.z<=v;){if(S.x>=p&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&Xs(a,u,l,d,c,h,S.x,S.y)&&Mt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function yb(n,e,t){let i=n;do{const r=i.prev,s=i.next.next;!iu(r,s)&&Ix(r,i,i.next,s)&&Ra(r,s)&&Ra(s,r)&&(e.push(r.i/t|0),e.push(i.i/t|0),e.push(s.i/t|0),ba(i),ba(i.next),i=n=s),i=i.next}while(i!==n);return as(i)}function Sb(n,e,t,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Pb(o,a)){let l=Dx(o,a);o=as(o,o.next),l=as(l,l.next),Ca(o,e,t,i,r,s,0),Ca(l,e,t,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function Mb(n,e,t,i){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:n.length,c=Nx(n,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(bb(c));for(r.sort(Eb),s=0;s<r.length;s++)t=wb(r[s],t);return t}function Eb(n,e){return n.x-e.x}function wb(n,e){const t=Tb(n,e);if(!t)return e;const i=Dx(t,n);return as(i,i.next),as(t,t.next)}function Tb(n,e){let t=e,i=-1/0,r;const s=n.x,o=n.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const h=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=s&&h>i&&(i=h,r=t.x<t.next.x?t:t.next,h===s))return r}t=t.next}while(t!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let u=1/0,d;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&Xs(o<c?s:i,o,l,c,o<c?i:s,o,t.x,t.y)&&(d=Math.abs(o-t.y)/(s-t.x),Ra(t,n)&&(d<u||d===u&&(t.x>r.x||t.x===r.x&&Ab(r,t)))&&(r=t,u=d)),t=t.next;while(t!==a);return r}function Ab(n,e){return Mt(n.prev,n,e.prev)<0&&Mt(e.next,n,n.next)<0}function Cb(n,e,t,i){let r=n;do r.z===0&&(r.z=af(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Rb(r)}function Rb(n){let e,t,i,r,s,o,a,l,c=1;do{for(t=n,n=null,s=null,o=0;t;){for(o++,i=t,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||t.z<=i.z)?(r=t,t=t.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;t=i}s.nextZ=null,c*=2}while(o>1);return n}function af(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function bb(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Xs(n,e,t,i,r,s,o,a){return(r-o)*(e-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(i-a)}function Pb(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Lb(n,e)&&(Ra(n,e)&&Ra(e,n)&&Nb(n,e)&&(Mt(n.prev,n,e.prev)||Mt(n,e.prev,e))||iu(n,e)&&Mt(n.prev,n,n.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function iu(n,e){return n.x===e.x&&n.y===e.y}function Ix(n,e,t,i){const r=zl(Mt(n,e,t)),s=zl(Mt(n,e,i)),o=zl(Mt(t,i,n)),a=zl(Mt(t,i,e));return!!(r!==s&&o!==a||r===0&&Ol(n,t,e)||s===0&&Ol(n,i,e)||o===0&&Ol(t,n,i)||a===0&&Ol(t,e,i))}function Ol(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function zl(n){return n>0?1:n<0?-1:0}function Lb(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Ix(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Ra(n,e){return Mt(n.prev,n,n.next)<0?Mt(n,e,n.next)>=0&&Mt(n,n.prev,e)>=0:Mt(n,e,n.prev)<0||Mt(n,n.next,e)<0}function Nb(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Dx(n,e){const t=new lf(n.i,n.x,n.y),i=new lf(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function h0(n,e,t,i){const r=new lf(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ba(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function lf(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Ib(n,e,t,i){let r=0;for(let s=e,o=t-i;s<t;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}class aa{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return aa.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];d0(e),f0(i,e);let o=e.length;t.forEach(d0);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,f0(i,t[l]);const a=vb.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function d0(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function f0(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Ep extends Vn{constructor(e=new Lx([new _e(.5,.5),new _e(-.5,.5),new _e(-.5,-.5),new _e(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Pt(r,3)),this.setAttribute("uv",new Pt(s,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const f=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:Db;let x,S=!1,R,A,w,P;f&&(x=f.getSpacedPoints(u),S=!0,h=!1,R=f.computeFrenetFrames(u,!1),A=new z,w=new z,P=new z),h||(m=0,p=0,g=0,_=0);const W=a.extractPoints(c);let y=W.shape;const M=W.holes;if(!aa.isClockWise(y)){y=y.reverse();for(let ie=0,L=M.length;ie<L;ie++){const fe=M[ie];aa.isClockWise(fe)&&(M[ie]=fe.reverse())}}const N=aa.triangulateShape(y,M),F=y;for(let ie=0,L=M.length;ie<L;ie++){const fe=M[ie];y=y.concat(fe)}function O(ie,L,fe){return L||console.error("THREE.ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(L,fe)}const D=y.length,$=N.length;function I(ie,L,fe){let de,le,pe;const De=ie.x-L.x,Se=ie.y-L.y,b=fe.x-ie.x,E=fe.y-ie.y,X=De*De+Se*Se,ee=De*E-Se*b;if(Math.abs(ee)>Number.EPSILON){const re=Math.sqrt(X),te=Math.sqrt(b*b+E*E),Le=L.x-Se/re,ge=L.y+De/re,we=fe.x-E/te,Ze=fe.y+b/te,ce=((we-Le)*E-(Ze-ge)*b)/(De*E-Se*b);de=Le+De*ce-ie.x,le=ge+Se*ce-ie.y;const Te=de*de+le*le;if(Te<=2)return new _e(de,le);pe=Math.sqrt(Te/2)}else{let re=!1;De>Number.EPSILON?b>Number.EPSILON&&(re=!0):De<-Number.EPSILON?b<-Number.EPSILON&&(re=!0):Math.sign(Se)===Math.sign(E)&&(re=!0),re?(de=-Se,le=De,pe=Math.sqrt(X)):(de=De,le=Se,pe=Math.sqrt(X/2))}return new _e(de/pe,le/pe)}const U=[];for(let ie=0,L=F.length,fe=L-1,de=ie+1;ie<L;ie++,fe++,de++)fe===L&&(fe=0),de===L&&(de=0),U[ie]=I(F[ie],F[fe],F[de]);const j=[];let Q,ne=U.concat();for(let ie=0,L=M.length;ie<L;ie++){const fe=M[ie];Q=[];for(let de=0,le=fe.length,pe=le-1,De=de+1;de<le;de++,pe++,De++)pe===le&&(pe=0),De===le&&(De=0),Q[de]=I(fe[de],fe[pe],fe[De]);j.push(Q),ne=ne.concat(Q)}for(let ie=0;ie<m;ie++){const L=ie/m,fe=p*Math.cos(L*Math.PI/2),de=g*Math.sin(L*Math.PI/2)+_;for(let le=0,pe=F.length;le<pe;le++){const De=O(F[le],U[le],de);he(De.x,De.y,-fe)}for(let le=0,pe=M.length;le<pe;le++){const De=M[le];Q=j[le];for(let Se=0,b=De.length;Se<b;Se++){const E=O(De[Se],Q[Se],de);he(E.x,E.y,-fe)}}}const Fe=g+_;for(let ie=0;ie<D;ie++){const L=h?O(y[ie],ne[ie],Fe):y[ie];S?(w.copy(R.normals[0]).multiplyScalar(L.x),A.copy(R.binormals[0]).multiplyScalar(L.y),P.copy(x[0]).add(w).add(A),he(P.x,P.y,P.z)):he(L.x,L.y,0)}for(let ie=1;ie<=u;ie++)for(let L=0;L<D;L++){const fe=h?O(y[L],ne[L],Fe):y[L];S?(w.copy(R.normals[ie]).multiplyScalar(fe.x),A.copy(R.binormals[ie]).multiplyScalar(fe.y),P.copy(x[ie]).add(w).add(A),he(P.x,P.y,P.z)):he(fe.x,fe.y,d/u*ie)}for(let ie=m-1;ie>=0;ie--){const L=ie/m,fe=p*Math.cos(L*Math.PI/2),de=g*Math.sin(L*Math.PI/2)+_;for(let le=0,pe=F.length;le<pe;le++){const De=O(F[le],U[le],de);he(De.x,De.y,d+fe)}for(let le=0,pe=M.length;le<pe;le++){const De=M[le];Q=j[le];for(let Se=0,b=De.length;Se<b;Se++){const E=O(De[Se],Q[Se],de);S?he(E.x,E.y+x[u-1].y,x[u-1].x+fe):he(E.x,E.y,d+fe)}}}K(),oe();function K(){const ie=r.length/3;if(h){let L=0,fe=D*L;for(let de=0;de<$;de++){const le=N[de];ze(le[2]+fe,le[1]+fe,le[0]+fe)}L=u+m*2,fe=D*L;for(let de=0;de<$;de++){const le=N[de];ze(le[0]+fe,le[1]+fe,le[2]+fe)}}else{for(let L=0;L<$;L++){const fe=N[L];ze(fe[2],fe[1],fe[0])}for(let L=0;L<$;L++){const fe=N[L];ze(fe[0]+D*u,fe[1]+D*u,fe[2]+D*u)}}i.addGroup(ie,r.length/3-ie,0)}function oe(){const ie=r.length/3;let L=0;me(F,L),L+=F.length;for(let fe=0,de=M.length;fe<de;fe++){const le=M[fe];me(le,L),L+=le.length}i.addGroup(ie,r.length/3-ie,1)}function me(ie,L){let fe=ie.length;for(;--fe>=0;){const de=fe;let le=fe-1;le<0&&(le=ie.length-1);for(let pe=0,De=u+m*2;pe<De;pe++){const Se=D*pe,b=D*(pe+1),E=L+de+Se,X=L+le+Se,ee=L+le+b,re=L+de+b;Oe(E,X,ee,re)}}}function he(ie,L,fe){l.push(ie),l.push(L),l.push(fe)}function ze(ie,L,fe){Ge(ie),Ge(L),Ge(fe);const de=r.length/3,le=v.generateTopUV(i,r,de-3,de-2,de-1);qe(le[0]),qe(le[1]),qe(le[2])}function Oe(ie,L,fe,de){Ge(ie),Ge(L),Ge(de),Ge(L),Ge(fe),Ge(de);const le=r.length/3,pe=v.generateSideWallUV(i,r,le-6,le-3,le-2,le-1);qe(pe[0]),qe(pe[1]),qe(pe[3]),qe(pe[1]),qe(pe[2]),qe(pe[3])}function Ge(ie){r.push(l[ie*3+0]),r.push(l[ie*3+1]),r.push(l[ie*3+2])}function qe(ie){s.push(ie.x),s.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Ub(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new of[r.type]().fromJSON(r)),new Ep(i,e.options)}}const Db={generateTopUV:function(n,e,t,i,r){const s=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new _e(s,o),new _e(a,l),new _e(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],d=e[i*3+2],h=e[r*3],p=e[r*3+1],g=e[r*3+2],_=e[s*3],m=e[s*3+1],f=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new _e(o,1-l),new _e(c,1-d),new _e(h,1-g),new _e(_,1-f)]:[new _e(a,1-l),new _e(u,1-d),new _e(p,1-g),new _e(m,1-f)]}};function Ub(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class wp extends Vn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new z,h=new z,p=[],g=[],_=[],m=[];for(let f=0;f<=i;f++){const v=[],x=f/i;let S=0;f===0&&o===0?S=.5/t:f===i&&l===Math.PI&&(S=-.5/t);for(let R=0;R<=t;R++){const A=R/t;d.x=-e*Math.cos(r+A*s)*Math.sin(o+x*a),d.y=e*Math.cos(o+x*a),d.z=e*Math.sin(r+A*s)*Math.sin(o+x*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(A+S,1-x),v.push(c++)}u.push(v)}for(let f=0;f<i;f++)for(let v=0;v<t;v++){const x=u[f][v+1],S=u[f][v],R=u[f+1][v],A=u[f+1][v+1];(f!==0||o>0)&&p.push(x,S,A),(f!==i-1||l<Math.PI)&&p.push(S,R,A)}this.setIndex(p),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wp(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Tp extends Vn{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new z,d=new z,h=new z;for(let p=0;p<=i;p++)for(let g=0;g<=r;g++){const _=g/r*s,m=p/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(_),d.y=(e+t*Math.cos(m))*Math.sin(_),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,f=(r+1)*(p-1)+g,v=(r+1)*p+g;o.push(_,m,v),o.push(m,f,v)}this.setIndex(o),this.setAttribute("position",new Pt(a,3)),this.setAttribute("normal",new Pt(l,3)),this.setAttribute("uv",new Pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tp(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class jr extends ka{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ax,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ap extends jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Fb extends Ap{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Eh=new yt,p0=new z,m0=new z;class Ux{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _e(512,512),this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vp,this._frameExtents=new _e(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;p0.setFromMatrixPosition(e.matrixWorld),t.position.copy(p0),m0.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(m0),t.updateMatrixWorld(),Eh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Eh),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Eh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const g0=new yt,Vo=new z,wh=new z;class Ob extends Ux{constructor(){super(new wn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new _e(4,2),this._viewportCount=6,this._viewports=[new ut(2,1,1,1),new ut(0,1,1,1),new ut(3,1,1,1),new ut(1,1,1,1),new ut(3,0,1,1),new ut(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Vo.setFromMatrixPosition(e.matrixWorld),i.position.copy(Vo),wh.copy(i.position),wh.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(wh),i.updateMatrixWorld(),r.makeTranslation(-Vo.x,-Vo.y,-Vo.z),g0.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(g0)}}class zb extends Ap{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Ob}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class kb extends Ux{constructor(){super(new yx(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class v0 extends Ap{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.shadow=new kb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lp);class Bb extends Ax{constructor(){super();const e=new Vi;e.deleteAttribute("uv");const t=new jr({side:on}),i=new jr,r=new zb(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new et(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new et(e,i);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new et(e,i);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const l=new et(e,i);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new et(e,i);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const u=new et(e,i);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const d=new et(e,i);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);const h=new et(e,Rs(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const p=new et(e,Rs(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const g=new et(e,Rs(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const _=new et(e,Rs(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const m=new et(e,Rs(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const f=new et(e,Rs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Rs(n){const e=new eu;return e.color.setScalar(n),e}function Hb(){const n=new Ws;n.name="Shahed136";const e=new jr({color:12175805,metalness:.35,roughness:.55}),t=new jr({color:9083791,metalness:.4,roughness:.5}),i=new jr({color:6957602,metalness:.5,roughness:.4,emissive:3804424,emissiveIntensity:.4}),r=new jr({color:657930,metalness:.9,roughness:.15,emissive:1127202,emissiveIntensity:.6}),s=new jr({color:8118445,metalness:.3,roughness:.4,emissive:2062933,emissiveIntensity:.8}),o=new et(new to(.42,.5,5.6,24,1,!1),e);o.rotation.x=Math.PI/2,n.add(o);const a=new et(new Mp(.42,1.5,24),i);a.rotation.x=-Math.PI/2,a.position.z=-3.5,n.add(a);const l=new et(new wp(.3,20,16),r);l.position.set(0,-.34,-2.7),n.add(l);const c=new et(new to(.5,.36,.5,20),t);c.rotation.x=Math.PI/2,c.position.z=3,n.add(c);const u=new Lx;u.moveTo(0,.4),u.lineTo(0,-2.2),u.lineTo(3.4,-1.6),u.lineTo(.2,.45),u.closePath();const d=new Ep(u,{depth:.1,bevelEnabled:!0,bevelThickness:.04,bevelSize:.05,bevelSegments:1}),h=new et(d,e);h.rotation.y=Math.PI/2,h.position.set(0,0,.2),n.add(h);const p=h.clone();p.scale.x=-1,n.add(p);for(const f of[1,-1]){const v=new et(new Vi(.06,.12,1),s);v.position.set(f*3.3,.02,.6),v.rotation.y=f*.18,n.add(v)}const g=new Vi(.07,1.1,.9);for(const f of[1,-1]){const v=new et(g,t);v.position.set(f*.45,.45,2.7),v.rotation.z=f*.6,n.add(v)}const _=new et(new to(.12,.12,.3,12),t);_.rotation.x=Math.PI/2,_.position.z=3.35;const m=new Ws;m.name="prop";for(let f=0;f<2;f++){const v=new et(new Vi(.08,1.7,.18),t);v.rotation.z=f*Math.PI/2,m.add(v)}m.position.z=3.5,n.add(_),n.add(m);for(let f=-2;f<=2;f++){const v=new et(new Tp(.5,.012,8,28),t);v.position.z=f*1,n.add(v)}return n.userData.prop=m,n.scale.setScalar(.5),n}function Vb(n){const e=n.clientWidth||280,t=n.clientHeight||180,i=new ib({antialias:!0,alpha:!0});i.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),i.setSize(e,t),i.toneMapping=$_,i.toneMappingExposure=1.15;try{"outputColorSpace"in i&&Dn&&(i.outputColorSpace=Dn)}catch{}n.appendChild(i.domElement);const r=new Ax;try{const _=new rf(i);_.compileEnvironmentMap&&_.compileEnvironmentMap();const m=new Bb,f=_.fromScene(m,.04);r.environment=f.texture,_.dispose()}catch(_){console.warn("[Shahed inspector] IBL/PMREM unavailable, using analytic lights only:",_)}const s=new wn(42,e/t,.1,100);s.position.set(3.2,2,4.4),s.lookAt(0,0,0);const o=new v0(16777215,2.6);o.position.set(4,6,4),r.add(o);const a=new v0(8118445,1.6);a.position.set(-5,1,-4),r.add(a);const l=new Fb(12577237,736558,.9);r.add(l);const c=Hb();r.add(c);const u=new et(new Sp(3.2,48),new eu({color:736558,transparent:!0,opacity:.35}));u.rotation.x=-Math.PI/2,u.position.y=-1.2,r.add(u);let d=0,h=0;const p=()=>{h+=.016,c.rotation.y=h*.5,c.userData.prop&&(c.userData.prop.rotation.z+=.9),i.render(r,s),d=requestAnimationFrame(p)};p();const g=()=>{const _=n.clientWidth||e,m=n.clientHeight||t;i.setSize(_,m),s.aspect=_/m,s.updateProjectionMatrix()};return window.addEventListener("resize",g),{dispose(){cancelAnimationFrame(d),window.removeEventListener("resize",g),i.dispose(),i.domElement.parentNode&&i.domElement.parentNode.removeChild(i.domElement)}}}const bs=({markup:n,className:e,style:t})=>G.jsx("span",{className:e,style:t,dangerouslySetInnerHTML:{__html:n}});function Gb(){const n=_t.useRef(null),e=_t.useRef(null),t=_t.useRef(null),[i,r]=_t.useState(!1),[s,o]=_t.useState(!1),[a,l]=_t.useState(0),[c,u]=_t.useState("launch"),[d,h]=_t.useState(!1),[p,g]=_t.useState(0),[_,m]=_t.useState(null),[f,v]=_t.useState(null),[x,S]=_t.useState(""),[R,A]=_t.useState(""),[w,P]=_t.useState({corridor:!0,geofence:!0,waypoints:!0}),W=L_(ip);_t.useEffect(()=>{if(!n.current)return;let U=null,j=null;try{U=new t1(n.current),e.current=U,U.onReady(()=>r(!0)),U.onPick(Fe=>v(Fe)),U.onTick((Fe,K)=>{m(Fe),l(Fe.progress),o(oe=>oe!==K.playing?K.playing:oe)});const ne=U.setProgress(0);ne&&m(ne),r(!0)}catch(ne){console.error("[App] CesiumScene init failed:",ne),r(!0)}const Q=document.getElementById("boot-screen");Q&&setTimeout(()=>Q.classList.add("hidden"),900);try{t.current&&(j=Vb(t.current))}catch{}return()=>{try{j&&j.dispose()}catch{}try{U&&U.destroy()}catch{}}},[]);const y=_t.useCallback(()=>{const U=e.current?.setPlaying(!s);o(!!U)},[s]),M=_t.useCallback(U=>{const j=parseFloat(U.target.value);if(!Number.isFinite(j))return;l(j);const Q=e.current?.setProgress(j);Q&&m(Q)},[]),B=_t.useCallback(U=>{u(U),e.current?.setCamMode(U),U==="thermal"&&!d&&(h(!0),e.current?.setThermal(!0))},[d]),N=_t.useCallback(()=>{const U=!d;h(U),e.current?.setThermal(U),U&&u("thermal")},[d]),F=_t.useCallback(U=>{g(U);const j=e.current?.gotoWaypoint(U);j&&(m(j),l(j.progress))},[]),O=_t.useCallback(async()=>{if(!x.trim())return;A("Activating Cesium ion / Google Photorealistic 3D Tiles…");const U=await e.current?.setIonToken(x.trim());A(U?.msg||(U?.ok?"Active":"Failed"))},[x]),D=U=>{const j=!w[U];P(Q=>({...Q,[U]:j})),e.current?.setLayer(U,j)},$=Di.waypoints,I=(U,j=1)=>U==null?"—":Number(U).toFixed(j);return G.jsxs("div",{className:"app",children:[G.jsx(bs,{markup:Kw,className:"hud-frame"}),G.jsx("div",{ref:n,className:"cesium-host"}),d&&G.jsx("div",{className:"thermal-overlay"}),G.jsxs("header",{className:"topbar",children:[G.jsx(bs,{markup:$w,className:"logo"}),G.jsxs("div",{className:"title-block",children:[G.jsx("div",{className:"t1",children:"IMP-08 · WARDA APARTMENTS STRIKE RECONSTRUCTION"}),G.jsxs("div",{className:"t2",children:[Wm.munition," · Iran→Dubai corridor · ",Wm.operation," · real-satellite 3D theatre"]})]}),G.jsxs("div",{className:"badge",children:[G.jsx("span",{className:"dot"})," ",i?"LIVE":"INIT"]})]}),G.jsxs("aside",{className:"left-rail",children:[G.jsxs("div",{className:"panel",children:[G.jsx("div",{className:"panel-h",children:"CAMERA MODES"}),G.jsx("div",{className:"cam-grid",children:pM.map(U=>G.jsxs("button",{className:`cam-btn ${c===U.id?"on":""}`,title:U.hint,onClick:()=>B(U.id),children:[G.jsx(bs,{markup:Zw[U.icon],className:"cam-ico"}),G.jsx("span",{children:U.name})]},U.id))})]}),G.jsxs("div",{className:"panel",children:[G.jsx("div",{className:"panel-h",children:"WAYPOINT NAVIGATION · 6 STOPS"}),G.jsx("div",{className:"wp-list",children:$.map((U,j)=>G.jsxs("button",{className:`wp-row ${p===j?"on":""}`,onClick:()=>F(j),children:[G.jsx(bs,{markup:Qw(U.legOrder,p===j),className:"wp-pin"}),G.jsxs("div",{className:"wp-meta",children:[G.jsx("div",{className:"wp-name",children:U.name}),G.jsxs("div",{className:"wp-phase",children:[U.phase," · ",U.lat.toFixed(3),", ",U.lon.toFixed(3)]})]})]},U.id))})]})]}),G.jsxs("aside",{className:"right-rail",children:[G.jsxs("div",{className:"panel",children:[G.jsx("div",{className:"panel-h",children:"IMP-08 IMPACT SITE"}),G.jsx("img",{className:"hero-img",src:Ps.droneHero,alt:"Al Warqa impact site — 3D photorealistic satellite capture"}),G.jsx("div",{className:"hero-cap",children:"Al Warqa, Dubai — 3D satellite capture"}),G.jsx("div",{className:"hero-strip",children:Ps.heroVariations.map((U,j)=>G.jsxs("figure",{className:"hero-thumb",children:[G.jsx("img",{src:U,alt:`Shahed-136 ${Ps.heroLabels[j]}`,loading:"lazy"}),G.jsx("figcaption",{children:Ps.heroLabels[j]})]},j))}),G.jsx("div",{className:"addr-label",children:Ye.address}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Impact"}),G.jsxs("b",{children:[Ye.lat.toFixed(7),", ",Ye.lon.toFixed(7)]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Plus code"}),G.jsx("b",{children:Ye.plusCode})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Launch origin"}),G.jsxs("b",{children:[Xm.lat.toFixed(6),", ",Xm.lon.toFixed(5)]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Region"}),G.jsxs("b",{children:[Ye.analystContext.region," (",Ye.analystContext.isoRegion,")"]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Timezone"}),G.jsx("b",{children:Ye.analystContext.timezone})]})]}),G.jsxs("div",{className:"panel",children:[G.jsx("div",{className:"panel-h",children:"LIVE TELEMETRY"}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Phase"}),G.jsx("b",{children:_?.phase||"Launch"})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Leg"}),G.jsxs("b",{children:[_?.legFrom," → ",_?.legTo]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Altitude"}),G.jsxs("b",{children:[I((_?.altM||0)/1e3,2)," km"]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Travelled"}),G.jsxs("b",{children:[I(_?.travelledKm)," / ",I(_?.totalKm)," km"]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"To impact"}),G.jsxs("b",{children:[I(_?.distToImpactKm)," km"]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Speed"}),G.jsxs("b",{children:[I(_?.speedKmh,0)," km/h"]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Dive angle"}),G.jsxs("b",{className:_?.divePitchDeg>5?"alert":"",children:[I(_?.divePitchDeg,1),"°"]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"ETA"}),G.jsxs("b",{children:[I(_?.etaMin)," min"]})]}),G.jsx("div",{className:"inspector",ref:t,children:G.jsx("div",{className:"insp-cap",children:"SHAHED-136 · OWA LOITERING MUNITION"})})]}),G.jsxs("div",{className:"panel",children:[G.jsx("div",{className:"panel-h",children:"ENDURANCE GEOFENCE"}),G.jsxs("div",{className:"geo-row",children:[G.jsx(bs,{markup:e1,className:"geo-ring"}),G.jsxs("div",{children:[G.jsxs("div",{className:"big",children:[nn.radiusKm," km"]}),G.jsx("div",{className:"sub",children:"endurance-derived detection ring"})]})]}),G.jsxs("div",{className:"warn-chip",children:["+",nn.earlierWarningMin," min earlier warning"]}),G.jsx("div",{className:"muted small",children:nn.earlierWarningNote})]}),G.jsxs("div",{className:"panel",children:[G.jsx("div",{className:"panel-h",children:"THERMAL / IR · VIIRS"}),G.jsxs("button",{className:`wide-btn ${d?"on":""}`,onClick:N,children:[G.jsx(bs,{markup:W_,className:"ta-ico"}),d?"THERMAL MODE: ON":"ENABLE THERMAL MODE"]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Detections"}),G.jsx("b",{children:W.total})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Flagged"}),G.jsxs("b",{className:"alert",children:[W.flagged," suspicious"]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Peak FRP"}),G.jsxs("b",{className:"alert",children:[I(W.peak.frp,2)," MW"]})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Cluster"}),G.jsxs("b",{children:[W.topCluster.n," hits @ ",W.topCluster.lat.toFixed(3),",",W.topCluster.lon.toFixed(3)]})]}),G.jsx("div",{className:"muted small",children:"High-FRP / clustered detections near the impact footprint are auto-flagged as suspicious heat."})]}),G.jsxs("div",{className:"panel",children:[G.jsx("div",{className:"panel-h",children:"SHAHED-136 · REAL SPECS (SOURCED)"}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Designation"}),G.jsx("b",{children:hi.designation})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Cruise speed"}),G.jsx("b",{children:hi.cruiseSpeedKmh})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Range"}),G.jsx("b",{children:hi.rangeKm})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Altitude"}),G.jsx("b",{children:hi.cruiseAltM})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Warhead"}),G.jsx("b",{children:hi.warheadKg})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Length"}),G.jsx("b",{children:hi.lengthM})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Wingspan"}),G.jsx("b",{children:hi.wingspanM})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Planform"}),G.jsx("b",{children:hi.planform})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"Terminal dive"}),G.jsx("b",{children:hi.terminalDiveDeg})]}),G.jsxs("div",{className:"kv",children:[G.jsx("span",{children:"UAE MoD"}),G.jsxs("b",{children:[qm.uaeMod.dronesDetected," detected · ",qm.uaeMod.fellInUaeTerritory," fell in UAE"]})]}),G.jsxs("div",{className:"muted small src-line",children:["Sources: ",hi.cite.join(", "),". All telemetry above reads from the live cannon-es physics state."]})]}),G.jsxs("div",{className:"panel",children:[G.jsx("div",{className:"panel-h",children:"TERMINAL APPROACH · AL WARQA"}),G.jsx("img",{className:"overlay-img",src:Ps.backdrop.dubai3d,alt:"Dubai 3D photorealistic corridor capture"}),G.jsx("div",{className:"muted small",children:"Real 3D photorealistic capture over the Dubai corridor. Physics-modelled ballistic terminal dive (~-62°) converges on Jenna Apartments (Warda), Al Warqa (25.1858, 55.4045)."})]}),G.jsxs("div",{className:"panel",children:[G.jsx("div",{className:"panel-h",children:"PHOTOREAL UPGRADE (OPTIONAL)"}),G.jsx("div",{className:"muted small",children:"Running on real ESRI World Imagery satellite tiles (no key). Paste a Cesium ion token to drape Google Photorealistic 3D Tiles."}),G.jsxs("div",{className:"ion-row",children:[G.jsx("input",{className:"ion-in",type:"password",placeholder:"Cesium ion token…",value:x,onChange:U=>S(U.target.value)}),G.jsx("button",{className:"ion-go",onClick:O,children:"Apply"})]}),R&&G.jsx("div",{className:"muted small ion-msg",children:R})]})]}),G.jsxs("footer",{className:"transport",children:[G.jsx("div",{className:"layers",children:["corridor","geofence","waypoints"].map(U=>G.jsx("button",{className:`chip ${w[U]?"on":""}`,onClick:()=>D(U),children:U},U))}),G.jsx("button",{className:"play",onClick:y,children:s?"❚❚ PAUSE":"▶ PLAY STRIKE"}),G.jsx("input",{className:"scrub",type:"range",min:"0",max:"1",step:"0.001",value:a,onChange:M}),G.jsxs("div",{className:"prog",children:[Math.round(a*100),"%"]}),G.jsxs("div",{className:"stats",children:[G.jsxs("span",{children:[Du.owaDrones," OWA"]}),G.jsxs("span",{children:[Du.ballisticMissiles," BM"]}),G.jsxs("span",{children:[Du.durationDays,"-day"]})]})]}),f&&G.jsx("div",{className:"popover",onClick:()=>v(null),children:G.jsxs("div",{className:"po-card",onClick:U=>U.stopPropagation(),children:[G.jsxs("div",{className:"po-h",children:[f.type==="site"&&(f.data.short||f.data.name),f.type==="waypoint"&&`WP ${f.data.legOrder} · ${f.data.name}`,f.type==="thermal"&&`VIIRS · ${f.data.severity}`,G.jsx("button",{className:"po-x",onClick:()=>v(null),children:"×"})]}),G.jsxs("div",{className:"po-b",children:[f.type==="site"&&(f.data.note||f.data.incident),f.type==="waypoint"&&`${f.data.phase} · ${f.data.note}`,f.type==="thermal"&&G.jsxs(G.Fragment,{children:["FRP ",f.data.frp," MW · BT ",f.data.brightTi4," K · ",f.data.acqDate," ",f.data.acqTime,"Z (",f.data.daynight==="D"?"day":"night",") · cluster ",f.data.clusterN,"."]})]})]})}),G.jsx("div",{className:"footer-brand",children:"OnDemand Vision-Drone Overwatch · Sentinel"})]})}typeof window<"u"&&!window.CESIUM_BASE_URL&&(window.CESIUM_BASE_URL="/cesium/");P_(document.getElementById("root")).render(G.jsx(ny.StrictMode,{children:G.jsx(Gb,{})}));
