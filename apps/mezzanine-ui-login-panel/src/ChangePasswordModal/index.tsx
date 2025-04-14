import { FC, useMemo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Typography,
  ModalHeader,
  ModalBody,
  ModalActions,
} from '@mezzanine-ui/react';
import {
  PasswordField,
  FormFieldsWrapper,
} from '@mezzanine-ui/react-hook-form-v2';
import { generatePasswordRegRxp } from '../utils/validation';
import { ChangePasswordModalValues } from './typing';
import { PasswordHint } from '../PasswordHint';
import * as Yup from 'yup';
import Success from './Success';
import classes from './index.module.scss';

export interface ChangePasswordModalProps {
  title?: string;
  /**
   * 密碼至少需要的長度
   */
  passwordLength?: number;
  /**
   * 密碼不可與前 `number` 代重複
   */
  generationLimit?: number;
  /**
   * 自定義密碼代數提示
   */
  generationLimitHint?: (generationLimit: number) => string;
  /**
   * 送出時觸發，return true 代表更新成功
   */
  onChangePassword: ({
    values,
  }: {
    values: ChangePasswordModalValues;
  }) => Promise<boolean>;
  /**
   * 顯示帳號
   */
  account?: string;
  /**
   * 取消時觸發
   */
  onCancel: VoidFunction;
  /**
   * 成功後返回
   */
  onBack: VoidFunction;
  /**
   * 帳號欄位的 label
   */
  accountLabel?: string;
  passwordSectionTitle?: string;
  originPasswordFieldLabel?: string;
  originPasswordFieldPlaceholder?: string;
  passwordFieldLabel?: string;
  passwordFieldPlaceholder?: string;
  confirmPasswordFieldLabel?: string;
  confirmPasswordFieldPlaceholder?: string;
  submitText?: string;
  cancelText?: string;
  backText?: string;
  successText?: string;
  /**
   * 自定義密碼提示
   */
  customizedHint?: string;
  /**
   * 自定義密碼規則
   */
  customizedRule?: RegExp;
  requiredErrorMessage?: string;
  passwordErrorMessage?: string;
}

/**
 * 後台更換密碼 UI 元件，必須搭配 modal
 */
export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  title = '更改密碼',
  passwordLength,
  generationLimit,
  generationLimitHint,
  onChangePassword,
  account,
  onCancel,
  onBack,
  accountLabel = '帳號',
  passwordSectionTitle = '密碼',
  originPasswordFieldLabel = '原密碼',
  originPasswordFieldPlaceholder = '請輸入密碼',
  passwordFieldLabel = '設定密碼',
  passwordFieldPlaceholder = '請輸入密碼',
  confirmPasswordFieldLabel = '再次輸入密碼',
  confirmPasswordFieldPlaceholder = '請再次輸入密碼',
  submitText = '確認',
  cancelText = '取消',
  backText = '返回登入頁面',
  successText = `密碼更新完成！
請使用新密碼登入`,
  customizedHint,
  customizedRule,
  requiredErrorMessage = '必填欄位不可空白',
  passwordErrorMessage = '密碼不一致',
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const ruleRegExp = useMemo(() => {
    if (customizedRule) {
      return customizedRule;
    }
    return passwordLength ? generatePasswordRegRxp(passwordLength) : null;
  }, [passwordLength, customizedRule]);

  const formSchema: Yup.ObjectSchema<ChangePasswordModalValues> = useMemo(
    () =>
      Yup.object({
        originPassword: Yup.string().required(requiredErrorMessage),
        password: Yup.string().required(requiredErrorMessage),
        confirmPassword: Yup.string()
          .required(passwordErrorMessage)
          .oneOf([Yup.ref('password')], passwordErrorMessage),
      }),
    [passwordErrorMessage, requiredErrorMessage],
  );

  const methods = useForm<ChangePasswordModalValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      originPassword: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const values = methods.watch();

  const submitting = useMemo(
    () => methods.formState.isSubmitting,
    [methods.formState.isSubmitting],
  );

  const onSubmit = useCallback(
    async (values: ChangePasswordModalValues) => {
      const status = await onChangePassword({
        values,
      });

      if (status) {
        setIsSuccess(true);
      }
    },
    [onChangePassword],
  );

  if (isSuccess) {
    return (
      <Success onBack={onBack} successText={successText} backText={backText} />
    );
  }

  return (
    <FormFieldsWrapper
      methods={methods}
      onSubmit={onSubmit}
      className={classes.root}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody className={classes.modalBody}>
        {account && (
          <>
            <Typography variant="h5" color="text-primary">
              {accountLabel}
            </Typography>
            <Typography variant="h5" color="text-primary">
              {account}
            </Typography>
            <div className={classes.divider} />
          </>
        )}
        <Typography variant="h5" color="text-primary">
          {passwordSectionTitle}
        </Typography>
        <div className={classes.formWrapper}>
          <PasswordField
            registerName="originPassword"
            label={originPasswordFieldLabel}
            size="large"
            placeholder={originPasswordFieldPlaceholder}
            className={classes.inputWrapper}
            inputClassName={classes.input}
            required
            disabledErrMsg
          />
          <div className={classes.inputFieldWithHint}>
            <PasswordField
              registerName="password"
              label={passwordFieldLabel}
              size="large"
              placeholder={passwordFieldPlaceholder}
              className={classes.inputWrapper}
              inputClassName={classes.input}
              required
              disabledErrMsg
            />
            <PasswordHint
              passwordValue={values.password}
              passwordLength={passwordLength}
              generationLimit={generationLimit}
              generationLimitHint={generationLimitHint}
              customizedHint={customizedHint}
              customizedRule={customizedRule}
            />
          </div>
          <PasswordField
            registerName="confirmPassword"
            label={confirmPasswordFieldLabel}
            size="large"
            placeholder={confirmPasswordFieldPlaceholder}
            className={classes.inputWrapper}
            inputClassName={classes.input}
            required
          />
        </div>
      </ModalBody>
      <ModalActions
        cancelText={cancelText}
        confirmText={submitText}
        cancelButtonProps={{
          type: 'button',
          size: 'large',
          variant: 'outlined',
        }}
        confirmButtonProps={{
          type: 'submit',
          size: 'large',
          variant: 'contained',
          loading: submitting,
          disabled:
            !(
              formSchema.isValidSync(values) &&
              (ruleRegExp ? ruleRegExp.test(values.password) : true)
            ) || submitting,
        }}
        onCancel={onCancel}
      />
    </FormFieldsWrapper>
  );
};
