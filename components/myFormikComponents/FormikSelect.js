import { useField } from "formik";

const FormikSelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <div className="flex flex-col border shadow-sm rounded-lg w-full p-3">
       <label className='text-xl mb-2 md:mb-3 border-b pb-1' htmlFor={props.id || props.name}>{label}</label>
       <select className="text-xl bg-gray-50 rounded-lg p-1 "{...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="text-red-900">{meta.error}</div>
       ) : null}
     </div>
   );
 };

export default FormikSelect
