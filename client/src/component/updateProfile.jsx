import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import Swal from "sweetalert2";

function UpdateProfile() {
  const [state, _] = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user } = useQuery("userCached", async () => {
    const response = await API.get(`/user/` + state.user.id);
    return response.data.data;
  });
  console.log("bangsat", user);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });

  const { fullname, email, phone, address, image } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };
  console.log(form);

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("fullname", form.fullname);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("address", form.address);

      const response = await API.patch(
        `/user/${state?.user?.id}`,
        formData,
        config
      );
      console.log("update user success", response);
      Swal.fire({
        icon: "success",
        title: "update profile success !!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/profile");
    } catch (err) {
      console.log("update user failed", err);
      Swal.fire({
        icon: "error",
        title: "upadate user failed !!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor="my-modal-6"
        className="btn bg-yellow-400 px-8 text-white z-10"
      >
        Update Profile
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <label htmlFor="my-modal-6" className="modal cursor-pointer">
        <label className="modal-box relative w-96 bg-white" htmlFor="">
          <h3 className="text-2xl text-black font-bold mb-5 text-center">
            Update Profile
          </h3>
          <div className="mb-1">
            <label className="text-black font-medium text-lg">Full Name</label>
            <input
              onChange={handleOnChange}
              name="fullname"
              type="text"
              className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
            />
          </div>
          <div className="mb-1">
            <label className="text-black font-medium text-lg"> Email </label>
            <input
              onChange={handleOnChange}
              type="email"
              name="email"
              className="px-5 w-full py-1 rounded bg-zinc-300  text-black"
            />
          </div>
          <div className="mb-1">
            <label className="text-black font-medium text-lg">Phone</label>
            <input
              onChange={handleOnChange}
              type="text"
              name="phone"
              className="px-5 w-full py-1 rounded bg-zinc-300  text-black"
            />
          </div>
          <div className="mb-5">
            <label className="text-black font-medium text-lg">Address</label>
            <input
              onChange={handleOnChange}
              type="text"
              name="address"
              className="px-5 w-full py-1 rounded bg-zinc-300  text-black"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="">image</label>
            <input
              onChange={handleOnChange}
              name="image"
              type="file"
              className="px-5 w-full py-1 rounded bg-zinc-300  text-black"
            />
          </div>
          <div>
            <button
              onClick={(e) => handleOnSubmit.mutate(e)}
              type="submit"
              className="w-full bg-yellow-400 text-white font-medium py-1 px-5 rounded"
            >
              Update Profile
            </button>
          </div>
        </label>
      </label>
    </>
  );
}

export default UpdateProfile;
