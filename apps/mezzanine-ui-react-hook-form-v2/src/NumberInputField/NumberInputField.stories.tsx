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

export const Min: Story = {
  args: {
    registerName: 'inputName',
    label: '標籤',
    width: 240,
    minValue: 0,
    disabled: false,
    required: false,
    horizontal: false,
  },
  parameters: {
    controls: {
      include: ['minValue'],
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p>minValue: {args.minValue}</p>
          <NumberInputField {...args} />
        </div>
      </FormFieldsWrapper>
    );
  },
};

export const Max: Story = {
  args: {
    registerName: 'inputName',
    label: '標籤',
    width: 240,
    maxValue: 10,
    disabled: false,
    required: false,
    horizontal: false,
  },
  parameters: {
    controls: {
      include: ['maxValue'],
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p>maxValue: {args.maxValue}</p>
          <NumberInputField {...args} />
        </div>
      </FormFieldsWrapper>
    );
  },
};
