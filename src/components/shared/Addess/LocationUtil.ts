const toCoords = (location: string): [number, number] => {
  //
  const coords = location.split(', ');
  return [Number.parseFloat(coords[0]), Number.parseFloat(coords[1])];
};

export default  {
  toCoords,
};
