import { canDestroyComponents, canRenderComponents } from './page';
import { canRenderAsyncWithComponents } from './render';
import { canGetSubElements, canRemove, canShow } from './view';
import TextBar from '../views/components/elements/textbar';
import Timer from '../views/components/elements/timer';
import socket from '../util/socket';

const documentMixin = {
  components: {},
  nav: {"назад": "/back"}
}

const blockDevice = () => {
  socket.emit('block');
  window.location.href = '/main';
}

const canInitTimer = {
  initTimer({footer, header, callback} = {}) {
    const headerMessage = header || `:: запрошен документ ${this.display}`,
          footerMessage = footer || 'интерфейс будет заблокирован через: ',
          callbackOnEnd = callback || blockDevice;
    if (this.timer && this.timer > 0) {
      this.nav = {};
      this.components['footer'] = new Timer({timer: this.timer, message: footerMessage, onEnd: callbackOnEnd});
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
