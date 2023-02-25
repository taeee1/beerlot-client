import {
  Box,
  Card,
  CardBody,
  CardBodyProps,
  CardFooter,
  CardFooterProps,
  CardHeader,
  CardHeaderProps,
  CardProps,
  ImageProps,
  Tag,
  TagLabel,
  TagLabelProps,
  Text,
  TextProps,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import {BeerResponseType} from "../../../typedef/server/beer";

interface BeerCardItemProps extends CardProps {
  beerInfo: BeerResponseType;
  children: React.ReactNode | React.ReactNode[];
}

export const BeerCardItem: React.FC<BeerCardItemProps> = ({
  beerInfo,
  ...props
}) => {
  const {name, origin_country, image_url, category} = beerInfo;
  return (
    <BeerCard {...props}>
      <BeerCardBody>
        {image_url && <Image src={image_url} alt={name} />}
      </BeerCardBody>
      <BeerCardFooter>
        <BeerNameText>{name}</BeerNameText>
        <BeerNameText display="inline">{origin_country}</BeerNameText>
        <BeerCategoryTag>
          <BeerCategoryTagLabel>{category?.name}</BeerCategoryTagLabel>
        </BeerCategoryTag>
      </BeerCardFooter>
    </BeerCard>
  );
};

// card
interface BeerCardProps extends CardProps {
  children: React.ReactNode | React.ReactNode[];
}

export const BeerCard: React.FC<BeerCardProps> = ({children, ...props}) => {
  return (
    <Card
      borderRadius={"12px"}
      border="1px solid"
      borderColor={"orange.300"}
      w="fit-content"
      style={{marginInlineStart: 0}}
      p={2}
      flexShrink={0}
      {...props}
    >
      {children}
    </Card>
  );
};

// header
interface BeerCardHeaderProps extends CardHeaderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const BeerCardHeader: React.FC<BeerCardHeaderProps> = ({
  children,
  ...props
}) => {
  return (
    <CardHeader p={0} {...props}>
      {children}
    </CardHeader>
  );
};

// body
interface BeerCardBodyProps extends CardBodyProps {
  children: React.ReactNode | React.ReactNode[];
}

export const BeerCardBody: React.FC<BeerCardBodyProps> = ({
  children,
  ...props
}) => {
  return (
    <CardBody p={0} {...props}>
      {children}
    </CardBody>
  );
};

// footer
interface BeerCardFooterProps extends CardFooterProps {
  children: React.ReactNode | React.ReactNode[];
}

export const BeerCardFooter: React.FC<BeerCardFooterProps> = ({
  children,
  ...props
}) => {
  return (
    <CardFooter p={0} {...props} flexDir="column">
      {children}
    </CardFooter>
  );
};

// footer
interface BeerNameTextProps extends TextProps {
  children?: string;
}

export const BeerNameText: React.FC<BeerNameTextProps> = ({
  children,
  ...props
}) => {
  return (
    <Text {...props} textStyle={"h4"} textColor="black.100">
      {children}
    </Text>
  );
};

// tag
interface BeerCategoryTagProps extends TextProps {
  children: React.ReactNode | React.ReactNode[];
}

export const BeerCategoryTag: React.FC<BeerCategoryTagProps> = ({
  children,
  ...props
}) => {
  return (
    <Tag
      borderRadius={20}
      bg="orange.300"
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
      p={"0px 5px"}
      {...props}
    >
      {children}
    </Tag>
  );
};

// tag label
interface BeerCategoryTagLabelProps extends TagLabelProps {
  children?: string;
}

export const BeerCategoryTagLabel: React.FC<BeerCategoryTagLabelProps> = ({
  children,
  ...props
}) => {
  return (
    <TagLabel textStyle={"h4"} textColor="white.100" {...props}>
      {children}
    </TagLabel>
  );
};
