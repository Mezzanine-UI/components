import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { CalendarConfigProvider } from '@mezzanine-ui/react';
import calendarMethodsDayjs from '@mezzanine-ui/core/calendarMethodsDayjs';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { DateTimePickerField } from './index';

const meta = {
  component: DateTimePickerField,
} satisfies Meta<typeof DateTimePickerField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  date: string;
}

export const Default: Story = {
  args: {
    registerName: 'date',
    placeholder: '選擇日期時間',
    label: '標籤',
    width: 360,
    remark: 'remark',
    size: 'large',
    hints: ['提示1', '提示2'],
    hideHour: false,
    hideMinute: false,
    hideSecond: false,
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
        'hideHour',
        'hideMinute',
        'hideSecond',
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
          <DateTimePickerField {...args} />
        </FormFieldsWrapper>
      </CalendarConfigProvider>
    );
  },
};
