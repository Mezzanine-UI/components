import { FC } from 'react';
import { Icon, Typography, Button } from '@mezzanine-ui/react';
import { CheckCircleFilledIcon } from '@mezzanine-ui/icons';
import classes from './index.module.scss';

interface SuccessProps {
  onBack: VoidFunction;
}

const Success: FC<SuccessProps> = ({ onBack }) => {
  return (
    <div className={classes.successRoot}>
      <div className={classes.successContent}>
        <div className={classes.logoWrapper}>
          <Icon icon={CheckCircleFilledIcon} color="success" size={50} />
        </div>
        <div className={classes.contentWrapper}>
          <Typography variant="h2" color="text-primary" align="center">
            密碼更新完成！
            <br />
            請使用新密碼登入
          </Typography>
          <Button
            type="button"
            variant="contained"
            size="large"
            className={classes.button}
            onClick={onBack}
          >
            返回登入頁面
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
