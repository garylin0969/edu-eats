# Common Utils

通用工具函數集合，包含常用的數據轉換和處理方法。

## 功能列表

### `transformToOptions(data, labelKey, valueKey)`

將數據數組轉換為 Option 格式，用於下拉選單等 UI 組件。這是一個通用的數據轉換工具，可以將任何具有 label 和 value 欄位的數據轉換為統一的選項格式。

**參數：**

- `data` - 要轉換的數據數組 (`T[] | undefined | null`)
- `labelKey` - 用作 label 的欄位名稱 (`keyof T`)
- `valueKey` - 用作 value 的欄位名稱 (`keyof T`)

**返回值：**

- Option 格式的數組 `{ label: string, value: string }[]`

**特點：**

- 支持 TypeScript 泛型，提供完整的類型檢查
- 自動處理空值情況（null/undefined）
- 自動將 value 轉換為字串格式
- 支援各種數據類型（字串、數字、布林值等）

**範例：**

```typescript
// 基本使用
const counties = [
    { CountyId: 1, County: '台北市', Code: 'TPE' },
    { CountyId: 2, County: '新北市', Code: 'NTP' },
];

const options = transformToOptions(counties, 'County', 'CountyId');
// 結果: [
//   { label: '台北市', value: '1' },
//   { label: '新北市', value: '2' }
// ]

// 處理用戶數據
const users = [
    { userId: '001', userName: '張三', isActive: true },
    { userId: '002', userName: '李四', isActive: false },
];

const userOptions = transformToOptions(users, 'userName', 'userId');
// 結果: [
//   { label: '張三', value: '001' },
//   { label: '李四', value: '002' }
// ]

// 處理空值情況
const emptyOptions = transformToOptions(null, 'name', 'id');
// 結果: []

const undefinedOptions = transformToOptions(undefined, 'name', 'id');
// 結果: []
```

## 使用方式

```typescript
import { transformToOptions } from '@/utils/common';

// 在組件中使用
const MyComponent = () => {
    const [data, setData] = useState([]);

    const options = useMemo(() => {
        return transformToOptions(data, 'name', 'id');
    }, [data]);

    return (
        <Select options={options} />
    );
};

// 在 API 響應處理中使用
const processApiResponse = (apiData) => {
    const selectOptions = transformToOptions(apiData, 'displayName', 'uniqueId');
    return selectOptions;
};
```

## 適用場景

- 下拉選單 (Select/Combobox) 的數據準備
- 多選框 (Checkbox/Radio) 的選項轉換
- 表單組件的選項數據處理
- API 響應數據的格式統一化
- 任何需要 label-value 格式的場景
