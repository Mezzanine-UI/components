import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { InputField } from './index';

const meta = {
  component: InputField,
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  inputName: string;
}

export const Default: Story = {
  args: {
    registerName: 'inputName',
    placeholder: '輸入文字',
    label: '標籤',
    width: 360,
    remark: 'remark',
    size: 'large',
    hints: ['提示1', '提示2'],
    disabled: false,
    clearable: true,
    required: false,
    horizontal: false,
  },
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      options: ['large', 'medium', 'small'],
    },
  },
  parameters: {
    controls: {
      include: [
        'placeholder',
        'label',
        'width',
        'remark',
        'size',
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
        inputName: '',
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <InputField {...args} />
      </FormFieldsWrapper>
    );
  },
};
