import { FC } from 'react';
import { Icon, Typography, Button, cx } from '@mezzanine-ui/react';
import { CheckCircleFilledIcon } from '@mezzanine-ui/icons';
import classes from './index.module.scss';

interface SuccessProps {
  account: string;
  onBack: VoidFunction;
}

const Success: FC<SuccessProps> = ({ account, onBack }) => {
  return (
    <div className={classes.root}>
      <div className={cx(classes.logoWrapper, classes.success)}>
        <Icon icon={CheckCircleFilledIcon} color="success" size={50} />
      </div>
      <div className={classes.formWrapper}>
        <Typography variant="h2" color="text-primary">
          密碼重置連結已發送至
        </Typography>
        <Typography variant="h5" color="text-primary">
          {account}
        </Typography>
        <Typography
          variant="h5"
          color="text-primary"
          component="p"
          align="center"
        >
          請於1小時內點擊URL設定密碼。
          <br />
          若未收到email或遇URL失效請聯絡管理員。
        </Typography>
        <div className={classes.blocksWrapper}>
          <div className={classes.blockWrapper}>
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
    </div>
  );
};

export default Success;
