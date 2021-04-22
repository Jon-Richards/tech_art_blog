import {LitElement, html, css, TemplateResult, CSSResult} from 'lit-element';
import {resetUserAgentStyles} from './reset_user_agent_styles';

/**
 * CSS delivery mechanism for general HTML copy.
 */
export class Copy extends LitElement {
  /**
   * Renders the styles.
   * @returns The rendered styles.
   */
  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }

      ${resetUserAgentStyles()}

      ::slotted(p) {
        margin-bottom: 1rem;
        line-height: 1.5;
      }
    `;
  }

  /**
   * Renders the paragraph to the page.
   * @returns The rendered template.
   */
  render(): TemplateResult {
    return html`
      <p>
        This is some content in a paragraph tag.
      </p>
      <p>
        And this is more content.
      </p>
      <slot></slot>
    `;
  }
}
