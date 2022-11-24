import React, { FC } from 'react';
import { gql,useMutation } from '@apollo/client'
import { GET_BOOKMARKS } from './Bookmarks'
import { Box,ListItem,ListItemText,Typography,Checkbox,IconButton} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import BorderColorIcon from '@mui/icons-material/BorderColor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { BookmarkItemProps } from './interfaces'


const DELETE_BOOKMARK = gql`
mutation deleteBookmark ($id:ID!) {
 deleteBookmark (id:$id) {
     title
     description
     url
  }
 }
`

const BookmarkItem:FC <BookmarkItemProps> = ({ bookmark,handleUpdate}) => {
  
const [expanded, setExpanded] = React.useState(false);

const handleExpand = () => {
    setExpanded(!expanded);
  };
  
 const { id,title,description,url } = bookmark
  
const [deleteBookmark,{data,loading,error}] = useMutation(DELETE_BOOKMARK,{refetchQueries:[{query: GET_BOOKMARKS}]});

const Delete = (id:string) => { 
   deleteBookmark({variables: {id:id}})
}

   return (
     
  <Box bgcolor='#0A2347' mt={2} borderRadius={2}>
      <ListItem>

 <DeleteIcon onClick={()=> id && Delete(id)} />
                
 <ListItemText  primary={ title } primaryTypographyProps={{
                  fontSize: 18,
                  color: 'white',
                  ml:0.8,
                  fontWeight: 'small',
                  letterSpacing: 0}} />
                  
<IconButton color='secondary' onClick={ ()=> handleUpdate(bookmark)}  sx={{color:'white'}} size='medium'>
<BorderColorIcon fontSize="inherit"/>
</IconButton>
<a href={url} target="_blank" >
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
            {description}
          </Typography>
          
        
      </Collapse>
  </Box>
   )
}
export default BookmarkItem
