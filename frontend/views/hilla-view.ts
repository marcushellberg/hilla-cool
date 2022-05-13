import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { View } from './view';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { PersonEndpoint } from 'Frontend/generated/endpoints';
import { GridActiveItemChangedEvent } from '@vaadin/vaadin-grid';
import { Binder, field } from '@hilla/form';
import PersonModel from 'Frontend/generated/com/example/application/data/entity/PersonModel';

@customElement('hilla-view')
export class HillaView extends View {
  @property() name = '';
  @state() people: Person[] = [];
  @state() selected?: Person;
  binder = new Binder(this, PersonModel);

  async connectedCallback() {
    super.connectedCallback();
    this.people = await PersonEndpoint.findAll();

    PersonEndpoint.getNames().onNext((name) => (this.name = name));
  }

  activeItemChanged(e: GridActiveItemChangedEvent<Person>) {
    this.selected = e.detail.value;
    if (this.selected) {
      this.binder.read(this.selected);
    } else {
      this.binder.clear();
    }
  }

  async save() {
    const saved = await this.binder.submitTo(PersonEndpoint.save);
    if (saved) {
      this.people = this.people.map((p) => (p.id === saved.id ? saved : p));
      this.binder.clear();
      this.selected = undefined;
    }
  }

  get filteredPeople() {
    const regexp = new RegExp(this.name, 'i');
    return this.people.filter((p) =>
      `${p.firstName} ${p.lastName}`.match(regexp)
    );
  }

  render() {
    const { model } = this.binder;
    return html`
      <h1>Hello, ${this.name || 'world'}!</h1>

      <vaadin-text-field
        label="Name"
        clear-button-visible
        .value=${this.name}
        @input=${(e: any) => (this.name = e.target.value)}></vaadin-text-field>

      <vaadin-grid
        .items=${this.filteredPeople}
        @active-item-changed=${this.activeItemChanged}
        .selectedItems=${[this.selected]}>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>

      <div
        class="grid grid-cols-2 gap-m items-baseline"
        ?hidden=${!this.selected}>
        <vaadin-text-field
          label="First Name"
          ${field(model.firstName)}></vaadin-text-field>
        <vaadin-text-field
          label="Last Name"
          ${field(model.lastName)}></vaadin-text-field>
        <vaadin-email-field
          label="Email"
          ${field(model.email)}></vaadin-email-field>
        <vaadin-button theme="primary" @click=${this.save}>Save</vaadin-button>
      </div>
    `;
  }
}
