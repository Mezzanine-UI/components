import { CSSProperties, FC, ReactNode, useMemo } from 'react';
import LayoutProvider from '../layout/LayoutProvider';
import DialogProvider from '../dialog/DialogProvider';
import ModalProvider from '../modal/ModalProvider';
import { HeaderProps } from '../Header';
import { SidebarProps } from '../Sidebar';
import Main from './Main';

interface AuthorizedAdminPageWrapperBaseProps {
  /**
   * 頁面元素
   */
  children?: ReactNode;
  /**
   * header 高度
   */
  headerHeight?: number;
  /**
   * sidebar 寬度
   */
  sidebarWidth?: number;
}

export type AuthorizedAdminPageWrapperProps =
  AuthorizedAdminPageWrapperBaseProps & HeaderProps & SidebarProps;

/**
 * 後台登入後基本框架，包含 header、sidebar 元件與 layout、dialog、modal provider
 */
export const AuthorizedAdminPageWrapper: FC<
  AuthorizedAdminPageWrapperProps
> = ({
  children,
  headerHeight = 64,
  sidebarWidth = 256,
  // Header props
  className,
  headerClassName,
  logo,
  name,
  role,
  account,
  onLogout,
  menuLogoSpacing,
  memberIconsSpacing,
  horizontalPadding,
  customizedComponent,
  changePasswordModalConfig,
  customizedButton,
  customizedSystemName,
  iconColor,
  // Sidebar props
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
    <LayoutProvider sidebarWidth={sidebarWidth}>
      <DialogProvider>
        <ModalProvider>
          <Main
            layoutStyleVar={layoutStyleVar}
            className={className}
            headerClassName={headerClassName}
            logo={logo}
            name={name}
            role={role}
            account={account}
            onLogout={onLogout}
            menuLogoSpacing={menuLogoSpacing}
            memberIconsSpacing={memberIconsSpacing}
            horizontalPadding={horizontalPadding}
            customizedComponent={customizedComponent}
            changePasswordModalConfig={changePasswordModalConfig}
            customizedButton={customizedButton}
            customizedSystemName={customizedSystemName}
            iconColor={iconColor}
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
