import {
  Box,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {BeerResultType, CategoryType} from "../../../interface/types";
import SearchInput from "../../search/SearchInput";
import {LeftBackRandom} from "../Headers/LeftBackRandom";

interface BeerSearchContentProps extends ModalContentProps {
  onClickBack: () => void;
  onChangeBeerName: (name: string) => void;
}

export const BeerSearchContent: React.FC<BeerSearchContentProps> = ({
  onClickBack,
  onChangeBeerName,
  ...props
}) => {
  const [value, setValue] = useState<string>("");
  // recoil state가 되어야 함.
  const [allBeers, setAllBeers] = useState<BeerResultType[]>([]);
  const MOCK_CATEGORY = [
    {
      id: 0,
      name_ko: "에일",
      name_en: "ale",
      description: "This is ale",
    },
    {
      id: 1,
      name_ko: "라거",
      name_en: "Lagar",
      description: "This is Lagar",
    },
  ];
  const [selectedItems, setSelectedItems] = useState<any[]>(MOCK_CATEGORY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    // setSelectedItems(filterSearchResult(e.target.value));
  };

  const clearValue = () => {
    setValue("");
  };

  const handleClick = (e: any) => {
    const value = e.target.innerHTML;
    onClickBack();
    onChangeBeerName(value);
  };

  return (
    <ModalContent px="20px" {...props}>
      <ModalHeader pt="46px">
        <LeftBackRandom onClick={onClickBack} title="맥주 이름" />
      </ModalHeader>
      <ModalBody p="10px 20px" h="full">
        <VStack
          h="full"
          gap="10px"
          justifyContent="flex-start"
          alignItems={"flex-start"}
        >
          {/* search bar  */}
          <SearchInput onChange={handleChange} clearValue={clearValue} />
          {/* search results */}
          <VStack px="10px">
            {selectedItems.map((item: CategoryType) => {
              return (
                <Box key={item.id} py="10px" onClick={handleClick}>
                  <Text textStyle="h2" textColor={"black.100"}>
                    {item.name_ko}
                  </Text>
                </Box>
              );
            })}
          </VStack>
        </VStack>
      </ModalBody>
    </ModalContent>
  );
};
