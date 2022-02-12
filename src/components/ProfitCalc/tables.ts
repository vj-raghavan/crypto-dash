import { screen, within, getRoles } from "@testing-library/react";
import type { ByRoleOptions } from "@testing-library/react";
import type { LiteralUnion } from "type-fest";

const getRole = (el: HTMLElement): React.AriaRole => {
  const roles = getRoles(el);

  return Object.keys(roles)[0];
};

const getSpan = (cell: HTMLElement, dir: "col" | "row"): number => {
  const spanAttribute =
    cell.getAttribute(`aria-${dir}span`) ?? cell.getAttribute(`${dir}span`);

  return JSON.parse(spanAttribute ?? "1") as number;
};

const getHeaderScope = (
  header: HTMLElement,
  role: "rowheader" | "columnheader"
) => {
  const { scope = "" } = header as HTMLTableCellElement;

  const defaultScopesByRole = {
    rowheader: "row",
    columnheader: "col",
  };

  return scope || defaultScopesByRole[role];
};

const getClosestTable = (cell: HTMLElement) => {
  return cell.closest(
    'table:not([role]),[role="table"],[role="grid"]'
  ) as HTMLElement | null;
};

const getCellsDeclaredInRow = (row: HTMLElement): HTMLElement[] => {
  const roles = getRoles(row);

  // Avoid counting nested tables
  const nestedRows = roles.row.slice(1);
  const unorderedCells = new Set(
    ([] as HTMLElement[])
      .concat(roles.cell ?? [])
      .concat(roles.gridcell ?? [])
      .concat(roles.rowheader ?? [])
      .concat(roles.columnheader ?? [])
      .filter(
        (cell) => !nestedRows.some((nestedRow) => nestedRow.contains(cell))
      )
  );

  const orderedCells = (
    Array.from(row.querySelectorAll("*")) as HTMLElement[]
  ).filter((queriedEl) => unorderedCells.has(queriedEl));

  return orderedCells;
};

// const getRowCount = (table: HTMLElement): number => {
//   const ariaRowCount = table.getAttribute('aria-rowcount');
//   if (ariaRowCount != null) {
//     return JSON.parse(ariaRowCount) as number;
//   }

//   return within(table).queryAllByRole('row').length;
// };

// const getColCount = (table: HTMLElement): number => {
//   const ariaColCount = table.getAttribute('aria-colcount');
//   if (ariaColCount != null) {
//     return JSON.parse(ariaColCount) as number;
//   }

//   const firstRow = within(table).queryAllByRole('row')[0] as HTMLElement | undefined;
//   if (firstRow == null) {
//     return 0;
//   }

//   return getCellsDeclaredInRow(firstRow).reduce((sum, cell) => sum + getSpan(cell, 'col'), 0);
// };

// const getTableDimensions = (table: HTMLElement) => {
//   return [getRowCount(table), getColCount(table)];
// };

/**
 * @internal WARNING: Mutates cells state
 * @param cells
 * @param cell
 * @param rowIndex
 * @param columnIndex
 */
// eslint-disable-next-line no-underscore-dangle, camelcase
const __UNSAFE__addCell = (
  cells: HTMLElement[][],
  cell: HTMLElement,
  rowIndex: number,
  columnIndexInput: number
) => {
  const rowSpan = getSpan(cell, "row");
  const colSpan = getSpan(cell, "col");

  // eslint-disable-next-line no-param-reassign
  cells[rowIndex] = cells[rowIndex] ?? [];

  // If this cell is already occupied, it‘s because a previous row
  // defined a cell with a colspan greater than one
  let columnIndex = columnIndexInput;
  while (cells[rowIndex][columnIndex] != null) {
    columnIndex += 1;
  }

  for (let rowAddOffset = 0; rowAddOffset < rowSpan; rowAddOffset += 1) {
    // eslint-disable-next-line no-param-reassign
    cells[rowIndex + rowAddOffset] = cells[rowIndex + rowAddOffset] ?? [];

    for (
      let columnAddOffset = 0;
      columnAddOffset < colSpan;
      columnAddOffset += 1
    ) {
      // eslint-disable-next-line no-param-reassign
      cells[rowIndex + rowAddOffset][columnIndex + columnAddOffset] = cell;
    }
  }
};

