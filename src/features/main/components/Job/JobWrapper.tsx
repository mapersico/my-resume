import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetJobByCodeQuery } from "../../store/main.api";
import { selectContentKey } from "../../../app/store/app.slice";

import { Job } from "./Job";

const JobWrapper = () => {
  const { jobCode } = useParams();
  const { data, refetch, isFetching } = useGetJobByCodeQuery(jobCode || "");
  const contentKey = useSelector(selectContentKey);

  useEffect(() => {
    if (data?.lang !== contentKey) {
      refetch();
    }
  }, [contentKey, jobCode]);

  return data && !isFetching && <Job data={data} />;
};

export default JobWrapper;
