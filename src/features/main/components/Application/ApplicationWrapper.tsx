import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetAppByCodeQuery } from "../../store/main.api";
import { selectContentKey } from "../../../app/store/app.slice";

import { Application } from "./Application";

const ApplicationWrapper = () => {
  const { appCode } = useParams();
  const { data, refetch, isFetching } = useGetAppByCodeQuery(appCode || "");
  const contentKey = useSelector(selectContentKey);

  useEffect(() => {
    if (data?.lang !== contentKey) {
      refetch();
    }
  }, [contentKey, appCode]);

  return data && !isFetching && <Application data={data} />;
};

export default ApplicationWrapper;
