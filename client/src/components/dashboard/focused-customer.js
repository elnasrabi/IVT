import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { useRouter } from 'next/router';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CH2ImageURL=  '/static/images/dashboard/CH2.png'
const SpecsaversImageURL=  '/static/images/dashboard/Specsavers.png'
const MakitaImageURL=  '/static/images/dashboard/makita.png'
const OtherImageURL=  '/static/images/dashboard/other.png'


export const CustomerFocused = (props) => {
  const router = useRouter();
  const FocusedCust=[]
  if(props.data){
    FocusedCust=props.data
  }
console.log('FocusedCust',FocusedCust)
  return (
  <Card {...props}>
    <CardHeader
      title="Focused Customers"
    />
    <Divider />
    <List>
      {FocusedCust.map((cust, i) => (
        <ListItem
          divider={i <= FocusedCust.length - 1}
          key={cust.Customer}
        >
          <ListItemAvatar>
          {cust.Customer=='CH2'?<img
              alt={cust.Customer} 
              src={CH2ImageURL}
              style={{
                height: 48,
                width: 48
              }}
            /> :  cust.Customer=='SPECSAVERS'? <img
            alt={cust.Customer}
            src={SpecsaversImageURL}
            style={{
              height: 48,
              width: 48
            }}
          />:  (cust.Customer=='Makita' || cust.Customer=='MAKITA')? <img
          alt={cust.Customer}
          src={MakitaImageURL}
          style={{
            height: 48,
            width: 48
          }}
        />:  <img
          alt={cust.Customer}
          src={OtherImageURL}
          style={{
            height: 48,
            width: 48
          }} 
        /> }
          </ListItemAvatar>
          <ListItemText
            primary={cust.TotCount}
           secondary={cust.Customer}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          onClick={()=>router.push('/exception/exceptions')}
        >
          View All
        </Button>
    </Box>
  </Card>
)};
