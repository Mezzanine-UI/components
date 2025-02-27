import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@mezzanine-ui/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { BaseField } from './index';

const meta = {
  component: BaseField,
} satisfies Meta<typeof BaseField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  inputName: string;
}

export const Default: Story = {
  args: {
    name: 'inputName',
    label: '姓名',
    disabled: false,
    required: true,
    children: (
      <Input fullWidth size="large" placeholder="請輸入姓名" clearable />
    ),
    remark: 'remark',
    hints: [
      {
        severity: 'info',
        text: 'info',
      },
      {
        severity: 'success',
        text: 'success',
      },
      {
        severity: 'warning',
        text: 'warning',
      },
      {
        severity: 'error',
        text: 'error',
      },
    ],
  },
  parameters: {
    controls: {
      include: ['disabled', 'required'],
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
        <BaseField {...args} />
      </FormFieldsWrapper>
    );
  },
};
