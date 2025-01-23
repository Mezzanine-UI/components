import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { CalendarConfigProvider } from '@mezzanine-ui/react';
import calendarMethodsDayjs from '@mezzanine-ui/core/calendarMethodsDayjs';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { DateRangePickerField } from './index';

const meta = {
  component: DateRangePickerField,
} satisfies Meta<typeof DateRangePickerField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  range: [string, string];
}

export const Default: Story = {
  args: {
    registerName: 'range',
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
        range: ['', ''],
      },
    });

    return (
      <CalendarConfigProvider methods={calendarMethodsDayjs}>
        <FormFieldsWrapper methods={methods}>
          <DateRangePickerField {...args} />
        </FormFieldsWrapper>
      </CalendarConfigProvider>
    );
  },
};

export const DisableAfterToday: Story = {
  args: {
    registerName: 'range',
    label: '標籤',
    width: 360,
    size: 'large',
    isDateDisabled: (date) => dayjs(date).isAfter(dayjs(), 'day'),
    disabled: false,
    clearable: true,
    required: false,
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
      include: ['label', 'width', 'size', 'disabled', 'clearable', 'required'],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        range: ['', ''],
      },
    });

    return (
      <CalendarConfigProvider methods={calendarMethodsDayjs}>
        <FormFieldsWrapper methods={methods}>
          <DateRangePickerField {...args} />
        </FormFieldsWrapper>
      </CalendarConfigProvider>
    );
  },
};

export const DisableBeforeToday: Story = {
  args: {
    registerName: 'range',
    label: '標籤',
    width: 360,
    size: 'large',
    isDateDisabled: (date) => dayjs(date).isBefore(dayjs(), 'day'),
    disabled: false,
    clearable: true,
    required: false,
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
      include: ['label', 'width', 'size', 'disabled', 'clearable', 'required'],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        range: ['', ''],
      },
    });

    return (
      <CalendarConfigProvider methods={calendarMethodsDayjs}>
        <FormFieldsWrapper methods={methods}>
          <DateRangePickerField {...args} />
        </FormFieldsWrapper>
      </CalendarConfigProvider>
    );
  },
};
