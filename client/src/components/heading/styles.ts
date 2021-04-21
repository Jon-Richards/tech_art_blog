import {css, CSSResult} from 'lit-element';

/**
 * Renders the styles for the Heading component.\
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
 * @returns The rendered styles.
 */
export function renderStyles(): CSSResult {
  return css`
    *, *::before, *::after {
      box-sizing: border-box;
    }

    a, h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;
    }

    :host {
      display: block;
    }

    .anchor {
      color: var(--color, black);
      display: block;
      position: relative;
      text-decoration: none;
    }
    .anchor:link,
    .anchor:visited {
      color: var(--link-color, blue);
    }
    .anchor--has-slug:hover,
    .anchor--has-slug:focus {
      color: var(--link-hover-color, red);
      cursor: pointer;
      text-decoration: none;
    }

    .heading {
      border-bottom: var(--border-bottom, thin solid black);
      display: block;
      font-family: var(--font-family);
      font-size: var(--font-size);
      line-height: var(--line-height);
      padding-bottom: var(--padding-bottom, 0.5rem);
    }
    .anchor--has-slug:link .heading,
    .anchor--has-slug:visited .heading {
      border-bottom: var(--link-border-bottom, thin solid blue);
    }
    .anchor--has-slug:hover .heading,
    .anchor--has-slug:focus .heading {
      border-bottom: var(--link-hover-border-bottom, thin solid red);
    }

    .glyph {
      display: inline-block;
      font-size: var(--font-size);
      position: absolute;
      right: calc(100% + var(--glyph-offset, 0.5rem));
      top: 0;
      visibility: hidden;
    }
    .anchor--has-slug:hover .glyph,
    .anchor--has-slug:focus .glyph {
      visibility: var(--link-hover-glyph-visibility, visible);
    }
  `;
}
