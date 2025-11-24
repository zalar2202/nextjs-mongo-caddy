import { ADMIN_GET_DASHBOARD_STATS } from '@/redux/features/adminSlice';
import { unwrapResult } from '@reduxjs/toolkit';

async function adminGetDashboardStats(dispatch, enqueueSnackbar, setState) {
    try {
        const result = await dispatch(ADMIN_GET_DASHBOARD_STATS());
        const response = unwrapResult(result);

        // response.data is {success: true, data: {...}}, so we need response.data.data
        setState(response.data?.data || response.data);
    } catch (err) {
        const errorMessage = err.message;

        enqueueSnackbar(errorMessage || 'متاسفانه مشکلی پیش آمده است.', {
            variant: 'error',
        });
    }
}

export default adminGetDashboardStats;
