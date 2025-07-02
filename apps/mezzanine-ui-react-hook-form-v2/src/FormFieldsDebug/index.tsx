import { TimesIcon } from '@mezzanine-ui/icons';
import { cx, Icon, Typography } from '@mezzanine-ui/react';
import { FC, useState } from 'react';
import { useWatch } from 'react-hook-form';
import classes from './index.module.scss';

const HookformContextConsumer: FC = () => {
  const watchAllFields = useWatch();

  return (
    <pre className={cx(classes.code, 'mzn-rhf-form-fields-debug__code')}>
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
    <div
      className={cx(classes.host, 'mzn-rhf-form-fields-debug', {
        [classes.hostHovered]: hovered,
        'mzn-rhf-form-fields-debug--hovered': hovered,
      })}
    >
      <div
        aria-hidden
        role="button"
        className={cx(classes.close, 'mzn-rhf-form-fields-debug__close')}
        onClick={() => setMount(true)}
      >
        <Icon icon={TimesIcon} />
      </div>
      <div
        className={cx(classes.title, 'mzn-rhf-form-fields-debug__title')}
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
