const getCoordinatesFromResolvedUrl = (url: string) => {
  const coordinates = url.match(/@([0-9.-]+),([0-9.-]+)/);

  if (!coordinates) return undefined;
  if (coordinates.length < 3) return undefined;
  if (
    Number.isNaN(Number(coordinates[1])) ||
    Number.isNaN(Number(coordinates[2]))
  )
    return undefined;

  return {
    lat: Number(coordinates[1]),
    lng: Number(coordinates[2]),
  };
};

export { getCoordinatesFromResolvedUrl };
