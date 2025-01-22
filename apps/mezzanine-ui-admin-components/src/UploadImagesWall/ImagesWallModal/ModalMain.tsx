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
  actionText: string;
  temporaryImages: UploadImagesWallFormValues[];
  limit: number;
  maxLength: number;
  setFileUrl: (fileId: string) => string;
  onCancel: VoidFunction;
  onConfirm: (values: UploadImagesWallFormValues[]) => void;
  upload: (file: File) => Promise<{ id: string }>;
}

const ModalMain: FC<ModalMainProps> = ({
  actionText,
  temporaryImages,
  limit,
  maxLength,
  setFileUrl,
  onCancel,
  onConfirm,
  upload,
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

  const onUpload = useCallback(
    async (files: File[]) => {
      await files
        .filter((f) => f.size > MAX_SIZE)
        .reduce((promiseChain, f) => {
          return promiseChain.then(
            () =>
              new Promise((resolve) => {
                setTimeout(() => {
                  Message.error(
                    `${f.name} 上傳失敗 (檔案大小超過 ${limit} MB)`,
                  );
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
        } catch (error) {
          Message.error(`${f.name} 上傳失敗（檔案格式錯誤）`);
        }
      });
    },
    [MAX_SIZE, limit, upload, append],
  );

  useEffect(() => {
    replace(temporaryImages);
  }, [replace, temporaryImages]);

  return (
    <>
      <ModalHeader>{`${actionText}圖輯`}</ModalHeader>
      <DndProvider backend={HTML5Backend}>
        <ModalBody className={classes.modalBody}>
          <Typography variant="h6" color="text-secondary">
            {`已上傳圖片：${fields.length}/${maxLength}`}
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
                />
              ))}
            </div>
          ) : (
            <div className={classes.placeholder}>
              <Icon icon={FolderOpenIcon} size={48} color="action-inactive" />
              <Typography variant="h3" color="text-secondary">
                目前尚無資料
              </Typography>
            </div>
          )}
        </ModalBody>
      </DndProvider>
      <ModalActions
        cancelText="取消"
        confirmText={`確認${actionText}`}
        cancelButtonProps={{
          type: 'button',
          size: 'large',
          variant: 'outlined',
          style: {
            minWidth: 'unset',
          },
        }}
        confirmButtonProps={{
          type: 'button',
          size: 'large',
          variant: 'contained',
          disabled: fields.length > maxLength,
          style: {
            minWidth: 'unset',
          },
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
          新增圖片
        </UploadButton>
      </ModalActions>
    </>
  );
};

export default ModalMain;
