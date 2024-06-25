import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCalendar,
  IconMail,
  IconMap,
  IconPhone,
} from "@tabler/icons-react";

import ResumeImage from "../../../../assets/resume-profile.webp";

import { ProgressBar } from "../ProgressBar/ProgressBar";
import { useGetProfileQuery } from "../../store/main.api";
import { selectContentKey } from "../../../app/store/app.slice";
import MarkdownRenderer from "../../../app/components/MarkdownRenderer/MarkdownRenderer";

const CONTACT_ICONS = {
  IconPhone: <IconPhone />,
  IconMail: <IconMail />,
  IconMap: <IconMap />,
  IconCalendar: <IconCalendar />,
};

const Profile: FC = () => {
  const { data: profileData, refetch } = useGetProfileQuery();
  const contentKey = useSelector(selectContentKey);
  const theme = useMantineTheme();
  const mobileBreakpoint = useMediaQuery(
    `(max-width: ${theme.breakpoints.md})`
  );

  useEffect(() => {
    if (contentKey !== profileData?.lang) refetch();
  }, [contentKey]);

  return (
    profileData && (
      <Container py="xl">
        <Stack pt="6%" h="90%" justify="center">
          <Group
            justify={mobileBreakpoint ? "center" : "space-between"}
            gap="xl"
          >
            <Avatar
              style={{ border: "2px solid var(--mantine-color-blue-8)" }}
              w={275}
              h={275}
              radius="50%"
              src={ResumeImage}
              alt="Profile Resume"
            />
            <Stack maw={600}>
              <Title order={2}>
                {profileData.title.split(",")[0]},{" "}
                <Text
                  variant="gradient"
                  inherit
                  span
                  gradient={{
                    from: "var(--mantine-color-blue-8)",
                    to: "var(--mantine-color-blue-4)",
                    deg: 90,
                  }}
                >
                  {profileData.title.split(",")[1]}
                </Text>
              </Title>
              <Text c="var(--mantine-color-dark-2)">
                <MarkdownRenderer markdownText={profileData.description} />
              </Text>
              <Title order={4}>{profileData.contactTitle}</Title>
              <SimpleGrid
                c="var(--mantine-color-dark-2)"
                w="100%"
                cols={{ base: 1, sm: 2, md: 2 }}
              >
                {profileData.contacts.map((contact) => (
                  <Group key={contact.contactId} gap={5}>
                    {CONTACT_ICONS[contact.icon as keyof typeof CONTACT_ICONS]}
                    <Text>{contact.name}</Text>
                  </Group>
                ))}
              </SimpleGrid>
            </Stack>
          </Group>
          <Box mt={25}>
            <SimpleGrid spacing={50} cols={{ base: 1, sm: 1, md: 2 }}>
              <Box>
                <Title pb="lg" order={4}>
                  {profileData.languagesTitle}
                </Title>
                <Stack c="var(--mantine-color-dark-1)">
                  {profileData.languages.map((language) => (
                    <Stack key={language.name} gap={5}>
                      <Group w="100%" justify="space-between">
                        <Text span>
                          {language.name} ({language.level})
                        </Text>
                        <Box>{language.percent}%</Box>
                      </Group>
                      <ProgressBar
                        widthPercent={language.percent}
                        delayAnimation={0}
                      />
                    </Stack>
                  ))}
                </Stack>
              </Box>
              <Box>
                <Title pb="lg" order={4}>
                  {profileData.educationTitle}
                </Title>
                <Stack c="var(--mantine-color-dark-1)">
                  {profileData.educations.map((education) => (
                    <Stack key={education.educationId} gap={5}>
                      <Text>{education.name}</Text>
                      <Text c="var(--mantine-color-dark-2)" fs="italic">
                        {education.fromTo}
                      </Text>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>
    )
  );
};

export default Profile;
