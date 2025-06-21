/**
 * 物件工具函數使用範例
 */
import { filterObjectEmptyValues, objectIsEmpty, objectDeepClone } from './index';

// 過濾空值範例
const formData = {
    name: 'John',
    email: '',
    age: undefined,
    city: 'Taipei',
    phone: null,
    address: 'Main St.',
};

console.log('原始資料:', formData);
console.log('過濾空值後:', filterObjectEmptyValues(formData));
// 輸出: { name: 'John', city: 'Taipei', phone: null, address: 'Main St.' }

// 檢查物件是否為空
console.log('空物件檢查:', objectIsEmpty({})); // true
console.log('非空物件檢查:', objectIsEmpty({ name: 'John' })); // false

// 深度克隆範例
const originalObj = {
    name: 'John',
    details: {
        age: 30,
        hobbies: ['reading', 'coding'],
    },
    createdAt: new Date(),
};

const clonedObj = objectDeepClone(originalObj);
console.log('原始物件:', originalObj);
console.log('克隆物件:', clonedObj);
console.log('是否為同一參照:', originalObj === clonedObj); // false
console.log('嵌套物件是否為同一參照:', originalObj.details === clonedObj.details); // false
