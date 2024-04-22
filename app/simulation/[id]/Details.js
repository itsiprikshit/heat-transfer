import { Accordion, Label, TextInput, Select, Button, ToggleSwitch } from "flowbite-react";
import moment from "moment";

import "./main.css";

export default function Details({ isSimulate, handleSimulate, handleReset, simInfo, handleChange, isDisabled, canRun }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 flex items-center justify-between">
                <div className="flex-shrink-0">
                    <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">My sim #{simInfo.id}</span>
                    <h3 className="text-base font-light text-gray-500 dark:text-gray-400">{moment().format("MMM Do, YYYY")}</h3>
                </div>
                <div className="flex items-center flex-wrap gap-2">
                    {!isSimulate ? (
                        <Button onClick={() => handleSimulate(true)} gradientMonochrome="success" disabled={!canRun}>
                            Run
                        </Button>
                    ) : (
                        <Button onClick={() => handleSimulate(false)} gradientMonochrome="failure">
                            Pause
                        </Button>
                    )}
                    <Button onClick={handleReset} gradientMonochrome="purple">
                        Reset
                    </Button>
                    <label htmlFor="toLoad" className="inline-flex items-center me-5 cursor-pointer">
                        <input id="toLoad" type="checkbox" value="" className="sr-only peer" checked={!!simInfo.toLoad} onChange={(e) => handleChange("toLoad", e.target.checked)} />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">To Load</span>
                    </label>
                </div>
            </div>
            <Accordion collapseAll className="no-round no-border">
                <Accordion.Panel>
                    <Accordion.Title className="no-round">Simulation parameters</Accordion.Title>
                    <Accordion.Content>
                        <div className="grid gap-4 xl:grid-cols-4">
                            <div>
                                <Label htmlFor="Ac">Collector area</Label>
                                <TextInput
                                    type="number"
                                    id="Ac"
                                    placeholder="Area of Collector"
                                    value={simInfo.Ac}
                                    disabled={isDisabled}
                                    onChange={(e) => handleChange("Ac", e.target.value)}
                                    readOnly={isDisabled}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="FU">
                                    F<span style={{ fontSize: "8px" }}>R</span> * U<span style={{ fontSize: "8px" }}>C</span>
                                </Label>
                                <TextInput
                                    type="number"
                                    id="FU"
                                    placeholder="Coefficient value"
                                    value={simInfo.FU}
                                    disabled={isDisabled}
                                    onChange={(e) => handleChange("FU", e.target.value)}
                                    readOnly={isDisabled}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="FTA">
                                    F<span style={{ fontSize: "8px" }}>R</span> * &tau; * &alpha;
                                </Label>
                                <TextInput
                                    type="number"
                                    id="FTA"
                                    placeholder="Coefficient value"
                                    value={simInfo.FTA}
                                    disabled={isDisabled}
                                    onChange={(e) => handleChange("FTA", e.target.value)}
                                    readOnly={isDisabled}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="Pl">Pipe length</Label>
                                <TextInput
                                    type="number"
                                    id="Pl"
                                    placeholder="Length of pipe inside collector"
                                    value={simInfo.Pl}
                                    disabled={isDisabled}
                                    onChange={(e) => handleChange("Pl", e.target.value)}
                                    readOnly={isDisabled}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="Pr">Pipe radius</Label>
                                <TextInput
                                    type="number"
                                    id="Pr"
                                    placeholder="Radius of pipe"
                                    value={simInfo.Pr}
                                    disabled={isDisabled}
                                    onChange={(e) => handleChange("Pr", e.target.value)}
                                    readOnly={isDisabled}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="Twater">Water Temperature</Label>
                                <TextInput
                                    type="number"
                                    id="Twater"
                                    placeholder="Initial water Temperature"
                                    value={simInfo.Twater}
                                    onChange={(e) => handleChange("Twater", e.target.value)}
                                    disabled={isDisabled}
                                    readOnly={isDisabled}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="m">Mass flow rate</Label>
                                <TextInput
                                    type="number"
                                    id="m"
                                    placeholder="Mass flow rate of water"
                                    value={simInfo.m}
                                    disabled={isDisabled}
                                    onChange={(e) => handleChange("m", e.target.value)}
                                    readOnly={isDisabled}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="Vt">Volume</Label>
                                <TextInput
                                    type="number"
                                    id="Vt"
                                    placeholder="Volume of tank"
                                    value={simInfo.Vt}
                                    disabled={isDisabled}
                                    onChange={(e) => handleChange("Vt", e.target.value)}
                                    readOnly={isDisabled}
                                    required
                                />
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}
