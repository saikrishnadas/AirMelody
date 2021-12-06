import { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify"

function useInfo() {
    const spotifyApi = useSpotify();
    const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [info,setInfo] = useState(null);

    useEffect(() =>{
        const fetchInfo = async () => {
            if(currentTrackId){
                const songInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers:{
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then(response => response.json());

                setInfo(songInfo);
            }
        }

        fetchInfo();
    },[currentTrackId,spotifyApi])

    return info;
}

export default useInfo;
