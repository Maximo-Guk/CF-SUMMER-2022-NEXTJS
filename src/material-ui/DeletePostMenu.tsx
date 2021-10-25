import * as React from 'react';
import Post from '../../types/Post';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

interface propsTypes {
  post: Post;
  handleDelete(postId: string): Promise<void>;
}

export default function DeletePostMenu(props: propsTypes) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="delete-post-button"
        aria-controls="delete-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <DeleteIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'delete-post-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography
            onClick={() => props.handleDelete(props.post.postId)}
            color="red"
            variant="caption"
          >
            Are you sure?
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
