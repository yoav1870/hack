import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [pet, setPet] = useState({
        name: "",
        age: "",
        type: "",
        breed: "",
        status: "",
        certification: "",
        image: ""
    });

    const getPet = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://hack-po5d.onrender.com/api/pet/${id}`);
            setPet({
                name: response.data.name,
                age: response.data.age,
                type: response.data.type,
                breed: response.data.breed,
                certification: response.data.certification,
                rescueDate: response.data.rescueDate,
                image: response.data.image,

            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    const updatePet = async (pet) => {
        setIsLoading(true);
        const petData = {
          name: pet.name,
          age: pet.age,
          type: pet.type,
          breed: pet.breed,
          certification: pet.certification,
          rescueDate: pet.rescueDate,
          image: pet.image,
        };
      
        try {
          const response = await axios.put(`https://hack-po5d.onrender.com/api/pet/${pet.id}`, petData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          toast.success("Updated pet successfully");
          navigate("/");
        } catch (error) {
          setIsLoading(false);
          toast.error(error.message);
        }
      };
      

    useEffect(() => {
        getPet();
    }, [id]);

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">Update {pet.name}</h2>
            {isLoading ? ("Loading") : (
                <>
                    <form onSubmit={updatePet}>
                        <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400" placeholder="Enter Name"></input>
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
                </>
            )}

        </div>
    );
};

export default EditPage;
