import { useEffect, useState } from "react";
import axios from "axios";
import Pet from "../components/pet";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPets = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("https://hack-po5d.onrender.com/api/pet");
            console.log(response.data);
            setPets(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPets();
    }, [])

    return (
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Add a pet</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {isLoading ? (
                    "Loading"
                ) : (
                    <>
                        {pets.length > 0 ? (
                            <>
                                {
                                    pets.map((pet, index) => {
                                        return (
                                            <Pet key={index} pet={pet}  getPets={getPets}/>
                                        )
                                    })

                                }
                            </>
                        ) : (
                            <div>
                                There are no pets.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default HomePage;