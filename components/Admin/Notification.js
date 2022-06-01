const messages = {
  "conflict": "Bokning kunde inte läggas till, då tid krockar.",
  "before-open": "Bokning kunde inte läggas till, starttid är före öppningstid.",
  "after-close": "Bokning kunde inte läggas till, sluttid är efter stängningstid.",
}

export default function Notification({ message }) {
  if (message !== "") {
    return (
      <div className="notification is-danger">
        {messages[message]}
        <style jsx>{`
            .notification {
              margin-bottom: 24px;
            }
          `}</style>
      </div>
    )
  } else {
    return (<></>)
  }
}
