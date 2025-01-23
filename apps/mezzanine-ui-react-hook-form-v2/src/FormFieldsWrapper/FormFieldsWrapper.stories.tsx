import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { FormFieldsWrapper } from './index';

const StoryWrapper = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const meta = {
  component: StoryWrapper,
} satisfies Meta<typeof StoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  input1: string;
  input2: string;
}

export const Default: Story = {
  args: {
    children: undefined,
  },
  parameters: {
    controls: { include: [] },
  },
  render: function Render() {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        input1: '111',
        input2: '222',
      },
    });

    return (
      <StoryWrapper>
        <FormFieldsWrapper
          methods={methods}
          haveFooter
          onSubmit={async (values) => {
            action('onSubmit')(values);
          }}
          submitButtonText="送出文字"
          onCancel={async (values) => {
            action('onCancel')(values);
          }}
          cancelButtonText="取消文字"
        >
          <InputField label="input1" registerName="input1" required />
          <InputField label="input2" registerName="input2" required />
        </FormFieldsWrapper>
      </StoryWrapper>
    );
  },
};

export const WithAction: Story = {
  args: {
    children: undefined,
  },
  parameters: {
    controls: { include: [] },
  },
  render: function Render() {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        input1: '111',
        input2: '222',
      },
    });

    return (
      <StoryWrapper>
        <FormFieldsWrapper
          methods={methods}
          haveFooter
          onSubmit={async (values) => {
            action('onSubmit')(values);
          }}
          submitButtonText="送出文字"
          onCancel={async (values) => {
            action('onCancel')(values);
          }}
          cancelButtonText="取消文字"
          onClickAction={async (values) => {
            action('onClickAction')(values);
          }}
          actionButtonText="左側文字"
        >
          <InputField label="input1" registerName="input1" required />
          <InputField label="input2" registerName="input2" required />
        </FormFieldsWrapper>
      </StoryWrapper>
    );
  },
};

export const Disable: Story = {
  args: {
    children: undefined,
  },
  parameters: {
    controls: { include: [] },
  },
  render: function Render() {
    const methods = useForm<DemoFormValues>({
      defaultValues: {
        input1: '',
        input2: '',
      },
    });

    return (
      <StoryWrapper>
        <FormFieldsWrapper
          methods={methods}
          haveFooter
          onSubmit={async (values) => {
            action('onSubmit')(values);
          }}
          submitButtonText="送出文字"
          disableSubmitButton={(values) => !values.input1 || !values.input2}
          onCancel={async (values) => {
            action('onCancel')(values);
          }}
          cancelButtonText="取消文字"
          disableCancelButton={(values) => !!(values.input1 && values.input2)}
          onClickAction={async (values) => {
            action('onClickAction')(values);
          }}
          actionButtonText="左側文字"
          disableActionButton={(values) => !values.input1 || !values.input2}
        >
          <InputField label="input1" registerName="input1" required />
          <InputField label="input2" registerName="input2" required />
        </FormFieldsWrapper>
      </StoryWrapper>
    );
  },
};
