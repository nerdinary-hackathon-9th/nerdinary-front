import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/app/layout/header/ui/Header';
import { toast } from 'sonner';
import { userPost } from '@/api/user/user-post';
import { userGet } from '@/api/user/user-get';
import { AuthInput } from '../components/AuthInput';
import { nicknameRegex, passwordRegex } from '../utils/regex';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nickname: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [touched, setTouched] = useState({
    nickname: false,
    password: false,
    confirmPassword: false,
  });

  // 닉네임 중복확인 여부
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  // debounce용
  const [debouncedValues, setDebouncedValues] = useState(form);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues(form);

      // 닉네임이 변경되면 중복확인 초기화
      setIsNicknameChecked(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [form.nickname, form.password, form.confirmPassword]);

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

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
  const isValid =
    nicknameRegex.test(form.nickname) &&
    passwordRegex.test(form.password) &&
    form.password === form.confirmPassword &&
    form.agreeTerms &&
    isNicknameChecked;

  /* =====================
        닉네임 중복 체크 
     ===================== */
  const checkNickName = async () => {
    if (!nicknameRegex.test(form.nickname)) {
      toast.error('닉네임 형식이 올바르지 않습니다.');
      return;
    }

    try {
      const res = await userGet.checkNickName(form.nickname);

      // API 구조에 맞춰 수정: available
      if (res.data.isAvailable === true) {
        toast.success('사용 가능한 닉네임입니다!');
        setIsNicknameChecked(true);
      } else {
        toast.error('이미 사용 중인 닉네임입니다.');
        setIsNicknameChecked(false);
      }
    } catch {
      toast.error('닉네임 확인 중 오류가 발생했습니다.');
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant="back" />

      <div className="w-full px-4">
        <section className="space-y-4">
          {/* 닉네임 */}
          <AuthInput
            label="닉네임"
            placeholder="닉네임 입력"
            value={form.nickname}
            onChange={handleChange('nickname')}
            error={
              touched.nickname &&
              debouncedValues.nickname.length > 0 &&
              !nicknameRegex.test(debouncedValues.nickname)
                ? '닉네임 형식이 올바르지 않습니다.'
                : null
            }
          />
          <p className="text-xs text-gray-500 ml-2 -mt-3">
            2~10자, 한글/영문/숫자만 사용 가능합니다.
          </p>

          <button onClick={checkNickName} className="text-sm underline text-blue-600">
            닉네임 중복 확인
          </button>

          {/* 비밀번호 */}
          <AuthInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={handleChange('password')}
            error={
              touched.password &&
              debouncedValues.password.length > 0 &&
              !passwordRegex.test(debouncedValues.password)
                ? '비밀번호는 8~20자이며 영문, 숫자, 특수문자를 포함해야 합니다.'
                : null
            }
          />

          {/* 비밀번호 확인 */}
          <AuthInput
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 재입력"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={
              touched.confirmPassword &&
              debouncedValues.confirmPassword.length > 0 &&
              debouncedValues.password !== debouncedValues.confirmPassword
                ? '비밀번호가 일치하지 않습니다.'
                : null
            }
          />

          {/* 이용약관 */}
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.agreeTerms}
              onChange={handleChange('agreeTerms')}
            />
            이용약관 및 개인정보 처리방침에 동의합니다.
          </label>
        </section>

        {/* CTA */}
        <button
          disabled={!isValid}
          onClick={handleSubmit}
          className={`mt-12 mb-6 py-4 rounded-md text-lg transition-all w-full ${
            isValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
