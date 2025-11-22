import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
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

  const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,20}$/;

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
    <div className="flex flex-col h-screen px-5 pt-5">
      {/* Header */}
      <header className="h-14 flex items-center mb-4">
        <button onClick={() => navigate('/')} className="mr-3 text-xl">
          ←
        </button>
        <span className="font-semibold text-lg">회원가입</span>
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
          <p className="text-xs text-gray-500 mt-1 ml-2">
            2~10자, 한글/영문/숫자만 사용 가능합니다.
          </p>
          {touched.nickname &&
            debouncedValues.nickname.length > 0 &&
            !nicknameRegex.test(debouncedValues.nickname) && (
              <p className="text-xs text-red-500 mt-1 ml-2">닉네임 형식이 올바르지 않습니다.</p>
            )}
        </div>

        <div>
          <label className="text-sm text-gray-600">비밀번호</label>
          <input
            type="password"
            placeholder="6자리 이상 입력"
            value={form.password}
            onChange={handleChange('password')}
            className="w-full border rounded-md p-3 mt-1"
          />
          {touched.password &&
            debouncedValues.password.length > 0 &&
            !passwordRegex.test(debouncedValues.password) && (
              <p className="text-xs text-red-500 mt-1 ml-2">
                비밀번호는 8~20자이며 영문, 숫자, 특수문자를 포함해야 합니다.
              </p>
            )}
        </div>

        <div>
          <label className="text-sm text-gray-600">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호 재입력"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            className="w-full border rounded-md p-3 mt-1"
          />
          {touched.confirmPassword &&
            debouncedValues.confirmPassword.length > 0 &&
            debouncedValues.password !== debouncedValues.confirmPassword && (
              <p className="text-xs text-red-500 mt-1 ml-2">비밀번호가 일치하지 않습니다.</p>
            )}
        </div>

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
  );
};

export default SignUp;
