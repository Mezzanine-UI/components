import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldsWrapper } from '@mezzanine-ui/react-hook-form-v2';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import DialogProvider from '../dialog/DialogProvider';
import { UploadImagesWall } from './index';

const meta = {
  component: UploadImagesWall,
} satisfies Meta<typeof UploadImagesWall>;

export default meta;

type Story = StoryObj<typeof meta>;

function getBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const baseURL = reader.result as string;
      resolve(baseURL);
    };
  });
}

export const Default: Story = {
  args: {
    registerName: 'images',
    limit: 20,
    maxLength: 12,
    hints: ['檔案格式：限 JPG 或 PNG', '檔案大小：不可大於 20 MB'],
    setFileUrl: (fileId) => fileId,
    upload: async (file) => {
      action('upload')(file);
      const baseURL = await getBase64(file);

      return {
        id: baseURL,
      };
    },
    objectFit: 'cover',
  },
  parameters: {
    controls: {
      include: ['limit', 'maxLength', 'hints', 'objectFit'],
    },
  },
  render: function Render(args) {
    const methods = useForm();

    return (
      <DialogProvider>
        <FormFieldsWrapper methods={methods}>
          <UploadImagesWall {...args} />
        </FormFieldsWrapper>
      </DialogProvider>
    );
  },
};

export const CustomTexts: Story = {
  args: {
    ...Default.args,
    showMaxImageLengthNotice: false,
    hints: ['File format: JPG or PNG only', 'File size: cannot exceed 20 MB'],
    texts: {
      fileExceededLimit: (file: File, limit: number) =>
        `${file.name} upload failed (file size exceeds ${limit} MB)`,
      fileUploadFailed: (file: File) =>
        `${file.name} upload failed (invalid file format)`,
      maxImageLengthNotice: (maxLength: number) =>
        `Maximum ${maxLength} images`,
      deleteWallDialogTitle: 'Confirm to delete this image wall?',
      deleteWallDialogChildren:
        'The image wall will be removed, and all image content within it will also be deleted. This action cannot be undone.',
      deleteWallDialogCancelText: 'Cancel',
      deleteWallDialogConfirmText: 'Delete image wall',
      deleteWallActionText: 'Delete image wall',
      editWallActionText: 'Edit image wall',
      createWallActionText: 'Create image wall',
    },
    modalTexts: {
      editModalHeaderText: 'Edit image wall',
      editModalConfirmText: 'Confirm edit',
      createModalHeaderText: 'Create image wall',
      createModalConfirmText: 'Confirm create',
      emptyGalleryText: 'Not images yet',
      modalActionCancelText: 'Cancel',
      modalActionUploadText: 'Add image',
      currentImageLength: (currentSize: number, maxLength: number) =>
        `Uploaded images: ${currentSize}/${maxLength}`,
      fileExceededLimit: (file: File, limit: number) =>
        `${file.name} upload failed (file size exceeds ${limit} MB)`,
      fileUploadFailed: (file: File) =>
        `${file.name} upload failed (invalid file format)`,
      uploadedImagesText: (currentIndex: number, maxLength: number) =>
        `${currentIndex}/${maxLength}`,
    },
  },
  render: Default.render,
};
