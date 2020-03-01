'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactHookForm = require('react-hook-form');
var antd = require('antd');
var moment = _interopDefault(require('moment'));
var classnames = _interopDefault(require('classnames'));
var reactResizable = require('react-resizable');

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
const bsRunWhen = (fn, cod) => {
    if (cod()) {
        fn();
        return;
    }
    var i = 0;
    var interval = setInterval(function () {
        i++;
        if (i > 500) {
            clearInterval(interval);
        }
        else if (cod()) {
            fn();
            clearInterval(interval);
        }
    }, 30);
};
/**
 * 循环检测 cod 达成条件 await bsCheck(() => {})
 * @param {*} cod
 */
const bsCheck = (cod) => {
    return new Promise(function (resolve) {
        bsRunWhen(resolve, cod);
    });
};
/**
 * 异步返回数据
 * @param {*} data 数据
 * @param {*} time 延迟时间
 */
const bsPromise = function (data, time) {
    return new Promise(function (resolve) {
        if (time) {
            setTimeout(function () {
                resolve(data);
            }, time || 1);
        }
        else {
            resolve(data);
        }
    });
};
/**
 * 延迟等待
 * @param {*} time 延迟时间
 */
const bsWait = function (time) {
    return bsPromise(null, time);
};
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
 * 给对象设置值 setValueByPath({ id: { number: 1}}, "id.number", 2)
 * @param {*} obj 对象
 * @param {*} path 路径
 * @param {*} value 值
 */
const setValueByPath = (obj, path, value) => {
    var reg = /(?:(?:^|\.)([^\.\[\]]+))|(?:\[([^\[\]]+)\])/g;
    var names = [];
    var name = null;
    while ((name = reg.exec(path)) != null) {
        names.push(name[1] || name[2]);
    }
    if (names.length === 0) {
        return obj;
    }
    setValues(obj);
    function setValues(obj) {
        const key = names[0];
        obj[names[0]] = names.length === 1 ? value : obj[names[0]] || {};
        names.shift();
        if (names.length) {
            setValues(obj[key]);
        }
    }
    return obj;
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

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isArray: isArray,
    isObject: isObject,
    bsWait: bsWait,
    bsPromise: bsPromise,
    bsCheck: bsCheck,
    bsRunWhen: bsRunWhen,
    setValueByPath: setValueByPath,
    getValueByPath: getValueByPath
});

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

