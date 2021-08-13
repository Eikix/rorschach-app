import { Formik, Form } from "formik";
import * as Yup from 'yup';
import Image from "next/image";
import FormikSelect from "./myFormikComponents/FormikSelect";
import {localisationList, determinantList, signesList, contenusList, phenomenesList} from '../utils/details/plancheDetails';
import FormikCheckbox from "./myFormikComponents/FormikCheckbox";
import RefusButton from "./RefusButton";
import ReinitializeButton from "./ReinitializeButton";
import FormikTextArea from "./myFormikComponents/FormikTextArea";
import FormikTextInput from "./myFormikComponents/FormikTextInput";
import { useState } from "react";

const Planche = ({idNumber, savePlanche, savedPlanches}) => {

    const initLocalisation = savedPlanches[idNumber]?.localisation ?? '';
    // const initLocalisationComment = savedPlanches[idNumber]?.localisationComment ?? '';
    const initDeterminant = savedPlanches[idNumber]?.determinant ?? '';
    //  const initDeterminantComment = savedPlanches[idNumber]?.determinantComment ?? '';
    const initDeterminantSign = savedPlanches[idNumber]?.determinantSign ?? '';
    const initContenus = savedPlanches[idNumber]?.contenus ?? [];
    // const initContenusComment = savedPlanches[idNumber]?.contenusComment ?? '';
    const initPhenomenes = savedPlanches[idNumber]?.phenomenes ?? [];
    const initPhenomenesComment = savedPlanches[idNumber]?.phenomenesComment ?? '';


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

    const initValues = {
        localisation: initLocalisation,
        // localisationComment: initLocalisationComment,
        determinant: initDeterminant,
        // determinantComment: initDeterminantComment,
        determinantSign:initDeterminantSign,
        contenus: initContenus,
        // contenusComment: initContenusComment,
        phenomenes: initPhenomenes,
        phenomenesComment: initPhenomenesComment,
        answerTime: 0,
    }

    const [inputRows, setInputRows] = useState(3);
    const [inputCols, setInputCols] = useState(20);

    

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-3xl text-center font-light mt-6 lg:mt-12 border-b">Planche no.{idNumber}</h2>
            {idNumber && <div className="my-12 lg:my-24"><Image className="rounded-lg" src={`/images/rorschach${idNumber}.jpg`} width={366*2} height={206*2} /></div>}
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
                    savePlanche(values, idNumber);
                    console.log(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }}
                onReset={() => {
                    savePlanche(emptyPlanche, idNumber, false);
                }}
                    
            >
                <div className="mb-6 lg:mb-12">
                    <Form className="flex flex-col items-center justify-center md:justify-start ">
                        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:space-x-12 xl:space-x-12 items-start mb-6 lg:mb-12">
                            <div className="flex flex-col items-start justify-center space-y-4 lg:space-y-8 rounded-lg border shadow-sm lg:p-6 p-3">
                            <FormikSelect label="Localisation" name='localisation'>
                                {localisationList.map(localisation => <option key={localisation+idNumber} value={localisation}>{localisation}</option>)}
                            </FormikSelect>

                            {/* <FormikTextArea label="Commentaires" name="localisationComment" rows={inputRows} cols={inputCols}/> */}

                            <FormikSelect label="Déterminant" name="determinant">
                                {determinantList.map(det => <option key={det+idNumber} value={det}>{det}</option>)}
                            </FormikSelect>

                            {/* <FormikTextArea label="Commentaires" name="determinantComment" rows={inputRows} cols={inputCols}/> */}

                            <FormikSelect label="Signe" name="determinantSign">
                                {signesList.map(sign => <option key={sign+idNumber} value={sign}>{sign}</option>)}
                            </FormikSelect>

                            </div>

                            <div className="flex flex-col space-y-4 lg:space-y-8">
                                <div className="flex flex-col rounded-lg border shadow-sm lg:p-6 p-3">
                                    <h3 className="md:text-xl mb-2 md:mb-3 border-b pb-1 lg:mb-6 xl:mb-8">Contenus: </h3>
                                    <div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-10 lg:gap-4 xl:gap-6 gap-2 mb-3 md:mb-4 lg:mb-6 justify-center items-center p-2 lg:p-4 xl:p-6">
                                        {contenusList.map(contenu => {
                                            return (
                                                <FormikCheckbox key={contenu+idNumber} name="contenus" value={contenu}> {contenu} </FormikCheckbox>
                                            )
                                        })}
                                    </div>
                                    {/* <FormikTextArea label="Commentaires" name="contenusComment" rows={inputRows} cols={inputCols}/> */}
                                </div>

                                <div className="flex flex-col border shadow-sm rounded-lg lg:p-6 p-3">
                                    <h3 className="md:text-xl mb-2 md:mb-3 lg:mb-6 xl:mb-8 border-b pb-1">Phénomènes Particuliers: </h3>
                                    <div className="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-10 lg:gap-4 xl:gap-6 gap-2 mb-3 md:mb-4 lg:mb-6 justify-center items-center p-2 lg:p-4 xl:p-6">
                                        {phenomenesList.map(phenomene => {
                                            return (
                                                <FormikCheckbox key={phenomene+idNumber} name="phenomenes" value={phenomene}> {phenomene} </FormikCheckbox>
                                            )
                                        })}
                                    </div>
                                    <FormikTextArea label="Commentaires" name="phenomenesComment" rows={inputRows} cols={inputCols}/>
                                </div>
                                
                                <div className="flex flex-col">
                                    <FormikTextInput label="Temps de réponse (secondes)" name="answerTime" type="number" />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 lg:space-y-8">
                                <RefusButton />
                                <ReinitializeButton />
                                
                            </div>
                        </div>
                        <button className="text-xl text-color1 p-3 rounded-lg hover:bg-gray-100 w-1/8 border shadow-sm lg:p-6 p-3 mx-4 lg:mx-0" type="submit">Sauvegarder et passer à la planche suivante</button>

                    </Form>
                </div>
            </Formik>
            
        </div>
    )
}

export default Planche
