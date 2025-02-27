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
  generalLoginText: string;
  onLogin: ({ values }: { values: LoginFormValues }) => Promise<void>;
  accountFieldPlaceholder: string;
  setCurrentPage: Dispatch<SetStateAction<LoginPageEnum>>;
  customizedLoginPasswordHint?: string[];
  notShowForgotPassword?: boolean;
}

const GeneralLogin: FC<GeneralLoginProps> = ({
  logo,
  generalLoginText,
  onLogin,
  accountFieldPlaceholder,
  setCurrentPage,
  customizedLoginPasswordHint,
  notShowForgotPassword = false,
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
          帳號登入
        </Typography>
        <InputField
          registerName="account"
          label="帳號"
          size="large"
          placeholder={accountFieldPlaceholder}
          className={classes.inputWrapper}
          inputClassName={classes.input}
          required
        />
        <PasswordField
          registerName="password"
          label="密碼"
          size="large"
          placeholder="請輸入密碼"
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
                setCurrentPage(LoginPageEnum.FORGET);
              }}
            >
              忘記密碼
            </Button>
          )}
        </div>
      </FormFieldsWrapper>
    </div>
  );
};

export default GeneralLogin;
