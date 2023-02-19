import {
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {BasicPanelList} from "./tab-panel/BasicPanelList";
import {ReviewPanelList} from "./tab-panel/ReviewPanelList";

interface DetailTabListProps {
  id: number;
  city: string;
  brewary: string;
  calories: number;
  suitableGlass: string;
  desc: string;
  buyFrom: string[]; // FIXME: should be array
  rate: number;
}

export const DetailTabList: React.FC<DetailTabListProps> = ({
  id,
  city,
  brewary,
  calories,
  suitableGlass,
  desc,
  buyFrom,
  rate,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Tabs
        colorScheme="orange"
        w="full"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList px={"18px"}>
          <Tab flexGrow="1" color="orange.100">
            <Text>기본 정보</Text>
          </Tab>
          <Tab flexGrow="1" color="orange.100">
            <Text>리뷰</Text>
          </Tab>
        </TabList>
        <Divider />

        <TabPanels>
          <TabPanel p={0}>
            <BasicPanelList
              id={id}
              city={city}
              brewary={brewary}
              calories={calories}
              suitableGlass={suitableGlass}
              desc={desc}
            />
            <ReviewPanelList rate={rate} />
          </TabPanel>
          <TabPanel p={0}>
            <ReviewPanelList rate={rate} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
