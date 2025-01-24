import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { AutoCompleteSingleField } from './index';

const meta = {
  component: AutoCompleteSingleField,
} satisfies Meta<typeof AutoCompleteSingleField>;

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
    hints: ['提示1', '提示2'],
    onInput: action('onInput'),
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
        inputName: '',
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <AutoCompleteSingleField {...args} />
      </FormFieldsWrapper>
    );
  },
};
