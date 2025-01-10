import { ReactNode } from 'react';
import { ModalSize, ModalProps } from '@mezzanine-ui/react';

export interface ModalConfigType extends ModalProps {
  size?: ModalSize;
  className?: string;
  width?: number;
  children?: ReactNode;
}
