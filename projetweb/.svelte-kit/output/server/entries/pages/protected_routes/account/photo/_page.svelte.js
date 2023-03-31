import { c as create_ssr_component, b as subscribe, e as escape } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/supabaseClient.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.data.session.user;
  $$unsubscribe_page();
  return `${``}

<div class="${"body"}"><label class="${"button primary block"}" for="${"single"}">${escape("Upload a new photo")}</label>
    <span style="${"display:none"}"><input type="${"file"}" id="${"single"}" accept="${"image/*"}" ${""}></span></div>

<div class="${"body"}"><button class="${"button primary block"}">${escape("Delete the photo")}</button></div>

<div class="${"footer flex-center"}"><a href="${"/protected_routes/account/update"}" style="${"margin-top: 5px; margin-bottom: 15px"}">Back to edit my account</a></div>`;
});
export {
  Page as default
};
