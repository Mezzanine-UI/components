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
  onSendForgotPassword?: ({
    values,
  }: {
    values: ForgotFormValues;
  }) => Promise<boolean>;
  setCurrentPage: Dispatch<SetStateAction<LoginPageEnum>>;
  forgotPasswordAccountFieldPlaceholder: string;
  forgotPasswordHint: string;
  forgotPasswordSuccessHint: string;
}

const Forgot: FC<ForgotProps> = ({
  logo,
  onSendForgotPassword,
  setCurrentPage,
  forgotPasswordAccountFieldPlaceholder,
  forgotPasswordHint,
  forgotPasswordSuccessHint,
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
        forgotPasswordSuccessHint={forgotPasswordSuccessHint}
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
          重新設定密碼
        </Typography>
        <Typography
          variant="h5"
          color="text-primary"
          align="center"
          style={{ marginTop: -8, whiteSpace: 'pre-line' }}
        >
          {forgotPasswordHint}
        </Typography>
        <div className={classes.blocksWrapper}>
          <div className={classes.blockWrapper}>
            <InputField
              registerName="account"
              label="帳號"
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
              送出
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
              返回登入頁面
            </Button>
          </div>
        </div>
      </FormFieldsWrapper>
    </div>
  );
};

export default Forgot;
