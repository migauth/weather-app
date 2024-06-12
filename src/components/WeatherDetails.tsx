import React from 'react'

type Props = {}

export default function WeatherDetails({}: Props) {
  return (
    <div>WeatherDetails</div>
  )
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail(props: Sin) {

}