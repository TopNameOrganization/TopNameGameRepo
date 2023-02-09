import * as React from 'react';
import {AddCircleOutline} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

export default function ProfileAvatarDialog(props: any) {
    const [open, setOpen] = React.useState<boolean>(false);

    const fileInput = React.createRef<HTMLInputElement>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const node: HTMLInputElement | null = fileInput.current
        if (node && node.files?.length) {
            console.log(`Selected file - ${node.files[0]}`)
            handleClose();
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {
                props.isShowDialogButton &&
                <IconButton
                    aria-label="add"
                    sx={{
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        zIndex: 1,
                        backgroundColor: 'rgba(0,0,0, 0.1)',
                    }}
                    onClick={handleClickOpen}
                >
                    <AddCircleOutline sx={{fontSize: 50, color: 'white'}} />
                </IconButton>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change avatar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can upload your avatar, a png, gif or jpeg file:
                    </DialogContentText>
                    <Box component="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} sx={{ mt: 1 }}>
                        <label htmlFor="avatar">
                            <input
                                name="avatar"
                                accept="image/png, image/gif, image/jpeg"
                                style={{ display: 'none' }}
                                id="avatar"
                                type="file"
                                required
                                ref={fileInput}
                            />
                            <Button component="span">
                                Upload file
                            </Button>
                        </label>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">Save</Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
