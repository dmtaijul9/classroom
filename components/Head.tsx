import React from "react";
import Head from "next/head";

const MetaHead = ({ title }: { title: string }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="E-Learning Management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default MetaHead;
