import detailTour1 from "../images/detail-tour1.png";
import detailTour2 from "../images/detail-tour2.png";
import detailTour3 from "../images/detail-tour3.png";
import detailTour4 from "../images/detail-tour4.png";
import iconAccomodation from "../images/icon-accomodation.png";
import iconTransportation from "../images/icon-transportation.png";
import iconEat from "../images/icon-eat.png";
import iconDuration from "../images/icon-duration.png";
import iconDate from "../images/icon-date.png";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

const DetailTour = ({ setDataTrans }) => {
  const { id } = useParams();
  console.log(id);

  const { data: tripss, isLoading } = useQuery("tripssCache", async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });
  console.log("anjingg", tripss);

  const [total, setTotal] = useState(1);
  const tambah = () => {
    total <= 1 ? setTotal(1) : setTotal(total - 1);
  };

  useEffect(() => {
    setDataTrans({
      qty: total,
      pay: tripss?.price * total,
    });
  }, [total]);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = import.meta.env
      .VITE_REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBook = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = {
        tripid: tripss?.id,
        counterqty: total,
        total: tripss?.price * total,
      };

      const body = JSON.stringify(data);

      const response = await API.post("/transaction", body, config);
      console.log("transaction success :", response);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed : ", error);
    }
  });

  return (
    <>
      <div className="px-40 bg-slate-50 py-10">
        <h1 className="text-black text-3xl font-bold mb-2">{tripss?.title}</h1>
        <p className="mb-3">{tripss?.country?.name}</p>
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <img src={tripss?.image} className="w-full h-96" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img src={tripss?.image} className="w-full h-96" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img src={tripss?.image} className="w-full h-96" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img src={tripss?.name} className="w-full h-96" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
        <h1 className="text-black font-medium mt-3">Information Trip</h1>
        <table>
          <tr>
            <td className="px-10">Accomodation</td>
            <td className="px-10">transportation</td>
            <td className="px-10">Eat</td>
            <td className="px-10">Duration</td>
            <td className="px-10">Date trip</td>
          </tr>
          <tr>
            <td className="px-10">
              <img src={iconAccomodation} />
              <p className="text-black ml-1 font-medium">
                {tripss?.accomodation}
              </p>
            </td>
            <td className="px-10">
              <img src={iconTransportation} />
              <p className="text-black ml-1 font-medium">
                {tripss?.transportation}
              </p>
            </td>
            <td className="px-10">
              <img src={iconEat} />
              <p className="text-black ml-1 font-medium">{tripss?.eat}</p>
            </td>
            <td className="px-10">
              <img src={iconDuration} />
              <p className="text-black ml-1 font-medium">
                {tripss?.day} Day {tripss?.night} Nights
              </p>
            </td>
            <td className="px-10">
              <img src={iconDate} />
              <p className="text-black ml-1 font-medium inline-block">
                {tripss?.datetrip}
              </p>
            </td>
          </tr>
        </table>
        <h1 className="mt-10 text-black text-xl font-medium mb-1 ">
          description
        </h1>
        <p className="text-justify">{tripss?.description}</p>
        <div className="flex justify-between mt-5 border-b pb-3 mb-1">
          <h2 className="text-yellow-400 font-medium">
            {rupiah(tripss?.price)}
            <span className="text-black font-medium">/ Person</span>
          </h2>
          <div className="flex gap-5">
            <button
              onClick={() => tambah()}
              className="bg-yellow-400 px-2 rounded-md text-white"
            >
              -
            </button>
            <p>{total}</p>
            <button
              onClick={() => setTotal(total + 1)}
              className="bg-yellow-400 px-2 rounded-md text-white"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p className="text-black font-medium">Total :</p>
          <p className="text-yellow-400 font-medium">
            {rupiah(total * tripss?.price)}
          </p>
        </div>
        <div className="text-right mt-7">
          <button
            onClick={() => handleBook.mutate()}
            className="bg-yellow-400 text-white px-20 py-3 rounded-md"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailTour;
