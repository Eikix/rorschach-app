import AddingResultButton from "../AddingResultButton";
import FormikSelect from "./FormikSelect";
import {localisationList, determinantList, signesList, contenusList, phenomenesList} from '../../utils/details/plancheDetails';
import * as contentHoverInformation from "../../utils/details/contentHoverInformation";
import * as phenoHoverInformation from "../../utils/details/phenomeneHoverInformation";
import FormikCheckbox from "./FormikCheckbox";
import RefusButton from "../RefusButton";
import ReinitializeButton from "../ReinitializeButton";
import FormikTextArea from "./FormikTextArea";
import FormikTextInput from "./FormikTextInput";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import HoverInfo from "../HoverInfo";


const RorschachForm = ({plancheNumber, savePlanche, initValues, resultNumber , switchResultWithinSamePlanche}) => {

    const [isContentHoverActive, setContentHoverActive] = useState(false);
    const [hoverContent, setHoverContent] = useState("");
    const [isPhenoHoverActive, setPhenoHoverActive] = useState(false);
    const [hoverPheno, setHoverPheno] = useState("");
    let contentTimeout;
    let phenoTimeout;

    const isActive = {
        first: resultNumber === "first" ? "bg-color1" : "bg-gray-100",
        second: resultNumber === "second" ? "bg-color1" : "bg-gray-100",
        third: resultNumber === "third" ? "bg-color1" : "bg-gray-100",
    } 
    
    const emptyPlanche = {
        localisation: "",
        // localisationComment: "",
        determinant: "",
        // determinantComment: "",
        determinantSign: "",
        contenus: [],
        // contenusComment: "",
        phenomenes: [],
        phenomenesComment: "",
        answerTime: null,
    }
    const resultArray = ["first", "second","third"];

    const [inputRows, setInputRows] = useState(3);
    const [inputCols, setInputCols] = useState(20);


    const handleSwitchResult = (resultNumber) => {
        switchResultWithinSamePlanche(resultNumber);
    }

    return (
        <div>
            <Formik
                initialValues={initValues}
                validationSchema={Yup.object({
                    localisation: Yup.string().oneOf([...localisationList, ""], "Localisation incorrecte").required('Required'),
                    // localisationComment: Yup.string(),
                    determinant: Yup.string().oneOf([...determinantList, ""], "Déterminant incorrect").required('Required'),
                    // determinantComment: Yup.string(),
                    determinantSign: Yup.string().oneOf([...signesList, ""], "Signe incorrect").required('Required'),
                    contenus: Yup.array().required('Required'),
                    // contenusComment: Yup.string(),
                    phenomenes: Yup.array(),
                    phenomenesComment: Yup.string(),
                    answerTime: Yup.number().min(0, 'Must be positive'),
                })}
                onSubmit={(values, {setSubmitting }) => {
                    savePlanche(values, plancheNumber, resultNumber, true, false);
                    console.log(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }}
                onReset={() => {
                    savePlanche(emptyPlanche, plancheNumber, resultNumber, false, false);
                }}
                    
            >
                <div className="mb-6 lg:mb-12">
                    <Form className="flex flex-col items-center justify-center md:justify-start ">
                        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:space-x-10 xl:space-x-12 lg:items-start mb-6 lg:mb-12">
                            <div className="flex flex-col lg:items-start justify-center space-y-4 lg:space-y-8 rounded-lg border shadow-sm lg:p-6 p-3">
                            <FormikSelect label="Localisation" name='localisation'>
                                {localisationList.map(localisation => <option key={localisation+plancheNumber} value={localisation}>{localisation}</option>)}
                            </FormikSelect>

                            {/* <FormikTextArea label="Commentaires" name="localisationComment" rows={inputRows} cols={inputCols}/> */}

                            <FormikSelect label="Déterminant" name="determinant">
                                {determinantList.map(det => <option key={det+plancheNumber} value={det}>{det}</option>)}
                            </FormikSelect>

                            {/* <FormikTextArea label="Commentaires" name="determinantComment" rows={inputRows} cols={inputCols}/> */}

                            <FormikSelect label="Signe" name="determinantSign">
                                {signesList.map(sign => <option key={sign+plancheNumber} value={sign}>{sign}</option>)}
                            </FormikSelect>

                            </div>

                            <div className="flex flex-col space-y-4 lg:space-y-8">
                                <div 
                                    className="flex flex-col rounded-lg border shadow-sm lg:p-6 p-3"
                                    onMouseLeave={() => {
                                                    if (contentTimeout) clearTimeout(contentTimeout);
                                                    setTimeout(() => {
                                                        setContentHoverActive(false)
                                                        setHoverContent("");
                                                    }, 50);
                                                }}
                                >
                                    <h3 className="md:text-xl mb-2 md:mb-3 border-b pb-1 lg:mb-6 xl:mb-8">Contenus: </h3>
                                    <div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 xl:grid-cols-5 lg:gap-4 xl:gap-6 gap-2 mb-3 md:mb-4 lg:mb-6 justify-center items-center p-2 lg:p-4 xl:p-6">
                                        {contenusList.map(contenu => {
                                            return (
                                                <div
                                                    onMouseEnter={() => {
                                                        if (contentTimeout) clearTimeout(contentTimeout);
                                                        contentTimeout = setTimeout(() => {
                                                            setHoverContent(contentHoverInformation[contenu]);
                                                            setContentHoverActive(true);
                                                        }, 500);
                                                        
                                                    }}
                                                    key={contenu+plancheNumber}
                                                >
                                                <FormikCheckbox name="contenus" value={contenu}> {contenu} </FormikCheckbox>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {isContentHoverActive && <HoverInfo content={hoverContent} visible={isContentHoverActive}/>}
                                    {/* <FormikTextArea label="Commentaires" name="contenusComment" rows={inputRows} cols={inputCols}/> */}
                                </div>

                                <div
                                    className="flex flex-col border shadow-sm rounded-lg lg:p-6 p-3"
                                    onMouseLeave={() => {
                                                        if(phenoTimeout) clearTimeout(phenoTimeout);
                                                        setTimeout(() => {
                                                            setPhenoHoverActive(false);
                                                            setHoverPheno("");
                                                        }, 50)
                                                        
                                                    }}
                                >
                                    <h3 className="md:text-xl mb-2 md:mb-3 lg:mb-6 xl:mb-8 border-b pb-1">Phénomènes Particuliers: </h3>
                                    <div className="grid grid-flow-row grid-cols-3 2xl:grid-cols-6 lg:gap-4 xl:gap-6 gap-2 mb-3 md:mb-4 lg:mb-6 justify-center items-center p-2 lg:p-4 xl:p-6">
                                        {phenomenesList.map(phenomene => {
                                            return (
                                                <div
                                                    onMouseEnter={() => {
                                                        if(phenoTimeout) clearTimeout(phenoTimeout)
                                                        phenoTimeout = setTimeout(() => {
                                                            setHoverPheno(phenoHoverInformation[phenomene]);
                                                            setPhenoHoverActive(true);
                                                        }, 500);
                                                    }}
                                                    
                                                    key={phenomene+plancheNumber} 
                                                >
                                                    <FormikCheckbox name="phenomenes" value={phenomene}> {phenomene} </FormikCheckbox>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {isPhenoHoverActive && <HoverInfo content={hoverPheno} visible={isPhenoHoverActive}/>}
                                    <FormikTextArea label="Commentaires" name="phenomenesComment" rows={inputRows} cols={inputCols}/>
                                </div>
                                
                                <div className="flex flex-col">
                                    <FormikTextInput label="Temps de réponse (secondes)" name="answerTime" type="number" />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 lg:space-y-8">
                                <RefusButton />
                                <ReinitializeButton />
                                <div className="flex flex-col space-y-2 lg:space-y-4">
                                    <AddingResultButton savePlanche={savePlanche} plancheNumber={plancheNumber} resultNumber={resultNumber}/>
                                    <div className="flex justify-center items-center space-x-2 lg:space-x-4">
                                        {resultArray.map(resultNumber => {
                                            return (
                                                <div key={resultNumber} onClick={() => handleSwitchResult(resultNumber)} className={`w-1 h-1 md:w-2 md:h-2 lg:w-3 lg:h-3 rounded-full cursor-pointer ${isActive[resultNumber]}`}>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                        <button className="text-xl text-color1 p-3 rounded-lg hover:bg-gray-100 w-1/8 border shadow-sm lg:p-6 p-3 mx-4 lg:mx-0" type="submit">Sauvegarder et passer à la planche suivante</button>

                    </Form>
                </div>
            </Formik>
            
            
        </div>
    )
}

export default RorschachForm
