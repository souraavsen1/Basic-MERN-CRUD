import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const UpdateUser = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updateflag, setUpdateflag] = useState(false);

  const { userId } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5000/user-details/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data);
      });
  }, [updateflag]);

  
  const onSubmit = (data) => {
    fetch(`http://localhost:5000/user/update/${userId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resdata) => {
        console.log(resdata);
        setUpdateflag(!updateflag);
      });
    // e.preventDefault();
  };

  return (
    <div>
      <br />
      <br />
      <h5>{userDetails.name} </h5>
      <h5>{userDetails.email} </h5>
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={userDetails.name} {...register("name")} />

        <input defaultValue={userDetails.email} {...register("email")} />
        {errors.exampleRequired && <span>This field is required</span>}

        <input type='submit' />
      </form>
    </div>
  );
};

export default UpdateUser;
