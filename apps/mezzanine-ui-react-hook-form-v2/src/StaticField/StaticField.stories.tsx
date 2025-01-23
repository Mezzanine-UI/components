import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState, useMemo } from 'react';
import { Button } from '@mezzanine-ui/react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { StaticField } from './index';

const meta = {
  component: StaticField,
} satisfies Meta<typeof StaticField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  static: string;
}

export const Default: Story = {
  args: {
    registerName: 'static',
    label: '標籤',
    width: 200,
    remark: 'remark',
    hints: ['提示1', '提示2'],
    required: false,
    horizontal: false,
  },
  parameters: {
    controls: {
      include: ['label', 'width', 'remark', 'hints', 'required', 'horizontal'],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        static: 'Static Value',
      },
    });

    return (
      <FormFieldsWrapper
        methods={methods}
        onSubmit={async (values) => {
          action('onSubmit')(values);
        }}
      >
        <StaticField {...args} />
      </FormFieldsWrapper>
    );
  },
};
