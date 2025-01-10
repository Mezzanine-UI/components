import { CSSProperties, FC, ReactNode, useMemo } from 'react';
import LayoutProvider from '../layout/LayoutProvider';
import DialogProvider from '../dialog/DialogProvider';
import ModalProvider from '../modal/ModalProvider';
import { HeaderProps } from '../Header';
import { SidebarProps } from '../Sidebar';
import Main from './Main';

export const AuthorizedAdminPageWrapper: FC<
  {
    children?: ReactNode;
    headerHeight?: number;
    sidebarWidth?: number;
  } & HeaderProps &
    SidebarProps
> = ({
  children,
  headerHeight = 64,
  sidebarWidth = 270,
  headerClassName,
  logo,
  role,
  account,
  onLogout,
  changePasswordModalConfig,
  navigationChildren,
  onPush,
}) => {
  const layoutStyleVar = useMemo(
    () =>
      ({
        '--header-height': `${headerHeight}px`,
        '--sidebar-width': `${sidebarWidth}px`,
      }) as CSSProperties,
    [headerHeight, sidebarWidth],
  );

  return (
    <LayoutProvider>
      <DialogProvider>
        <ModalProvider>
          <Main
            layoutStyleVar={layoutStyleVar}
            headerClassName={headerClassName}
            logo={logo}
            role={role}
            account={account}
            onLogout={onLogout}
            changePasswordModalConfig={changePasswordModalConfig}
            navigationChildren={navigationChildren}
            onPush={onPush}
          >
            {children}
          </Main>
        </ModalProvider>
      </DialogProvider>
    </LayoutProvider>
  );
};
