# 字串工具函數

這是一個功能完整的字串處理工具庫，提供多種字串操作和格式化功能。

## 主要功能

### 1. 基本字串操作

#### 檢查字串是否為空 (`isEmpty`)

```typescript
import { isEmpty } from './utils/string';

isEmpty(''); // true
isEmpty('   '); // true
isEmpty('Hello'); // false
```

#### 字串格式轉換

```typescript
import { toTitleCase, toCamelCase, toSnakeCase, toKebabCase } from './utils/string';

const text = 'hello world example';

toTitleCase(text); // "Hello World Example"
toCamelCase(text); // "helloWorldExample"
toSnakeCase(text); // "hello_world_example"
toKebabCase(text); // "hello-world-example"
```

### 2. 字串處理

#### 截斷字串 (`truncate`)

```typescript
import { truncate } from './utils/string';

const longText = '這是一個很長的字串，需要被截斷顯示';
truncate(longText, 10); // "這是一個很長的字串..."
truncate(longText, 15); // "這是一個很長的字串，需要..."
truncate(longText, 20, '...'); // "這是一個很長的字串，需要被截斷..."
```

#### HTML 處理

```typescript
import { stripHtml, escapeHtml, unescapeHtml } from './utils/string';

const htmlString = '<p>這是一個 <strong>HTML</strong> 字串</p>';

// 移除 HTML 標籤
stripHtml(htmlString); // "這是一個 HTML 字串"

// HTML 轉義
const specialChars = '<script>alert("Hello")</script>';
escapeHtml(specialChars); // "&lt;script&gt;alert(&quot;Hello&quot;)&lt;/script&gt;"

// HTML 反轉義
unescapeHtml(escapeHtml(specialChars)); // 恢復原始字串
```

### 3. 字串生成和驗證

#### 生成隨機字串 (`generateRandomString`)

```typescript
import { generateRandomString } from './utils/string';

generateRandomString(8); // "aB3xK9mN"
generateRandomString(6, '0123456789'); // "123456"
generateRandomString(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // "ABCDEFGHIJ"
```

#### 字符數計算 (`getCharacterCount`)

```typescript
import { getCharacterCount } from './utils/string';

getCharacterCount('Hello 世界 123'); // 12 (包含中文字符)
getCharacterCount('Hello World'); // 11
```

#### 驗證函數

```typescript
import { isValidEmail, isValidUrl } from './utils/string';

// 電子郵件驗證
isValidEmail('test@example.com'); // true
isValidEmail('invalid-email'); // false

// URL 驗證
isValidUrl('https://example.com'); // true
isValidUrl('not-a-url'); // false
```

### 4. 字串轉換

#### 字串轉數字 (`toNumber`)

```typescript
import { toNumber } from './utils/string';

toNumber('123'); // 123
toNumber('abc'); // null
toNumber('12.34'); // 12.34
```

#### 字串填充 (`padString`)

```typescript
import { padString } from './utils/string';

padString('Hello', 10, '*'); // "Hello*****"
padString('Hello', 10, '*', 'start'); // "*****Hello"
padString('Hello', 10, '0', 'start'); // "00000Hello"
```

#### 字符移除 (`trimChars`)

```typescript
import { trimChars } from './utils/string';

trimChars('***Hello***', '*'); // "Hello"
trimChars('  Hello  '); // "Hello"
trimChars('###Title###', '#'); // "Title"
```

### 5. 字串分割和過濾

#### 分割並過濾 (`splitAndFilter`)

```typescript
import { splitAndFilter } from './utils/string';

const csvString = 'apple, ,banana, ,cherry';
splitAndFilter(csvString); // ["apple", "banana", "cherry"]

const tagString = 'javascript;react;typescript;';
splitAndFilter(tagString, ';'); // ["javascript", "react", "typescript"]
```

### 6. 中文字符處理

#### 中文字符檢查 (`containsChinese`)

```typescript
import { containsChinese } from './utils/string';

containsChinese('Hello World'); // false
containsChinese('你好世界'); // true
containsChinese('Hello 世界'); // true
```

#### 拼音轉換 (`toPinyin`)

```typescript
import { toPinyin } from './utils/string';

toPinyin('你好世界'); // "[中文][中文][中文][中文]"
```

**注意：** 這是一個簡化的實現，實際使用時建議使用專業的拼音轉換庫。

## 實際應用範例

### 表單驗證

```typescript
import { isValidEmail, trimChars, truncate } from './utils/string';

const userInput = {
    email: 'user@example.com',
    name: '  John Doe  ',
    description: '這是一個很長的描述，需要被截斷顯示在界面上',
};

// 驗證和清理
const validation = {
    emailValid: isValidEmail(userInput.email),
    nameClean: trimChars(userInput.name),
    descriptionShort: truncate(userInput.description, 20),
};
```

### 檔案名稱處理

```typescript
import { toKebabCase, toCamelCase } from './utils/string';

const fileName = 'My Document File.pdf';

toKebabCase(fileName); // "my-document-file.pdf"
toCamelCase(fileName); // "myDocumentFilePdf"
```

### 標籤處理

```typescript
import { splitAndFilter, toCamelCase } from './utils/string';

const tags = 'javascript, react, typescript, web development';

const processedTags = splitAndFilter(tags).map((tag) => toCamelCase(tag));
// ["javascript", "react", "typescript", "webDevelopment"]
```

### CSV 數據處理

```typescript
import { splitAndFilter, trimChars } from './utils/string';

const csvLine = 'apple, banana ,cherry, ,orange';

const cleanData = splitAndFilter(csvLine);
// ["apple", "banana", "cherry", "orange"]
```

## 錯誤處理

函數包含完整的錯誤處理：

```typescript
// 處理空值
isEmpty(null as unknown as string); // true
isEmpty(undefined as unknown as string); // true

// 處理特殊字符
const specialString = 'Hello\n\tWorld\r';
trimChars(specialString); // "HelloWorld"
```

## 效能考量

### 大量字串處理

```typescript
import { getCharacterCount, generateRandomString } from './utils/string';

// 大量字串字符數計算
const largeString = 'a'.repeat(1000);
getCharacterCount(largeString); // 1000

// 隨機字串生成效能測試
const startTime = Date.now();
for (let i = 0; i < 1000; i++) {
    generateRandomString(10);
}
const endTime = Date.now();
console.log(`生成1000個隨機字串耗時: ${endTime - startTime}ms`);
```

## 支援的輸入格式

所有函數都支援標準的字串輸入：

```typescript
// 基本字串
isEmpty('hello');

// 包含特殊字符的字串
escapeHtml('<script>alert("test")</script>');

// 包含中文字符的字串
containsChinese('你好世界');

// 包含空白字符的字串
trimChars('  Hello  ');
```

## 注意事項

1. **中文字符支援**：所有函數都正確處理中文字符，包括字符數計算和格式轉換。

2. **HTML 安全**：`escapeHtml` 和 `unescapeHtml` 函數提供基本的 HTML 安全處理。

3. **效能優化**：函數經過優化，適合處理大量數據。

4. **類型安全**：所有函數都提供完整的 TypeScript 類型支援。

5. **向後相容**：函數設計考慮向後相容性，不會破壞現有代碼。
