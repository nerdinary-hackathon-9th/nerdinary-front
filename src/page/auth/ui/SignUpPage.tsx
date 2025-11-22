import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/app/layout/header/ui/Header';

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

  const isValid =
    nicknameRegex.test(form.nickname) &&
    passwordRegex.test(form.password) &&
    form.password === form.confirmPassword &&
    form.agreeTerms;

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [key]: value });
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const [debouncedValues, setDebouncedValues] = useState(form);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues(form);
    }, 400);

    return () => clearTimeout(timer);
  }, [form]);

  const handleSubmit = () => {
    if (!isValid) return;
    alert('회원가입 완료!');
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header variant="back" />
      <div className="w-full px-4">
        {/* Input Section */}
        <section className="space-y-4">
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

          {/* Terms */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={handleChange('agreeTerms')}
              />
              이용약관 및 개인정보 처리방침에 동의합니다.
            </label>
          </div>
        </section>

        {/* CTA */}
        <button
          disabled={!isValid}
          onClick={handleSubmit}
          className={`mt-auto mb-6 py-4 rounded-md text-lg transition-all ${
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
