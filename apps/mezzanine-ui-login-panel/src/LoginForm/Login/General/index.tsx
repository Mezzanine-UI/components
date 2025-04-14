import {
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useMemo,
  useCallback,
} from 'react';
import { useForm } from 'react-hook-form';
import { Typography, Button } from '@mezzanine-ui/react';
import {
  InputField,
  PasswordField,
  FormFieldsWrapper,
} from '@mezzanine-ui/react-hook-form-v2';
import { LoginFormValues, LoginPageEnum } from '../../typing';
import classes from './index.module.scss';

interface GeneralLoginProps {
  logo?: ReactNode;
  loginTitle: string;
  generalLoginText: string;
  onLogin: ({ values }: { values: LoginFormValues }) => Promise<void>;
  accountFieldLabel: string;
  accountFieldPlaceholder: string;
  passwordFieldLabel: string;
  passwordFieldPlaceholder: string;
  setCurrentPage: Dispatch<SetStateAction<LoginPageEnum>>;
  customizedLoginPasswordHint?: string[];
  notShowForgotPassword?: boolean;
  forgotPasswordButtonText: string;
}

const GeneralLogin: FC<GeneralLoginProps> = ({
  logo,
  loginTitle,
  generalLoginText,
  onLogin,
  accountFieldLabel,
  accountFieldPlaceholder,
  passwordFieldLabel,
  passwordFieldPlaceholder,
  setCurrentPage,
  customizedLoginPasswordHint,
  notShowForgotPassword = false,
  forgotPasswordButtonText,
}) => {
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      account: '',
      password: '',
    },
  });

  const values = methods.watch();

  const submitting = useMemo(
    () => methods.formState.isSubmitting,
    [methods.formState.isSubmitting],
  );

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      await onLogin({ values });
    },
    [onLogin],
  );

  return (
    <div className={classes.root}>
      <FormFieldsWrapper
        methods={methods}
        onSubmit={onSubmit}
        className={classes.formWrapper}
      >
        {logo && <div className={classes.logoWrapper}>{logo}</div>}
        <Typography variant="h2" color="text-primary" align="center">
          {loginTitle}
        </Typography>
        <InputField
          registerName="account"
          label={accountFieldLabel}
          size="large"
          placeholder={accountFieldPlaceholder}
          className={classes.inputWrapper}
          inputClassName={classes.input}
          required
        />
        <PasswordField
          registerName="password"
          label={passwordFieldLabel}
          size="large"
          placeholder={passwordFieldPlaceholder}
          className={classes.inputWrapper}
          inputClassName={classes.input}
          hints={customizedLoginPasswordHint}
          required
        />
        <div className={classes.buttonsWrapper}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            loading={submitting}
            disabled={!(values.account && values.password) || submitting}
          >
            {generalLoginText}
          </Button>
          {!notShowForgotPassword && (
            <Button
              type="button"
              variant="text"
              size="large"
              onClick={() => {
                setCurrentPage(LoginPageEnum.FORGOT);
              }}
            >
              {forgotPasswordButtonText}
            </Button>
          )}
        </div>
      </FormFieldsWrapper>
    </div>
  );
};

export default GeneralLogin;
