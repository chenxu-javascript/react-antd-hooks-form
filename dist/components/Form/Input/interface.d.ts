export interface IProps {
    defaultValue?: string;
    disabled?: boolean;
    allowClear?: boolean;
    value?: string | number | string[] | undefined;
    type?: "text" | "textarea";
    [propsName: string]: any;
}
