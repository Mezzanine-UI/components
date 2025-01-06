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
import { ForgetFormValues, LoginPageEnum } from '../typing';
import Success from './Success';
import classes from './index.module.scss';

interface ForgetProps {
  logo: ReactNode;
  onSendForgetAccount: ({
    values,
  }: {
    values: ForgetFormValues;
  }) => Promise<boolean>;
  setCurrentPage: Dispatch<SetStateAction<LoginPageEnum>>;
}

const Forget: FC<ForgetProps> = ({
  logo,
  onSendForgetAccount,
  setCurrentPage,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const methods = useForm<ForgetFormValues>({
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
    async (values: ForgetFormValues) => {
      const status = await onSendForgetAccount({
        values,
      });

      if (status) {
        setIsSuccess(true);
      }
    },
    [onSendForgetAccount],
  );

  if (isSuccess) {
    return (
      <Success
        account={values.account}
        onBack={() => {
          setCurrentPage(LoginPageEnum.LOGIN);
        }}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.logoWrapper}>{logo}</div>
      <FormFieldsWrapper
        methods={methods}
        onSubmit={onSubmit}
        className={classes.formWrapper}
      >
        <Typography variant="h2" color="text-primary" align="center">
          重新設定密碼
        </Typography>
        <Typography variant="h5" color="text-primary" align="center">
          請輸入註冊時使用的email帳號，密碼重置URL將發送至該信箱
        </Typography>
        <div className={classes.blockWrapper}>
          <InputField
            registerName="account"
            label="帳號"
            size="large"
            placeholder="輸入帳號 e.g. example@email.com"
            className={classes.inputWrapper}
            inputClassName={classes.input}
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
      </FormFieldsWrapper>
    </div>
  );
};

export default Forget;
