import {LitElement, html, TemplateResult, css, CSSResultGroup} from 'lit';

/**
 * Renders a simple panel.
 *
 * CSS custom properties:\
 * `--panel__background`: The panel's shorthand background property.\
 * `--panel__border`: The panel's shorthand css border css property.\
 * `--panel__border-radius`: The panel's shorthand border radius property.\
 * `--panel__box-shadow`: The panel's shorthand box shadow property.\
 * `--panel__display`: The panel's display property.\
 * `--panel__height`: The panel's height property value.\
 * `--panel__max-height`: The panel's max-height property value.\
 * `--panel__max-width`: The panel's max-width property value.\
 * `--panel__padding`: The panel's shorthand padding property.\
 * `--panel__width`: The panel's with property value.
 */
export class Panel extends LitElement {
  /** Renders the component's styles. */
  static get styles(): CSSResultGroup {
    return css`
      *, *::before, *::after {
        box-sizing: border-box;
      }

      :host {
        display: var(--panel__display, inline-block);
      }

      .panel {
        background: var(--panel__background, white);
        border: var(--panel__border, thin solid black);
        border-radius: var(--panel__border-radius, 0);
        box-shadow: var(--panel__box-shadow, none);
        display: var(--panel__display, inline-block);
        height: var(--panel__height, initial);
        max-height: var(--panel__max-height, initial);
        max-width: var(--panel__max-width, initial);
        padding: var(--panel__padding, 1rem);
        width: var(--panel__width, initial);
      }
    `;
  }

  /**
   * Renders the component's markup.
   * @returns {TemplateResult} A template.
   */
  render(): TemplateResult {
    return html`
      <div class="panel">
        <slot></slot>
      </div>
    `;
  }
}
