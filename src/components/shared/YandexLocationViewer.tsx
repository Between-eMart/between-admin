import React from 'react';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';

export const YandexLocationViewer = (
  {
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  },
) => {
  //
  const apiKey = 'e3d5fd9a-6604-43e8-bdd0-c78e9553d610';

  const mapState = {
    center: [latitude, longitude],
    zoom: 14,
  };

  return (
    <YMaps query={{ apikey: apiKey }}>
      <Map state={mapState} width="100%" height="400px">
        <Placemark geometry={[latitude, longitude]}/>
      </Map>
    </YMaps>
  );
};
