import { useState } from "react";
import { Box, FormControl, FormLabel, Input, Textarea, Button, RadioGroup, Radio, Stack, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, VStack, HStack } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import dynamic from 'next/dynamic';
import axios from 'axios';
import { ethers } from "ethers";
import { useContract } from "../utils/useContract";

const ReactMediaRecorder = dynamic(() => import("react-media-recorder").then(mod => mod.ReactMediaRecorder), { ssr: false });

export default function PostRequirement({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [token, setToken] = useState("");
  const [dataType, setDataType] = useState("");
  const [tokenOffered, setTokenOffered] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoOption, setVideoOption] = useState("url");
  const [thumbnail, setThumbnail] = useState("");
  const [additionalData, setAdditionalData] = useState("");
  const toast = useToast();
  const [{ data: accountData }] = useAccount();
  const { contract, account, connectWallet } = useContract();

  const handlePost = async () => {
    if (!account) {
      toast({
        title: "Error",
        description: "Please connect your wallet first.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!accountData?.address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if(!videoUrl && !videoFile) {
      toast({
        title: "Error",
        description: "Please provide a video URL or upload a video.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if(!tokenOffered) {
      toast({
        title: "Error",
        description: "Please provide the number of tokens offered.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const tx = await contract.postRequirement(
        title,
        description,
        videoUrl,
        thumbnail,
        dataType,
        additionalData,
        ethers.utils.parseEther(tokenOffered),
        { value: ethers.utils.parseEther(tokenOffered) }
      );
      await tx.wait();
      toast({
        title: "Requirement Posted",
        description: "Your requirement has been posted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error posting requirement:", error);
      toast({
        title: "Error",
        description: "Failed to post requirement.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleVideoUpload = async () => {
    try {
      const uploadRes = await axios.post('https://api.thetavideoapi.com/upload', {}, {
        headers: {
          'x-tva-sa-id': process.env.NEXT_APP_THETA_SA_ID,
          'x-tva-sa-secret': process.env.NEXT_APP_THETA_API_KEY
        }
      });

      const { presigned_url, id: uploadId } = uploadRes.data.body.uploads[0];

      await axios.put(presigned_url, videoFile, {
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      });

      const transcodeRes = await axios.post('https://api.thetavideoapi.com/video', {
        source_upload_id: uploadId,
        playback_policy: 'public',
        metadata: { title, description }
      }, {
        headers: {
          'x-tva-sa-id': process.env.NEXT_APP_THETA_SA_ID,
          'x-tva-sa-secret': process.env.NEXT_APP_THETA_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      const videoId = transcodeRes.data.body.videos[0].id;
      const videoURL = "https://player.thetavideoapi.com/video/" + videoId;
      setVideoUrl(videoURL);

      toast({
        title: "Video Uploaded",
        description: "Your video has been uploaded successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      console.error("Error uploading video to Theta:", error);
    }
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
                <FormControl id="title" mb={4} isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                </FormControl>
                <FormControl id="description" mb={4} isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </FormControl>
                <Button onClick={() => setStep(2)}>Next</Button>
              </>
            )}
            {step === 2 && (
              <>
                <FormControl id="additionalData" mb={4} isRequired>
                  <FormLabel>Additional Data</FormLabel>
                  <Textarea
                    value={additionalData}
                    onChange={(e) => setAdditionalData(e.target.value)}
                    placeholder="Please provide more information about the data, such as its size, type, or any specific requirements."
                  />
                </FormControl>
                <FormControl id="thumbnail" mb={4} isRequired>
                  <FormLabel>Thumbnail</FormLabel>
                  <Input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="Thumbnail URL" />
                </FormControl>
                <FormControl id="videoOption" mb={4} isRequired>
                  <FormLabel>Video Option</FormLabel>
                  <RadioGroup onChange={setVideoOption} value={videoOption}>
                    <Stack direction="row">
                      <Radio value="url">Video URL</Radio>
                      <Radio value="upload">Upload Video</Radio>
                      <Radio value="record">Record Live Video</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                {videoOption === "url" && (
                  <FormControl id="videoUrl" mb={4} isRequired>
                    <FormLabel>Video URL</FormLabel>
                    <Input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Video URL"
                    />
                  </FormControl>
                )}
                {videoOption === "upload" && (
                  <FormControl id="videoUpload" mb={4} isRequired>
                    <FormLabel>Upload Video</FormLabel>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                    />
                    <Button onClick={handleVideoUpload} colorScheme="blue" mt={2}>Upload Video</Button>
                  </FormControl>
                )}
                {videoOption === "record" && (
                  <FormControl id="videoRecord" mb={4} isRequired>
                    <FormLabel>Record Live Video</FormLabel>
                    <ReactMediaRecorder
                      video
                      render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                        <>
                          <Button onClick={startRecording} colorScheme="blue" mr={2}>Start Recording</Button>
                          <Button onClick={stopRecording} colorScheme="red">Stop Recording</Button>
                          {mediaBlobUrl && (
                            <>
                              <video src={mediaBlobUrl} controls />
                              <Box mt={2} color="blue.500">
                                Once recording is finished, click on the download at the bottom right corner and upload the video.
                              </Box>
                            </>
                          )}
                        </>
                      )}
                    />
                  </FormControl>
                )}
                <FormControl id="dataType" mb={4} isRequired>
                  <FormLabel>Type of Data</FormLabel>
                  <Input
                    type="text"
                    value={dataType}
                    onChange={(e) => setDataType(e.target.value)}
                    placeholder="Experiences, Consumer Data, Location Data, Survey Data, etc."
                  />
                </FormControl>
                <FormControl id="tokenOffered" mb={4} isRequired>
                  <FormLabel>Tokens Offered</FormLabel>
                  <Input
                    type="text"
                    value={tokenOffered}
                    onChange={(e) => setTokenOffered(e.target.value)}
                    placeholder="Tokens Offered (ETH)"
                  />
                </FormControl>
                <HStack>
                  <Button onClick={() => setStep(1)}>Back</Button>
                  <Button colorScheme="teal" onClick={handlePost}>
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