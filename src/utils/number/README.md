# 數字工具函數

這是一個功能完整的數字處理工具庫，提供多種數字操作、格式化和計算功能。

## 主要功能

### 1. 基本數字操作

#### 檢查值是否為有效數字 (`isValidNumber`)

```typescript
import { isValidNumber } from './utils/number';

isValidNumber(123); // true
isValidNumber(NaN); // false
isValidNumber(Infinity); // false
isValidNumber('123'); // false
```

#### 值轉換為數字 (`toNumber`)

```typescript
import { toNumber } from './utils/number';

toNumber('123'); // 123
toNumber('abc'); // 0 (預設值)
toNumber('abc', -1); // -1 (自定義預設值)
```

#### 數字限制 (`clamp`)

```typescript
import { clamp } from './utils/number';

clamp(3, 5, 10); // 5
clamp(7, 5, 10); // 7
clamp(15, 5, 10); // 10
```

### 2. 數字格式化

#### 四捨五入 (`round`)

```typescript
import { round } from './utils/number';

round(3.14159); // 3
round(3.14159, 2); // 3.14
round(3.14159, 4); // 3.1416
```

#### 向下取整 (`floor`)

```typescript
import { floor } from './utils/number';

floor(3.14159); // 3
floor(3.14159, 2); // 3.14
floor(3.14159, 4); // 3.1415
```

#### 向上取整 (`ceil`)

```typescript
import { ceil } from './utils/number';

ceil(3.14159); // 4
ceil(3.14159, 2); // 3.15
ceil(3.14159, 4); // 3.1416
```

#### 貨幣格式化 (`formatCurrency`)

```typescript
import { formatCurrency } from './utils/number';

formatCurrency(1234.56); // "NT$1,234.56"
formatCurrency(1234.56, 'USD', 'en-US'); // "$1,234.56"
formatCurrency(1234.56, 'EUR', 'de-DE'); // "1.234,56 €"
```

#### 百分比格式化 (`formatPercentage`)

```typescript
import { formatPercentage } from './utils/number';

formatPercentage(0.1234); // "12.34%"
formatPercentage(0.5, 0); // "50%"
formatPercentage(0.1234, 4); // "12.3400%"
```

#### 千分位格式化 (`formatNumber`)

```typescript
import { formatNumber } from './utils/number';

formatNumber(1234567.89); // "1,234,567.89"
formatNumber(1234567.89, 'en-US'); // "1,234,567.89"
```

### 3. 隨機數生成

#### 隨機整數 (`randomInt`)

```typescript
import { randomInt } from './utils/number';

randomInt(1, 10); // 1-10 之間的隨機整數
randomInt(0, 100); // 0-100 之間的隨機整數
```

#### 隨機浮點數 (`randomFloat`)

```typescript
import { randomFloat } from './utils/number';

randomFloat(0, 1); // 0-1 之間的隨機浮點數
randomFloat(10, 20); // 10-20 之間的隨機浮點數
```

### 4. 數學計算

#### 線性插值 (`lerp`)

```typescript
import { lerp } from './utils/number';

lerp(0, 100, 0.5); // 50
lerp(10, 20, 0.3); // 13
```

#### 範圍映射 (`mapRange`)

```typescript
import { mapRange } from './utils/number';

mapRange(50, 0, 100, 0, 1); // 0.5
mapRange(128, 0, 255, 0, 1); // 0.5019607843137255
```

#### 範圍檢查 (`isInRange`)

```typescript
import { isInRange } from './utils/number';

isInRange(5, 1, 10); // true
isInRange(15, 1, 10); // false
```

#### 階乘 (`factorial`)

```typescript
import { factorial } from './utils/number';

factorial(5); // 120
factorial(0); // 1
factorial(1); // 1
```

#### 平方根、平方、立方

```typescript
import { sqrt, square, cube } from './utils/number';

sqrt(16); // 4
square(5); // 25
cube(3); // 27
```

#### 絕對值 (`abs`)

```typescript
import { abs } from './utils/number';

abs(-5); // 5
abs(5); // 5
```

### 5. 統計計算

#### 平均值 (`average`, `mean`)

```typescript
import { average, mean } from './utils/number';

average(10, 20); // 15
mean([1, 2, 3, 4, 5]); // 3
```

#### 中位數 (`median`)

```typescript
import { median } from './utils/number';

median([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // 5.5
median([1, 2, 3, 4, 5]); // 3
```

#### 最大值、最小值 (`max`, `min`)

```typescript
import { max, min } from './utils/number';

max([1, 2, 3, 4, 5]); // 5
min([1, 2, 3, 4, 5]); // 1
```

#### 總和、乘積 (`sum`, `product`)

```typescript
import { sum, product } from './utils/number';

sum([1, 2, 3, 4, 5]); // 15
product([1, 2, 3, 4, 5]); // 120
```

### 6. 進位轉換

#### 二進位、十六進位、八進位

