import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Error() {

    const { msg } = useParams();
    const [errorMsg, setErrorMsg] = useState("Unexpected error occurred");

    useEffect(() => {
        if (msg) {
            const newMsg = msg.split("+")
                .map((word: string) => word[0].toUpperCase() + word.slice(1))
                .join(" ");
            setErrorMsg(newMsg);
        }
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center max-w-screen-xl gap-y-12">
            
            <Navbar/>

            <div className="w-full h-full flex items-center justify-center font-bold text-3xl">
                Error:
                <br/>
                {errorMsg}
            </div>
        </div>
    )
}