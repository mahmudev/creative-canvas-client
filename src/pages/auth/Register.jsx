import React, { useContext, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { toast } from "react-toastify";
import useTitle from "../../hooks/useTitle";
import { TextField, IconButton } from "@material-ui/core";
import axios from "axios";
import { baseUrl } from "../../componets/constant/constant";

const Register = () => {
  useTitle("Register");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();


  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    createUser(data.email, data.password).then((result) => {
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = {
            name: data.name,
            image: data.photoURL,
            email: data.email,
          };
          axios
            .post(`${baseUrl}/users`, saveUser, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              const data = response.data;
              if (data.insertedId) {
                reset();
                toast.success("User has been created successfully");
                navigate("/");
              }
            });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? "text" : "password";
  const passwordIcon = showPassword ? <RiEyeOffFill /> : <RiEyeFill />;

  return (
    <>
      <div className="container mx-auto w-full py-16 px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow-2xl rounded lg:w-1/3  md:w-1/2 w-full p-10">
            <p
              tabIndex={0}
              className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
            >
              Create your account
            </p>
            <p
              tabIndex={0}
              className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
            >
              Already have an account?
              <Link
                to="/login"
                className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"
              >
                login here
              </Link>
            </p>
            <div className="w-full flex items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />

              <hr className="w-full bg-gray-400  " />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-sm font-medium leading-none text-gray-800">
                  Name
                </label>

                <TextField
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="mt-2  w-full">
                <label className="text-sm font-medium leading-none text-gray-800">
                  Email
                </label>

                <TextField
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="mt-2  w-full">
                <label className="text-sm font-medium leading-none text-gray-800">
                  Photo URL
                </label>
                <TextField
                  {...register("photoURL")}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  autoComplete="current-password"
                  placeholder="photo url"
                  type="text"
                  name="photo"
                  label="photo"
                />
              </div>
              <div className="mt-2  w-full">
                <label
                  htmlFor="pass"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Password
                </label>
                <TextField
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  required
                  type={passwordInputType}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility}>
                        {passwordIcon}
                      </IconButton>
                    ),
                  }}
                />

                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </div>
              <div className="mt-2  w-full">
                <label
                  htmlFor="pass"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Password
                </label>
                <TextField
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                  label="Confirm Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  required
                  type={passwordInputType}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility}>
                        {passwordIcon}
                      </IconButton>
                    ),
                  }}
                />
                {errors.confirmPassword?.type === "required" && (
                  <p className="text-red-600">Confirm Password is required</p>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <p className="text-red-600">Passwords do not match</p>
                )}
              </div>
              <div className="mt-8">
                <button
                  role="button"
                  type="submit"
                  variant="contained"
                  className="btn w-full btn-primary"
                >
                  Create my account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
