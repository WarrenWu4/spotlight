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
        <div className="w-full h-full flex flex-col items-center max-w-screen-xl gap-y-12 px-4">

            <Navbar/>
            
            <div className="w-fit p-8 rounded-md border-2 border-solid border-black">
                
                <button type="button" onClick={startSpotlight} className="px-4 py-2 bg-black rounded-md font-semibold text-xl flex items-center text-white gap-x-2 cursor-pointer mb-4">
                    start spotlight
                    <FaLongArrowAltRight />
                </button>

                <button type="button" onClick={() => {setSpotlightOpt([!spotlightOpt[0], spotlightOpt[1]])}} className="gap-x-2 flex items-center cursor-pointer text-lg">
                    <div className={`rounded-sm border-2 border-black border-solid  w-3 h-3 ${(spotlightOpt[0]) ? "bg-black" : "bg-white"}`}>
                    </div>
                    transcribe lecture
                </button>

                <button type="button" onClick={() => {setSpotlightOpt([spotlightOpt[0], !spotlightOpt[1]])}} className="gap-x-2 flex items-center cursor-pointer text-lg">
                    <div className={`rounded-sm border-2 border-black border-solid w-3 h-3 ${(spotlightOpt[1]) ? "bg-black" : "bg-white"}`}>
                    </div>
                    measure focus
                </button>

            </div>

            {/* notion db */}


            {/* stats */}

            {/* recommended courses */}

        </div>
    )
}