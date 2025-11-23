import { api } from '@/lib/ky';
import type {
  Challenge,
  ChallengeDetail,
  ChallengeListParams,
  ChallengeListResponse,
  ChallengeParticipant,
  JoinChallengeRequest,
  JoinChallengeResponse,
} from '@/types/challenge';

export const challengeAPI = {
  // 진행중인 챌린지 목록 조회
  getTodayChallenges: async (): Promise<ChallengeListResponse> => {
    const response = await api.get('api/challenge/today').json<ChallengeListResponse>();
    return response;
  },

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
  getDetail: async (
    id: number,
  ): Promise<{ success: boolean; message: string; data: ChallengeDetail }> => {
    const response = await api
      .get(`api/challenge/${id}`)
      .json<{ success: boolean; message: string; data: ChallengeDetail }>();
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

  // 챌린지 참가자 목록 조회
  getParticipants: async (
    id: number,
  ): Promise<{ success: boolean; message: string; data: ChallengeParticipant[] }> => {
    const response = await api
      .get(`api/challenge/${id}/participants`)
      .json<{ success: boolean; message: string; data: ChallengeParticipant[] }>();
    return response;
  },

  // 유저의 챌린지 참여 여부 확인
  checkUserParticipation: async (challengeId: number, userId: number): Promise<boolean> => {
    try {
      const response = await challengeAPI.getParticipants(challengeId);
      const participants = response.data;
      return participants.some((participant) => participant.userId === userId);
    } catch (error) {
      console.error('참여 여부 확인 실패:', error);
      return false;
    }
  },

  // 챌린지 참여하기
  join: async (data: JoinChallengeRequest): Promise<JoinChallengeResponse> => {
    const response = await api
      .post('api/user/challenge', { json: data })
      .json<JoinChallengeResponse>();
    return response;
  },
};

// 타입 re-export (편의성을 위해)
export type { Challenge, ChallengeListParams, ChallengeListResponse } from '@/types/challenge';
