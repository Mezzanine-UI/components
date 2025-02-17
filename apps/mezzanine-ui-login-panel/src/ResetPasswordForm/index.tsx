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

interface ResetPasswordFormProps {
  /**
   * 放置 logo
   */
  logo: ReactNode;
  /**
   * 密碼至少需要的長度
   */
  passwordLength: number;
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
    values: ResetPasswordFormValues;
  }) => Promise<boolean>;
  /**
   * 顯示帳號
   */
  account: string;
  /**
   * 成功後返回
   */
  onBack: VoidFunction;
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
  passwordLength,
  generationLimit,
  onChangePassword,
  account,
  onBack,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const ruleRegExp = useMemo(
    () => generatePasswordRegRxp(passwordLength),
    [passwordLength],
  );

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
    return <Success onBack={onBack} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.logoWrapper}>
        {logo}
        <Typography variant="h3" color="text-primary" align="center">
          密碼重置
        </Typography>
        <Typography variant="h5" color="text-primary" align="center">
          {account}
        </Typography>
      </div>
      <FormFieldsWrapper
        methods={methods}
        onSubmit={onSubmit}
        className={classes.formWrapper}
      >
        <div className={classes.fieldsWrapper}>
          <div className={classes.inputFieldWithHint}>
            <PasswordField
              registerName="password"
              label="設定密碼"
              size="large"
              placeholder="請輸入密碼"
              className={classes.inputWrapper}
              inputClassName={classes.input}
              disabledErrMsg
            />
            <PasswordHint
              passwordValue={values.password}
              passwordLength={passwordLength}
              generationLimit={generationLimit}
            />
          </div>
          <PasswordField
            registerName="confirmPassword"
            label="確認密碼"
            size="large"
            placeholder="請輸入密碼"
            className={classes.inputWrapper}
            inputClassName={classes.input}
          />
        </div>
        <div className={classes.buttonsWrapper}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            loading={submitting}
            disabled={
              !(
                formSchema.isValidSync(values) &&
                ruleRegExp.test(values.password)
              ) || submitting
            }
          >
            確認
          </Button>
          <Button type="button" variant="text" size="large" onClick={onBack}>
            返回登入頁面
          </Button>
        </div>
      </FormFieldsWrapper>
    </div>
  );
};
