import { memo } from "react";
import PropsTypes from "prop-types";

const AddPatient = memo(
    ({ arrayProp, objectProp, stringProp, numberProp, stringRequiredProp }) => {
        return (
            <div>
                <h1>This is template folder to copy</h1>
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
AddPatient.propTypes = {
    arrayProp: PropsTypes.array,
    objectProp: PropsTypes.object,
    stringProp: PropsTypes.string,
    numberProp: PropsTypes.number,
    stringRequiredProp: PropsTypes.string.isRequired,
};

// Display name for fast refresh using memo
AddPatient.displayName = "AddPatient";

export default AddPatient;
