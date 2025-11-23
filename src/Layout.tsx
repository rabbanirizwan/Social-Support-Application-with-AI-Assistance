import { Button, ConfigProvider, Layout } from "antd";
import MultiStepFormContainer from "./components/MultiStepContainer";
const { Header, Footer, Content } = Layout;
import enUS from "antd/es/locale/en_US";
import arEG from "antd/es/locale/ar_EG";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AppLayout() {
  const { i18n, t } = useTranslation();
  const [locale, setLocale] = useState(enUS);

  const toggleLocale = () => {
    if (locale === enUS) {
      i18n.changeLanguage("ar");
      setLocale(arEG);
    } else {
      i18n.changeLanguage("en");
      setLocale(enUS);
    }
  };
  return (
    <ConfigProvider locale={locale} direction={locale === arEG ? "rtl" : "ltr"}>
      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#001529",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ color: "#fff", margin: 0 }}>My App</h2>
          <Button size="small" onClick={toggleLocale}>
            {t("SWITCH_LANGUAGE")}
          </Button>
        </Header>

        {/* Page content */}
        <Content style={{ padding: "24px" }}>
          <MultiStepFormContainer />
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} My App. All Rights Reserved.
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

