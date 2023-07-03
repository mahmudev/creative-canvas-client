import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../../componets/constant/constant";
import SectionTitle from "../../../componets/Title/SectionTirle";

const Blogs = () => {
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/all-blogs`);
      return res.data;
    },
  });

  return (
    <div className=" container my-20 mx-auto">
      <SectionTitle heading="Latest Articles"></SectionTitle>
      <div className="mx-auto grid   grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {blogs.map((blog) => (
          <div
            key={blog?._id}
            className="max-w-sm overflow-hidden border rounded-xl bg-white "
          >
            <img src={blog?.image} alt="plant" className="h-auto w-full" />
            <div className="p-5">
              <h1 className="font-bold text-xl">{blog?.blogTitle}</h1>
              <p className="text-medium mb-5text-gray-700">
                {blog?.blogContent}
              </p>
              <p>Read more....</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