const getTableLayout = (table: HTMLElement): HTMLElement[][] => {
  const tableCells = [] as HTMLElement[][];

  const rows = within(table).queryAllByRole("row");
  if (rows == null) {
    return [[]];
  }

  rows
    // Filter nested rows
    .filter(
      (row) =>
        !rows.some((nestedRow) => row !== nestedRow && row.contains(nestedRow))
    )
    .forEach((row, semanticRowIndex) => {
      const ariaRowIndex = JSON.parse(
        row.getAttribute("aria-rowindex") ?? (semanticRowIndex + 1).toString()
      );

      // Determine the row index and ensure an array exists there
      const rowIndex = ariaRowIndex - 1;

      let semanticColumnIndex = 0;
      getCellsDeclaredInRow(row).forEach((declaredCell) => {
        const ariaColumnIndex = JSON.parse(
          declaredCell.getAttribute("aria-colindex") ??
            (semanticColumnIndex + 1).toString()
        );

        const columnIndex = ariaColumnIndex - 1;
        __UNSAFE__addCell(tableCells, declaredCell, rowIndex, columnIndex);

        semanticColumnIndex += getSpan(declaredCell, "col");
      });
    });

  return tableCells;
};

const getCellStartIndices = (
  tableLayout: HTMLElement[][],
  cell: HTMLElement
): [number, number] => {
  let columnIndex = -1;
  const rowIndex = tableLayout.findIndex((row) => {
    const cellIndex = row.findIndex((layoutCell) => layoutCell === cell);

    const foundCell = cellIndex >= 0;
    if (columnIndex < 0 && foundCell) {
      columnIndex = cellIndex;
    }

    return foundCell;
  });

  return [rowIndex, columnIndex];
};

const getCellEndIndices = (
  startIndices: [number, number],
  cell: HTMLElement
) => {
  return [
    startIndices[0] + getSpan(cell, "row") - 1,
    startIndices[1] + getSpan(cell, "col") - 1,
  ];
};

const getHeaders = (cell: HTMLElement) => {
  const table = getClosestTable(cell);
  if (table == null) {
    return {
      headers: [],
      row: [],
      column: [],
    };
  }

  const headers = (cell as HTMLTableCellElement).headers
    .split(" ")
    .filter(Boolean)
    .map((headerId) => table.querySelector(`#${headerId}`))
    .filter(Boolean) as HTMLElement[];

  const tableLayout = getTableLayout(table);

  const [declaredRowIndex, declaredColumnIndex] = getCellStartIndices(
    tableLayout,
    cell
  );
  const rowSpan = getSpan(cell, "row");
  const columnSpan = getSpan(cell, "col");

  const relevantRowHeaders = new Set<HTMLElement>();
  for (
    let rowIndex = declaredRowIndex;
    rowIndex < declaredRowIndex + rowSpan;
    rowIndex += 1
  ) {
    const relevantRowHeadersForRow = tableLayout[rowIndex]
      .filter((_, columnIndex) => columnIndex < declaredColumnIndex)
      .filter((cellInRow) => getRole(cellInRow) === "rowheader")
      .filter((rowHeader) => {
        const [declarationRowIndex] = getCellStartIndices(
          tableLayout,
          rowHeader
        );

        // Ensure that if this is a row header that it is either
        // declared in this row or has scope="rowgroup"
        return (
          declarationRowIndex === declaredRowIndex ||
          getHeaderScope(rowHeader, "rowheader") === "rowgroup"
        );
      });

    relevantRowHeadersForRow.forEach((rowHeader) =>
      relevantRowHeaders.add(rowHeader)
    );
  }

  const relevantColumnHeaders = new Set<HTMLElement>();
  for (
    let columnIndex = declaredColumnIndex;
    columnIndex < declaredColumnIndex + columnSpan;
    columnIndex += 1
  ) {
    const cellsInColumn = tableLayout.map((row) => row[declaredColumnIndex]);
    const relevantColumnHeadersForColumn = cellsInColumn
      .filter((_, rowIndex) => rowIndex < declaredRowIndex)
      .filter((cellInColumn) => getRole(cellInColumn) === "columnheader")
      .filter((columnHeader) => {
        const [, columnHeaderDeclarationIndex] = getCellStartIndices(
          tableLayout,
          columnHeader
        );

        // Ensure that if this is a row header that it is either
        // declared in this row or has scope="colgroup"
        return (
          columnHeaderDeclarationIndex === declaredColumnIndex ||
          getHeaderScope(columnHeader, "columnheader") === "colgroup"
        );
      });

    relevantColumnHeadersForColumn.forEach((columnHeader) =>
      relevantColumnHeaders.add(columnHeader)
    );
  }

  return {
    headers,
    row: Array.from(relevantRowHeaders),
    column: Array.from(relevantColumnHeaders),
  };
};

