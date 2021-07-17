import {
  LitElement,
  html,
  TemplateResult,
  css,
  CSSResultGroup,
  PropertyDeclarations,
} from 'lit';

export interface Image {
  href: string;
  alt: string;
}

/**
 * Renders a Card used to describe something and link to another page.
 */
export class Card extends LitElement {
  private description: string;
  private image: string;

  /**
   * Defines the component's reactive properties.
   */
  static get properties(): PropertyDeclarations {
    return {
      description: {type: String},
      image: {type: String},
    };
  }

  /** The constructor. */
  constructor() {
    super();
    this.description = '';
    this.image = '';
  }

  /**
   * Compiles the CSS used by the card.
   */
  static get styles(): CSSResultGroup {
    return css`
      *. *::before, *::after {
        box-sizing: border-box;
      }

      :host {
        display: inline-block;
      }

      jr-panel {
        --panel__padding: 0;
      }

      .image {
        max-width: 100%;
        height: auto;
      }
      
      .image img {
        max-width: 100%;
        height: auto;
      }
    `;
  }

  /**
   * Renders the card's HTML.
   * @returns The card's compiled html.
   */
  render(): TemplateResult {
    return html`
      <jr-panel>
        <div class="image">
          <img src="${this.image}">
        </div>
        <p>
          ${this.description}
        </p>
      </jr-panel>
    `;
  }
}
