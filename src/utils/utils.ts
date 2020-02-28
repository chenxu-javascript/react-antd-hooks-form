/**
 * 循环检测 达成条件 回调fn
 * @param {*} fn
 * @param {*} cod
 */
const bsRunWhen = (fn: () => void, cod: () => any) => {
  if (cod()) {
    fn();
    return;
  }

  var i = 0;
  var interval = setInterval(function() {
    i++;
    if (i > 500) {
      clearInterval(interval);
    } else if (cod()) {
      fn();
      clearInterval(interval);
    }
  }, 30);
};


/**
 * 循环检测 cod 达成条件 await bsCheck(() => {})
 * @param {*} cod
 */
const bsCheck = (cod: any) => {
  return new Promise(function(resolve) {
    bsRunWhen(resolve, cod);
  });
};

/**
 * 异步返回数据
 * @param {*} data 数据
 * @param {*} time 延迟时间
 */
const bsPromise = function(data: any, time: number) {
  return new Promise(function(resolve) {
    if (time) {
      setTimeout(function() {
        resolve(data);
      }, time || 1);
    } else {
      resolve(data);
    }
  });
};


/**
 * 延迟等待
 * @param {*} time 延迟时间
 */
const bsWait = function(time: number) {
  return bsPromise(null, time);
};


/**
 * 获取值通过路径 getValueByPath({ id: { number: 1}}, "id.number")
 * @param {*} obj 对象
 * @param {*} path 路径
 */
const getValueByPath = (obj: any, path: string) => {
  var reg = /(?:(?:^|\.)([^\.\[\]]+))|(?:\[([^\[\]]+)\])/g;
  var names: string[] = [];
  var name: null | string[] = null;
  while ((name = reg.exec(path)) != null) {
    names.push(name[1] || name[2]);
  }
  var o = obj;
  for (var i = 0; i < names.length; i++) {
    o = o?.[names[i]];
    if (o === undefined) {
      return undefined;
    }
  }
  return o;
}

/**
 * 给对象设置值 setValueByPath({ id: { number: 1}}, "id.number", 2)
 * @param {*} obj 对象
 * @param {*} path 路径
 * @param {*} value 值
 */
const setValueByPath = (obj: any, path: string, value: any)=>{
  var reg = /(?:(?:^|\.)([^\.\[\]]+))|(?:\[([^\[\]]+)\])/g;
  var names: string[] = [];
  var name: null | string[] = null;
  while ((name = reg.exec(path)) != null) {
    names.push(name[1] || name[2]);
  }
  if (names.length === 0) {
    return obj;
  }
  setValues(obj);
  function setValues(obj: { [x: string]: any }) {
    const key = names[0];
    obj[names[0]] = names.length === 1 ? value : obj[names[0]] || {};
    names.shift();
    if (names.length) {
      setValues(obj[key]);
    }
  }
  return obj;
}

/**
 * 是否为数组且数组长度>0
 * @param {*} arr
 */
const isArray = (arr: any): boolean => {
  return arr && arr instanceof Array && !!arr["length"];
};

/**
 * 是否为对象 且不为空
 * @param {*} obj
 */
const isObject = (obj: any): boolean => {
  return obj && obj instanceof Object && !(obj instanceof Array) && !!Object.keys(obj).length;
};

export { isArray, isObject, bsWait, bsPromise, bsCheck, bsRunWhen, setValueByPath, getValueByPath };