"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Nav from "../../components/Nav";
import Details from "./Details";

import Simview from "./Simview";

import SIMULATIONS from "../../data/simulations.json";

export default function Home({ params }) {
    const [isSimulate, setSimulate] = useState(false);
    const [isReset, setReset] = useState(true);
    const [canRun, setCanRun] = useState(false);

    const [simInfo, setSimInfo] = useState({
        id: parseInt(params.id),
        toLoad: false,
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
        dt: 600
    });

    useEffect(() => {
        let id = parseInt(params.id);
        if (id > SIMULATIONS.length) {
            return;
        }

        setSimInfo(SIMULATIONS[id - 1]);
        setCanRun(true);
    }, [params.id]);

    const handleSimulate = (val) => {
        setSimulate(val);
        setReset(false);
    };

    const handleReset = () => {
        setReset(true);
        setSimulate(false);
    };

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

            if (key == "Twater") {
                obj.Tprev = v;
            }

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
                <Details
                    handleSimulate={handleSimulate}
                    handleReset={handleReset}
                    isSimulate={isSimulate}
                    simInfo={simInfo}
                    handleChange={handleChange}
                    canRun={canRun}
                    isDisabled={!isReset}
                ></Details>
                {!isReset && <Simview isSimulate={isSimulate} simParams={simInfo}></Simview>}
                {isReset && <Simview isSimulate={isSimulate} simParams={simInfo}></Simview>}
            </div>
        </main>
    );
}
