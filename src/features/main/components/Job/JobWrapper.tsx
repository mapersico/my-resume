import { useParams } from "react-router-dom";
import { useGetJobByCodeQuery } from "../../store/main.api";
import { selectContentKey } from "../../../app/store/app.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Job } from "./Job";

export const JobWrapper = () => {
  const { jobCode } = useParams();
  const { data, refetch } = useGetJobByCodeQuery(jobCode || "");
  const contentKey = useSelector(selectContentKey);

  useEffect(() => {
    if (data?.lang !== contentKey) {
      refetch();
    }
  }, [contentKey, jobCode]);

  return data && <Job data={data} />;
};
