export interface IProps {
  options: any[];
  value_key?: string;
  label_key?: string;
  defaultValue?: string;
  disabled?: boolean;
  allowClear?: boolean;
  value?: any;
  show_empty?: boolean;
  [propsName: string]: any;
}
