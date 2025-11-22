import { api } from '@/lib/ky';
import type {
  ApiResponse,
  LoginRequest,
  LoginData,
  SignupRequest,
  SignupData,
  CheckNicknameData,
  UserChallengesData,
  JoinChallengeRequest,
  JoinChallengeData,
} from '@/types/user';

export const authAPI = {
  // 회원가입
  signup: async (data: SignupRequest): Promise<ApiResponse<SignupData>> => {
    const response = await api.post('auth/signup', { json: data }).json<ApiResponse<SignupData>>();
    return response;
  },

  // 로그인
  login: async (data: LoginRequest): Promise<ApiResponse<LoginData>> => {
    const response = await api.post('auth/login', { json: data }).json<ApiResponse<LoginData>>();
    return response;
  },

  // 닉네임 중복 확인
  checkNickname: async (nickname: string): Promise<ApiResponse<CheckNicknameData>> => {
    const response = await api
      .get(`user/check?nickname=${encodeURIComponent(nickname)}`)
      .json<ApiResponse<CheckNicknameData>>();
    return response;
  },

  // 사용자가 참여한 챌린지 목록 조회
  getUserChallenges: async (userId: string): Promise<ApiResponse<UserChallengesData>> => {
    const response = await api
      .get(`user/${userId}/participate`)
      .json<ApiResponse<UserChallengesData>>();
    return response;
  },

  // 챌린지 참가
  joinChallenge: async (data: JoinChallengeRequest): Promise<ApiResponse<JoinChallengeData>> => {
    const response = await api
      .post('user/challenge', { json: data })
      .json<ApiResponse<JoinChallengeData>>();
    return response;
  },
};

// 이전 버전과의 호환성을 위해 유지
export const userPost = authAPI;

// 타입 re-export (편의성을 위해)
export type {
  ApiResponse,
  LoginRequest,
  LoginData,
  SignupRequest,
  SignupData,
  CheckNicknameData,
  UserChallengesData,
  JoinChallengeRequest,
  JoinChallengeData,
  ChallengeInfo,
  ParticipantChallenge,
} from './types/user.types';
