import { useFormikContext } from 'formik';

const RefusButton = () => {
    const {
        values: {
            localisation,
            determinant,
            determinantSign,
            contenus,
            phenomenes,
        },
        touched,
        setFieldValue,
    } = useFormikContext();

    const handleRefus = () => {
        setFieldValue('localisation', 'Aucun');
        setFieldValue('determinant', 'Aucun');
        setFieldValue('determinantSign', 'Aucun');
        setFieldValue('contenus', []);
        setFieldValue('phenomenes', ['Refus']);
    };

    return (
        <div
            className="text-xl text-center text-gray-900 bg-red-100 p-3 cursor-pointer rounded-lg hover:bg-red-200 w-1/8 border shadow-sm lg:p-6 p-3 mx-4 lg:mx-0"
            onClick={handleRefus}
        >
            Refus
        </div>
    );
};

export default RefusButton;
