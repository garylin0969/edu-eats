// 通用 API 響應類型
export interface ApiResponse<T> {
    result: number;
    message?: string;
    data: T;
}

// 縣市數據類型
export interface County {
    CountyId: number | null;
    County: string | null;
    Code: string | null;
}

// 區域數據類型
export interface Area {
    CountyId: number | null;
    County: string | null;
    Code: string | null;
    Area: string | null;
    AreaId: number | null;
}

// 學校搜尋參數類型
export interface SchoolParams {
    CountyId?: string;
    AreaId?: string;
    SchoolType?: string;
    SchoolName?: string;
}

// 學校數據類型
export interface School {
    SchoolId: number | null;
    SchoolCode: string | null;
    SchoolName: string | null;
    CountyId: number | null;
    AreaId: number | null;
    SchoolType: number | null;
}

// 學校詳細資料類型
export interface SchoolDetail {
    SchoolId: number;
    SchoolName: string;
    CountyId: number;
    AreaId: number;
    SchoolType: number;
}

// 餐廳搜尋參數類型
export interface CanteenParams {
    SchoolId: number;
    SFStreetId?: number;
    period?: string;
}

// 餐廳數據類型
export interface Restaurant {
    SchoolId: number;
    SchoolName: string;
    SFStreetId: number;
    SFStreetName: string;
    RestaurantId: number;
    RestaurantName: string;
    kitchenId: string;
    companyId: string;
    address: string;
    tel: string;
    Hours1_desc: string;
    Hours1_value: string;
    Hours2_desc: string;
    Hours2_value: string;
    mealItems: string;
    manager: string;
    isEnable: string;
    enable: number;
    createDate: string;
    RmodifyDate: string;
    sfsmodifyDate: string;
}

// 餐廳菜單搜尋參數類型
export interface MealParams {
    SchoolId: number;
    RestaurantId: number;
    period: string;
}

// 菜單項目類型
export interface MealItem {
    RMenuDishId: number;
    RDishTypeId: string;
    RDishTypeName: string;
    RDishId: number;
    RDishName: string;
    MenuDate: string;
    SortOrder: number;
    IngredientList: string;
    calorie: number;
    createUser: string;
    createDate: string;
    modifyUser: string | null;
    modifyDate: string | null;
}

// 餐廳菜單數據類型
export interface CanteenMeal {
    SchoolId: number;
    SchoolName: string;
    SFStreetId: number;
    SFStreetName: string;
    RestaurantId: number;
    RestaurantName: string;
    Meal: MealItem[];
}

export interface CateringServiceParams {
    key?: string;
    method?: string;
    schoolId?: string | number;
    schoolCode?: string;
    schoolName?: string;
    func?: string;
    storeId?: string;
    type?: string;
    valueName?: string;
    token?: string;
    username?: string;
}

// 服務提供參數類型
export interface OfferingServiceParams {
    SchoolId: string | number;
    period: string;
}

// 服務類型數據類型
export interface OfferingService {
    label: string;
    ServiceId: number;
}
