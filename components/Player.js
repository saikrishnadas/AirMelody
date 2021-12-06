import {useState,useEffect,useCallback} from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify"
import useInfo from "../hooks/useInfo";
import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, VolumeUpIcon } from "@heroicons/react/solid";
import { VolumeOffOutline } from "heroicons-react";
import { debounce } from "lodash";

function Player() {
    const spotifyApi = useSpotify();
    const {data:session,status} = useSession();
    const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);
    const [volume,setVolume] = useState(50);

    const trackInfo = useInfo();
    
    const fetchSong = () => {
        if(!trackInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    const handlePlay = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data.body.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            }else {
                spotifyApi.play();
                setIsPlaying(true)
            }
        })
    }

    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId){
            fetchSong();
            setVolume(50);
        }
    },[currentTrackIdState,spotifyApi,session])

    useEffect(() => {
        if(volume > 0 && volume < 100){
            debounceVolume(volume);
        }
    },[volume])
    
    const debounceVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {console.log(err)})
        },500),
        []
    )
    
     return (
        <div className="text-white h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4 ">
                <img className="hidden md:inline h-10 w-10" src={trackInfo?.album.images?.[0]?.url} alt="track image" />
                <div>
                    <h3>{trackInfo?.name}</h3>
                    <p>{trackInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="hidden md:block md:w-5 md:h-5" />
                <RewindIcon className="hidden md:md:block md:w-5 md:h-5" />
                
                {isPlaying ? (
                    <PauseIcon onClick={handlePlay} className="button w-10 h-10" />
                ):(
                  <PlayIcon onClick={handlePlay} className="button w-10 h-10" />
                )}

                <FastForwardIcon className="hidden md:md:block md:w-5 md:h-5" />
                <ReplyIcon className="hidden md:md:block md:w-5 md:h-5" /> 
            </div>
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeOffOutline 
                onClick={() => volume > 0 && setVolume(volume - 10)} 
                className="button"/>

                <input 
                value={volume} 
                onChange={e => setVolume(Number(e.target.value))} 
                className="w-14 md:w-28" 
                type="range" min={0} max={100} />

                <VolumeUpIcon 
                onClick={() => volume < 100 && setVolume(volume + 10)} 
                className="button"/>
            </div>
        </div>
    )
}

export default Player;
