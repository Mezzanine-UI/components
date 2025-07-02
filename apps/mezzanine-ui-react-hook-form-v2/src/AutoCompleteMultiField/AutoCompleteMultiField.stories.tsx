import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { SelectValue } from '@mezzanine-ui/react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { AutoCompleteMultiField } from './index';

const meta = {
  component: AutoCompleteMultiField,
} satisfies Meta<typeof AutoCompleteMultiField>;

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
        multi: [],
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <FormFieldsDebug />
        <AutoCompleteMultiField {...args} />
      </FormFieldsWrapper>
    );
  },
};

export const ValueIsOptionsArray: Story = {
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
    valueIsStringArray: false,
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
    const methods = useForm<{
      multi: SelectValue[];
    }>({
      defaultValues: {
        multi: [],
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <FormFieldsDebug />
        <AutoCompleteMultiField {...args} />
      </FormFieldsWrapper>
    );
  },
};

export const Addable: Story = {
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
    onInput: action('onInput'),
    addable: true,
  },
  parameters: {
    controls: {
      include: ['placeholder', 'label', 'width'],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        multi: [],
      },
    });

    const [currentOptions, setCurrentOptions] = useState<SelectValue[]>(
      args.options,
    );

    const onInsert = useCallback((text: string) => {
      setCurrentOptions((options) => [
        ...options,
        {
          id: text,
          name: text,
        },
      ]);

      action('onInsert')(text);

      return {
        id: text,
        name: text,
      };
    }, []);

    return (
      <FormFieldsWrapper methods={methods}>
        <AutoCompleteMultiField
          {...args}
          options={currentOptions}
          onInsert={onInsert}
        />
      </FormFieldsWrapper>
    );
  },
};
