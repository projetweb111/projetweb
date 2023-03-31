import { c as create_ssr_component, b as subscribe, v as validate_component } from "../../chunks/index.js";
import "../../chunks/supabaseClient.js";
import { p as page } from "../../chunks/stores.js";
const styles = "";
const SignOut = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<form class="${"form-widget"}"><div><button class="${"button block"}" ${""}>Sign Out</button></div></form>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "nav.svelte-8abco7.svelte-8abco7{display:flex;justify-content:space-between;align-items:center;padding:0.5rem;background-color:#911616}nav.svelte-8abco7 a.svelte-8abco7{color:#ffffff;text-decoration:none;font-size:1.5rem;padding:0.5rem}nav.svelte-8abco7 a.svelte-8abco7:hover{color:#000000}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<nav class="${"svelte-8abco7"}"><a href="${"/"}" class="${"svelte-8abco7"}">🏠 Home</a>
  ${!$page.data.session ? `<a href="${"/signIn"}" class="${"svelte-8abco7"}">Log in</a>
    <a href="${"/signUp"}" class="${"svelte-8abco7"}">Sign up</a>` : `<a href="${"/protected_routes/actualite"}" class="${"svelte-8abco7"}">Actualités</a>
    <a href="${"/protected_routes/search"}" class="${"svelte-8abco7"}">Search </a>
    <a href="${"/protected_routes/account"}" class="${"svelte-8abco7"}">My account</a>
    ${validate_component(SignOut, "SignOut").$$render($$result, {}, {}, {})}`}</nav>



<div class="${"container"}" style="${"padding: 50px 0 100px 0"}">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
