/**
 * 将厘转换为元（1111厘 == 1.111元）
 * @param money
 * @returns {*}
 */
export function formatPenny(money = 0) {
    if (typeof money !== 'number') {
        return 0.000;
    }
    return (money / 1000).toFixed(3);
}

/**
 * 将角转换为元（11角 == 1.1元）
 * @param money
 * @returns {*}
 */
export function formatPennyMoney(money = 0) {
    if (typeof money !== 'number') {
        return 0.0;
    }
    return (money / 10).toFixed(1);
}

/**
 * 求和
 * @param arr
 * @param key
 * @returns {*}
 */
export function summarize(arr, key) {
    return arr.reduce((prev, curr) => {
        curr = key ? curr[key] : curr;
        return prev + curr;
    }, 0);
}

/**
 * 格式化时间对象
 * @param dataTime
 * @param format
 * @returns {*}
 */
export function formatDate(dataTime, format = 'yyyy-MM-dd h:m:s') {
    if (dataTime === 0 || dataTime === null) {
        return '--';
    }
    const time = new Date(parseInt(dataTime) * 1000),
        date = {
            'M+': time.getMonth() + 1,
            'd+': time.getDate(),
            'h+': time.getHours(),
            'm+': time.getMinutes(),
            's+': time.getSeconds(),
            'q+': Math.floor((time.getMonth() + 3) / 3),
            'S': time.getMilliseconds()
        };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1
                ? (date[k]) : ('00' + date[k]).substr(('' + date[k]).length));
        }
    }
    return format;
}
