import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { MultiSelectField } from './index';

const meta = {
  component: MultiSelectField,
} satisfies Meta<typeof MultiSelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  multi: string[];
}

export const Default: Story = {
  args: {
    registerName: 'multi',
    placeholder: '請選擇',
    options: [
      {
        id: 'option1',
        name: '選項1',
      },
      {
        id: 'option2',
        name: '選項2',
      },
      {
        id: 'option3',
        name: '選項3',
      },
      {
        id: 'option4',
        name: '選項4',
      },
      {
        id: 'option5',
        name: '選項5',
      },
    ],
    label: '標籤',
    width: 360,
    menuMaxHeight: 186,
    remark: 'remark',
    size: 'large',
    menuSize: 'large',
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
    menuSize: {
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
        'menuMaxHeight',
        'remark',
        'size',
        'menuSize',
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
        multi: ['option4'],
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <MultiSelectField {...args} />
      </FormFieldsWrapper>
    );
  },
};
