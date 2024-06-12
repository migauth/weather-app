import React from "react";
import { FiDroplet } from "react-icons/fi";
import { LuEye } from "react-icons/lu";

type Props = {};

export interface WeatherDetailProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
  const {
    visability = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48"
  } = props;

  return (
    <>
      <SingleWeatherDetail 
        icon={<LuEye />} 
        information="Visability" 
        value={props.visability} />
      <SingleWeatherDetail 
        icon={<FiDroplet />} 
        information="Humidity" 
        value={props.humidity} />
      <SingleWeatherDetail 
        icon={<FiDroplet />} 
        information="Wind speed" 
        value={props.windSpeed} />
      <SingleWeatherDetail 
        icon={<FiDroplet />} 
        information="Air pressure" 
        value={props.airPressure} />
      <SingleWeatherDetail 
        icon={<FiDroplet />} 
        information="Sunrise" 
        value={props.sunrise} />
      <SingleWeatherDetail 
        icon={<FiDroplet />} 
        information="Sunset" 
        value={props.sunset} />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
