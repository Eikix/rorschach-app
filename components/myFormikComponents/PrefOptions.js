import { useFormikContext } from "formik";

const PrefOptions = ({planches, currentPlanche}) => {


    const {
        values: {prefPlanche1, prefPlanche2, leastPrefPlanche1, leastPrefPlanche2},
    } = useFormikContext();

    let prefArray = [];
    switch(currentPlanche) {
        case 1:
            prefArray = [prefPlanche2, leastPrefPlanche1, leastPrefPlanche2];
            break;
        case 2:
            prefArray = [prefPlanche1, leastPrefPlanche1, leastPrefPlanche2];
            break;
        case 3:
            prefArray = [prefPlanche2, prefPlanche1, leastPrefPlanche2];
            break;
        case 4:
            prefArray = [prefPlanche2, leastPrefPlanche1, prefPlanche1];
    }

    return (
        <>
        {planches.map(planche => {
            if (!prefArray.includes(planche)) return (
                <option key={"Planche:"+planche} value={planche}>Planche n°{planche}</option>
            )
        })}
        </>
    )
}

export default PrefOptions
