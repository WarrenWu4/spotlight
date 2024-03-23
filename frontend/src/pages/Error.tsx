import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Error() {

    const { msg } = useParams();
    const [errorMsg, setErrorMsg] = useState("Error Occurred");

    useEffect(() => {
        if (msg) {
            const newMsg = msg.split("+")
                .map((word: string) => word[0].toUpperCase() + word.slice(1))
                .join(" ");
            setErrorMsg(newMsg);
        }
    }, [])

    return (
        <div>
            {errorMsg}
        </div>
    )
}