import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { SliderField } from './index';

const meta = {
  component: SliderField,
} satisfies Meta<typeof SliderField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  slide: number;
}

export const Default: Story = {
  args: {
    registerName: 'slide',
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
        slide: 10,
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <SliderField {...args} />
      </FormFieldsWrapper>
    );
  },
};
