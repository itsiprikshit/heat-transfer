import { Accordion, Label, TextInput, Button } from "flowbite-react";
import moment from "moment";

import "./main.css";

/**
 * Simulation settings component
 *
 * @param {Object} props
 * @param {Object} props.simInfo - Simulation parameters
 * @param {Boolean} props.isSimulate - Changes buttons based on simulation status
 * @param {Boolean} props.canEdit - Enables/Disables editing of settings
 * @param {Boolean} props.canRun - Enables/Disables the run button
 * @param {Function} props.handleChange - Handles changes made to simulation parameters
 * @param {Function} props.handleReset - Resets the simulation (mainly charts)
 * @param {Function} props.handleSimulate - Handles Run/Pause of the simulation
 * @returns {ReactNode} - A react element that renders the simulation details page
 */
export default function Settings({ isSimulate, handleSimulate, handleReset, simInfo, handleChange, canEdit, canRun }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 flex items-center justify-between">
                <div className="flex-shrink-0">
                    <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">My sim #{simInfo.id}</span>
                    <h3 className="text-base font-light text-gray-500 dark:text-gray-400">{moment.utc().format("MMM Do, YYYY")}</h3>
                    <span className="text-sm font-light text-gray-400">• dataset from 06/01/2022</span>
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
                    <Button onClick={handleReset} gradientMonochrome="purple" disabled={canEdit}>
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
                                <Label htmlFor="Ac">
                                    Collector area <span className="ml-2 text-gray-400 text-sm text-xs">m^2</span>
                                </Label>
                                <TextInput
                                    type="number"
                                    id="Ac"
                                    placeholder="Area of Collector"
                                    value={simInfo.Ac}
                                    disabled={!canEdit}
                                    onChange={(e) => handleChange("Ac", e.target.value)}
                                    readOnly={!canEdit}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="FU">
                                    F<span style={{ fontSize: "8px" }}>R</span> * U<span style={{ fontSize: "8px" }}>L</span>
                                    <span className="ml-2 text-gray-400 text-sm text-xs">W/m^2 C</span>
                                </Label>
                                <TextInput
                                    type="number"
                                    id="FU"
                                    placeholder="Coefficient value"
                                    value={simInfo.FU}
                                    disabled={!canEdit}
                                    onChange={(e) => handleChange("FU", e.target.value)}
                                    readOnly={!canEdit}
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
                                    disabled={!canEdit}
                                    onChange={(e) => handleChange("FTA", e.target.value)}
                                    readOnly={!canEdit}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="Pl">
                                    Pipe length <span className="ml-2 text-gray-400 text-sm text-xs">m</span>
                                </Label>
                                <TextInput
                                    type="number"
                                    id="Pl"
                                    placeholder="Length of pipe inside collector"
                                    value={simInfo.Pl}
                                    disabled={!canEdit}
                                    onChange={(e) => handleChange("Pl", e.target.value)}
                                    readOnly={!canEdit}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="Pr">
                                    Pipe radius <span className="ml-2 text-gray-400 text-sm text-xs">m</span>
                                </Label>
                                <TextInput
                                    type="number"
                                    id="Pr"
                                    placeholder="Radius of pipe"
                                    value={simInfo.Pr}
                                    disabled={!canEdit}
                                    onChange={(e) => handleChange("Pr", e.target.value)}
                                    readOnly={!canEdit}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="Tmains">
                                    Water Temperature <span className="ml-2 text-gray-400 text-sm text-xs">Celcius</span>
                                </Label>
                                <TextInput
                                    type="number"
                                    id="Tmains"
                                    placeholder="Initial water Temperature"
                                    value={simInfo.Tmains}
                                    onChange={(e) => handleChange("Tmains", e.target.value)}
                                    disabled={!canEdit}
                                    readOnly={!canEdit}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="m">
                                    Mass flow rate <span className="ml-2 text-gray-400 text-sm text-xs">kg/s m^2</span>
                                </Label>
                                <TextInput
                                    type="number"
                                    id="m"
                                    placeholder="Mass flow rate of water"
                                    value={simInfo.m}
                                    disabled={!canEdit}
                                    onChange={(e) => handleChange("m", e.target.value)}
                                    readOnly={!canEdit}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="Vt">
                                    Volume <span className="ml-2 text-gray-400 text-sm text-xs">m^3</span>
                                </Label>
                                <TextInput
                                    type="number"
                                    id="Vt"
                                    placeholder="Volume of tank"
                                    value={simInfo.Vt}
                                    disabled={!canEdit}
                                    onChange={(e) => handleChange("Vt", e.target.value)}
                                    readOnly={!canEdit}
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
