import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }: any) => {
  return (
    <section>
      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <main className="min-h-[calc(100vh-35vh)] py-7"> {children} </main>
        <Footer />
      </div>
    </section>
  );
};

export default Layout;
