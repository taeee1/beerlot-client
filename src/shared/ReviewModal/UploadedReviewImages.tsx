import {CloseIcon} from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import {useRef, useState} from "react";
import {ReviewStatic} from "../../../interface/static";
import {OrangeCamera} from "../../../public/svg";

export const UploadedReviewImages = () => {
  const [imgFile, setImgFile] = useState<string[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  const onClickDelete = (index: number) => {
    const newImgFile = imgFile.filter((_, i) => i !== index);
    setImgFile(newImgFile);
  };

  const handleChangeImage = () => {
    if (imgFile.length >= ReviewStatic.numberOfMaxAttachedFile) return;
    if (
      !imgRef ||
      !imgRef.current ||
      !imgRef.current.files ||
      imgRef.current.files.length === 0
    )
      return;
    const file = imgRef.current.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("reader.result", reader.result);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const newImgFile = [...imgFile, reader.result];
        setImgFile(newImgFile);
      }
    };
  };

  return (
    <>
      <FormControl>
        <Button
          htmlFor="attachFileInput"
          as={FormLabel}
          w="full"
          bg="inherit"
          _hover={{}}
          border="1px solid"
          borderColor="orange.200"
          borderRadius="10px"
          p="5px 10px"
          aria-label="attach-photo"
          gap="10px"
          mt="0px"
          disabled={imgFile.length >= ReviewStatic.numberOfMaxAttachedFile}
          _notFirst={{marginInlineStart: "0px", marginTop: "0px"}}
        >
          <OrangeCamera />
          <Text textStyle="h3" textColor="orange.200">
            사진 첨부하기 ({imgFile.length}/
            {ReviewStatic.numberOfMaxAttachedFile})
          </Text>
        </Button>
        <Input
          type="file"
          accept="image/*"
          id="attachFileInput"
          onChange={handleChangeImage}
          ref={imgRef}
          disabled={imgFile.length >= ReviewStatic.numberOfMaxAttachedFile}
          style={{display: "none"}}
        />
      </FormControl>

      <HStack
        display={imgFile.length > 0 ? "flex" : "none"}
        overflowX="scroll"
        w="full"
        style={{marginTop: 0}}
      >
        {imgFile.map((fileSrc, index) => {
          return (
            <Box key={fileSrc} boxSize="80px" position="relative">
              <Image
                borderRadius={10}
                src={fileSrc}
                alt={"review pictures"}
                w="full"
                h="full"
              />
              <Button
                w={"18px"}
                h={"18px"}
                p={0}
                bg="black.200"
                borderRadius={"full"}
                position="absolute"
                top={1}
                right={1}
                onClick={() => onClickDelete(index)}
              >
                <CloseIcon color="white.100" w={"4px"} h={"4px"} />
              </Button>
            </Box>
          );
        })}
      </HStack>
    </>
  );
};
