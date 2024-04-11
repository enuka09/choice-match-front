export interface ModalProps<T> {
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
  data: T;
  title: string;
  mode: "view" | "edit" | "delete";
  renderContent: (data: T) => JSX.Element;
}
