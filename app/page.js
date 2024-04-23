"use client";
import { useState } from "react";

import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";

/**
 * simulations.json contains an array of pre-created simulation parameters
 */
import SIMULATIONS from "./data/simulations.json";

/**
 * Home page component
 *
 * @returns {ReactNode} - A react element that renders the home page
 */
export default function Home() {
    /**
     * Set all simulations in state
     * Only setting the simulation id
     */
    const [sims, setSims] = useState(
        SIMULATIONS.map((s) => {
            return {
                id: s.id
            };
        })
    );

    /**
     * Function to handle + Create Simulation click by creating a
     * dummy simulation object and adding it to the existing simulations
     */
    const handleClick = () => {
        setSims((s) => {
            return [
                ...s,
                {
                    id: s.length + 1
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
