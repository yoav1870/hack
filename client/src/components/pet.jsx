import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";



const Pet = ({ pet, getPets }) => {
    const deletePet= async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",

        })
        if (result.isConfirmed) {
            try {
                await axios.delete(`https://hack-po5d.onrender.com/api/pet/${id}`);
                toast.success("Deleted Pet successfully ");
                getPets();
            } catch (error) {
                toast.error(error.message);
            }
        }



    }

    return (
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{pet.name}</h2>
                <div className="text-sm">type: {pet.type}</div>
                <div className="text-sm">breed: {pet.breed}</div>
                <div className="text-sm">certification: {pet.certification}</div>
                <div className="text-sm">resuce date: {pet.rescueDate}</div>
                <img src={pet.image} alt={pet.name} className="w-full h-1/2" />

                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${pet._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link>
                    <button onClick={() => deletePet(pet._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button>
                </div>
            </div>



        </div>
    )
}

export default Pet;