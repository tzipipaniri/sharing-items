import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResponses } from "../Redux/ResponseSlice";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Collapse, Container, IconButton, Typography } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from "./Navbar";
import AddResponse from "./AddResponse";
import DeleteResponse from "./DeleteResponse";
import { red } from "@mui/material/colors";
import ResponseOptions from "./ResponseOptions";


const Responses = () => {
    const user = useSelector((state) => state.users.user);
    const responses = useSelector(state => state.responses.responses)
    const status = useSelector(state => state.responses.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (status !== 'fulfilled')
            dispatch(fetchResponses())
    }, [])

    // const addResponse = () => {
    //     navigate('addResponse')
    // }

    const date = (d) => {
        // המרת המחרוזת לתאריך
        const date = new Date(d);

        // הצגת התאריך בפורמט יפה יותר
        const formattedDate = date.toLocaleDateString("he-IL");

        // הדפסת התאריך
        console.log('response', formattedDate);
        return formattedDate
    }

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const Delete = (id) => {
        console.log(id);
    }


    return (<>
        <Navbar />
        <Typography variant="h3" gutterBottom>
            responses
        </Typography>
        {sessionStorage.getItem('firstName') && <AddResponse />}
        <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* <link rel="stylesheet" href="addResponse"/> */}
            {/* <Link to='addResponse'>add response</Link>
        <Outlet /> */}
            {/* <Button variant="contained" onClick={addResponse}>Give</Button>     */}
            {status === 'idle' && <CircularProgress disableShrink />}
            {status !== 'idle' && responses.length === 0 &&
                <Typography variant="h6" gutterBottom>No responses found</Typography>
            }
            {responses.length > 0 && responses.map((r, i) => (
                //  <Typography variant="h5" gutterBottom>
                //     {r.title}
                // </Typography> 
                // <div key={i}>
                // <div dangerouslySetInnerHTML={{ __html: (`content:${r.content}`).replace(/\n/g, '<br/>') }} />

                <Card sx={{ maxWidth: 345, margin: '20px' }} key={r?.id}>
                    <CardHeader
                        avatar={
                            // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            //     {r?.user?.image}
                            // </Avatar>
                            <Avatar src={r?.user?.image} alt="Profile image" />
                        }
                        // subheader="September 14, 2016"
                        subheader={`${r?.title}`}//
                        // title="Shrimp and Chorizo Paella"
                        title={`${date(r?.date)}`}
                    />
                    {/* <CardMedia
                        component="img"
                        height="194"
                        //image="/static/images/cards/paella.jpg"
                        image={r?.user?.image}
                        alt="Paella dish"
                    /> */}
                    <CardMedia>
                        <Typography variant="body2" color="text.secondary">
                            <span dangerouslySetInnerHTML={{ __html: (`${r?.content}`).replace(/\n/g, '<br/>') }} />

                        </Typography>
                    </CardMedia>
                    <CardContent>

                        <Typography variant="body2" color="text.secondary">
                            {`${r?.user?.firstName}`}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {/* <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton> */}
                        {/* {r?.user&& r?.user?.id === +sessionStorage.getItem('userId') && <DeleteResponse responeId={r?.id} />} */}
                        {r?.user && r?.user?.id === +sessionStorage.getItem('userId') && <ResponseOptions response={r} Delete={(id) => Delete(id)} />
                        }
                        {/* <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore> */}
                    </CardActions>
                    {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                {item.description}
                            </Typography>
                            <Typography paragraph>items of give the item:</Typography>
                            <Typography paragraph>
                                {`${item.user?.firstName} ${item.user?.lastName}`}
                            </Typography>
                            <Typography paragraph>
                                {`email:${item.user?.email} phone:${item.user?.phone}`}
                            </Typography>
                            <Typography>
                                {`city${item.user?.city} street:${item.user?.city}`}
                            </Typography>
                        </CardContent>
                    </Collapse> */}
                </Card>

                // </div>


                // <Box sx={{ my: 2 }}>
                //     <Card>
                //         <CardContent>
                //             <Box sx={{ display: "flex", alignItems: "center" }}>
                //                 <Box sx={{ mr: 2 }}>
                //                     <Avatar src={r?.user?.image} alt="Profile image" />
                //                 </Box>
                //                 <Box>
                //                     <Typography variant="h6" component="h2">
                //                         {r?.user?.firstName}
                //                     </Typography>
                //                     <Typography variant="caption">{r?.date}</Typography>
                //                 </Box>
                //             </Box>
                //             <Typography variant="h5" component="h3">
                //                 {r?.title}
                //             </Typography>
                //             <Typography variant="body1">{r?.content}</Typography>
                //         </CardContent>
                //     </Card>
                // </Box>

            ))}
        </Container>
        {status === 'pending' && <p>המחיקה מתבצעת</p>}
    </>);
}

export default Responses;