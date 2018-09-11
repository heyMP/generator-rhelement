import { LitElement, html } from '@polymer/lit-element'

/**
 * `<%= elementName %>`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class <%= elementClassName %> extends LitElement {
  _render() {
    return html`
      <h1>hey there <slot></slot>!</h1>
    `
  }
}

window.customElements.define('<%= elementName %>', <%= elementClassName %>);
