export interface BeerResultType {
  id: number;
  name_ko: string;
  name_en: string;
  description: string;
  country: CountryType;
  volume: number;
  image_url: string;
  category: {
    id: number;
    name_ko: string;
    name_en: string;
    description: string;
    parent: TagType;
  };
  tags: TagType[];
  like_count: number;
  review_count: number;
  rate: number;
}

interface TagType {
  id: number;
  name_ko: string;
  name_en: string;
  description: string;
}

interface CountryType {
  code: string;
  name_ko: string;
  name_en: string;
}

// {
//     "id": 1,
//     "name_ko": "빅 웨이브",
//     "name_en": "Bigwave",
//     "description": "미묘한 과일 향과 섬세한 홉 향이 나는 가벼운 골든 에일입니다. 부드럽고 마시기 좋은 상쾌한 에일입니다. 가볍게 볶은 허니 몰트는 이 맥주의 황금빛 색조에 기여하고 우리의 특별한 홉 블렌드로 균형을 이루는 약간의 단맛을 제공합니다.",
//     "country": {
//       "code": "US",
//       "name_ko": "미국",
//       "name_en": "The United States"
//     },
//     "volume": 4.4,
//     "image_url": "returned_from_server: <base_url>/<file_name>",
//     "category": {
//       "id": 1,
//       "name_ko": "아메리칸 블론드 에일",
//       "name_en": "American Blonde Ale",
//       "description": "아메리칸 블론드 에일은...",
//       "parent": {
//         "id": 10,
//         "name_ko": "에일",
//         "name_en": "Ale",
//         "description": "에일은..."
//       }
//     },
//     "tags": [
//       {
//         "id": 1,
//         "name_ko": "시트라",
//         "name_en": "Citra",
//         "description": "시트라 홉은..."
//       }
//     ],
//     "like_count": 13,
//     "review_count": 2,
//     "rate": 4.25
//   }
