import {HStack, Text, TextProps, VStack} from "@chakra-ui/react";
import React, {ReactNode} from "react";

interface BasicPanelListProps {
  beerDetailInfo: beerDetailType;
}

export type beerDetailType = {
  id: number;
  city: string;
  brewary: string;
  calories: number; // TODO: 사용하는 곳에서 string으로 wrapping하기
  suitableGlass: string; // TODO: 어울리는 잔 추후에 enum 타입으로 들고 있기
  desc: string;
};

export const BasicPanelList: React.FC<BasicPanelListProps> = ({
  beerDetailInfo,
}) => {
  const {
    city,
    brewary,
    calories, // TODO: 사용하는 곳에서 string으로 wrapping하기
    suitableGlass, // TODO: 어울리는 잔 추후에 enum 타입으로 들고 있기
    desc,
  } = beerDetailInfo;

  const stringedCalories = `${calories}kcal (355 ml 기준)`; // TODO: 함수 처리 && 용량 enum화
  return (
    <VStack w="full" p="20px" gap="10px" alignItems="flex-start">
      <Text textStyle="h2_bold">기본 정보</Text>
      <BeerInfoHStack label={"제조도시"} desc={city} />
      <BeerInfoHStack label={"브루어리"} desc={brewary} />
      <BeerInfoHStack label={"칼로리"} desc={stringedCalories} />
      <BeerInfoHStack label={"어울리는 잔"} desc={suitableGlass} />
      <BeerInfoHStack label={"한 줄 소개"} desc={desc} />
    </VStack>
  );
};

interface BeerInfoHStackProps extends TextProps {
  label: string;
  desc?: string;
  children?: ReactNode;
}

export const BeerInfoHStack: React.FC<BeerInfoHStackProps> = ({
  label,
  desc,
  children,
  ...props
}) => {
  return (
    <HStack gap="16px" w="full" alignItems={"start"}>
      <Text textStyle="h3" color="gray.300" flexBasis={"68px"} {...props}>
        {label}
      </Text>
      {children}
      {desc && (
        <Text flex={1} textStyle="h3" textColor={"black.100"}>
          {desc}
        </Text>
      )}
    </HStack>
  );
};
