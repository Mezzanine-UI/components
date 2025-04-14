import { ReactNode, FC, useMemo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mezzanine-ui/react';
import {
  PasswordField,
  FormFieldsWrapper,
} from '@mezzanine-ui/react-hook-form-v2';
import { generatePasswordRegRxp } from '../utils/validation';
import { ResetPasswordFormValues } from './typing';
import { PasswordHint } from '../PasswordHint';
import * as Yup from 'yup';
import Success from './Success';
import classes from './index.module.scss';

export interface ResetPasswordFormProps {
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
   * 自定義密碼代數提示
   */
  generationLimitHint?: (generationLimit: number) => string;
  /**
   * 送出時觸發，return true 代表更新成功
   */
  onChangePassword: ({
    values,
  }: {
    values: ResetPasswordFormValues;
  }) => Promise<boolean>;
  /**
   * 顯示帳號
   */
  account?: string;
  /**
   * 成功後返回
   */
  onBack: VoidFunction;
  passwordFieldLabel?: string;
  passwordFieldPlaceholder?: string;
  confirmPasswordFieldLabel?: string;
  confirmPasswordFieldPlaceholder?: string;
  submitText?: string;
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

const formSchema: Yup.ObjectSchema<ResetPasswordFormValues> = Yup.object({
  password: Yup.string().required('必填欄位不可空白'),
  confirmPassword: Yup.string()
    .required('密碼不一致')
    .oneOf([Yup.ref('password')], '密碼不一致'),
});

/**
 * 後台重設密碼 UI 元件
 */
export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  logo,
  title = '密碼重置',
  passwordLength,
  generationLimit,
  generationLimitHint,
  onChangePassword,
  account,
  onBack,
  passwordFieldLabel = '設定密碼',
  passwordFieldPlaceholder = '請輸入密碼',
  confirmPasswordFieldLabel = '再次輸入密碼',
  confirmPasswordFieldPlaceholder = '請再次輸入密碼',
  submitText = '確認',
  backText = '返回登入頁面',
  successText = `密碼設置完成！
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

  const methods = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
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
    async (values: ResetPasswordFormValues) => {
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
          <Button type="button" variant="text" size="large" onClick={onBack}>
            {backText}
          </Button>
        </div>
      </FormFieldsWrapper>
    </div>
  );
};
