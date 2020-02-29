'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactHookForm = require('react-hook-form');
var antd = require('antd');
var moment = _interopDefault(require('moment'));
require('classnames');
require('react-resizable');

var FormItems = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get onRenderHooks () { return onRenderHooks; },
    get BaseForm () { return BaseForm; },
    get CheckBox () { return SelectCompanent; },
    get DatePicker () { return DatePickerComponent; },
    get DateTimePicker () { return DatetimePicker; },
    get Form () { return Form; },
    get Input () { return InputCompanent; },
    get InputNumber () { return InputNumberComponent; },
    get Radio () { return SelectCompanent$1; },
    get Select () { return SelectCompanent$2; }
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var styles = ".error {\n  width: auto;\n  min-height: 16px;\n  line-height: 18px;\n  color: #f5222d;\n  word-break: break-all;\n  word-wrap: break-word;\n}\n";

const BaseForm = props => {
    const { errors, control } = reactHookForm.useFormContext();
    const { rules, label, value, input_type, name = "", className = "", disabled = false, show_required = true, extend_text = "", is_required = 2 } = props, otherparams = __rest(props, ["rules", "label", "value", "input_type", "name", "className", "disabled", "show_required", "extend_text", "is_required"]);
    const params = Object.assign(Object.assign({}, otherparams), { value, defaultValue: value, disabled });
    const FormItem = FormItems[input_type];
    if (!FormItem) {
        console.log(`${input_type} 当前组件不支持`);
        return null;
    }
    return (React__default.createElement("div", { className: "hooks-row hooks-form-item", key: name || new Date().getTime() },
        !!label && (React__default.createElement("div", { className: "hooks-col hooks-form-item-label" },
            React__default.createElement("label", { htmlFor: name },
                show_required && ((rules === null || rules === void 0 ? void 0 : rules.required) || is_required === 1) && (React__default.createElement("span", { className: styles.required }, "*")),
                label))),
        React__default.createElement("div", { className: "hooks-col hooks-form-item-wrapper" },
            React__default.createElement(reactHookForm.Controller, { as: React__default.createElement(FormItem, Object.assign({}, params)), defaultValue: value, control: control, rules: rules, name: name }),
            React__default.createElement("div", { className: styles.error },
                " ",
                errors[name] && errors[name]["message"]))));
};

/**
 * 循环检测 达成条件 回调fn
 * @param {*} fn
 * @param {*} cod
 */
/**
 * 获取值通过路径 getValueByPath({ id: { number: 1}}, "id.number")
 * @param {*} obj 对象
 * @param {*} path 路径
 */
const getValueByPath = (obj, path) => {
    var reg = /(?:(?:^|\.)([^\.\[\]]+))|(?:\[([^\[\]]+)\])/g;
    var names = [];
    var name = null;
    while ((name = reg.exec(path)) != null) {
        names.push(name[1] || name[2]);
    }
    var o = obj;
    for (var i = 0; i < names.length; i++) {
        o = o === null || o === void 0 ? void 0 : o[names[i]];
        if (o === undefined) {
            return undefined;
        }
    }
    return o;
};
/**
 * 是否为数组且数组长度>0
 * @param {*} arr
 */
const isArray = (arr) => {
    return arr && arr instanceof Array && !!arr["length"];
};
/**
 * 是否为对象 且不为空
 * @param {*} obj
 */
const isObject = (obj) => {
    return obj && obj instanceof Object && !(obj instanceof Array) && !!Object.keys(obj).length;
};

const { Group } = antd.Checkbox;
const SelectCompanent = props => {
    const { name, style, value, options, disabled, mode = "default", show_all = false, value_key = "id", show_empty = false, label_key = "name", placeholder = "请选择" } = props, otherParams = __rest(props, ["name", "style", "value", "options", "disabled", "mode", "show_all", "value_key", "show_empty", "label_key", "placeholder"]);
    const [new_options, setOptions] = React.useState([]);
    React.useEffect(() => {
        if (isArray(options)) {
            setOptions(options);
        }
    }, [label_key, options, show_all, value_key]);
    // 渲染空数据
    const renderEmpty = () => {
        if (mode === "default") {
            const has_empty_value = !new_options.find(l => l.id === value);
            return has_empty_value && React__default.createElement(antd.Checkbox, { value: value },
                "==",
                value,
                "==\u65E0\u5BF9\u5E94\u9009\u9879==");
        }
        else if (mode === "multiple") {
            let options_empty_array = [];
            value === null || value === void 0 ? void 0 : value.forEach((element) => {
                const has_value = new_options.find(l => l[value_key] === element);
                !has_value && options_empty_array.push(element);
            });
            return (React__default.createElement(React__default.Fragment, null, options_empty_array === null || options_empty_array === void 0 ? void 0 : options_empty_array.map((k) => {
                return React__default.createElement(antd.Checkbox, { value: k },
                    "==",
                    k,
                    "==\u65E0\u5BF9\u5E94\u9009\u9879==");
            })));
        }
        return null;
    };
    const props_data = {
        mode,
        value,
        defaultValue: value,
        disabled: !!disabled,
        style: Object.assign({ width: "100%" }, style)
    };
    if (!isArray(new_options)) {
        return React__default.createElement(Group, Object.assign({}, props_data, otherParams));
    }
    return (React__default.createElement(Group, Object.assign({}, props_data, otherParams),
        new_options.map((item, index) => {
            return (React__default.createElement(antd.Checkbox, Object.assign({}, item, { value: `${item[value_key]}`, label: item[label_key], disabled: !!disabled || !!item.disabled, key: `${item[value_key]}-${index}` }), item[label_key]));
        }),
        show_empty && renderEmpty()));
};

