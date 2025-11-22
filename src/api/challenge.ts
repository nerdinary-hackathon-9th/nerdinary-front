import { api } from '@/lib/ky';

// 챌린지 목록 응답 타입
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

export interface ChallengeListParams {
  search?: string;
  sort?: 'new' | 'popular';
  page?: number;
  limit?: number;
}

export interface ChallengeListResponse {
  challenges: Challenge[];
  totalCount?: number;
  currentPage?: number;
}

export const challengeAPI = {
  // 챌린지 목록 조회
  getList: async (params?: ChallengeListParams): Promise<ChallengeListResponse> => {
    const searchParams = new URLSearchParams();

    if (params?.search) searchParams.append('search', params.search);
    if (params?.sort) searchParams.append('sort', params.sort);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const query = searchParams.toString();
    const url = query ? `challenges?${query}` : 'challenges';

    const response = await api.get(url).json<ChallengeListResponse>();
    return response;
  },

  // 챌린지 상세 조회
  getDetail: async (id: number): Promise<Challenge> => {
    const response = await api.get(`challenges/${id}`).json<Challenge>();
    return response;
  },

  // 챌린지 생성
  create: async (data: Omit<Challenge, 'challengeId' | 'participant'>): Promise<Challenge> => {
    const response = await api.post('challenges', { json: data }).json<Challenge>();
    return response;
  },

  // 챌린지 수정
  update: async (id: number, data: Partial<Omit<Challenge, 'challengeId'>>): Promise<Challenge> => {
    const response = await api.put(`challenges/${id}`, { json: data }).json<Challenge>();
    return response;
  },

  // 챌린지 삭제
  delete: async (id: number): Promise<void> => {
    await api.delete(`challenges/${id}`);
  },
};
