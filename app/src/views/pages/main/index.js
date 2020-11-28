import Menu from "../../components/menu";
import { getData } from "../../../util/api";
import TypeWriter from "../../components/effects/typewriter";

import "../../../assets/styles/style.scss";
import { goRoot } from "../../../util/helpers";


const testData = [
  {
    'game': 'fallout',
    'href': '/hack',
    'name': 'hack terminal',
    'timer': -1
  }
]

export default class Page {

    // should generate all sub-pages for menu-items too

    element;
    subElements = {};
    components = {};

    URL = new URL("/api/menu", HOSTURL);

    async initComponents() {
      const apiData = await getData(this.URL);
      const data = apiData.length === 0
                    ? testData
                    : apiData;

      try {
        const menu = new Menu(data);

        const typewriters = Object.values(menu.subElements).map(item => new TypeWriter(item, {speed: 15}));
        // todo: solution via promises
        typewriters.forEach((item, index, array) => {
          const prev = array[index - 1];
          if (prev) item.delay = prev.overall + prev.delay;
          item.print();
        });

        this.components.menu = menu;
        return this.components;

      } catch (err) {
        console.error(err);
        await goRoot(err);
      }
    }

    get template () {
      return `
        <div class="page">
          <div class="content__menu" data-element="menu"></div>
        </div>
      `;
    }

    async render () {
      const element = document.createElement('div');

      element.innerHTML = this.template;

      this.element = element.firstElementChild;
      this.subElements = this.getSubElements(this.element);

      await this.initComponents();
      this.renderComponents();

      return this.element;
    }

    renderComponents () {
      Object.keys(this.components).forEach(component => {
        const root = this.subElements[component];
        this.components[component].show(root);
      });
    }

    getSubElements ($element) {
      const elements = $element.querySelectorAll('[data-element]');

      return [...elements].reduce((accum, subElement) => {
        accum[subElement.dataset.element] = subElement;

        return accum;
      }, {});
    }

    remove () {
      this.element.remove();
    }

    destroy () {
      this.remove();

      for (const component of Object.values(this.components)) {
        component.destroy();
      }
    }
  }