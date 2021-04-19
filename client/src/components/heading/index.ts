import {
  LitElement,
  html,
  css,
  TemplateResult,
  CSSResult,
} from 'lit-element';
import {ifDefined} from 'lit-html/directives/if-defined.js';
import {validateLevel} from './validators';

type HeadingProps = {
  level: {
    type: NumberConstructor
  },
  slug: {
    type: StringConstructor
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
      },
      slug: {
        type: String,
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

  level: number;
  slug?: string;

  /** Constructor */
  constructor() {
    super();
    this.level = 1;
    this.slug = undefined;
  }

  /**
   * Sets the CSS styles for this component.
   * @returns The computed styles.
   */
  static get styles(): CSSResult {
    return css`
      *, *::before, *::after {
        box-sizing: border-box;
      }

      :host {
        display: block;
      }

      .container {
        cursor: pointer;
        display: block;
        position: relative;
      }

      h1, h2, h3, h4, h5, h6 {
        border-bottom: var(--border-bottom, thin solid black);
        display: block;
        padding-bottom: var(--padding-bottom, 0.5rem);
      }

      .copy-container {
        display: none;
        overflow: visible;
        position: absolute;
        right: var(--copy-container-offset, calc(100% + 0.5rem));
        top: 0;
      }
      .container:hover .copy-container {
        display: initial;
      }

      .copy {
        text-align: right;
      }
    `;
  }

  /**
   * @returns The rendered HTML.
   */
  render(): TemplateResult {
    return html`
      <a
        class="container"
        href="${ifDefined(this.slug ?? this.slug)}"
      >
        ${this.computeHeadingTag(html`<slot></slot>`)}
        <div class="copy-container">
          <div class="copy">this is text</div>
        </div>
      </a>
    `;
  }

  /**
   * Computes an HTML heading tag based on the provided level.  The
   * implementation details of this method are such because of how LitElement
   * resolves DOM nodes.  In short, dynamic tag generation isn't supported at
   * the type of this writing.
   *
   * @param content HTML content with which to populate the resulting tag.
   *
   * @returns A heading tag (with a slot) of the appropriate level.
   */
  private computeHeadingTag(
      content: TemplateResult
  ): TemplateResult {
    switch (this.level) {
      case 2:
        return html`<h2>${content}</h2>`;
      case 3:
        return html`<h3>${content}</h3>`;
      case 4:
        return html`<h4>${content}</h4>`;
      case 5:
        return html`<h5>${content}</h5>`;
      case 6:
        return html`<h6>${content}</h6>`;
      default:
        return html`<h1>${content}</h1>`;
    }
  }
}
