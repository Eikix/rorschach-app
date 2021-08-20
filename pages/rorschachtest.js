import Layout from "../components/Layout";
import Planche from "../components/Planche";
import { useState } from "react";
import PreferenceForm from "../components/myFormikComponents/PreferenceForm";
import processResults from "../utils/helpers/processResults";
import computeResults from "../utils/helpers/computeProcessedResults";

const RorschachTest = () => {

    const [resultNumber, setResultNumber] = useState("first");

    const resultsArray = ["first", "second", "third"];
    const planchesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const updateResultNumber = (nextResultNumber) => {
        setResultNumber(nextResultNumber);
    }

    const blankPlanches = {
        planches : {
            "1":{
                "first":{},
                "second":{},
                "third":{},
            },
            "2":{
                "first":{},
                "second":{},
                "third":{},
            },
            "3":{
                "first":{},
                "second":{},
                "third":{},
            },
            "4":{
                "first":{},
                "second":{},
                "third":{},
            },
            "5":{
                "first":{},
                "second":{},
                "third":{},
            },
            "6":{
                "first":{},
                "second":{},
                "third":{},
            },
            "7":{
                "first":{},
                "second":{},
                "third":{},
            },
            "8":{
                "first":{},
                "second":{},
                "third":{},
            },
            "9":{
                "first":{},
                "second":{},
                "third":{},
            },
            "10":{
                "first":{},
                "second":{},
                "third":{},
            }
        }
        };
        
    const [selectedPlanche, setSelectedPlanche] = useState(1);
    const [savedPlanches, setSavedPlanches] = useState(blankPlanches);
    const [finalResults, setFinalResults] = useState({});

    const isActive = {
        one: selectedPlanche === 1 ? "bg-color1" : "bg-gray-100",
        two: selectedPlanche === 2 ? "bg-color1" : "bg-gray-100",
        three: selectedPlanche === 3 ? "bg-color1" : "bg-gray-100",
        four: selectedPlanche === 4 ? "bg-color1" : "bg-gray-100",
        five: selectedPlanche === 5 ? "bg-color1" : "bg-gray-100",
        six: selectedPlanche === 6 ? "bg-color1" : "bg-gray-100",
        seven: selectedPlanche === 7 ? "bg-color1" : "bg-gray-100",
        eight: selectedPlanche === 8 ? "bg-color1" : "bg-gray-100",
        nine: selectedPlanche === 9 ? "bg-color1" : "bg-gray-100",
        ten: selectedPlanche === 10 ? "bg-color1" : "bg-gray-100",
        eleven : selectedPlanche === 11 ? "bg-color1" : "bg-gray-100",
    }
    const styleArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"];

    const switchSelectedPlanche = (plancheNumber) => {
        switch(plancheNumber) {
            case "one":
                setSelectedPlanche(1);
                break;
            case "two":
                setSelectedPlanche(2);
                break;
            case "three":
                setSelectedPlanche(3);
                break;
            case "four":
                setSelectedPlanche(4);
                break;
            case "five":
                setSelectedPlanche(5);
                break;
            case "six":
                setSelectedPlanche(6);
                break;
            case "seven":
                setSelectedPlanche(7);
                break;
            case "eight":
                setSelectedPlanche(8);
                break;
            case "nine":
                setSelectedPlanche(9);
                break;
            case "ten":
                setSelectedPlanche(10);
                break;
            case "eleven":
                setSelectedPlanche(11);
                break;
        }

    }

    const submitResults = () => {
        console.log(JSON.stringify(savedPlanches, null, 2));
        setFinalResults(() => processResults(savedPlanches));
        console.log(JSON.stringify(finalResults, null, 2));
    }

    const printResults = () => {
        if (Object.keys(finalResults).length !== 0) {
            console.log(JSON.stringify(computeResults(finalResults), null, 2));
        }
    }

    const nextPlanche = () => {
        if (selectedPlanche < 11) {
            setSelectedPlanche(prevPlanche => prevPlanche + 1);
            setResultNumber("first");
        }
    }
    const previousPlanche = () => {
        if (selectedPlanche > 1) {
            setSelectedPlanche(prevPlanche => prevPlanche - 1);
            setResultNumber("first");
        }
    }

    const savePlanche = (values, plancheNumber, resultNumber, goNextPlanche = true, goNextResult = false) => {
        try {
            setSavedPlanches(prevPlanches => {
                return ({
                    ...prevPlanches,
                    planches: {
                        ...prevPlanches.planches,
                        [plancheNumber]: {
                            ...prevPlanches.planches[plancheNumber],
                            [resultNumber] : values
                        }
                    }
                })
            })
            if (goNextPlanche) nextPlanche();
            if (goNextResult) {
                switch(resultNumber) {
                    case "first": 
                        updateResultNumber("second");
                        break;
                    case "second":
                        updateResultNumber("third");
                        break;
                }
            }
        } catch(err) {
            console.log(err);
        }
        console.log(savedPlanches);
    }

    const savePrefs = (prefs) => {
        try {
            setSavedPlanches(prevPlanches => {
                return {
                    ...prevPlanches,
                    preferences: prefs,
                }
            })
        } catch(err) {
            console.log(err);
        }
    }


    return (
        <Layout title='Rorschach Test' description="Faites passer un test de Rorschach en ligne.">
            <div className="flex flex-col items-center justify-center mb-12">

                {planchesArray.map(plancheNumber => {
                    return (
                    resultsArray.map(result => {
                        if (selectedPlanche === plancheNumber && resultNumber === result) return (
                            <Planche key={plancheNumber.toString()+result} plancheNumber={plancheNumber.toString()} savePlanche={savePlanche} savedPlanches={savedPlanches} resultNumber={result} updateResultNumber={updateResultNumber}/>
                        )
                    }))
                })}

                {selectedPlanche===11 && 
                    <div className="flex flex-col justify-center items-center shadow-sm rounded-lg text-color1 p-3 lg:p-24 m-12 lg:m-18">
                        <p className="text-2xl text-center lg:text-3xl mb-12 lg:mb-16">Entrez les 2 planches préférées et les 2 planches les moins appréciées par le patient (Optionnel).</p>
                        <PreferenceForm savePrefs={savePrefs} />
                        <p className="text-2xl text-center lg:text-3xl mb-6 mt-12 md:mt-16 lg:mt-24 xl:mt-32">Vous avez terminé le test de Rorschach. Vous pouvez désormais générer les résultats.</p>
                        <button onClick={submitResults} className="text-xl lg:text-2xl rounded-lg p-6 border shadow-sm text-center text-color1 mt-12 hover:bg-gray-100">Générer</button>
                        {(Object.keys(finalResults).length !== 0) && <button onClick={printResults} className="text-xl lg:text-2xl rounded-lg p-6 border shadow-sm text-center text-color1 mt-12 hover:bg-gray-100">Voir les résultats</button>}
                    </div>
                }
                <div className="flex justify-around items-center w-full">
                    <button className="border shadow-sm rounded-lg p-3 hover:bg-gray-100 text-center" onClick={previousPlanche}>Retour</button>
                    <div className="flex justify-center items-center space-x-2 lg:space-x-8">
                        {styleArray.map(plancheNumber => {
                            return (
                                <div key={plancheNumber} onClick={() => switchSelectedPlanche(plancheNumber)} className={`w-1 h-1 md:w-2 md:h-2 lg:w-3 lg:h-3 rounded-full cursor-pointer ${isActive[plancheNumber]}`}></div>
                            )
                        })}
                    </div>
                    <button className="border shadow-sm rounded-lg p-3 hover:bg-gray-100 text-center" onClick={nextPlanche}>Suivant</button>
                </div>
            </div>

        </Layout>
    )
}

export default RorschachTest
