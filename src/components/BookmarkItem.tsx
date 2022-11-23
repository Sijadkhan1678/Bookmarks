import React from 'react';
import { Box,ListItem,ListItemText,Typography,Checkbox,IconButton} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import BorderColorIcon from '@mui/icons-material/BorderColor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
const BookmarkItem = () => {
  
const [expanded, setExpanded] = React.useState(false);

const handleExpand = () => {
    setExpanded(!expanded);
  };
  
  
   return (
     
  <Box bgcolor='#0A2347' mt={2} borderRadius={2}>
      <ListItem>

 <DeleteIcon  />
                
<ListItemText  primary="there is  in Bookmark" primaryTypographyProps={{
                  fontSize: 18,
                  color: 'white',
                  ml:0.8,
                  fontWeight: 'small',
                  letterSpacing: 0}} />
<IconButton color='secondary' sx={{color:'white'}} size='medium'>
<BorderColorIcon fontSize="inherit"/>
</IconButton>
<a href="https://www.google.com">
 <IconButton aria-label="delete" size="large" style={{color:"white"}} edge="end" >
 
  <OpenInNewIcon />
  
</IconButton>   
</a>
  <IconButton size="small" onClick={handleExpand}  sx={{color:"white", ml:1}}>
      <ExpandMoreIcon />
      </IconButton>
      </ListItem>
<Collapse in={expanded} timeout="auto" unmountOnExit>
        
     <Typography paragraph px={2.3}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp 
          </Typography>
          
        
      </Collapse>
  </Box>
   )
}
export default BookmarkItem