const format = {
    year: "YYYY",
    month: "YYYY-MM",
    date: "YYYY-MM-DD",
    time: "YYYY-MM-DD HH:mm:ss"
};
const DatePickerComponent = props => {
    const { placeholder = "请选择", mode = "date", onChange } = props, otherparams = __rest(props, ["placeholder", "mode", "onChange"]);
    const { value, defaultValue } = otherparams;
    const [_value, setValue] = React.useState(value || defaultValue || undefined);
    const handleOnChange = (value) => {
        if (mode === "month") {
            value = {
                start_time: value ? `${value.format(format[mode] || "YYYY-MM-DD")}-01` : undefined,
                end_time: value
                    ? `${value.format(format[mode] || "YYYY-MM-DD")}-${value.daysInMonth()}`
                    : undefined
            };
        }
        else {
            value = value ? value.format(format[mode] || "YYYY-MM-DD") : undefined;
        }
        setValue(value);
        onChange && onChange(value);
    };
    const new_value = _value
        ? moment(new Date(isObject(value) ? value["start_time"] : value))
        : undefined;
    const all_props = Object.assign(Object.assign({ allowClear: false, placeholder, style: { width: "100%" }, showTime: mode === "time" }, otherparams), { value: new_value, onChange: handleOnChange, onPanelChange: handleOnChange, format: format[mode] || "YYYY-MM-DD" });
    return React__default.createElement(antd.DatePicker, Object.assign({}, all_props));
};

const DatetimePicker = props => {
    return React__default.createElement(DatePickerComponent, Object.assign({}, props, { mode: "time" }));
};

const Form = props => {
    const { data, children, defaultValues, layout = "inline", labelAlign = "right", hideRequiredMark = false } = props;
    const renderForm = () => {
        return (React__default.createElement(React__default.Fragment, null, data.map((l) => {
            return onRenderHooks(l, defaultValues);
        })));
    };
    const className = `hooks-form hooks-form-${layout} label-${labelAlign} ${hideRequiredMark ? "hide_require" : ""}`;
    return React__default.createElement("form", { className: className }, children ? children : renderForm());
};

const InputCompanent = props => {
    const { value, placeholder = "请输入", style } = props, otherParams = __rest(props, ["value", "placeholder", "style"]);
    return (React__default.createElement(antd.Input, Object.assign({ key: `${props.id}-input`, autoComplete: "off" }, otherParams, { defaultValue: value, placeholder: placeholder, style: style })));
};

const InputNumberComponent = props => {
    const { placeholder = "请输入" } = props, otherparams = __rest(props, ["placeholder"]);
    return React__default.createElement(antd.InputNumber, Object.assign({}, otherparams, { placeholder: placeholder }));
};

const { Group: Group$1 } = antd.Radio;
const SelectCompanent$1 = props => {
    const { name, style, value, options, disabled, mode = "default", value_key = "id", show_empty = false, label_key = "name" } = props, otherParams = __rest(props, ["name", "style", "value", "options", "disabled", "mode", "value_key", "show_empty", "label_key"]);
    const [new_options, setOptions] = React.useState([]);
    React.useEffect(() => {
        if (isArray(options)) {
            setOptions(options);
        }
    }, [label_key, options, value_key]);
    // 渲染空数据
    const renderEmpty = () => {
        if (mode === "default") {
            const has_empty_value = !new_options.find(l => l.id === value);
            return has_empty_value && React__default.createElement(antd.Radio, { value: value },
                "==",
                value,
                "==\u65E0\u5BF9\u5E94\u9009\u9879==");
        }
        return null;
    };
    const props_data = {
        mode,
        value,
        defaultValue: value,
        disabled: !!disabled,
        style: Object.assign({ width: "100%" }, style)
    };
    if (!isArray(new_options)) {
        return React__default.createElement(Group$1, Object.assign({}, props_data, otherParams));
    }
    return (React__default.createElement(Group$1, Object.assign({}, props_data, otherParams),
        new_options.map((item, index) => {
            return (React__default.createElement(antd.Radio, Object.assign({}, item, { value: `${item[value_key]}`, label: item[label_key], disabled: !!disabled || !!item.disabled, key: `${item[value_key]}-${index}` }), item[label_key]));
        }),
        show_empty && renderEmpty()));
};

