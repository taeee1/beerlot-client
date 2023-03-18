import {Text} from "@chakra-ui/react";

interface WelcomeTextContentProps {
  username?: string;
}

export const WelcomeTextContent: React.FC<WelcomeTextContentProps> = ({
  username,
}) => {
  return (
    <>
      <Text textStyle={"h1"} color={"black.100"}>
        👋 어서와요{" "}
        {username && (
          <>
            <Text color={"orange.200"} textStyle={"h1"} display="inline">
              {username}
            </Text>
            <Text display="inline">님!</Text>
          </>
        )}
      </Text>
      <Text color={"black.100"} textStyle={"h1"}>
        오늘은 어떤 맥주를 마셔볼까요?
      </Text>
    </>
  );
};
