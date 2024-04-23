"use client";

import { useEffect, useState } from "react";

import Nav from "../../components/Nav";
import Settings from "./Settings";

import Simview from "./Simview";

/**
 * simulations.json contains an array of pre-created simulation parameters
 */
import SIMULATIONS from "../../data/simulations.json";

/**
 * Simulation details page components
 *
 * @param {Object} props
 * @param {Object} props.params - Route parameters
 * @returns {ReactNode} - A react element that renders the simulation details page
 */
export default function Home({ params }) {
    /**
     * isSimulate is used to Run and Pause the simulation
     * isReset is used to reset the simulation
     * canRun is used to enable or disable the Run button
     */
    const [isSimulate, setSimulate] = useState(false);
    const [isReset, setReset] = useState(true);
    const [canRun, setCanRun] = useState(false);

    /**
     * Setting the default values for simulation parameters
     */
    const [simInfo, setSimInfo] = useState({
        id: parseInt(params.id),
        toLoad: false,
        Ac: "",
        FU: "",
        FTA: "",
        Pl: "",
        Pr: "",
        Tmains: "",
        m: "",
        Vt: "",
        Cw: 4182,
        rho: 995,
        ts: 600
    });

    /**
     * This effect is called when the simulation id changes in the url
     * When it does, we need to check if its a pre-created simulation or not
     * If yes, we set it in the state
     * Otherwise, we don't do anything because we already set the
     * default simulation parameters
     */
    useEffect(() => {
        let id = parseInt(params.id);
        if (id > SIMULATIONS.length) {
            return;
        }

        setSimInfo(SIMULATIONS[id - 1]);
        setCanRun(true);
    }, [params.id]);

    /**
     * Set the simulation status and set reset to false
     *
     * @param {Boolean} val - Run simulation flag (true or false)
     */
    const handleSimulate = (val) => {
        setSimulate(val);
        setReset(false);
    };

    /**
     * Set reset to true and stop the simulation
     */
    const handleReset = () => {
        setReset(true);
        setSimulate(false);
    };

    /**
     * Handle change when someone edits the simulation parameter
     * Along with that also validate the parameter values
     * If everything is fine, set the simulation parameters in state
     * and set canRun to true otherwise false
     *
     * @param {String} key - Simulation parameter
     * @param {Number | Boolean} value - Simulation parameter value
     */
    const handleChange = (key, value) => {
        setSimInfo((s) => {
            let v = value;
            if (key != "toLoad" && v.length) {
                v = parseFloat(v);
            }

            let obj = {
                ...s,
                [key]: v
            };

            let brk = false;

            for (let k in obj) {
                if (k != "toLoad") {
                    if (obj[k] === "") {
                        setCanRun(false);
                        brk = true;
                        break;
                    }
                }
            }

            if (!brk) {
                setCanRun(true);
            }

            return obj;
        });
    };

    return (
        <main className="flex flex-col min-h-screen dark:bg-gray-800">
            <Nav home={false} />
            <div className="p-4 pt-6 flex flex-col">
                <Settings handleSimulate={handleSimulate} handleReset={handleReset} isSimulate={isSimulate} simInfo={simInfo} handleChange={handleChange} canRun={canRun} canEdit={isReset}></Settings>

                {/* This is a nifty trick to reset the components internal state */}
                {!isReset && <Simview isSimulate={isSimulate} simParams={simInfo}></Simview>}
                {isReset && <Simview isSimulate={isSimulate} simParams={simInfo}></Simview>}
            </div>
        </main>
    );
}
