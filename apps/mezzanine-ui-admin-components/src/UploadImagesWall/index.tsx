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
  hints?: string[];
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
  /**
   * 圖片 object-fit
   */
  objectFit?: 'contain' | 'cover';
  /**
   * 文字設定
   * * fileExceededLimit: 檔案大小超過限制時的文字
   * * fileUploadFailed: 檔案上傳失敗時的文字
   * * maxImageLengthNotice: 圖片上限文字
   * * deleteWallDialogTitle: 刪除圖輯彈窗標題
   * * deleteWallDialogChildren: 刪除圖輯彈窗內容
   * * deleteWallDialogCancelText: 刪除圖輯彈窗取消按鈕文字
   * * deleteWallDialogConfirmText: 刪除圖輯彈窗確認按鈕文字
   * * deleteWallActionText: 刪除圖輯按鈕文字
   * * editWallActionText: 編輯圖輯按鈕文字
   * * createWallActionText: 創建圖輯按鈕文字
   */
  texts?: {
    fileExceededLimit?: (file: File, limit: number) => string;
    fileUploadFailed?: (file: File) => string;
    maxImageLengthNotice?: (maxLength: number) => string;
    deleteWallDialogTitle?: string;
    deleteWallDialogChildren?: string;
    deleteWallDialogCancelText?: string;
    deleteWallDialogConfirmText?: string;
    deleteWallActionText?: string;
    editWallActionText?: string;
    createWallActionText?: string;
  };
  /**
   * 圖輯彈窗文字設定
   * * fileExceededLimit: 檔案大小超過限制時的文字
   * * fileUploadFailed: 檔案上傳失敗時的文字
   * * uploadedImagesText: 目前上傳圖片數量文字
   * * currentImageLength: 目前圖片數量文字
   * * editModalHeaderText: 編輯圖輯彈窗標題
   * * createModalHeaderText: 創建圖輯彈窗標題
   * * editModalConfirmText: 編輯圖輯彈窗確認按鈕文字
   * * createModalConfirmText: 創建圖輯彈窗確認按鈕文字
   * * emptyGalleryText: 目前尚無資料文字
   * * modalActionCancelText: 取消按鈕文字
   * * modalActionUploadText: 新增圖片按鈕文字
   */
  modalTexts?: {
    fileExceededLimit?: (file: File, limit: number) => string;
    fileUploadFailed?: (file: File) => string;
    uploadedImagesText?: (currentIndex: number, maxLength: number) => string;
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

const defaultTexts = {
  fileExceededLimit: (file: File, limit: number) =>
    `${file.name} 上傳失敗 (檔案大小超過 ${limit} MB)`,
  fileUploadFailed: (file: File) => `${file.name} 上傳失敗（檔案格式錯誤）`,
  maxImageLengthNotice: (maxLength: number) => `圖片上限 ${maxLength} 張`,
  currentImageLength: (currentSize: number, maxLength: number) =>
    `已上傳圖片：${currentSize}/${maxLength}`,
  deleteWallDialogTitle: '確認刪除此圖輯？',
  deleteWallDialogChildren:
    '圖輯將被移除，圖輯中的所有影像內容也將一併刪除，此動作無法復原。',
  deleteWallDialogCancelText: '取消',
  deleteWallDialogConfirmText: '刪除圖輯',
  deleteWallActionText: '刪除圖輯',
  editWallActionText: '編輯圖輯',
  createWallActionText: '創建圖輯',
};

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
  objectFit = 'cover',
  texts = {},
  modalTexts = {},
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { openDialog } = useDialog();

  const [modalState, setModalState] = useState<{
    open: boolean;
    actionStatus: 'edit' | 'create' | '';
  }>({
    open: false,
    actionStatus: '',
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

          setTemporaryImages((state) => [...state, fileFormValue]);
          setLoading(false);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          const errorMessage = mergedTextsContent.fileUploadFailed(f);

          Message.error(errorMessage);
        }
      });

      setModalState({
        open: true,
        actionStatus: 'create',
      });
    },
    [MAX_SIZE, limit, upload, mergedTextsContent],
  );

  const onClose = useCallback(() => {
    setTemporaryImages([]);
    setModalState({
      open: false,
      actionStatus: '',
    });
  }, []);

  const onDeleteWall = useCallback(async () => {
    const isConfirm = await openDialog({
      severity: 'error',
      title: mergedTextsContent.deleteWallDialogTitle,
      children: mergedTextsContent.deleteWallDialogChildren,
      cancelText: mergedTextsContent.deleteWallDialogCancelText,
      cancelButtonProps: {
        danger: false,
      },
      confirmText: mergedTextsContent.deleteWallDialogConfirmText,
    });

    if (isConfirm) {
      replace([]);
    }
  }, [openDialog, replace, mergedTextsContent]);

  const onEditWall = useCallback(() => {
    setModalState({
      open: true,
      actionStatus: 'edit',
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
          {mergedTextsContent.maxImageLengthNotice(maxLength)}
        </Typography>
        {fields.length > 0 ? (
          <div className={classes.imagesSection}>
            <div className={classes.wallImagesWrapper}>
              {imagesWallValue.map((i) => (
                <div key={i.fileId} className={classes.wallImageItem}>
                  <img
                    src={setFileUrl(i.fileId)}
                    alt=""
                    style={{ objectFit }}
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
                {mergedTextsContent.deleteWallActionText}
              </Button>
              <Button
                type="button"
                variant="contained"
                size="large"
                prefix={<Icon icon={EditIcon} />}
                onClick={onEditWall}
              >
                {mergedTextsContent.editWallActionText}
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
              {mergedTextsContent.createWallActionText}
            </UploadButton>
            {hints && hints.length > 0 && <Hints hints={hints} />}
          </>
        )}
      </div>
      <ImagesWallModal
        open={modalState.open}
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
        objectFit={objectFit}
        actionStatus={modalState.actionStatus}
        {...modalTexts}
      />
    </>
  );
};
