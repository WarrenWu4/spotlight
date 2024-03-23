import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import StudioAudio from "../components/StudioAudio";
import { FaLongArrowAltRight } from "react-icons/fa"
import StudioVideo from "../components/StudioVideo";

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
                {(focus === "true") ? <StudioVideo/>:<></>}

                <button type="button" className="px-4 py-2 bg-black rounded-md font-semibold text-xl flex items-center text-white gap-x-2 cursor-pointer">
                    end spotlight session 
                    <FaLongArrowAltRight />
                </button>

            </div>
        
        </div>
    )
}