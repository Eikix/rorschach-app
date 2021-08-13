import { useField } from "formik";

const FormikTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <div className="flex flex-col">
       <label className="text-xl" htmlFor={props.id || props.name}>{label}</label>
       <input className="text-xl" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="text-red-900">{meta.error}</div>
       ) : null}
     </div>
   );
 };

 export default FormikTextInput;