import { useField } from "formik";

const FormikTextArea = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <div className="flex flex-col border shadow-sm rounded-lg p-3">
       <label className="text-xl  mb-2 md:mb-3 border-b pb-1" htmlFor={props.id || props.name}>{label}</label>
       <textarea className="text-sm p-3" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="text-red-900">{meta.error}</div>
       ) : null}
     </div>
   );
 };

 export default FormikTextArea;