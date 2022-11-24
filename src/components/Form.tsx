import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client';
import { GET_BOOKMARKS } from './Bookmarks'
import { Box,Typography,Stack, Button, FormControl, Modal } from '@mui/material'
import { TextField } from "formik-mui";
import { Formik, Form, Field } from 'formik'
import { Schema } from './Schema'
import { Bookmark,FormProps } from './interfaces'


const BookmarkForm:FC <FormProps> = ({ handleModal, open, current, setCurrent, updateBookmark }) => {

const ADD_BOOKMARK = gql`
mutation addBookmark ($title:String!,$description:String,$url:String!){

 addBookmark (title:$title,description:$description,url:$url) {
     id
     title
     description
     url
}
}
`


const [addBookmark,{data,loading,error}] = useMutation(ADD_BOOKMARK,{
  refetchQueries: [{query: GET_BOOKMARKS}]
})

  const formData:Bookmark = { 
    title: '', 
    description: '',
    url: '',
  }
  
  return (

    <div>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography variant="h5" fontWeight={350} mx={11}>
      { current ? 'Update Bookmark' : 'Add Bookmark' }
        </Typography>
          <Formik
            initialValues={ current !==null ? current : formData }
            validationSchema={Schema}

            onSubmit={(values) => {
            console.log(values.title)
              if(current !== null)  {
                
                const updatedValue = {
                  id: current.id,
                  title: values.title,
                  description: values.description,
                  url: values.url
                  
                }
              updateBookmark(updatedValue)
                handleModal()
                setCurrent(null)
               
              } else {

                const bookmark = {
                  title: values.title,
                  description: values.description,
                  url: values.url
                  
                }
         addBookmark({variables:bookmark })
              
                handleModal()

              }
          
              // setTimeout(() => {

                
              // }, 2000)
             
            }}
          >

            <Form autoComplete="off">

              <Box mt={3}>

                <FormControl sx={{ m: '1rem 5rem' }}>

                  <Field
                    component={TextField}
                    id="title"
                    label="Title"
                    name='title'
                  />
                </FormControl>

                <FormControl sx={{ m: '1rem 5rem' }}>

                  <Field
                    component={TextField}
                    id="description"
                    label="Description"
                    name='description'
                  />
                </FormControl>
                
                <FormControl sx={{ m: '1rem 5rem' }}>

                  <Field
                    component={TextField}
                    id="url"
                    label="URL"
                    name='url'
                  />
                </FormControl>
              </Box>

              <Stack m={3} direction='row' justifyContent='space-around'>

                <Button size='large'
                  variant='contained'
                  type='submit' >
                { current ? 'Update Bookmark':'Add Bookmark' }
                </Button>

              </Stack>
            </Form>

          </Formik>
        </Box>
      </Modal>
    </div>

  )
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: 24,
  p: 4,
};



export default BookmarkForm;
