import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import LightIcon from '@material-ui/icons/WbSunny';
import DarkIcon from '@material-ui/icons/Brightness2';
import IconButton from '@material-ui/core/IconButton';

import { useColorScheme } from '../../../utils/colorScheme';
import ButtonLink from '../../ButtonLink';
import useMounted from '../../../hooks/useMounted';
import MobileAuthMenu from './MobileAuthMenu';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  loginButton: {
    marginRight: theme.spacing(2)
  },
  authMenu: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
  }
}));

function Header(): JSX.Element {
  const styles = useStyles();
  const [colorScheme, toggleTheme] = useColorScheme();
  const mounted = useMounted();

  return (
    <Box component="header" border={1} borderTop={0} borderLeft={0} borderRight={0} borderColor="divider">
      <AppBar elevation={0} color="secondary" position="sticky">
        <Toolbar className={styles.toolbar}>
          <ButtonLink href="/">
            <Typography component="h1" variant="h5">
              Fullstack
            </Typography>
          </ButtonLink>

          <Box display="flex" alignItems="center">
              <IconButton color="primary" onClick={toggleTheme}>
                {
                  mounted && colorScheme === 'light' ?
                    <DarkIcon/> :
                    <LightIcon/>
                }
              </IconButton>

            <Hidden implementation="css" xsDown>
              <Button color="primary" className={styles.loginButton} variant="outlined">Login</Button>
              <Button color="primary" variant="contained">Register</Button>
            </Hidden>
            <Hidden implementation="css" smUp>
              <MobileAuthMenu/>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header;
