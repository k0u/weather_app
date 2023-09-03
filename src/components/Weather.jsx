import dayjs from "dayjs";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

function Weather({ city_name, onRemove }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRemove = () => {
    onRemove(city_name);
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_OW_API_URL}/weather/?q=${city_name}&APPID=${process.env.REACT_APP_OW_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return;
    <div>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>;
  }

  return (
    <div className="flex flex-wrap w-full lg:w-auto lg:max-w-screen-lg p-4 relative">
      <div className="w-full lg:w-1/2 flex rounded-lg bg-auto">
        <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white">
          <div className="mb-20">
            <h2 className="font-bold text-3xl leading-none pb-1">
              <pre>{data.name}</pre>
            </h2>
            <h3 className="leading-none pb-2 pl-1">
              {dayjs(data.ts).format("DD MMM YY")}
            </h3>
            <p className="flex aling-center opacity-75">
              {dayjs(data.ts).format("dddd")}
            </p>
          </div>
          <div>
            <div>
              <img
                className="w-16 mb-2"
                src={`${process.env.REACT_APP_OW_ICON_URL}/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
            </div>
            <strong className="leading-none text-6xl block font-weight-bolder">
              {data.main.temp}ºC
            </strong>
            <b className="text-2xl block font-bold">{data.weather[0].main}</b>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex ml-0">
        <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full">
          <div className="flex justify-between w-64 mb-8 w-full">
            <div className="w-auto font-bold uppercase text-90">湿度</div>
            <div className="w-auto text-right">{data.main.humidity}%</div>
          </div>
          <div className="flex justify-between w-64 mb-8 w-full">
            <div className="w-auto font-bold uppercase text-90">風速</div>
            <div className="w-auto text-right">{data.wind.speed}m/s</div>
          </div>
          <div className="flex justify-between w-64 mb-12 w-full">
            <div className="w-auto font-bold uppercase text-90">降水量</div>
            <div className="w-auto text-right">
              {data.rain === undefined || isNaN(parseFloat(data.rain["1h"]))
                ? 0
                : parseFloat(data.rain["1h"])}
              mm
            </div>
          </div>

          <div className="flex flex-row">
            <div className="flex flex-col w-1/2 bg-gray-100 text-black rounded-lg pb-4">
              <div className="text-center pt-2 mb-2">
                <div className="text-center">
                  <b className="font-normal">最低気温</b>
                  <br />
                  <strong className="text-xl">{data.main.temp_min}ºC</strong>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 bg-gray-100 text-black rounded-lg pb-4">
              <div className="text-center pt-2 mb-2">
                <div className="text-center">
                  <b className="font-normal">最高気温</b>
                  <br />
                  <strong className="text-xl"> {data.main.temp_max}ºC</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-1 px-1 rounded-full absolute top-2 right-2"
      >
        <XCircleIcon className="h-8 w-8"/>
      </button>
    </div>
  );
}

export default Weather;
