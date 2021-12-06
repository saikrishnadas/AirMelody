import {HomeIcon,SearchIcon,LibraryIcon,PlusCircleIcon,HeartIcon,RssIcon, ChevronDoubleDownIcon,LogoutIcon} from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"

function Header() {
    const {data:session,status} = useSession();

    return (
        <header className="text-gray-500 p-5 text-sm border-b border-gray-800">
            <div className="flex">
                <button className="flex px-3 cursor-pointer hover:text-white md:px-5">
                    <HomeIcon className="w-5 h-5 mr-1"/>
                    <p className="hidden md:block">Home</p>
                </button>
                <button className="flex px-3 cursor-pointer hover:text-white md:px-5">
                    <LibraryIcon className="w-5 h-5 mr-1"/>
                    <p className="hidden md:block">Your Library</p>
                </button>
                <button className="flex px-3 cursor-pointer hover:text-white md:px-5">
                    <PlusCircleIcon className="w-5 h-5 mr-1"/>
                    <p className="hidden md:block" >Create Playlist</p>
                </button> 
                <button className="flex px-3 cursor-pointer hover:text-white md:px-5">
                    <HeartIcon className="w-5 h-5 mr-1 text-red-600 fill-current"/>
                    <p className="hidden md:block">Liked Songs</p>
                </button>
                <button className="flex px-3 cursor-pointer hover:text-white md:px-5">
                    <RssIcon className="w-5 h-5 mr-1 text-green-600"/>
                    <p className="hidden md:block" >Your Episodes</p>
                </button>
                <button className="flex px-3 cursor-pointer hover:text-white md:px-5">
                    <SearchIcon className="w-5 h-5 mr-1"/>
                    <p className="hidden md:block">Search</p>
                </button>
                <button className="flex px-3 cursor-pointer hover:text-white md:px-5" onClick={() => signOut()}>
                <LogoutIcon className="w-5 h-5 mr-1"/>
                    <p className="hidden md:block">Logout</p>
                </button>
                
            </div>
        </header>
    )
}

export default Header
