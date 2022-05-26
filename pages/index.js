import Head from "next/head"
import useSWR from "swr"

import Schedule from "./../components/Schedule"

import TimeHelpers from "./../library/timehelpers"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function getSettings() {
  const { data, error } = useSWR("/api/settings", fetcher)

  return {
    settings: data,
    error: error,
  }
}

export default function Index() {
  const { settings, error } = getSettings()
  
  if (error) return <div>Failed to load</div>
  if (!settings) return <div>Loading...</div>

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pantburk</title>
      </Head>
      {new TimeHelpers(settings).isOpenToday()
        ? <Schedule admin={false} settings={settings} />
        : <p>Stängt</p>
      }
      <style jsx global>{`
        // https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          font-size: 1.05em;
        }
      `}</style>
    </div>
  )
}