```typescript
import { toBinary, toHex, toOctal } from './utils/number';

toBinary(10); // "1010"
toHex(255); // "ff"
toOctal(64); // "100"
```

### 7. 數字特性檢查

#### 奇偶檢查 (`isEven`, `isOdd`)

```typescript
import { isEven, isOdd } from './utils/number';

isEven(10); // true
isEven(11); // false
isOdd(10); // false
isOdd(11); // true
```

#### 質數檢查 (`isPrime`)

```typescript
import { isPrime } from './utils/number';

isPrime(2); // true
isPrime(3); // true
isPrime(4); // false
isPrime(17); // true
isPrime(25); // false
```

### 8. 角度轉換

#### 角度與弧度轉換

```typescript
import { degreesToRadians, radiansToDegrees } from './utils/number';

degreesToRadians(180); // 3.141592653589793
radiansToDegrees(Math.PI); // 180
degreesToRadians(90); // 1.5707963267948966
radiansToDegrees(Math.PI / 2); // 90
```

## 實際應用範例

### 購物車計算

```typescript
import { sum, mean, formatCurrency } from './utils/number';

const cartItems = [
    { name: '商品A', price: 100, quantity: 2 },
    { name: '商品B', price: 150, quantity: 1 },
    { name: '商品C', price: 75, quantity: 3 },
];

const total = sum(cartItems.map((item) => item.price * item.quantity));
const averagePrice = mean(cartItems.map((item) => item.price));

console.log('總金額:', formatCurrency(total));
console.log('平均單價:', formatCurrency(averagePrice));
```

### 成績計算

```typescript
import { mean, median, max, min, round, formatPercentage } from './utils/number';

const scores = [85, 92, 78, 96, 88, 91, 87, 94, 89, 90];

console.log('平均分:', round(mean(scores), 1));
console.log('中位數:', median(scores));
console.log('最高分:', max(scores));
console.log('最低分:', min(scores));
console.log('及格率:', formatPercentage(scores.filter((s) => s >= 60).length / scores.length));
```

### 進度條計算

```typescript
import { mapRange, formatPercentage } from './utils/number';

const currentProgress = 75;
const maxProgress = 100;
const progressPercentage = mapRange(currentProgress, 0, maxProgress, 0, 1);

console.log('進度條:', formatPercentage(progressPercentage));
```

### 顏色轉換 (RGB to Hex)

```typescript
import { toHex } from './utils/number';

const rgbToHex = (r: number, g: number, b: number) => {
    return `#${toHex(r).padStart(2, '0')}${toHex(g).padStart(2, '0')}${toHex(b).padStart(2, '0')}`;
};

console.log('RGB 轉 Hex:', rgbToHex(255, 128, 64)); // "#ff8040"
```

### 動畫插值

```typescript
import { lerp, round } from './utils/number';

const startValue = 0;
const endValue = 100;
const animationSteps = 10;

for (let i = 0; i <= animationSteps; i++) {
    const t = i / animationSteps;
    const value = lerp(startValue, endValue, t);
    console.log(`步驟 ${i}: ${round(value, 1)}`);
}
```

## 錯誤處理

函數包含完整的錯誤處理：

```typescript
// 處理無效輸入
isValidNumber('not a number'); // false
toNumber('invalid', -1); // -1

// 處理邊界情況
mean([]); // 0
median([]); // 0
sum([]); // 0
product([]); // 1
```

## 效能考量

### 大量數據處理

```typescript
import { sum, mean } from './utils/number';

const largeArray = Array.from({ length: 10000 }, (_, i) => i + 1);

const startTime = Date.now();
const largeSum = sum(largeArray);
const largeMean = mean(largeArray);
const endTime = Date.now();

console.log('處理時間:', endTime - startTime, 'ms');
```

### 隨機數生成效能

```typescript
import { randomInt } from './utils/number';

const startTime = Date.now();
for (let i = 0; i < 10000; i++) {
    randomInt(1, 100);
}
const endTime = Date.now();

console.log('生成10000個隨機整數耗時:', endTime - startTime, 'ms');
```

## 支援的輸入格式

所有函數都支援標準的數字輸入：

```typescript
// 基本數字
isValidNumber(123);

// 浮點數
round(3.14159, 2);

// 負數
abs(-5);

// 零
factorial(0);

// 大數字
formatNumber(1234567890);
```

## 注意事項

1. **精度處理**：浮點數運算可能存在精度問題，建議使用 `round` 函數進行適當的精度控制。

2. **效能優化**：統計函數經過優化，適合處理大量數據。

3. **類型安全**：所有函數都提供完整的 TypeScript 類型支援。

4. **國際化**：格式化函數支援多種語言環境和貨幣格式。

5. **數學正確性**：所有數學計算都遵循標準的數學規則。

6. **邊界處理**：函數包含完整的邊界情況處理，避免錯誤。

7. **隨機性**：隨機數生成使用標準的 `Math.random()` 方法。

8. **進位轉換**：進位轉換函數返回小寫字串格式。
