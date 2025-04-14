import { FC, ReactNode, useMemo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mezzanine-ui/react';
import {
  PasswordField,
  InputField,
  InputFieldProps,
  FormFieldsWrapper,
} from '@mezzanine-ui/react-hook-form-v2';
import { generatePasswordRegRxp } from '../utils/validation';
import { ActivateFormValues } from './typing';
import { PasswordHint } from '../PasswordHint';
import * as Yup from 'yup';
import Success from './Success';
import classes from './index.module.scss';

export interface ActivateFormProps {
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
   * 送出時觸發，return true 代表更新成功
   */
  onChangePassword: ({
    values,
  }: {
    values: ActivateFormValues;
  }) => Promise<boolean>;
  /**
   * 顯示帳號
   */
  account?: string;
  /**
   * 成功後返回
   */
  onBack: VoidFunction;
  /**
   * 自定義額外輸入欄位
   */
  customizedFields?: InputFieldProps[];
  /**
   * 自定義額外輸入欄位驗證
   */
  customizedSchema?: Yup.ObjectSchema<object>;
  /**
   * 是否在表單上顯示返回按鈕
   */
  showBackButtonInPanel?: boolean;
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

/**
 * 後台啟用帳號 UI 元件
 */
export const ActivateForm: FC<ActivateFormProps> = ({
  logo,
  title = '歡迎啟用帳號 請設定密碼',
  passwordLength,
  onChangePassword,
  account,
  onBack,
  customizedFields,
  customizedSchema,
  showBackButtonInPanel = false,
  passwordFieldLabel = '設定密碼',
  passwordFieldPlaceholder = '請輸入密碼',
  confirmPasswordFieldLabel = '再次輸入密碼',
  confirmPasswordFieldPlaceholder = '請再次輸入密碼',
  submitText = '確認',
  backText = '返回登入頁面',
  successText = ` 密碼設置完成！
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

  const formSchema: Yup.ObjectSchema<ActivateFormValues> = useMemo(() => {
    const baseSchema = Yup.object({
      password: Yup.string().required('必填欄位不可空白'),
      confirmPassword: Yup.string()
        .required('密碼不一致')
        .oneOf([Yup.ref('password')], '密碼不一致'),
    });

    if (customizedSchema) {
      return baseSchema.concat(customizedSchema);
    }

    return baseSchema;
  }, [customizedSchema]);

  const methods = useForm<ActivateFormValues>({
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
    async (values: ActivateFormValues) => {
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
        {customizedFields &&
          customizedFields.map((field, index) => (
            <InputField key={index} {...field} />
          ))}
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
          {showBackButtonInPanel && (
            <Button
              type="button"
              variant="text"
              size="large"
              className={classes.button}
              onClick={onBack}
            >
              {backText}
            </Button>
          )}
        </div>
      </FormFieldsWrapper>
    </div>
  );
};
