import { useFormikContext } from "formik";

const ReinitializeButton = () => {

    const {
        values: {localisation, determinant, determinantSign, contenus, phenomenes},
        setFieldValue
    } = useFormikContext();

    
    const handleReinit = () => {
        setFieldValue("localisation", "");
        setFieldValue("determinant", "");
        setFieldValue("determinantSign", "");
        setFieldValue("contenus", []);
        setFieldValue("phenomenes", []);
    }


    return (
        <div className="text-xl text-center text-color1 p-3 cursor-pointer rounded-lg hover:bg-gray-100 w-1/8 border shadow-md lg:p-6 p-3 mx-4 lg:mx-0" type="reset" onClick={handleReinit}>Réinitialiser</div>
    )
}

export default ReinitializeButton
