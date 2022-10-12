import React from "react";

interface TempLoginProps {
  isLoggedIn: boolean;
  userNickname: string;
  handleLogin: () => void;
  handleUserName: (newUserName: string) => void;
}

const TempLogin: React.FC<TempLoginProps> = ({
  isLoggedIn,
  userNickname,
  handleLogin,
  handleUserName,
}) => {
  return (
    <>
      {isLoggedIn ? (
        <>
          <span>{`${userNickname}님 로그인 됨`}</span>
          <button
            onClick={() => {
              handleLogin();
              handleUserName("");
            }}
          >
            로그아웃 하기
          </button>
        </>
      ) : (
        <form>
          <input
            onChange={(e) => {
              handleUserName(e.target.value);
            }}
            value={userNickname}
          />
          <button
            onKeyPress={handleLogin}
            onClick={() => {
              handleLogin();
            }}
          >
            로그인하기
          </button>
        </form>
      )}
    </>
  );
};

export default TempLogin;
