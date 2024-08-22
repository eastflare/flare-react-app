import { useState } from "react";
import { BlueButton } from "components/buttons/CustomButton";
import { findPageById } from "@/apis/system/Page";

const PageListPage = () => {
  const [pageId, setPageId] = useState("");

  const handleClickSubmit = async () => {
    const data = await findPageById("RAP_COM_001");
    console.log("페이지 데이터 ", data);
  };

  const handleClickCancel = () => {
    close();
  };

  return (
    <>
      <input type='text' value={pageId} onChange={e => setPageId(e.target.value)} />
      <BlueButton onClick={handleClickSubmit} onGotPointerCapture={handleClickSubmit}>
        조회
      </BlueButton>
      <BlueButton onClick={handleClickCancel} onGotPointerCapture={handleClickCancel}>
        취소
      </BlueButton>
    </>
  );
};

export default PageListPage;
