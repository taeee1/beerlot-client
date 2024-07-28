import { CloseIcon } from "@chakra-ui/icons";
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
import Cookies from "js-cookie";
import { useRef } from "react";
import { useUploadMediaMutation } from "../../../../hooks/mutations/useUploadMediaMutation";
import { ReviewStatic } from "../../../../interface/static";
import { OrangeCamera } from "../../../../public/svg";

interface UploadedReviewImagesProps {
  imageUrl: string[];
  setImageUrl: (imageUrl: string[]) => void;
}
export const UploadedReviewImages: React.FC<UploadedReviewImagesProps> = ({
  imageUrl,
  setImageUrl,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";

  const handleDelete = (index: number) => {
    const newImageUrl = imageUrl.filter((_, i) => i !== index);
    setImageUrl(newImageUrl);
  };

  const { mutate, isLoading } = useUploadMediaMutation({
    onSuccess: (data: { urls: string[] }) => {
      const newUrl = data.urls[0];
      setImageUrl([...imageUrl, newUrl]);
    },
    onError: (error: any) => {
      console.error("onError", error);
    },
  });

  const imgRef = useRef<HTMLInputElement>(null);

  const handleChangeImage = async () => {
    if (!imgRef || !imgRef.current || !imgRef.current.files) return;
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("files", file);
    mutate({
      directory: "review",
      formData,
      accessToken,
    });
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
          isLoading={isLoading}
          disabled={imageUrl.length >= ReviewStatic.numberOfMaxAttachedFile}
          _notFirst={{ marginInlineStart: "0px", marginTop: "0px" }}
        >
          <OrangeCamera />
          <Text textStyle="h3" textColor="orange.200">
            사진 첨부하기 ({imageUrl.length}/
            {ReviewStatic.numberOfMaxAttachedFile})
          </Text>
        </Button>
        <Input
          type="file"
          accept="image/*"
          id="attachFileInput"
          onChange={handleChangeImage}
          ref={imgRef}
          disabled={imageUrl.length >= ReviewStatic.numberOfMaxAttachedFile}
          style={{ display: "none" }}
        />
      </FormControl>

      <HStack
        display={imageUrl.length > 0 ? "flex" : "none"}
        overflowX="scroll"
        w="full"
        style={{ marginTop: 0 }}
      >
        {imageUrl.map((fileSrc, index) => {
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
                onClick={() => handleDelete(index)}
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
