import ReactModal from 'react-modal';

interface Props {
    isOpen : boolean
}

const MyModal = ({isOpen} : Props) => {
    return (
        <ReactModal isOpen={isOpen}>
            <div>모달 입니다</div>
        </ReactModal>
    );
};

export default MyModal;