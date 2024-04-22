"use client";

import { useState, useEffect } from "react";

import LineChart from "@/app/components/Charts";

import dataset from "../../data/dataset.json";

import tankTemperatureUsingIrradiance from "../simulation";

let _CHART_DATA_ = dataset.map((data) => {
    data.timestamp = +new Date(data.year, data.month, data.day, data.hour, data.minute);
    return data;
});

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

    if (temperature.yaxis.max < max + 5) {
        temperature.yaxis.max = max + 5;
    }

    if (temperature.yaxis.min > min - 5) {
        temperature.yaxis.min = min - 5;
    }

    temperature.series = series;

    return temperature;
};

export default function Simview({ isSimulate, simParams }) {
    let [chartData, setChartData] = useState([]);
    let [_, setTheInterval] = useState(null);

    useEffect(() => {
        let sim = JSON.parse(JSON.stringify(simParams));

        if (isSimulate) {
            setTheInterval(() => {
                return setInterval(() => {
                    setChartData((data) => {
                        let index = data.length;

                        if (index >= _CHART_DATA_.length) {
                            /**
                             * It is very important to clear the interval here otherwise it will keep on going
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
                            tankTemperature: sim.Tprev
                        };

                        if (!index) {
                            /**
                             * Initialising the base state
                             */
                            return [val];
                        }

                        // Properties that change over time
                        sim.Irr = val.ghi;
                        sim.Tair = val.temperature;
                        sim.Tprev = data[index - 1].tankTemperature;

                        /**
                         * The library will simulate how the temperature changed in the last 10 minutes
                         * and will return the current temperature
                         *
                         * We assume that the data[index].ghi and data[index].temperature are the average
                         * solar irradiance and air temperature in the last 10 minutes
                         */
                        let tankTemperature = tankTemperatureUsingIrradiance(sim);

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

    let solar = formatSolarChart(chartData);
    let temperature = formatTemperatureChart(chartData);

    return (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm xl:col-span-1 sm:p-6">
                <span className="text-xl">Solar Irradiance</span>
                <LineChart {...solar}></LineChart>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm xl:col-span-1 sm:p-6">
                <span className="text-xl">Temperature</span>
                <LineChart {...temperature}></LineChart>
            </div>
        </div>
    );
}
