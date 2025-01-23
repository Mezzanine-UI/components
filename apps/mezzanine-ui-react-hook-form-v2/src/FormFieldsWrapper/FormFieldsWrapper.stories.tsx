import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState, useMemo } from 'react';
import { Button } from '@mezzanine-ui/react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { FormFieldsWrapper } from './index';

const StoryWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 16,
      }}
    >
      {children}
    </div>
  );
};

const meta = {
  component: StoryWrapper,
} satisfies Meta<typeof StoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoFormValues {
  input1: string;
  input2: string;
  input3: string;
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
        input3: '333',
      },
    });

    return (
      <FormFieldsWrapper
        methods={methods}
        onSubmit={async (values) => {
          action('onSubmit')(values);
        }}
      >
        <StoryWrapper>
          <InputField label="input1" registerName="input1" required />
          <InputField label="input2" registerName="input2" required />
          <InputField label="input3" registerName="input3" required />
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </StoryWrapper>
      </FormFieldsWrapper>
    );
  },
};

export const WthFooter: Story = {
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
        input3: '333',
      },
    });

    return (
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
        <StoryWrapper>
          <InputField label="input1" registerName="input1" required />
          <InputField label="input2" registerName="input2" required />
          <InputField label="input3" registerName="input3" required />
        </StoryWrapper>
      </FormFieldsWrapper>
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
        input3: '333',
      },
    });

    return (
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
        <StoryWrapper>
          <InputField label="input1" registerName="input1" required />
          <InputField label="input2" registerName="input2" required />
          <InputField label="input3" registerName="input3" required />
        </StoryWrapper>
      </FormFieldsWrapper>
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
        input3: '',
      },
    });

    return (
      <FormFieldsWrapper
        methods={methods}
        haveFooter
        onSubmit={async (values) => {
          action('onSubmit')(values);
        }}
        submitButtonText="送出文字"
        disableSubmitButton={(values) =>
          !values.input1 || !values.input2 || !values.input3
        }
        onCancel={async (values) => {
          action('onCancel')(values);
        }}
        cancelButtonText="取消文字"
        disableCancelButton={(values) =>
          !!(values.input1 && values.input2 && values.input3)
        }
        onClickAction={async (values) => {
          action('onClickAction')(values);
        }}
        actionButtonText="左側文字"
        disableActionButton={(values) =>
          !values.input1 || !values.input2 || !values.input3
        }
      >
        <StoryWrapper>
          <InputField label="input1" registerName="input1" required />
          <InputField label="input2" registerName="input2" required />
          <InputField label="input3" registerName="input3" required />
        </StoryWrapper>
      </FormFieldsWrapper>
    );
  },
};

const steps = [
  {
    id: 'STEP1',
    name: '第一步',
  },
  {
    id: 'STEP2',
    name: '第二步',
  },
  {
    id: 'STEP3',
    name: '第三步',
  },
];

export const WithTab: Story = {
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
        input3: '',
      },
    });

    const [activeStep, setActiveStep] = useState<number>(0);

    const fieldComponent = useMemo(() => {
      switch (activeStep) {
        case 0:
          return (
            <InputField
              key={activeStep}
              label="input1"
              registerName="input1"
              required
            />
          );

        case 1:
          return (
            <InputField
              key={activeStep}
              label="input2"
              registerName="input2"
              required
            />
          );

        case 2:
          return (
            <InputField
              key={activeStep}
              label="input3"
              registerName="input3"
              required
            />
          );

        default:
          return null;
      }
    }, [activeStep]);

    return (
      <FormFieldsWrapper
        methods={methods}
        haveFooter
        onSubmit={async (values) => {
          action('onSubmit')(values);
        }}
        submitButtonText="送出文字"
        disableSubmitButton={(values) =>
          !values.input1 || !values.input2 || !values.input3
        }
        onCancel={async (values) => {
          action('onCancel')(values);
        }}
        cancelButtonText="取消文字"
        onClickAction={async (values) => {
          action('onClickAction')(values);
        }}
        actionButtonText="左側文字"
        steps={steps}
        activeStep={activeStep}
        setActiveStep={(s) => {
          setActiveStep(s);
        }}
        disableNextButton={({ values, activeStep }) => {
          switch (activeStep) {
            case 0:
              return !values.input1;

            case 1:
              return !values.input2;

            default:
              return false;
          }
        }}
      >
        <StoryWrapper>{fieldComponent}</StoryWrapper>
      </FormFieldsWrapper>
    );
  },
};
