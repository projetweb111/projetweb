import{S as B,i as J,s as K,k as r,r as R,a as U,l as u,m as S,u as j,h as E,c as N,p as a,b as Q,D as t,M as b,E as V,N as W,n as z,O as X}from"../chunks/index.ce7212fb.js";import{g as Z}from"../chunks/navigation.d267f952.js";import{s as $}from"../chunks/supabaseClient.e8e52d2c.js";function x(l){let o,e,c,_,w,p,I,D,g,i,F,n,P,f,h,G,m,L,T,y,Y,M,O;return{c(){o=r("form"),e=r("div"),c=r("h1"),_=R("Authentification - Sign up"),w=U(),p=r("p"),I=R("Give us your name and sign up with your email and password"),D=U(),g=r("div"),i=r("input"),F=U(),n=r("input"),P=U(),f=r("div"),h=r("input"),G=U(),m=r("input"),L=U(),T=r("div"),y=r("input"),this.h()},l(s){o=u(s,"FORM",{class:!0});var d=S(o);e=u(d,"DIV",{class:!0});var v=S(e);c=u(v,"H1",{class:!0});var q=S(c);_=j(q,"Authentification - Sign up"),q.forEach(E),w=N(v),p=u(v,"P",{class:!0});var C=S(p);I=j(C,"Give us your name and sign up with your email and password"),C.forEach(E),D=N(v),g=u(v,"DIV",{});var A=S(g);i=u(A,"INPUT",{class:!0,type:!0,placeholder:!0}),F=N(A),n=u(A,"INPUT",{class:!0,type:!0,placeholder:!0}),A.forEach(E),P=N(v),f=u(v,"DIV",{});var k=S(f);h=u(k,"INPUT",{class:!0,type:!0,placeholder:!0}),G=N(k),m=u(k,"INPUT",{class:!0,type:!0,placeholder:!0}),k.forEach(E),L=N(v),T=u(v,"DIV",{});var H=S(T);y=u(H,"INPUT",{type:!0,class:!0}),H.forEach(E),v.forEach(E),d.forEach(E),this.h()},h(){a(c,"class","header"),a(p,"class","description"),a(i,"class","inputField"),a(i,"type","text"),a(i,"placeholder","Your first name"),a(n,"class","inputField"),a(n,"type","text"),a(n,"placeholder","Your last name"),a(h,"class","inputField"),a(h,"type","email"),a(h,"placeholder","Your email"),a(m,"class","inputField"),a(m,"type","password"),a(m,"placeholder","Your password"),a(y,"type","submit"),a(y,"class","button block"),y.value=Y=l[0]?"Loading":"Sign up",y.disabled=l[0],a(e,"class","col-6 form-widget"),a(o,"class","row flex-center flex")},m(s,d){Q(s,o,d),t(o,e),t(e,c),t(c,_),t(e,w),t(e,p),t(p,I),t(e,D),t(e,g),t(g,i),b(i,l[3]),t(g,F),t(g,n),b(n,l[4]),t(e,P),t(e,f),t(f,h),b(h,l[1]),t(f,G),t(f,m),b(m,l[2]),t(e,L),t(e,T),t(T,y),M||(O=[V(i,"input",l[6]),V(n,"input",l[7]),V(h,"input",l[8]),V(m,"input",l[9]),V(o,"submit",W(l[5]))],M=!0)},p(s,[d]){d&8&&i.value!==s[3]&&b(i,s[3]),d&16&&n.value!==s[4]&&b(n,s[4]),d&2&&h.value!==s[1]&&b(h,s[1]),d&4&&m.value!==s[2]&&b(m,s[2]),d&1&&Y!==(Y=s[0]?"Loading":"Sign up")&&(y.value=Y),d&1&&(y.disabled=s[0])},i:z,o:z,d(s){s&&E(o),M=!1,X(O)}}}function ee(l,o,e){let c=!1,_,w,p,I;const D=async()=>{try{e(0,c=!0);const{data:P,error:f}=await $.auth.signUp({email:_,password:w,options:{data:{first_name:p,last_name:I,email:_}}});if(f)throw f;Z("/signIn",{invalidateAll:!0})}catch(P){P instanceof Error&&alert(P.message)}finally{e(0,c=!1)}};function g(){p=this.value,e(3,p)}function i(){I=this.value,e(4,I)}function F(){_=this.value,e(1,_)}function n(){w=this.value,e(2,w)}return[c,_,w,p,I,D,g,i,F,n]}class le extends B{constructor(o){super(),J(this,o,ee,x,K,{})}}export{le as default};
