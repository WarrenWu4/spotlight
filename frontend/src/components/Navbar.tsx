import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="w-full h-32 py-8 p-4 flex items-center justify-between">
            <Link to={"/"} className="flex items-center gap-x-4 logo-text text-3xl text-white">
                <img src="/logo.png" width={78} height={63}/>
                SPOTLIGHT
            </Link>
            <Link to={"/demo"} className="px-5 py-3 border-2 border-solid border-[#EFF190] text-[#EFF190] font-semibold rounded-md hover:bg-[#EFF190] duration-500 hover:text-black">
                View Demo
            </Link>
        </div>
    )
}