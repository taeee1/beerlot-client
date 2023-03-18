import {Button, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";

const EditProfileButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`account/edit`);
  };

  return (
    <Button
      w="100%"
      p="4px"
      bg="orange.200"
      borderRadius="5px"
      textColor="white.100"
      onClick={handleClick}
    >
      <Text textStyle="h3">프로필 편집</Text>
    </Button>
  );
};

export default EditProfileButton;
