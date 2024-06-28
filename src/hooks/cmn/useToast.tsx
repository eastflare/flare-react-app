import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useToast(type: string, message?: string) {
  // 1. 커스텀 훅을 import 했을 때 실행될 함수를 만든다.
  // 1-1. 해당 함수의 매개변수로 message와 type을 지정한다.
  const config: ToastOptions = {
    // 2. config 값을 설정해서 기본 커스터마이징을 한다.
    position: "top-center",
    // 2-1. 위치: 위쪽 중간
    autoClose: 2000,
    // 2-2. 2초 후 사라짐
    hideProgressBar: false,
    // 2-3. 사라지기까지 progressBar 보이지 않게 설정
    closeOnClick: true,
    // 2-4. 클릭할 경우 토스트 메세지 사라짐
    rtl: false,
    // 2-5. 알림 좌우 반전 안 함
    pauseOnFocusLoss: false,
    // 2-6. 화면 벗어나도 알람 정지 안함
    draggable: false,
    // 2-7. 드래그 불가능
    pauseOnHover: false,
    // 2-8. 마우스 올리면 알람 정지하지 않음
  };

  switch (type) {
    // 3. type 설정 시, 해당 type에 맞춰 switch case가 걸리고, 해당하는 case의 토스트 메세지가 생성된다.
    case "saved":
      return toast.success("저장 되었습니다.", config);
    case "applied":
      return toast.success("적용 되었습니다.", config);
    case "inserted":
      return toast.success("입력 되었습니다.", config);
    case "updated":
      return toast.success("수정 되었습니다.", config);
    case "deleted":
      return toast.success("삭제 되었습니다.", config);
    case "saveForApply":
      return toast.warning("저장 버튼을 눌러야 적용 완료 됩니다.", config);
    case "saveForDelete":
      return toast.warning("저장 버튼을 눌러야 삭제가 완료 됩니다.", config);
    case "selectOne":
      return toast.warning("하나만 선택 하세요.", config);
    case "noSelected":
      return toast.warning("선택 된 항목이 없습니다.", config);
    case "noChanged":
      return toast.warning("변경된 데이터가 없습니다.", config);
    case "mandatory":
      return toast.warning("필수값을 모두 입력해 주세요.", config);
    case "searchOneMore":
      return toast.warning("검색 조건을 하나 이상 입력해 주세요.", config);
    case "gridColumnMandatory":
      return toast.warning("필수값입니다.", config);
    case "success":
      return toast.success(message, config);
    case "error":
      return toast.error("에러가 발생했습니다.", config);
    case "warning":
      return toast.warning(message, config);
    default:
      return toast(message, config);
  }
  // 3-1. 성공, 실패, 경고, default 케이스마다 토스트 메세지의 마크가 다르게 표시된다.
}
