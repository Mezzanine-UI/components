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

interface ChangePasswordModalProps {
  logo: ReactNode;
  passwordLength: number;
  generationLimit?: number;
  showGenerationLimitHint?: boolean;
  onChangePassword: ({
    values,
  }: {
    values: ChangePasswordFormValues;
  }) => Promise<boolean>;
  account: string;
  onCancel: VoidFunction;
  onBack: VoidFunction;
}

const formSchema: Yup.ObjectSchema<ChangePasswordFormValues> = Yup.object({
  originPassword: Yup.string().required('必填欄位不可空白'),
  password: Yup.string().required('必填欄位不可空白'),
  confirmPassword: Yup.string()
    .required('密碼不一致')
    .oneOf([Yup.ref('password')], '密碼不一致'),
});

export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  logo,
  passwordLength,
  generationLimit,
  showGenerationLimitHint = true,
  onChangePassword,
  account,
  onCancel,
  onBack,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const ruleRegExp = useMemo(
    () => generatePasswordRegRxp(passwordLength),
    [passwordLength],
  );

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
    return <Success onBack={onBack} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.logoWrapper}>
        {logo}
        <Typography variant="h2" color="text-primary" align="center">
          更改密碼
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
          <PasswordField
            registerName="originPassword"
            label="原密碼"
            size="large"
            placeholder="請輸入密碼"
            className={classes.inputWrapper}
            inputClassName={classes.input}
            disabledErrMsg
          />
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
            {showGenerationLimitHint && generationLimit ? (
              <PasswordHint
                passwordValue={values.password}
                passwordLength={passwordLength}
                generationLimit={generationLimit}
                showGenerationLimitHint
              />
            ) : (
              <PasswordHint
                passwordValue={values.password}
                passwordLength={passwordLength}
                showGenerationLimitHint={false}
              />
            )}
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
          <Button type="button" variant="text" size="large" onClick={onCancel}>
            取消
          </Button>
        </div>
      </FormFieldsWrapper>
    </div>
  );
};
