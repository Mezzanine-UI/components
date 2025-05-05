/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, ReactNode, useCallback, useState, createContext } from 'react';

export interface LayoutContextValues {
  sidebarWidth: number;
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarStatus: (status: boolean) => void;
}

const LayoutContextDefaultValues: LayoutContextValues = {
  sidebarWidth: 0,
  sidebarExpanded: true,
  toggleSidebar: () => {},
  setSidebarStatus: () => {},
};

export const LayoutContext = createContext<LayoutContextValues>(
  LayoutContextDefaultValues,
);

const LayoutProvider: FC<{
  sidebarWidth: number;
  defaultSidebarExpanded?: boolean;
  children?: ReactNode;
}> = ({ sidebarWidth, defaultSidebarExpanded = true, children }) => {
  const [sidebarExpanded, setExpanded] = useState<boolean>(
    defaultSidebarExpanded,
  );

  const toggleSidebar = useCallback(() => {
    setExpanded((s) => !s);
  }, []);
  const setSidebarStatus = useCallback((status: boolean) => {
    setExpanded(status);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        sidebarWidth,
        sidebarExpanded,
        toggleSidebar,
        setSidebarStatus,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
