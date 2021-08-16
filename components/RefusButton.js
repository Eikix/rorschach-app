import { useFormikContext } from "formik";

const RefusButton = () => {

    const {
        values: {localisation, determinant, determinantSign, contenus, phenomenes},
        touched,
        setFieldValue
    } = useFormikContext();

    
    const handleRefus = () => {
        setFieldValue("localisation", "Aucun");
        setFieldValue("determinant", "Aucun");
        setFieldValue("determinantSign", "Aucun");
        setFieldValue("contenus", []);
        setFieldValue("phenomenes", ["Refus"]);
    }


    return (
        <div className="text-xl text-center text-color1 p-3 cursor-pointer rounded-lg hover:bg-gray-100 w-1/8 border shadow-md lg:p-6 p-3 mx-4 lg:mx-0" onClick={handleRefus}>Refus</div>
    )
}

export default RefusButton
