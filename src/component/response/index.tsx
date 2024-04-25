import { Modal } from "antd";
import { useState } from "react";

type ResponseLayoutProps = {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    onCancel: () => void;
}

const ResponseLayout = ({ isOpen, setOpen, onCancel}: ResponseLayoutProps) => {

    return (
        <Modal title="Basic Modal" open={isOpen} onCancel={onCancel}>
adsfasfadf
        </Modal>
    );
}

export default ResponseLayout;