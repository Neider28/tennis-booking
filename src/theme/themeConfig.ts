import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#EFCB68',
    colorPrimaryHover: '#FFD639',
    fontFamily: 'Montserrat, sans-serif',
  },
  components: {
    Table: {
      borderColor: '#EFCB68',
      headerBg: '#000411',
      headerColor: '#EFCB68',
      colorText: '#000411',
    },
    Timeline: {
      tailColor: '#EFCB68',
    }
  }
};

export default theme;
