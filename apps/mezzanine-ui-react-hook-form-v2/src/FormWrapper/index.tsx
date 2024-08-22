import { CSSProperties, ReactNode, useMemo } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { ButtonProps, Stepper, Step } from '@mezzanine-ui/react';
import FormFooter from './FormFooter';
import classes from './index.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormWrapperProps<T extends FieldValues = FieldValues>
  extends Omit<
    React.DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
    'onSubmit' | 'style'
  > {
  methods: UseFormReturn<T>;
  children: ReactNode;
  onSubmit?: SubmitHandler<T>;
  // stepper
  steps?: string[];
  activeStep?: number;
  setActiveStep?: (activeStep: number) => void;
  disableNextButton?: ({
    values,
    activeStep,
  }: {
    values: T;
    activeStep: number;
  }) => boolean;
  // footer
  haveFooter?: boolean;
  footerOffset?: number;
  expanded?: boolean;
  cancelButtonText?: string;
  submitButtonText?: string;
  actionButtonText?: string;
  cancelButtonProps?: ButtonProps;
  submitButtonProps?: ButtonProps;
  actionButtonProps?: ButtonProps;
  disableSubmitButton?: (values: T) => boolean;
  disableActionButton?: (values: T) => boolean;
  onClickAction?: (values: T) => Promise<void>;
  onCancel?: (values: T) => Promise<void>;
}

export const FormWrapper = <T extends FieldValues>({
  methods,
  children,
  onSubmit = () => {
    //
  },
  // stepper
  steps,
  activeStep,
  setActiveStep,
  disableNextButton,
  // footer
  haveFooter,
  footerOffset = 0,
  expanded,
  cancelButtonText = '取消',
  submitButtonText = '確認',
  actionButtonText,
  cancelButtonProps,
  submitButtonProps,
  actionButtonProps,
  disableSubmitButton = () => false,
  disableActionButton = () => false,
  onClickAction,
  onCancel,
  ...other
}: FormWrapperProps<T>) => {
  const layoutStyleVar = useMemo(
    () =>
      ({
        '--footer-offset': `${footerOffset}px`,
      }) as CSSProperties,
    [footerOffset],
  );

  const submitting = useMemo(
    () => methods.formState.isSubmitting,
    [methods.formState.isSubmitting],
  );

  return (
    <FormProvider {...methods}>
      <form
        {...other}
        style={layoutStyleVar}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {steps && steps.length > 0 && (
          <Stepper className={classes.stepper} activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step} title={step} />
            ))}
          </Stepper>
        )}
        {children}
        {haveFooter && (
          <FormFooter<T>
            expanded={expanded}
            cancelButtonText={cancelButtonText}
            submitButtonText={submitButtonText}
            actionButtonText={actionButtonText}
            cancelButtonProps={cancelButtonProps}
            submitButtonProps={submitButtonProps}
            actionButtonProps={actionButtonProps}
            disableSubmitButton={disableSubmitButton}
            disableActionButton={disableActionButton}
            onClickAction={onClickAction}
            onCancel={onCancel}
            submitting={submitting}
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            disableNextButton={disableNextButton}
          />
        )}
      </form>
    </FormProvider>
  );
};
