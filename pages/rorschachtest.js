import Layout from "../components/Layout";
import Planche from "../components/Planche";
import { useState } from "react";

const RorschachTest = () => {
    const [selectedPlanche, setSelectedPlanche] = useState(1);
    const [savedPlanches, setSavedPlanches] = useState({});

    const submitResults = () => {
        alert(JSON.stringify(savedPlanches, null, 2));
    }

    const nextPlanche = () => {
        if (selectedPlanche < 11) {
            setSelectedPlanche(prevPlanche => prevPlanche + 1);
        }
    }
    const previousPlanche = () => {
        if (selectedPlanche > 1) {
            setSelectedPlanche(prevPlanche => prevPlanche - 1);
        }
    }

    const savePlanche = (values, idNumber) => {
        try {
            setSavedPlanches(prevPlanches => {
                return ({
                    ...prevPlanches,
                    [idNumber]: values
                })
            })
            console.log(savedPlanches);
            nextPlanche();
        } catch(err) {
            console.log(err);
        }
    }


    return (
        <Layout title='Rorschach Test' description="Faites passer un test de Rorschach en ligne.">
            <div className="flex flex-col items-center justify-center mb-12">
                {selectedPlanche===1 && <Planche idNumber="1" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===2 && <Planche idNumber="2" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===3 && <Planche idNumber="3" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===4 && <Planche idNumber="4" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===5 && <Planche idNumber="5" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===6 && <Planche idNumber="6" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===7 && <Planche idNumber="7" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===8 && <Planche idNumber="8" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===9 && <Planche idNumber="9" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===10 && <Planche idNumber="10" savePlanche={savePlanche} savedPlanches={savedPlanches}/>}
                {selectedPlanche===11 && 
                    <div className="flex flex-col justify-center items-center shadow-sm rounded-lg text-color1 p-3 lg:p-24 m-12 lg:m-18">
                        <p className="text-2xl lg:text-3xl">Vous avez terminé le test de Rorschach. Vous pouvez désormais générer les résultats.</p>
                        <button onClick={submitResults} className="text-xl lg:text-2xl rounded-lg p-6 border shadow-sm text-center text-color1 mt-12 lg:mt-32">Générer</button>
                    </div>
                }
                <div className="flex justify-around w-full">
                    <button className="border shadow-sm rounded-lg p-3 hover:bg-gray-100 text-center" onClick={previousPlanche}>Retour</button>
                    <button className="border shadow-sm rounded-lg p-3 hover:bg-gray-100 text-center" onClick={nextPlanche}>Suivant</button>
                </div>
            </div>

        </Layout>
    )
}

export default RorschachTest
