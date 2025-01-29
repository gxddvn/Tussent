import React from 'react';
import Modal from 'react-modal';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            overlayClassName="fixed top-0 left-0 w-full h-full flex items-center justify-center px-10 bg-black bg-opacity-70 overflow-hidden overflow-y-auto z-50 transition-opacity opacity-100"
            className="relative flex flex-col items-center max-w-[40.625rem] p-10 bg-whitesmoke rounded-3xl"
        >
            <div className="relative px-10 py-6 rounded-2xl bg-slate-100 text-slate-800">
                <div className="flex justify-between mb-6">
                    <h1 className="font-bold text-2xl mr-10">{title}</h1>
                    <button onClick={onClose}>&#x2715;</button>
                </div>
                {children}
            </div>
        </Modal>
    );
}

export default CustomModal;
