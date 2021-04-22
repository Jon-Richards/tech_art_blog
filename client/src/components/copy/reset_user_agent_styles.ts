import {css, CSSResult} from 'lit-element';

/**
 * Returns a CSS string consisting of resets for common user agent stylesheet
 * styles.
 * @returns Styles for resetting common user agent styles.
 */
export function resetUserAgentStyles(): CSSResult {
  return css`
    ::slotted(*, *::before, *::after) {
      box-sizing: border-box;
    }

    ::slotted(
      html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6,
      p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del,
      dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt,
      var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label,
      legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside,
      canvas, details, embed, figure, figcaption, footer, header, hgroup,
      menu, nav, output, ruby, section, summary, time, mark, audio, video
    ) {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
    }

    ::slotted(
      article, aside, details, figcaption, figure, footer, header, hgroup,
      menu, nav, section
    ) {
      display: block;
    }

    ::slotted(body) {
      line-height: 1;
    }

    ::slotted(ol, ul) {
      list-style: none;
    }

    ::slotted(blockquote, q) {
      quotes: none;
    }

    ::slotted(blockquote:before, blockquote:after, q:before, q:after) {
      content: '';
      content: none;
    }

    ::slotted(table) {
      border-collapse: collapse;
      border-spacing: 0;
    }
  `;
}
