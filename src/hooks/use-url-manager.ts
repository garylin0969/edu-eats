import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

interface UseUrlManagerReturn {
    updateUrlParams: (schoolId: string, period: string) => void;
    searchParams: URLSearchParams;
}

/**
 * URL 參數管理自定義 Hook
 * 提供 URL 參數的讀取和更新功能
 */
const useUrlManager = (): UseUrlManagerReturn => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const updateUrlParams = useCallback(
        (schoolId: string, period: string) => {
            const newSearchParams = new URLSearchParams(searchParams);

            if (schoolId) {
                newSearchParams.set('SchoolId', schoolId);
            } else {
                newSearchParams.delete('SchoolId');
            }

            if (period) {
                newSearchParams.set('period', period);
            } else {
                newSearchParams.delete('period');
            }

            navigate(`?${newSearchParams.toString()}`, { replace: true });
        },
        [navigate, searchParams]
    );

    return { updateUrlParams, searchParams };
};

export default useUrlManager;
