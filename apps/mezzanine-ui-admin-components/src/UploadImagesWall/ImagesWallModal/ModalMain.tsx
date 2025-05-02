import { FC, useCallback, useEffect, useState, useMemo } from 'react';
import {
  ModalHeader,
  ModalBody,
  ModalActions,
  UploadButton,
  Typography,
  Icon,
  Message,
} from '@mezzanine-ui/react';
import { FolderOpenIcon } from '@mezzanine-ui/icons';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ImageWallItem from './ImageWallItem';
import { UploadImagesWallFormValues } from '../typing';
import { ImagesWallModalFormValues } from './typing';
import classes from './index.module.scss';

interface ModalMainProps {
  temporaryImages: UploadImagesWallFormValues[];
  limit: number;
  maxLength: number;
  setFileUrl: (fileId: string) => string;
  onCancel: VoidFunction;
  onConfirm: (values: UploadImagesWallFormValues[]) => void;
  upload: (file: File) => Promise<{ id: string }>;
  objectFit: 'cover' | 'contain';
  actionStatus: 'edit' | 'create' | '';
  texts?: {
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

export const defaultTexts = {
  fileExceededLimit: (file: File, limit: number) =>
    `${file.name} 上傳失敗 (檔案大小超過 ${limit} MB)`,
  fileUploadFailed: (file: File) => `${file.name} 上傳失敗（檔案格式錯誤）`,
  currentImageLength: (currentSize: number, maxLength: number) =>
    `已上傳圖片：${currentSize}/${maxLength}`,
  editModalHeaderText: '編輯圖輯',
  createModalHeaderText: '創建圖輯',
  editModalConfirmText: '確認編輯',
  createModalConfirmText: '確認創建',
  emptyGalleryText: '目前尚無資料',
  modalActionCancelText: '取消',
  modalActionUploadText: '新增圖片',
};

const ModalMain: FC<ModalMainProps> = ({
  temporaryImages,
  limit,
  maxLength,
  setFileUrl,
  onCancel,
  onConfirm,
  upload,
  objectFit,
  actionStatus,
  texts = {},
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit } = useFormContext<ImagesWallModalFormValues>();
  const { fields, append, remove, replace, swap } = useFieldArray<
    ImagesWallModalFormValues,
    'images'
  >({
    name: 'images',
  });

  const MAX_SIZE = useMemo(() => limit * 1024 * 1024, [limit]); // limit MB

  const mergedTextsContent = useMemo(
    () => ({
      ...defaultTexts,
      ...texts,
    }),
    [texts],
  );

  const onUpload = useCallback(
    async (files: File[]) => {
      await files
        .filter((f) => f.size > MAX_SIZE)
        .reduce((promiseChain, f) => {
          return promiseChain.then(
            () =>
              new Promise((resolve) => {
                setTimeout(() => {
                  const errorMessage = mergedTextsContent.fileExceededLimit(
                    f,
                    limit,
                  );

                  Message.error(errorMessage);
                  resolve();
                }, 10);
              }),
          );
        }, Promise.resolve());

      const targetFiles = files.filter((f) => f.size <= MAX_SIZE);

      targetFiles.forEach(async (f) => {
        try {
          setLoading(true);
          const { id } = await upload(f);

          const fileFormValue: UploadImagesWallFormValues = {
            fileId: id,
            fileName: f.name,
          };

          append(fileFormValue);
          setLoading(false);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          const errorMessage = mergedTextsContent.fileUploadFailed(f);

          Message.error(errorMessage);
        }
      });
    },
    [MAX_SIZE, limit, upload, append, mergedTextsContent],
  );

  const getModalText = useCallback(
    (type: 'header' | 'confirm') => {
      if (actionStatus === 'edit') {
        return type === 'header'
          ? mergedTextsContent.editModalHeaderText
          : mergedTextsContent.editModalConfirmText;
      }
      return type === 'header'
        ? mergedTextsContent.createModalHeaderText
        : mergedTextsContent.createModalConfirmText;
    },
    [actionStatus, mergedTextsContent],
  );

  const modalTexts = useMemo(
    () => ({
      header: getModalText('header'),
      confirm: getModalText('confirm'),
    }),
    [getModalText],
  );

  useEffect(() => {
    replace(temporaryImages);
  }, [replace, temporaryImages]);

  return (
    <>
      <ModalHeader>{modalTexts.header}</ModalHeader>
      <DndProvider backend={HTML5Backend}>
        <ModalBody className={classes.modalBody}>
          <Typography variant="h6" color="text-secondary">
            {mergedTextsContent.currentImageLength(fields.length, maxLength)}
          </Typography>
          {fields.length > 0 ? (
            <div className={classes.wallWrapper}>
              {fields.map((f, index) => (
                <ImageWallItem
                  key={`${f.id}-${index}`}
                  registerName={`images.${index}`}
                  setFileUrl={setFileUrl}
                  onRemove={() => {
                    remove(index);
                  }}
                  swap={swap}
                  index={index}
                  objectFit={objectFit}
                />
              ))}
            </div>
          ) : (
            <div className={classes.placeholder}>
              <Icon icon={FolderOpenIcon} size={48} color="action-inactive" />
              <Typography variant="h3" color="text-secondary">
                {mergedTextsContent.emptyGalleryText}
              </Typography>
            </div>
          )}
        </ModalBody>
      </DndProvider>
      <ModalActions
        cancelText={mergedTextsContent.modalActionCancelText}
        confirmText={modalTexts.confirm}
        cancelButtonProps={{
          type: 'button',
          size: 'large',
          variant: 'outlined',
        }}
        confirmButtonProps={{
          type: 'button',
          size: 'large',
          variant: 'contained',
          disabled: fields.length > maxLength,
        }}
        onCancel={onCancel}
        onConfirm={handleSubmit((values: ImagesWallModalFormValues) => {
          onConfirm(values.images);
        })}
      >
        <UploadButton
          type="button"
          size="large"
          variant="contained"
          multiple
          accept=".jpg, .png"
          loading={loading}
          disabled={fields.length >= maxLength}
          onUpload={onUpload}
        >
          {mergedTextsContent.modalActionUploadText}
        </UploadButton>
      </ModalActions>
    </>
  );
};

export default ModalMain;
