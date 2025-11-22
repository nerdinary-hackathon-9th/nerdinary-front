import { api } from '@/lib/ky';

// 로그인 요청 타입
export interface LoginRequest {
  nickname: string;
  password: string;
}

// 회원가입 요청 타입
export interface SignupRequest {
  nickname: string;
  password: string;
}

// API 응답 공통 구조
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// 로그인 응답 데이터
export interface LoginData {
  id: string;
}

// 회원가입 응답 데이터
export interface SignupData {
  id: string;
}

// 닉네임 중복 확인 응답 데이터
export interface CheckNicknameData {
  isAvailable: boolean;
}

// 챌린지 정보
export interface ChallengeInfo {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  endAt: string;
  thumbnailUrl: string;
}

// 참여 챌린지 정보
export interface ParticipantChallenge {
  challenge: ChallengeInfo;
}

// 사용자 참여 챌린지 목록 응답 데이터
export interface UserChallengesData {
  userChallenges: {
    participants: ParticipantChallenge[];
  };
}

// 챌린지 참가 요청 타입
export interface JoinChallengeRequest {
  userId: number;
  challengeId: number;
}

// 챌린지 참가 응답 데이터
export interface JoinChallengeData {
  userChallenge: {
    id: number;
    createdAt: string;
    userId: number;
    challengeId: number;
  };
}

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
