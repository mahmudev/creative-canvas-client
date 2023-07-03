import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure(`/enrolls?email=${user.email}`);
                return res.data;
            }
            return []; 
        },
    });
    return [cart, refetch];
};

export default useCart;
