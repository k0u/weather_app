import React from "react";
import Weather from "./Weather";
import CityModal from "./CityModal";
import { useState } from "react";

export default function WeatherPanel() {
  const [cities, setCities] = useState([
    "Tokyo"
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCity = (city) => {
    const _cities = [...cities];
    if(!_cities.includes(city)) {
        setCities([...cities, city]);
    } else {
        alert("追加済み");
    }
    setIsModalOpen(false);
  };

  const removeCity = (city) => {
    const updatedCities = cities.filter((c) => c !== city);
    setCities(updatedCities);
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-wrap">
      {cities.map((city) => (
        <Weather key={city} city_name={city} onRemove={removeCity} />
      ))}
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="fixed z-50 bottom-10 right-10  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 ml-4"
      >
        + Add City
      </button>

      <CityModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onCitySelect={addCity}
      />
    </div>
  );
}
