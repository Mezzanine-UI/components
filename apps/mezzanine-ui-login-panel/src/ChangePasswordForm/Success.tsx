import { FC } from 'react';
import { Icon, Typography, Button } from '@mezzanine-ui/react';
import { CheckCircleFilledIcon } from '@mezzanine-ui/icons';
import classes from './index.module.scss';

interface SuccessProps {
  onBack: VoidFunction;
  successText: string;
  backText: string;
}

const Success: FC<SuccessProps> = ({ onBack, successText, backText }) => {
  return (
    <div className={classes.successRoot}>
      <div className={classes.logoWrapper}>
        <Icon icon={CheckCircleFilledIcon} color="success" size={50} />
      </div>
      <div className={classes.contentWrapper}>
        <Typography variant="h2" color="text-primary" align="center">
          {successText}
        </Typography>
        <Button
          type="button"
          variant="contained"
          size="large"
          className={classes.button}
          onClick={onBack}
        >
          {backText}
        </Button>
      </div>
    </div>
  );
};

export default Success;
