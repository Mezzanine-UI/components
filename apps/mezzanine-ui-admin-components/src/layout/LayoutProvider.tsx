/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, ReactNode, useCallback, useState, createContext } from 'react';

export interface LayoutContextValues {
  sidebarWidth: number;
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarStatus: (status: boolean) => void;
  selfMenuOpened: boolean;
  toggleSelfMenu: () => void;
  setSelfMenuStatus: (status: boolean) => void;
}

const LayoutContextDefaultValues: LayoutContextValues = {
  sidebarWidth: 0,
  sidebarExpanded: true,
  toggleSidebar: () => {},
  setSidebarStatus: () => {},
  selfMenuOpened: false,
  toggleSelfMenu: () => {},
  setSelfMenuStatus: () => {},
};

export const LayoutContext = createContext<LayoutContextValues>(
  LayoutContextDefaultValues,
);

const LayoutProvider: FC<{
  sidebarWidth: number;
  defaultSidebarExpanded?: boolean;
  children?: ReactNode;
}> = ({ sidebarWidth, defaultSidebarExpanded = true, children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    defaultSidebarExpanded,
  );
  const [selfMenuOpened, setSelfMenuOpened] = useState<boolean>(false);

  const toggleSidebar = useCallback(() => {
    setSidebarExpanded((s) => !s);
  }, []);
  const setSidebarStatus = useCallback((status: boolean) => {
    setSidebarExpanded(status);
  }, []);

  const toggleSelfMenu = useCallback(() => {
    setSelfMenuOpened((s) => !s);
  }, []);
  const setSelfMenuStatus = useCallback((status: boolean) => {
    setSelfMenuOpened(status);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        sidebarWidth,
        sidebarExpanded,
        toggleSidebar,
        setSidebarStatus,
        selfMenuOpened,
        toggleSelfMenu,
        setSelfMenuStatus,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
