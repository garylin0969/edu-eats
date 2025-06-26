/**
 * 物件工具函數集合
 */

/**
 * 過濾掉物件中的空值（undefined 和空字串）
 * @param obj - 要過濾的物件
 * @returns 過濾後的物件
 */
export const filterObjectEmptyValues = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
    return Object?.fromEntries(
        Object?.entries(obj)?.filter(([, value]) => value !== undefined && value !== '' && value !== null)
    ) as Partial<T>;
};

/**
 * 檢查物件是否為空
 * @param obj - 要檢查的物件
 * @returns 如果物件為空則返回 true
 */
export const objectIsEmpty = (obj: Record<string, unknown>): boolean => {
    return Object?.keys(obj)?.length === 0;
};

/**
 * 深度克隆物件
 * @param obj - 要克隆的物件
 * @returns 克隆後的物件
 */
export const objectDeepClone = <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as T;
    if (obj instanceof Array) return obj.map((item) => objectDeepClone(item)) as T;
    if (typeof obj === 'object') {
        const clonedObj = {} as T;
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clonedObj[key] = objectDeepClone(obj[key]);
            }
        }
        return clonedObj;
    }
    return obj;
};

export const objectToTanstackQueryKeys = (obj: Record<string, unknown>): string[] => {
    return Object.entries(obj).map(([key, value]) => `${key}=${value}`);
};
