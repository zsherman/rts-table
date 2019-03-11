export interface Column<TData extends object> {
  header: string;
  accessor?: Extract<keyof TData, string>;
  renderer?: React.ComponentType<any>;
  style?: React.CSSProperties;
  width?: number | string;
}

export interface LoaderProps {
  isLoading: boolean;
}
