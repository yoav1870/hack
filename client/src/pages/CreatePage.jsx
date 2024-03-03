import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");
    const [certification, setCertification] = useState("");
    const [resuceDate, setRescueDate] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const savePet = async (e) => {
        e.preventDefault();
        if (id === "" || name === "" || type === "" || breed === "" || age === "" || certification === "" || resuceDate === "" || image === "" ) {
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post("https://hack-po5d.onrender.com/api/pet", {name: name, age: age, type: type, breed: breed, certification: certification, resuceDate: resuceDate, image: image});
            toast.success(`Saved ${response.data.name} sucessfully`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">Add a pet</h2>
            <form onSubmit={savePet}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="number" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Name"></input>
                    </div>
                    <div>
                        <label>Age</label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Age"></input>
                    </div>
                    <div>
                        <label>type</label>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Type"></input>
                    </div>
                    <div>
                        <label>Breed</label>
                        <input type="text" value={description} onChange={(e) => setBreed(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Breed"></input>
                    </div>
                    <div>
                        <label>Certification</label>
                        <input type="text" value={certification} onChange={(e) => setCertification(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Certification"></input>
                    </div>
                    <div>
                        <label>Rescue Date</label>
                        <input type="text" value={resuceDate} onChange={(e) => setRescueDate(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Rescue Date"></input>
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Image"></input>
                    </div>
                    <div>
                        {!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}

                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePage;