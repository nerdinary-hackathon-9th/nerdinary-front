import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userPost } from '@/api/user/user-post';
import { AuthInput } from '../components/AuthInput';
import { nicknameRegex, passwordRegex } from '../utils/regex';
import { Header } from '@/app/layout/header/ui/Header';

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nickname: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    nickname: false,
    password: false,
  });

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const isValid = nicknameRegex.test(form.nickname) && passwordRegex.test(form.password);

  const handleLogin = async () => {
    if (!isValid) return;

    try {
      const res = await userPost.login(form.nickname, form.password);

      // 응답 꺼내기
      const userId = res.data.id;

      // 로컬스토리지 저장
      localStorage.setItem('userId', String(userId));
      navigate('/');
    } catch {
      alert('로그인 실패');
    }
  };

  return (
    <div className="flex flex-col h-screen px-5 pt-5">
      {/* Header */}
      <Header variant="back" />

      {/* Input Section */}
      <section className="space-y-4">
        <AuthInput
          label="닉네임"
          placeholder="닉네임 입력"
          value={form.nickname}
          onChange={handleChange('nickname')}
          error={
            touched.nickname && !nicknameRegex.test(form.nickname)
              ? '유효한 닉네임이 아닙니다.'
              : null
          }
        />

        <AuthInput
          label="비밀번호"
          placeholder="비밀번호 입력"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          error={
            touched.password && !passwordRegex.test(form.password)
              ? '비밀번호 형식이 올바르지 않습니다.'
              : null
          }
        />
      </section>

      {/* CTA */}
      <button
        disabled={!isValid}
        onClick={handleLogin}
        className={`mt-auto mb-6 py-4 rounded-md text-lg transition-all ${
          isValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        로그인
      </button>

      {/* Link to signup */}
      <p className="text-center text-sm text-gray-500 mb-4">
        계정이 없나요?{' '}
        <button onClick={() => navigate('/signup')} className="text-black underline">
          회원가입
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
