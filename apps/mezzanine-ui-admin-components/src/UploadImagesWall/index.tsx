import { useCallback, useState, useMemo, FC } from 'react';
import {
  UploadButton,
  Typography,
  Button,
  Icon,
  Message,
} from '@mezzanine-ui/react';
import { EditIcon } from '@mezzanine-ui/icons';
import { useFieldArray, useWatch } from 'react-hook-form';
import { useDialog } from '../dialog/useDialog';
import { Hints } from '../Hints';
import ImagesWallModal from './ImagesWallModal';
import { UploadImagesWallFormValues } from './typing';
import classes from './index.module.scss';

export interface UploadImagesWallProps {
  /**
   * field name
   */
  registerName: string;
  /**
   * 圖片大小上限
   */
  limit: number;
  /**
   * 圖片數量上限
   */
  maxLength: number;
  /**
   * 上傳器提示文字
   */
  hints: string[];
  /**
   * 是否 disabled
   */
  disabled?: boolean;
  /**
   * 上傳時觸發
   */
  upload: (file: File) => Promise<{ id: string }>;
  /**
   * 設定圖片 url
   */
  setFileUrl: (fileId: string) => string;
}

/**
 * 後台圖輯上傳器
 */
export const UploadImagesWall: FC<UploadImagesWallProps> = ({
  registerName,
  limit,
  maxLength,
  hints,
  disabled,
  upload,
  setFileUrl,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { openDialog } = useDialog();

  const [modalState, setModalState] = useState<{
    open: boolean;
    actionText: string;
  }>({
    open: false,
    actionText: '',
  });

  const { fields, replace } = useFieldArray({
    name: registerName,
  });

  const imagesWallWatchValue: UploadImagesWallFormValues[] = useWatch({
    name: registerName,
  });

  const imagesWallValue = useMemo(
    () => imagesWallWatchValue ?? [],
    [imagesWallWatchValue],
  );

  const [temporaryImages, setTemporaryImages] =
    useState<UploadImagesWallFormValues[]>(imagesWallValue);

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

          setTemporaryImages((state) => [...state, fileFormValue]);
          setLoading(false);
        } catch (error) {
          Message.error(`${f.name} 上傳失敗（檔案格式錯誤）`);
        }
      });

      setModalState({
        open: true,
        actionText: '創建',
      });
    },
    [MAX_SIZE, limit, upload],
  );

  const onClose = useCallback(() => {
    setTemporaryImages([]);
    setModalState({
      open: false,
      actionText: '',
    });
  }, []);

  const onDeleteWall = useCallback(async () => {
    const isConfirm = await openDialog({
      severity: 'error',
      title: '確認刪除此圖輯？',
      children:
        '圖輯將被移除，圖輯中的所有影像內容也將一併刪除，此動作無法復原。',
      cancelText: '取消',
      cancelButtonProps: {
        danger: false,
      },
      confirmText: '刪除圖輯',
    });

    if (isConfirm) {
      replace([]);
    }
  }, [openDialog, replace]);

  const onEditWall = useCallback(() => {
    setModalState({
      open: true,
      actionText: '編輯',
    });
    setTemporaryImages(imagesWallValue);
  }, [imagesWallValue]);

  return (
    <>
      <div className={classes.root}>
        <Typography
          variant="h6"
          color="text-secondary"
          className={classes.limitHint}
        >
          {`圖片上限 ${maxLength} 張`}
        </Typography>
        {fields.length > 0 ? (
          <div className={classes.imagesSection}>
            <div className={classes.wallImagesWrapper}>
              {imagesWallValue.map((i) => (
                <div className={classes.wallImageItem}>
                  <img
                    src={setFileUrl(i.fileId)}
                    alt=""
                    className={classes.wallImage}
                  />
                </div>
              ))}
            </div>
            <div className={classes.actionsWrapper}>
              <Button
                type="button"
                variant="outlined"
                danger
                size="large"
                onClick={onDeleteWall}
              >
                刪除圖輯
              </Button>
              <Button
                type="button"
                variant="contained"
                size="large"
                prefix={<Icon icon={EditIcon} />}
                onClick={onEditWall}
              >
                編輯圖輯
              </Button>
            </div>
          </div>
        ) : (
          <>
            <UploadButton
              type="button"
              size="large"
              variant="outlined"
              multiple
              accept=".jpg, .png"
              onUpload={onUpload}
              loading={loading}
              disabled={disabled}
            >
              創建圖輯
            </UploadButton>
            <Hints hints={hints} />
          </>
        )}
      </div>
      <ImagesWallModal
        open={modalState.open}
        actionText={modalState.actionText}
        temporaryImages={temporaryImages}
        limit={limit}
        maxLength={maxLength}
        setFileUrl={setFileUrl}
        onCancel={onClose}
        onConfirm={(values: UploadImagesWallFormValues[]) => {
          onClose();
          replace(values);
        }}
        upload={upload}
      />
    </>
  );
};
