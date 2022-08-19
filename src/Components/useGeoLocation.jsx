import { useState, useEffect } from "react";

export const  useGeoLocation = () => {

  const [location, setLocation] = useState({
    coordinates: { lat: "", lon: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      coordinates: {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      },
    });
  };


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return location;
};
