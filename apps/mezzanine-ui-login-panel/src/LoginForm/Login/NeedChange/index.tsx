import { ReactNode, FC, useMemo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mezzanine-ui/react';
import {
  PasswordField,
  InputField,
  InputFieldProps,
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
  generationLimitHint?: (generationLimit: number) => string;
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
  activateTitle: string;
  tooLongTitle: string;
  tooLoginWarning: (keepPasswordDaysLimit: number) => string;
  passwordFieldLabel: string;
  passwordFieldPlaceholder: string;
  confirmPasswordFieldLabel: string;
  confirmPasswordFieldPlaceholder: string;
  submitText: string;
  cancelText: string;
  backToLoginText: string;
  successText: string;
  customizedActivateFields?: InputFieldProps[];
  customizedActivateSchema?: Yup.ObjectSchema<object>;
  customizedHint?: string;
  customizedRule?: RegExp;
  requiredErrorMessage: string;
  passwordErrorMessage: string;
}

const NeedChange: FC<NeedChangeProps> = ({
  mode,
  logo,
  passwordLength,
  generationLimit,
  generationLimitHint,
  keepPasswordDaysLimit,
  onNeedChangePassword,
  account,
  oldPassword,
  onBack,
  activateTitle,
  tooLongTitle,
  tooLoginWarning,
  passwordFieldLabel,
  passwordFieldPlaceholder,
  confirmPasswordFieldLabel,
  confirmPasswordFieldPlaceholder,
  submitText,
  cancelText,
  backToLoginText,
  successText,
  customizedActivateFields,
  customizedActivateSchema,
  customizedHint,
  customizedRule,
  requiredErrorMessage,
  passwordErrorMessage,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const ruleRegExp = useMemo(() => {
    if (customizedRule) {
      return customizedRule;
    }
    return passwordLength ? generatePasswordRegRxp(passwordLength) : null;
  }, [passwordLength, customizedRule]);

  const formSchema: Yup.ObjectSchema<NeedChangePasswordFormValues> =
    useMemo(() => {
      const baseSchema = Yup.object({
        password: Yup.string().required(requiredErrorMessage),
        confirmPassword: Yup.string()
          .required(passwordErrorMessage)
          .oneOf([Yup.ref('password')], passwordErrorMessage),
      });

      if (customizedActivateSchema && mode === NeedChangePasswordMode.FIRST) {
        return baseSchema.concat(customizedActivateSchema);
      }

      return baseSchema;
    }, [
      customizedActivateSchema,
      mode,
      passwordErrorMessage,
      requiredErrorMessage,
    ]);

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
    return (
      <Success
        onBack={onBack}
        successText={successText}
        backText={backToLoginText}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.logoWrapper}>
        {logo}
        {mode === NeedChangePasswordMode.FIRST && (
          <Typography variant="h2" color="text-primary" align="center">
            {activateTitle}
          </Typography>
        )}
        {mode === NeedChangePasswordMode.TOO_LONG && (
          <Typography variant="h2" color="text-primary" align="center">
            {tooLoginWarning(keepPasswordDaysLimit)}
            <br />
            {tooLongTitle}
          </Typography>
        )}
        <Typography
          variant="h5"
          color="text-primary"
          align="center"
          style={{ marginTop: -8 }}
        >
          {account}
        </Typography>
      </div>
      <FormFieldsWrapper
        methods={methods}
        onSubmit={onSubmit}
        className={classes.formWrapper}
      >
        {mode === NeedChangePasswordMode.FIRST &&
          customizedActivateFields &&
          customizedActivateFields.map((field, index) => (
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
            generationLimit={
              mode === NeedChangePasswordMode.TOO_LONG
                ? generationLimit
                : undefined
            }
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
          {mode === NeedChangePasswordMode.TOO_LONG && (
            <Button type="button" variant="text" size="large" onClick={onBack}>
              {cancelText}
            </Button>
          )}
        </div>
      </FormFieldsWrapper>
    </div>
  );
};

export default NeedChange;
