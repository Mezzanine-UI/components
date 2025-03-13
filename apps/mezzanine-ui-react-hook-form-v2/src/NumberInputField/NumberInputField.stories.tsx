import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { NumberInputField } from './index';

const meta = {
  component: NumberInputField,
} satisfies Meta<typeof NumberInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  inputName: number;
}

export const Default: Story = {
  args: {
    registerName: 'inputName',
    label: '標籤',
    width: 240,
    hints: ['提示1', '提示2'],
    disabled: false,
    required: false,
    horizontal: false,
  },
  parameters: {
    controls: {
      include: [
        'label',
        'width',
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
        inputName: 1,
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <NumberInputField {...args} />
      </FormFieldsWrapper>
    );
  },
};
