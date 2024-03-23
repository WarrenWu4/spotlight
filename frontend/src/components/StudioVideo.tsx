import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:5000";

interface StudioVideoProps {
    setAnalytics: Function;
}

export default function StudioVideo({setAnalytics}: StudioVideoProps) {
    
    const nav = useNavigate();
    const [vidPerm, setVidPerm] = useState<boolean>(false);
    const [vidStatus, setVidStatus] = useState<string>("inactive");

    async function getCameraPermission() {
        if ("MediaRecorder" in window) {
            try {
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                setVidPerm(true);
            } catch (err: any) {
                nav("/error/error+getting+permission+for+camera");
            }
        } else {
            nav("/error/mediaplayer+api+not+supported+by+browser");
        }
    }

    async function startVideoRecording() {
        // start recording video
        await fetch(url + "/start");
        setVidStatus("recording");
    }

    async function stopVideoRecording() {
        // stop recording video
        const data = await fetch(url + "/stop")
        setAnalytics(data);
        setVidStatus("inactive");
    }

    useEffect(() => {
        getCameraPermission();
    })

    return (vidPerm) ? 
    <div className="flex flex-col gap-y-1 w-full max-w-screen-md">

        <div className="w-full flex items-center justify-between gap-x-4">
            <div className="font-bold text-xl">
                Video recording in progress
            </div>
            <button type="button" onClick={(vidStatus === "inactive" ? startVideoRecording : stopVideoRecording)} className="flex items-center gap-x-2 text-lg font-bold cursor-pointer">
                {(vidStatus === "inactive") ?
                    <>
                    <FaPlay size={12}/> <div>Start</div>
                    </> :
                    <>
                    <FaPause size={12}/> <div>Pause</div>
                    </>
                }
            </button>
        </div>

        
        <div className="w-full flex items-center justify-between gap-x-4">
            <div className="w-full rounded-md h-1 bg-gray-400"/>
            <div className="text-lg font-bold">00:00</div>
        
        </div>

    </div>
    : <></>
}