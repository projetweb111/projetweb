import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/supabaseClient.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.data.session.user;
  let first_name = null;
  let last_name = null;
  let pseudo = null;
  let email = null;
  let status = null;
  let promo = null;
  let url_photo = null;
  let new_first_name = null;
  let new_last_name = null;
  let new_pseudo = null;
  let new_promo = null;
  $$unsubscribe_page();
  return `<form class="${"row flex-center flex"}"><h1>Edit my account</h1>
	<a href="${"/protected_routes/account/photo"}" class="${"avatarPlaceholder"}" style="${"margin-left: auto;"}"><img${add_attribute("src", url_photo, 0)}${add_attribute("alt", "Pas de photo", 0)} class="${"avatar image"}"></a></form>

<form class="${"row flex-center flex"}"><div class="${"col-7 form-widget"}"><div><label for="${"email"}">Email</label>
        <p>${escape(email)}</p></div>
		<a class="${"button block"}" href="${"/protected_routes/account/auth"}">Change email and password</a>
		
		<div><label for="${"status"}">Status</label>
		<p>${escape(status)}</p></div>
		<a class="${"button block"}" href="${"/protected_routes/account/status"}">Ask for a new status</a></div>
	
    <div class="${"col-8 form-widget"}"><div><label for="${"first_name"}">First name</label>
        <input class="${"inputField"}" type="${"first_name"}"${add_attribute("placeholder", first_name, 0)}${add_attribute("value", new_first_name, 0)}>
		<label for="${"last_name"}">Last name</label>
		<input class="${"inputField"}" type="${"last_name"}"${add_attribute("placeholder", last_name, 0)}${add_attribute("value", new_last_name, 0)}>
		<label for="${"pseudo"}">Pseudo</label>
		<input class="${"inputField"}" type="${"pseudo"}"${add_attribute("placeholder", pseudo, 0)}${add_attribute("value", new_pseudo, 0)}>
		<label for="${"promo"}">Promo</label>
		<input class="${"inputField"}" type="${"promo"}"${add_attribute("placeholder", promo, 0)}${add_attribute("value", new_promo, 0)}></div>
      <div><input type="${"submit"}" class="${"button block primary"}"${add_attribute("value", "Save", 0)} ${""}></div></div></form>`;
});
export {
  Page as default
};
