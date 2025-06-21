/**
 * 通用工具函數使用範例
 */
import { transformToOptions } from './index';

// transformToOptions 使用範例
const counties = [
    { CountyId: 1, County: '台北市', Code: 'TPE' },
    { CountyId: 2, County: '新北市', Code: 'NTP' },
    { CountyId: 3, County: '桃園市', Code: 'TYC' },
];

const areas = [
    { AreaId: 101, Area: '中正區', CountyId: 1 },
    { AreaId: 102, Area: '大安區', CountyId: 1 },
    { AreaId: 201, Area: '板橋區', CountyId: 2 },
];

const schools = [
    { SchoolId: 1001, SchoolName: '台北市立第一小學', AreaId: 101 },
    { SchoolId: 1002, SchoolName: '台北市立第二小學', AreaId: 102 },
    { SchoolId: 2001, SchoolName: '新北市立板橋小學', AreaId: 201 },
];

// 轉換縣市選項
const countyOptions = transformToOptions(counties, 'County', 'CountyId');
console.log('縣市選項:', countyOptions);
// 輸出: [{ label: '台北市', value: '1' }, { label: '新北市', value: '2' }, { label: '桃園市', value: '3' }]

// 轉換區域選項
const areaOptions = transformToOptions(areas, 'Area', 'AreaId');
console.log('區域選項:', areaOptions);
// 輸出: [{ label: '中正區', value: '101' }, { label: '大安區', value: '102' }, { label: '板橋區', value: '201' }]

// 轉換學校選項
const schoolOptions = transformToOptions(schools, 'SchoolName', 'SchoolId');
console.log('學校選項:', schoolOptions);
// 輸出: [{ label: '台北市立第一小學', value: '1001' }, ...]

// 處理空值或 undefined 的情況
const emptyData = transformToOptions(null, 'name', 'id');
console.log('空數據轉換:', emptyData); // 輸出: []

const undefinedData = transformToOptions(undefined, 'name', 'id');
console.log('undefined 數據轉換:', undefinedData); // 輸出: []

// 不同數據類型的轉換
const users = [
    { userId: '001', userName: '張三', isActive: true },
    { userId: '002', userName: '李四', isActive: false },
];

const userOptions = transformToOptions(users, 'userName', 'userId');
console.log('用戶選項:', userOptions);
// 輸出: [{ label: '張三', value: '001' }, { label: '李四', value: '002' }]

// 數字轉字串的處理
const products = [
    { productId: 1001, productName: '商品A', price: 100 },
    { productId: 1002, productName: '商品B', price: 200 },
];

const productOptions = transformToOptions(products, 'productName', 'productId');
console.log('商品選項:', productOptions);
// 輸出: [{ label: '商品A', value: '1001' }, { label: '商品B', value: '1002' }]
