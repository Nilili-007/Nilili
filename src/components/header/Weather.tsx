import React, { useState, useEffect } from "react";

const Weather = () => {
  const API_KEY = "22365910a24dc03c09c5ef5a0adb2c5e";
  const [weather, setWeather] = useState<any>(null);

  const getCurrentLocation = () => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeather(lat, lon);
    });
  };

  const getWeather = async (lat: number, lon: number) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="flex items-center justfiy-between badge1">
      {/* <div>{weather?.name}</div> */}
      <div className="mr-1">{(weather?.main.temp - 273.15).toFixed(1)}°</div>
      <div className="m-1">{weather?.weather[0].main}</div>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
          alt=""
          className="w-7"
        />
      </div>
    </div>
  );
};

export default Weather;
