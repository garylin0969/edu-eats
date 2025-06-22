/**
 * 日期格式化工具函數
 * 提供多種日期格式轉換功能
 */

export interface DateFormatOptions {
    /** 是否包含時間 */
    includeTime?: boolean;
    /** 是否使用24小時制 */
    use24Hour?: boolean;
    /** 是否顯示秒 */
    showSeconds?: boolean;
    /** 是否顯示毫秒 */
    showMilliseconds?: boolean;
    /** 語言環境 */
    locale?: string;
    /** 時區 */
    timeZone?: string;
}

/**
 * 將 Date 物件轉換為各種格式
 * @param date - 要格式化的日期
 * @param format - 格式類型或自定義格式
 * @param options - 格式化選項
 * @returns 格式化後的日期字串
 */
export const formatDate = (
    date: Date | string | number,
    format:
        | 'iso'
        | 'local'
        | 'relative'
        | 'short'
        | 'long'
        | 'time'
        | 'date'
        | 'datetime'
        | 'custom'
        | string = 'local',
    options: DateFormatOptions = {}
): string => {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date provided');
    }

    const {
        includeTime = true,
        use24Hour = false,
        showSeconds = false,
        locale = 'zh-TW',
        timeZone = 'Asia/Taipei',
    } = options;

    switch (format) {
        case 'iso':
            return dateObj.toISOString();

        case 'local':
            return dateObj.toLocaleString(locale, {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: includeTime ? '2-digit' : undefined,
                minute: includeTime ? '2-digit' : undefined,
                second: showSeconds ? '2-digit' : undefined,
                hour12: !use24Hour,
            });

        case 'short':
            return dateObj.toLocaleDateString(locale, {
                timeZone,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });

        case 'long':
            return dateObj.toLocaleDateString(locale, {
                timeZone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

        case 'time':
            return dateObj.toLocaleTimeString(locale, {
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: showSeconds ? '2-digit' : undefined,
                hour12: !use24Hour,
            });

        case 'date':
            return dateObj.toLocaleDateString(locale, {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });

        case 'datetime':
            return dateObj.toLocaleString(locale, {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: showSeconds ? '2-digit' : undefined,
                hour12: !use24Hour,
            });

        case 'relative':
            return getRelativeTime(dateObj);

        case 'custom':
            return formatCustomDate(dateObj, options);

        default:
            // 處理自定義格式字串
            return formatWithPattern(dateObj, format);
    }
};

/**
 * 獲取相對時間（例如：2小時前、3天前）
 */
const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
        return '剛剛';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}分鐘前`;
    } else if (diffInHours < 24) {
        return `${diffInHours}小時前`;
    } else if (diffInDays < 7) {
        return `${diffInDays}天前`;
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks}週前`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths}個月前`;
    } else {
        return `${diffInYears}年前`;
    }
};

/**
 * 自定義日期格式化
 */
const formatCustomDate = (date: Date, options: DateFormatOptions): string => {
    const { locale = 'zh-TW', timeZone = 'Asia/Taipei' } = options;

    return date.toLocaleString(locale, {
        timeZone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
};

/**
 * 使用模式字串格式化日期
 */
const formatWithPattern = (date: Date, pattern: string): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return pattern
        .replace('YYYY', year.toString())
        .replace('YY', year.toString().slice(-2))
        .replace('MM', month.toString().padStart(2, '0'))
        .replace('M', month.toString())
        .replace('DD', day.toString().padStart(2, '0'))
        .replace('D', day.toString())
        .replace('HH', hours.toString().padStart(2, '0'))
        .replace('H', hours.toString())
        .replace('mm', minutes.toString().padStart(2, '0'))
        .replace('m', minutes.toString())
        .replace('ss', seconds.toString().padStart(2, '0'))
        .replace('s', seconds.toString())
        .replace('SSS', milliseconds.toString().padStart(3, '0'));
};

/**
 * 獲取日期範圍
 * @param startDate - 開始日期
 * @param endDate - 結束日期
 * @param format - 輸出格式
 * @returns 日期範圍字串
 */
export const getDateRange = (
    startDate: Date | string | number,
    endDate: Date | string | number,
    format: 'iso' | 'local' | 'short' | 'long' = 'local'
): string => {
    const start = formatDate(startDate, format);
    const end = formatDate(endDate, format);
    return `${start} - ${end}`;
};

/**
 * 檢查日期是否為今天
 */
export const isToday = (date: Date | string | number): boolean => {
    const dateObj = new Date(date);
    const today = new Date();
    return dateObj.toDateString() === today.toDateString();
};

/**
 * 檢查日期是否為昨天
 */
export const isYesterday = (date: Date | string | number): boolean => {
    const dateObj = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateObj.toDateString() === yesterday.toDateString();
};

/**
 * 檢查日期是否為明天
 */
export const isTomorrow = (date: Date | string | number): boolean => {
    const dateObj = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateObj.toDateString() === tomorrow.toDateString();
};

/**
 * 獲取日期是星期幾
 */
export const getDayOfWeek = (date: Date | string | number, locale: string = 'zh-TW'): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale, { weekday: 'long' });
};

/**
 * 獲取月份名稱
 */
export const getMonthName = (date: Date | string | number, locale: string = 'zh-TW'): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale, { month: 'long' });
};

/**
 * 計算兩個日期之間的差異
 */
export const getDateDifference = (
    date1: Date | string | number,
    date2: Date | string | number
): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
} => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffInMs = Math.abs(d2.getTime() - d1.getTime());

    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
    const milliseconds = diffInMs % 1000;

    return { days, hours, minutes, seconds, milliseconds };
};

/**
 * 添加天數到日期
 */
export const addDays = (date: Date | string | number, days: number): Date => {
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
};

/**
 * 添加月份到日期
 */
export const addMonths = (date: Date | string | number, months: number): Date => {
    const dateObj = new Date(date);
    dateObj.setMonth(dateObj.getMonth() + months);
    return dateObj;
};

/**
 * 添加年份到日期
 */
export const addYears = (date: Date | string | number, years: number): Date => {
    const dateObj = new Date(date);
    dateObj.setFullYear(dateObj.getFullYear() + years);
    return dateObj;
};

/**
 * 獲取月份的第一天
 */
export const getFirstDayOfMonth = (date: Date | string | number): Date => {
    const dateObj = new Date(date);
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
};

/**
 * 獲取月份的最後一天
 */
export const getLastDayOfMonth = (date: Date | string | number): Date => {
    const dateObj = new Date(date);
    return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
};

/**
 * 檢查是否為閏年
 */
export const isLeapYear = (date: Date | string | number): boolean => {
    const year = new Date(date).getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * 獲取格式對應的正則表達式
 */
export const getFormatRegex = (format: string): RegExp => {
    switch (format) {
        case 'YYYY-MM-DD':
            return /^\d{4}-\d{2}-\d{2}$/;
        case 'YYYY/MM/DD':
            return /^\d{4}\/\d{2}\/\d{2}$/;
        case 'DD/MM/YYYY':
            return /^\d{2}\/\d{2}\/\d{4}$/;
        case 'MM/DD/YYYY':
            return /^\d{2}\/\d{2}\/\d{4}$/;
        case 'DD-MM-YYYY':
            return /^\d{2}-\d{2}-\d{4}$/;
        case 'MM-DD-YYYY':
            return /^\d{2}-\d{2}-\d{4}$/;
        default:
            return /^\d{4}-\d{2}-\d{2}$/;
    }
};

/**
 * 將日期字串轉換為標準格式進行驗證
 */
export const parseToStandardDate = (dateString: string, format: string): Date | null => {
    let year: number, month: number, day: number;

    const parts = dateString.split(/[-/]/);
    if (parts.length !== 3) return null;

    switch (format) {
        case 'YYYY-MM-DD':
        case 'YYYY/MM/DD':
            [year, month, day] = parts.map(Number);
            break;
        case 'DD/MM/YYYY':
        case 'DD-MM-YYYY':
            [day, month, year] = parts.map(Number);
            break;
        case 'MM/DD/YYYY':
        case 'MM-DD-YYYY':
            [month, day, year] = parts.map(Number);
            break;
        default:
            return null;
    }

    // 檢查數值是否有效
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    if (year < 1000 || year > 9999) return null;
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    return new Date(year, month - 1, day);
};

/**
 * 驗證日期格式是否符合指定格式
 * @param dateString - 要驗證的日期字串
 * @param format - 日期格式字串（如 'YYYY-MM-DD'），預設為 'YYYY-MM-DD'
 * @returns 是否為有效的日期格式
 */
export const isValidDateFormat = (dateString: string, format: string = 'YYYY-MM-DD'): boolean => {
    try {
        // 基本格式檢查
        const formatRegex = getFormatRegex(format);
        if (!formatRegex.test(dateString)) {
            return false;
        }

        // 解析日期
        const parsedDate = parseToStandardDate(dateString, format);
        if (!parsedDate || isNaN(parsedDate.getTime())) {
            return false;
        }

        // 使用現有的 formatWithPattern 函數來格式化回原格式進行比較
        const formattedBack = formatWithPattern(parsedDate, format);
        return formattedBack === dateString;
    } catch {
        return false;
    }
};

/**
 * 獲取今日日期的指定格式字串
 * @param format - 日期格式字串（如 'YYYY-MM-DD'），預設為 'YYYY-MM-DD'
 * @returns 今日日期字串
 */
export const getTodayDateString = (format: string = 'YYYY-MM-DD'): string => {
    const today = new Date();
    return formatWithPattern(today, format);
};
