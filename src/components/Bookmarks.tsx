import React,{ FC } from 'react';
import { Box,List,Typography,Fab ,IconButton,LinearProgress } from '@mui/material'
import { gql,useQuery } from '@apollo/client'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkItem from './BookmarkItem'
import { BookmarksProps,Bookmark } from './interfaces'

export const GET_BOOKMARKS = gql`
query getBookmarks{
 
bookmarks {
    id
    title
   description
   url
}

}
`

const Bookmarks: FC <BookmarksProps> = ({ handleModal,handleUpdate }) => {
  
const { data,loading,error } = useQuery(GET_BOOKMARKS)
  
const Loading = <LinearProgress color="secondary" />
  
   return (
     <Box sx={{ width: '88%', maxWidth: 570, m: '0rem auto' }}  >
     


<Typography variant='h4' mt={0} fontSize="0.95rem" component='div'>
      Bookmarks
    </Typography>
      <List>
      
{ loading ? Loading : data.bookmarks.map( ( bookmark:Bookmark ) => (  
      <BookmarkItem key={bookmark.id} bookmark={bookmark} handleUpdate={handleUpdate}/>
      ))
}
      </List>

<Fab color="secondary" onClick={ ()=> handleModal() }  sx={{mx:{xs:'9rem',md:"15rem"},my:'2.3rem'}} aria-label="add" >
 <BookmarkAddIcon />
</Fab>

     </Box>
   )
}
export default Bookmarks
