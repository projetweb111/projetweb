import { c as create_ssr_component, d as add_attribute } from "../../../chunks/index.js";
import "../../../chunks/supabaseClient.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email;
  let password;
  let first_name;
  let last_name;
  return `<form class="${"row flex-center flex"}"><div class="${"col-6 form-widget"}"><h1 class="${"header"}">Authentification - Sign up</h1>
      <p class="${"description"}">Give us your name and sign up with your email and password</p>
      <div><input class="${"inputField"}" type="${"text"}" placeholder="${"Your first name"}"${add_attribute("value", first_name, 0)}>
        <input class="${"inputField"}" type="${"text"}" placeholder="${"Your last name"}"${add_attribute("value", last_name, 0)}></div>
      <div><input class="${"inputField"}" type="${"email"}" placeholder="${"Your email"}"${add_attribute("value", email, 0)}>
        <input class="${"inputField"}" type="${"password"}" placeholder="${"Your password"}"${add_attribute("value", password, 0)}></div>
      <div><input type="${"submit"}" class="${"button block"}"${add_attribute("value", "Sign up", 0)} ${""}></div></div></form>`;
});
export {
  Page as default
};
