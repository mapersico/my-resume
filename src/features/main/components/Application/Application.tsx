import { FC } from "react";
import { useSelector } from "react-redux";
import {
  Anchor,
  Badge,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { selectApplicationContent } from "../../../app/store/app.slice";
import { Application as ApplicationModel } from "../../store/main.model";

interface ApplicationProps {
  data: ApplicationModel;
}

export const Application: FC<ApplicationProps> = ({ data }) => {
  const applicationStaticData = useSelector(selectApplicationContent);

  return (
    data &&
    applicationStaticData && (
      <Container py="xl" h={{ base: "auto", md: "calc(100vh - 102px)" }}>
        <Stack pb="xl" gap={0}>
          <Title order={2}>{data.name}</Title>
          <Text fs="italic" c="var(--mantine-color-dark-2)">
            {data.duration}
          </Text>
          <Group pt={5} gap={5}>
            {data.technologies.map((skill, i) => (
              <Badge h={16} px={5} bg={skill.color} key={`${skill}-${i}`}>
                {skill.name}
              </Badge>
            ))}
          </Group>
        </Stack>

        <Container>
          <Title order={3}>{applicationStaticData.aboutTitle}</Title>
          <Text c="var(--mantine-color-dark-1)">{data.about}</Text>
          <Title pt="md" order={3}>
            {applicationStaticData.stackTitle}
          </Title>
          <Text c="var(--mantine-color-dark-1)">{data.stack}</Text>

          <Title pt="md" order={3}>
            {applicationStaticData.linksTitle}
          </Title>
          {data.links.map((repoLink) => (
            <Card key={repoLink.linkId} mt="sm" withBorder>
              <Text>{repoLink.caption} </Text>
              <Anchor
                style={{ lineBreak: "anywhere" }}
                href={repoLink.url}
                target="_blank"
              >
                {repoLink.url}
              </Anchor>
            </Card>
          ))}
        </Container>
      </Container>
    )
  );
};
