import { Card, DatePicker, Form, Input, Select } from "antd";
import CountryInformation from "./PersonalInformation/CountryInformation";
import { useTranslation } from "react-i18next";

export default function PersonalInformation() {
  const { t } = useTranslation();

  return (
    <>
      <Card title={t("STEPS.PERSONAL")} className="shadow-lg">
        <div className="space-y-8">
          {/* NAME */}
          <Form.Item
            label={t("FIELDS.NAME")}
            name="name"
            rules={[{ required: true, message: t("ERRORS.REQUIRED_NAME") }]}
          >
            <Input placeholder={t("PLACEHOLDERS.NAME")} />
          </Form.Item>

          {/* NATIONAL ID */}
          <Form.Item
            label={t("FIELDS.NATIONAL_ID")}
            name="id"
            rules={[
              {
                required: true,
                message: t("ERRORS.REQUIRED_NATIONAL_ID"),
              },
              {
                type: "string",
                max: 11,
                message: t("ERRORS.MAX_LENGTH_NATIONAL_ID"),
              },
              {
                pattern: /^\d*$/,
                message: t("ERRORS.INVALID_NATIONAL_ID"),
              },
            ]}
          >
            <Input placeholder={t("PLACEHOLDERS.NATIONAL_ID")} />
          </Form.Item>

          {/* DATE OF BIRTH */}
          <Form.Item
            label={t("FIELDS.DOB")}
            name="dob"
            rules={[{ required: true, message: t("ERRORS.REQUIRED_DOB") }]}
          >
            <DatePicker placeholder={t("PLACEHOLDERS.DOB")} />
          </Form.Item>

          {/* GENDER */}
          <Form.Item
            label={t("FIELDS.GENDER")}
            name="gender"
            rules={[{ required: true, message: t("ERRORS.REQUIRED_GENDER") }]}
          >
            <Select
              options={[
                { value: "1", label: t("FIELDS.MALE") },
                { value: "2", label: t("FIELDS.FEMALE") },
              ]}
            />
          </Form.Item>

          {/* ADDRESS */}
          <Form.Item
            label={t("FIELDS.ADDRESS")}
            name="address"
            rules={[{ required: true, message: t("ERRORS.REQUIRED_ADDRESS") }]}
          >
            <Input placeholder={t("PLACEHOLDERS.ADDRESS")} />
          </Form.Item>

          {/* PHONE */}
          <Form.Item
            label={t("FIELDS.PHONE")}
            name="phone"
            rules={[
              { required: true, message: t("ERRORS.REQUIRED_PHONE") },
              { pattern: /^[0-9]{9,12}$/, message: t("ERRORS.INVALID_PHONE") },
            ]}
          >
            <Input placeholder={t("PLACEHOLDERS.PHONE")} />
          </Form.Item>

          {/* EMAIL */}
          <Form.Item
            label={t("FIELDS.EMAIL")}
            name="email"
            rules={[
              { required: true, message: t("ERRORS.REQUIRED_EMAIL") },
              { type: "email", message: t("ERRORS.INVALID_EMAIL") },
            ]}
          >
            <Input placeholder={t("PLACEHOLDERS.EMAIL")} />
          </Form.Item>

          {/* COUNTRY INFO COMPONENT */}
          <CountryInformation />
        </div>
      </Card>
    </>
  );
}
