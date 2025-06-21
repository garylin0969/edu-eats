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
