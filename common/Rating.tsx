import { HStack, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { OrangeStar } from "./custom-icons/customIcons";

interface RatingProps {
  starSize?: number;
  styleProps?: any;
}

export const Rating: React.FC<RatingProps> = ({
  starSize = 40,
  styleProps,
}) => {
  const [rating, setRating] = useState(0);
  const handleClick = (idx: number) => {
    setRating(idx);
  };

  return (
    <HStack {...styleProps}>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <IconButton
            key={star}
            aria-label="star"
            as={OrangeStar}
            fontSize={`${starSize}px`}
            color={star <= rating ? "orange.200" : "white"}
            size={`${starSize}px`}
            onClick={() => handleClick(star)}
          />
        );
      })}
    </HStack>
  );
};
