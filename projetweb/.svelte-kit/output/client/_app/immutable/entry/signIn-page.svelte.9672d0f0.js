import{S as C,i as J,s as R,e as q,b as V,n as L,h,J as W,k as d,r as T,l as f,m as b,u as U,p as u,D as r,a as P,c as N,M as D,E as F,N as z,O as B}from"../chunks/index.ce7212fb.js";import{g as G}from"../chunks/navigation.d267f952.js";import{p as K}from"../chunks/stores.37c6b56c.js";import{s as Q}from"../chunks/supabaseClient.e8e52d2c.js";function X(o){let e,t;return{c(){e=d("h1"),t=T("You just signed in"),this.h()},l(i){e=f(i,"H1",{class:!0});var a=b(e);t=U(a,"You just signed in"),a.forEach(h),this.h()},h(){u(e,"class","header")},m(i,a){V(i,e,a),r(e,t)},p:L,d(i){i&&h(e)}}}function Z(o){let e,t,i,a,s,l,w,E,_,n,y,c,Y,k,m,S,A,j;return{c(){e=d("form"),t=d("div"),i=d("h1"),a=T("Authentification - Sign in"),s=P(),l=d("p"),w=T("Sign in with your email and password"),E=P(),_=d("div"),n=d("input"),y=P(),c=d("input"),Y=P(),k=d("div"),m=d("input"),this.h()},l(p){e=f(p,"FORM",{class:!0});var v=b(e);t=f(v,"DIV",{class:!0});var g=b(t);i=f(g,"H1",{class:!0});var H=b(i);a=U(H,"Authentification - Sign in"),H.forEach(h),s=N(g),l=f(g,"P",{class:!0});var M=b(l);w=U(M,"Sign in with your email and password"),M.forEach(h),E=N(g),_=f(g,"DIV",{});var I=b(_);n=f(I,"INPUT",{class:!0,type:!0,placeholder:!0}),y=N(I),c=f(I,"INPUT",{class:!0,type:!0,placeholder:!0}),I.forEach(h),Y=N(g),k=f(g,"DIV",{});var O=b(k);m=f(O,"INPUT",{type:!0,class:!0}),O.forEach(h),g.forEach(h),v.forEach(h),this.h()},h(){u(i,"class","header"),u(l,"class","description"),u(n,"class","inputField"),u(n,"type","email"),u(n,"placeholder","Your email"),u(c,"class","inputField"),u(c,"type","password"),u(c,"placeholder","Your password"),u(m,"type","submit"),u(m,"class","button block"),m.value=S=o[0]?"Loading":"Sign in",m.disabled=o[0],u(t,"class","col-6 form-widget"),u(e,"class","row flex-center flex")},m(p,v){V(p,e,v),r(e,t),r(t,i),r(i,a),r(t,s),r(t,l),r(l,w),r(t,E),r(t,_),r(_,n),D(n,o[1]),r(_,y),r(_,c),D(c,o[2]),r(t,Y),r(t,k),r(k,m),A||(j=[F(n,"input",o[5]),F(c,"input",o[6]),F(e,"submit",z(o[4]))],A=!0)},p(p,v){v&2&&n.value!==p[1]&&D(n,p[1]),v&4&&c.value!==p[2]&&D(c,p[2]),v&1&&S!==(S=p[0]?"Loading":"Sign in")&&(m.value=S),v&1&&(m.disabled=p[0])},d(p){p&&h(e),A=!1,B(j)}}}function $(o){let e;function t(s,l){return s[3].data.session?X:Z}let i=t(o),a=i(o);return{c(){a.c(),e=q()},l(s){a.l(s),e=q()},m(s,l){a.m(s,l),V(s,e,l)},p(s,[l]){i===(i=t(s))&&a?a.p(s,l):(a.d(1),a=i(s),a&&(a.c(),a.m(e.parentNode,e)))},i:L,o:L,d(s){a.d(s),s&&h(e)}}}function x(o,e,t){let i;W(o,K,n=>t(3,i=n));let a=!1,s,l;const w=async()=>{try{t(0,a=!0);const{data:n,error:y}=await Q.auth.signInWithPassword({email:s,password:l});if(y)throw y;G("/",{invalidateAll:!0})}catch(n){n instanceof Error&&alert(n.message)}finally{t(0,a=!1)}};function E(){s=this.value,t(1,s)}function _(){l=this.value,t(2,l)}return[a,s,l,i,w,E,_]}class ie extends C{constructor(e){super(),J(this,e,x,$,R,{})}}export{ie as default};