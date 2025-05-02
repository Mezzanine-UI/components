import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { UploadImageField } from './index';

const meta = {
  component: UploadImageField,
} satisfies Meta<typeof UploadImageField>;

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

interface DemoFormValues {
  cover: string;
}

export const Default: Story = {
  args: {
    registerName: 'cover',
    label: '標籤',
    width: 300,
    height: 240,
    remark: 'remark',
    hints: ['提示1', '提示2'],
    disabled: false,
    required: false,
    horizontal: false,
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
  argTypes: {
    objectFit: {
      control: {
        type: 'radio',
      },
      options: ['contain', 'cover'],
    },
  },
  parameters: {
    controls: {
      include: [
        'label',
        'width',
        'height',
        'remark',
        'hints',
        'disabled',
        'required',
        'horizontal',
        'objectFit',
      ],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        cover: '',
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <UploadImageField {...args} />
      </FormFieldsWrapper>
    );
  },
};

export const ENLanguageImageField: Story = {
  args: {
    ...Default.args,
    limit: 1,
    label: 'Label',
    hints: ['Hint 1', 'Hint 2'],
    messages: {
      uploadFileExceededLimit: (file, limit) =>
        `file "${file.name}" is too large, please upload a file smaller than ${limit}MB.`,
      uploadFileFailed:
        'Sorry, upload failed, please try again or contact the administrator.',
      uploadSuccess: 'Great! Image upload successfully.',
    },
    defaultUploadLabel: 'Upload Image',
    defaultUploadingLabel: 'Uploading...',
    defaultUploadErrorLabel: 'Upload Error',
  },
  render: Default.render,
};
