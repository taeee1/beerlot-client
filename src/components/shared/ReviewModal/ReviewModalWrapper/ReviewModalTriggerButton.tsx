import { Button, ButtonProps } from "@chakra-ui/react";
import { EditPencil } from "../../../../../public/svg";

interface ReviewModalTriggerButtonProps extends ButtonProps {}

export const ReviewModalTriggerButton: React.FC<
  ReviewModalTriggerButtonProps
> = ({ ...props }) => {
  return (
    <Button
      w="70px"
      h="70px"
      pos="fixed"
      borderRadius="full"
      bg="orange.300"
      bottom={100}
      right={"10vw"}
      _hover={{}}
      {...props}
    >
      <EditPencil />
    </Button>
  );
};
