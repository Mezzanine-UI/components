import { FC } from 'react';
import { Typography } from '@mezzanine-ui/react';
import { Size } from '@mezzanine-ui/system/size';
import { InputField, UploadImageField } from '@mezzanine-ui/react-hook-form-v2';
import { Divider } from '../../Divider';
import { Hints } from '../../Hints';
import classes from './index.module.scss';

export interface ArticleShareFormProps {
  /**
   * 基本資訊標題
   */
  sectionTitle?: string;
  /**
   * 上傳封面標題
   */
  uploadSectionTitle?: string;
  /**
   * 中文標題 field 設定
   */
  twTitle?: {
    registerName: string;
    size?: Size;
    label: string;
    placeholder?: string;
    maxLength?: number;
    hints?: string[];
    required?: boolean;
  };
  /**
   * 英文標題 field 設定
   */
  enTitle?: {
    registerName: string;
    size?: Size;
    label: string;
    placeholder?: string;
    maxLength?: number;
    hints?: string[];
    required?: boolean;
  };
  /**
   * 中文作者 field 設定
   */
  twAuthor?: {
    registerName: string;
    size?: Size;
    label: string;
    placeholder?: string;
    maxLength?: number;
    hints?: string[];
    required?: boolean;
  };
  /**
   * 英文作者 field 設定
   */
  enAuthor?: {
    registerName: string;
    size?: Size;
    label: string;
    placeholder?: string;
    maxLength?: number;
    hints?: string[];
    required?: boolean;
  };
  /**
   * 封面 field 設定
   */
  cover?: {
    width?: number;
    height?: number;
    registerName: string;
    label: string;
    setFileUrl: (fileId: string) => string;
    objectFit?: 'contain' | 'cover';
    limit?: number;
    upload: (file: File) => Promise<{ id: string }>;
    required?: boolean;
  };
  /**
   * 中文 alt field 設定
   */
  twAlt?: {
    registerName: string;
    size?: Size;
    label: string;
    placeholder?: string;
    maxLength?: number;
    hints?: string[];
    required?: boolean;
  };
  /**
   * 英文 alt field 設定
   */
  enAlt?: {
    registerName: string;
    size?: Size;
    label: string;
    placeholder?: string;
    maxLength?: number;
    hints?: string[];
    required?: boolean;
  };
  /**
   * 封面 field 提示文字
   */
  coverHints?: string[];
}

/**
 * 文章基本資訊表單
 */
export const ArticleShareForm: FC<ArticleShareFormProps> = ({
  sectionTitle = '基本資訊',
  uploadSectionTitle = '上傳封面',
  twTitle,
  enTitle,
  twAuthor,
  enAuthor,
  cover,
  twAlt,
  enAlt,
  coverHints,
}) => {
  return (
    <div className={classes.host}>
      {!!sectionTitle && (
        <Typography variant="h5" color="text-primary">
          {sectionTitle}
        </Typography>
      )}
      {twTitle && (
        <InputField
          registerName={twTitle.registerName}
          size={twTitle.size ?? 'large'}
          label={twTitle.label}
          placeholder={twTitle.placeholder}
          maxLength={twTitle.maxLength}
          hints={twTitle.hints}
          required={twTitle.required}
        />
      )}
      {enTitle && (
        <InputField
          registerName={enTitle.registerName}
          size={enTitle.size ?? 'large'}
          label={enTitle.label}
          placeholder={enTitle.placeholder}
          maxLength={enTitle.maxLength}
          hints={enTitle.hints}
          required={enTitle.required}
        />
      )}
      {(twTitle || enTitle) && <Divider />}
      {twAuthor && (
        <InputField
          registerName={twAuthor.registerName}
          size={twAuthor.size ?? 'large'}
          label={twAuthor.label}
          placeholder={twAuthor.placeholder}
          maxLength={twAuthor.maxLength}
          hints={twAuthor.hints}
          required={twAuthor.required}
        />
      )}
      {enAuthor && (
        <InputField
          registerName={enAuthor.registerName}
          size={enAuthor.size ?? 'large'}
          label={enAuthor.label}
          placeholder={enAuthor.placeholder}
          maxLength={enAuthor.maxLength}
          hints={enAuthor.hints}
          required={enAuthor.required}
        />
      )}
      {(twAuthor || enAuthor) && <Divider />}
      {!!uploadSectionTitle && (
        <Typography variant="h5" color="text-primary">
          {uploadSectionTitle}
        </Typography>
      )}
      {cover && (
        <UploadImageField
          registerName={cover.registerName}
          label={cover.label}
          limit={cover.limit}
          width={cover.width}
          height={cover.height}
          objectFit={cover.objectFit}
          setFileUrl={cover.setFileUrl}
          upload={cover.upload}
          required={cover.required}
        />
      )}
      {(twAlt || enAlt) && (
        <div className={classes.altFieldsWrapper}>
          {twAlt && (
            <InputField
              registerName={twAlt.registerName}
              className={classes.altField}
              size={twAlt.size ?? 'large'}
              label={twAlt.label}
              placeholder={twAlt.placeholder}
              maxLength={twAlt.maxLength}
              hints={twAlt.hints}
              required={twAlt.required}
            />
          )}
          {enAlt && (
            <InputField
              registerName={enAlt.registerName}
              className={classes.altField}
              size={enAlt.size ?? 'large'}
              label={enAlt.label}
              placeholder={enAlt.placeholder}
              maxLength={enAlt.maxLength}
              hints={enAlt.hints}
              required={enAlt.required}
            />
          )}
        </div>
      )}
      {coverHints && coverHints.length > 0 && <Hints hints={coverHints} />}
    </div>
  );
};
