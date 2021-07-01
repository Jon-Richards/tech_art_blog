import {css, CSSResult} from 'lit-element';

/**
 * Renders the table styles.
 * @returns {CSSResult} The compiled CSS.
 */
export function renderStyles(): CSSResult {
  return css`
    table, caption, tbody, tfoot, thead, tr, th, td {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      /* stylelint-disable-next-line */
      font: inherit;
      vertical-align: baseline;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    :host {
      display: block;
      --column-background-color--even: none;
      --column-background-color--odd: none;
      
      --row-background-color--even: none;
      --row-background-color--odd: none;

      --table-cell-border: thin solid black;
      --td-padding: 1rem;
      --th-padding: 0.5rem 2rem 0.5rem 1rem;
      
      --column-heading-color: black;
      --column-heading-text-transform: none;
      --column-heading-font-weight: 400;
      
      --row-heading-color: black;
      --row-heading-text-transform: none;
      --row-heading-font-weight: 400;
    }

    .wrapper {
      display: grid;
    }

    table {
      display: block;
      height: auto;
      margin-bottom: 1rem;
      max-width: 100%;
      width: auto;
      overflow-x: auto;
      overflow-y: hidden;
    }

    caption {
      caption-side: bottom;
      font-size: 0.8rem;
      margin-top: 1rem;
    }

    tr {
      border: var(--table-cell-border);
      width: fit-content;
    }
    tr:nth-child(even) {
      background-color: var(--row-background-color--even);
    }
    tr:nth-child(even) {
      background-color: var(--row-background-color--odd);
    }

    th {
      border-right: var(--table-cell-border);
      padding: var(--th-padding);
      text-align: left;
    }
    th[scope="col"] {
      color: var(--column-heading-color);
      font-weight: var(--column-heading-weight);
      text-transform: var(--column-heading-text-transform);
    }
    th[scope="row"] {
      color: var(--row-heading-color);
      font-weight: var(--row-heading-weight);
      text-transform: var(--row-heading-text-transform);
    }

    td {
      border-right: var(--table-cell-border);
      padding: var(--td-padding);
    }
    td:nth-child(even) {
      background-color: var(--column-background-color--even);
    }
    td:nth-child(odd) {
      background-color: var(--column-background-color--odd);
    }
  `;
}
