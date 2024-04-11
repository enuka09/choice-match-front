export interface Identifiable {
  _id: string;
}

export interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => JSX.Element | string;
}

export interface DataGridProps<T extends Identifiable> {
  data: T[];
  columns: Column<T>[];
  renderActions: (item: T) => JSX.Element;
}
