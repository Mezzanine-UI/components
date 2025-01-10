/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, ReactNode, useCallback, useState, createContext } from 'react';

interface LayoutContextTypes {
  expanded: boolean;
  toggleSidebar: () => void;
  setSidebarStatus: (status: boolean) => void;
}

const LayoutContextDefaultValues: LayoutContextTypes = {
  expanded: true,
  toggleSidebar: () => {},
  setSidebarStatus: () => {},
};

export const LayoutContext = createContext<LayoutContextTypes>(
  LayoutContextDefaultValues,
);

const LayoutProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleSidebar = useCallback(() => {
    setExpanded((s) => !s);
  }, []);
  const setSidebarStatus = useCallback((status: boolean) => {
    setExpanded(status);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        expanded,
        toggleSidebar,
        setSidebarStatus,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
