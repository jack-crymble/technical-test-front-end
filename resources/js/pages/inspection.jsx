import { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    useGetComponentTypesQuery,
    useGetComponentsQuery,
    useGetFarmTurbinesQuery,
    useGetGradeTypesQuery,
    useGetGradesQuery,
    useGetInspectionsQuery,
} from "../store/features/core-api";
import Loader from "../components/loader";
import { useSearchParams } from "react-router-dom";
import Error from "./error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCow } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/card";

export default function InspectionPage() {
    const [searchParams] = useSearchParams();

    const farmId = searchParams.get("farmId") ?? 1;

    const {
        data: turbines,
        isError: isFarmTurbinesError,
        isLoading: isFarmTurbinesLoading,
    } = useGetFarmTurbinesQuery(farmId);

    const {
        data: gradeTypes,
        isError: isGradeTypesError,
        isLoading: isGradeTypesLoading,
    } = useGetGradeTypesQuery();

    const {
        data: componentTypes,
        isError: isComponentTypesError,
        isLoading: isComponentTypesLoading,
    } = useGetComponentTypesQuery();

    const {
        data: inspections,
        isError: isInspectionsError,
        isLoading: isInspectionsLoading,
    } = useGetInspectionsQuery();

    const {
        data: grades,
        isError: isGradesError,
        isLoading: isGradesLoading,
    } = useGetGradesQuery();

    const {
        data: components,
        isError: isComponentsError,
        isLoading: isComponentsLoading,
    } = useGetComponentsQuery();

    const [turbineData, setTurbineData] = useState([]);
    const [filteredTurbineData, setFilteredTurbineData] = useState([]);

    useEffect(() => {
        if (isGradesLoading) return;
        if (isGradeTypesLoading) return;
        if (isComponentsLoading) return;
        if (isComponentTypesLoading) return;
        if (isInspectionsLoading) return;
        if (isFarmTurbinesLoading) return;
        if (isGradesError) return;
        if (isGradeTypesError) return;
        if (isComponentsError) return;
        if (isComponentTypesError) return;
        if (isInspectionsError) return;
        if (isFarmTurbinesError) return;

        let updatedGrades = grades.map((grade) => ({
            grade_id: grade.id,
            inspection_id: grade.inspection_id,
            component_id: grade.component_id,
            grade: gradeTypes.find(
                (gradeType) => gradeType.id === grade.grade_type_id
            ).name,
        }));

        let updatedComponents = components.map((component) => ({
            turbine_id: component.turbine_id,
            name: componentTypes.find(
                (componentType) =>
                    componentType.id === component.component_type_id
            ).name,
            grades: updatedGrades.filter(
                ({ component_id }) => component.id === component_id
            ),
        }));

        let updatedTurbines = turbines.map((turbine) => ({
            id: turbine.id,
            name: turbine.name,
            components: updatedComponents.filter(
                ({ turbine_id }) => turbine.id === turbine_id
            ),
        }));

        const turbineData = [];

        updatedTurbines.forEach((updatedTurbine) => {
            updatedTurbine.components.forEach((component) => {
                component.grades.forEach((grade) => {
                    turbineData.push({
                        id: updatedTurbine.id,
                        name: updatedTurbine.name,
                        componentName: component.name,
                        inspected_at: inspections.find(
                            (inspection) =>
                                inspection.id === grade.inspection_id
                        ).inspected_at,
                        grade: grade.grade,
                    });
                });
            });
        });
        setTurbineData(turbineData);
        setFilteredTurbineData(turbineData);
    }, [inspections, gradeTypes, componentTypes, turbines, grades, components]);

    const calculateComponentGradeAverage = (componentName) => {
        const filteredRows = filteredTurbineData.filter(
            (row) => row.componentName === componentName
        );
        if (filteredRows.length === 0) return 0;

        return (
            filteredRows
                .map((row) => row.grade)
                .reduce(
                    (previous, current) =>
                        parseInt(previous) + parseInt(current),
                    0
                ) / filteredRows.length
        );
    };

    const onDropdownChange = (turbineID) => {
        if (turbineID === "all") {
            setFilteredTurbineData(turbineData);
            return;
        }

        const filteredTurbines = turbineData.filter(
            (row) => row.id === +turbineID
        );
        setFilteredTurbineData(filteredTurbines);
    };

    const gltf = useLoader(GLTFLoader, "./assets/wind_turbine/scene.gltf");

    if (
        isFarmTurbinesLoading ||
        isComponentsLoading ||
        isComponentTypesLoading ||
        isInspectionsLoading ||
        isGradesLoading ||
        isGradeTypesLoading
    ) {
        return <Loader></Loader>;
    }

    if (
        isFarmTurbinesError ||
        isComponentsError ||
        isComponentTypesError ||
        isInspectionsError ||
        isGradesError ||
        isGradeTypesError
    ) {
        return <Error></Error>;
    }

    return (
        <div className="grid grid-cols-5 gap-4 h-full">
            <h2 className="flex gap-2 items-center text-xl tracking-widest col-span-5">
                <FontAwesomeIcon icon={faCow} />
                <span>Farm: {farmId}</span>
            </h2>
            <div className="flex flex-col gap-4 col-span-3 overflow-hidden">
                <div className="grid grid-cols-9 gap-4">
                    <Card className="flex flex-col gap-2 col-span-3 py-4 items-center justify-center">
                        <label htmlFor="turbines">Choose a turbine</label>

                        <select
                            className=" bg-primary text-secondary p-2 rounded-lg text-center"
                            name="turbines"
                            onChange={(event) =>
                                onDropdownChange(event.target.value)
                            }
                        >
                            <option value="all">All turbines</option>
                            {turbines.map((turbine) => (
                                <option value={turbine.id} key={turbine.id}>
                                    {turbine.name}
                                </option>
                            ))}
                        </select>
                    </Card>
                    <Card className="col-span-2 flex flex-col gap-4 py-4 items-center justify-center">
                        <p>Average Rotor Grade</p>
                        <p className="text-4xl">
                            {calculateComponentGradeAverage("Rotor")}
                        </p>
                    </Card>
                    <Card className="col-span-2 flex flex-col gap-4 py-4 items-center justify-center">
                        <p>Average Blade Grade</p>
                        <p className="text-4xl">
                            {calculateComponentGradeAverage("Blade")}
                        </p>
                    </Card>
                    <Card className="col-span-2 flex flex-col gap-4 py-4 items-center justify-center">
                        <p>Average Hub Grade</p>
                        <p className="text-4xl">
                            {calculateComponentGradeAverage("Hub")}
                        </p>
                    </Card>
                </div>
                <Card className="flex-grow overflow-scroll">
                    <table className="table-fixed mt-8 text-center text-text mx-4 w-[calc(100%-2rem)]">
                        <thead>
                            <tr>
                                <th className="pb-4">Turbine Name</th>
                                <th className="pb-4">Component Name</th>
                                <th className="pb-4">Inspected At</th>
                                <th className="pb-4">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTurbineData.map((row, index) => (
                                <tr
                                    key={index}
                                    className=" hover:bg-primary hover:text-background"
                                >
                                    <td className="pb-2">{row.name}</td>
                                    <td className="pb-2">
                                        {row.componentName}
                                    </td>
                                    <td className="pb-2">{row.inspected_at}</td>
                                    <td className="pb-2">{row.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
            <Card className="col-span-2">
                <Canvas>
                    <OrbitControls
                        enableZoom={false}
                        minPolarAngle={Math.PI / 2}
                        maxPolarAngle={Math.PI / 2}
                        zoom={-10}
                    />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 5, 2]} intensity={1} />
                    <Suspense fallback={<Loader />}>
                        <mesh scale={[0.3, 0.3, 0.3]}>
                            <primitive
                                object={gltf.scene}
                                position={[0, -10, 0]}
                            />
                        </mesh>
                    </Suspense>
                </Canvas>
            </Card>
        </div>
    );
}
