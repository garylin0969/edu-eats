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

// filterObjectEmptyValues 使用範例
const user = {
    name: 'John',
    age: '',
    email: 'john@example.com',
    phone: null,
    address: undefined,
};

console.log('原始物件:', user);
console.log('過濾後的物件:', filterObjectEmptyValues(user)); // { name: 'John', email: 'john@example.com' }

// objectIsEmpty 使用範例
console.log('空物件檢查:', objectIsEmpty({})); // true
console.log('非空物件檢查:', objectIsEmpty({ name: 'John' })); // false

// objectDeepClone 使用範例
const originalData = {
    name: 'John',
    hobbies: ['reading', 'coding'],
    address: {
        city: 'Taipei',
        zipCode: '10001',
    },
};

const clonedData = objectDeepClone(originalData);
clonedData.hobbies.push('swimming');
clonedData.address.city = 'Kaohsiung';

console.log('原始資料:', originalData);
console.log('克隆資料:', clonedData);
