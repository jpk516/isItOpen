import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import CheckInService from '../services/check-in-service';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

function CheckInTable({ checkIns, onVote }) {
    const navigate = useNavigate();
    if (!checkIns) return null;

    const handleUpvote = (checkInId) => {
        CheckInService.vote(checkInId, { up: true })
            .then(response => {
                if (onVote && response.data) onVote(response.data);
            })
            .catch(error => console.error('Error voting', error));
    };

    const handleDownvote = (checkInId) => {
        CheckInService.vote(checkInId, { up: false })
            .then(response => {
                if (onVote && response.data) onVote(response.data);
            })
            .catch(error => console.error('Error voting', error));
    };

    const handleDelete = (checkInId) => {
        CheckInService.delete(checkInId).then(response => {
            if (response.data.success) {
                const updatedCheckIns = checkIns.filter(c => c._id !== checkInId);
                onVote(updatedCheckIns);
            }
        }).catch(error => console.error('Error deleting check-in', error));
    };

    const getUserColor = (checkIn, isUpIcon) => {
        if (checkIn.userVoteStatus.voted) {
            return isUpIcon ? checkIn.userVoteStatus.up ? 'secondary.main' : 'disabled.main' : checkIn.userVoteStatus.up ? 'disabled.main' : 'secondary.main';
        } else {
            return 'disabled.main';
        }
    };

    const columns = [
        { field: 'venueName', headerName: 'Venue', width: 200, renderCell: (params) => (
            <Link to={`/venues/${params.value}`} style={{ textDecoration: 'none' }}>{params.value}</Link>
        )},
        { field: 'username', headerName: 'User', width: 130 },
        { field: 'created', headerName: 'Date', width: 180, valueGetter: (value) => value.toLocaleString() },
        { field: 'tags', headerName: 'Tags', width: 180, renderCell: (params) => (
            params.value?.map((tag, index) => <Chip label={tag} color="secondary" size="small" key={index} />)
        )},
        { field: 'comment', headerName: 'Comment', width: 200 },
        { field: 'open', headerName: 'Status', width: 135, renderCell: (params) => (
            params.value ? <Alert severity="success">Open</Alert> : <Alert severity="error">Closed</Alert>
        )},
        { field: 'upvoteCount', headerName: 'Upvotes', width: 130 },
        { field: 'downvoteCount', headerName: 'Downvotes', width: 130 },
        { field: 'userVoteStatus', headerName: 'Actions', width: 180, renderCell: (params) => (
            <>
                <IconButton onClick={() => handleUpvote(params.id)} sx={{color: getUserColor(params.row, true)}}>
                    <ThumbUpAltIcon /> 
                </IconButton>
                <IconButton onClick={() => handleDownvote(params.id)} sx={{color: getUserColor(params.row, false)}}>
                    <ThumbDownAltIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(params.id)} sx={{color: 'error.main'}}>
                    <DeleteIcon />
                </IconButton>
            </>
        )},
    ];

    const rows = checkIns.map(checkIn => ({
        id: checkIn._id,
        venueName: checkIn?.venue?.name || "Unknown Venue",
        username: checkIn?.user?.username || "Anonymous",
        created: new Date(checkIn.created),
        tags: checkIn.tags,
        comment: checkIn.comment,
        open: checkIn.open,
        upvoteCount: checkIn.upvoteCount,
        downvoteCount: checkIn.downvoteCount,
        userVoteStatus: checkIn.userVoteStatus
    }));

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </div>
    );
}

export default CheckInTable;
