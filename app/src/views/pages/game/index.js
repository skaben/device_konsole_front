import HackScreen from "../../components/games/hack";
import TextBar from "../../components/elements/textbar";
import { goRoot } from "../../../util/helpers";
import { getData } from "../../../util/api.js";
import TypeWriter from "../../components/effects/typewriter";
import { viewMixin } from "../../../mixins/view";
import { pageMixin, canRenderAsyncWithComponents } from "../../../mixins/page";

import "./style.scss";
import getTimer from "../../components/elements/timer";
import socket from "../../../util/socket";

let testData = {
  "words": ['AARDVARK', "TESTWORD", "WORDTEST", "VAARDARK", "TESTTEST", "WORDWORD", "ESTESTTT"],
  "password": "PASSWORD",
  "tries": 4,
  "timeout": 0,
  "chance": 20,
  "header": 'text in hack header',
  "footer": 'text in hack footer'
}

if (!DEBUG) {
  testData = {};
}

const blockDevice = () => {
  socket.emit('block');
}

class Page {

  element;
  subElements = {};
  components = {};

  URL = new URL("/api/hack", HOSTURL);
  URL_MAIN = new URL("/api/main", HOSTURL);

  async initComponents() {
    const apiMainData = await getData(this.URL_MAIN) || {};
    if (Object.keys(apiMainData).length > 0) {
      if (!apiMainData.powered || apiMainData.blocked ) {
        window.location.href = "/main";
      }
    }

    const apiData = await getData(this.URL) || {};
    const data = Object.keys(apiData).length === 0
                  ? testData
                  : apiData;

    try {
      this.components.header = TextBar({message: data.header || '', navData: {"back": "/"}});
      if (data.timeout && data.timeout > 0) {
        this.components.footer = getTimer({timer: data.timeout, message: data.footer, onEnd: blockDevice});
      } else {
        this.components.footer = TextBar({message: data.footer || ''});
      }
      this.components.hack = HackScreen(data)

      this.assignTypewriters();
      return this.components;

    } catch (err) {
      console.error(err);
      await goRoot(err);
    }
  }

  assignTypewriters() {
    const headerNav = this.components.header.subElements.nav;
    const toggle = (element) => element.classList.toggle('invisible');

    toggle(headerNav);
    toggle(this.components.hack.element);

    const headerTyper = new TypeWriter(this.components.header.subElements.main, {
                                        speed: 25,
                                        onComplete: () => toggle(headerNav)
                                      }),

          footerTyper = new TypeWriter(this.components.footer.element, {
                                        speed: 25,
                                        delay: headerTyper.delay + headerTyper.overall,
                                        onComplete: () => toggle(this.components.hack.element)
                                      });

    for (const typer of [headerTyper, footerTyper]) {
      typer.print();
    }

  }

  template() {
    return `
      <div class="page">
        <div class="content">
          <div class="content__header" data-element="header"></div>
          <div class="content__hack" data-element="hack"></div>
          <div class="content__footer" data-element="footer"></div>
        </div>
      </div>
    `;
  }

}


const getHackPage = () => {
  const hack = new Page();

  Object.assign(
    hack,
    viewMixin,
    pageMixin,
    canRenderAsyncWithComponents
  )
  return hack;
}

export default getHackPage;
