import React from 'react';
import styles from './index.less';
// import 'antd/dist/antd.css';

const BasicLayout: React.FC = props => {
  return (
    <div >
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
