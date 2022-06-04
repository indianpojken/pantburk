import React from "react"

import DaysSettings from "./Settings/Days"
import AddCategory from "./Settings/AddCategory"
import Categories from "./Settings/Categories"
import Notification from "./../Notification"

export default function SettingsForm({ settings }) {
  const [addNotification, setAddNotification] = React.useState("")

  return (
    <div className="columns settings">
      <div className="column is-narrow settings-border">
        <DaysSettings settings={settings} />
        <br />
      </div>
      <div className="column">
        <AddCategory notification={setAddNotification} />
        <br />
        <Categories settings={settings} />
        <Notification
          message={addNotification}
          setMessage={setAddNotification}
          timeout={4000}
          type="error"
        />
      </div>

      <style jsx>
        {`
        .settings-border {
          border-right: 1px solid #E8E8E8;
        }

        .settings { 
          width: 100%;
          overflow: auto;
          margin-left: 0.08em;
          margin-right: 0.08em;
        }
        `}
      </style>

      <style jsx global>{`
        :global(body) {
          padding: 0;
          margin: 0;
          overflow: hidden;
        }
        
        // https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
    </div>
  )
}
