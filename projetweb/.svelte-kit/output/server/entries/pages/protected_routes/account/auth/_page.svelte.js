import { c as create_ssr_component, b as subscribe, d as add_attribute } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/supabaseClient.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let user = $page.data.session.user;
  user.email;
  let new_email;
  $$unsubscribe_page();
  return `<h1>Change your email and / or password</h1>

<form class="${"row flex-center flex"}"><div class="${"col-6 form-widget"}"><label for="${"new_email"}">New email</label>
        <input class="${"inputField"}" type="${"new_email"}"${add_attribute("placeholder", new_email, 0)}${add_attribute("value", new_email, 0)}>
      <div><input type="${"submit"}" class="${"button block primary"}"${add_attribute("value", "Save", 0)} ${""}></div></div></form>

<form class="${"row flex-center flex"}"><div class="${"col-6 form-widget"}"><button class="${"button block primary"}">Reset password</button></div></form>


<div class="${"footer flex-center"}"><a href="${"/protected_routes/account/update"}" style="${"margin-top: 5px; margin-bottom: 15px"}">Back to edit my account</a></div>`;
});
export {
  Page as default
};
