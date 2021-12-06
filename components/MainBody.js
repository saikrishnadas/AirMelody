import { useState,useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { shuffle } from "lodash";
import {useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState,playlistState } from "../atoms/playlistAtom";
import spotifyApi from "../lib/spotify";
import useSpotify from "../hooks/useSpotify";
import SongsList from "./SongsList";
import { useRouter } from 'next/router'
import Loader from "react-loader-spinner";

const colors = [
    "from-indigo-500",
    "from-green-500",
    "from-blue-500",
    "from-red-500",
    "from-yellow-500",
    "from-purple-500",
    "from-pink-500"
]

function MainBody() {
    const router = useRouter();
    const {data:session,status} = useSession();
    const spotifyApi = useSpotify();
    const [color,setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist,setPlaylist] = useRecoilState(playlistState);
    
    useEffect(()=> {
        setColor(shuffle(colors).pop())
    },[playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then(data => setPlaylist(data.body)).catch((err) => console.log("Something went wrong",err))
        },[spotifyApi,playlistId])

        const handleProfileClick = (e) => {
            e.preventDefault()
            router.push("/profile")
          }

    return (
        <>
        {status === "loading" ? 
        <Loader
        type="Grid"
        color="#00BFFF"
        height={100}
        width={100}
    /> :
        <div className="flex-grow">
            <header className="absolute top-1 right-8">
                <div className="flex items-center space-x-3 bg-gray-900 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
                 onClick={handleProfileClick}
                >
                    <img className="rounded-full w-10 h-10" src={session?.user.image} alt="X" />
                <h2 className="hidden md:block">{session?.user.name}</h2>
                <ChevronDownIcon className="hidden md:block md:h-5 md:w-5"/>

                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img className="h-44 w-44" src={playlist?.images?.[0]?.url} alt="" />
                <Loader
                    className="md:hidden ml-5"
                    type="Audio"
                    color="#00BFFF"
                    height={40}
                    width={40}
                />
            </section>
            <div className="mb-3 md:flex md:items-center">
                <p className="ml-2">PLAYLIST</p>
                <h1 className="ml-2 text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                <Loader
                    className="hidden md:block ml-5"
                    type="Audio"
                    color="#00BFFF"
                    height={40}
                    width={40}
                />
            </div>
            <SongsList />
        </div>
        }
        </>
    )
}

export default MainBody
