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
