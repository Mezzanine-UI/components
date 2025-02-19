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
  // Header props
  headerClassName,
  logo,
  name,
  role,
  account,
  onLogout,
  customizedComponent,
  changePasswordModalConfig,
  customizedButton,
  customizedSystemName,
  iconColor,
  // Sidebar props
  navigationChildren,
  onPush,
}) => {
  const { sidebarExpanded } = useLayout();

  return (
    <div style={layoutStyleVar} className={classes.host}>
      <Header
        headerClassName={headerClassName}
        logo={logo}
        name={name}
        role={role}
        account={account}
        onLogout={onLogout}
        customizedComponent={customizedComponent}
        changePasswordModalConfig={changePasswordModalConfig}
        customizedButton={customizedButton}
        customizedSystemName={customizedSystemName}
        iconColor={iconColor}
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
