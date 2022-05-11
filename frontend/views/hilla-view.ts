import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { View } from './view';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';

@customElement('hilla-view')
export class HillaView extends View {
  @property() name = '';

  render() {
    return html` <h1>Hello, world!</h1> `;
  }
}