const { Option } = antd.Select;
const SelectCompanent$2 = props => {
    const { name, style, value, options, disabled, mode = "default", show_all = false, value_key = "id", show_empty = false, label_key = "name", placeholder = "请选择" } = props, otherParams = __rest(props, ["name", "style", "value", "options", "disabled", "mode", "show_all", "value_key", "show_empty", "label_key", "placeholder"]);
    const [new_options, setOptions] = React.useState([]);
    React.useEffect(() => {
        if (isArray(options)) {
            const all_option = { [value_key]: "", [label_key]: "全部" };
            if (show_all) {
                setOptions([all_option, ...options]);
            }
            else {
                setOptions(options);
            }
        }
    }, [label_key, options, show_all, value_key]);
    // 渲染空数据
    const renderEmpty = () => {
        if (mode === "default") {
            const has_empty_value = !new_options.find(l => l.id === value);
            return has_empty_value && React__default.createElement(Option, { value: value },
                "==",
                value,
                "==\u65E0\u5BF9\u5E94\u9009\u9879==");
        }
        else if (mode === "multiple") {
            let options_empty_array = [];
            value === null || value === void 0 ? void 0 : value.forEach((element) => {
                const has_value = new_options.find(l => l[value_key] === element);
                !has_value && options_empty_array.push(element);
            });
            return (React__default.createElement(React__default.Fragment, null, options_empty_array === null || options_empty_array === void 0 ? void 0 : options_empty_array.map((k) => {
                return React__default.createElement(Option, { value: k },
                    "==",
                    k,
                    "==\u65E0\u5BF9\u5E94\u9009\u9879==");
            })));
        }
        return null;
    };
    const props_data = {
        mode,
        value,
        placeholder,
        showSearch: true,
        defaultValue: value,
        disabled: !!disabled,
        style: Object.assign({ width: "100%" }, style),
        filterOption: (v, data) => {
            const { props } = data;
            const text = props[label_key] || "";
            v = v ? v.replace(/(^\s*)|(\s*$)/g, "") : null;
            return !v || `${text}`.toLowerCase().indexOf(`${v}`.toLowerCase()) !== -1;
        }
    };
    if (!isArray(new_options)) {
        return React__default.createElement(antd.Select, Object.assign({}, props_data, otherParams, { defaultValue: undefined }));
    }
    return (React__default.createElement(antd.Select, Object.assign({}, props_data, otherParams, { placeholder: placeholder }),
        new_options.map((item, index) => {
            return (React__default.createElement(Option, Object.assign({}, item, { value: `${item[value_key]}`, label: item[label_key], disabled: !!disabled || !!item.disabled, key: `${item[value_key]}-${index}` }), item[label_key]));
        }),
        show_empty && renderEmpty()));
};

// 工程化 导入 导出
const onRenderHooks = (item, defaultValue = {}) => {
    if (!item)
        return null;
    if (item.is_hide)
        return null;
    const value = getValueByPath(defaultValue, item === null || item === void 0 ? void 0 : item.name) || (item === null || item === void 0 ? void 0 : item.defaultValue);
    return (React__default.createElement(BaseForm, Object.assign({ id: `form-${(item === null || item === void 0 ? void 0 : item.element_id) || ""}-${(item === null || item === void 0 ? void 0 : item.name) || ""}`, key: `form-${(item === null || item === void 0 ? void 0 : item.element_id) || ""}-${item.name}`, disabled: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.disabled) === 1 || (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.disabled) === true }, item, { value: value })));
};

exports.BaseForm = BaseForm;
exports.CheckBox = SelectCompanent;
exports.DatePicker = DatePickerComponent;
exports.DateTimePicker = DatetimePicker;
exports.Form = Form;
exports.Input = InputCompanent;
exports.InputNumber = InputNumberComponent;
exports.Radio = SelectCompanent$1;
exports.Select = SelectCompanent$2;
exports.onRenderHooks = onRenderHooks;
