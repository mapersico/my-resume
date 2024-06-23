import { Text } from "@mantine/core";

export const processString = (
  text: string,
  brandColor?: string
): (string | JSX.Element)[] => {
  const proccessedString: (JSX.Element | string)[] = [];
  const words = text.split(" ");

  words.forEach((word, index) => {
    const regex = /(b|i)\{\{(.+?)\}\}([.,;:]?)$/;
    const match = word.match(regex);

    if (match) {
      const type = match[1];
      const content = match[2];
      const specialChar = match[3];

      if (type === "b") {
        proccessedString.push(
          <Text inherit c={brandColor || ""} fw="bold" span key={index}>
            {" "}
            {content + specialChar}{" "}
          </Text>
        );
      } else if (type === "i") {
        proccessedString.push(
          <Text inherit c={brandColor || ""} fs="italic" span key={index}>
            {" "}
            {content + specialChar}{" "}
          </Text>
        );
      }
    } else {
      proccessedString.push(` ${word} `);
    }
  });

  return proccessedString;
};
