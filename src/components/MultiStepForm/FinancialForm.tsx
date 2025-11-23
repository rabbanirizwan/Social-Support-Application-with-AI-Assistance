import React, { useState } from "react";
import { Form, Input, Button, Tooltip, Card, message } from "antd";
import { useFormContext } from "../../context/FormContext";
import useAiSuggestionHelp from "../../hooks/useAiSuggestionHelp";
import { EditOutlined } from "@ant-design/icons";
import { SuggestionPopup } from "./modal/SuggestionPopup";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const FinancialForm = () => {
  const { form } = useFormContext();
  const aiHelp = useAiSuggestionHelp();
  const {t} = useTranslation()
  const [suggestionPopup, setSuggestionPopup] = useState({
    visible: false,
    targetField: "",
  });
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState("");
  const [currentField, setCurrentField] = useState<{ name: string; label: string; } | null>(null);


  const handleAcceptSuggestion = (suggestion: string) => {
    if (suggestionPopup.targetField) {
               form.setFieldValue(currentField?.name, currentSuggestion);

      message.success(t('MESSAGES.SUGGESTIONAPPLIED'));
    }
    setSuggestionPopup({ visible: false, targetField: "" });
  };

  const handleClosePopup = () => {
    setCurrentSuggestion("");
    setSuggestionPopup({ visible: false, targetField: "" });
  };

  const handleEditSuggestion = (suggestion: string) => {
    
    handleHelpClick(currentField as { name: string; label: string }, suggestion)
    
  };

  const handleHelpClick = async (field: { name: string; label: string }, suggestion="") => {
   
     setCurrentField(field)
    
    const currentValue = form.getFieldValue(field.name);
    
    const value = { label: field.label, prompt: suggestion || currentValue };
  

    if (isGenerating) return;

    setIsGenerating(true);
    try {
    
      aiHelp.mutate(value, {
        onSuccess: (text) => {
         
          setCurrentSuggestion(text);
          setSuggestionPopup({ visible: true, targetField: field.name });
        },
      });
    } catch (error) {
      message.error("Failed to generate suggestion");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Card title={t('STEPS.SITUATION_DESCRIPTION')} className="shadow-lg">
        <div className="space-y-8">
          {[
            { name: "financial", label: t('FIELDS.FINANCIAL') },
            { name: "employment", label: t('FIELDS.EMPLOYMENT') },
            { name: "reason", label: t('FIELDS.REASON') },
          ].map((field) => (
            <div className="space-y-3" key={field.name}>
              <Form.Item
                label={
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                }
                name={field.name}
              >
                <TextArea rows={6} className="resize-y" />
              </Form.Item>

              <Form.Item shouldUpdate>
                {() => {
                  return (
                    <Tooltip title={t('GET_AI_SUGGESTION')}>
                      <Button
                        icon={<EditOutlined />}
                        disabled={aiHelp.isPending}
                        loading={isGenerating}
                        className="flex items-center gap-2"
                        type="dashed"
                        onClick={() => handleHelpClick(field)}
                      >
                        {t('HELP_ME')}
                      </Button>
                    </Tooltip>
                  );
                }}
              </Form.Item>
            </div>
          ))}
        </div>
      </Card>

      <SuggestionPopup
        visible={suggestionPopup.visible}
        onClose={handleClosePopup}
        onAccept={handleAcceptSuggestion}
        onEdit={handleEditSuggestion}
        isLoading={isGenerating}
        suggestion={currentSuggestion}
      />
    </>
  );
};

export default FinancialForm;
