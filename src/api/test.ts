import axios from 'axios';

export interface YesNoResponse {
    answer: string;
    forced: boolean;
    image: string;
}

export const GetYesNo = () => {
    return axios.get<YesNoResponse>('https://yesno.wtf/api');
};
