/**
 * 日期格式化函數使用範例
 */
import {
    formatDate,
    getDateRange,
    isToday,
    isYesterday,
    isTomorrow,
    getDayOfWeek,
    getMonthName,
    getDateDifference,
    addDays,
    addMonths,
    addYears,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    isLeapYear,
} from './index';

// 創建一個測試日期
const testDate = new Date('2024-01-15T10:30:00');

console.log('=== 日期格式化範例 ===');

// 基本格式化
console.log('ISO 格式:', formatDate(testDate, 'iso'));
console.log('本地格式:', formatDate(testDate, 'local'));
console.log('簡短格式:', formatDate(testDate, 'short'));
console.log('長格式:', formatDate(testDate, 'long'));
console.log('時間格式:', formatDate(testDate, 'time'));
console.log('日期格式:', formatDate(testDate, 'date'));
console.log('日期時間格式:', formatDate(testDate, 'datetime'));

// 相對時間
const now = new Date();
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

console.log('一小時前:', formatDate(oneHourAgo, 'relative'));
console.log('一天前:', formatDate(oneDayAgo, 'relative'));

// 自定義格式
console.log('自定義格式 (YYYY-MM-DD):', formatDate(testDate, 'YYYY-MM-DD'));
console.log('自定義格式 (MM/DD/YYYY HH:mm):', formatDate(testDate, 'MM/DD/YYYY HH:mm'));
console.log('自定義格式 (YYYY年MM月DD日):', formatDate(testDate, 'YYYY年MM月DD日'));

// 帶選項的格式化
console.log('24小時制:', formatDate(testDate, 'datetime', { use24Hour: true }));
console.log('包含秒:', formatDate(testDate, 'datetime', { showSeconds: true }));
console.log('英文格式:', formatDate(testDate, 'long', { locale: 'en-US' }));

console.log('\n=== 日期檢查範例 ===');

// 日期檢查
console.log('是否為今天:', isToday(now));
console.log('是否為昨天:', isYesterday(oneDayAgo));
console.log('是否為明天:', isTomorrow(addDays(now, 1)));

console.log('\n=== 日期資訊範例 ===');

// 日期資訊
console.log('星期幾:', getDayOfWeek(testDate));
console.log('月份名稱:', getMonthName(testDate));
console.log('英文星期幾:', getDayOfWeek(testDate, 'en-US'));
console.log('英文月份:', getMonthName(testDate, 'en-US'));

console.log('\n=== 日期計算範例 ===');

// 日期計算
console.log('加3天:', formatDate(addDays(testDate, 3), 'local'));
console.log('加2個月:', formatDate(addMonths(testDate, 2), 'local'));
console.log('加1年:', formatDate(addYears(testDate, 1), 'local'));

// 月份第一天和最後一天
console.log('月份第一天:', formatDate(getFirstDayOfMonth(testDate), 'local'));
console.log('月份最後一天:', formatDate(getLastDayOfMonth(testDate), 'local'));

// 閏年檢查
console.log('2024是否為閏年:', isLeapYear(2024));
console.log('2023是否為閏年:', isLeapYear(2023));

console.log('\n=== 日期差異範例 ===');

// 日期差異
const date1 = new Date('2024-01-01T00:00:00');
const date2 = new Date('2024-01-15T12:30:45');
const diff = getDateDifference(date1, date2);

console.log('日期差異:', {
    天數: diff.days,
    小時: diff.hours,
    分鐘: diff.minutes,
    秒數: diff.seconds,
    毫秒: diff.milliseconds,
});

console.log('\n=== 日期範圍範例 ===');

// 日期範圍
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-01-31');

console.log('日期範圍 (本地):', getDateRange(startDate, endDate, 'local'));
console.log('日期範圍 (簡短):', getDateRange(startDate, endDate, 'short'));
console.log('日期範圍 (長格式):', getDateRange(startDate, endDate, 'long'));

console.log('\n=== 錯誤處理範例 ===');

// 錯誤處理
try {
    formatDate('invalid-date');
} catch (error) {
    console.log('錯誤處理:', error instanceof Error ? error.message : String(error));
}

// 支援不同輸入格式
console.log('字串日期:', formatDate('2024-01-15', 'local'));
console.log('時間戳:', formatDate(1705312200000, 'local'));
