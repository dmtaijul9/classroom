import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import MetaHead from "../../components/Head";
import Layout from "../../components/UI/Layout";
import { dateParsing } from "../../lib/Tools";

const fetchNotice = (noticeId: any) => {
  return axios.get(`/api/notice?noticeId=${noticeId}`);
};

const SingleNoticePage = () => {
  const router = useRouter();
  const { noticeId } = router.query;

  const { data, isLoading, isError, error } = useQuery(
    ["Note", noticeId],
    () => fetchNotice(noticeId),
    {
      enabled: !!noticeId,
    }
  );

  if (isLoading) {
    return (
      <Layout>
        <section>
          <div>
            <h1> Loading... </h1>
          </div>
        </section>
      </Layout>
    );
  }
  return (
    <>
      {" "}
      <MetaHead title="Elma-notice" />
      <Layout>
        <section className="max-w-5xl mx-auto mt-3">
          <div className="px-4 py-3 text-white bg-gray-700 rounded-md">
            <h1>
              <span className="font-semibold ">Notice : </span>{" "}
              {dateParsing(data?.data.notice.createdAt)}{" "}
            </h1>
          </div>
          <div className="mt-5 border min-h-[500px] p-5 rounded-md shadow-md">
            {!isLoading && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.data.noticeText,
                }}
                className="w-full overflow-x-auto"
              ></div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SingleNoticePage;
