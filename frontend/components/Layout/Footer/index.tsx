import { Box } from '@material-ui/core';

function Footer(props): JSX.Element {
  return (
    <Box component="footer" border={1} borderBottom={0} borderRight={0} borderLeft={0} borderColor="divider" {...props}>
      Footer
    </Box>
  )
}

export default Footer;
