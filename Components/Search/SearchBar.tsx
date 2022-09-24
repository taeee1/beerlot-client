import { useRouter } from "next/router";
import styled from "styled-components";
import { SEARCH_BAR_PLACEHOLDER } from "../../Static";

interface itemType {
  id: number;
  name: string;
}

const SearchBar = () => {
  const router = useRouter();
  const items = [
    {
      id: 0,
      name: "츄로스 랜드",
    },
    {
      id: 1,
      name: "칠성사이다 제로",
    },
    {
      id: 2,
      name: "펩시 제로",
    },
    {
      id: 3,
      name: "맛소금",
    },
    {
      id: 4,
      name: "오예스 미니",
    },
    { id: 5, name: "제로" },
  ];

  // const handleOnSearch = (string, results) => {
  //   console.log(string, results);
  // };

  // const handleOnHover = (result) => {
  //    the item hovered
  //   console.log(result);
  // };

  //TODO: url을 id로 하는 게 라우팅 하는 게 최선일 지 생각해보기
  const handleOnSelect = (selectedItem: itemType) => {
    router.push(`/result/${selectedItem.name}`);
  };

  // const formatResult = (item) => {
  //   return (
  //     <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
  //   );
  // };

  return (
    <>
      <SearchBarContainer></SearchBarContainer>
    </>
  );
};

const SearchBarContainer = styled.div`
  margin-top: 10px;

  .wrapper {
    background: #52d5f2;
  }
  svg {
    fill: #fdf9ea;
  }

  input::placeholder {
    font-family: "Roboto";
    font-weight: 700;
    font-size: 12px;
    color: rgba(253, 249, 234, 0.9);
  }
`;

export default SearchBar;
