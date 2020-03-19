import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  footer: {
    marginTop: 'auto',
    height: '50px',
    backgroundColor: theme.palette.secondary.main,
  }
}));

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <Paper elevation={0} className={styles.root}>
        <Header />
        {children}
        <Footer className={styles.footer} />
    </Paper>
);
}

export default Layout;
