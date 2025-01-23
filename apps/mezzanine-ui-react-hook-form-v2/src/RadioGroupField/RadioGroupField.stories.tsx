import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Radio } from '@mezzanine-ui/react';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { RadioGroupField } from './index';

const meta = {
  component: RadioGroupField,
} satisfies Meta<typeof RadioGroupField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  radioName: string;
}

export const Default: Story = {
  args: {
    registerName: 'radioName',
    label: '標籤',
    remark: 'remark',
    size: 'medium',
    hints: ['提示1', '提示2'],
    orientation: 'horizontal',
    disabled: false,
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
        'size',
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
        radioName: 'Option1',
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <RadioGroupField {...args}>
          <Radio value="Option1">選項 1</Radio>
          <Radio value="Option2">選項 2</Radio>
          <Radio value="Option3">選項 3</Radio>
        </RadioGroupField>
      </FormFieldsWrapper>
    );
  },
};
