import './style.scss';
import { documentMixin, canRenderAsyncWithComponents } from '../../../../mixins/document';
import socket from '../../../../util/socket';


class InputDoc {

  constructor({
    name,
    data,
    timer
  } = props) {
    this.name = name;
    this.message = data.message || "";
    this.expected = data["require"] || "";
    this.replyOk = data["on_success"] || 'ПРОВЕРКА ПРАВИЛЬНОСТИ ВВОДА, ОЖИДАЙТЕ...';
    this.replyFail = data["on_fail"] || 'ВВОД НЕУСПЕШЕН, ОБ ИНЦИДЕНТЕ БУДЕТ ДОЛОЖЕНО';
    this.timer = timer;
  }

  onSubmit = (event) => {
    event.preventDefault();
    let success = false;
    if (this.subElements.textInput.value === this.expected) {
      success = true;
    }
    socket.emit('user-input', {'input': this.name, 'success': success});
    this.subElements.form.style.display = "none";
    if (!success) {
      this.subElements.formText.textContent = this.replyFail;
      setTimeout(() => {window.location.href = '/main'}, 2000);
    } else {
      this.subElements.formText.textContent = this.replyOk;
      setTimeout(() => {window.location.href = '/main'}, 5000);
    }
  }

  initComponents() {
    this.initTimer({header: `:: ${this.name} ...`});
    this.subElements.textInput.focus();
    this.subElements.textInput.scrollIntoView();
    this.subElements.form.addEventListener("submit", this.onSubmit);
  }

  template() {
    return `
      <div class="content">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main">
          <p data-element="formText" style="text-transform: uppercase">${this.message}</p>
          <form data-element="form" class="input-form noselect" name="user">
            <p>ПОЛЕ ВВОДА:
              <input data-element="textInput" class="user-input noselect" type="text" autofocus>
              <button type="submit" class="user-submit">Подтвердить</button>
            </p>
          </form>
        </div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

}


const getInputDoc = (props) => {
  const input = new InputDoc(props);
  Object.assign(
    input,
    documentMixin,
    canRenderAsyncWithComponents
  )
  input.render();
  return input;
}

export default getInputDoc;
