import { Header } from '@/app/layout/header/ui/Header';
import { AuthInput } from '../components/AuthInput';
import { useSignUpForm } from '../hooks/useSignUpForm';
import clsx from 'clsx';

const SignUpPage = () => {
  const {
    form,
    touched,
    debouncedValues,
    isValid,
    nicknameCheckMessage,
    passwordValidation,
    passwordMatchValidation,
    handleChange,
    checkNickName,
    handleSubmit,
  } = useSignUpForm();

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
                className="px-5 py-3.5 bg-white text-sm text-sihang-neutral-900 font-normal border border-sihang-neutral-100 rounded-[12px] whitespace-nowrap hover:bg-gray-50 transition-colors"
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
                !passwordValidation.isValid
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
                !passwordMatchValidation.isValid
                  ? ''
                  : null
              }
            />
            {/* 비밀번호 형식 오류 */}
            {touched.password &&
              debouncedValues.password.length > 0 &&
              !passwordValidation.isValid && (
                <div className="h-8 mt-3 px-4 py-2 bg-red-50 rounded-md">
                  <p className="text-xs text-red-600 font-normal">{passwordValidation.message}</p>
                </div>
              )}
            {/* 비밀번호 불일치 */}
            {touched.confirmPassword &&
              debouncedValues.confirmPassword.length > 0 &&
              passwordValidation.isValid &&
              !passwordMatchValidation.isValid && (
                <div className="h-8 mt-3 px-4 py-2 bg-red-50 rounded-md">
                  <p className="text-xs text-red-600 font-normal">
                    {passwordMatchValidation.message}
                  </p>
                </div>
              )}
          </div>
        </section>

        {/* CTA - 하단 고정 */}
        <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-white">
          <button
            disabled={!isValid}
            onClick={handleSubmit}
            className={clsx(
              'w-full py-4 rounded-lg text-lg font-medium transition-all',
              isValid
                ? 'bg-sihang-primary-400 text-white'
                : 'bg-sihang-neutral-100 text-sihang-neutral-300 cursor-not-allowed',
            )}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
