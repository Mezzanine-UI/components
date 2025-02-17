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

interface ChangePasswordModalProps {
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
   * 自定義密碼提示
   */
  customizedHint?: string;
  /**
   * 自定義密碼規則
   */
  customizedRule?: RegExp;
}

const formSchema: Yup.ObjectSchema<ChangePasswordModalValues> = Yup.object({
  originPassword: Yup.string().required('必填欄位不可空白'),
  password: Yup.string().required('必填欄位不可空白'),
  confirmPassword: Yup.string()
    .required('密碼不一致')
    .oneOf([Yup.ref('password')], '密碼不一致'),
});

/**
 * 後台更換密碼 UI 元件，必須搭配 modal
 */
export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  passwordLength,
  generationLimit,
  onChangePassword,
  account,
  onCancel,
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
    return <Success onBack={onBack} />;
  }

  return (
    <FormFieldsWrapper
      methods={methods}
      onSubmit={onSubmit}
      className={classes.root}
    >
      <ModalHeader>更改密碼</ModalHeader>
      <ModalBody className={classes.modalBody}>
        {account && (
          <>
            <Typography variant="h5" color="text-primary">
              帳號
            </Typography>
            <Typography variant="h5" color="text-primary">
              {account}
            </Typography>
            <div className={classes.divider} />
          </>
        )}
        <Typography variant="h5" color="text-primary">
          密碼
        </Typography>
        <div className={classes.formWrapper}>
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
            label="確認密碼"
            size="large"
            placeholder="請輸入密碼"
            className={classes.inputWrapper}
            inputClassName={classes.input}
          />
        </div>
      </ModalBody>
      <ModalActions
        cancelText="取消"
        confirmText="確認"
        cancelButtonProps={{
          type: 'button',
          size: 'large',
          variant: 'outlined',
          style: {
            minWidth: 'unset',
          },
        }}
        confirmButtonProps={{
          type: 'submit',
          size: 'large',
          variant: 'contained',
          style: {
            minWidth: 'unset',
          },
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