const queryAllByHeader = (
  header: HTMLElement,
  role: "rowheader" | "columnheader"
) => {
  const table = getClosestTable(header);
  if (table == null) {
    return [];
  }

  const tableLayout = getTableLayout(table);

  if (tableLayout.length < 1) {
    return [];
  }

  let rowMask = new Array(tableLayout.length).fill(true);
  let columnMask = new Array(tableLayout[0].length).fill(true);

  const startIndices = getCellStartIndices(tableLayout, header);
  const endIndices = getCellEndIndices(startIndices, header);

  if (role === "rowheader") {
    const rowHeader = header;

    rowMask = rowMask.map((rowMaskCell, rowIndex) => {
      if (!rowMaskCell) {
        return false;
      }

      if (getHeaderScope(rowHeader, "rowheader") !== "rowgroup") {
        return rowIndex === startIndices[0];
      }

      return rowIndex >= startIndices[0] && rowIndex <= endIndices[0];
    });

    // Remove columns before header
    columnMask = columnMask.map((columnMaskCell, columnIndex) => {
      if (!columnMaskCell) {
        return false;
      }

      return columnIndex > endIndices[1];
    });
  }

  if (role === "columnheader") {
    const columnHeader = header;

    columnMask = columnMask.map((columnMaskCell, columnIndex) => {
      if (!columnMaskCell) {
        return false;
      }

      if (getHeaderScope(columnHeader, "columnheader") !== "colgroup") {
        return columnIndex === startIndices[1];
      }

      return columnIndex >= startIndices[1] && columnIndex <= endIndices[1];
    });

    // Remove rows before header
    rowMask = rowMask.map((rowMaskCell, rowIndex) => {
      if (!rowMaskCell) {
        return false;
      }

      return rowIndex > endIndices[0];
    });
  }

  const relevantCellsByHeadersAttribute = header.id
    ? Array.from(table.querySelectorAll("[headers]")).filter((cell) => {
        const { headers } = cell as HTMLTableCellElement;
        if (!headers) {
          return false;
        }

        return headers.split(" ").filter(Boolean).includes(header.id);
      })
    : [];

  const relevantCells = new Set<HTMLElement>(
    relevantCellsByHeadersAttribute as HTMLElement[]
  );
  for (let rowIndex = 0; rowIndex < tableLayout.length; rowIndex += 1) {
    for (
      let columnIndex = 0;
      columnIndex < tableLayout[0].length;
      columnIndex += 1
    ) {
      const cell = tableLayout[rowIndex][columnIndex];

      if (rowMask[rowIndex] && columnMask[columnIndex]) {
        relevantCells.add(cell);
      }
    }
  }

  return Array.from(relevantCells);
};

export interface ByTableHeaderOptions {
  scope?: LiteralUnion<"row" | "col" | "rowgroup" | "colgroup", string>;
}

