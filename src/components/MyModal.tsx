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
            <h1>최XX</h1>
            <h2>이력 : </h2>
            <ul>
                <li>도토리 받고 개발 전문</li>
                <li>알고리즘 전문가</li>
            </ul>
            <h2>별명 : </h2>
            <ul>
                <li>개NullNull</li>
                <li>월급루팡</li>
            </ul>
            <div>
                <button onClick={handleClickSubmit}>확인</button>
                <button onClick={handleClickCancel}>취소</button>
            </div>
        </ReactModal>
    );
};

export default MyModal;