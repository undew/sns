import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';

const Text = styled.div`
    display:flex;
    width:100%;
    padding:20px 10px 10px 10px;
    textarea{
        height:100%;
        width:100%;
        border: none;
        resize:none;
        font-size:20px;
        padding: 10px ;
        white-space:pre-wrap;
    }
`

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose, setContents, setFlg, setMsg }) {
    const [text, setText] = React.useState('');

    const handleChange = e => setText(e.target.value);
    const handleSubmit = (text) => {
        const newArray = { id: Math.random().toString(32).substring(2), name: "undew", content: text };
        fetch("/insert", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(newArray)
        }).then(res => res.json())
            .then(data => setContents(data.results))
        handleClose();
        setText("");
        setFlg(true);
        setMsg('投稿が完了しました');
    }

    // DBに投稿内容を保存
    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button> */}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" />
                        <Button autoFocus color="inherit" onClick={() => handleSubmit(text)} disabled={!text}>
                            投稿
                        </Button>
                    </Toolbar>
                </AppBar>
                <Text>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={30}
                        placeholder="Minimum 3 rows"
                        value={text}
                        onChange={handleChange}
                    />
                </Text>
            </Dialog>
        </div >
    );
}