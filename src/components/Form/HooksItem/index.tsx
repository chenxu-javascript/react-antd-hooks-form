import React from "react";
import { getValueByPath } from "./../../../utils/utils";
import BaseForm from "./../BaseForm";
interface IProps {
    item: any;
    defaultValue: any
}
const HooksItem: React.FC<IProps> = props => {
  const { item, defaultValue } = props;
  console.log(123);
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

export default HooksItem;