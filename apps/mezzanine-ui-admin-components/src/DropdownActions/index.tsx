import { FC, useState, MouseEvent, RefObject } from 'react';
import { IconDefinition, MoreVerticalIcon } from '@mezzanine-ui/icons';
import {
  Dropdown,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  MenuItemProps,
  cx,
} from '@mezzanine-ui/react';
import { Placement } from '@popperjs/core';
import { Divider } from '../Divider';
import classes from './index.module.scss';

export type DropdownItemType = {
  text?: string;
  danger?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  isDivider?: boolean;
} & Omit<MenuItemProps, 'children'>;

export type DropdownItemsType = DropdownItemType[];

export interface DropdownActionsProps {
  /**
   * 選單元素
   */
  items: DropdownItemsType;
  /**
   * 按鈕 icon
   */
  icon?: IconDefinition;
  /**
   * 選單排版
   */
  placement?: Placement;
  /**
   * 按鈕 class name
   */
  className?: string;
  /**
   * 選單 class name
   */
  menuClassName?: string;
  /**
   * icon class name
   */
  iconClassName?: string;
  /**
   * 選單是否 disablePortal
   */
  disablePortal?: boolean;
  /**
   * 按鈕是否 disabled
   */
  disabled?: boolean;
}

/**
 * 下拉式選單按鈕
 */
export const DropdownActions: FC<DropdownActionsProps> = ({
  items,
  icon = MoreVerticalIcon,
  placement = 'bottom-end',
  className,
  menuClassName,
  iconClassName,
  disablePortal,
  disabled = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dropdown
      menu={
        <Menu
          className={cx(classes.menu, menuClassName)}
          itemsInView={5}
          size="large"
        >
          {items.map(
            (
              { onClick, text, danger, hidden, disabled, isDivider, ...rest },
              index,
            ) => {
              if (hidden) {
                return null;
              }

              if (isDivider) {
                return <Divider key={index} color="border" />;
              }

              return (
                <MenuItem
                  {...rest}
                  key={index}
                  disabled={disabled}
                  className={cx({
                    [classes.dangerItem]: danger && !disabled,
                  })}
                  onClick={async (e) => {
                    setOpen(false);
                    onClick?.(e);
                  }}
                >
                  {text}
                </MenuItem>
              );
            },
          )}
        </Menu>
      }
      onClose={() => {
        setOpen(false);
      }}
      popperProps={{
        open,
        disablePortal: disablePortal,
        options: {
          placement,
        },
      }}
    >
      {(ref) => (
        <IconButton
          type="button"
          variant="text"
          ref={ref as RefObject<HTMLButtonElement>}
          className={className}
          disabled={disabled}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            setOpen((s) => !s);
          }}
        >
          <Icon size={24} icon={icon} className={iconClassName} />
        </IconButton>
      )}
    </Dropdown>
  );
};
