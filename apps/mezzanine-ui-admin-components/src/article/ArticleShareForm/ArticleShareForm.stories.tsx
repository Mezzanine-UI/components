import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldsWrapper } from '@mezzanine-ui/react-hook-form-v2';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { ArticleShareForm } from './index';

const meta = {
  component: ArticleShareForm,
} satisfies Meta<typeof ArticleShareForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sectionTitle: '基本資訊',
    uploadSectionTitle: '上傳封面',
    twTitle: {
      label: '中文標題',
      registerName: 'tw_title',
      placeholder: '請輸入中文標題',
      size: 'small',
      maxLength: 15,
      hints: ['我比較小', '提示'],
      required: true,
    },
    enTitle: {
      label: '英文標題',
      registerName: 'en_title',
      placeholder: '請輸入英文標題',
      size: 'medium',
      maxLength: 50,
      hints: ['中'],
      required: false,
    },
    twAuthor: {
      label: '中文作者',
      registerName: 'tw_author',
    },
    enAuthor: {
      label: '英文作者',
      registerName: 'en_author',
    },
    cover: {
      width: 300,
      height: 240,
      label: '封面',
      registerName: 'cover',
      fileHost: '/files',
      upload: async (file) => {
        action('upload')(file);
        return {
          id: 'cover id',
        };
      },
      required: true,
    },
    twAlt: {
      label: '中文 Alt',
      registerName: 'tw_alt',
      required: true,
    },
    enAlt: {
      label: '英文 Alt',
      registerName: 'en_alt',
    },
    coverHints: [
      '檔案格式：限 JPG 或 PNG',
      '檔案大小：不可大於 10 MB',
      '建議尺寸：2400*1600（比例 3:2）。尺寸若超出範圍，系統將會自動置中，並裁切多餘部分。',
    ],
  },
  parameters: {
    controls: {
      include: [
        'sectionTitle',
        'uploadSectionTitle',
        'twTitle',
        'enTitle',
        'twAuthor',
        'enAuthor',
        'cover',
        'twAlt',
        'enAlt',
        'coverHints',
      ],
    },
  },
  render: function Render(args) {
    const methods = useForm();

    return (
      <FormFieldsWrapper methods={methods}>
        <ArticleShareForm {...args} />
      </FormFieldsWrapper>
    );
  },
};
