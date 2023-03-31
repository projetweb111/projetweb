import { c as create_ssr_component, d as add_attribute, b as subscribe, v as validate_component, e as escape } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
import { s as supabase } from "../../chunks/supabaseClient.js";
const Reset = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let new_password;
  return `<form class="${"row flex-center flex"}"><div class="${"col-6 form-widget"}"><h1 class="${"header"}">Reset your password</h1>
      <div><input class="${"inputField"}" type="${"new_password"}" placeholder="${"Your new password"}"${add_attribute("value", new_password, 0)}></div>
      <div><input type="${"submit"}" class="${"button block"}"${add_attribute("value", "Save", 0)} ${""}></div></div></form>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let reset = false;
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "PASSWORD_RECOVERY") {
      console.log("PASSWORD_RECOVERY", session);
      reset = true;
    } else {
      reset = false;
    }
  });
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1hqmfdg_START -->${$$result.title = `<title>Home</title>`, ""}<!-- HEAD_svelte-1hqmfdg_END -->`, ""}
  
  ${reset ? `${validate_component(Reset, "Reset").$$render($$result, {}, {}, {})}` : `${!$page.data.session ? `<form class="${"row flex-center flex"}"><h1 class="${"header"}">Welcome !</h1></form>
  <form class="${"row flex-center flex"}"><p class="${"form-widget"}">Please log in to continue</p></form>` : `<form class="${"row flex-center flex"}"><h1 class="${"header"}">Welcome ${escape($page.data.session.user.email)} !</h1></form>`}`}`;
});
export {
  Page as default
};
