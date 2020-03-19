import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: 'auto',
    height: '50px',
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}));

function Footer(props): JSX.Element {
  const styles = useStyle();

  return (
    <Box
      component="footer"
      border={1}
      borderBottom={0}
      borderRight={0}
      borderLeft={0}
      borderColor="divider"
      className={styles.root}
    >
      <Link className={styles.link} href="https://github.com/gabrielcolson/fullstack">
        <Typography>Watch this on {' '}</Typography>
        <GitHubIcon className={styles.icon}/>
      </Link>
    </Box>
  )
}

export default Footer;
