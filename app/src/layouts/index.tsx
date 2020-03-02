import React, { Fragment } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
const BasicLayout: React.FC = props => {
  return <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>;
};

export default BasicLayout;
