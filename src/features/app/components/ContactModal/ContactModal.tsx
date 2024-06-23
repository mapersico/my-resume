import { FC } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconEdit, IconMail, IconUser } from "@tabler/icons-react";

import { selectContactFormContent } from "../../store/app.slice";
import { IContactFormField } from "../../store/app.model";
import { useForm } from "@mantine/form";
import { useSendContactMutation } from "../../store/app.api";
import { Loader } from "../Loader/Loader";

interface ContactModalProps {
  opened: boolean;
  close: () => void;
}

export const ContactModal: FC<ContactModalProps> = ({ opened, close }) => {
  const [sendContact, { isLoading }] = useSendContactMutation();
  const contactCaption = useSelector(selectContactFormContent);
  const contactForm = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.subject) {
        errors.subject = "Subject is required";
      }
      if (!values.message) {
        errors.message = "Message is required";
      }
      return errors;
    },
  });

  const renderField = (input: IContactFormField) => {
    switch (input.name) {
      case "name":
        return (
          <TextInput
            withAsterisk
            w="100%"
            leftSection={<IconUser size={18} />}
            {...input}
            {...contactForm.getInputProps(input.name)}
          />
        );
      case "email":
        return (
          <TextInput
            withAsterisk
            leftSection={<IconMail size={18} />}
            {...input}
            {...contactForm.getInputProps(input.name)}
          />
        );
      case "subject":
        return (
          <TextInput
            withAsterisk
            leftSection={<IconEdit size={18} />}
            {...input}
            {...contactForm.getInputProps(input.name)}
          />
        );
      case "message":
        return (
          <Textarea
            withAsterisk
            leftSection={<IconEdit size={18} />}
            {...input}
            {...contactForm.getInputProps(input.name)}
          />
        );
    }
  };

  return (
    contactCaption && (
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={contactCaption.title}
      >
        {isLoading && <Loader pos="relative" />}
        <form
          onSubmit={contactForm.onSubmit(async (values) => {
            await sendContact(values);
            contactForm.reset();
            close();
          })}
        >
          <Stack gap="md">
            <SimpleGrid cols={1}>
              {renderField(contactCaption.nameInput)}
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
              {renderField(contactCaption.emailInput)}
              {renderField(contactCaption.subjectInput)}
            </SimpleGrid>
            <SimpleGrid cols={1}>
              {renderField(contactCaption.messageInput)}
            </SimpleGrid>
            <Group justify="flex-end">
              <Button
                disabled={isLoading}
                type="submit"
                color="var(--mantine-color-blue-9)"
              >
                {contactCaption.submitAction}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    )
  );
};
