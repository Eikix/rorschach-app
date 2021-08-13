import { useField } from "formik";

const FormikSelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <div className="flex flex-col">
       <label className='text-xl' htmlFor={props.id || props.name}>{label}</label>
       <select className="text-xl"{...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="text-red-900">{meta.error}</div>
       ) : null}
     </div>
   );
 };

export default FormikSelect
