export interface Column {
  header: string;
  accessor?: string;
  renderer?: React.ComponentType<any>;
  style?: React.CSSProperties;
  width?: number | string;
}

export interface LoaderProps {
  isLoading: boolean;
}
