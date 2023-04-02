import {GetServerSideProps} from "next";
import {useRecoilState} from "recoil";
import EditTemplate from "../../../src/components/account/user-info/edit/EditTemplate";
import {userInfoState} from "../../../src/store/atom";

const EditPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  // TODO: setUserInfo 제거해야함.
  return (
    <>
      {userInfo && (
        <EditTemplate userInfo={userInfo} setUserInfo={setUserInfo} />
      )}
    </>
  );
};

export default EditPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;

  if (!cookies || !cookies.includes("beerlot-oauth-auth-request")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
