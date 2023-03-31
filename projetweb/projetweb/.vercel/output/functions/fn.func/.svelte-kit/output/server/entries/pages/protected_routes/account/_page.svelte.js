import { c as create_ssr_component, b as subscribe } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import "../../../../chunks/supabaseClient.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.data.session.user;
  $$unsubscribe_page();
  return `<form class="${"row flex-center flex"}"><h1>My account</h1></form>

${`<p>Loading ...</p>`}

<div class="${"row flex-center flex footer"}"><form class="${"row flex"}"><a class="${"button block"}" href="${"/protected_routes/account/posts"}">Mes posts</a></form>
<form class="${"row flex"}"><a class="${"button block"}" href="${"/protected_routes/account/assos"}">Mes assos</a></form></div>`;
});
export {
  Page as default
};
