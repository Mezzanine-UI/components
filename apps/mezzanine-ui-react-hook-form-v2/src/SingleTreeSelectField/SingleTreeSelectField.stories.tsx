import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { SelectValue } from '@mezzanine-ui/react';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { SingleTreeSelectField } from './index';

const meta = {
  component: SingleTreeSelectField,
} satisfies Meta<typeof SingleTreeSelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  inputName: SelectValue | null;
}

export const Default: Story = {
  args: {
    registerName: 'inputName',
    placeholder: '請選擇',
    options: [
      {
        id: 'theme1',
        name: '主題1',
        siblings: [
          {
            id: 'category1-1',
            name: '分類1-1',
          },
          {
            id: 'category1-2',
            name: '分類1-2',
            siblings: [
              {
                id: 'subcategory1-2-1',
                name: '子分類1-2-1',
              },
              {
                id: 'subcategory1-2-2',
                name: '子分類1-2-2',
              },
            ],
          },
        ],
      },
      {
        id: 'theme2',
        name: '主題2',
        siblings: [
          {
            id: 'category2-1',
            name: '分類2-1',
          },
          {
            id: 'category2-2',
            name: '分類2-2',
          },
        ],
      },
      {
        id: 'theme3',
        name: '主題3',
        siblings: [
          {
            id: 'category3-1',
            name: '分類3-1',
          },
          {
            id: 'category3-2',
            name: '分類3-2',
            siblings: [
              {
                id: 'subcategory3-2-1',
                name: '子分類3-2-1',
              },
              {
                id: 'subcategory3-2-2',
                name: '子分類3-2-2',
              },
            ],
          },
        ],
      },
    ],
    label: '標籤',
    width: 360,
    menuMaxHeight: 186,
    remark: 'remark',
    size: 'large',
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
        'clearable',
        'required',
        'horizontal',
      ],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        inputName: null,
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <FormFieldsDebug />
        <SingleTreeSelectField {...args} />
      </FormFieldsWrapper>
    );
  },
};
