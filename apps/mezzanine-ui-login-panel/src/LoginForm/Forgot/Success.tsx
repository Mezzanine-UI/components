import { FC } from 'react';
import { Icon, Typography, Button, cx } from '@mezzanine-ui/react';
import { CheckCircleFilledIcon } from '@mezzanine-ui/icons';
import classes from './index.module.scss';

interface SuccessProps {
  account: string;
  onBack: VoidFunction;
  forgotPasswordSuccessHint: string;
}

const Success: FC<SuccessProps> = ({
  account,
  onBack,
  forgotPasswordSuccessHint,
}) => {
  return (
    <div className={cx(classes.root, classes.success)}>
      <Icon icon={CheckCircleFilledIcon} color="success" size={50} />
      <Typography variant="h2" color="text-primary">
        密碼重置連結已發送至
      </Typography>
      <Typography variant="h5" color="text-primary">
        {account}
      </Typography>
      <Typography
        variant="caption"
        color="text-secondary"
        component="p"
        align="center"
        style={{ whiteSpace: 'pre-line' }}
      >
        {forgotPasswordSuccessHint}
      </Typography>
      <Button
        type="button"
        variant="contained"
        size="large"
        className={classes.backButton}
        onClick={onBack}
      >
        返回登入頁面
      </Button>
    </div>
  );
};

export default Success;
