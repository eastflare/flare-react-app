import { useEffect, useState } from "react";
import useToast from "hooks/cmn/useToast";
import { usePageContext } from "contexts/cmn/PageContext";
import { BlueButton } from "components/buttons/CustomButton";
import { useRoutesQuery } from "@/hooks/queries/system/route/use-route-query";

const RouteListPage = () => {
  const { callback, close } = usePageContext();
  const { myToast } = useToast();

  const { data: fetchedRouteList } = useRoutesQuery({});

  const handleClickSubmit = () => {
    console.log("이거슨 Route Data -->" + fetchedRouteList);
  };

  const handleClickCancel = () => {
    close();
  };

  return (
    <>
      <h1>Route 관리 페이지</h1>
      <div>
        <BlueButton onClick={handleClickSubmit} onGotPointerCapture={handleClickSubmit}>
          라우트 조회
        </BlueButton>
        <BlueButton onClick={handleClickCancel} onGotPointerCapture={handleClickCancel}>
          취소
        </BlueButton>
      </div>
    </>
  );
};

export default RouteListPage;
