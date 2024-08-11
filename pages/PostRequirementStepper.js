import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function PostRequirementStepper({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [icon, setIcon] = useState("");
  const [video, setVideo] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const toast = useToast();

  const handleAddTag = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    // Handle form submission
    toast({
      title: "Requirement posted.",
      description: "Your data requirement has been posted successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post Your Data Requirement</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {step === 1 && (
              <>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={() => setStep(2)}>Next</Button>
              </>
            )}
            {step === 2 && (
              <>
                <Input
                  placeholder="User"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
                <Input
                  placeholder="Icon URL"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                />
                <Input
                  placeholder="Video URL"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                />
                <Textarea
                  placeholder="Additional Information"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
                <HStack>
                  <Input
                    placeholder="Add Tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                  <Button onClick={handleAddTag}>Add Tag</Button>
                </HStack>
                <HStack spacing={2}>
                  {tags.map((tag, index) => (
                    <Tag key={index} colorScheme="teal">
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                  ))}
                </HStack>
                <HStack>
                  <Button onClick={() => setStep(1)}>Back</Button>
                  <Button colorScheme="teal" onClick={handleSubmit}>
                    Submit
                  </Button>
                </HStack>
              </>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}