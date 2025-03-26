import React, { useState } from 'react';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { Typography } from '@mui/material';

export interface Address {
  mapUrl: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  postIndex: string;
  city: string;
  location: string;
}

export const YandexLocationPicker = (
  {
    onSet,
  }: {
    onSet: (address: Address) => void;
  }) => {
  //
  const apiKey = 'e3d5fd9a-6604-43e8-bdd0-c78e9553d610';
  const [coords, setCoords] = useState<[number, number] | null>([41.2995, 69.2401]);
  const [locationDetails, setLocationDetails] = useState<Address>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    location: '',
    mapUrl: '',
    postIndex: '',
  });

  // Fetch address from coordinates
  const fetchAddress = async (coords: [number, number]) => {
    try {
      const res = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${coords[1]},${coords[0]}&format=json`,
      );
      const data = await res.json();
      const components = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;

      const details: Address = {
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        location: coords.join(', '),
        mapUrl: `https://yandex.com/maps/?ll=${coords[1]}%2C${coords[0]}&z=16`,
        postIndex: '',
      };

      // Map components to details
      components.forEach((component: any) => {
        switch (component.kind) {
          case 'house':
            details.addressLine1 = component.name;
            break;
          case 'street':
            details.addressLine2 = component.name;
            break;
          case 'locality':
            details.city = component.name;
            break;
          case 'country':
            details.country = component.name;
            break;
          case 'postal_code':
            details.postIndex = component.name;
            break;
        }
      });

      setLocationDetails(details);
      onSet(details);
    } catch (error) {
      console.error('Failed to fetch address:', error);
    }
  };

  // Handle map click
  const handleMapClick = (e: any) => {
    const newCoords = e.get('coords');
    setCoords(newCoords);
    fetchAddress(newCoords);
  };

  if (!coords) return <p>Loading map...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          <strong>Country:</strong> {locationDetails.country}
        </Typography>
        <Typography>
          <strong>City:</strong> {locationDetails.city}
        </Typography>
        <Typography>
          <strong>Address:</strong> {locationDetails.addressLine1} {locationDetails.addressLine2}
        </Typography>
        <Typography>
          <strong>Post Code:</strong> {locationDetails.postIndex || 'NA'}
        </Typography>
      </div>
      <YMaps>
        <div style={{ width: '100%', height: '400px' }}>
          <Map
            state={{ center: coords, zoom: 12 }}
            width="100%"
            height="100%"
            onClick={handleMapClick}
          >
            <Placemark geometry={coords}/>
          </Map>
        </div>
      </YMaps>
    </div>
  );
};
