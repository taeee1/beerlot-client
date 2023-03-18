import {IconButton} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {BeerlotLogoDefault} from "../../../../public/svg";

const BeerlotTitle = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/`);
  };

  return (
    <IconButton
      px={"0px"}
      borderRadius={"0px"}
      bg="initial"
      _hover={{}}
      _active={{}}
      cursor="pointer"
      w="82px"
      h="34px"
      as={BeerlotLogoDefault}
      aria-label="beerlot-logo"
      onClick={handleClick}
    />
  );
};

export default BeerlotTitle;
