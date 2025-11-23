import { Form, Select } from "antd";
import {
  useCities,
  useCountries,
  useStates,
} from "../../../hooks/useLocationQueries";
import { useTranslation } from "react-i18next";

const CountryInformation = () => {
  const form = Form.useFormInstance();
  const { t } = useTranslation();

  const country = Form.useWatch("country", form);
  const state = Form.useWatch("state", form);

  const { data: countries, isLoading: loadingCountries } = useCountries();
  const { data: states, isLoading: loadingStates } = useStates(country);
  const { data: cities, isLoading: loadingCities } = useCities(country, state);

  const handleCountryChange = () => {
    // Reset state and city when country changes
    form.setFieldValue("state", "");
    form.setFieldValue("city", "");
  };

  const handleStateChange = () => {
    // Reset city when state changes
    form.setFieldValue("city", "");
  };

  return (
    <>
      {/* Country */}
      <Form.Item
        label={t("FIELDS.COUNTRY")}
        name="country"
        rules={[{ required: true, message: t("ERRORS.REQUIRED_COUNTRY") }]}
      >
        <Select
          placeholder={t("PLACEHOLDERS.SELECT_COUNTRY")}
          loading={loadingCountries}
          onChange={handleCountryChange}
          showSearch
        >
          {countries?.map((c: any) => (
            <Select.Option key={c} value={c}>
              {c}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* State */}
      <Form.Item
        label={t("FIELDS.STATE")}
        name="state"
        rules={[{ required: true, message: t("ERRORS.REQUIRED_STATE") }]}
      >
        <Select
          placeholder={t("PLACEHOLDERS.SELECT_STATE")}
          loading={loadingStates}
          onChange={handleStateChange}
          disabled={!states || states.length === 0}
        >
          {states?.map((s: any) => (
            <Select.Option key={s} value={s}>
              {s}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* City */}
      <Form.Item
        label={t("FIELDS.CITY")}
        name="city"
        rules={[{ required: true, message: t("ERRORS.REQUIRED_CITY") }]}
      >
        <Select
          placeholder={t("PLACEHOLDERS.SELECT_CITY")}
          loading={loadingCities}
          disabled={!cities || cities.length === 0}
        >
          {cities?.map((city: string) => (
            <Select.Option key={city} value={city}>
              {city}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default CountryInformation;
