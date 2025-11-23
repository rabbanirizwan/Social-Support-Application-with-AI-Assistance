import { Form, Button, message } from "antd";
import PersonalInformation from "./MultiStepForm/PersonalInformation";
import { useState } from "react";
import FamilyFinancialInfo from "./MultiStepForm/FamilyFinancialInfo";
import FinancialForm from "./MultiStepForm/FinancialForm";
import { useFormContext } from "../context/FormContext";
import { t } from "i18next";

type FormDataType = Record<string, any>;

const MultiStepForm = () => {
  const { form } = useFormContext();
  const [current, setCurrent] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataType>({});

  // Step definitions
  const steps = [
    { title: "Personal", content: <PersonalInformation /> },
    { title: "Financial", content: <FamilyFinancialInfo /> },
    { title: "Review", content: <FinancialForm /> },
  ];

  // Validate current step and merge data
  const collectStepData = async (): Promise<FormDataType | null> => {
    try {
      const values = await form.validateFields();
      const updatedData = { ...formData, ...values };
      setFormData(updatedData);
      return updatedData;
    } catch (error) {
      message.error(t("ERRORS.FILL_REQUIRED_FIELDS") || "Please fill in all required fields correctly.");
      return null;
    }
  };

  // Go to next step
  const next = async () => {
    const updatedData = await collectStepData();
    if (!updatedData) return;
    setCurrent((prev) => prev + 1);
  };

  // Go to previous step
  const prev = () => setCurrent((prev) => prev - 1);

  // Submit entire form
  const submitForm = async () => {
    const updatedData = await collectStepData();
    if (!updatedData) return;

    try {
      localStorage.setItem("multiStepFormData", JSON.stringify(updatedData));

      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      const result = await response.json();
      console.log("API response:", result);

      message.success(t("MESSAGES.FORMSUBMITTED"));

      form.resetFields();
      setFormData({});
      setCurrent(0);
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Something went wrong");
    }
  };

  return (
    <Form form={form} layout="vertical">
      {steps[current].content}

      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
        {current > 0 && (
          <Button className="w-full sm:w-auto" onClick={prev}>
            {t("BUTTONS.BACK")}
          </Button>
        )}

        {current < steps.length - 1 ? (
          <Button className="w-full sm:w-auto" type="primary" onClick={next}>
            {t("BUTTONS.NEXT")}
          </Button>
        ) : (
          <Button className="w-full sm:w-auto" type="primary" onClick={submitForm}>
            {t("BUTTONS.SUBMIT")}
          </Button>
        )}
      </div>
    </Form>
  );
};

export default MultiStepForm;
