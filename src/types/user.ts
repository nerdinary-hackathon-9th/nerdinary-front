// API 응답 공통 구조
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// 로그인 요청 타입
export interface LoginRequest {
  nickname: string;
  password: string;
}

// 로그인 응답 데이터
export interface LoginData {
  id: string;
}

// 회원가입 요청 타입
export interface SignupRequest {
  nickname: string;
  password: string;
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
