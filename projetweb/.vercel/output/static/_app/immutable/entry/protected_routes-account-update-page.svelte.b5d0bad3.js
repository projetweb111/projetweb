import{S as He,i as Je,s as Ke,k as s,r as P,a as m,l as r,m as i,u as y,h as f,c as h,O as Ce,p as t,q as ze,b as ye,D as e,K as C,E as ae,L as Qe,v as je,n as Ge,M as We,J as Xe,o as Ye}from"../chunks/index.0e58c74b.js";import{g as Ze}from"../chunks/navigation.2cfe3a99.js";import{p as xe}from"../chunks/stores.2f18ef1e.js";import{s as Ae}from"../chunks/supabaseClient.e8e52d2c.js";function $e(o){let b,u,K,j,E,_,N,G,H,v,c,A,g,k,B,w,L,z,V,Z,x,q,T,$,ee,a,I,ne,J,fe,ie,O,p,Q,pe,ce,D,de,W,me,he,F,_e,X,ve,be,S,Ee,Y,ge,we,U,Le,te,M,le,Pe,Ie;return{c(){b=s("form"),u=s("h1"),K=P("Edit my account"),j=m(),E=s("a"),_=s("img"),H=m(),v=s("form"),c=s("div"),A=s("div"),g=s("label"),k=P("Email"),B=m(),w=s("p"),L=P(o[3]),z=m(),V=s("a"),Z=P("Change email and password"),x=m(),q=s("div"),T=s("label"),$=P("Status"),ee=m(),a=s("p"),I=P(o[4]),ne=m(),J=s("a"),fe=P("Ask for a new status"),ie=m(),O=s("div"),p=s("div"),Q=s("label"),pe=P("First name"),ce=m(),D=s("input"),de=m(),W=s("label"),me=P("Last name"),he=m(),F=s("input"),_e=m(),X=s("label"),ve=P("Pseudo"),be=m(),S=s("input"),Ee=m(),Y=s("label"),ge=P("Promo"),we=m(),U=s("input"),Le=m(),te=s("div"),M=s("input"),this.h()},l(l){b=r(l,"FORM",{class:!0});var n=i(b);u=r(n,"H1",{});var De=i(u);K=y(De,"Edit my account"),De.forEach(f),j=h(n),E=r(n,"A",{href:!0,class:!0,style:!0});var Fe=i(E);_=r(Fe,"IMG",{src:!0,alt:!0,class:!0}),Fe.forEach(f),n.forEach(f),H=h(l),v=r(l,"FORM",{class:!0});var se=i(v);c=r(se,"DIV",{class:!0});var R=i(c);A=r(R,"DIV",{});var re=i(A);g=r(re,"LABEL",{for:!0});var Se=i(g);k=y(Se,"Email"),Se.forEach(f),B=h(re),w=r(re,"P",{});var Ue=i(w);L=y(Ue,o[3]),Ue.forEach(f),re.forEach(f),z=h(R),V=r(R,"A",{class:!0,href:!0});var ke=i(V);Z=y(ke,"Change email and password"),ke.forEach(f),x=h(R),q=r(R,"DIV",{});var oe=i(q);T=r(oe,"LABEL",{for:!0});var Be=i(T);$=y(Be,"Status"),Be.forEach(f),ee=h(oe),a=r(oe,"P",{});var Ve=i(a);I=y(Ve,o[4]),Ve.forEach(f),oe.forEach(f),ne=h(R),J=r(R,"A",{class:!0,href:!0});var qe=i(J);fe=y(qe,"Ask for a new status"),qe.forEach(f),R.forEach(f),ie=h(se),O=r(se,"DIV",{class:!0});var ue=i(O);p=r(ue,"DIV",{});var d=i(p);Q=r(d,"LABEL",{for:!0});var Me=i(Q);pe=y(Me,"First name"),Me.forEach(f),ce=h(d),D=r(d,"INPUT",{class:!0,type:!0,placeholder:!0}),de=h(d),W=r(d,"LABEL",{for:!0});var Ne=i(W);me=y(Ne,"Last name"),Ne.forEach(f),he=h(d),F=r(d,"INPUT",{class:!0,type:!0,placeholder:!0}),_e=h(d),X=r(d,"LABEL",{for:!0});var Te=i(X);ve=y(Te,"Pseudo"),Te.forEach(f),be=h(d),S=r(d,"INPUT",{class:!0,type:!0,placeholder:!0}),Ee=h(d),Y=r(d,"LABEL",{for:!0});var Oe=i(Y);ge=y(Oe,"Promo"),Oe.forEach(f),we=h(d),U=r(d,"INPUT",{class:!0,type:!0,placeholder:!0}),d.forEach(f),Le=h(ue),te=r(ue,"DIV",{});var Re=i(te);M=r(Re,"INPUT",{type:!0,class:!0}),Re.forEach(f),ue.forEach(f),se.forEach(f),this.h()},h(){Ce(_.src,N=o[6])||t(_,"src",N),t(_,"alt",G=o[6]?"Avatar":"Pas de photo"),t(_,"class","avatar image"),t(E,"href","/protected_routes/account/photo"),t(E,"class","avatarPlaceholder"),ze(E,"margin-left","auto"),t(b,"class","row flex-center flex"),t(g,"for","email"),t(V,"class","button block"),t(V,"href","/protected_routes/account/auth"),t(T,"for","status"),t(J,"class","button block"),t(J,"href","/protected_routes/account/status"),t(c,"class","col-7 form-widget"),t(Q,"for","first_name"),t(D,"class","inputField"),t(D,"type","first_name"),t(D,"placeholder",o[0]),t(W,"for","last_name"),t(F,"class","inputField"),t(F,"type","last_name"),t(F,"placeholder",o[1]),t(X,"for","pseudo"),t(S,"class","inputField"),t(S,"type","pseudo"),t(S,"placeholder",o[2]),t(Y,"for","promo"),t(U,"class","inputField"),t(U,"type","promo"),t(U,"placeholder",o[5]),t(M,"type","submit"),t(M,"class","button block primary"),M.value=le=o[11]?"Loading":"Save",M.disabled=o[11],t(O,"class","col-8 form-widget"),t(v,"class","row flex-center flex")},m(l,n){ye(l,b,n),e(b,u),e(u,K),e(b,j),e(b,E),e(E,_),ye(l,H,n),ye(l,v,n),e(v,c),e(c,A),e(A,g),e(g,k),e(A,B),e(A,w),e(w,L),e(c,z),e(c,V),e(V,Z),e(c,x),e(c,q),e(q,T),e(T,$),e(q,ee),e(q,a),e(a,I),e(c,ne),e(c,J),e(J,fe),e(v,ie),e(v,O),e(O,p),e(p,Q),e(Q,pe),e(p,ce),e(p,D),C(D,o[7]),e(p,de),e(p,W),e(W,me),e(p,he),e(p,F),C(F,o[8]),e(p,_e),e(p,X),e(X,ve),e(p,be),e(p,S),C(S,o[9]),e(p,Ee),e(p,Y),e(Y,ge),e(p,we),e(p,U),C(U,o[10]),e(O,Le),e(O,te),e(te,M),Pe||(Ie=[ae(D,"input",o[13]),ae(F,"input",o[14]),ae(S,"input",o[15]),ae(U,"input",o[16]),ae(v,"submit",Qe(o[12]))],Pe=!0)},p(l,[n]){n&64&&!Ce(_.src,N=l[6])&&t(_,"src",N),n&64&&G!==(G=l[6]?"Avatar":"Pas de photo")&&t(_,"alt",G),n&8&&je(L,l[3]),n&16&&je(I,l[4]),n&1&&t(D,"placeholder",l[0]),n&128&&C(D,l[7]),n&2&&t(F,"placeholder",l[1]),n&256&&C(F,l[8]),n&4&&t(S,"placeholder",l[2]),n&512&&C(S,l[9]),n&32&&t(U,"placeholder",l[5]),n&1024&&C(U,l[10]),n&2048&&le!==(le=l[11]?"Loading":"Save")&&(M.value=le),n&2048&&(M.disabled=l[11])},i:Ge,o:Ge,d(l){l&&f(b),l&&f(H),l&&f(v),Pe=!1,We(Ie)}}}function et(o,b,u){let K;Xe(o,xe,a=>u(19,K=a));let j=K.data.session.user,E=null,_=null,N=null,G=null,H=null,v=null,c=null,A=null,g=null,k=null,B=null,w=null,L=!1,z=!1;async function V(){try{u(11,L=!0);let{error:a}=await Ae.from("users").update({first_name:g||E,last_name:k||_,pseudo:B||N,promo:w||v}).eq("id",j.id);if(a)throw a;u(11,L=!1),Ze("/protected_routes/account")}catch(a){a instanceof Error&&alert(a.message)}finally{u(11,L=!1)}}Ye(()=>{Z()});const Z=async()=>{try{u(11,L=!0);let{data:a,error:I}=await Ae.from("users").select("first_name, last_name, pseudo, email, status, promo, photo").eq("id",j.id).single();if(a&&(u(0,E=a.first_name),u(1,_=a.last_name),u(2,N=a.pseudo),u(3,G=a.email),u(4,H=a.status),u(5,v=a.promo),c=a.photo),I)throw I}catch(a){a instanceof Error&&alert(a.message)}finally{u(11,L=!1),x()}},x=async()=>{if(c)try{z=!0;const{data:a,error:I}=await Ae.storage.from("avatars").download(`${j.id}/${c}`);if(a&&u(6,A=URL.createObjectURL(a)),I)throw I}catch(a){a instanceof Error&&alert(a.message)}finally{z=!1}};function q(){g=this.value,u(7,g)}function T(){k=this.value,u(8,k)}function $(){B=this.value,u(9,B)}function ee(){w=this.value,u(10,w)}return[E,_,N,G,H,v,A,g,k,B,w,L,V,q,T,$,ee]}class rt extends He{constructor(b){super(),Je(this,b,et,$e,Ke,{})}}export{rt as default};
