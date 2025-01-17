import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaPlay, FaPause } from "react-icons/fa";

const audioMimeType = "audio/webm";

export default function StudioAudio() {
    
    const nav = useNavigate();

    const [audioPerm, setAudioPerm] = useState<boolean>(false);
    const [audioStream, setAudioStream] = useState<any>(null);

    const audioRecorder = useRef<MediaRecorder | null>(null);
    const [audioStatus, setAudioStatus] = useState<string>("inactive");
    const [audioChunks, setAudioChunks] = useState<any[]>([]);
    const [audio, setAudio] = useState<string | null>(null);
    
    async function getMicrophonePermission() {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setAudioPerm(true);
                setAudioStream(streamData);
            } catch (err: any) {
                nav("/error/error+getting+permission+for+audio");
            }
        } else {
            nav("/error/mediaplayer+api+not+supported+by+browser");
        }
    }

    async function startAudioRecording() {
        setAudioStatus("recording");
        const media = new MediaRecorder(audioStream, { mimeType: audioMimeType });
        audioRecorder.current = media;
        audioRecorder.current.start();
        let localAudioChunks:any[] = [];
        audioRecorder.current.ondataavailable = (event:any) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    }

    function stopAudioRecording() {
        setAudioStatus("inactive");
        if (audioRecorder.current) {
            audioRecorder.current.stop();
            audioRecorder.current.onstop = () => {
                let audioBlob = new Blob(audioChunks, { type: audioMimeType });
                let audioUrl = URL.createObjectURL(audioBlob);
                setAudio(audioUrl);
                setAudioChunks([])
            }
        }
    }

    useEffect(() => {
        getMicrophonePermission();
    }, [])
    
    return (audioPerm) ? 
    <div className="flex flex-col gap-y-1 w-full max-w-screen-md">

        <div className="w-full flex items-center justify-between gap-x-4">
            <div className="font-bold text-xl">
                Audio recording in progress
            </div>
            <button type="button" onClick={(audioStatus === "inactive" ? startAudioRecording : stopAudioRecording)} className="flex items-center gap-x-2 text-lg font-bold cursor-pointer">
                {(audioStatus === "inactive") ?
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

        {audio ? 
            <a href={audio} download="audio.wav">
                download
            </a>
            :
            <></>
        }
    </div>
    : <></>
}