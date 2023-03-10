import { Comment, Person, Visibility } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router";
import { Thread } from "../../types/DataModels";
import TagList from "./TagList";

function ThreadList(props: { threads: Thread[] }) {
    const navigate = useNavigate();
    
    const listItems = props.threads.map((thread) => {
        const dateObj = new Date(thread.UpdatedAt)
        thread.UpdatedAt = dateObj.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })
        return (
            <Card key={thread.ID}>
                <CardActionArea onClick={() => navigate(`/thread/${thread.ID}`)}>
                    <CardContent>
                        <Grid2 container alignItems='center' spacing={0.5}>
                            <Grid2 lg={10}>
                                <Stack spacing={0.5}>
                                    <TagList tags={thread.Tags} size="small" />
                                    <Typography variant="h5" component="div" sx={{ wordBreak: "break-word" }}>{thread.Title}</Typography>
                                    <Stack direction='row' spacing={0.5}>
                                        <Chip variant='outlined' sx={{ border: "none" }} icon={<Comment />} label={thread.NumComments} />
                                        <Chip variant='outlined' sx={{ border: "none" }} icon={<Visibility />} label={thread.Views} />
                                    </Stack>
                                </Stack>
                            </Grid2>
                            <Grid2 lg={2}>
                                <Stack spacing={0.5} alignItems='end'>
                                    <Chip variant='outlined' sx={{ border: "none" }} icon={<Person />} label={thread.UserID} />
                                    <Typography variant="body2">Updated {thread.UpdatedAt}</Typography>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    });
    return (
        <Stack spacing={1}>{listItems}</Stack>
    );
}

export default ThreadList;