# Pantburk
A simple booking system, intended for youth recreation centers. 

## Setup
```bash
npm i
npm run build
```

## How to use
Start with
```bash
npm run start # -- -p 80
```

Go to '/admin' to add new bookings.
If you don't specify the desired time, the current time (hh:mm) will be used.

'/' is intended for browser in kiosk-mode.

## How to configure
Configure in 'settings.js'.

```js
export const days = {
  // ...
  "Monday": { // 
    open: "15:00",
    close: "23:00",
  }
  // ...
}
```

```js
export const categories = {
  // ...
  "pingpong": {
    title: "Ping-Pong 🏓",
    duration: 45,
    bgColor: "#FEBF97",
    borderColor: "#FE6960",
  }
  // ...
}
```


