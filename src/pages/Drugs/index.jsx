import { memo } from "react";
import PropsTypes from "prop-types";

const Drugs = memo(
    ({ arrayProp, objectProp, stringProp, numberProp, stringRequiredProp }) => {
        return (
            <div>
                <h1>This is Drugs folder to copy</h1>
                <div>{arrayProp}</div>
                <div>{objectProp}</div>
                <div>{stringProp}</div>
                <div>{numberProp}</div>
                <div>{stringRequiredProp}</div>
            </div>
        );
    }
);

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
Drugs.propTypes = {
    arrayProp: PropsTypes.array,
    objectProp: PropsTypes.object,
    stringProp: PropsTypes.string,
    numberProp: PropsTypes.number,
    stringRequiredProp: PropsTypes.string.isRequired,
};

// Display name for fast refresh using memo
Drugs.displayName = "Drugs";

export default Drugs;
