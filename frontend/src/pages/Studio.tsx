import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IoIosCheckmark } from "react-icons/io";
import StudioAudio from "../components/StudioAudio";


export default function Studio() {

    const { lecture, focus } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        // validate lecture and focus params
        if (!lecture || !focus) {
            nav("/error/invalid+lecture+and+focus+param");
        }
        if (lecture !== "true" && lecture !== "false") {
            nav("/error/invalid+lecture+param");
        }
        if (focus !== "true" && focus !== "false") {
            nav("/error/invalid+focus+param");
        }
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center max-w-screen-xl gap-y-12">
            
            <Navbar/>

            <div className="w-full h-full flex flex-col items-center justify-center gap-y-12 p-4">

                {(lecture === "true") ? <StudioAudio/>:<></>
                }

            </div>
        
        </div>
    )
}