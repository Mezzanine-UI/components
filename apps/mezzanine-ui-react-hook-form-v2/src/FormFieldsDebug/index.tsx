import { TimesIcon } from '@mezzanine-ui/icons';
import { cx, Icon, Typography } from '@mezzanine-ui/react';
import { FC, useState } from 'react';
import { useWatch } from 'react-hook-form';
import classes from './index.module.scss';

const HookformContextConsumer: FC = () => {
  const watchAllFields = useWatch();

  return (
    <pre className={classes.code}>
      {JSON.stringify(watchAllFields, null, 2)}
    </pre>
  );
};

interface FormFieldsDebugProps {
  mode?: 'dev' | 'prod';
  title?: string;
}

export const FormFieldsDebug: FC<FormFieldsDebugProps> = ({
  mode = 'dev',
  title = 'Hook Form State',
}) => {
  const [hovered, setHovered] = useState(false);
  const [unMount, setMount] = useState(false);
  const [show, setShow] = useState(true);

  return mode === 'dev' && !unMount ? (
    <div className={cx(classes.host, hovered && classes.hostHovered)}>
      <div
        aria-hidden
        role="button"
        className={classes.close}
        onClick={() => setMount(true)}
      >
        <Icon icon={TimesIcon} />
      </div>
      <div
        className={classes.title}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => {
          //
        }}
      >
        <Typography variant="h4" color="primary" onClick={() => setShow(!show)}>
          {title}
        </Typography>
      </div>
      {show && <HookformContextConsumer />}
    </div>
  ) : null;
};
