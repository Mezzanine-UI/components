import {
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { Typography, Button } from '@mezzanine-ui/react';
import {
  InputField,
  FormFieldsWrapper,
} from '@mezzanine-ui/react-hook-form-v2';
import { ForgotFormValues, LoginPageEnum } from '../typing';
import Success from './Success';
import classes from './index.module.scss';

interface ForgotProps {
  logo?: ReactNode;
  title: string;
  onSendForgotPassword?: ({
    values,
  }: {
    values: ForgotFormValues;
  }) => Promise<boolean>;
  setCurrentPage: Dispatch<SetStateAction<LoginPageEnum>>;
  forgotPasswordAccountFieldLabel: string;
  forgotPasswordAccountFieldPlaceholder: string;
  forgotPasswordSendText: string;
  forgotPasswordHint: string;
  forgotPasswordSuccessTitle: string;
  forgotPasswordSuccessHint: string;
  backToLoginText: string;
}

const Forgot: FC<ForgotProps> = ({
  logo,
  title,
  onSendForgotPassword,
  setCurrentPage,
  forgotPasswordAccountFieldLabel,
  forgotPasswordAccountFieldPlaceholder,
  forgotPasswordSendText,
  forgotPasswordHint,
  forgotPasswordSuccessTitle,
  forgotPasswordSuccessHint,
  backToLoginText,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const methods = useForm<ForgotFormValues>({
    defaultValues: {
      account: '',
    },
  });

  const values = methods.watch();

  const submitting = useMemo(
    () => methods.formState.isSubmitting,
    [methods.formState.isSubmitting],
  );

  const onSubmit = useCallback(
    async (values: ForgotFormValues) => {
      if (onSendForgotPassword) {
        const status = await onSendForgotPassword({
          values,
        });

        if (status) {
          setIsSuccess(true);
        }
      }
    },
    [onSendForgotPassword],
  );

  if (isSuccess) {
    return (
      <Success
        account={values.account}
        onBack={() => {
          setCurrentPage(LoginPageEnum.LOGIN);
        }}
        forgotPasswordSuccessTitle={forgotPasswordSuccessTitle}
        forgotPasswordSuccessHint={forgotPasswordSuccessHint}
        backToLoginText={backToLoginText}
      />
    );
  }

  return (
    <div className={classes.root}>
      <FormFieldsWrapper
        methods={methods}
        onSubmit={onSubmit}
        className={classes.formWrapper}
      >
        {logo && <div className={classes.logoWrapper}>{logo}</div>}
        <Typography variant="h2" color="text-primary" align="center">
          {title}
        </Typography>
        <Typography
          variant="h5"
          color="text-primary"
          align="center"
          style={{ marginTop: -8, whiteSpace: 'pre-wrap' }}
        >
          {forgotPasswordHint}
        </Typography>
        <div className={classes.blocksWrapper}>
          <div className={classes.blockWrapper}>
            <InputField
              registerName="account"
              label={forgotPasswordAccountFieldLabel}
              size="large"
              placeholder={forgotPasswordAccountFieldPlaceholder}
              className={classes.inputWrapper}
              inputClassName={classes.input}
              required
            />
          </div>
          <div className={classes.blockWrapper}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              className={classes.button}
              loading={submitting}
              disabled={!values.account || submitting}
            >
              {forgotPasswordSendText}
            </Button>
            <Button
              type="button"
              variant="text"
              size="large"
              className={classes.button}
              onClick={() => {
                setCurrentPage(LoginPageEnum.LOGIN);
              }}
            >
              {backToLoginText}
            </Button>
          </div>
        </div>
      </FormFieldsWrapper>
    </div>
  );
};

export default Forgot;
