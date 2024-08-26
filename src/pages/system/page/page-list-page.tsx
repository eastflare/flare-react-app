import { useState } from "react";
import { BlueButton } from "components/buttons/CustomButton";
import { findPageById } from "@/apis/system/Page";

const PageListPage = () => {
  const [pageId, setPageId] = useState("");

  const handleClickSubmit = async () => {};

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
