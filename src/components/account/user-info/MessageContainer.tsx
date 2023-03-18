import {Text, VStack} from "@chakra-ui/react";
import React from "react";

interface MessageContainerProps {
  nickName: string;
  bio: string;
}

const MessageContainer: React.FC<MessageContainerProps> = ({nickName, bio}) => {
  return (
    <VStack alignItems="flex-start" align="stretch" w="100%">
      {/* margin block start 없애야 함 */}
      <Text textStyle="h2_bold">{nickName}</Text>
      <Text textStyle="h3">{bio}</Text>
    </VStack>
  );
};

export default MessageContainer;
