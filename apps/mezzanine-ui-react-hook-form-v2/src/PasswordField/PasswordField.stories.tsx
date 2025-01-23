import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { PasswordField } from './index';

const meta = {
  component: PasswordField,
} satisfies Meta<typeof PasswordField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  password: string;
}

export const Default: Story = {
  args: {
    registerName: 'password',
    label: '密碼',
    width: 360,
    remark: 'remark',
    size: 'large',
    hints: ['提示1', '提示2'],
    disabled: false,
    required: true,
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
        'label',
        'width',
        'remark',
        'size',
        'hints',
        'disabled',
        'required',
        'horizontal',
      ],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        password: '',
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <PasswordField {...args} />
      </FormFieldsWrapper>
    );
  },
};
