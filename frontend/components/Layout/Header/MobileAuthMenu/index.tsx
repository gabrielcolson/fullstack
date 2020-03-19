import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { MouseEvent, useState } from 'react';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  popoverPaper: {
    width: '100%',
    maxHeight: 'unset',
    maxWidth: 'unset',
    backgroundColor: theme.palette.secondary.main,
    left: '0 !important',
  },
  menu: {
    padding: `0 ${theme.spacing(2)}px`,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    '& > button': {
      marginBottom: theme.spacing(2),
    }
  }
}));

function MobileAuthMenu() {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
        {anchorEl ? <CloseIcon/> : <MenuIcon/>}
      </IconButton>
      <Menu
        TransitionProps={{ enter: false, appear: true, exit: false }}
        className={styles.menu}
        PopoverClasses={{ paper: styles.popoverPaper }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: 'right' }}
        transformOrigin={{ vertical: "top", horizontal: 'right' }}
        id="menu"
        elevation={0}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ classes: { root: styles.menu } }}
        PaperProps={{ square: true }}
      >
        <Button fullWidth variant="outlined">Login</Button>
        <Button fullWidth variant="contained" color="primary">Register</Button>
      </Menu>
    </>
  );
}

export default MobileAuthMenu;
