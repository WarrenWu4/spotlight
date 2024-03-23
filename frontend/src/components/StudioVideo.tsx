import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudioVideo() {
    
    const nav = useNavigate();
    const [vidPerm, setVidPerm] = useState<boolean>(false);
    const [vidStream, setVidStream] = useState<any>(null);

    async function getCameraPermission() {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                setVidPerm(true);
                setVidStream(streamData);
            } catch (err: any) {
                nav("/error/error+getting+permission+for+camera");
            }
        } else {
            nav("/error/mediaplayer+api+not+supported+by+browser");
        }
    }

    return (
        <div>

        </div>
    )
}