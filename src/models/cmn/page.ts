export type PageProps = {
    onClose: () => void; // onClose 함수는 필수로 있어야 함
    [key: string]: any; // 나머지 속성들은 모두 선택적으로 설정 가능
};

export type PageObj = {
    id : string;
    Component : () => JSX.Element;
    props : PageProps;
};