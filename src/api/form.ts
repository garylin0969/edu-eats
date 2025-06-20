import { http } from './axios';

interface Response<T> {
    result: number;
    message?: string;
    data: T;
}

interface County {
    CountyId: number | null;
    County: string | null;
    Code: string | null;
}

export const GetCounty = () => {
    return http.get<Response<County[]>>('/county');
};
