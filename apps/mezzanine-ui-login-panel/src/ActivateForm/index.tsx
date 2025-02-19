import { ReactNode, FC, useMemo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mezzanine-ui/react';
import {
  PasswordField,
  FormFieldsWrapper,
} from '@mezzanine-ui/react-hook-form-v2';
import { generatePasswordRegRxp } from '../utils/validation';
import { ActivateFormValues } from './typing';
import { PasswordHint } from '../PasswordHint';
import * as Yup from 'yup';
import Success from './Success';
import classes from './index.module.scss';

interface ActivateFormProps {
  /**
   * 放置 logo
   */
  logo?: ReactNode;
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
   * 自定義密碼提示
   */
  customizedHint?: string;
  /**
   * 自定義密碼規則
   */
  customizedRule?: RegExp;
}

const formSchema: Yup.ObjectSchema<ActivateFormValues> = Yup.object({
  password: Yup.string().required('必填欄位不可空白'),
  confirmPassword: Yup.string()
    .required('密碼不一致')
    .oneOf([Yup.ref('password')], '密碼不一致'),
});

/**
 * 後台啟用帳號 UI 元件
 */
export const ActivateForm: FC<ActivateFormProps> = ({
  logo,
  passwordLength,
  onChangePassword,
  account,
  onBack,
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
    return <Success onBack={onBack} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.logoWrapper}>
        {logo}
        <Typography variant="h2" color="text-primary" align="center">
          歡迎啟用帳號 請設定密碼
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
            label="設定密碼"
            size="large"
            placeholder="請輸入密碼"
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
          label="再次輸入密碼"
          size="large"
          placeholder="請再次輸入密碼"
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
            確認
          </Button>
        </div>
      </FormFieldsWrapper>
    </div>
  );
};
