import {getProviders,signIn} from "next-auth/react";
import logo from "../public/logo.svg";
import Image from 'next/image';

function Login({providers}) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <Image width={200} height={200} src={logo} alt="logo" /> 

            {providers !== null && Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className="flex items-center bg-white text-[#18D860] p-5 rounded-full"
                    onClick={()=>signIn(provider.id, {callbackUrl:"/"})}
                    >Login with {provider.name}
                    <img className="w-5 h-5 ml-2" src="https://links.papareact.com/9xl" alt="" />
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps(){
    const providers = await getProviders();

return {
    props:{
        providers,
    }
}
}
