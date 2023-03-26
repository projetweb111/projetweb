import { c as create_ssr_component, b as subscribe } from "../../../../chunks/index.js";
import "../../../../chunks/supabaseClient.js";
import { p as page } from "../../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `<h1>Actualités</h1>
  <h2>Voici les dernières actualités :</h2>
  
  ${`<p>loading...</p>`}`;
});
export {
  Page as default
};
