import { FC, CSSProperties, ReactNode } from 'react';
import { cx } from '@mezzanine-ui/react';
import { Header, HeaderProps } from '../Header';
import { Sidebar, SidebarProps } from '../Sidebar';
import { useLayout } from '../layout/useLayout';
import classes from './index.module.scss';

const Main: FC<
  { children?: ReactNode; layoutStyleVar: CSSProperties } & HeaderProps &
    SidebarProps
> = ({
  children,
  layoutStyleVar,
  headerClassName,
  logo,
  role,
  account,
  onLogout,
  changePasswordModalConfig,
  navigationChildren,
  onPush,
}) => {
  const { sidebarExpanded } = useLayout();

  return (
    <div style={layoutStyleVar} className={classes.host}>
      <Header
        headerClassName={headerClassName}
        logo={logo}
        role={role}
        account={account}
        onLogout={onLogout}
        changePasswordModalConfig={changePasswordModalConfig}
      />
      <main className={classes.main}>
        <Sidebar navigationChildren={navigationChildren} onPush={onPush} />
        <div
          className={cx(classes.container, {
            [classes.sidebarExpanded]: sidebarExpanded,
          })}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Main;
