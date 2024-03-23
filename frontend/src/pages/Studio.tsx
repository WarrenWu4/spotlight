import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaLongArrowAltRight } from "react-icons/fa"
import StudioVideo from "../components/StudioVideo";
import StudioAudio from "../components/StudioAudio";

interface AnalysisData {
    attentionScore: string;
    phoneUsage: string;
    totalTime: string;
}

export default function Studio() {

    const { state } = useParams();
    const nav = useNavigate();

    const [analysisData, setAnalysisData] = useState<AnalysisData>({
        attentionScore: "100.00%",
        phoneUsage: "0.00s",
        totalTime: "3.81s"
    });

    useEffect(() => {
        // validate state
        if (!state) {
            nav("/error/invalid+state+provided")
        }
    }, [])

    function endSpotlightSession() {
        // change url to analyze state
        window.location.href = "/studio/analyze";
    }

    return (
        <div className="w-full h-full flex flex-col items-center max-w-screen-xl gap-y-12">
            
            <Navbar/>

            <div className="w-full h-full flex flex-col items-center justify-center gap-y-12 p-4">

                {
                    (state === "record") ? 
                    <>
                        <StudioVideo setAnalytics={setAnalysisData}/>
                        <button type="button" onClick={endSpotlightSession} className="px-4 py-2 bg-black rounded-md font-semibold text-xl flex items-center text-white gap-x-2 cursor-pointer">
                            end spotlight session 
                            <FaLongArrowAltRight />
                        </button>
                    </>
                    :
                    <></>
                }

                {
                    (state === "analyze") ?
                    <div className="p-4 border-2 border-solid rounded-md flex flex-col gap-y-2">
                        <div>Attention Score: {analysisData.attentionScore}</div>
                        <div>Total Phone Usage: {analysisData.phoneUsage}</div>
                        <div>Total Session Time: {analysisData.totalTime}</div>
                    </div>
                    :
                    <></>
                }


            </div>
        
        </div>
    )
}