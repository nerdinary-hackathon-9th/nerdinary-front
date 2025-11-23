// 스냅 타입
export interface Snap {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  userId: number;
  challengeId: number;
  createdAt: string;
}

// 스냅 생성 요청 타입
export interface CreateSnapRequest {
  title: string;
  content: string;
  snap: File;
}

// 스냅 생성 응답 타입
export interface CreateSnapResponse {
  success: boolean;
  message: string;
  data: Snap;
}

// 스냅 목록 조회 응답 타입
export interface SnapListResponse {
  success: boolean;
  message: string;
  data: Snap[];
}
