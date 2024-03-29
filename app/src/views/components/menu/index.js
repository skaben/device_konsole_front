import "./style.scss";
import { viewMixin } from "../../../mixins/view";
import { canRender } from "../../../mixins/render";

class menuObject {

  constructor(items) {
    this.items = items;
  }

  rows() {
    if (!this.items) return;
    return this.items.map((item, index) => {
      console.log(item);
      const {display, href} = item;
      const link = href ? `/${href}` : 'javascript:;';
      return `
        <div class="menu__item">
          <a href="${link}" data-element="${index}" tabindex="${index + 1}">${display}</a>
        </div>
      `
    }).join('');
  }

  template() {
    return `
      <div class="menu">
        ${this.rows()}
      </div>
    `;
  }

  focusRow() {
    const firstRow = this.subElements[Object.keys(this.subElements)[0]];
    firstRow.focus();
  }
}


const getMenu = (items) => {
  const menu = new menuObject(items);
  Object.assign(
    menu,
    viewMixin,
    canRender
  );
  menu.render();
  menu.focusRow();
  return menu;
}

export default getMenu;
