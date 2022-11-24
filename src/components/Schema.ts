import * as Yup from "yup"

export const Schema = Yup.object().shape({
  title: Yup.string()
    .min(5, "title must be 5 char")
    .max(20, "title max 20 char long")
    .required("title is required"),
    
  description: Yup.string().min(5,"Description must be 5 chars").max(50,"Description max 50 char long").required('Description is required'),

  url: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Please enter URL'),

});
