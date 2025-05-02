import { FC } from 'react';
import { FormFieldsWrapper } from '@mezzanine-ui/react-hook-form-v2';
import { Modal } from '@mezzanine-ui/react';
import { useForm } from 'react-hook-form';
import ModalMain from './ModalMain';
import { UploadImagesWallFormValues } from '../typing';
import { ImagesWallModalFormValues } from './typing';

interface ImagesWallModalProps {
  open: boolean;
  actionStatus: 'edit' | 'create' | '';
  temporaryImages: UploadImagesWallFormValues[];
  limit: number;
  maxLength: number;
  setFileUrl: (fileId: string) => string;
  onCancel: VoidFunction;
  onConfirm: (values: UploadImagesWallFormValues[]) => void;
  upload: (file: File) => Promise<{ id: string }>;
  objectFit: 'cover' | 'contain';
  modalTexts?: {
    fileExceededLimit?: (file: File, limit: number) => string;
    fileUploadFailed?: (file: File) => string;
    currentImageLength?: (currentSize: number, maxLength: number) => string;
    editModalHeaderText?: string;
    createModalHeaderText?: string;
    editModalConfirmText?: string;
    createModalConfirmText?: string;
    emptyGalleryText?: string;
    modalActionCancelText?: string;
    modalActionUploadText?: string;
  };
}

const ImagesWallModal: FC<ImagesWallModalProps> = ({
  open,
  actionStatus,
  temporaryImages,
  limit,
  maxLength,
  setFileUrl,
  onCancel,
  onConfirm,
  upload,
  objectFit,
  modalTexts,
}) => {
  const methods = useForm<ImagesWallModalFormValues>();

  return (
    <Modal
      disableCloseOnBackdropClick
      onClose={onCancel}
      open={open}
      style={{ width: 1056 }}
    >
      <FormFieldsWrapper methods={methods}>
        <ModalMain
          actionStatus={actionStatus}
          temporaryImages={temporaryImages}
          limit={limit}
          maxLength={maxLength}
          setFileUrl={setFileUrl}
          onCancel={onCancel}
          onConfirm={onConfirm}
          upload={upload}
          objectFit={objectFit}
          texts={modalTexts}
        />
      </FormFieldsWrapper>
    </Modal>
  );
};

export default ImagesWallModal;
