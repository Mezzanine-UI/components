import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { CheckboxField } from './index';

const meta = {
  component: CheckboxField,
} satisfies Meta<typeof CheckboxField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  inputName: boolean;
}

export const Default: Story = {
  args: {
    registerName: 'inputName',
    name: '請確認',
    label: '標籤',
    remark: 'remark',
    hints: ['提示1', '提示2'],
    disabled: false,
    required: false,
    horizontal: false,
  },

  parameters: {
    controls: {
      include: [
        'name',
        'label',
        'remark',
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
        inputName: true,
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <CheckboxField {...args} />
      </FormFieldsWrapper>
    );
  },
};
