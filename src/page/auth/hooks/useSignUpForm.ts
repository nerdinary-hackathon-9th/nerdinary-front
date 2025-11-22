import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { userPost } from '@/api/user/user-post';
import { userGet } from '@/api/user/user-get';
import { validateNickname, validateSignUpForm } from '../utils/validation';

export const useSignUpForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const [touched, setTouched] = useState({
    nickname: false,
    password: false,
    confirmPassword: false,
  });

  // 닉네임 중복확인 여부
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  // 닉네임 중복확인 결과 메시지
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // debounce용
  const [debouncedValues, setDebouncedValues] = useState(form);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues(form);

      // 닉네임이 변경되면 중복확인 초기화
      setIsNicknameChecked(false);
      setNicknameCheckMessage(null);
    }, 400);

    return () => clearTimeout(timer);
  }, [form.nickname, form.password, form.confirmPassword]);

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  // 최종 회원가입 버튼 활성화 여부
  const isValid = validateSignUpForm(
    form.nickname,
    form.password,
    form.confirmPassword,
    isNicknameChecked
  );

  /* =====================
        닉네임 중복 체크
     ===================== */
  const checkNickName = async () => {
    // 닉네임 유효성 검증
    const validation = validateNickname(form.nickname);

    if (!validation.isValid) {
      setNicknameCheckMessage({
        type: 'error',
        text: validation.message,
      });
      setIsNicknameChecked(false);
      return;
    }

    // API 중복 확인
    try {
      const res = await userGet.checkNickName(form.nickname);

      if (res.data.isAvailable === true) {
        setNicknameCheckMessage({
          type: 'success',
          text: '사용 가능한 닉네임입니다!',
        });
        setIsNicknameChecked(true);
      } else {
        setNicknameCheckMessage({
          type: 'error',
          text: '이미 사용 중인 닉네임입니다.',
        });
        setIsNicknameChecked(false);
      }
    } catch {
      setNicknameCheckMessage({
        type: 'error',
        text: '닉네임 확인 중 오류가 발생했습니다.',
      });
      setIsNicknameChecked(false);
    }
  };

  /* =====================
        회원가입 진행
     ===================== */
  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      await userPost.signup(form.nickname, form.password);
      toast.success('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch {
      toast.error('회원가입에 실패했습니다.');
    }
  };

  return {
    form,
    touched,
    debouncedValues,
    isValid,
    nicknameCheckMessage,
    handleChange,
    checkNickName,
    handleSubmit,
  };
};
