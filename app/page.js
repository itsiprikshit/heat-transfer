"use client";
import { useState } from "react";

import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";

import SIMULATIONS from "./data/simulations.json";

export default function Home() {
    const [sims, setSims] = useState(SIMULATIONS);
    const handleClick = () => {
        setSims((s) => {
            return [
                ...s,
                {
                    id: s.length + 1,
                    type: "closed",
                    Ac: "",
                    FU: "",
                    FTA: "",
                    Pl: "",
                    Pr: "",
                    Twater: "",
                    m: "",
                    Vt: "",
                    Tprev: "",
                    Cw: 4182,
                    rho: 995,
                    dt: 10
                }
            ];
        });
    };

    return (
        <main className="flex flex-col min-h-screen dark:bg-gray-800">
            <Nav home={true} handleClick={handleClick} />
            <Dashboard sims={sims} />
        </main>
    );
}
