import { Form, Formik, useFormikContext } from "formik";
import FormikSelect from "./FormikSelect";
import * as Yup from 'yup';
import { useState } from "react";
import PrefOptions from "./PrefOptions";

const PreferenceForm = ({savePrefs}) => {
    const plancheList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    const [planches, setPlanches] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    const initValues = {
        prefPlanche1: "",
        prefPlanche2: "",
        leastPrefPlanche1: "",
        leastPrefPlanche2: "",
    };

    
    return (
        <div>
            <Formik 
            initialValues={initValues}
            validationSchema={Yup.object({
                prefPlanche1: Yup.string().oneOf([...plancheList, ""]),
                prefPlanche2: Yup.string().oneOf([...plancheList, ""]),
                leastPrefPlanche1: Yup.string().oneOf([...plancheList, ""]),
                leastPrefPlanche2: Yup.string().oneOf([...plancheList, ""])
            })}
            onSubmit={(values, {setSubmitting }) => {
                    savePrefs(values)
                    console.log(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }}
            >
                <Form className="flex flex-col justify-center items-center">
                    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 lg:gap-6 2xl:gap-12">
                    <FormikSelect label="Planche préférée n°1" name="prefPlanche1">
                        <PrefOptions planches={planches} currentPlanche={0}/>
                    </FormikSelect>

                    <FormikSelect label="Planche préférée n°2" name="prefPlanche2">
                        <PrefOptions planches={planches} currentPlanche={2}/>
                    </FormikSelect>

                    <FormikSelect label="Planche moins appréciée n°1" name="leastPrefPlanche1">
                       <PrefOptions planches={planches} currentPlanche={3}/>
                    </FormikSelect>

                    <FormikSelect label="Planche moins appréciée n°2" name="leastPrefPlanche2">
                        <PrefOptions planches={planches} currentPlanche={4}/>
                    </FormikSelect>
                    </div>
                    <button type="submit" className="text-xl lg:text-2xl rounded-lg p-6 border shadow-sm text-center text-color1 mt-12 hover:bg-gray-100">Valider</button>
                </Form>
            </Formik>
            {console.log()}
        </div>
    )
}

export default PreferenceForm
