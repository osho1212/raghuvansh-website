"use client";
import React, { useState, useEffect } from "react";
import { locationData, statesList } from "@/lib/locationData";

interface LocationSelectorProps {
  onChange: (location: string) => void;
  required?: boolean;
}

export default function LocationSelector({ onChange, required = false }: LocationSelectorProps) {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [customLocation, setCustomLocation] = useState<string>("");

  useEffect(() => {
    if (selectedState === "Other / Outside India") {
      onChange(customLocation || "Outside India");
    } else if (selectedState && selectedCity) {
      if (selectedCity === "Custom Location") {
        onChange(customLocation ? `${customLocation}, ${selectedState}` : selectedState);
      } else {
        onChange(`${selectedCity}, ${selectedState}`);
      }
    } else {
      onChange("");
    }
  }, [selectedState, selectedCity, customLocation, onChange]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setCustomLocation("");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setCustomLocation("");
  };

  const cities = selectedState ? locationData[selectedState] || [] : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
            State / Hub *
          </label>
          <select
            value={selectedState}
            onChange={handleStateChange}
            required={required}
            className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
          >
            <option value="">Select State / Region</option>
            {statesList.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {selectedState && selectedState !== "Other / Outside India" && (
          <div>
            <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
              City / Center *
            </label>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              required={required}
              className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
              <option value="Custom Location">Enter Custom City...</option>
            </select>
          </div>
        )}
      </div>

      {((selectedState === "Other / Outside India") || (selectedCity === "Custom Location")) && (
        <div className="animate-fadeIn">
          <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
            Specify Location Details *
          </label>
          <input
            type="text"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            placeholder={
              selectedState === "Other / Outside India"
                ? "e.g. London, UK or Dubai, UAE"
                : "e.g. Noida Sector 62 or Ghaziabad"
            }
            required={required}
            className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
          />
        </div>
      )}
    </div>
  );
}
