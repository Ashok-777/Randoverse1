export interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  gameName: string;
}
