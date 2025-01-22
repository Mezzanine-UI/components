import { FC } from 'react';
import { FormFieldsWrapper } from '@mezzanine-ui/react-hook-form-v2';
import { Modal } from '@mezzanine-ui/react';
import { useForm } from 'react-hook-form';
import ModalMain from './ModalMain';
import { UploadImagesWallFormValues } from '../typing';
import { ImagesWallModalFormValues } from './typing';

interface ImagesWallModalProps {
  open: boolean;
  actionText: string;
  temporaryImages: UploadImagesWallFormValues[];
  limit: number;
  maxLength: number;
  setFileUrl: (fileId: string) => string;
  onCancel: VoidFunction;
  onConfirm: (values: UploadImagesWallFormValues[]) => void;
  upload: (file: File) => Promise<{ id: string }>;
}

const ImagesWallModal: FC<ImagesWallModalProps> = ({
  open,
  actionText,
  temporaryImages,
  limit,
  maxLength,
  setFileUrl,
  onCancel,
  onConfirm,
  upload,
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
          actionText={actionText}
          temporaryImages={temporaryImages}
          limit={limit}
          maxLength={maxLength}
          setFileUrl={setFileUrl}
          onCancel={onCancel}
          onConfirm={onConfirm}
          upload={upload}
        />
      </FormFieldsWrapper>
    </Modal>
  );
};

export default ImagesWallModal;