//! moment.js locale configuration
(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment);
}(undefined, (function (moment) {

    var zhCn = moment.defineLocale('zh-cn', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY年M月D日',
            LLL : 'YYYY年M月D日Ah点mm分',
            LLLL : 'YYYY年M月D日ddddAh点mm分',
            l : 'YYYY/M/D',
            ll : 'YYYY年M月D日',
            lll : 'YYYY年M月D日 HH:mm',
            llll : 'YYYY年M月D日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                    meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : '[今天]LT',
            nextDay : '[明天]LT',
            nextWeek : '[下]ddddLT',
            lastDay : '[昨天]LT',
            lastWeek : '[上]ddddLT',
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime : {
            future : '%s内',
            past : '%s前',
            s : '几秒',
            ss : '%d 秒',
            m : '1 分钟',
            mm : '%d 分钟',
            h : '1 小时',
            hh : '%d 小时',
            d : '1 天',
            dd : '%d 天',
            M : '1 个月',
            MM : '%d 个月',
            y : '1 年',
            yy : '%d 年'
        },
        week : {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return zhCn;

})));

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

var style = ".form-search {\n  margin: 12px 20px;\n}\n.mr10 {\n  margin-right: 10px;\n}\n";

const LIMITSEARCH = 3;
const SearchList = (props) => {
    const { conditions, defaultValues, onSearch, is_view, btnStyle, styles } = props;
    if (!isArray(conditions)) {
        console.log("conditions is not array!!");
        return null;
    }
    const methods = reactHookForm.useForm({
        defaultValues
    });
    const { getValues, triggerValidation } = methods;
    const [show_more_visible, setShowmore] = React.useState(false);
    // 搜索
    const handSearch = async () => {
        const resValidation = await triggerValidation();
        const data = getValues({ nest: true });
        console.log("data =>", resValidation, data);
        onSearch(data);
    };
    // 重置
    const handReset = () => { };
    const commonButtons = () => {
        return (React__default.createElement(React.Fragment, null,
            React__default.createElement(antd.Button, { type: "primary", className: style.mr10, disabled: is_view, onClick: handSearch, style: btnStyle }, "\u67E5\u8BE2"),
            React__default.createElement(antd.Button, { onClick: handReset, disabled: is_view, style: btnStyle }, "\u91CD\u7F6E")));
    };
    const moreButtons = () => {
        return (React__default.createElement(antd.Button, { type: !show_more_visible ? undefined : "primary", icon: !show_more_visible ? "down" : "up", style: btnStyle, className: style.mr10, disabled: is_view, onClick: () => setShowmore(v => !v) }, "\u66F4\u591A"));
    };
    const is_show_more_btn = conditions.length > LIMITSEARCH || conditions.some(l => l.is_high);
    return (React__default.createElement(reactHookForm.FormContext, Object.assign({}, methods),
        React__default.createElement("section", { className: classnames(style["form-search"]), style: styles },
            React__default.createElement(Form, { data: conditions }),
            is_show_more_btn && moreButtons(),
            commonButtons())));
};

var styles$1 = ".ys-table {\n  width: 100%;\n  overflow: auto;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n.ys-table :global .ant-table-thead > tr > th {\n  padding: 4px 6px;\n  color: #7ab2ff;\n  font-weight: bold;\n  white-space: nowrap;\n  background: #f0f8ff;\n}\n.ys-table :global .ant-table-tbody > tr > td {\n  cursor: auto;\n  padding: 8px 6px;\n  white-space: nowrap;\n}\n.ys-table .ys-table-text {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n";

const TableComponent = props => {
    const { columns, rowKey, total, page, loading, pageSize, onChange, dataSource } = props, other = __rest(props, ["columns", "rowKey", "total", "page", "loading", "pageSize", "onChange", "dataSource"]);
    const onPageChange = (params, filters, sorter, extra) => {
        const _a = params || {}, { showQuickJumper, showSizeChanger, simple, showTotal, total, current: page } = _a, other = __rest(_a, ["showQuickJumper", "showSizeChanger", "simple", "showTotal", "total", "current"]);
        const { pageSize: per_page } = other || {};
        onChange && onChange(Object.assign({ page, per_page, page_size: per_page }, other), filters, sorter, extra);
    };
    const pagination = {
        total: Number(total) || 0,
        current: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        showQuickJumper: false,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showTotal: (total) => `共有${total}条`
    };
    /**
     * 改变表格宽度
     * ResizeableTitle
     */
    const ResizeableTitle = (props) => {
        const _a = props || {}, { onResize, width = 100 } = _a, restProps = __rest(_a, ["onResize", "width"]);
        if (!width) {
            return React__default.createElement("th", Object.assign({}, restProps));
        }
        return (React__default.createElement(reactResizable.Resizable, { height: 0, width: width, onResize: onResize, draggableOpts: { enableUserSelectHack: false } },
            React__default.createElement("th", Object.assign({}, restProps))));
    };
    const components = {
        header: {
            cell: ResizeableTitle
        }
    };
    return (React__default.createElement("div", { className: styles$1["ys-table"] },
        React__default.createElement(antd.Table, Object.assign({ bordered: true }, other, { loading: loading, columns: columns, rowKey: rowKey, onChange: onPageChange, components: components, pagination: total ? pagination : false, dataSource: dataSource }))));
};

const DataTable = props => {
    const { conditions, defaultValues, onSearch, columns, data } = props;
    return (React__default.createElement(React.Fragment, null,
        React__default.createElement(SearchList, { conditions: conditions, defaultValues: defaultValues, onSearch: onSearch }),
        React__default.createElement(TableComponent, { columns: columns, dataSource: data })));
};

exports.DataTable = DataTable;
exports.Form = FormItems;
exports.Utils = utils;
