import { useMemo, useState } from 'react';
import { Button, ButtonProps, cx } from '@mezzanine-ui/react';
import { FieldValues, useWatch } from 'react-hook-form';
import classes from './index.module.scss';

export interface FormFooterProps<T extends FieldValues = FieldValues> {
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
  submitting: boolean;
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
}

const FormFooter = <T extends FieldValues>({
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
  submitting,
  // stepper
  steps,
  activeStep,
  setActiveStep,
  disableNextButton,
}: FormFooterProps<T>) => {
  const [acting, setActing] = useState<boolean>(false);
  const watchValues = useWatch<T>();

  const values = useMemo(() => watchValues as T, [watchValues]);

  const loading = useMemo(() => submitting || acting, [submitting, acting]);

  const isHaveStepFeature = useMemo(
    () =>
      !!steps &&
      steps.length > 0 &&
      typeof activeStep === 'number' &&
      !!setActiveStep,
    [activeStep, setActiveStep, steps],
  );

  return (
    <div
      className={cx(classes.host, {
        [classes.expanded]: expanded,
      })}
    >
      {actionButtonText && onClickAction ? (
        <Button
          type="button"
          variant="text"
          size="large"
          loading={loading}
          disabled={disableActionButton(values) || loading}
          onClick={async () => {
            setActing(true);
            await onClickAction(values);
            setActing(false);
          }}
          {...actionButtonProps}
        >
          {actionButtonText}
        </Button>
      ) : (
        <div />
      )}
      <div className={classes.actions}>
        {isHaveStepFeature && activeStep !== 0 ? (
          <Button
            type="button"
            variant="outlined"
            size="large"
            onClick={() => {
              setActiveStep?.((activeStep ?? 0) - 1);
            }}
          >
            上一步
          </Button>
        ) : (
          cancelButtonText &&
          onCancel && (
            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={async () => {
                await onCancel(values);
              }}
              {...cancelButtonProps}
            >
              {cancelButtonText}
            </Button>
          )
        )}
        {isHaveStepFeature && activeStep !== (steps?.length ?? 0) - 1 ? (
          <Button
            key={activeStep}
            type="button"
            variant="contained"
            size="large"
            disabled={disableNextButton?.({
              values,
              activeStep: activeStep ?? 0,
            })}
            onClick={() => {
              setActiveStep?.((activeStep ?? 0) + 1);
            }}
          >
            下一步
          </Button>
        ) : (
          <Button
            key="form-submit-button"
            type="submit"
            variant="contained"
            size="large"
            loading={loading}
            disabled={disableSubmitButton(values) || loading}
            {...submitButtonProps}
          >
            {submitButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormFooter;
