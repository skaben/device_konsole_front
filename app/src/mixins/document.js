import { canDestroyComponents, canRenderComponents } from './page';
import { canRenderAsyncWithComponents } from './render';
import { canGetSubElements, canRemove, canShow } from './view';
import TextBar from '../views/components/elements/textbar';
import Timer from '../views/components/elements/timer';

const documentMixin = {
  components: {},
  nav: {"назад": "/back"}
}

const canInitTimer = {
  initTimer({footer, header} = {}) {
    const headerMessage = header || `:: запрошен документ ${this.name}`,
          footerMessage = footer || 'интерфейс заблокирован ... ';
    if (this.timer && this.timer > 0) {
      this.nav = {};
      this.components['footer'] = new Timer({timer: this.timer, message: footerMessage});
    }
    this.components['header'] = new TextBar({message: headerMessage, navData: this.nav});
  }
}

Object.assign(
  documentMixin,
  canInitTimer,
  canRenderComponents,
  canDestroyComponents,
  canGetSubElements,
  canRemove,
  canShow
)

export {
  documentMixin,
  canInitTimer,
  canRenderAsyncWithComponents
}
