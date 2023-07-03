import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const usePaymentHistory = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: paymentHistory = [] } = useQuery({
        queryKey: ['payment-history', user?.email],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure(`/payment-history?email=${user.email}`);
                return res.data;
            }
            return []; 
        },
    });
    return [paymentHistory, refetch];
};

export default usePaymentHistory;
