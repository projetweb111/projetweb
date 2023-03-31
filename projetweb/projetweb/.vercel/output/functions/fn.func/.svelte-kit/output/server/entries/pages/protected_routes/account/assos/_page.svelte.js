import { c as create_ssr_component, b as subscribe } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/supabaseClient.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.data.session.user;
  $$unsubscribe_page();
  return `<form class="${"row flex-center flex"}"><h1>Mes assos</h1></form>
    
${`${`<div class="${"row flex-center flex"}"><h2>Aucune asso</h2></div>`}`}`;
});
export {
  Page as default
};
