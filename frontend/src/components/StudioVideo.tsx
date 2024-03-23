import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:5000";

export default function StudioVideo() {
    
    const nav = useNavigate();
    const [vidPerm, setVidPerm] = useState<boolean>(false);

    async function getCameraPermission() {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
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
        await fetch(url + "/start")
    }

    async function stopVideoRecording() {
        // stop recording video
        await fetch(url + "/stop")
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
            <div className="flex items-center gap-x-4">
                <button type="button" onClick={startVideoRecording}>
                    start
                </button>
                <button type="button" onClick={stopVideoRecording}>
                    stop
                </button>
            </div>
        </div>

        
        <div className="w-full flex items-center justify-between gap-x-4">
            <div className="w-full rounded-md h-1 bg-gray-400"/>
            <div className="text-lg font-bold">00:00</div>
        
        </div>

    </div>
    : <></>
}