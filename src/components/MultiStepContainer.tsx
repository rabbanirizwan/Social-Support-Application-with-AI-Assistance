import { Card, Steps } from "antd";
import { FormProvider } from "../context/FormContext";
import MultiStepForm from "./MutliStepForm";

const MultiStepFormContainer = () => {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4" >
         
         
          <MultiStepForm />
        </div>
      </div>
    </FormProvider>
  );
};

export default MultiStepFormContainer;
