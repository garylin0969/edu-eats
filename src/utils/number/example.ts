/**
 * 數字工具函數使用範例
 */
import {
    isValidNumber,
    toNumber,
    clamp,
    round,
    floor,
    ceil,
    formatCurrency,
    formatPercentage,
    formatNumber,
    randomInt,
    randomFloat,
    lerp,
    mapRange,
    isInRange,
    factorial,
    sqrt,
    square,
    cube,
    abs,
    average,
    mean,
    median,
    max,
    min,
    sum,
    product,
    toBinary,
    toHex,
    toOctal,
    isEven,
    isOdd,
    isPrime,
    degreesToRadians,
    radiansToDegrees,
} from './index';

console.log('=== 數字基本操作範例 ===');

// 檢查值是否為有效數字
console.log('有效數字檢查:', isValidNumber(123)); // true
console.log('無效數字檢查:', isValidNumber(NaN)); // false
console.log('無限大檢查:', isValidNumber(Infinity)); // false
console.log('字串檢查:', isValidNumber('123')); // false

// 值轉換為數字
console.log('字串轉數字:', toNumber('123')); // 123
console.log('無效值轉換:', toNumber('abc')); // 0 (預設值)
console.log('自定義預設值:', toNumber('abc', -1)); // -1

// 數字限制
console.log('限制範圍 (5-10):', clamp(3, 5, 10)); // 5
console.log('限制範圍 (5-10):', clamp(7, 5, 10)); // 7
console.log('限制範圍 (5-10):', clamp(15, 5, 10)); // 10

console.log('\n=== 數字格式化範例 ===');

// 四捨五入
console.log('四捨五入 (0位):', round(3.14159)); // 3
console.log('四捨五入 (2位):', round(3.14159, 2)); // 3.14
console.log('四捨五入 (4位):', round(3.14159, 4)); // 3.1416

// 向下取整
console.log('向下取整 (0位):', floor(3.14159)); // 3
console.log('向下取整 (2位):', floor(3.14159, 2)); // 3.14
console.log('向下取整 (4位):', floor(3.14159, 4)); // 3.1415

// 向上取整
console.log('向上取整 (0位):', ceil(3.14159)); // 4
console.log('向上取整 (2位):', ceil(3.14159, 2)); // 3.15
console.log('向上取整 (4位):', ceil(3.14159, 4)); // 3.1416

// 貨幣格式化
console.log('台幣格式化:', formatCurrency(1234.56)); // "NT$1,234.56"
console.log('美元格式化:', formatCurrency(1234.56, 'USD', 'en-US')); // "$1,234.56"
console.log('歐元格式化:', formatCurrency(1234.56, 'EUR', 'de-DE')); // "1.234,56 €"

// 百分比格式化
console.log('百分比 (0.1234):', formatPercentage(0.1234)); // "12.34%"
console.log('百分比 (0.5):', formatPercentage(0.5, 0)); // "50%"
console.log('百分比 (0.1234, 4位):', formatPercentage(0.1234, 4)); // "12.3400%"

// 千分位格式化
console.log('千分位格式化:', formatNumber(1234567.89)); // "1,234,567.89"
console.log('英文千分位:', formatNumber(1234567.89, 'en-US')); // "1,234,567.89"

console.log('\n=== 隨機數生成範例 ===');

// 隨機整數
console.log('隨機整數 (1-10):', randomInt(1, 10));
console.log('隨機整數 (0-100):', randomInt(0, 100));

// 隨機浮點數
console.log('隨機浮點數 (0-1):', randomFloat(0, 1));
console.log('隨機浮點數 (10-20):', randomFloat(10, 20));

console.log('\n=== 數學計算範例 ===');

// 線性插值
console.log('線性插值 (0-100, 0.5):', lerp(0, 100, 0.5)); // 50
console.log('線性插值 (10-20, 0.3):', lerp(10, 20, 0.3)); // 13

// 範圍映射
console.log('範圍映射 (0-100 -> 0-1):', mapRange(50, 0, 100, 0, 1)); // 0.5
console.log('範圍映射 (0-255 -> 0-1):', mapRange(128, 0, 255, 0, 1)); // 0.5019607843137255

// 範圍檢查
console.log('範圍檢查 (5 in 1-10):', isInRange(5, 1, 10)); // true
console.log('範圍檢查 (15 in 1-10):', isInRange(15, 1, 10)); // false

// 階乘
console.log('階乘 (5):', factorial(5)); // 120
console.log('階乘 (0):', factorial(0)); // 1
console.log('階乘 (1):', factorial(1)); // 1

// 平方根、平方、立方
console.log('平方根 (16):', sqrt(16)); // 4
console.log('平方 (5):', square(5)); // 25
console.log('立方 (3):', cube(3)); // 27

// 絕對值
console.log('絕對值 (-5):', abs(-5)); // 5
console.log('絕對值 (5):', abs(5)); // 5

console.log('\n=== 統計計算範例 ===');

// 平均值
console.log('兩個數平均值 (10, 20):', average(10, 20)); // 15

