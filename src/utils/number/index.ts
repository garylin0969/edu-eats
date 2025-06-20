/**
 * 數字工具函數集合
 */

/**
 * 檢查值是否為有效數字
 * @param value - 要檢查的值
 * @returns 如果是有效數字則返回 true
 */
export const isValidNumber = (value: unknown): boolean => {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * 將值轉換為數字，如果無法轉換則返回預設值
 * @param value - 要轉換的值
 * @param defaultValue - 預設值（預設為 0）
 * @returns 轉換後的數字
 */
export const toNumber = (value: unknown, defaultValue: number = 0): number => {
    const num = Number(value);
    return isValidNumber(num) ? num : defaultValue;
};

/**
 * 將數字限制在指定範圍內
 * @param value - 要限制的數字
 * @param min - 最小值
 * @param max - 最大值
 * @returns 限制後的數字
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

/**
 * 將數字四捨五入到指定小數位數
 * @param value - 要四捨五入的數字
 * @param decimals - 小數位數（預設為 0）
 * @returns 四捨五入後的數字
 */
export const round = (value: number, decimals: number = 0): number => {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
};

/**
 * 將數字向下取整到指定小數位數
 * @param value - 要向下取整的數字
 * @param decimals - 小數位數（預設為 0）
 * @returns 向下取整後的數字
 */
export const floor = (value: number, decimals: number = 0): number => {
    const factor = Math.pow(10, decimals);
    return Math.floor(value * factor) / factor;
};

/**
 * 將數字向上取整到指定小數位數
 * @param value - 要向上取整的數字
 * @param decimals - 小數位數（預設為 0）
 * @returns 向上取整後的數字
 */
export const ceil = (value: number, decimals: number = 0): number => {
    const factor = Math.pow(10, decimals);
    return Math.ceil(value * factor) / factor;
};

/**
 * 格式化數字為貨幣格式
 * @param value - 要格式化的數字
 * @param currency - 貨幣代碼（預設為 'TWD'）
 * @param locale - 地區設定（預設為 'zh-TW'）
 * @returns 格式化後的貨幣字串
 */
export const formatCurrency = (value: number, currency: string = 'TWD', locale: string = 'zh-TW'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
};

/**
 * 格式化數字為百分比格式
 * @param value - 要格式化的數字（0-1 之間）
 * @param decimals - 小數位數（預設為 2）
 * @returns 格式化後的百分比字串
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
    return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * 格式化數字為千分位格式
 * @param value - 要格式化的數字
 * @param locale - 地區設定（預設為 'zh-TW'）
 * @returns 格式化後的千分位字串
 */
export const formatNumber = (value: number, locale: string = 'zh-TW'): string => {
    return new Intl.NumberFormat(locale).format(value);
};

/**
 * 生成指定範圍內的隨機整數
 * @param min - 最小值（包含）
 * @param max - 最大值（包含）
 * @returns 隨機整數
 */
export const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 生成指定範圍內的隨機浮點數
 * @param min - 最小值（包含）
 * @param max - 最大值（包含）
 * @returns 隨機浮點數
 */
export const randomFloat = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

/**
 * 計算兩個數字之間的線性插值
 * @param start - 起始值
 * @param end - 結束值
 * @param t - 插值係數（0-1 之間）
 * @returns 插值結果
 */
export const lerp = (start: number, end: number, t: number): number => {
    return start + (end - start) * t;
};

/**
 * 將數字映射到新的範圍
 * @param value - 要映射的數字
 * @param fromMin - 原始範圍最小值
 * @param fromMax - 原始範圍最大值
 * @param toMin - 目標範圍最小值
 * @param toMax - 目標範圍最大值
 * @returns 映射後的數字
 */
export const mapRange = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number => {
    return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
};

/**
 * 檢查數字是否在指定範圍內
 * @param value - 要檢查的數字
 * @param min - 最小值（包含）
 * @param max - 最大值（包含）
 * @returns 如果在範圍內則返回 true
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
};

/**
 * 計算數字的階乘
 * @param n - 要計算階乘的數字
 * @returns 階乘結果
 */
export const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
};

