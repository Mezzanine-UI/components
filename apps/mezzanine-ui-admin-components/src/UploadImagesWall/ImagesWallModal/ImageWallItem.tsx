import { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Icon, IconButton, cx } from '@mezzanine-ui/react';
import { TimesCircleFilledIcon } from '@mezzanine-ui/icons';
import { UseFieldArraySwap, useWatch } from 'react-hook-form';
import { UploadImagesWallFormValues } from '../typing';
import classes from './index.module.scss';

interface ImageWallItemProps {
  registerName: string;
  setFileUrl: (fileId: string) => string;
  onRemove: VoidFunction;
  swap: UseFieldArraySwap;
  index: number;
  objectFit: 'cover' | 'contain';
}

const ImageWallItem: FC<ImageWallItemProps> = ({
  registerName,
  setFileUrl,
  onRemove,
  swap,
  index,
  objectFit,
}) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'WallItem',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { index },
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'WallItem',
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
    drop: (item: { index: number }) => {
      if (item.index !== index) {
        swap(item.index, index);
      }
    },
  }));

  const value: UploadImagesWallFormValues = useWatch({ name: registerName });

  return drop(
    drag(
      dragPreview(
        <div
          className={cx(classes.wallItem, {
            [classes.isDragging]: isDragging,
            [classes.isOver]: isOver,
          })}
        >
          <div className={classes.wallImageWrapper}>
            <img
              src={setFileUrl(value.fileId)}
              alt=""
              style={{ objectFit }}
              className={classes.wallImage}
            />
          </div>
          <IconButton
            type="button"
            color="secondary"
            className={classes.removeButton}
            onClick={onRemove}
          >
            <Icon icon={TimesCircleFilledIcon} className={classes.removeIcon} />
          </IconButton>
        </div>,
      ),
    ),
  );
};

export default ImageWallItem;
