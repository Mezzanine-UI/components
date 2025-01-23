import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { SearchInputField } from './index';

const meta = {
  component: SearchInputField,
} satisfies Meta<typeof SearchInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  searchTerm: string;
}

export const Default: Story = {
  args: {
    registerName: 'searchTerm',
    suffix: '',
    width: 360,
    size: 'large',
    disabled: false,
    clearable: true,
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
      include: ['suffix', 'width', 'size', 'disabled', 'clearable'],
    },
  },
  render: function Render(args) {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        searchTerm: '',
      },
    });

    const searchTerm = methods.watch('searchTerm');

    useEffect(() => {
      action('onSearchTermChange')(searchTerm);
    }, [searchTerm]);

    return (
      <FormFieldsWrapper methods={methods}>
        <SearchInputField {...args} />
      </FormFieldsWrapper>
    );
  },
};
