import * as React from 'react';
import 'bulma/css/bulma.css';
import styled from 'styled-components';
import moment from 'moment'  // #1
import 'moment/locale/ja'  // #2
import ButtonAppBar from './ButtonAppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Post from './Post';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';

const Container = styled.div`
    padding-top:56px;
`;

const Fixed = styled.div`
    position:fixed;  
    bottom:40px;
    right:20px;
`;
const RenderList = styled.div`
    display:flex;
    > div{
        margin:16px;
        margin-bottom:24px;
        padding:0px;
        &:last-child{
            padding-bottom:0px;
            margin-left:0px;
            white-space:pre-wrap;
        }
    }
`

function AlertBar({ children }) {
    const [open, setOpen] = React.useState(true);
    return (
        <Collapse in={open}>
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {children}
            </Alert>
        </Collapse>
    )
}

function List({ name, content, created_at }) {
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    return (
        <CardContent>
            <Card sx={{ minWidth: 275 }}>
                <RenderList>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {content}
                        </Typography>
                        <Typography variant="body2">
                            {created_at}
                            <br />
                        </Typography>
                    </CardContent>
                </RenderList>
                <CardActions>
                    <Button size="small">返信する</Button>
                </CardActions>
            </Card>
        </CardContent >
    );
}

function App() {
    const [flg, setFlg] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [contents, setContents] = React.useState([]);
    const [view, setView] = React.useState(false);
    const handleClickView = () => {
        setView(true);
    };

    const handleCloseView = () => {
        setView(false);
    };

    // バックエンドへのアクセステスト
    React.useEffect(() => {
        fetch('/api', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => setContents(data.results))
            .catch(error => { });
    }, [])


    // 投稿一覧の表示
    function Render() {
        if (contents.length) {
            return (
                <>
                    {contents.map(content => (
                        <React.Fragment key={content.id}>
                            <List name={content.name} content={content.content} created_at={moment(content.created_at).fromNow()} />
                        </React.Fragment>
                    ))}
                </>
            )
        } else {
            return <p className="panel-block">まだ投稿はありません。</p>
        }
    }


    return (
        <>
            <ButtonAppBar />
            <Container>
                {flg ? <AlertBar>{msg}</AlertBar> : ""}
                <Card sx={{ minWidth: 275 }}>
                    <Render />
                </Card>
                <Fixed>
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={handleClickView} />
                    </Fab>
                </Fixed>
            </Container>
            <Post open={view} handleClose={handleCloseView} setContents={setContents} setFlg={setFlg} setMsg={setMsg} />
        </>
    );
}
export default App;