import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import  DrawerAppBar  from '../components/MenuBar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DrawerAppBar/>
    </div>
  )
}

export default Home
