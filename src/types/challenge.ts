// 챌린지 타입
export interface Challenge {
  challengeId: number;
  title: string;
  imgSrc: string;
  startDate: string;
  endDate: string;
  participant: number;
  tags?: string[];
  createdAt?: string;
}

// 챌린지 상세 타입 (API 응답 구조)
export interface ChallengeDetail {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  endAt: string;
  thumbnailUrl: string;
  participantsCount: number;
}

// 챌린지 목록 조회 파라미터
export interface ChallengeListParams {
  search?: string;
  sort?: 'new' | 'popular';
  page?: number;
  limit?: number;
}

// 챌린지 목록 응답
export interface ChallengeListResponse {
  challenges: Challenge[];
  totalCount?: number;
  currentPage?: number;
}
