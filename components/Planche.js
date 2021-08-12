import { Formik, Form } from "formik";
import * as Yup from 'yup';
import Image from "next/image";
import FormikSelect from "./FormikSelect";
import {localisationList, determinantList, signesList, contenusList, phenomenesList} from '../utils/details/plancheDetails';
import FormikCheckbox from "./FormikCheckbox";

const Planche = ({idNumber, savePlanche, savedPlanches}) => {


    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-3xl text-center font-light mt-6 lg:mt-12 border-b">Planche no.{idNumber}</h2>
            {idNumber && <div className="my-12 lg:my-24"><Image src={`/images/rorschach${idNumber}.jpg`} width={366*2} height={206*2} /></div>}
            <Formik
                initialValues={{localisation: savedPlanches[idNumber]?.localisation, determinant: savedPlanches[idNumber]?.determinant, determinantSign:savedPlanches[idNumber]?.determinantSign, contenus: savedPlanches[idNumber]?.contenus, phenomenes: savedPlanches[idNumber]?.phenomenes}}
                validationSchema={Yup.object({
                    localisation: Yup.string().required('Required'),
                    determinant: Yup.string().required('Required'),
                    determinantSign: Yup.string().required('Required'),
                    contenus: Yup.array().required('Required'),
                    phenomenes: Yup.array().required('Required')
                })}
                onSubmit={(values, {setSubmitting }) => {
                    savePlanche(values, idNumber);
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }}
                    
            >
                <div className="mb-6 lg:mb-12">
                    <Form className="flex flex-col items-center">
                        <div className="flex flex-col lg:flex-row space-x-8 lg:space-x-12 xl:space-x-12 items-start mb-6 lg:mb-12">
                            <div className="flex flex-col items-start justify-center space-y-4 lg:space-y-8 rounded-lg border shadow-md lg:p-6 p-3">
                            <FormikSelect label="Localisation" name='localisation'>
                                {localisationList.map(localisation => <option key={localisation+idNumber} value={localisation}>{localisation}</option>)}
                            </FormikSelect>

                            <FormikSelect label="Déterminant" name="determinant">
                                {determinantList.map(det => <option key={det+idNumber} value={det}>{det}</option>)}
                            </FormikSelect>

                            <FormikSelect label="Signe" name="determinantSign">
                                {signesList.map(sign => <option key={sign+idNumber} value={sign}>{sign}</option>)}
                            </FormikSelect>
                            </div>

                            <div className="flex flex-col space-y-4 lg:space-y-8">
                                <div className="flex flex-col rounded-lg border shadow-md lg:p-6 p-3">
                                    <h3 className="md:text-xl md:mb-3">Contenus: </h3>
                                    <div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-9 lg:gap-3 gap-2">
                                        {contenusList.map(contenu => {
                                            return (
                                                <FormikCheckbox key={contenu+idNumber} name="contenus" value={contenu}> {contenu} </FormikCheckbox>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-col border shadow-md lg:p-6 p-3">
                                    <h3 className="md:text-xl md:mb-3">Phénomènes Particuliers: </h3>
                                    <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3 gap-2">
                                        {phenomenesList.map(phenomene => {
                                            return (
                                                <FormikCheckbox key={phenomene+idNumber} name="phenomenes" value={phenomene}> {phenomene} </FormikCheckbox>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="text-xl text-color1 p-3 rounded-lg hover:bg-gray-100 w-1/8 border shadow-md lg:p-6 p-3" type="submit">Sauvegarder et passer à la planche suivante</button>

                    </Form>
                </div>
            </Formik>
            
        </div>
    )
}

export default Planche
