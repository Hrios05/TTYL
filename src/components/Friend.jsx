import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => Array.isArray(state.user.friends) ? state.user.friends : []); // Ensure friends is an array

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <FlexBetween gap="1rem">
            <UserImage src={userPicturePath} alt={name} />
            <Box>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="subtitle2" color={medium}>
                    {subtitle}
                </Typography>
            </Box>
            <IconButton onClick={patchFriend}>
                {isFriend ? (
                    <PersonRemoveOutlined color="primary" />
                ) : (
                    <PersonAddOutlined color="primary" />
                )}
            </IconButton>
        </FlexBetween>
    );
};

export default Friend;