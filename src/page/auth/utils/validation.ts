import { nicknameRegex, passwordRegex } from './regex';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * 닉네임 유효성 검증
 */
export const validateNickname = (nickname: string): ValidationResult => {
  // 빈 값 체크
  if (!nickname.trim()) {
    return {
      isValid: false,
      message: '닉네임을 입력해주세요.',
    };
  }

  // 길이 체크 (8자 이내)
  if (nickname.length > 8) {
    return {
      isValid: false,
      message: '닉네임은 8자 이내로 입력해주세요.',
    };
  }

  // 형식 체크
  if (!nicknameRegex.test(nickname)) {
    return {
      isValid: false,
      message: '닉네임 형식이 올바르지 않습니다.',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

/**
 * 비밀번호 유효성 검증
 */
export const validatePassword = (password: string): ValidationResult => {
  // 빈 값 체크
  if (!password.trim()) {
    return {
      isValid: false,
      message: '비밀번호를 입력해주세요.',
    };
  }

  // 형식 체크 (6~15자, 영문+숫자)
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message: '비밀번호는 6~15자리로 영문 대소문자/숫자를 혼합해주세요.',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

/**
 * 비밀번호 확인 일치 여부 검증
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
): ValidationResult => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: '비밀번호가 일치하지 않습니다.',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

/**
 * 전체 폼 유효성 검증
 */
export const validateSignUpForm = (
  nickname: string,
  password: string,
  confirmPassword: string,
  isNicknameChecked: boolean,
): boolean => {
  const nicknameValidation = validateNickname(nickname);
  const passwordValidation = validatePassword(password);
  const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);

  return (
    nicknameValidation.isValid &&
    passwordValidation.isValid &&
    passwordMatchValidation.isValid &&
    isNicknameChecked
  );
};
