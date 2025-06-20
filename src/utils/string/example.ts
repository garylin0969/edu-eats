/**
 * 字串工具函數使用範例
 */
import {
    isEmpty,
    toTitleCase,
    toCamelCase,
    toSnakeCase,
    toKebabCase,
    truncate,
    stripHtml,
    escapeHtml,
    unescapeHtml,
    generateRandomString,
    getCharacterCount,
    isValidEmail,
    isValidUrl,
    toNumber,
    padString,
    trimChars,
    splitAndFilter,
    containsChinese,
    toPinyin,
} from './index';

console.log('=== 字串基本操作範例 ===');

// 檢查字串是否為空
console.log('空字串檢查:', isEmpty('')); // true
console.log('空白字串檢查:', isEmpty('   ')); // true
console.log('正常字串檢查:', isEmpty('Hello')); // false

// 字串格式轉換
const testString = 'hello world example';

console.log('原始字串:', testString);
console.log('標題格式:', toTitleCase(testString)); // "Hello World Example"
console.log('駝峰命名:', toCamelCase(testString)); // "helloWorldExample"
console.log('蛇形命名:', toSnakeCase(testString)); // "hello_world_example"
console.log('短橫線命名:', toKebabCase(testString)); // "hello-world-example"

console.log('\n=== 字串處理範例 ===');

// 截斷字串
const longString = '這是一個很長的字串，需要被截斷顯示';
console.log('原始字串:', longString);
console.log('截斷後 (10字元):', truncate(longString, 10)); // "這是一個很長的字串..."
console.log('截斷後 (15字元):', truncate(longString, 15)); // "這是一個很長的字串，需要..."

// HTML 處理
const htmlString = '<p>這是一個 <strong>HTML</strong> 字串</p>';
console.log('原始 HTML:', htmlString);
console.log('移除 HTML 標籤:', stripHtml(htmlString)); // "這是一個 HTML 字串"

// HTML 轉義
const specialChars = '<script>alert("Hello")</script>';
console.log('原始字串:', specialChars);
console.log('轉義後:', escapeHtml(specialChars)); // "&lt;script&gt;alert(&quot;Hello&quot;)&lt;/script&gt;"
console.log('反轉義後:', unescapeHtml(escapeHtml(specialChars))); // 恢復原始字串

console.log('\n=== 字串生成和驗證範例 ===');

// 生成隨機字串
console.log('隨機字串 (8字元):', generateRandomString(8));
console.log('隨機數字字串 (6字元):', generateRandomString(6, '0123456789'));

// 字符數計算
const mixedString = 'Hello 世界 123';
console.log('字串:', mixedString);
console.log('字符數:', getCharacterCount(mixedString)); // 12 (包含中文字符)

// 電子郵件驗證
console.log('有效郵件:', isValidEmail('test@example.com')); // true
console.log('無效郵件:', isValidEmail('invalid-email')); // false

// URL 驗證
console.log('有效 URL:', isValidUrl('https://example.com')); // true
console.log('無效 URL:', isValidUrl('not-a-url')); // false

console.log('\n=== 字串轉換範例 ===');

// 字串轉數字
console.log('數字字串轉換:', toNumber('123')); // 123
console.log('無效字串轉換:', toNumber('abc')); // null

// 字串填充
console.log('右側填充:', padString('Hello', 10, '*')); // "Hello*****"
console.log('左側填充:', padString('Hello', 10, '*', 'start')); // "*****Hello"

// 字符移除
console.log('移除指定字符:', trimChars('***Hello***', '*')); // "Hello"
console.log('移除空白:', trimChars('  Hello  ')); // "Hello"

console.log('\n=== 字串分割和過濾範例 ===');

// 分割並過濾
const csvString = 'apple, ,banana, ,cherry';
console.log('原始字串:', csvString);
console.log('分割後:', splitAndFilter(csvString)); // ["apple", "banana", "cherry"]

const tagString = 'javascript;react;typescript;';
console.log('標籤字串:', tagString);
console.log('分割標籤:', splitAndFilter(tagString, ';')); // ["javascript", "react", "typescript"]

console.log('\n=== 中文字符處理範例 ===');

// 中文字符檢查
const englishString = 'Hello World';
const chineseString = '你好世界';
const mixedString2 = 'Hello 世界';

console.log('英文檢查:', containsChinese(englishString)); // false
console.log('中文檢查:', containsChinese(chineseString)); // true
console.log('混合檢查:', containsChinese(mixedString2)); // true

// 拼音轉換（簡化版本）
console.log('中文轉拼音:', toPinyin(chineseString)); // "[中文][中文][中文][中文]"

console.log('\n=== 實際應用範例 ===');

// 表單驗證
const userInput = {
    email: 'user@example.com',
    name: '  John Doe  ',
    description: '這是一個很長的描述，需要被截斷顯示在界面上',
};

console.log('表單驗證結果:');
console.log('- 郵件有效:', isValidEmail(userInput.email));
console.log('- 姓名清理:', trimChars(userInput.name));
console.log('- 描述截斷:', truncate(userInput.description, 20));

// 檔案名稱處理
const fileName = 'My Document File.pdf';
console.log('原始檔名:', fileName);
console.log('URL 安全檔名:', toKebabCase(fileName)); // "my-document-file.pdf"
console.log('變數名稱:', toCamelCase(fileName)); // "myDocumentFilePdf"

// 標籤處理
const tags = 'javascript, react, typescript, web development';
console.log('原始標籤:', tags);
console.log(
    '處理後標籤:',
    splitAndFilter(tags).map((tag) => toCamelCase(tag))
); // ["javascript", "react", "typescript", "webDevelopment"]

console.log('\n=== 錯誤處理範例 ===');

// 處理空值
console.log('null 檢查:', isEmpty(null as unknown as string)); // true
console.log('undefined 檢查:', isEmpty(undefined as unknown as string)); // true

// 處理特殊字符
const specialString = 'Hello\n\tWorld\r';
console.log('原始字串:', JSON.stringify(specialString));
console.log('清理後:', JSON.stringify(trimChars(specialString)));

console.log('\n=== 效能測試範例 ===');

// 大量字串處理
const largeString = 'a'.repeat(1000);
console.log('大量字串字符數:', getCharacterCount(largeString));

// 隨機字串生成效能
const startTime = Date.now();
for (let i = 0; i < 1000; i++) {
    generateRandomString(10);
}
const endTime = Date.now();
console.log('生成1000個隨機字串耗時:', endTime - startTime, 'ms');
