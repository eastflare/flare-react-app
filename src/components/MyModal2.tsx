import ReactModal from 'react-modal';

interface Props {
    onSubmit : () => void;
    onClose  : () => void;
}

const MyModal = ({ onSubmit, onClose } : Props) => {

    
    const handleClickSubmit = () => {
        onSubmit();
    };
    
    const handleClickCancel = () => {
        onClose();
    };

    return (
        <ReactModal isOpen>
            <h1>송XX</h1>
            <h2>이력 : </h2>
            <ul>
                <li>매찾사 회원</li>
            </ul>
            <h2>별명 : </h2>
            <ul>
                <li>(구)요시키상</li>
                <li>(현)송심당 (대전거주)</li>
                <li>(향후)Sam송(미국출장시)</li>
            </ul>
            <div>
                <button onClick={handleClickSubmit}>확인</button>
                <button onClick={handleClickCancel}>취소</button>
            </div>
        </ReactModal>
    );
};

export default MyModal;