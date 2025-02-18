import { FC, useState, MouseEvent, RefObject, ReactNode } from 'react';
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
  Tag,
  cx,
} from '@mezzanine-ui/react';
import { MenuIcon, ProfileIcon, ChevronDownIcon } from '@mezzanine-ui/icons';
import {
  ChangePasswordModal,
  ChangePasswordModalValues,
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
  logo?: React.JSX.Element;
  /**
   * 顯示名字
   */
  name?: string;
  /**
   * 顯示角色
   */
  role?: string;
  /**
   * 顯示帳號
   */
  account?: string;
  /**
   * 登出時觸發
   */
  onLogout: () => Promise<void>;
  /**
   * passwordLength: 密碼至少需要的長度;
   * generationLimit: 密碼不可與前 `number` 代重複;
   * onChangePassword: 送出時觸發，return true 代表更新成功;
   * onBack: 成功後返回;
   */
  changePasswordModalConfig?: {
    passwordLength?: number;
    generationLimit?: number;
    onChangePassword: ({
      values,
    }: {
      values: ChangePasswordModalValues;
    }) => Promise<boolean>;
    onBack: VoidFunction;
  };
  /**
   * 自定義按鈕元件
   */
  customizedButton?: ReactNode;
}

/**
 * 後台 header 元件
 */
export const Header: FC<HeaderProps> = ({
  headerClassName,
  logo,
  name,
  role,
  account,
  onLogout,
  changePasswordModalConfig,
  customizedButton,
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
              <div className={classes.wrapper}>
                {(name || role || account) && (
                  <div className={classes.infoWrapper}>
                    <div className={classes.nameWrapper}>
                      {!!name && (
                        <Typography variant="h5" color="text-primary">
                          {name}
                        </Typography>
                      )}
                      {!!role && <Tag>{role}</Tag>}
                    </div>
                    {!!account && (
                      <Typography variant="h5" color="text-primary">
                        {account}
                      </Typography>
                    )}
                  </div>
                )}
                {(changePasswordModalConfig || customizedButton) && (
                  <div className={classes.buttonsWrapper}>
                    {!!changePasswordModalConfig && (
                      <div className={classes.button}>
                        <Button
                          type="button"
                          variant="outlined"
                          size="large"
                          onClick={() => {
                            toggleOpen(false);
                            openModal({
                              className: classes.changePasswordModal,
                              disableCloseOnBackdropClick: true,
                              children: (
                                <ChangePasswordModal
                                  passwordLength={
                                    changePasswordModalConfig.passwordLength
                                  }
                                  generationLimit={
                                    changePasswordModalConfig.generationLimit
                                  }
                                  onChangePassword={
                                    changePasswordModalConfig.onChangePassword
                                  }
                                  onBack={changePasswordModalConfig.onBack}
                                  account={account}
                                  onCancel={closeModal}
                                />
                              ),
                            });
                          }}
                        >
                          更改密碼
                        </Button>
                      </div>
                    )}
                    {!!customizedButton && (
                      <div className={classes.button}>{customizedButton}</div>
                    )}
                  </div>
                )}
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
