import { useEffect } from "react";
import iconTransaction from "../images/iconTransaction.png";
import { useNavigate } from "react-router-dom";
import ModalApprove from "../component/modalApprove";
import { useQuery } from "react-query";
import { API } from "../config/api";

const ListTransaction = () => {
  const { data: listTransaction } = useQuery(
    "listTransactionCache",
    async () => {
      const response = await API.get("/transactions");
      return response.data.data;
    }
  );
  console.log("babiiii", listTransaction);

  return (
    <>
      <div className="h-full py-1 bg-white pb-10" >
        <div className="mt-8 container m-auto">
          <h1 className="text-white font-bold text-center mb-5">
            Incoming Transcation
          </h1>
          <table
            class="table-auto"
            className="bg-red-400 m-auto text-xs w-2/3 text-center"
          >
            <thead className="bg-white border">
              <tr>
                <th className="text-black p-3 ">No</th>
                <th className="text-black">Users</th>
                <th className="text-black">Trip</th>
                <th className="text-black mr-3">Bukti Transfer</th>
                <th className="text-black">Status Payment</th>
                <th className="text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {listTransaction?.map((listTrans ,id) => (
                <tr key={id}className="bg-white">
                  <td className="text-black p-3">{listTrans?.id}</td>
                  <td className="text-black">{listTrans?.user?.fullName}</td>
                  <td className="text-black">{listTrans?.trip?.title}</td>
                  <td className="text-black">bca.jpg</td>
                  <td className="text-green-500">approve</td>
                  <td>
                    <ModalApprove />
                  </td>
                </tr>
            ))} 
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListTransaction;
