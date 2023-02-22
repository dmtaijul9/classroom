import React from "react";
import Layout from "../components/UI/Layout";

const AboutUs = () => {
  return (
    <Layout>
      <section className="container py-20 mx-auto">
        <div className="max-w-[500px] mx-auto ">
          <div>
            <h1 className="text-3xl font-bold">About Us</h1>
          </div>
          <div className="mt-5">
            <p>
              It is a combined, interactive and efficient E-Learning Management
              Approach. we want to make the education system more simple and
              always accessible. by using this approach learners will be able to
              learn anywhere anytime in any situation.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
