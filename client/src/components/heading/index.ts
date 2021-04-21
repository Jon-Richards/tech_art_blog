import {
  LitElement,
  html,
  TemplateResult,
  CSSResult,
} from 'lit-element';
import {ifDefined} from 'lit-html/directives/if-defined.js';
import {validateLevel} from './validators';
import {renderStyles} from './styles';

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
 * **CSS Custom Properties**\
 * `--color` The text color of the anchor element when NOT a link.\
 * `--border-bottom` The style of the border at beneath the heading's
 * text.\
 * `--font-family` The component's font family.\
 * `--font-size` The component's font size.\
 * `--glyph-offset` The offset of the glyph that appears when the user focuses
 * or hovers over the link.\
 * `--line-height` The heading's line height property.
 * `--link-border-bottom` The style of the bottom border when the heading is a
 * link.\
 * `--link-color` The text color of the anchor element when a link.\
 * `--link-hover-border-bottom` The style of the border when the link is hovered
 * over or focused on.\
 * `--link-hover-color` The text color when the link is hovered.\
 * `--link-hover-glyph-visibility` The visibility property for the glyph that
 * appears when the link is hovered over or focused on.\
 * `--padding-bottom` The amount of padding between the heading's text and the
 * border beneath it.
 */
export class Heading extends LitElement {
  level: number;
  slug?: string;

  /** Constructor */
  constructor() {
    super();
    this.level = 1;
    this.slug = undefined;
  }

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
   * Sets the CSS styles for this component.
   * @returns The computed styles.
   */
  static get styles(): CSSResult {
    return renderStyles();
  }

  /**
   * @returns The rendered HTML.
   */
  render(): TemplateResult {
    return html`
      <a
        class="anchor ${this.slug ? 'anchor--has-slug' : ''}"
        href="#${ifDefined(this.slug ?? this.slug)}"
      >
        ${this.computeHeadingTag(html`<slot></slot>`)}
        <div class="glyph" aria-hidden="true">&#35;</div>
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
        return html`
          <h2 id="${ifDefined(this.slug ?? this.slug)}" class="heading">
            ${content}
          </h2>
        `;
      case 3:
        return html`
          <h3 id="${ifDefined(this.slug ?? this.slug)}" class="heading">
            ${content}
          </h3>
        `;
      case 4:
        return html`
          <h4 id="${ifDefined(this.slug ?? this.slug)}" class="heading">
            ${content}
          </h4>
        `;
      case 5:
        return html`
          <h5 id="${ifDefined(this.slug ?? this.slug)}" class="heading">
            ${content}
          </h5>
        `;
      case 6:
        return html`
          <h6 id="${ifDefined(this.slug ?? this.slug)}" class="heading">
            ${content}
          </h6>
        `;
      default:
        return html`
          <h1 id="${ifDefined(this.slug ?? this.slug)}" class="heading">
            ${content}
          </h1>
        `;
    }
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
}
