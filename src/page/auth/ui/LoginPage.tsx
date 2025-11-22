import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { userPost } from '@/api/user/user-post';
import { AuthInput } from '../components/AuthInput';
import { nicknameRegex, passwordRegex } from '../utils/regex';
import { Header } from '@/app/layout/header/ui/Header';

import LogoIcon from '@/assets/logo.svg?react';
import clsx from 'clsx';

const LoginPage = () => {
  const navigate = useNavigate();

  // 저장된 닉네임 불러오기
  const savedNickname = localStorage.getItem('savedNickname');

  const [form, setForm] = useState({
    nickname: savedNickname || '',
    password: '',
  });

  const [touched, setTouched] = useState({
    nickname: false,
    password: false,
  });

  const [saveNickname, setSaveNickname] = useState(!!savedNickname);

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

      // 닉네임 저장 처리
      if (saveNickname) {
        localStorage.setItem('savedNickname', form.nickname);
      } else {
        localStorage.removeItem('savedNickname');
      }

      // 로컬스토리지 저장
      localStorage.setItem('userId', String(userId));
      navigate('/');
    } catch {
      toast.error('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col h-screen px-5 pt-5">
      {/* Header */}
      <Header variant="back-text" title="로그인" />

      {/* Input Section */}
      <section className="h-screen flex mb-30 items-center">
        <div className="w-full flex flex-col items-center gap-10">
          <LogoIcon />

          <div className="w-full flex flex-col gap-3">
            <AuthInput
              placeholder="닉네임을 입력해주세요."
              value={form.nickname}
              onChange={handleChange('nickname')}
              error={
                touched.nickname && !nicknameRegex.test(form.nickname)
                  ? '유효한 닉네임이 아닙니다.'
                  : null
              }
            />

            <AuthInput
              placeholder="비밀번호를 입력해주세요."
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              error={
                touched.password && !passwordRegex.test(form.password)
                  ? '비밀번호 형식이 올바르지 않습니다.'
                  : null
              }
            />

            {/* 닉네임 저장 체크박스 */}
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="saveNickname"
                checked={saveNickname}
                onChange={(e) => setSaveNickname(e.target.checked)}
                className="w-5 h-5 rounded border-sihang-neutral-200"
              />
              <label htmlFor="saveNickname" className="text-sihang-neutral-400 text-sm">
                닉네임 저장
              </label>
            </div>
          </div>
          <button
            disabled={!isValid}
            onClick={handleLogin}
            className={clsx(
              'w-full mt-auto mb-6 py-4 rounded-md text-lg transition-all',
              isValid
                ? 'bg-sihang-primary-400 text-white'
                : 'bg-sihang-neutral-100 text-sihang-neutral-300 cursor-not-allowed',
            )}
          >
            로그인
          </button>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
