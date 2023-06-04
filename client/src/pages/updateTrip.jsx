import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const UpdateTrip = () => {
  const { id } = useParams();
  const { data: countries, refetch } = useQuery("countriesCache", async () => {
    const response = await API.get("/countries");
    return response.data;
  });

  const [country, setCountry] = useState({
    name: "",
  });

  const handleAddCategory = useMutation(async () => {
    try {
      const response = await API.post("/country", country);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "add country success !!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "add country failed !!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    country: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    datetrip: "",
    price: "",
    quota: "",
    description: "",
    image: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };
  console.log(form);

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("country_id", form.country);
      formData.set("accomodation", form.accomodation);
      formData.set("transportation", form.transportation);
      formData.set("eat", form.eat);
      formData.set("day", form.day);
      formData.set("night", form.night);
      formData.set("datetrip", form.datetrip);
      formData.set("price", form.price);
      formData.set("quota", form.quota);
      formData.set("description", form.description);

      console.log("bangsattt", formData);

      const response = await API.patch(`/trip/${id}`, formData, config);
      console.log("update trip success", response);
      Swal.fire({
        icon: "success",
        title: "update trip success !!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/income-trip");
    } catch (err) {
      e.preventDefault();
      console.log("add trip failed", err);
      Swal.fire({
        icon: "error",
        title: "add trip failed !!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  return (
    <>
      <div className="px-32 bg-white py-10">
        <dialog id="my_modal_2" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <h1 className="text-black text-2xl font-bold">Update Trip</h1>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="mb-1 mt-3">
            <label className="text-black font-medium text-lg">Title Trip</label>
            <input
              onChange={handleOnChange}
              name="title"
              value={form.title}
              type="text"
              className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">Country</label>
            <div className="flex w-full gap-5">
              <div className="w-full">
                <select
                  onChange={handleOnChange}
                  className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
                  name="country"
                  value={form.country}
                >
                  <option className="hidden"></option>
                  {countries?.map((index, id) => (
                    <option className="text-black" key={id} value={index?.id}>
                      {index?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/6">
                {/* The button to open modal */}
                <label
                  htmlFor="my-modal-6"
                  className=" bg-yellow-400 px-4 py-2 rounded-md cursor-pointer text-white z-10"
                >
                  Add Country
                </label>

                {/* Put this part before </body> tag */}
                <input
                  type="checkbox"
                  id="my-modal-6"
                  className="modal-toggle"
                />
                <label htmlFor="my-modal-6" className="modal cursor-pointer">
                  <label
                    className="modal-box relative w-96 bg-white"
                    htmlFor=""
                  >
                    <h3 className="text-2xl text-black font-bold mb-5 text-center">
                      Add Country
                    </h3>
                    <div>
                      <label htmlFor="" className="text-black font-medium ">
                        Name
                      </label>
                      <br></br>
                      <input
                        type="text"
                        onChange={(e) => setCountry({ name: e.target.value })}
                        className="bg-zinc-300 px-2 py-1 rounded-sm w-full text-black mt-2"
                        name="addcategory"
                      />
                    </div>
                    <div>
                      <div
                        onClick={() => handleAddCategory.mutate()}
                        className="w-full py-2 px-4 bg-yellow-400 text-white mt-4 rounded-md text-center cursor-pointer"
                      >
                        Add Category
                      </div>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">
              Accomodation
            </label>
            <input
              onChange={handleOnChange}
              name="accomodation"
              value={form.accomodation}
              type="text"
              className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">
              Transportation
            </label>
            <input
              onChange={handleOnChange}
              name="transportation"
              value={form.transportation}
              type="text"
              className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">Eat</label>
            <input
              onChange={handleOnChange}
              name="eat"
              value={form.eat}
              type="text"
              className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">Duration</label>
            <div className="flex items-center">
              <input
                onChange={handleOnChange}
                name="day"
                value={form.day}
                type="text"
                className="px-5  py-1 rounded bg-zinc-300 text-black w-40 mr-5"
              />
              <label className="text-black font-bold mr-10">Day</label>
              <input
                onChange={handleOnChange}
                name="night"
                value={form.night}
                type="text"
                className="px-5 py-1 rounded bg-zinc-300 text-black w-40 mr-5"
              />
              <label className="text-black font-bold">Night</label>
            </div>
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">Date Trip</label>
            <input
              onChange={handleOnChange}
              name="datetrip"
              value={form.datetrip}
              type="date"
              className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">Price</label>
            <input
              onChange={handleOnChange}
              name="price"
              value={form.price}
              type="text"
              className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">Quota</label>
            <input
              onChange={handleOnChange}
              name="quota"
              value={form.quota}
              type="text"
              className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">
              Description
            </label>
            <textarea
              onChange={handleOnChange}
              name="description"
              value={form.description}
              className="px-5 w-full h-24 py-1 rounded bg-zinc-300 text-black resize-none"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className="text-black font-medium text-lg">image</label>
            <input
              onChange={handleOnChange}
              name="image"
              type="file"
              className="px-5 w-full py-1 rounded bg-zinc-300 text-black"
            />
          </div>
          <div className="text-center mt-10">
            <button
              type="submit"
              className="bg-yellow-400 px-8 py-1 rounded text-white"
            >
              Add Trip
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateTrip;
