import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { CalendarConfigProvider } from '@mezzanine-ui/react';
import calendarMethodsDayjs from '@mezzanine-ui/core/calendarMethodsDayjs';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { DatePickerField } from './index';

const meta = {
  component: DatePickerField,
} satisfies Meta<typeof DatePickerField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  date: string;
}

export const Default: Story = {
  args: {
    registerName: 'date',
    placeholder: '選擇日期',
    label: '標籤',
    width: 360,
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
        date: '',
      },
    });

    return (
      <CalendarConfigProvider methods={calendarMethodsDayjs}>
        <FormFieldsWrapper methods={methods}>
          <DatePickerField {...args} />
        </FormFieldsWrapper>
      </CalendarConfigProvider>
    );
  },
};

export const DisableAfterToday: Story = {
  args: {
    registerName: 'date',
    placeholder: '選擇日期',
    label: '標籤',
    width: 360,
    remark: 'remark',
    size: 'large',
    hints: ['提示1', '提示2'],
    isDateDisabled: (date) => dayjs(date).isAfter(dayjs(), 'day'),
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
        date: '',
      },
    });

    return (
      <CalendarConfigProvider methods={calendarMethodsDayjs}>
        <FormFieldsWrapper methods={methods}>
          <DatePickerField {...args} />
        </FormFieldsWrapper>
      </CalendarConfigProvider>
    );
  },
};

export const DisableBeforeToday: Story = {
  args: {
    registerName: 'date',
    placeholder: '選擇日期',
    label: '標籤',
    width: 360,
    remark: 'remark',
    size: 'large',
    hints: ['提示1', '提示2'],
    isDateDisabled: (date) => dayjs(date).isBefore(dayjs(), 'day'),
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
        date: '',
      },
    });

    return (
      <CalendarConfigProvider methods={calendarMethodsDayjs}>
        <FormFieldsWrapper methods={methods}>
          <DatePickerField {...args} />
        </FormFieldsWrapper>
      </CalendarConfigProvider>
    );
  },
};
