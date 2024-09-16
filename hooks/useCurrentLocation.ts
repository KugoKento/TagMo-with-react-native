import { useEffect, useState } from "react";
import * as Location from "expo-location";

type LocationType = {
  latitude: number | null;
  longitude: number | null;
};

// 現在地を取得するカスタムフック
function useCurrentLocation(refreshing: boolean) {
  console.log();
  console.log("現在地取得中");
  console.log();

  const [currentLocation, setCurrentLocation] = useState<LocationType>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      let location = await Location.getLastKnownPositionAsync({});
      setCurrentLocation({
        latitude: location?.coords.latitude ?? null,
        longitude: location?.coords.longitude ?? null,
      });
    })();
  }, [refreshing]);

  return { currentLocation, error };
}

export default useCurrentLocation;
