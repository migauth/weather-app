"use client";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import WeatherIcon from "@/components/WeatherIcon";
import convertKelvinToCelsius from "@/utils/convertKelvintoCelsius";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import axios from "axios";
import WeatherDetails from "@/components/WeatherDetails";

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

const now = new Date();
const hours = now.getHours().toString().padStart(2, "0");
const minutes = now.getMinutes().toString().padStart(2, "0");

const formattedTime = `${hours}:${minutes}`;
console.log(`The local time is: ${formattedTime}`);

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=sooke&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  );

  const firstData = data?.list[0];

  console.log("data: ", data);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 bg-gray-300 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7x1 mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2x1 items-end">
              <p> {format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p> {format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}</p>
              {/* <p> Local time: {formattedTime} </p> */}
            </h2>
            <Container className="gap-10 px-6 item-center rounded-md">
              {/* temp */}
              <div className="flex flex-col px-4 ">
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
                  </span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
              {/* time and weather icon */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>
                    <div>
                      {/* <WeatherIcon iconname={d.weather[0].icon} /> */}
                      <WeatherIcon
                        iconname={getDayOrNightIcon(
                          d.weather[0].icon,
                          d.dt_txt
                        )}
                      />
                    </div>
                    <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                    <p>{d.weather[0].main}</p>
                  </div>
                ))}
              </div>
            </Container>
            <div className=" flex gap-4">
              {/* left */}
              <Container className="w-fit justify-center flex-col px-4 items-center">
                <p className=" capitalize text-center">{firstData?.weather[0].description}</p>
                <WeatherIcon
                      iconname={getDayOrNightIcon(
                        firstData?.weather[0].icon ?? '',
                        firstData?.dt_txt ?? ""
                      )}
                      />
              </Container>
              <Container className="bg-yellow-300 px-6 gap-4 justify-between overflow-x-auto">
                <WeatherDetails visability={} airPressure={}>

                </WeatherDetails>
              </Container>
              {/* right */}
            </div>
          </div>
        </section>
        {/* 7 day forcast */}
        <section className="flex w-full flex-col gap-4">
          <p className="text 2xl">Forcast (7 days) </p>
        </section>
      </main>
    </div>
  );
}
