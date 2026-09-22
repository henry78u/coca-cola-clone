import React from "react";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
  id?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No records found.",
  className = "",
  id,
}: DataTableProps<T>) {
  return (
    <div
      id={id}
      className={`w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-black/40">
              {columns.map((col, idx) => {
                const alignClass =
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : "text-left";
                return (
                  <th
                    key={idx}
                    className={`py-4 px-6 text-xs uppercase tracking-wider font-semibold text-white/60 select-none ${alignClass} ${col.className || ""}`}
                  >
                    {col.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-sm text-white/50"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={keyExtractor(row, rowIdx)}
                  className="transition-colors hover:bg-white/[0.03] group"
                >
                  {columns.map((col, colIdx) => {
                    const alignClass =
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left";
                    return (
                      <td
                        key={colIdx}
                        className={`py-4 px-6 text-sm text-white/80 group-hover:text-white ${alignClass} ${col.className || ""}`}
                      >
                        {col.render
                          ? col.render(row, rowIdx)
                          : col.accessor
                          ? String(row[col.accessor] ?? "")
                          : null}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
