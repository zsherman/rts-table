export interface Column {
  header: string;
  accessor?: string;
  renderer?: React.ComponentType<any>;
  style?: React.CSSProperties;
}

export interface LoaderProps {
  isLoading: boolean;
}
