import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

interface ModalManagerProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalManager: React.FC<ModalManagerProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && <ContactModal handleClose={onClose} />}
        </AnimatePresence>
    );
};

export default ModalManager;
