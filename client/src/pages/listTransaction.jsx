import { useEffect } from 'react'
import iconTransaction from '../images/iconTransaction.png'
import { useNavigate } from 'react-router-dom'
import ModalApprove from '../component/modalApprove'

const ListTransaction = () => {
    // const navigate = useNavigate()
    // useEffect(() => {
    //     for(let i = 1; i <= localStorage.length; i++) {
    //         if(JSON.parse(localStorage.getItem(i)).status === false && JSON.parse(localStorage.getItem(i)).role === 'admin'){
    //           navigate('/')
    //         }
    //       }
    // }, [])

    return (
        <>
        <div className="h-screen py-1 bg-white">
        <div className="mt-8 container m-auto">
            <h1 className="text-white font-bold text-center mb-5">Incoming Transcation</h1>
            <table class="table-auto" className="bg-red-400 m-auto text-xs w-2/3 text-center">
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
                <tr className="bg-white">
                    <td className="text-black p-3">1</td>
                    <td className="text-black">Radhif Ganteng</td>
                    <td className="text-black">6D/4N FUN TASSIE VACATION + SIDNEY</td>
                    <td className="text-black">bca.jpg</td>
                    <td className="text-green-500">approve</td>
                    <td><ModalApprove /></td>
                </tr>
                <tr className="bg-white border">
                    <td className="text-black p-3">2</td>
                    <td className="text-black">Haris Rahman</td>
                    <td className="text-black">6D/4N FUN TASSIE VACATION + SIDNEY</td>
                    <td className="text-black">bni.jpg</td>
                    <td className="text-green-500">approve</td>
                    <td><ModalApprove /></td>
                </tr>
                <tr className="bg-white">
                    <td className="text-black p-3">3</td>
                    <td className="text-black">Amin Subagyo</td>
                    <td className="text-black">6D/4N FUN TASSIE VACATION + SIDNEY</td>
                    <td className="text-black">permata.jpg</td>
                    <td className="text-red-700">Cancel</td>
                    <td><ModalApprove /></td>
                </tr>
                <tr className="bg-white border">
                    <td className="text-black p-3">4</td>
                    <td className="text-black">Haris Astina</td>
                    <td className="text-black">6D/4N FUN TASSIE VACATION + SIDNEY</td>
                    <td className="text-black">Permata.jpg</td>
                    <td className="text-yellow-500">Pending</td>
                    <td><ModalApprove /></td>
                </tr>
                <tr className="bg-white">
                    <td className="text-black p-3">5</td>
                    <td className="text-black">Aziz Oni On</td>
                    <td className="text-black">6D/4N FUN TASSIE VACATION + SIDNEY</td>
                    <td className="text-black">bca.jpg</td>
                    <td className="text-yellow-500">Pending</td>
                    <td><ModalApprove /></td>
                </tr>
                <tr className="bg-white border">
                    <td className="text-black p-3">6</td>
                    <td className="text-black">Sugeng No Pants</td>
                    <td className="text-black">6D/4N FUN TASSIE VACATION + SIDNEY</td>
                    <td className="text-black">bni.jpg</td>
                    <td className="text-yellow-500">Pending</td>
                    <td><ModalApprove /></td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
        </>
    )
}

export default ListTransaction