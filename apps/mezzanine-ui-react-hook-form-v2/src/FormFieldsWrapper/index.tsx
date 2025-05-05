import { CSSProperties, ReactNode, useMemo } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { ButtonProps, Stepper, Step, ModalSize } from '@mezzanine-ui/react';
import { SeverityWithInfo } from '@mezzanine-ui/system/severity';
import FormFooter from './FormFooter';
import classes from './index.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormFieldsWrapperProps<T extends FieldValues = FieldValues>
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
  steps?: { id: string; name: string }[];
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
  footerClassName?: string;
  expanded?: boolean;
  cancelButtonText?: string;
  submitButtonText?: string;
  actionButtonText?: string;
  cancelButtonProps?: ButtonProps;
  submitButtonProps?: ButtonProps;
  actionButtonProps?: ButtonProps;
  disableCancelButton?: (values: T) => boolean;
  disableSubmitButton?: (values: T) => boolean;
  disableActionButton?: (values: T) => boolean;
  onClickAction?: (values: T) => Promise<void>;
  onCancel?: (values: T) => Promise<void>;
  cancelNeedConfirm?: boolean;
  previousStepButtonText?: string;
  nextStepButtonText?: string;
  modelConfig?: {
    severity?: SeverityWithInfo;
    size?: ModalSize;
    headerText?: string;
    bodyText?: string;
    confirmText?: string;
    cancelText?: string;
    isConfirmDanger?: boolean;
  };
}

export const FormFieldsWrapper = <T extends FieldValues>({
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
  footerClassName,
  expanded,
  cancelButtonText = '取消',
  submitButtonText = '確認',
  actionButtonText,
  cancelButtonProps,
  submitButtonProps,
  actionButtonProps,
  disableCancelButton = () => false,
  disableSubmitButton = () => false,
  disableActionButton = () => false,
  onClickAction,
  onCancel,
  cancelNeedConfirm = true,
  previousStepButtonText,
  nextStepButtonText,
  modelConfig,
  ...other
}: FormFieldsWrapperProps<T>) => {
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
              <Step key={step.id} title={step.name} />
            ))}
          </Stepper>
        )}
        {children}
        {haveFooter && (
          <FormFooter<T>
            footerClassName={footerClassName}
            expanded={expanded}
            cancelButtonText={cancelButtonText}
            submitButtonText={submitButtonText}
            actionButtonText={actionButtonText}
            cancelButtonProps={cancelButtonProps}
            submitButtonProps={submitButtonProps}
            actionButtonProps={actionButtonProps}
            disableCancelButton={disableCancelButton}
            disableSubmitButton={disableSubmitButton}
            disableActionButton={disableActionButton}
            onClickAction={onClickAction}
            onCancel={onCancel}
            submitting={submitting}
            cancelNeedConfirm={cancelNeedConfirm}
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            disableNextButton={disableNextButton}
            previousStepButtonText={previousStepButtonText}
            nextStepButtonText={nextStepButtonText}
            modelConfig={modelConfig}
          />
        )}
      </form>
    </FormProvider>
  );
};
