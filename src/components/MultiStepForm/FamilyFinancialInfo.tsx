import { Form, Select, InputNumber, Card } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const FamilyFinancialInfo = () => {
  const { t } = useTranslation();

  return (
    <>
      <Card title={t("STEPS.PERSONAL")} className="shadow-lg">
        <div className="space-y-8"></div>

        {/* Marital Status */}
        <Form.Item
          label={t("FIELDS.MARITAL_STATUS")}
          name="maritalStatus"
          rules={[{ required: true, message: t("ERRORS.REQUIRED_MARITAL_STATUS") }]}
        >
          <Select placeholder={t("PLACEHOLDERS.SELECT_MARITAL_STATUS")}>
            <Option value="single">{t("OPTIONS.SINGLE")}</Option>
            <Option value="married">{t("OPTIONS.MARRIED")}</Option>
            <Option value="divorced">{t("OPTIONS.DIVORCED")}</Option>
            <Option value="widowed">{t("OPTIONS.WIDOWED")}</Option>
          </Select>
        </Form.Item>

        {/* Dependents */}
        <Form.Item
          label={t("FIELDS.DEPENDENTS")}
          name="dependents"
          rules={[{ required: true, message: t("ERRORS.REQUIRED_DEPENDENTS") }]}
        >
          <InputNumber
            min={0}
            placeholder={t("PLACEHOLDERS.ENTER_DEPENDENTS")}
            className="w-full"
          />
        </Form.Item>

        {/* Employment Status */}
        <Form.Item
          label={t("FIELDS.EMPLOYMENT_STATUS")}
          name="employmentStatus"
          rules={[{ required: true, message: t("ERRORS.REQUIRED_EMPLOYMENT_STATUS") }]}
        >
          <Select placeholder={t("PLACEHOLDERS.SELECT_EMPLOYMENT_STATUS")}>
            <Option value="employed">{t("OPTIONS.EMPLOYED")}</Option>
            <Option value="selfEmployed">{t("OPTIONS.SELF_EMPLOYED")}</Option>
            <Option value="unemployed">{t("OPTIONS.UNEMPLOYED")}</Option>
            <Option value="student">{t("OPTIONS.STUDENT")}</Option>
            <Option value="retired">{t("OPTIONS.RETIRED")}</Option>
          </Select>
        </Form.Item>

        {/* Monthly Income */}
        <Form.Item
          label={t("FIELDS.MONTHLY_INCOME")}
          name="monthlyIncome"
          rules={[{ required: true, message: t("ERRORS.REQUIRED_MONTHLY_INCOME") }]}
        >
          <InputNumber
            min={0}
            placeholder={t("PLACEHOLDERS.ENTER_MONTHLY_INCOME")}
            className="w-full"
            formatter={(value) => `$ ${value}`}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        {/* Housing Status */}
        <Form.Item
          label={t("FIELDS.HOUSING_STATUS")}
          name="housingStatus"
          rules={[{ required: true, message: t("ERRORS.REQUIRED_HOUSING_STATUS") }]}
        >
          <Select placeholder={t("PLACEHOLDERS.SELECT_HOUSING_STATUS")}>
            <Option value="owned">{t("OPTIONS.OWNED")}</Option>
            <Option value="rented">{t("OPTIONS.RENTED")}</Option>
            <Option value="mortgaged">{t("OPTIONS.MORTGAGED")}</Option>
            <Option value="livingWithFamily">{t("OPTIONS.LIVING_WITH_FAMILY")}</Option>
          </Select>
        </Form.Item>
      </Card>
    </>
  );
};

export default FamilyFinancialInfo;
