import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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

  const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,20}$/;

  const isValid = nicknameRegex.test(form.nickname) && passwordRegex.test(form.password);

  const handleLogin = () => {
    if (!isValid) return;
    alert('로그인 성공!');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen px-5 pt-5">
      {/* Header */}
      <header className="h-14 flex items-center mb-4">
        <button onClick={() => navigate('/')} className="mr-3 text-xl">
          ←
        </button>
        <span className="font-semibold text-lg">로그인</span>
      </header>

      {/* Input Section */}
      <section className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">닉네임</label>
          <input
            type="text"
            placeholder="닉네임 입력"
            value={form.nickname}
            onChange={handleChange('nickname')}
            className="w-full border rounded-md p-3 mt-1"
          />
          {touched.nickname && form.nickname.length > 0 && !nicknameRegex.test(form.nickname) && (
            <p className="text-xs text-red-500 mt-1 ml-2">유효한 닉네임이 아닙니다.</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={handleChange('password')}
            className="w-full border rounded-md p-3 mt-1"
          />
          {touched.password && form.password.length > 0 && !passwordRegex.test(form.password) && (
            <p className="text-xs text-red-500 mt-1 ml-2">비밀번호 형식이 올바르지 않습니다.</p>
          )}
        </div>
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

export default Login;
