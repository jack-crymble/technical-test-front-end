import Error from "./error";
import NumberDisplayAverage from "./number-display-average";

export default function NumberDisplay({
    title,
    aggregate = "avg",
    values = [],
}) {
    let componentToRender;

    switch (aggregate) {
        case "avg":
            componentToRender = <NumberDisplayAverage values={values} />;
            break;
        case "sum":
            // Can be added in future
            // componentToRender = <NumberDisplaySum values={values} />;
            break;
        case "min":
            // Can be added in future
            // componentToRender = <NumberDisplayMin values={values} />;
            break;
        default:
            console.error(`Unable to calculate ${aggregate} of ${values}`);
            return <Error className="text-center" />;
    }

    return (
        <>
            <p>{title}</p>
            {componentToRender}
        </>
    );
}
