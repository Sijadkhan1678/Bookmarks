import React from 'react';
import { Box,List,Typography,Fab ,IconButton} from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkItem from './BookmarkItem'
const Bookmarks = () => {
   return (
     <Box sx={{ width: '88%', maxWidth: 570, m: '0rem auto' }}  >
     


<Typography variant='h4' mt={0} fontSize="0.95rem" component='div'>
      Bookmarks
    </Typography>
      <List>
      <BookmarkItem />
      <BookmarkItem />
      <BookmarkItem />
      
      
      
      </List>
<Fab color="secondary" sx={{mx:{xs:'9rem',md:"15rem"},my:'2.3rem'}} aria-label="add" >
 <BookmarkAddIcon />
</Fab>
     </Box>
   )
}
export default Bookmarks