import {
  ModalProps,
  ModalHeaderProps,
  ModalActionsProps,
} from '@mezzanine-ui/react';

export type OpenDialogFunctionType = (
  config: DialogConfigType,
) => Promise<boolean>;

export interface DialogConfigType
  extends ModalProps,
    ModalHeaderProps,
    ModalActionsProps {
  children?: string;
  disableActions?: boolean;
  resolve?: (value: boolean) => void;
}

export interface DialogHookValue {
  openDialog: (config: DialogConfigType) => void | Promise<boolean>;
  openCancelConfirmDialog: (onCancel: VoidFunction) => Promise<void>;
  closeDialog: VoidFunction;
}
