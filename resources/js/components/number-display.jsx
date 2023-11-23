import { average, sum } from "../utils/aggregate.utils";
import Error from "./error";

export default function NumberDisplay({
    title,
    aggregate = "avg",
    values = [],
}) {
    let aggregateValue;

    switch (aggregate) {
        case "avg":
            aggregateValue = average(values);
            break;
        case "sum":
            aggregateValue = sum(values);
            break;
        case "min":
            aggregateValue = Math.min(values);
            break;
        case "max":
            aggregateValue = Math.max(values);
            break;
        default:
            console.error(`Unable to calculate ${aggregate} of ${values}`);
            return <Error />;
    }

    return (
        <>
            <p>{title}</p>
            <p className="text-4xl">{aggregateValue}</p>
        </>
    );
}
