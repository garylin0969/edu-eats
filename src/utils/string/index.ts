/**
 * 字串工具函數集合
 */

/**
 * 檢查字串是否為空或只包含空白字元
 * @param str - 要檢查的字串
 * @returns 如果字串為空或只包含空白字元則返回 true
 */
export const isEmpty = (str: string): boolean => {
    return !str || str.trim().length === 0;
};

/**
 * 將字串轉換為標題格式（每個單字首字母大寫）
 * @param str - 要轉換的字串
 * @returns 標題格式的字串
 */
export const toTitleCase = (str: string): string => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

/**
 * 將字串轉換為駝峰命名法
 * @param str - 要轉換的字串
 * @returns 駝峰命名法格式的字串
 */
export const toCamelCase = (str: string): string => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
        .replace(/\s+/g, '');
};

/**
 * 將字串轉換為蛇形命名法
 * @param str - 要轉換的字串
 * @returns 蛇形命名法格式的字串
 */
export const toSnakeCase = (str: string): string => {
    return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '');
};

/**
 * 將字串轉換為短橫線命名法
 * @param str - 要轉換的字串
 * @returns 短橫線命名法格式的字串
 */
export const toKebabCase = (str: string): string => {
    return str
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');
};

/**
 * 截斷字串並添加省略號
 * @param str - 要截斷的字串
 * @param maxLength - 最大長度
 * @param suffix - 後綴（預設為 '...'）
 * @returns 截斷後的字串
 */
export const truncate = (str: string, maxLength: number, suffix: string = '...'): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * 移除字串中的 HTML 標籤
 * @param str - 包含 HTML 標籤的字串
 * @returns 移除 HTML 標籤後的字串
 */
export const stripHtml = (str: string): string => {
    return str.replace(/<[^>]*>/g, '');
};

/**
 * 轉義 HTML 特殊字元
 * @param str - 要轉義的字串
 * @returns 轉義後的字串
 */
export const escapeHtml = (str: string): string => {
    const htmlEscapes: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };
    return str.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
};

/**
 * 反轉義 HTML 特殊字元
 * @param str - 要反轉義的字串
 * @returns 反轉義後的字串
 */
export const unescapeHtml = (str: string): string => {
    const htmlUnescapes: Record<string, string> = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#x27;': "'",
        '&#x2F;': '/',
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;/g, (match) => htmlUnescapes[match]);
};

/**
 * 生成指定長度的隨機字串
 * @param length - 字串長度
 * @param charset - 字元集（預設為字母和數字）
 * @returns 隨機字串
 */
export const generateRandomString = (
    length: number,
    charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
};

/**
 * 計算字串的字符數（支援中文字符）
 * @param str - 要計算的字串
 * @returns 字符數
 */
export const getCharacterCount = (str: string): number => {
    return Array.from(str).length;
};

/**
 * 檢查字串是否為有效的電子郵件格式
 * @param email - 要檢查的電子郵件
 * @returns 如果是有效的電子郵件格式則返回 true
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * 檢查字串是否為有效的 URL 格式
 * @param url - 要檢查的 URL
 * @returns 如果是有效的 URL 格式則返回 true
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * 將字串轉換為數字（如果可能）
 * @param str - 要轉換的字串
 * @returns 轉換後的數字，如果無法轉換則返回 null
 */
export const toNumber = (str: string): number | null => {
    const num = Number(str);
    return isNaN(num) ? null : num;
};

/**
 * 格式化字串為指定長度，不足的部分用指定字符填充
 * @param str - 要格式化的字串
 * @param length - 目標長度
 * @param padChar - 填充字符（預設為空格）
 * @param position - 填充位置（'start' 或 'end'，預設為 'end'）
 * @returns 格式化後的字串
 */
export const padString = (
    str: string,
    length: number,
    padChar: string = ' ',
    position: 'start' | 'end' = 'end'
): string => {
    const padding = padChar.repeat(Math.max(0, length - str.length));
    return position === 'start' ? padding + str : str + padding;
};

/**
 * 移除字串開頭和結尾的指定字符
 * @param str - 要處理的字串
 * @param chars - 要移除的字符（預設為空白字元）
 * @returns 處理後的字串
 */
export const trimChars = (str: string, chars: string = ' \t\n\r'): string => {
    const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
    return str.replace(regex, '');
};

/**
 * 將字串按指定分隔符分割並過濾空值
 * @param str - 要分割的字串
 * @param separator - 分隔符（預設為逗號）
 * @returns 分割後的陣列
 */
export const splitAndFilter = (str: string, separator: string = ','): string[] => {
    return str
        .split(separator)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
};

/**
 * 檢查字串是否包含中文字符
 * @param str - 要檢查的字串
 * @returns 如果包含中文字符則返回 true
 */
export const containsChinese = (str: string): boolean => {
    return /[\u4e00-\u9fff]/.test(str);
};

/**
 * 將字串中的中文字符轉換為拼音（簡化版本，僅供參考）
 * @param str - 要轉換的字串
 * @returns 轉換後的字串（此處為簡化實現）
 */
export const toPinyin = (str: string): string => {
    // 注意：這是一個簡化的實現，實際使用時建議使用專業的拼音轉換庫
    return str.replace(/[\u4e00-\u9fff]/g, '[中文]');
};
