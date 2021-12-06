import { HomeIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {useRouter} from "next/router";
import Loader from "react-loader-spinner";

function profile() {
    const {data:session,status} = useSession();
    const router = useRouter();

    const handleHomeClick = (e) => {
        e.preventDefault();
        router.push("/")
    }

    return (
        <div className="h-screen bg-black pt-20">
        {status === "loading" ?   
        <Loader
                    className="ml-[50%]"
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                /> :
                        <div className="w-[50%] md:w-[30%] h-[60%] m-auto bg-gray-900 rounded-xl p-2">
        <div className="flex items-center text-gray-500 cursor-pointer hover:text-white" 
        onClick={handleHomeClick}
        >  
        <HomeIcon className="w-5 h-5"/>
        <p className="hidden md:inline ml-2">Home</p>

        </div>
                <img className="rounded-full w-20 h-20 md:w-40 md:h-40 m-auto shadow-md md:rounded-md md:hover:rounded-full cursor-pointer" src={session?.user?.image} alt="profile-pic" />
                <p className="text-white ml-[40%] md:ml-[45%] mt-5 text-[2rem] font-bold">{session?.user?.name}</p>
                <p  className="text-white text-sm ml-6 mt-5 md:ml-[30%]">{session?.user?.email}</p>
        </div>
                }

        </div>
    )
}

export default profile
