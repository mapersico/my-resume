import { useSelector } from "react-redux";
import {
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { selectSkillsContent } from "../../../app/store/app.slice";
import { useGetSkillsQuery } from "../../store/main.api";
import {
  IconApi,
  IconBrandAngular,
  IconBrandBootstrap,
  IconBrandCSharp,
  IconBrandJavascript,
  IconBrandMysql,
  IconBrandNodejs,
  IconBrandPhp,
  IconBrandReact,
  IconBrandRedux,
  IconBrandSass,
  IconBrandSocketIo,
  IconBrandSvelte,
  IconBrandTypescript,
  IconBrandVue,
  IconDatabase,
  IconJetpack,
  IconSunglasses,
} from "@tabler/icons-react";

import { ProgressBar } from "../ProgressBar/ProgressBar";
import { ReactElement } from "react";

const ICONS: { [key: string]: ReactElement } = {
  IconApi: <IconApi size={18} />,
  IconBrandAngular: <IconBrandAngular size={18} />,
  IconBrandJavascript: <IconBrandJavascript size={18} />,
  IconBrandMysql: <IconBrandMysql size={18} />,
  IconBrandNodejs: <IconBrandNodejs size={18} />,
  IconBrandReact: <IconBrandReact size={18} />,
  IconBrandRedux: <IconBrandRedux size={18} />,
  IconBrandSass: <IconBrandSass size={18} />,
  IconBrandTypescript: <IconBrandTypescript size={18} />,
  IconBrandVue: <IconBrandVue size={18} />,
  IconDatabase: <IconDatabase size={18} />,
  IconBrandCSharp: <IconBrandCSharp size={18} />,
  IconSunglasses: <IconSunglasses size={18} />,
  IconBrandBootstrap: <IconBrandBootstrap size={18} />,
  IconBrandSvelte: <IconBrandSvelte size={18} />,
  IconBrandPhp: <IconBrandPhp size={18} />,
  IconJetpack: <IconJetpack size={18} />,
  IconBrandSocketIo: <IconBrandSocketIo size={18} />,
};

export const Skills = () => {
  const skillsContent = useSelector(selectSkillsContent);
  const { data: skill } = useGetSkillsQuery();

  return (
    skill &&
    skillsContent && (
      <Container py="xl">
        <Title order={2}>{skillsContent.title}</Title>
        <Text fz="md" fs="italic" c="var(--mantine-color-dark-2)">
          {skillsContent.description}
        </Text>
        <SimpleGrid
          py="lg"
          spacing={35}
          cols={{ base: 1, sm: 1, md: 2, lg: 4 }}
        >
          {skill.map((skill, i) => (
            <Stack miw={225} key={skill.skillId} gap={5}>
              <Group justify="space-between">
                <Group gap={5}>
                  {ICONS[skill.icon as keyof typeof ICONS]}
                  <Text fw="bold">{skill.name}</Text>
                </Group>
                <Text fw="bold">{skill.percent}%</Text>
              </Group>
              <ProgressBar
                widthPercent={skill.percent}
                delayAnimation={i * 15}
              />
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    )
  );
};
