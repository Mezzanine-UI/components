import { ReactNode, FC, useMemo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mezzanine-ui/react';
import {
  PasswordField,
  FormFieldsWrapper,
} from '@mezzanine-ui/react-hook-form-v2';
import { generatePasswordRegRxp } from '../utils/validation';
import { ChangePasswordFormValues } from './typing';
import { PasswordHint } from '../PasswordHint';
import * as Yup from 'yup';
import Success from './Success';
import classes from './index.module.scss';

export interface ChangePasswordFormProps {
  /**
   * 放置 logo
   */
  logo?: ReactNode;
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
   * 送出時觸發，return true 代表更新成功
   */
  onChangePassword: ({
    values,
  }: {
    values: ChangePasswordFormValues;
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
}

const formSchema: Yup.ObjectSchema<ChangePasswordFormValues> = Yup.object({
  originPassword: Yup.string().required('必填欄位不可空白'),
  password: Yup.string().required('必填欄位不可空白'),
  confirmPassword: Yup.string()
    .required('密碼不一致')
    .oneOf([Yup.ref('password')], '密碼不一致'),
});

/**
 * 後台更換密碼 UI 元件，可搭配 modal
 */
export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  logo,
  title = '更改密碼',
  passwordLength,
  generationLimit,
  onChangePassword,
  account,
  onCancel,
  onBack,
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
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const ruleRegExp = useMemo(() => {
    if (customizedRule) {
      return customizedRule;
    }
    return passwordLength ? generatePasswordRegRxp(passwordLength) : null;
  }, [passwordLength, customizedRule]);

  const methods = useForm<ChangePasswordFormValues>({
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
    async (values: ChangePasswordFormValues) => {
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
    <div className={classes.root}>
      <div className={classes.logoWrapper}>
        {logo}
        <Typography variant="h2" color="text-primary" align="center">
          {title}
        </Typography>
        {!!account && (
          <Typography
            variant="h5"
            color="text-primary"
            align="center"
            style={{ marginTop: -8 }}
          >
            {account}
          </Typography>
        )}
      </div>
      <FormFieldsWrapper
        methods={methods}
        onSubmit={onSubmit}
        className={classes.formWrapper}
      >
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
        <div className={classes.buttonsWrapper}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            loading={submitting}
            disabled={
              !(
                formSchema.isValidSync(values) &&
                (ruleRegExp ? ruleRegExp.test(values.password) : true)
              ) || submitting
            }
          >
            {submitText}
          </Button>
          <Button type="button" variant="text" size="large" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </FormFieldsWrapper>
    </div>
  );
};
