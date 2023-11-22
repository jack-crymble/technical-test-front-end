import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "../../css/map.css";
import Loader from "./loader";

export default function Map({ turbines }) {
    /**
     * Valid API Key would be added to env var
     * and referenced in useLoadScript hook below
     */
    const { isLoaded } = useLoadScript({});
    const center = useMemo(() => ({ lat: 0, lng: 0 }), []);

    const customMarker = {
        path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
        fillColor: "#ffc72c",
        fillOpacity: 1,
    };

    const onMarkerClick = (turbine) => {
        console.log("You clicked", turbine);
    };

    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <GoogleMap
            mapContainerClassName="map__container"
            center={center}
            zoom={1}
        >
            {turbines.map((turbine, index) => (
                <Marker
                    key={index}
                    position={{
                        lat: parseInt(turbine.lat),
                        lng: parseInt(turbine.lng),
                    }}
                    icon={customMarker}
                    onClick={() => onMarkerClick(turbine)}
                />
            ))}
        </GoogleMap>
    );
}
