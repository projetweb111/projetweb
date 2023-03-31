import { c as create_ssr_component, b as subscribe } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${!$page.data.session ? `<div class="${"container"}" style="${"padding: 50px 0 100px 0"}">You are not logged in !
</div>` : `<div class="${"container"}" style="${"padding: 50px 0 100px 0"}">${slots.default ? slots.default({}) : ``}</div>`}`;
});
export {
  Layout as default
};
