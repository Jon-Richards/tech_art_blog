import {
  LitElement,
  html,
  TemplateResult,
} from 'lit-element';
import {validateLevel} from './validators';

type HeadingProps = {
  level: {
    type: NumberConstructor,
    attribute: string
  }
}

/**
 * Renders linkable HTML Heading tags.
 */
export class Heading extends LitElement {
  /**
   * Defines the Heading component's external API.
   */
  static get properties(): HeadingProps {
    return {
      level: {
        type: Number,
        attribute: 'level',
      },
    };
  }

  /**
   * Lifecycle method that fires when an attribute on this component's HTML
   * tag changes.
   * @param name The name of the updated attribute.
   * @param old The attribute's old value.
   * @param value The attribute's new value.
   * @returns void.
   * @see https://lit-element.polymer-project.org/guide/lifecycle
   */
  attributeChangedCallback(
      name: string,
      old: string|null,
      value: string|null
  ): void {
    super.attributeChangedCallback(name, old, value);
    if (name === 'level') validateLevel(value);
  }

  /**
   * @returns The rendered HTML.
   */
  render(): TemplateResult {
    return html`
      <h1>
        <slot></slot>
      </h1>
    `;
  }
}
