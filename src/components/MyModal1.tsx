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
            <h1>전선배</h1>
            <h2>이력 : </h2>
            <ul>
                <li>NPDM 수행</li>
            </ul>
            <h2>특기사항 : </h2>
            <ul>
                <li>BRSE</li>
                <li>PLM (WBS, BOM, ECR, ECO) 전문가</li>
                <li>베트남 전문가</li>
            </ul>
            <div>
                <button onClick={handleClickSubmit}>확인</button>
                <button onClick={handleClickCancel}>취소</button>
            </div>
        </ReactModal>
    );
};

export default MyModal;