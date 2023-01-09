import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children, user }: { children: any; user: any }) => {
  return (
    <section>
      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <main className="min-h-[calc(100vh-30vh)]"> {children} </main>
        <Footer />
      </div>
    </section>
  );
};

export default Layout;
