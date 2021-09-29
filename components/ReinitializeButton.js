import { useFormikContext } from 'formik';

const ReinitializeButton = () => {
    const {
        values: {
            localisation,
            determinant,
            determinantSign,
            contenus,
            phenomenes,
        },
        setFieldValue,
    } = useFormikContext();

    const handleReinit = () => {
        setFieldValue('localisation', 'Aucun');
        setFieldValue('determinant', 'Aucun');
        setFieldValue('determinantSign', 'Aucun');
        setFieldValue('contenus', []);
        setFieldValue('phenomenes', []);
        setFieldValue('phenomenesComment', '');
        setFieldValue('answerTime', 0);
    };

    return (
        <div
            className="text-xl text-center text-color1 bg-yellow-50 p-3 cursor-pointer rounded-lg hover:bg-gray-100 w-1/8 border shadow-sm lg:p-6 p-3 mx-4 lg:mx-0"
            type="reset"
            onClick={handleReinit}
        >
            Réinitialiser
        </div>
    );
};

export default ReinitializeButton;
