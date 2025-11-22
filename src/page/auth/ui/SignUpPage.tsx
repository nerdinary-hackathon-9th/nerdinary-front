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
  const isValid =
    nicknameRegex.test(form.nickname) &&
    passwordRegex.test(form.password) &&
    form.password === form.confirmPassword &&
    isNicknameChecked;

  /* =====================
        닉네임 중복 체크
     ===================== */
  const checkNickName = async () => {
    // 닉네임이 비어있는 경우
    if (!form.nickname.trim()) {
      setNicknameCheckMessage({
        type: 'error',
        text: '닉네임을 입력해주세요.',
      });
      setIsNicknameChecked(false);
      return;
    }

    // 닉네임 길이 체크 (8자 이내)
    if (form.nickname.length > 8) {
      setNicknameCheckMessage({
        type: 'error',
        text: '닉네임은 8자 이내로 입력해주세요.',
      });
      setIsNicknameChecked(false);
      return;
    }

    // 닉네임 형식 체크
    if (!nicknameRegex.test(form.nickname)) {
      setNicknameCheckMessage({
        type: 'error',
        text: '닉네임 형식이 올바르지 않습니다.',
      });
      setIsNicknameChecked(false);
      return;
    }

    try {
      const res = await userGet.checkNickName(form.nickname);

      // API 구조에 맞춰 수정: available
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant="back-text" title="회원가입" />

      <div className="w-full px-5 pt-6">
        <section className="space-y-6">
          {/* 닉네임 */}
          <AuthInput
            label="닉네임"
            placeholder="8자 이내"
            value={form.nickname}
            onChange={handleChange('nickname')}
            maxLength={8}
            error={nicknameCheckMessage?.type === 'error' ? nicknameCheckMessage.text : null}
            success={nicknameCheckMessage?.type === 'success' ? nicknameCheckMessage.text : null}
            renderButton={() => (
              <button
                onClick={checkNickName}
                className="px-5 py-3.5 bg-white text-sm text-sihang-neutral-900 font-normal border border-sihang-neutral-100 rounded-[12px] font-medium whitespace-nowrap hover:bg-gray-50 transition-colors"
              >
                중복 확인
              </button>
            )}
          />

          {/* 비밀번호 */}
          <div>
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
                  ? ''
                  : null
              }
            />
            <AuthInput
              label=""
              type="password"
              placeholder="비밀번호 확인 입력"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              className="mt-3"
              error={
                touched.confirmPassword &&
                debouncedValues.confirmPassword.length > 0 &&
                debouncedValues.password !== debouncedValues.confirmPassword
                  ? ''
                  : null
              }
            />
            {/* 비밀번호 형식 오류 */}
            {touched.password &&
              debouncedValues.password.length > 0 &&
              !passwordRegex.test(debouncedValues.password) && (
                <div className="h-8 mt-3 px-4 py-2 bg-red-50 rounded-md">
                  <p className="text-xs text-red-600 font-normal">
                    비밀번호는 6~15자리로 영문 대소문자/숫자를 혼합해주세요.
                  </p>
                </div>
              )}
            {/* 비밀번호 불일치 */}
            {touched.confirmPassword &&
              debouncedValues.confirmPassword.length > 0 &&
              passwordRegex.test(debouncedValues.password) &&
              debouncedValues.password !== debouncedValues.confirmPassword && (
                <div className="h-8 mt-3 px-4 py-2 bg-red-50 rounded-md">
                  <p className="text-xs text-red-600 font-normal">비밀번호가 일치하지 않습니다.</p>
                </div>
              )}
          </div>
        </section>

        {/* CTA - 하단 고정 */}
        <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-white">
          <button
            disabled={!isValid}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-lg text-lg font-medium transition-all ${
              isValid
                ? 'bg-sihang-primary-400 text-white'
                : 'bg-sihang-neutral-100 text-sihang-neutral-300 cursor-not-allowed'
            }`}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
