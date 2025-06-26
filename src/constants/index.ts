import { Option } from '@/types';

// 院所類型選項
export const SCHOOL_TYPE_OPTIONS: Option[] = [
    { label: '幼兒園', value: '1' },
    { label: '國小', value: '2' },
    { label: '國中', value: '3' },
    { label: '高中職/五專', value: '4' },
    { label: '大專院校', value: '5' },
];

export enum ServiceType {
    Lunch = 1, // 午餐
    Restaurant = 4, // 美食街
    StudentConsumptionCooperative = 5, // 員生消費合作社與其他餐飲場所
    ChainStores = 6, // 連鎖商店
}
