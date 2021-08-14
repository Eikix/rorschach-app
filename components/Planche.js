
import Image from "next/image";

import { useState, useEffect } from "react";
import RorschachForm from "./myFormikComponents/RorschachForm";


const Planche = ({plancheNumber, savePlanche, savedPlanches, resultNumber, updateResultNumber}) => {


    const nextResultNumber = () => {
        switch(resultNumber) {
            case "first":
                updateResultNumber("second");
                break;
            case "second":
                updateResultNumber("third");
                break;
            case "third":
                updateResultNumber("first");
                break;
        }
    }

    const switchResultWithinSamePlanche = (resultNumber) => {
        switch(resultNumber) {
            case "first":
                updateResultNumber("first");
                break;
            case "second":
                updateResultNumber("second");
                break;
            case "third":
                updateResultNumber("third");
                break;
        }
    }

    const [initValues, setInitValues] = useState({
        localisation: savedPlanches[plancheNumber][resultNumber]?.localisation ?? '',
        // localisationComment: initLocalisationComment,
        determinant: savedPlanches[plancheNumber][resultNumber]?.determinant ?? '',
        // determinantComment: initDeterminantComment,
        determinantSign: savedPlanches[plancheNumber][resultNumber]?.determinantSign ?? '',
        contenus: savedPlanches[plancheNumber][resultNumber]?.contenus ?? [],
        // contenusComment: initContenusComment,
        phenomenes: savedPlanches[plancheNumber][resultNumber]?.phenomenes ?? [],
        phenomenesComment: savedPlanches[plancheNumber][resultNumber]?.phenomenesComment ?? '',
        answerTime: savedPlanches[plancheNumber][resultNumber]?.answerTime ?? 0,
    });
    

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-3xl text-center font-light mt-6 lg:mt-12 border-b">Planche no.{plancheNumber}</h2>
            {plancheNumber && <div className="my-12 lg:my-24 mx-2 lg:mx-0"><Image className="rounded-lg" src={`/images/rorschach${plancheNumber}.jpg`} width={366*2} height={206*2} /></div>}
            <RorschachForm plancheNumber={plancheNumber} savePlanche={savePlanche}  initValues={initValues} resultNumber={resultNumber} nextResultNumber={nextResultNumber} switchResultWithinSamePlanche={switchResultWithinSamePlanche}/>
        </div>
    )
}

export default Planche
