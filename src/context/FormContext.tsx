import { Form, type FormInstance } from "antd";
import { createContext, useContext, useState, type ReactNode } from "react";

interface FormContextType {
  form: FormInstance<any>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [form] = Form.useForm();

  return (
    <FormContext.Provider value={{ form }}>
     
        {children}
     
    </FormContext.Provider>
  );
};
