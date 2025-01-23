import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { SingleSelectField } from './index';

const meta = {
  component: SingleSelectField,
} satisfies Meta<typeof SingleSelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  inputName: string;
}

export const Default: Story = {
  args: {
    registerName: 'inputName',
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
        inputName: '',
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <SingleSelectField {...args} />
      </FormFieldsWrapper>
    );
  },
};

export const Horizontal: Story = {
  args: {
    registerName: 'inputName',
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
    ],
    label: '水平標籤：',
    width: 360,
    disabled: false,
    clearable: true,
    horizontal: true,
  },

  parameters: {
    controls: {
      include: ['placeholder', 'label', 'width', 'disabled', 'clearable'],
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
        <SingleSelectField {...args} />
      </FormFieldsWrapper>
    );
  },
};
