import { FC, ReactNode } from 'react';
import { Typography, Button, Icon, cx } from '@mezzanine-ui/react';
import { PlusIcon } from '@mezzanine-ui/icons';
import classes from './index.module.scss';

interface PageWrapperWithoutCreateButtonProps {
  children: ReactNode;
  title: string;
  isFormPage?: boolean;
  customizeActionComponent?: ReactNode;
  onCreate?: undefined;
  createButtonDisabled?: undefined;
  createText?: undefined;
}

interface PageWrapperWithCreateButtonProps {
  children: ReactNode;
  title: string;
  isFormPage?: boolean;
  customizeActionComponent?: ReactNode;
  onCreate: VoidFunction;
  createButtonDisabled?: boolean;
  createText: string;
}

type PageWrapperProps =
  | PageWrapperWithoutCreateButtonProps
  | PageWrapperWithCreateButtonProps;

export const PageWrapper: FC<PageWrapperProps> = ({
  title,
  isFormPage = false,
  children,
  onCreate,
  createButtonDisabled,
  customizeActionComponent,
  createText,
}) => {
  return (
    <div
      className={cx(classes.root, {
        [classes.isFormPage]: isFormPage,
      })}
    >
      <div className={classes.titleWrapper}>
        <Typography variant="h1" color="text-primary">
          {title}
        </Typography>
        <div className={classes.actionsWrapper}>
          {customizeActionComponent}
          {onCreate && (
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={onCreate}
              prefix={<Icon icon={PlusIcon} />}
              disabled={createButtonDisabled}
            >
              {createText}
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
