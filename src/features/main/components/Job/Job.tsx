import { FC } from "react";
import {
  Badge,
  Box,
  Container,
  Divider,
  Group,
  Text,
  Title,
} from "@mantine/core";

import { Job as JobModel } from "../../store/main.model";

interface JobProps {
  data: JobModel;
}

export const Job: FC<JobProps> = ({ data }) => {
  return (
    data && (
      <Container py="xl">
        <Title order={2}>{data.title}</Title>
        <Text fs="italic" c="var(--mantine-color-dark-2)">
          {data.fromTo}
        </Text>
        <Text pb="sm" c="var(--mantine-color-dark-1)">
          {data.description}
        </Text>
        {data.positions.map((position, i) => (
          <Container
            px={{ base: 5, md: "md" }}
            pt="sm"
            key={`${position.positionId}-${i}`}
          >
            <Title order={3}>{position.title}</Title>
            <Text fs="italic" pb={0} c="var(--mantine-color-dark-2)">
              {position.fromTo}
            </Text>
            {position.projects.map((project, i) => (
              <Box key={`${project.projectId}-${i}`}>
                {i ? <Divider mx="md" /> : null}
                <Container px={{ base: 5, md: "md" }} py="lg">
                  <Title order={4}>{project.title}</Title>
                  <Text c="var(--mantine-color-dark-1)">
                    {project.description}
                  </Text>
                  <Group pt={5} gap={5}>
                    {project.technologies.map((skill, i) => (
                      <Badge
                        h={16}
                        px={5}
                        bg={skill.color}
                        key={`${skill.skillId}-${i}`}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </Group>
                </Container>
              </Box>
            ))}
          </Container>
        ))}
      </Container>
    )
  );
};
