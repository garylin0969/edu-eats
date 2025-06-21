/**
 * 通用工具函數集合
 */
import { Option } from '@/types';

/**
 * 將數據數組轉換為 Option 格式
 * @param data - 要轉換的數據數組
 * @param labelKey - 用作 label 的欄位名稱
 * @param valueKey - 用作 value 的欄位名稱
 * @returns Option 格式的數組
 */
export const transformToOptions = <T>(data: T[] | undefined | null, labelKey: keyof T, valueKey: keyof T): Option[] => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item: T) => ({
        label: String(item?.[labelKey] ?? ''),
        value: String(item?.[valueKey] ?? ''),
    }));
};
