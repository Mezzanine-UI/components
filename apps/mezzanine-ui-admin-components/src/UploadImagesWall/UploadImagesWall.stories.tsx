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
    fileHost: '',
    upload: async (file) => {
      action('upload')(file);
      const baseURL = await getBase64(file);

      return {
        id: baseURL,
      };
    },
  },
  parameters: {
    controls: {
      include: [],
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
