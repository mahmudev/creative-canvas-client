import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { TextField } from "@material-ui/core";
import useTitle from "../../../hooks/useTitle";

const AddClass = () => {
  useTitle("Add Class");
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_Image_Upload_token
        }`,
        formData
      )
      .then((response) => {
        const imgResponse = response.data;
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            name,
            price,
            instructor_name,
            instructor_email,
            available_seats,
          } = data;
          const newItem = {
            image: imgURL,
            name,
            instructor_name,
            instructor_email,
            available_seats,
            price: parseFloat(price),
          };
          console.log(newItem);
          axiosSecure.post("/add-classes", newItem).then((data) => {
            if (data.data.insertedId) {
              reset();
              toast.success("Class added successfully");
            }
          });
        }
      });
  };

  return (
    <div className="w-full px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Class Name*</span>
          </label>
          <TextField
            {...register("name", { required: true, maxLength: 120 })}
            type="text"
            label="Class Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            autoComplete="name"
          />
        </div>
        <div className="flex my-4">
          <div className="form-control w-full ">
            <TextField
              placeholder="Name"
              {...register("instructor_name", {
                required: true,
                maxLength: 120,
              })}
              type="text"
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              autoComplete="name"
              defaultValue={user?.displayName}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="form-control w-full ml-4">
            <TextField
              placeholder="Email"
              {...register("instructor_email", {
                required: true,
                maxLength: 120,
              })}
              type="text"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              autoComplete="Email"
              defaultValue={user?.email}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <div className="flex my-4">
          <div className="form-control w-full">
            <TextField
              {...register("available_seats", {
                required: true,
                maxLength: 120,
              })}
              type="number"
              label="Available Seats"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              autoComplete="Available Seats"
            />
          </div>
          <div className="form-control w-full ml-4">
            <TextField
              {...register("price", { required: true, maxLength: 120 })}
              type="number"
              label="price"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              autoComplete="price"
            />
          </div>
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>
        <div className="flex justify-center">
          <input className="btn mt-4" type="submit" value="Add class" />
        </div>
      </form>
    </div>
  );
};

export default AddClass;
