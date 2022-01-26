import { useFormikContext } from 'formik';

const AddingResultButton = ({ savePlanche, resultNumber, plancheNumber }) => {
  const {
    values: {
      localisation,
      determinant,
      determinantSign,
      contenus,
      phenomenes,
      phenomenesComment,
      answerTime,
    },
  } = useFormikContext();

  const plancheValues = {
    localisation,
    determinant,
    determinantSign,
    contenus,
    phenomenes,
    phenomenesComment,
    answerTime,
  };

  const handleAddResult = () => {
    // console.log("----- Add results -----");
    // console.log(JSON.stringify(plancheValues, null, 2));
    // console.log("----- Add results -----");
    savePlanche(plancheValues, plancheNumber, resultNumber, false, true);
  };

  return (
    <div
      className="text-xl text-center text-color1 bg-blue-50 p-3 cursor-pointer rounded-lg hover:bg-gray-100 w-1/8 border shadow-sm lg:p-6 p-3 mx-4 lg:mx-0"
      onClick={handleAddResult}
    >
      Ajouter une perception
    </div>
  );
};

export default AddingResultButton;
