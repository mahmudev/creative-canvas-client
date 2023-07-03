import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../componets/constant/constant";

const useGetInstructor = () => {
  const {
    data: instructor = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["get-instructor"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/all-instructors`);
      return res.data;
    },
  });

  return [instructor, loading, refetch];
};

export default useGetInstructor;
