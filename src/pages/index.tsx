// SSG
// Every 8 hours when a person accesses the page, a new version of that page will be generated, that is, 
// during the day, only 3 calls to the API will be made to fetch the data.

import { GetStaticProps } from 'next';

type Episode = {
  episodes: Array<{
    id: string;
    title: string;
    members: string;
  }>
}

type HomeProps = {
  episodes: Episode[];
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
