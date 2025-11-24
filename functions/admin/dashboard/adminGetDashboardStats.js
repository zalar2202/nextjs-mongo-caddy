import { ADMIN_GET_DASHBOARD_STATS } from '@/redux/features/adminSlice';
import { unwrapResult } from '@reduxjs/toolkit';

async function adminGetDashboardStats(dispatch, enqueueSnackbar, setState) {
    try {
        const result = await dispatch(ADMIN_GET_DASHBOARD_STATS());
        const response = unwrapResult(result);

        // Debug: log the response structure
        console.log('Dashboard stats response:', response);
        
        // Handle different response structures
        let statsData = null;
        if (response?.data?.data) {
            // Response is {success: true, data: {...}}
            statsData = response.data.data;
        } else if (response?.data) {
            // Response might already be the data object
            statsData = response.data;
        } else if (response) {
            // Response might be the data directly
            statsData = response;
        }

        console.log('Setting stats data:', statsData);
        setState(statsData);
    } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        const errorMessage = err.message;

        enqueueSnackbar(errorMessage || 'متاسفانه مشکلی پیش آمده است.', {
            variant: 'error',
        });
    }
}

export default adminGetDashboardStats;
