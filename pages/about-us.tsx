import React from "react";
import MetaHead from "../components/Head";
import Layout from "../components/UI/Layout";

const AboutUs = () => {
  return (
    <>
      <MetaHead title="Elma-About-Us" />
      <Layout>
        <section className="container py-20 mx-auto">
          <div className="max-w-[900px] flex flex-col justify-center items-center mx-auto ">
            <div>
              <h1 className="text-3xl font-bold text-green-600">About Us</h1>
            </div>
            <div className="mt-5">
              <p className="text-2xl text-justify">
                Welcome to our e-learning platform! It is a combined,
                interactive and efficient E-Learning Management Approach. We are
                dedicated to providing high-quality online education solutions
                that make learning easy, engaging, and accessible to everyone,
                no matter where they are in the world. we want to make the
                education system more simple and always accessible. We believe
                that education is the key to unlocking human potential, and we
                are committed to helping people reach their full potential
                through the power of e-learning. We believe that learning should
                be interactive, collaborative, and fun, and we have designed our
                platform to reflect those values. By using this approach
                learners will be able to learn anywhere anytime in any
                situation. Thank you for choosing our e-learning platform for
                your educational
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AboutUs;
