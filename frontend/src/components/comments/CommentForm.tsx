import { Alert, Button, TextField } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CommentAPI from "../../api/CommentAPI";
import { useAuth } from "../../contexts/AuthContext";
import theme from "../../theme";
import { CommentRequest } from "../../types/ApiRequest";
import { Comment } from "../../types/DataModels";

export default function CommentForm(props: { threadId: string, comment?: Comment, closeFn?: Function }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    const [content, setContent] = useState<string>(
        props.comment
            ? props.comment.Content
            : ""
    );
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const auth = useAuth();

    const onContentChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setContent(e.currentTarget.value);
    }

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        setError("")
        setSuccess("")
        if (!content) {
            setError("Comment cannot be empty");
            return;
        }

        if (!props.comment) {
            const comment: CommentRequest = {
                content: content
            }
            CommentAPI.createComment(comment, props.threadId)
                .then(() => {  
                    setSuccess("Comment created!");
                    navigate(`${pathname}/../1`);
                })
                .catch(err => setError(err))
                .finally(() => setContent(""));
        } else {
            const comment: CommentRequest = {
                content: content
            }
            CommentAPI.updateComment(comment, props.threadId, props.comment.ID)
                .then(() => {                      
                    navigate(`${pathname}/../1`);
                    if (props.closeFn) {
                        props.closeFn();
                    }
                })
                .catch(err => setError(err))
        }
    }

    return (
        <form>
            {
                success && <Alert severity="success">{success}</Alert>
            }
            <TextField fullWidth onChange={onContentChange}
                value={content}
                id="content-field"
                label="What are your thoughts?"
                multiline
                rows={4}
                margin="dense"
                inputProps={{
                    maxLength: 3000,
                }}
                error={error.length !== 0}
                helperText={`${error}`}
            />
            {
                auth.user
                    ? <Button onClick={handleSubmit} variant="contained" sx={{ marginY: theme.spacing(1) }}>Comment</Button>
                    : <Button variant="contained" disabled sx={{ marginY: theme.spacing(1) }}>Log In to Comment</Button>
            }

        </form>
    );
}