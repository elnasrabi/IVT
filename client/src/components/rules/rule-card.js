import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography,IconButton} from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import { EditMark  } from '../../icons/EditMark';

import Link from 'next/link'
//import { AddIcon, Edit } from '@mui/icons-material';

export const RuleCard = ({ Rule, ...rest }) => (


  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt="Rule"
          src={Rule.media}
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {Rule.title}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {Rule.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {/* <ClockIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            
          </Typography> */}
           <Link
          href={{
            pathname:Rule.path,
          }}  
        >
             <IconButton aria-label="add" tooltip="Go">
             <EditMark color="action" />
                </IconButton>
               </Link>
          
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
         
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {Rule.priroity}
            {'-'}
            Priority
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

RuleCard.propTypes = {
  Rule: PropTypes.object.isRequired
};
export default RuleCard;