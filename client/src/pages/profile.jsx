import fotoProfile from "../images/foto-profile.png";
import iconNama from "../images/icon-name.png";
import iconTelepon from "../images/icon-telepon.png";
import iconLokasi from "../images/icon-location.png";
import iconEmail from "../images/icon-email.png";
import iconTicket from "../images/icon-tiket.png";
import barcode from "../images/barcode.png";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import UpdateProfile from "../component/updateProfile";

const Profile = () => {
  const [state, _] = useContext(UserContext);
  console.log("donny", state);

  //   let { data: profile, isLoading } = useQuery("profileCache", async () => {
  //     const response = await API.get("/user/" + state.user.id);
  //     return response.data.data;
  //   });

  //   console.log("asuuu", profile);

  const { data: transUser } = useQuery("tripUserCache", async () => {
    const response = await API.get("/transactionuser/" + state.user.id);
    return response.data.data;
  });
  const { data: dataUser } = useQuery("dataUser", async () => {
    const response = await API.get("/user/" + state.user.id);
    return response.data.data;
  });

  console.log("asuuu", transUser);

  return (
    <>
      <div className="h-full bg-slate-50 pt-14 pb-20">
        <div className="w-1/2 h-80 bg-white m-auto flex justify-between items-center rounded">
          <div className="mx-7">
            <h1 className="text-black mb-6 text-3xl font-bold">
              Personal Info
            </h1>
            <div className="flex mb-5 items-center">
              <img src={iconNama} className="w-6 h-6" />
              <div className="mx-5">
                <p className="text-black text-xs font-medium">
                  {state?.user?.fullName}
                </p>
                <p className="text-gray-600 text-xs">Full Name</p>
              </div>
            </div>
            <div className="flex mb-5 items-center">
              <img src={iconEmail} className="w-6 h-6" />
              <div className="mx-5">
                <p className="text-black text-xs font-medium">
                  {state?.user?.email}
                </p>
                <p className="text-gray-600 text-xs">Email</p>
              </div>
            </div>
            <div className="flex mb-5 items-center">
              <img src={iconTelepon} className="w-6 h-6" />
              <div className="mx-5">
                <p className="text-black text-xs font-medium">
                  {state?.user?.phone}
                </p>
                <p className="text-gray-600 text-xs">Mobile Phone</p>
              </div>
            </div>
            <div className="flex mb-5 items-center">
              <img src={iconLokasi} className="w-6 h-6" />
              <div className="mx-5">
                <p className="text-black text-xs font-medium">
                  {state?.user?.address}
                </p>
                <p className="text-gray-600 text-xs">Adress</p>
              </div>
            </div>
          </div>
          <div className="mx-7">
            <img src={state?.user?.image} className="h-56 mb-2 rounded" />
            <UpdateProfile />
          </div>
        </div>
        <div className="mt-14 mx-60">
          <h1 className="text-3xl text-black font-bold">History Trip</h1>
          {transUser?.map((transUsers) => (
            <div
              key={transUsers?.id}
              className="w-full h-64 bg-white border rounded mt-8 "
            >
              <div className="flex justify-between mx-5 items-center">
                <img src={iconTicket} />
                <div>
                  <h2 className="text-2xl text-black font-bold text-right">
                    Booking
                  </h2>
                  <p>{transUsers?.trip?.datetrip}</p>
                </div>
              </div>
              <div className="flex mx-5 justify-between items-center">
                <div>
                  <div className="flex gap-8">
                    <div>
                      <h1 className="text-xl text-black font-bold">
                        {transUsers?.trip?.title}
                      </h1>
                      <p>{transUsers?.trip?.country?.name}</p>
                    </div>
                    <div>
                      <h3 className="text-black font-medium">Date Trip</h3>
                      <p>{transUsers?.trip?.datetrip}</p>
                    </div>
                    <div>
                      <h3 className="text-black font-medium">Duration</h3>
                      <p>
                        {transUsers?.trip?.day} Day {transUsers?.trip?.night}{" "}
                        Night
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8 items-center">
                    <div className="mr-44">
                      <p className="text-green-500 px-2 py-1 bg-green-100">
                        {transUsers?.status}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-black font-medium">Accomodation</h3>
                      <p>{transUsers?.trip?.accomodation}</p>
                    </div>
                    <div>
                      <h3 className="text-black font-medium">Transportation</h3>
                      <p>{transUsers?.trip?.transportation}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <img src={barcode} className="w-20" />
                  <p>TCK0101</p>
                </div>
              </div>
              <div className="flex gap-14 mx-5 border-b">
                <p className="text-black font-bold">No</p>
                <p className="text-black font-bold">Full Name</p>
                <p className="text-black font-bold">Gender</p>
                <p className="text-black font-bold">Phone</p>
              </div>
              <div className="flex gap-14 mx-5 border-b">
                <p>1</p>
                <p>{transUsers?.user?.fullName}</p>
                <p>Male</p>
                <p>{transUsers?.user?.phone}</p>
                <p className="text-black font-medium">Qty</p>
                <p className="text-black">
                  :
                  <span className="ml-7 text-black">
                    {transUsers?.counterqty}
                  </span>
                </p>
              </div>
              <div className="flex gap-14 mx-5">
                <p className="ml-[465px] text-black font-medium">Total</p>
                <p className="text-black">
                  :{" "}
                  <span className="text-red-500 ml-6">
                    IDR. {transUsers?.total}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
