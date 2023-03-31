import { c as create_ssr_component, b as subscribe, d as add_attribute } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/stores.js";
import "../../../chunks/supabaseClient.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let email;
  let password;
  $$unsubscribe_page();
  return `${!$page.data.session ? `<form class="${"row flex-center flex"}"><div class="${"col-6 form-widget"}"><h1 class="${"header"}">Log in</h1>
      <p class="${"description"}">Log in with your email and password</p>
      <div><input class="${"inputField"}" type="${"email"}" placeholder="${"Your email"}"${add_attribute("value", email, 0)}>
        <input class="${"inputField"}" type="${"password"}" placeholder="${"Your password"}"${add_attribute("value", password, 0)}></div>
      <div><input type="${"submit"}" class="${"button block"}"${add_attribute("value", "Sign in", 0)} ${""}></div></div></form>

  <form class="${"row flex-center flex"}"><div class="${"col-6 form-widget"}"><button class="${"button block primary"}">Reset password</button></div></form>` : `<h1 class="${"header"}">You just logged in</h1>`}`;
});
export {
  Page as default
};
