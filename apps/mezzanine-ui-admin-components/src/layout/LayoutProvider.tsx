/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, ReactNode, useCallback, useState, createContext } from 'react';

interface LayoutContextTypes {
  sidebarWidth: number;
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarStatus: (status: boolean) => void;
}

const LayoutContextDefaultValues: LayoutContextTypes = {
  sidebarWidth: 0,
  sidebarExpanded: true,
  toggleSidebar: () => {},
  setSidebarStatus: () => {},
};

export const LayoutContext = createContext<LayoutContextTypes>(
  LayoutContextDefaultValues,
);

const LayoutProvider: FC<{ sidebarWidth: number; children?: ReactNode }> = ({
  sidebarWidth,
  children,
}) => {
  const [sidebarExpanded, setExpanded] = useState<boolean>(true);

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
