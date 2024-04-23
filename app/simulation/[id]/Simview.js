"use client";

import { useState, useEffect } from "react";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

import DATASET from "../../data/dataset.json";

import { heatTransfer } from "../simulation";

import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/app/components/Charts"), { ssr: false });

/**
 * dataset.json contains data for Solar Irradiance and
 * Air Temperature on 06/01/2024
 * The data is described in the README.md
 */

let _CHART_DATA_ = DATASET.map((data) => {
    data.timestamp = +new Date(data.year, data.month, data.day, data.hour, data.minute);
    return data;
});

/**
 * Format solar chart data
 *
 * @param {Array} data - Chart data
 * @returns {Object} - Solar line chart settings
 */
const formatSolarChart = (data) => {
    let index = data.length;
    let xaxis = _CHART_DATA_.map((d) => d.timestamp);

    let solarIrradiance = [];

    let series = [
        {
            name: "Solar Irradiance",
            data: solarIrradiance,
            color: "#eab308"
        }
    ];

    let solar = {
        xaxis: {
            categories: xaxis,
            title: {
                text: "Time (HH:mm)"
            }
        },
        series: series,
        yaxis: {
            min: 0,
            max: 1000,
            title: {
                text: "Solar Irradiance (W/m^2)"
            }
        }
    };

    if (!index) {
        return solar;
    }

    for (let i = 0; i < index; i++) {
        solarIrradiance.push(data[i]?.ghi);
    }

    let max = Math.max(...solarIrradiance);

    if (solar.yaxis.max < max + 100) {
        solar.yaxis.max = max + 100;
    }

    series.data = solarIrradiance;
    solar.series = series;

    return solar;
};

/**
 * Format temperature chart data
 *
 * @param {Array} data - Chart data
 * @returns {Object} - Temperature line chart settings
 */
const formatTemperatureChart = (data) => {
    let index = data.length;
    let xaxis = _CHART_DATA_.map((d) => d.timestamp);
    let airTemperature = [];
    let tankTemperature = [];

    let series = [
        {
            name: "Air Temperature",
            data: airTemperature,
            color: "#06b6d4"
        },
        {
            name: "Tank Temperature",
            data: tankTemperature,
            color: "#ef4444"
        }
    ];

    let temperature = {
        xaxis: {
            categories: xaxis,
            title: {
                text: "Time (HH:mm)"
            }
        },
        series: series,
        yaxis: {
            min: 0,
            max: 30,
            title: {
                text: "Temperature (Celcius)"
            }
        }
    };

    if (!index) {
        return temperature;
    }

    for (let i = 0; i < index; i++) {
        airTemperature.push(data[i].temperature);
        tankTemperature.push(parseFloat(data[i].tankTemperature.toFixed(1)));
    }

    series[0].data = airTemperature;
    series[1].data = tankTemperature;

    let max = Math.max(...airTemperature, ...tankTemperature);
    let min = Math.min(...airTemperature, ...tankTemperature);

    if (temperature.yaxis.max < max + 5 || temperature.yaxis.max > max + 5) {
        temperature.yaxis.max = max + 5;
    }

    if (temperature.yaxis.min > min - 5) {
        temperature.yaxis.min = min - 5;
    }

    temperature.series = series;

    return temperature;
};

/**
 * Simulation view component
 * This component runs the simulation for the provided simulation parameters
 * using the dataset values from 06/01/2024
 *
 * @param {Object} props
 * @param {Boolean} props.isSimulate - Simulation status
 * @param {Object} props.simParams - Simulation parameters
 * @returns {ReactNode} - A react element that renders the simulation view
 */
export default function Simview({ isSimulate, simParams }) {
    /**
     * Set the chart data and interval
     * Chart data structure -
     * [
     *      {
     *          ghi: 1000,
     *          temperature: 20,
     *          tankTemperature: 0
     *      }
     * ]
     *
     * ghi is the solar irradiance
     */
    let [chartData, setChartData] = useState([]);
    let [_, setTheInterval] = useState(null);

    /**
     * This effect is called when isSimulate or simParams changes
     *
     * When isSimulate is true, we setInterval that runs every 100ms
     * and calculates the tank temperature real time and updates chartData
     *
     * The interval is cleared when isSimulate is set to false by the
     * previous component unmount or when the simulation is complete
     */
    useEffect(() => {
        let sim = JSON.parse(JSON.stringify(simParams));

        if (isSimulate) {
            setTheInterval(() => {
                return setInterval(() => {
                    setChartData((data) => {
                        let index = data.length;

                        if (index >= _CHART_DATA_.length) {
                            /**
                             * It is very important to clear the interval here when entire data has been plotted,
                             * otherwise the interval will keep on running
                             */
                            setTheInterval((interval) => {
                                clearInterval(interval);
                                return null;
                            });

                            return data;
                        }

                        let val = {
                            ghi: _CHART_DATA_[index].ghi,
                            temperature: _CHART_DATA_[index].temperature,
                            tankTemperature: sim.Tmains
                        };

                        if (!index) {
                            /**
                             * Initialising the base state
                             * In the base state, tankTemperature equals Tmains
                             */
                            return [val];
                        }

                        /**
                         * Setting dynamic parameters for the simulation
                         *
                         * The library will simulate how the temperature changed in the last sim.ts seconds
                         * and will return the current temperature at _CHART_DATA_[index].timestamp value
                         *
                         * We assume that the data[index].ghi and data[index].temperature are the average
                         * solar irradiance and air temperature in the last sim.ts seconds
                         *
                         * Tprev is the temperature sim.ts seconds ago
                         */

                        sim.Irr = val.ghi;
                        sim.Tair = val.temperature;
                        sim.Tprev = data[index - 1].tankTemperature;

                        let tankTemperature = heatTransfer(sim);

                        /**
                         * Update the tankTemperature
                         */
                        val.tankTemperature = tankTemperature;

                        return [...data, val];
                    });
                }, 100);
            });
        }

        /**
         * We don't have to explicitly clear the interval when isSimulate = false
         * The reason being that when isSimulate changes, first it triggers an unmount of the
         * exiting component which inturn clears the interval for us as can be seen below
         */

        return () => {
            setTheInterval((interval) => {
                if (interval) {
                    clearInterval(interval);
                }
                return null;
            });
        };
    }, [isSimulate, simParams]);

    /**
     * Format data for Solar irradiance and temperature chart
     */
    let solar = formatSolarChart(chartData);
    let temperature = formatTemperatureChart(chartData);

    return (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm xl:col-span-1 sm:p-6" style={{ minHeight: "500px" }}>
                <span className="text-xl">Solar Irradiance</span>
                <LineChart {...solar}></LineChart>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm xl:col-span-1 sm:p-6" style={{ minHeight: "500px" }}>
                <span className="text-xl">Temperature</span>
                <LineChart {...temperature}></LineChart>
            </div>
            {chartData.length == _CHART_DATA_.length && (
                <Toast className="fixed right-5 bottom-5">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Simulation completed!</div>
                    <Toast.Toggle />
                </Toast>
            )}
        </div>
    );
}
