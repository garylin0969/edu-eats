# 日期格式化工具

這是一個功能完整的日期格式化工具庫，提供多種日期格式轉換和操作功能。

## 主要功能

### 1. 基本格式化 (`formatDate`)

將 Date 物件轉換為各種格式：

```typescript
import { formatDate } from './utils/date';

const date = new Date('2024-01-15T10:30:00');

// 預設格式（本地化）
formatDate(date); // "2024/1/15 上午10:30:00"

// ISO 格式
formatDate(date, 'iso'); // "2024-01-15T02:30:00.000Z"

// 簡短格式
formatDate(date, 'short'); // "2024年1月15日"

// 長格式
formatDate(date, 'long'); // "2024年1月15日 星期一"

// 時間格式
formatDate(date, 'time'); // "上午10:30:00"

// 日期格式
formatDate(date, 'date'); // "2024/1/15"

// 日期時間格式
formatDate(date, 'datetime'); // "2024/1/15 上午10:30:00"

// 相對時間
formatDate(date, 'relative'); // "2小時前"
```

### 2. 自定義格式

支援使用模式字串進行自定義格式化：

```typescript
// 使用模式字串
formatDate(date, 'YYYY-MM-DD'); // "2024-01-15"
formatDate(date, 'MM/DD/YYYY HH:mm'); // "01/15/2024 10:30"
formatDate(date, 'YYYY年MM月DD日'); // "2024年01月15日"

// 支援的模式：
// YYYY - 四位年份
// YY - 兩位年份
// MM - 兩位月份（補零）
// M - 月份
// DD - 兩位日期（補零）
// D - 日期
// HH - 兩位小時（補零）
// H - 小時
// mm - 兩位分鐘（補零）
// m - 分鐘
// ss - 兩位秒數（補零）
// s - 秒數
// SSS - 三位毫秒（補零）
```

### 3. 格式化選項

```typescript
const options = {
    includeTime: true, // 是否包含時間
    use24Hour: false, // 是否使用24小時制
    showSeconds: false, // 是否顯示秒
    locale: 'zh-TW', // 語言環境
    timeZone: 'Asia/Taipei', // 時區
};

formatDate(date, 'datetime', options);
```

### 4. 日期檢查

```typescript
import { isToday, isYesterday, isTomorrow } from './utils/date';

const now = new Date();

isToday(now); // true
isYesterday(now); // false
isTomorrow(now); // false
```

### 5. 日期資訊

```typescript
import { getDayOfWeek, getMonthName } from './utils/date';

getDayOfWeek(date); // "星期一"
getMonthName(date); // "一月"

// 支援不同語言
getDayOfWeek(date, 'en-US'); // "Monday"
getMonthName(date, 'en-US'); // "January"
```

### 6. 日期計算

```typescript
import { addDays, addMonths, addYears } from './utils/date';

addDays(date, 3); // 加3天
addMonths(date, 2); // 加2個月
addYears(date, 1); // 加1年
```

### 7. 日期差異

```typescript
import { getDateDifference } from './utils/date';

const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-15');

const diff = getDateDifference(date1, date2);
// {
//   days: 14,
//   hours: 0,
//   minutes: 0,
//   seconds: 0,
//   milliseconds: 0
// }
```

### 8. 日期範圍

```typescript
import { getDateRange } from './utils/date';

const startDate = new Date('2024-01-01');
const endDate = new Date('2024-01-31');

getDateRange(startDate, endDate, 'local'); // "2024/1/1 - 2024/1/31"
```

### 9. 月份操作

```typescript
import { getFirstDayOfMonth, getLastDayOfMonth } from './utils/date';

getFirstDayOfMonth(date); // 月份第一天
getLastDayOfMonth(date); // 月份最後一天
```

### 10. 閏年檢查

```typescript
import { isLeapYear } from './utils/date';

isLeapYear(2024); // true
isLeapYear(2023); // false
```

## 支援的輸入格式

函數支援多種輸入格式：

```typescript
// Date 物件
formatDate(new Date());

// 日期字串
formatDate('2024-01-15');
formatDate('2024-01-15T10:30:00');

// 時間戳
formatDate(1705312200000);
```

## 錯誤處理

函數包含完整的錯誤處理：

```typescript
try {
    formatDate('invalid-date');
} catch (error) {
    console.log('無效的日期格式');
}
```

## 語言環境支援

預設使用繁體中文 (`zh-TW`)，但支援所有標準的語言環境：

```typescript
// 英文
formatDate(date, 'long', { locale: 'en-US' });

// 日文
formatDate(date, 'long', { locale: 'ja-JP' });

// 韓文
formatDate(date, 'long', { locale: 'ko-KR' });
```

## 時區支援

預設使用台北時區 (`Asia/Taipei`)，但支援所有標準時區：

```typescript
// 紐約時區
formatDate(date, 'local', { timeZone: 'America/New_York' });

// 倫敦時區
formatDate(date, 'local', { timeZone: 'Europe/London' });

// UTC
formatDate(date, 'local', { timeZone: 'UTC' });
```

## 使用範例

查看 `example.ts` 文件獲取完整的使用範例。

## 注意事項

1. 所有函數都會自動處理無效日期並拋出錯誤
2. 相對時間功能基於當前時間計算
3. 時區轉換依賴瀏覽器的 Intl API
4. 自定義格式字串區分大小寫
