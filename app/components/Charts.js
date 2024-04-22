import Chart from "react-apexcharts";
import { Lato } from "next/font/google";
import moment from "moment";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export default function LineChart({ series, xaxis, yaxis }) {
    let isAnimation = false;

    if (series[0].data.length > 2) {
        isAnimation = true;
    }

    let options = {
        chart: {
            toolbar: false,
            fontFamily: lato,
            animations: {
                enabled: isAnimation,
                easing: "linear",
                dynamicAnimation: {
                    speed: 100
                }
            }
        },
        grid: {
            padding: {
                left: 30,
                right: 30
            }
        },
        stroke: {
            curve: "monotoneCubic",
            lineCap: "round"
        },
        xaxis: {
            type: "datetime",
            tickPlacement: "on",
            labels: {
                formatter: function (value) {
                    return moment(value).format("HH:mm");
                }
            },
            axisTicks: {
                show: false
            },
            ...xaxis,
            title: {
                offsetY: 10,
                style: {
                    fontSize: "14px"
                },
                ...xaxis.title
            }
        },
        yaxis: {
            tickAmount: 5,
            ...yaxis,
            title: {
                offsetX: -8,
                style: {
                    fontSize: "14px"
                },
                ...yaxis.title
            },
            labels: {
                formatter: (val) => {
                    return parseInt(val);
                }
            }
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            offsetY: 15,
            fontSize: "16px",
            itemMargin: {
                vertical: 10
            }
        }
    };

    return <Chart options={options} series={series} type="line" />;
}
