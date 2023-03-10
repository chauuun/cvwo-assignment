import { Box, Button, Modal } from '@mui/material';
import React from 'react';
import LoginForm from './LoginForm';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 4,
    p: 4,
    borderRadius: "10px"
};

export default function LoginModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Log In</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="login-modal"
                aria-describedby="login-form-modal"
            >
                <Box sx={modalStyle}>
                    <LoginForm />
                </Box>
            </Modal>
        </div>
    );
}