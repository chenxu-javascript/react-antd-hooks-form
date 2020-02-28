// 工程化 导入 导出
import BaseForm from "./BaseForm";
import CheckBox from "./CheckBox";
import DatePicker from "./DatePicker";
import DateTimePicker from "./DateTimePicker";
import Form from "./Form";
import Input from "./Input";
import InputNumber from "./InputNumber";
import Radio from "./Radio";
import Select from "./Select";

import React from "react";
import { getValueByPath } from "../../utils/utils";


const onRenderHooks = (item: any, defaultValue: any = {}) => {
  if (!item) return null;
  if (item.is_hide) return null;
  const value: any = getValueByPath(defaultValue, item?.name) || item?.defaultValue;
  return (
    <BaseForm
      id={`form-${item?.element_id || ""}-${item?.name || ""}`}
      key={`form-${item?.element_id || ""}-${item.name}`}
      disabled={defaultValue?.disabled === 1 || defaultValue?.disabled === true}
      {...item}
      value={value}
    />
  );
};

export {
  onRenderHooks,
  BaseForm,
  CheckBox,
  DatePicker,
  DateTimePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select
};

