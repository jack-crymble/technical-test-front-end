import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
    useGetComponentTypesQuery,
    useGetComponentsQuery,
    useGetFarmQuery,
    useGetFarmTurbinesQuery,
    useGetGradeTypesQuery,
    useGetGradesQuery,
    useGetInspectionsQuery,
} from "../store/features/core-api";
import Loader from "../components/loader";
import { useSearchParams } from "react-router-dom";
import Error from "../components/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCow } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/card";
import Dropdown from "../components/dropdown";
import Table from "../components/table";
import TableHeader from "../components/table-header";
import TableBody from "../components/table-body";
import NumberDisplay from "../components/number-display";

function WindTurbineModel() {
    const gltf = useGLTF("/assets/wind_turbine/scene.gltf");
    return (
        <mesh scale={[0.3, 0.3, 0.3]}>
            <primitive object={gltf.scene} position={[0, -10, 0]} />
        </mesh>
    );
}

export default function InspectionPage() {
    const [searchParams] = useSearchParams();

    const farmId = searchParams.get("farmId") ?? 1;

    const { data: farm } = useGetFarmQuery(farmId);

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
        if (
            isGradesLoading ||
            isGradeTypesLoading ||
            isComponentsLoading ||
            isComponentTypesLoading ||
            isInspectionsLoading ||
            isFarmTurbinesLoading ||
            isGradesError ||
            isGradeTypesError ||
            isComponentsError ||
            isComponentTypesError ||
            isInspectionsError ||
            isFarmTurbinesError
        )
            return;

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

    const onDropdownChange = (optionId) => {
        const turbineId = parseInt(optionId);
        if (turbineId === -1) {
            setFilteredTurbineData(turbineData);
            return;
        }

        const filteredTurbines = turbineData.filter(
            (row) => row.id === turbineId
        );
        setFilteredTurbineData(filteredTurbines);
    };

    if (
        isFarmTurbinesLoading ||
        isComponentsLoading ||
        isComponentTypesLoading ||
        isInspectionsLoading ||
        isGradesLoading ||
        isGradeTypesLoading
    ) {
        return <Loader />;
    }

    if (
        isFarmTurbinesError ||
        isComponentsError ||
        isComponentTypesError ||
        isInspectionsError ||
        isGradesError ||
        isGradeTypesError
    ) {
        return <Error />;
    }

    return (
        <div className="grid grid-cols-5 gap-4 h-full">
            <h2 className="flex gap-2 items-center text-xl tracking-widest col-span-5">
                <FontAwesomeIcon icon={faCow} />
                <span>Farm: {farm.name}</span>
            </h2>
            <div className="flex flex-col gap-4 col-span-3 overflow-hidden">
                <div className="grid grid-cols-9 gap-4">
                    <Card className="flex flex-col gap-2 col-span-3 py-4 items-center justify-center">
                        <Dropdown
                            options={turbines}
                            label="Choose a turbine"
                            onChange={onDropdownChange}
                        />
                    </Card>
                    <Card className="col-span-2 flex flex-col gap-4 py-4 items-center justify-center">
                        <NumberDisplay
                            title="Average Rotor Grade"
                            values={filteredTurbineData
                                .filter((row) => row.componentName === "Rotor")
                                .map((row) => row.grade)}
                        />
                    </Card>
                    <Card className="col-span-2 flex flex-col gap-4 py-4 items-center justify-center">
                        <NumberDisplay
                            title="Average Blade Grade"
                            values={filteredTurbineData
                                .filter((row) => row.componentName === "Blade")
                                .map((row) => row.grade)}
                        />
                    </Card>
                    <Card className="col-span-2 flex flex-col gap-4 py-4 items-center justify-center">
                        <NumberDisplay
                            title="Average Hub Grade"
                            values={filteredTurbineData
                                .filter((row) => row.componentName === "Hub")
                                .map((row) => row.grade)}
                        />
                    </Card>
                </div>
                <Card className="flex-grow overflow-scroll">
                    <Table>
                        <TableHeader
                            headers={[
                                "Turbine Name",
                                "Component Name",
                                "Inspected At",
                                "Grade",
                            ]}
                        />
                        <TableBody
                            rows={filteredTurbineData.map((row) => [
                                row.name,
                                row.componentName,
                                row.inspected_at,
                                row.grade,
                            ])}
                        />
                    </Table>
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
                    <WindTurbineModel />
                </Canvas>
            </Card>
        </div>
    );
}
