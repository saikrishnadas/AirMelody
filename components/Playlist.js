import { useSession } from "next-auth/react";
import {useState,useEffect} from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Playlist() {
    const {data:session,status} = useSession();
    const spotifyApi = useSpotify();
    const [playlists,setPlaylists] = useState([]);
    const [playlistId,setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then(data => {
                setPlaylists(data.body.items);
            })
        }
    },[session,spotifyApi])

    return (
        <div className="hidden md:block w-96 h-[33rem] top-9 scrollbar-hide float-right border-l border-gray-800 border-b text-gray-500 pl-5 overflow-y-scroll leading-loose">
        <p className="font-bold text-xl text-white mb-5">PLAYLISTS</p>
        {playlists.map((playlist) => (
        <p className="cursor-pointer hover:text-white" onClick={() => setPlaylistId(playlist.id)} key={playlist.id}>{playlist.name}</p>
        ))}
        </div>
    )
}

export default Playlist
