"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type ColumnDef<TData> = {
  id?: string;
  header: React.ReactNode;
  cell?: (row: TData) => React.ReactNode;
  accessor?: (row: TData) => React.ReactNode;
};

type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  className?: string;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  pageSizeOptions?: number[];
  rowActions?: (row: TData) => React.ReactNode;
  caption?: React.ReactNode;
};

export function DataTable<TData>({
  data,
  columns,
  className,
  pagination,
  onPaginationChange,
  pageSizeOptions = [10, 20, 50],
  rowActions,
  caption,
}: DataTableProps<TData>) {
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSizeOptions[0] ?? 10,
    });

  const effectivePagination = pagination ?? internalPagination;

  const handlePaginationChange = (next: PaginationState) => {
    if (onPaginationChange) {
      onPaginationChange(next);
    } else {
      setInternalPagination(next);
    }
  };

  const cols = React.useMemo(() => {
    if (!rowActions) return columns;
    return [
      ...columns,
      {
        id: "__actions__",
        header: "عملیات",
        cell: (row) => rowActions(row),
      } as ColumnDef<TData>,
    ];
  }, [columns, rowActions]);

  const totalRows = data.length;
  const startIndex =
    effectivePagination.pageIndex * effectivePagination.pageSize;
  const endIndex = Math.min(
    startIndex + effectivePagination.pageSize,
    totalRows,
  );
  const pageRows = data.slice(startIndex, endIndex);
  const start = totalRows > 0 ? startIndex + 1 : 0;
  const end = totalRows > 0 ? endIndex : 0;

  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      {caption && <div className="px-4 pt-4">{caption}</div>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-secondary text-secondary-foreground">
            <tr className="text-sm">
              {cols.map((c, i) => (
                <th key={c.id ?? i} className="px-4 py-3 text-start">
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, ri) => (
              <tr key={ri} className="border-t border-border">
                {cols.map((c, ci) => (
                  <td
                    key={(c.id ?? ci) as React.Key}
                    className="px-4 py-3 align-middle"
                  >
                    {c.cell ? c.cell(row) : c.accessor ? c.accessor(row) : null}
                  </td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td
                  className="px-4 py-8 text-center text-muted-foreground"
                  colSpan={cols.length}
                >
                  داده‌ای یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">تعداد در صفحه</span>
          <select
            className="rounded-md border border-input bg-transparent px-2 py-1 text-sm"
            value={effectivePagination.pageSize}
            onChange={(e) =>
              handlePaginationChange({
                ...effectivePagination,
                pageSize: Number((e.target as HTMLSelectElement).value),
                pageIndex: 0,
              })
            }
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-muted-foreground">
          {totalRows > 0 ? `${start}–${end} از ${totalRows}` : "0"}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground disabled:opacity-50"
            onClick={() =>
              handlePaginationChange({
                ...effectivePagination,
                pageIndex: Math.max(0, effectivePagination.pageIndex - 1),
              })
            }
            disabled={effectivePagination.pageIndex === 0}
          >
            قبلی
          </button>
          <button
            className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground disabled:opacity-50"
            onClick={() =>
              handlePaginationChange({
                ...effectivePagination,
                pageIndex:
                  endIndex >= totalRows
                    ? effectivePagination.pageIndex
                    : effectivePagination.pageIndex + 1,
              })
            }
            disabled={endIndex >= totalRows}
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}
