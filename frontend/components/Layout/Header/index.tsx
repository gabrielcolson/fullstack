import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  appBar: {
    // boxShadow: 'none',
  },
}));

function Header(): JSX.Element {
  const styles = useStyles();

  return (
    <Box component="header" border={1} borderTop={0} borderLeft={0} borderRight={0} borderColor="divider">
      <AppBar elevation={0} color="secondary" position="sticky" className={styles.appBar}>
        <Toolbar>
          <MenuIcon/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header;
