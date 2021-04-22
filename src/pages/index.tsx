// SSG
// Every 8 hours when a person accesses the page, a new version of that page will be generated, that is, 
// during the day, only 3 calls to the API will be made to fetch the data.

import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';

type Episode = {
  episodes: Array<{
    id: string;
    title: string;
    members: string;
    published_at: string;
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
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      description: episode.description,
      url: episode.file.url,
    };
  })

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
