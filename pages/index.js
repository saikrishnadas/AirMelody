import Head from 'next/head'
import Header from "../components/Header"
import Playlist from '../components/Playlist'
import MainBody from '../components/MainBody'
import { getSession } from 'next-auth/react'
import Player from '../components/Player'

export default function Home() {
  return (
    <div className="p-2 min-h-screen bg-black text-white">
      <Head>
        <title>Air Melody</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <main className="flex">
      <MainBody />
      <Playlist />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  return{
    props:{
      session,
    }
  }
}