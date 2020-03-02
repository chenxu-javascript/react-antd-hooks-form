/**
 * 循环检测 达成条件 回调fn
 * @param {*} fn
 * @param {*} cod
 */
declare const bsRunWhen: (fn: () => void, cod: () => any) => void;
/**
 * 循环检测 cod 达成条件 await bsCheck(() => {})
 * @param {*} cod
 */
declare const bsCheck: (cod: any) => Promise<unknown>;
/**
 * 异步返回数据
 * @param {*} data 数据
 * @param {*} time 延迟时间
 */
declare const bsPromise: (data: any, time: number) => Promise<unknown>;
/**
 * 延迟等待
 * @param {*} time 延迟时间
 */
declare const bsWait: (time: number) => Promise<unknown>;
/**
 * 获取值通过路径 getValueByPath({ id: { number: 1}}, "id.number")
 * @param {*} obj 对象
 * @param {*} path 路径
 */
declare const getValueByPath: (obj: any, path: string) => any;
/**
 * 给对象设置值 setValueByPath({ id: { number: 1}}, "id.number", 2)
 * @param {*} obj 对象
 * @param {*} path 路径
 * @param {*} value 值
 */
declare const setValueByPath: (obj: any, path: string, value: any) => any;
/**
 * 是否为数组且数组长度>0
 * @param {*} arr
 */
declare const isArray: (arr: any) => boolean;
/**
 * 是否为对象 且不为空
 * @param {*} obj
 */
declare const isObject: (obj: any) => boolean;
export { isArray, isObject, bsWait, bsPromise, bsCheck, bsRunWhen, setValueByPath, getValueByPath };
