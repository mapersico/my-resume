import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Flex, Title } from "@mantine/core";

import Profile from "../Profile/Profile";
import Skills from "../Skills/Skills";
import { Application } from "../Application/Application";

import { useGetAllAppsQuery, useGetAllJobsQuery } from "../../store/main.api";
import { Job } from "../Job/Job";
import {
  selectContentKey,
  selectFullviewContent,
} from "../../../app/store/app.slice";

const Fullview = () => {
  const { data: jobs, refetch: refetchJobs } = useGetAllJobsQuery();
  const { data: applications, refetch: refetchApps } = useGetAllAppsQuery();
  const contentKey = useSelector(selectContentKey);
  const [currentLang, setCurrentLang] = useState(contentKey);
  const fullviewStaticContent = useSelector(selectFullviewContent);

  useEffect(() => {
    if (contentKey !== currentLang) {
      refetchJobs();
      refetchApps();
    }
    setCurrentLang(contentKey);
  }, [contentKey]);

  return (
    <Flex w="100%" justify="center" direction="column">
      <Profile />
      <Skills />
      <Container>
        <Title>{fullviewStaticContent?.careerTitle}</Title>
      </Container>
      {jobs?.map((job) => (
        <Job key={job.jobId} data={job} />
      ))}
      <Container>
        <Title>{fullviewStaticContent?.freelanceTitle}</Title>
      </Container>
      {applications?.map((app) => (
        <Application key={app.applicationId} data={app} />
      ))}
    </Flex>
  );
};

export default Fullview;
