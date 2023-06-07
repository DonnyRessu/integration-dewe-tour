import iconTicket from "../images/icon-tiket.png";
import barcode from "../images/barcode.png";
import buktiTransfer from "../images/buktiTransfer.png";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Payment = ({ dataTrans }) => {
  const { id } = useParams();
  console.log(id);
  const { data: tripsss } = useQuery("tripsssCache", async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });
  console.log("gendi", dataTrans);
  const [state, _] = useContext(UserContext);
  console.log("bangsatt", state);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleTransaction = useMutation(async (e) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let data = {
        counterqty: dataTrans?.qty,
        total: dataTrans?.pay,
        status: "success",
        tripid: tripsss?.id,
      };

      console.log("adasdas", data);
      const response = await API.post("/transaction", data, config);
      alert("transaksi sukses");
    } catch (err) {
      console.log(err);
    }
  });

  console.log(tripsss);
  console.log(new Date().toDateString());
  return (
    <>
      <div className="bg-slate-50 w-full h-full py-20 px-44">
        <div className="w-[900px] h-72 bg-white border rounded">
          <div className="flex justify-between mx-5 items-center">
            <img src={iconTicket} />
            <div>
              <h2 className="text-2xl text-black font-bold text-right">
                Booking
              </h2>
              <p>{new Date().toDateString()}</p>
            </div>
          </div>
          <div className="flex mx-5 justify-between items-center">
            <div>
              <div className="flex gap-8">
                <div>
                  <h1 className="text-xl text-black font-bold">
                    {tripsss?.title}
                  </h1>
                  <p>{tripsss?.country?.name}</p>
                </div>
                <div>
                  <h3 className="text-black font-medium">Date Trip</h3>
                  <p>{tripsss?.datetrip}</p>
                </div>
                <div>
                  <h3 className="text-black font-medium">Duration</h3>
                  <p>
                    {tripsss?.day} Day {tripsss?.night} Night
                  </p>
                </div>
              </div>
              <div className="flex gap-8 items-center">
                <div className="mr-44">
                  <p className="text-green-500 px-2 py-1 bg-green-100">
                    approve
                  </p>
                </div>
                <div>
                  <h3 className="text-black font-medium">Accomodation</h3>
                  <p>{tripsss?.accomodation}</p>
                </div>
                <div>
                  <h3 className="text-black font-medium">Transportation</h3>
                  <p>{tripsss?.transportation}</p>
                </div>
              </div>
            </div>
            <div>
              <img src={buktiTransfer} className="w-20" />
              <p>upload payment proof</p>
            </div>
          </div>
          <div className="flex gap-14 mx-5 border-b mb-2 pb-2">
            <p className="text-black font-bold">No</p>
            <p className="text-black font-bold">Full Name</p>
            <p className="text-black font-bold">Gender</p>
            <p className="text-black font-bold">Phone</p>
          </div>
          <div className="flex gap-14 mx-5 border-b mb-2 pb-2">
            <p>1</p>
            <p className="text-black">{state?.user?.fullname}</p>
            <p>Male</p>
            <p>{state?.user?.phone}</p>
            <p className="text-black font-medium">Qty</p>
            <p className="text-black">
              :<span className="ml-7 text-black">{dataTrans?.qty}</span>
            </p>
          </div>
          <div className="flex gap-14 mx-5">
            <p className="ml-[465px] text-black font-medium">Total</p>
            <p className="text-black">
              :{" "}
              <span className="text-red-500 ml-6">
                {rupiah(dataTrans?.qty * tripsss?.price)}
              </span>
            </p>
          </div>
        </div>
        <div className="text-right mt-10 ">
          <button
            onClick={() => handleTransaction.mutate()}
            className="bg-yellow-400 px-16 py-1 text-white mr-3 rounded font-medium"
          >
            Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;
