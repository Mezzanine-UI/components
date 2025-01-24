import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { RangeSliderField } from './index';

const meta = {
  component: RangeSliderField,
} satisfies Meta<typeof RangeSliderField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  range: [number, number];
}

export const Default: Story = {
  args: {
    registerName: 'range',
    label: '標籤',
    width: 360,
    min: 0,
    max: 100,
    step: 1,
    remark: 'remark',
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
        'min',
        'max',
        'step',
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
        range: [10, 20],
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <RangeSliderField {...args} />
      </FormFieldsWrapper>
    );
  },
};