/**
 * 計算數字的平方根
 * @param value - 要計算平方根的數字
 * @returns 平方根結果
 */
export const sqrt = (value: number): number => {
    return Math.sqrt(value);
};

/**
 * 計算數字的平方
 * @param value - 要計算平方的數字
 * @returns 平方結果
 */
export const square = (value: number): number => {
    return value * value;
};

/**
 * 計算數字的立方
 * @param value - 要計算立方的數字
 * @returns 立方結果
 */
export const cube = (value: number): number => {
    return value * value * value;
};

/**
 * 計算數字的絕對值
 * @param value - 要計算絕對值的數字
 * @returns 絕對值
 */
export const abs = (value: number): number => {
    return Math.abs(value);
};

/**
 * 計算兩個數字的平均值
 * @param a - 第一個數字
 * @param b - 第二個數字
 * @returns 平均值
 */
export const average = (a: number, b: number): number => {
    return (a + b) / 2;
};

/**
 * 計算陣列中數字的平均值
 * @param numbers - 數字陣列
 * @returns 平均值
 */
export const mean = (numbers: number[]): number => {
    if (numbers.length === 0) return 0;
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

/**
 * 計算陣列中數字的中位數
 * @param numbers - 數字陣列
 * @returns 中位數
 */
export const median = (numbers: number[]): number => {
    if (numbers.length === 0) return 0;
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
};

/**
 * 找出陣列中的最大值
 * @param numbers - 數字陣列
 * @returns 最大值
 */
export const max = (numbers: number[]): number => {
    return Math.max(...numbers);
};

/**
 * 找出陣列中的最小值
 * @param numbers - 數字陣列
 * @returns 最小值
 */
export const min = (numbers: number[]): number => {
    return Math.min(...numbers);
};

/**
 * 計算陣列中數字的總和
 * @param numbers - 數字陣列
 * @returns 總和
 */
export const sum = (numbers: number[]): number => {
    return numbers.reduce((sum, num) => sum + num, 0);
};

/**
 * 計算陣列中數字的乘積
 * @param numbers - 數字陣列
 * @returns 乘積
 */
export const product = (numbers: number[]): number => {
    return numbers.reduce((prod, num) => prod * num, 1);
};

/**
 * 將數字轉換為二進位字串
 * @param value - 要轉換的數字
 * @returns 二進位字串
 */
export const toBinary = (value: number): string => {
    return value.toString(2);
};

/**
 * 將數字轉換為十六進位字串
 * @param value - 要轉換的數字
 * @returns 十六進位字串
 */
export const toHex = (value: number): string => {
    return value.toString(16);
};

/**
 * 將數字轉換為八進位字串
 * @param value - 要轉換的數字
 * @returns 八進位字串
 */
export const toOctal = (value: number): string => {
    return value.toString(8);
};

/**
 * 檢查數字是否為偶數
 * @param value - 要檢查的數字
 * @returns 如果是偶數則返回 true
 */
export const isEven = (value: number): boolean => {
    return value % 2 === 0;
};

/**
 * 檢查數字是否為奇數
 * @param value - 要檢查的數字
 * @returns 如果是奇數則返回 true
 */
export const isOdd = (value: number): boolean => {
    return value % 2 !== 0;
};

/**
 * 檢查數字是否為質數
 * @param value - 要檢查的數字
 * @returns 如果是質數則返回 true
 */
export const isPrime = (value: number): boolean => {
    if (value < 2) return false;
    if (value === 2) return true;
    if (value % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(value); i += 2) {
        if (value % i === 0) return false;
    }
    return true;
};

/**
 * 將角度轉換為弧度
 * @param degrees - 角度
 * @returns 弧度
 */
export const degreesToRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};

/**
 * 將弧度轉換為角度
 * @param radians - 弧度
 * @returns 角度
 */
export const radiansToDegrees = (radians: number): number => {
    return radians * (180 / Math.PI);
};
