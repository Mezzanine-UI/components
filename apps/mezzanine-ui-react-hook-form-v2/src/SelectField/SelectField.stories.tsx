import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { SelectField } from './index';

const meta = {
  component: SelectField,
} satisfies Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    mode: 'single',
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
    clearable: true,
  },
  parameters: {
    controls: {
      include: ['placeholder', 'label', 'width', 'clearable'],
    },
  },
  render: function Render(args) {
    const methods = useForm<{ inputName: string }>({
      defaultValues: {
        inputName: 'option2',
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <SelectField {...args} />
      </FormFieldsWrapper>
    );
  },
};

export const Multiple: Story = {
  args: {
    mode: 'multiple',
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
    clearable: true,
  },
  parameters: {
    controls: {
      include: ['placeholder', 'label', 'width', 'clearable'],
    },
  },
  render: function Render(args) {
    const methods = useForm<{ inputName: string[] }>({
      defaultValues: {
        inputName: ['option1'],
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <SelectField {...args} />
      </FormFieldsWrapper>
    );
  },
};
