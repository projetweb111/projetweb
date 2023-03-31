import { c as create_ssr_component, b as subscribe, d as add_attribute } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import "../../../../chunks/supabaseClient.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.data.session.user;
  let url_photo = null;
  $$unsubscribe_page();
  return `<form class="${"row flex-center flex"}"><h1>My account</h1>
    <a href="${"/protected_routes/account/photo"}" class="${"avatarPlaceholder"}" style="${"margin-left: auto;"}"><img${add_attribute("src", url_photo, 0)}${add_attribute("alt", "Pas de photo", 0)} class="${"avatar image"}"></a></form>

${`<p>Loading ...</p>`}


<div class="${"row flex-center flex footer"}"><form class="${"row flex"}"><a class="${"button block"}" href="${"/protected_routes/account/posts"}">Mes posts</a></form>
<form class="${"row flex"}"><a class="${"button block"}" href="${"/protected_routes/account/assos"}">Mes assos</a></form></div>`;
});
export {
  Page as default
};
