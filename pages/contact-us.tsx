import React from "react";
import ContactForm from "../components/ContactForm";
import MetaHead from "../components/Head";
import Layout from "../components/UI/Layout";

const ContactUs = () => {
  return (
    <>
      <MetaHead title="Elma-Contact-us" />
      <Layout>
        <ContactForm />
      </Layout>
    </>
  );
};

export default ContactUs;