export function queryAllByTableHeader(
  name: ByRoleOptions["name"],
  { scope }: ByTableHeaderOptions = {}
): HTMLElement[] {
  const relevantRoles = [
    scope == null || scope === "row" || scope === "rowgroup"
      ? "rowheader"
      : null,
    scope == null || scope === "col" || scope === "colgroup"
      ? "columnheader"
      : null,
  ].filter(Boolean) as ("rowheader" | "columnheader")[];

  return relevantRoles.flatMap((role) => {
    try {
      const relevantHeaders = screen
        .queryAllByRole(role, { name })
        .filter((header) => {
          if (scope == null) {
            return true;
          }

          return scope === getHeaderScope(header as HTMLTableCellElement, role);
        });

      return relevantHeaders.flatMap((header) =>
        queryAllByHeader(header, role)
      );
    } catch {
      return [];
    }
  });
}

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function display(context: jest.MatcherContext, value: unknown) {
  return typeof value === "string"
    ? value
    : context.utils.stringify(value as any);
}

/** TODO */
function redent(text: string, indent?: number) {
  return text;
}

function getMessage(
  context: jest.MatcherContext,
  matcher: string,
  expectedLabel: string,
  expectedValue: string,
  receivedLabel: string,
  receivedValue: string
) {
  return [
    matcher,
    "",
    `${expectedLabel}:\n${context.utils.EXPECTED_COLOR(
      redent(display(context, expectedValue), 2)
    )}`,
    "",
    `${receivedLabel}:\n${context.utils.RECEIVED_COLOR(
      redent(display(context, receivedValue), 2)
    )}`,
  ].join("\n");
}

export interface ToHaveTableHeaderMatcherOptions {
  scope?: LiteralUnion<"row" | "col" | "rowgroup" | "colgroup", string>;
  normalizeWhitespace?: boolean;
}

function toHaveTableHeader(
  this: jest.MatcherContext,
  node: unknown,
  text: string | RegExp | ReturnType<typeof expect.stringContaining>,
  { scope, normalizeWhitespace = true }: ToHaveTableHeaderMatcherOptions = {}
) {
  if ((node as HTMLElement | undefined)?.ownerDocument?.defaultView == null) {
    throw new Error(`Expected an HTMLElement in the document`);
  }

  const element = node as HTMLElement;
  const allHeaders = getHeaders(element);

  const relevantHeadersLookup = {
    row: allHeaders.row,
    rowgroup: allHeaders.row,
    col: allHeaders.column,
    colgroup: allHeaders.column,
  };

  const scopeFilters = {
    row: (value: HTMLTableCellElement) => !value.scope || value.scope === "row",
    rowgroup: (value: HTMLTableCellElement) => value.scope === "rowgroup",
    col: (value: HTMLTableCellElement) => !value.scope || value.scope === "col",
    colgroup: (value: HTMLTableCellElement) => value.scope === "colgroup",
  };

  type ScopeFiltersKey = keyof typeof scopeFilters;

  const scopedHeaders = Array.from(
    new Set(
      scope != null
        ? (
            relevantHeadersLookup[
              scope as ScopeFiltersKey
            ] as HTMLTableCellElement[]
          ).filter(scopeFilters[scope as ScopeFiltersKey])
        : [...allHeaders.row, ...allHeaders.column, ...allHeaders.headers]
    )
  );

  const headersTextContent = scopedHeaders.map((header) => {
    return normalizeWhitespace
      ? normalize(header.textContent ?? "")
      : header.textContent?.replace(/\u00a0/g, " "); // Replace &nbsp; with normal spaces
  });

  const pass = headersTextContent.some((textContent) => {
    if (text instanceof RegExp) {
      return text.test(textContent ?? "");
    }

    return textContent === String(text);
  });

  return {
    pass,
    message: () => {
      const to = this.isNot ? "not to" : "to";
      const expected = text instanceof RegExp ? text.toString() : `'${text}'`;

      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveTableHeader.name}`,
          "cell",
          expected
        ),
        `Expected element ${to} have ${scope ?? "table"} header`,
        expected,
        "Received",
        JSON.stringify(headersTextContent, null, 2)
      );
    },
  };
}

expect.extend({
  toHaveTableHeader,
});
