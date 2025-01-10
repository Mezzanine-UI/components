import { Key, FC } from 'react';
import {
  AppBar,
  AppBarMain,
  Navigation,
  NavigationChildren,
  cx,
} from '@mezzanine-ui/react';
import { useLayout } from '../layout/useLayout';
import classes from './index.module.scss';

export interface SidebarProps {
  navigationChildren: NavigationChildren;
  onPush: (path: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({ navigationChildren, onPush }) => {
  const { expanded } = useLayout();

  const handleClickNavigation = (key: Key | null | undefined) => {
    const path = key as string;

    onPush(path);
  };

  return (
    <AppBar
      className={cx(classes.host, {
        [classes.expanded]: expanded,
      })}
      orientation="vertical"
    >
      <AppBarMain>
        <Navigation
          onClick={handleClickNavigation}
          className={classes.sidebarContainer}
          orientation="vertical"
        >
          {navigationChildren}
        </Navigation>
      </AppBarMain>
    </AppBar>
  );
};

export default Sidebar;
