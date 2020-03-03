import React from "react";
import { FormPackage } from 'antd-pc-form-package';

const Demo = () => {
    const dataSource = [{
      key: 1,
      type: 1,
      name: 'name',
      label: 'name',
      value: '',
      placeholder: 'input name',
      rules: [{ required: true, message: 'input name' }],
    }];
    const getFormValues = () => {}
    return (
      <FormPackage dataSource={dataSource} getFormValues={getFormValues} />
    );
}

export default Demo;