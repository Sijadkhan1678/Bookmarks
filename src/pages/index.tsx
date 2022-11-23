import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/Layout";
import Bookmarks from '../components/Bookmarks'



const Home:React.FC = () => {
  return (
    <Layout >
    <Bookmarks />
      
      
    </Layout>
  )
}

export default Home;

export const Head: HeadFC = () => <title>Home Page</title>
