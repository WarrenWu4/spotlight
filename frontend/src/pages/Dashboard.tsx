import Navbar from "../components/Navbar";
import { FaLongArrowAltRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    // transcribe lecture by default and add focus session if user wants to
    const nav = useNavigate();

    function startSpotlight() {
        // move to studio with the desired options
        nav(`/studio/record`);
    }

    return (
        <div className="w-full h-full flex flex-col items-center max-w-screen-xl gap-y-12 px-4">

            <Navbar/>
            
            
            <button type="button" onClick={startSpotlight} className="px-4 py-2 bg-black rounded-md font-semibold text-xl flex items-center text-white gap-x-2 cursor-pointer mb-4">
                start spotlight
                <FaLongArrowAltRight />
            </button>


        </div>
    )
}