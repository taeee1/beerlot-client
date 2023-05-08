import {Image, ImageProps} from "@chakra-ui/react";
import React from "react";

const CommonBeerImage: React.FC<ImageProps> = ({...props}) => {
  return (
    <Image
      fallbackSrc={"/images/beer-preview-default-image.jpg"}
      {...props}
      alt={props?.alt ?? "beer image"}
    />
  );
};

export {CommonBeerImage};
