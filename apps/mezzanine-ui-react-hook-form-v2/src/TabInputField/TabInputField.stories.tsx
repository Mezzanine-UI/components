import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { TabInputField } from './index';

const meta = {
  component: TabInputField,
} satisfies Meta<typeof TabInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  tab: string;
}

export const Default: Story = {
  args: {
    registerName: 'tab',
    options: [
      {
        id: 'tab1',
        name: 'Tab1',
      },
      {
        id: 'tab2',
        name: 'Tab2',
      },
      {
        id: 'tab3',
        name: 'Tab3',
      },
    ],
    onChange: (newTab) => {
      action('onChange')(newTab);
    },
  },
  parameters: {
    controls: {
      include: [],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        tab: 'tab1',
      },
    });

    return (
      <FormFieldsWrapper methods={methods}>
        <TabInputField {...args} />
      </FormFieldsWrapper>
    );
  },
};
