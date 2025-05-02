import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { UploadFilesField } from './index';
import { UploadFilesFieldValues } from './typing';

const meta = {
  component: UploadFilesField,
} satisfies Meta<typeof UploadFilesField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  files: UploadFilesFieldValues[];
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
        <UploadFilesField {...args} />
      </FormFieldsWrapper>
    );
  },
};

export const HaveFilesLimit: Story = {
  args: {
    registerName: 'files',
    label: '標籤',
    width: 300,
    limit: 5,
    filesLimit: 1,
    hints: ['檔案大小：100MB'],
    accept: '.pdf, application/vnd.oasis.opendocument.text',
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
      include: ['filesLimit'],
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
        <UploadFilesField {...args} />
      </FormFieldsWrapper>
    );
  },
};

export const ReverseLayout: Story = {
  args: {
    registerName: 'files',
    label: '標籤',
    width: 300,
    limit: 5,
    hints: ['提示1', '提示2'],
    accept: '.pdf, application/vnd.oasis.opendocument.text',
    multiple: true,
    disabled: false,
    required: true,
    horizontal: false,
    reverseButtonAndFiles: true,
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
      include: ['reverseButtonAndFiles'],
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
        <UploadFilesField {...args} />
      </FormFieldsWrapper>
    );
  },
};

export const ENLanguageUploadFilesField: Story = {
  args: {
    ...Default.args,
    hints: ['Hits 1', 'Hits 2'],
    label: 'Label',
    buttonText: 'Add File',
    messages: {
      uploadFileExceededLimit: (file, limit) =>
        `file "${file.name}" is too large, please upload a file smaller than ${limit}MB.`,
      uploadFileFormatFailed: (file) =>
        `file "${file.name}" is not a valid file format, please upload a valid file.`,
    },
  },
  render: Default.render,
};
