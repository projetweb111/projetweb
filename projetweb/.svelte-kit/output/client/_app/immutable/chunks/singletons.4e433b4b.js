import{n as d,s as v}from"./index.ce7212fb.js";const u=[];function b(e,t=d){let n;const s=new Set;function o(a){if(v(e,a)&&(e=a,n)){const c=!u.length;for(const i of s)i[1](),u.push(i,e);if(c){for(let i=0;i<u.length;i+=2)u[i][0](u[i+1]);u.length=0}}}function r(a){o(a(e))}function l(a,c=d){const i=[a,c];return s.add(i),s.size===1&&(n=t(o)||d),a(e),()=>{s.delete(i),s.size===0&&(n(),n=null)}}return{set:o,update:r,subscribe:l}}var g;const E=((g=globalThis.__sveltekit_lqsm8k)==null?void 0:g.base)??"";var k;const w=((k=globalThis.__sveltekit_lqsm8k)==null?void 0:k.assets)??E,A="1679849592524",y="sveltekit:snapshot",x="sveltekit:scroll",O="sveltekit:index",p={tap:1,hover:2,viewport:3,eager:4,off:-1};function U(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function q(){return{x:pageXOffset,y:pageYOffset}}function f(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const _={...p,"":p.hover};function m(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function L(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=m(e)}}function N(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const s=e instanceof SVGAElement?e.target.baseVal:e.target,o=!n||!!s||S(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external")||e.hasAttribute("download");return{url:n,external:o,target:s}}function V(e){let t=null,n=null,s=null,o=null,r=e;for(;r&&r!==document.documentElement;)n===null&&(n=f(r,"preload-code")),s===null&&(s=f(r,"preload-data")),t===null&&(t=f(r,"noscroll")),o===null&&(o=f(r,"reload")),r=m(r);return{preload_code:_[n??"off"],preload_data:_[s??"off"],noscroll:t==="off"?!1:t===""?!0:null,reload:o==="off"?!1:o===""?!0:null}}function h(e){const t=b(e);let n=!0;function s(){n=!0,t.update(l=>l)}function o(l){n=!1,t.set(l)}function r(l){let a;return t.subscribe(c=>{(a===void 0||n&&c!==a)&&l(a=c)})}return{notify:s,set:o,subscribe:r}}function R(){const{set:e,subscribe:t}=b(!1);let n;async function s(){clearTimeout(n);const o=await fetch(`${w}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(o.ok){const l=(await o.json()).version!==A;return l&&(e(!0),clearTimeout(n)),l}else throw new Error(`Version check failed: ${o.status}`)}return{subscribe:t,check:s}}function S(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}let T;function P(e){T=e.client}const Y={url:h({}),page:h({}),navigating:b(null),updated:R()};export{O as I,p as P,x as S,y as a,N as b,V as c,q as d,E as e,L as f,U as g,P as h,S as i,T as j,Y as s};