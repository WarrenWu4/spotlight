import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Studio from "./pages/Studio";
import Error from "./pages/Error";

const root = createRoot(document.getElementById("root")!);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/studio/:lecture/:focus" element={<Studio/>}/>
            <Route path="/error/:msg" element={<Error/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>
);