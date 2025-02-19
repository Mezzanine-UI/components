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
  IconColor,
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
   * 自定義元件，位在使用者資訊及按鈕元件之間
   */
  customizedComponent?: ReactNode;
  /**
   * passwordLength: 密碼至少需要的長度;
   * generationLimit: 密碼不可與前 `number` 代重複;
   * onChangePassword: 送出時觸發，return true 代表更新成功;
   * onBack: 成功後返回;
   * customizedHint: 自定義密碼提示;
   * customizedRule: 自定義密碼規則;
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
    customizedHint?: string;
    customizedRule?: RegExp;
  };
  /**
   * 自定義按鈕元件
   */
  customizedButton?: ReactNode;
  /**
   * 自定義系統名稱，顯示在下拉選單左側
   */
  customizedSystemName?: ReactNode;
  /**
   * 自定義 icon 顏色
   */
  iconColor?: IconColor;
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
  customizedComponent,
  changePasswordModalConfig,
  customizedButton,
  customizedSystemName,
  iconColor = 'surface',
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
        <Icon icon={MenuIcon} color={iconColor} />
      </IconButton>
      <AppBarBrand>{logo}</AppBarBrand>
      <AppBarSupport className={classes.appBarSupport}>
        {!!customizedSystemName && <div>{customizedSystemName}</div>}
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
                {customizedComponent}
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
                                  customizedHint={
                                    changePasswordModalConfig.customizedHint
                                  }
                                  customizedRule={
                                    changePasswordModalConfig.customizedRule
                                  }
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
                <Icon size={24} icon={ProfileIcon} color={iconColor} />
                <Icon
                  size={24}
                  icon={ChevronDownIcon}
                  color={iconColor}
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
