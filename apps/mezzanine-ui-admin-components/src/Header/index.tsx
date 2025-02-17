import { FC, ReactNode, useState, MouseEvent, RefObject } from 'react';
import {
  AppBar,
  AppBarBrand,
  AppBarSupport,
  Icon,
  IconButton,
  Button,
  Menu,
  Typography,
  Dropdown,
  cx,
} from '@mezzanine-ui/react';
import { MenuIcon, ProfileIcon, ChevronDownIcon } from '@mezzanine-ui/icons';
import {
  ChangePasswordForm,
  ChangePasswordFormValues,
} from '@mezzanine-ui/login-panel';
import { useLayout } from '../layout/useLayout';
import { useModal } from '../modal/useModal';
import classes from './index.module.scss';

export interface HeaderProps {
  /**
   * header class
   */
  headerClassName?: string;
  /**
   * 放置 logo
   */
  logo: React.JSX.Element;
  /**
   * 顯示角色
   */
  role: string;
  /**
   * 顯示帳號
   */
  account: string;
  /**
   * 登出時觸發
   */
  onLogout: () => Promise<void>;
  /**
   * logo: 放置更換密碼 modal 的 logo;
   * passwordLength: 密碼至少需要的長度;
   * generationLimit: 密碼不可與前 `number` 代重複;
   * onChangePassword: 送出時觸發，return true 代表更新成功;
   * onBack: 成功後返回;
   */
  changePasswordModalConfig: {
    logo: ReactNode;
    passwordLength: number;
    generationLimit?: number;
    onChangePassword: ({
      values,
    }: {
      values: ChangePasswordFormValues;
    }) => Promise<boolean>;
    onBack: VoidFunction;
  };
}

/**
 * 後台 header 元件
 */
export const Header: FC<HeaderProps> = ({
  headerClassName,
  logo,
  role,
  account,
  onLogout,
  changePasswordModalConfig,
}) => {
  const { openModal, closeModal } = useModal();
  const { toggleSidebar } = useLayout();
  const [open, toggleOpen] = useState<boolean>(false);

  return (
    <AppBar className={cx(classes.host, headerClassName)}>
      <IconButton
        type="button"
        className={classes.burgerBtn}
        onClick={toggleSidebar}
      >
        <Icon icon={MenuIcon} color="surface" />
      </IconButton>
      <AppBarBrand>{logo}</AppBarBrand>
      <AppBarSupport className={classes.appBarSupport}>
        <Dropdown
          menu={
            <Menu className={classes.menu} size="large">
              <div className={classes.infoWrapper}>
                <Typography variant="h6" color="text-primary">
                  {role}
                </Typography>
                <Typography variant="h4" color="text-primary">
                  {account}
                </Typography>
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  className={classes.changeButton}
                  onClick={() => {
                    toggleOpen(false);
                    openModal({
                      width: 480,
                      disableCloseOnBackdropClick: true,
                      hideCloseIcon: true,
                      children: (
                        <ChangePasswordForm
                          logo={changePasswordModalConfig.logo}
                          passwordLength={
                            changePasswordModalConfig.passwordLength
                          }
                          generationLimit={
                            changePasswordModalConfig.generationLimit
                          }
                          onChangePassword={
                            changePasswordModalConfig.onChangePassword
                          }
                          account={account}
                          onCancel={closeModal}
                          onBack={changePasswordModalConfig.onBack}
                        />
                      ),
                    });
                  }}
                >
                  更改密碼
                </Button>
              </div>
              <Button
                type="button"
                variant="contained"
                size="large"
                className={classes.logoutButton}
                onClick={() => {
                  toggleOpen(false);
                  onLogout();
                }}
              >
                登出
              </Button>
            </Menu>
          }
          onClose={() => {
            toggleOpen(false);
          }}
          popperProps={{
            open,
            disablePortal: true,
            options: {
              placement: 'bottom-end',
            },
          }}
        >
          {(ref) => (
            <Button
              type="button"
              ref={ref as RefObject<HTMLButtonElement>}
              className={classes.dropdownBtn}
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                toggleOpen((s) => !s);
              }}
            >
              <div className={classes.iconsContainer}>
                <Icon size={24} icon={ProfileIcon} color="surface" />
                <Icon
                  size={24}
                  icon={ChevronDownIcon}
                  color="surface"
                  className={cx(classes.dropdownIcon, {
                    [classes.open]: open,
                  })}
                />
              </div>
            </Button>
          )}
        </Dropdown>
      </AppBarSupport>
    </AppBar>
  );
};
