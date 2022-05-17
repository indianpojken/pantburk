import Head from "next/head"
import Schedule from "../components/Schedule"
import AdminForm from "../components/Admin/Form"

import { isOpenToday } from "./../library/timehelpers.js"

export default function Index() {
  if (isOpenToday()) {
    return (
      <div className="tile is-ancestor">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Pantburk (Admin)</title>
        </Head>
        <div className="timeline-border">
          <AdminForm />

          <style jsx>{`
          .timeline-border {
            padding-right: 20px;
            padding-left: 20px;
            border-right: 1px solid #E8E8E8;
          }
        `}</style>
        </div>
        <Schedule admin={true} />
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
