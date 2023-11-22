import {
    faArrowRight,
    faCow,
    faMapPin,
    faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startTransition, useEffect, useState } from "react";
import Map from "../components/map";
import { useNavigate } from "react-router-dom";
import {
    useGetFarmsQuery,
    useGetTurbinesQuery,
} from "../store/features/core-api";
import Loader from "../components/loader";
import Error from "./error";
import Button from "../components/button";
import Card from "../components/card";
import Table from "../components/table";
import TableHeader from "../components/table-header";
import TableBody from "../components/table-body";

export default function Dashboard() {
    const {
        data: farms,
        isError: isFarmsError,
        isLoading: isFarmsLoading,
    } = useGetFarmsQuery();

    const {
        data: turbines,
        isError: isTurbinesError,
        isLoading: isTurbinesLoading,
    } = useGetTurbinesQuery();

    const [activeFarm, setActiveFarm] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (farms === undefined || farms.length === 0) return;
        setActiveFarm(farms[0]);
    }, [farms]);

    const updateActiveFarm = (farm) => {
        setActiveFarm(farm);
    };

    const handleNavigationClick = () => {
        startTransition(() => {
            navigate(`/inspection?farmId=${activeFarm.id}`);
        });
    };

    if (isFarmsLoading || isTurbinesLoading) {
        return <Loader />;
    }

    if (isFarmsError || isTurbinesError) {
        return <Error />;
    }

    return (
        <div className="flex flex-col flex-grow">
            <div className="flex flex-col gap-2 pb-2">
                <h2 className="flex gap-2 items-center pb-2 text-xl tracking-widest ">
                    <FontAwesomeIcon icon={faCow} />
                    <span>Farms</span>
                </h2>
                <div id="card-group" className="grid grid-cols-5 gap-4">
                    {farms.map((farm, index) => (
                        <Card
                            key={index}
                            onClick={() => updateActiveFarm(farm)}
                            className={
                                (activeFarm?.id === farm.id
                                    ? " bg-primary text-secondary "
                                    : "") +
                                "flex flex-col justify-center items-center px-4 py-8 hover:bg-primary hover:text-secondary cursor-pointer "
                            }
                        >
                            <p>{farm.name}</p>
                            <p>
                                {
                                    turbines.filter(
                                        (turbine) => turbine.farm_id === farm.id
                                    ).length
                                }{" "}
                                turbines
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="flex flex-row gap-4 flex-grow">
                <div className="w-2/5 flex flex-col">
                    <h2 className="flex gap-2 items-center pb-2 text-xl tracking-widest">
                        <FontAwesomeIcon icon={faWind} />
                        <span>Turbines</span>
                    </h2>
                    <Card className="flex-grow p-4">
                        <Table className="mb-8">
                            <TableHeader
                                headers={[
                                    "Farm name",
                                    "Turbine name",
                                    "Latitude",
                                    "Longitude",
                                ]}
                            />
                            <TableBody
                                rows={turbines
                                    .filter(
                                        (turbine) =>
                                            turbine.farm_id === activeFarm?.id
                                    )
                                    .map((turbine) => [
                                        activeFarm.name,
                                        turbine.name,
                                        turbine.lat,
                                        turbine.lng,
                                    ])}
                            />
                        </Table>
                        <Button
                            className="float-right"
                            onClick={handleNavigationClick}
                        >
                            <span className="pr-2">Inspect</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </Card>
                </div>

                <div className="w-3/5 flex flex-col">
                    <h2 className="flex gap-2 items-center pb-2 text-xl tracking-widest">
                        <FontAwesomeIcon icon={faMapPin} />
                        <span>Map</span>
                    </h2>
                    <Card>
                        <Map
                            turbines={turbines.filter(
                                (turbine) => turbine.farm_id === activeFarm?.id
                            )}
                        ></Map>
                    </Card>
                </div>
            </div>
        </div>
    );
}
