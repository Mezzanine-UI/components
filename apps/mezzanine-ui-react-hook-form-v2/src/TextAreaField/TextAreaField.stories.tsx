import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { TextAreaField } from './index';

const meta = {
  component: TextAreaField,
} satisfies Meta<typeof TextAreaField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  text: string;
}

export const Default: Story = {
  args: {
    registerName: 'text',
    label: '標籤',
    width: 360,
    height: 150,
    remark: 'remark',
    hints: ['提示1', '提示2'],
    disabled: false,
    clearable: true,
    required: false,
    horizontal: false,
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
        'clearable',
        'required',
        'horizontal',
      ],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        text: '',
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <TextAreaField {...args} />
      </FormFieldsWrapper>
    );
  },
};
