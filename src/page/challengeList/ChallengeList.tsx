import SearchFilterBar from '@/components/ui/SearchFilterBar';
import ChallengeCard from '@/components/ui/ChallengeCard';

const mockData = [
  {
    title: '갑자기 바다보고 오기!!!',
    imgSrc: '/public/listexam1.png',
    startDate: '2025.11.22',
    endDate: '2025.11.23',
    participant: 112,
  },
  {
    title: '비오는 날 비 맞으면서 걷기',
    imgSrc: '/public/listexam2.png',
    startDate: '2025.11.23',
    endDate: '2025.11.24',
    participant: 55,
  },
  {
    title: '본가에 강아지 보러 다녀오기',
    imgSrc: '/public/listexam3.png',
    startDate: '2025.11.24',
    endDate: '2025.11.25',
    participant: 23,
  },

  {
    title: '겨울에 아이스크림 먹기!',
    imgSrc: '/public/listexam4.png',
    startDate: '2025.11.25',
    endDate: '2025.11.26',
    participant: 241,
  },
  {
    title: '잠시 노트북 덮고 쉬자',
    imgSrc: '/public/listexam5.png',
    startDate: '2025.11.26',
    endDate: '2025.11.27',
    participant: 79,
  },
];

const ChallengeList = () => {
  return (
    <div className="w-full flex flex-col gap-3 items-center overflow-y-scroll">
      <SearchFilterBar />
      {mockData.map((item, idx) => (
        <ChallengeCard key={idx} {...item} />
      ))}
    </div>
  );
};
export default ChallengeList;
