import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { CheckboxGroupField } from './index';

const meta = {
  component: CheckboxGroupField,
} satisfies Meta<typeof CheckboxGroupField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  checks: string[];
}

export const Default: Story = {
  args: {
    registerName: 'checks',
    options: [
      {
        label: '確認1',
        value: 'confirm1',
      },
      {
        label: '確認2',
        value: 'confirm2',
      },
      {
        label: '確認3',
        value: 'confirm3',
        disabled: true,
      },
    ],
    label: '標籤',
    remark: 'remark',
    hints: ['提示1', '提示2'],
    orientation: 'horizontal',
    disabled: false,
    required: false,
    horizontal: false,
  },
  argTypes: {
    orientation: {
      control: {
        type: 'radio',
      },
      options: ['horizontal', 'vertical'],
    },
  },
  parameters: {
    controls: {
      include: [
        'label',
        'remark',
        'hints',
        'orientation',
        'disabled',
        'required',
        'horizontal',
      ],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        checks: ['confirm1'],
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <CheckboxGroupField {...args} />
      </FormFieldsWrapper>
    );
  },
};
