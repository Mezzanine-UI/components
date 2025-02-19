import { ReactNode, FC, useMemo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mezzanine-ui/react';
import {
  PasswordField,
  FormFieldsWrapper,
} from '@mezzanine-ui/react-hook-form-v2';
import {
  NeedChangePasswordFormValues,
  NeedChangePasswordMode,
} from '../../typing';
import { generatePasswordRegRxp } from '../../../utils/validation';
import { PasswordHint } from '../../../PasswordHint';
import * as Yup from 'yup';
import Success from './Success';
import classes from './index.module.scss';

interface NeedChangeProps {
  mode: NeedChangePasswordMode;
  logo?: ReactNode;
  passwordLength?: number;
  generationLimit?: number;
  keepPasswordDaysLimit: number;
  onNeedChangePassword?: ({
    values,
    account,
    oldPassword,
  }: {
    values: NeedChangePasswordFormValues;
    account: string;
    oldPassword: string;
  }) => Promise<boolean>;
  account: string;
  oldPassword: string;
  onBack: VoidFunction;
  customizedHint?: string;
  customizedRule?: RegExp;
}

const formSchema: Yup.ObjectSchema<NeedChangePasswordFormValues> = Yup.object({
  password: Yup.string().required('必填欄位不可空白'),
  confirmPassword: Yup.string()
    .required('密碼不一致')
    .oneOf([Yup.ref('password')], '密碼不一致'),
});

const NeedChange: FC<NeedChangeProps> = ({
  mode,
  logo,
  passwordLength,
  generationLimit,
  keepPasswordDaysLimit,
  onNeedChangePassword,
  account,
  oldPassword,
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

  const methods = useForm<NeedChangePasswordFormValues>({
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
    async (values: NeedChangePasswordFormValues) => {
      if (onNeedChangePassword) {
        const status = await onNeedChangePassword({
          values,
          account,
          oldPassword,
        });

        if (status) {
          setIsSuccess(true);
        }
      }
    },
    [account, oldPassword, onNeedChangePassword],
  );

  if (isSuccess) {
    return <Success onBack={onBack} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.logoWrapper}>
        {logo}
        {mode === NeedChangePasswordMode.FIRST && (
          <Typography variant="h3" color="text-primary" align="center">
            歡迎啟用帳號！
            <br />
            請設定密碼
          </Typography>
        )}
        {mode === NeedChangePasswordMode.TOO_LONG && (
          <Typography variant="h3" color="text-primary" align="center">
            {`密碼超過${keepPasswordDaysLimit}天未更新了哦！`}
            <br />
            來更新密碼吧！
          </Typography>
        )}
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
              generationLimit={
                mode === NeedChangePasswordMode.TOO_LONG
                  ? generationLimit
                  : undefined
              }
              customizedHint={customizedHint}
              customizedRule={customizedRule}
            />
          </div>
          <PasswordField
            registerName="confirmPassword"
            label="再次輸入密碼"
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
                (ruleRegExp ? ruleRegExp.test(values.password) : true)
              ) || submitting
            }
          >
            確認
          </Button>
          {mode === NeedChangePasswordMode.TOO_LONG && (
            <Button type="button" variant="text" size="large" onClick={onBack}>
              取消
            </Button>
          )}
        </div>
      </FormFieldsWrapper>
    </div>
  );
};

export default NeedChange;
