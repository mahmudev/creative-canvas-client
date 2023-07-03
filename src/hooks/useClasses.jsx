import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../componets/constant/constant";

const useClasses = () => {
  const {
    data: classes = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/all-classes`);
      return res.data;
    },
  });

  return [classes, loading, refetch];
};

export default useClasses;
