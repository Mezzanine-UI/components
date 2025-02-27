import { useContext } from 'react';
import { DialogContext } from './DialogContext';
import { DialogHookValue } from './typing';

export const useDialog = (): DialogHookValue => {
  const { openDialog: configOpenDialog, closeDialog } =
    useContext(DialogContext);

  const openDialog = ({ ...options }) =>
    new Promise<boolean>((resolver) => {
      configOpenDialog({
        resolve: resolver,
        ...options,
      });
    });

  const openCancelConfirmDialog = async (onCancel: VoidFunction) => {
    const isConfirm = await openDialog({
      title: '確認取消',
      children: '取消不會儲存內容，確定取消？',
      cancelText: '取消',
      cancelButtonProps: {
        danger: false,
      },
      confirmText: '確認取消',
      confirmButtonProps: {
        danger: false,
      },
    });

    if (isConfirm) {
      onCancel();
    }
  };

  return {
    openDialog,
    openCancelConfirmDialog,
    closeDialog,
  };
};
