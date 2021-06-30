import {
  LitElement,
  html,
  TemplateResult,
  CSSResult,
  PropertyDeclarations,
} from 'lit-element';
import {renderStyles} from './styles';

type TableBodyRow = {
  hasHeading: boolean,
  cells: Array<string>;
}

/**
 * Renders an HTML table.
 * @example
 * <my-table
 *  data-head="[
 *    'Heading For Column 1',
 *    'Heading For Column 2',
 *    'Heading For Column 3',
 *  ]"
 *  data-body="[
 *    {
 *      hasHeading: true,
 *      cells: [
 *        'This will render as a row heading.',
 *        'This is cell two',
 *        'This is cell three',
 *      ]
 *    },
 *    {
 *      hasHeading: false,
 *      cells: [
 *        'This is not a heading, it is a normal cell.',
 *        'This is cell two',
 *        'This is cell three',
 *      ]
 *    }
 *  ]"
 *  data-caption="This is a caption."
 * ></my-table>
 */
export class Table extends LitElement {
  head: Array<string>;
  rows: Array<TableBodyRow>;
  caption: string;

  /** Properties managed by the table component. */
  static get properties(): PropertyDeclarations {
    return {
      head: {
        type: Array,
        attribute: 'data-head',
        converter: Table.propertyParser,
      },
      rows: {
        type: Array,
        attribute: 'data-rows',
        converter: Table.propertyParser,
      },
      caption: {
        type: String,
        attribute: 'data-caption',
      },
    };
  }

  /**
   * Parses attributes.
   * @param value The value to parse.
   * @returns Attribute
   */
  static propertyParser = (value: string | null): string => {
    let result = '';
    if (value !== null) result = JSON.parse(value);
    return result;
  };

  /** Constructor */
  constructor() {
    super();
    this.head = [];
    this.rows = [];
    this.caption = '';
  }

  /** Renders the component's styles. */
  static get styles(): CSSResult {
    return renderStyles();
  }

  /**
   * Renders the component's html.
   * @returns The compiled HTML.
   */
  render(): TemplateResult {
    return html`
      <div class="wrapper">
        <table>
          <caption>${this.caption}</caption>
          ${this.renderHeader()}
          ${this.renderBody()}
        </table>
      </div>
    `;
  }

  /**
   * Renders the html for the table's header.
   * @returns The rendered headings.
   */
  private renderHeader(): TemplateResult {
    return html`
      <thead>
        <tr>
          ${this.head.map((heading) => html`
            <th scope="column">${heading}</th>
          `)}
        </tr>
      </thead>
    `;
  }

  /**
   * Renders the html for the table's body.
   * @returns The rendered table body.
   */
  private renderBody(): TemplateResult {
    return html`
      <tbody>
        ${this.rows.map((row) => html`
          ${this.renderRow(row.cells, row.hasHeading)}
        `)}
      </tbody>
    `;
  }

  /**
   * Renders a single table row.
   * @param cells The cells to render.
   * @param hasHeading If the first cell is a header.
   * @returns The rendered row.
   */
  private renderRow(cells: Array<string>, hasHeading = false): TemplateResult {
    return html`
      <tr>
        ${cells.map((cell, index) => html`
          ${this.renderCell(cell, hasHeading && index === 0)}
        `)}
      </tr>
    `;
  }

  /**
   * Renders a single table cell.
   * @param text The text for the cell.
   * @param isHeading If the cell is a heading.
   * @returns The rendered cell.
   */
  private renderCell(text: string, isHeading: boolean): TemplateResult {
    let cell = html`<td>${text}</td>`;
    if (isHeading) cell = html`<th scope="row">${text}</th>`;
    return cell;
  }
}
