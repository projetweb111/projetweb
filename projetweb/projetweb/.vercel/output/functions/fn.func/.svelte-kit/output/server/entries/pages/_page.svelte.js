import { c as create_ssr_component, b as subscribe, e as escape } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1hqmfdg_START -->${$$result.title = `<title>Home</title>`, ""}<!-- HEAD_svelte-1hqmfdg_END -->`, ""}
  
  ${!$page.data.session ? `<form class="${"row flex-center flex"}"><h1 class="${"header"}">Welcome !</h1></form>
  <form class="${"row flex-center flex"}"><p class="${"form-widget"}">Please sign in to continue</p></form>` : `<form class="${"row flex-center flex"}"><h1 class="${"header"}">Welcome ${escape($page.data.session.user.email)} !</h1></form>`}`;
});
export {
  Page as default
};
