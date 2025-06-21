# Object Utils

物件相關的工具函數集合。

## 功能列表

### `filterObjectEmptyValues(obj)`

過濾掉物件中的空值（undefined 和空字串）。

**參數：**

- `obj` - 要過濾的物件

**返回值：**

- 過濾後的物件

**範例：**

```typescript
const data = { name: 'John', email: '', age: undefined, city: 'Taipei' };
const filtered = filterObjectEmptyValues(data);
// 結果: { name: 'John', city: 'Taipei' }
```

過濾掉物件中的 null 和 undefined 值。

**參數：**

- `obj` - 要過濾的物件

**返回值：**

- 過濾後的物件

**範例：**

```typescript
const data = { name: 'John', email: '', age: undefined, phone: null };
const filtered = filterNullish(data);
// 結果: { name: 'John', email: '' }
```

### `objectIsEmpty(obj)`

檢查物件是否為空。

**參數：**

- `obj` - 要檢查的物件

**返回值：**

- 如果物件為空則返回 true

**範例：**

```typescript
objectIsEmpty({}); // true
objectIsEmpty({ name: 'John' }); // false
```

### `objectDeepClone(obj)`

深度克隆物件。

**參數：**

- `obj` - 要克隆的物件

**返回值：**

- 克隆後的物件

**範例：**

```typescript
const original = { user: { name: 'John', age: 30 } };
const cloned = objectDeepClone(original);
// cloned 是完全獨立的副本
```

## 使用方式

```typescript
import { filterObjectEmptyValues, objectIsEmpty, objectDeepClone } from '@/utils/object';

// 使用範例
const formData = { name: 'John', email: '', age: undefined };
const cleanData = filterObjectEmptyValues(formData);

// 深度克隆物件
const original = { user: { name: 'John', age: 30 } };
const cloned = objectDeepClone(original);

// 檢查物件是否為空
const isEmpty = objectIsEmpty(cleanData);
```