// 陣列統計
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('數字陣列:', numbers);
console.log('平均值:', mean(numbers)); // 5.5
console.log('中位數:', median(numbers)); // 5.5
console.log('最大值:', max(numbers)); // 10
console.log('最小值:', min(numbers)); // 1
console.log('總和:', sum(numbers)); // 55
console.log('乘積:', product(numbers)); // 3628800

// 奇數陣列
const oddNumbers = [1, 2, 3, 4, 5];
console.log('奇數陣列:', oddNumbers);
console.log('中位數:', median(oddNumbers)); // 3

console.log('\n=== 進位轉換範例 ===');

// 進位轉換
console.log('二進位 (10):', toBinary(10)); // "1010"
console.log('十六進位 (255):', toHex(255)); // "ff"
console.log('八進位 (64):', toOctal(64)); // "100"

console.log('\n=== 數字特性檢查範例 ===');

// 奇偶檢查
console.log('偶數檢查 (10):', isEven(10)); // true
console.log('偶數檢查 (11):', isEven(11)); // false
console.log('奇數檢查 (10):', isOdd(10)); // false
console.log('奇數檢查 (11):', isOdd(11)); // true

// 質數檢查
console.log('質數檢查 (2):', isPrime(2)); // true
console.log('質數檢查 (3):', isPrime(3)); // true
console.log('質數檢查 (4):', isPrime(4)); // false
console.log('質數檢查 (17):', isPrime(17)); // true
console.log('質數檢查 (25):', isPrime(25)); // false

console.log('\n=== 角度轉換範例 ===');

// 角度轉換
console.log('角度轉弧度 (180):', degreesToRadians(180)); // 3.141592653589793
console.log('弧度轉角度 (π):', radiansToDegrees(Math.PI)); // 180
console.log('角度轉弧度 (90):', degreesToRadians(90)); // 1.5707963267948966
console.log('弧度轉角度 (π/2):', radiansToDegrees(Math.PI / 2)); // 90

console.log('\n=== 實際應用範例 ===');

// 購物車計算
const cartItems = [
    { name: '商品A', price: 100, quantity: 2 },
    { name: '商品B', price: 150, quantity: 1 },
    { name: '商品C', price: 75, quantity: 3 },
];

const total = sum(cartItems.map((item) => item.price * item.quantity));
const averagePrice = mean(cartItems.map((item) => item.price));

console.log('購物車統計:');
console.log('- 總金額:', formatCurrency(total));
console.log('- 平均單價:', formatCurrency(averagePrice));

// 成績計算
const scores = [85, 92, 78, 96, 88, 91, 87, 94, 89, 90];
console.log('成績統計:');
console.log('- 平均分:', round(mean(scores), 1));
console.log('- 中位數:', median(scores));
console.log('- 最高分:', max(scores));
console.log('- 最低分:', min(scores));
console.log('- 及格率:', formatPercentage(scores.filter((s) => s >= 60).length / scores.length));

// 進度條計算
const currentProgress = 75;
const maxProgress = 100;
const progressPercentage = mapRange(currentProgress, 0, maxProgress, 0, 1);
console.log('進度條:', formatPercentage(progressPercentage));

// 顏色轉換 (RGB to Hex)
const red = 255;
const green = 128;
const blue = 64;

const rgbToHex = (r: number, g: number, b: number) => {
    return `#${toHex(r).padStart(2, '0')}${toHex(g).padStart(2, '0')}${toHex(b).padStart(2, '0')}`;
};

console.log('RGB 轉 Hex:', rgbToHex(red, green, blue)); // "#ff8040"

// 動畫插值
const startValue = 0;
const endValue = 100;
const animationSteps = 10;

console.log('動畫插值步驟:');
for (let i = 0; i <= animationSteps; i++) {
    const t = i / animationSteps;
    const value = lerp(startValue, endValue, t);
    console.log(`步驟 ${i}: ${round(value, 1)}`);
}

console.log('\n=== 錯誤處理範例 ===');

// 處理無效輸入
console.log('無效數字檢查:', isValidNumber('not a number')); // false
console.log('無效轉換:', toNumber('invalid', -1)); // -1

// 處理邊界情況
console.log('空陣列平均值:', mean([])); // 0
console.log('空陣列中位數:', median([])); // 0
console.log('空陣列總和:', sum([])); // 0
console.log('空陣列乘積:', product([])); // 1

console.log('\n=== 效能測試範例 ===');

// 大量數據處理
const largeArray = Array.from({ length: 10000 }, (_, i) => i + 1);

const startTime = Date.now();
const largeSum = sum(largeArray);
const largeMean = mean(largeArray);
const endTime = Date.now();

console.log('大量數據處理:');
console.log('- 陣列大小:', largeArray.length);
console.log('- 總和:', largeSum);
console.log('- 平均值:', largeMean);
console.log('- 處理時間:', endTime - startTime, 'ms');

// 隨機數生成效能
const randomStartTime = Date.now();
for (let i = 0; i < 10000; i++) {
    randomInt(1, 100);
}
const randomEndTime = Date.now();
console.log('生成10000個隨機整數耗時:', randomEndTime - randomStartTime, 'ms');
