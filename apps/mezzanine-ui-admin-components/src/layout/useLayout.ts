import { useContext } from 'react';
import { LayoutContext } from './LayoutProvider';

export const useLayout = () => {
  const layout = useContext(LayoutContext);

  if (!layout) {
    throw new Error('Please provide Layout');
  }

  return layout;
};
