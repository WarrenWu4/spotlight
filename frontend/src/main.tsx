import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
    <BrowserRouter>
        <Routes>
            <Route />
        </Routes>
    </BrowserRouter>
);