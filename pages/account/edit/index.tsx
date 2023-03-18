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
