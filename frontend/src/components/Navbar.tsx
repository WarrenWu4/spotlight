import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="w-full p-4 flex items-center justify-between">
            <Link to={"/"} className="flex items-center gap-x-2 font-bold text-xl">
                <img src="/logo.png" width={32} height={32}/>
                Spotlight
            </Link>
            <div className="flex items-center gap-x-4">
                <Link to={"/login"}>
                    Log in
                </Link>
                <Link to={"/demo"} className="px-3 py-2 text-white bg-black font-semibold rounded-md">
                    View Demo
                </Link>
            </div>
        </div>
    )
}