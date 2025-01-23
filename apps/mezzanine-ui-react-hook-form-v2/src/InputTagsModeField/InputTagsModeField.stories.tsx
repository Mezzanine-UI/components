import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { InputTagsModeField } from './index';

const meta = {
  component: InputTagsModeField,
} satisfies Meta<typeof InputTagsModeField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  inputName: string[];
}

export const Default: Story = {
  args: {
    registerName: 'inputName',
    placeholder: '輸入標籤',
    label: '標籤',
    width: 500,
    maxTagsLength: 5,
    remark: 'remark',
    size: 'large',
    hints: ['提示1', '提示2'],
    disabled: false,
    clearable: true,
    required: false,
    horizontal: false,
    onTagsChange: (tags) => action('onTagsChange')(tags),
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
        'maxTagsLength',
        'remark',
        'size',
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
        inputName: [],
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <InputTagsModeField {...args} />
      </FormFieldsWrapper>
    );
  },
};
