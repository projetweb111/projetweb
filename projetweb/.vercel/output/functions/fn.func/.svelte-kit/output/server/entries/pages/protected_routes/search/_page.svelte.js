import { c as create_ssr_component, b as subscribe, d as add_attribute } from "../../../../chunks/index.js";
import "../../../../chunks/supabaseClient.js";
import { p as page } from "../../../../chunks/stores.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "select.svelte-1rw5e8j{background-color:black}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let search_text = "";
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div><a href="${"/association"}"><button>show all the associations</button></a></div>
<div><p><input class="${"inputField"}" type="${"com"}" placeholder="${"search posts by association"}"${add_attribute("value", search_text, 0)}></p>
    <button class="${"button block"}">show all posts</button>
    <p>By 
      <select class="${"svelte-1rw5e8j"}"><option value="${"association"}">association</option><option value="${"title"}">title</option><option value="${"content"}">content</option></select></p></div>
  <p>Voici les dernières actualités</p>

  ${`<p>loading...</p>`}`;
});
export {
  Page as default
};
