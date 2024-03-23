import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaLongArrowAltRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

    // transcribe lecture by default and add focus session if user wants to
    const [spotlightOpt, setSpotlightOpt] = useState<boolean[]>([true, false]);
    const nav = useNavigate();

    function startSpotlight() {
        // move to studio with the desired options
        nav(`/studio/${spotlightOpt[0]}/${spotlightOpt[1]}`);
    }

    return (
        <div className="w-full h-full flex flex-col items-center max-w-screen-xl gap-y-12">

            <Navbar/>
            
            <div className="w-full px-12 border-2 border-black">
                
                <button type="button" onClick={startSpotlight} className="px-4 py-2 bg-black rounded-md font-semibold text-xl flex items-center text-white gap-x-2 cursor-pointer">
                    start spotlight
                    <FaLongArrowAltRight />
                </button>

                <div className="gap-x-2 flex items-center cursor-pointer">
                    <input type="checkbox"/>
                    transcribe lecture
                </div>

                <div className="gap-x-2 flex items-center cursor-pointer">
                    <input type="checkbox"/>
                    measure focus
                </div>

            </div>

            {/* notion db */}

            {/* stats */}

            {/* recommended courses */}

        </div>
    )
}