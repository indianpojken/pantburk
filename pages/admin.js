import Head from "next/head"
import useSWR from "swr"

import Schedule from "./../components/Schedule"
import AdminForm from "./../components/Admin/Form"

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

  if (new TimeHelpers(settings).isOpenToday()) {
    return (
      <div className="tile is-ancestor">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Pantburk (Admin)</title>
        </Head>
        <div className="timeline-border">
          <AdminForm settings={settings}/>

        <style jsx>{`
          .timeline-border {
            padding-right: 20px;
            padding-left: 20px;
            border-right: 1px solid #E8E8E8;
          }
        `}</style>
        </div>
        <Schedule admin={true} settings={settings} />
      </div>
    )
  } else {
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Pantburk (Admin)</title>
        </Head>
        <div>
          <p>Stängt</p>
        </div>
      </div>
    )
  }
}
