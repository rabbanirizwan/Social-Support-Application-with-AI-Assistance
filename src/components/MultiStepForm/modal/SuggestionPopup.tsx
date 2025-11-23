import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Spin,
  Alert,
  Typography,
  Input,
} from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text,Paragraph  } = Typography;

export interface SuggestionPopupProps {
  visible: boolean;
  onClose: () => void;
  onAccept: (suggestion: string) => void;
  onEdit: (suggestion: string) => void;
  isLoading: boolean;
  error?: string;
  suggestion?: string;
}

export const SuggestionPopup = ({
  visible,
  onClose,
  onAccept,
  onEdit,
  isLoading,
  error,
  suggestion,
}: SuggestionPopupProps) => {
  const { t } = useTranslation();
  const [editableSuggestion, setEditableSuggestion] = useState(suggestion || '');

  // // Update local state when suggestion prop changes
  // useEffect(() => {
  //   setEditableSuggestion(suggestion || '');
  // }, [suggestion]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            {t('AI_SUGGESTION_TITLE', 'AI Writing Suggestion')}
          </span>
        </div>
      }
      footer={
        <div className="flex justify-end gap-3">
          <Button
            icon={<DeleteOutlined />}
            onClick={onClose}
            disabled={isLoading}
          >
            {t('AI_SUGGESTION_DISCARD')}
          </Button>
          <Button
            icon={<EditOutlined />}
            type="default"
            onClick={() => onEdit(editableSuggestion)}
            disabled={isLoading || !editableSuggestion}
          >
            {t('AI_SUGGESTION_EDIT')}
          </Button>
          <Button
            icon={<CheckOutlined />}
            type="primary"
            onClick={() => onAccept(editableSuggestion)}
            disabled={isLoading || !suggestion}
          >
            {t('AI_SUGGESTION_ACCEPT')}
          </Button>
        </div>
      }
      className="max-w-2xl"
      closeIcon={<CloseOutlined />}
    >
      <div className="min-h-64">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Spin size="large" />
            <Text className="mt-4 text-gray-600">
              {t('AI_SUGGESTION_LOADING')}
            </Text>
          </div>
        )}

        {error && (
          <Alert
            message={t('AI_SUGGESTION_ERROR_TITLE', 'Error')}
            description={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

 {suggestion && !isLoading && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <Paragraph className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {suggestion}
            </Paragraph>
          </div>
        )}
        {(!isLoading && suggestion) && (
          <Input.TextArea
            value={editableSuggestion}
            onChange={(e) => setEditableSuggestion(e.target.value)}
            rows={6}
            className="border border-gray-200 rounded-lg p-2 bg-gray-50"
          />
        )}

        {isLoading || error && (
          <div className="text-center py-8 text-gray-500">
            {t(
              'AI_SUGGESTION_NO_SUGGESTION',
              'No suggestion generated. Please try again.'
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
