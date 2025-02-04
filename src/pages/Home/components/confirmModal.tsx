import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    border,
} from "@chakra-ui/react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent bg='gray.800' color='gray.10'>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <Text>{description}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onConfirm}>
                        {confirmText}
                    </Button>
                    <Button
                        variant="ghost"
                        colorScheme="white"
                        border='1px'
                        borderColor='transparent'
                        _hover={{ borderColor: 'gray.500' }}
                        onClick={onClose}
                    >
                        {cancelText}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmModal;
