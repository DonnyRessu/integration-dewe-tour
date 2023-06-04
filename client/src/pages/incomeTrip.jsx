import { Link, useParams } from "react-router-dom";
import fotoCard from "../images/foto-card.png";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

const IncomeTrip = () => {
  const { id } = useParams();
  const { data: trips, isLoading } = useQuery("tripsCache", async () => {
    const response = await API.get("/trips");
    return response.data.data;
  });
  console.log(trips);

  const handleOnDelete = useMutation(async (tripId) => {
    try {
      await API.delete(`/trip/${tripId}`);
      alert("trip deleted");
    } catch (err) {
      console.log(err);
    }
  });
  if (isLoading) return;
  <div>loading...</div>;

  return (
    <>
      <div className="px-32 bg-white pt-5 pb-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl text-black">Income Trip</h1>
          <Link to={"/add-trip"}>
            <button className="bg-yellow-400 px-4 py-1 rounded text-white">
              Add Trip
            </button>
          </Link>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-10 mt-10 pb-5">
            {trips?.map((trip) => (
              <div
                key={trip?.id}
                className="card w-72 bg-white shadow-xl  rounded-none"
              >
                <figure>
                  <img src={trip?.image} className="px-2 py-2" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-black text-left text-xl -ml-6 -mt-24 pt-16">
                    {trip?.title}
                  </h2>
                  <div className="flex justify-between mt-3 gap-20">
                    <p className="text-base text-yellow-300 font-bold -mx-6">
                      IDR. {trip?.price}
                    </p>
                    <p className="text-base -mr-10">{trip?.country?.name}</p>
                  </div>
                  <div className="flex justify-between">
                    <Link to={`/update-trip/${trip.id}`}>
                      <button className="bg-green-400 px-5 py-1 rounded-md text-white">
                        update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleOnDelete.mutate(trip?.id)}
                      className="bg-red-500 px-5 py-1 rounded-md text-white"
                    >
                      delete
                    </button>
                  </div>
                  {/* <div className="card-actions justify-end"></div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeTrip;
