import Head from "next/head"

import Schedule from "./../components/Schedule"

import { isOpenToday } from "./../library/timehelpers"

export default function Index() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pantburk</title>
      </Head>
      {isOpenToday()
        ? <Schedule admin={false} />
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
