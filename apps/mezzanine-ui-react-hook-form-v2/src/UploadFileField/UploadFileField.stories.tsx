import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { UploadFileField } from './index';
import { UploadFileFieldValues } from './typing';

const meta = {
  component: UploadFileField,
} satisfies Meta<typeof UploadFileField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  files: UploadFileFieldValues[];
}

export const Default: Story = {
  args: {
    registerName: 'files',
    label: '標籤',
    width: 300,
    limit: 5,
    hints: ['提示1', '提示2'],
    accept: '.pdf, application/vnd.oasis.opendocument.text',
    multiple: false,
    disabled: false,
    required: false,
    horizontal: false,
    setFileUrl: (fileId) => `host/${fileId}`,
    upload: async (file) => {
      action('upload')(file);

      return {
        id: file.name,
      };
    },
  },
  parameters: {
    controls: {
      include: [
        'label',
        'width',
        'limit',
        'hints',
        'accept',
        'multiple',
        'disabled',
        'required',
        'horizontal',
      ],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        files: [],
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <UploadFileField {...args} />
      </FormFieldsWrapper>
    );
  },
};
