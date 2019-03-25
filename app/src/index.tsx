import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { Workbox } from 'workbox-window'
import emitter from './emitter'
import { Global, css } from '@emotion/core'
import { enableServiceWorker } from './config/features.json'

render(
  <>
    <Global
      styles={css`
        body {
          overflow-y: hidden;
        }
      `}
    />
    <App />
  </>,
  document.getElementById('app')
)

//1: Convert application to cache assets Workbox
const registerServiceWorker = async () => {
  try {
    const wb = new Workbox('/sw.js')

    wb.addEventListener('installed', event => {
      if (event.isUpdate) {
        console.log('emit cache-update')
        emitter.emit('cache-update')
      }
    })

    wb.register()

    console.log(`Service Worker registered! `)

    return wb
  } catch (err) {
    console.log(`Service Worker registration failed: ${err}`)

    return null
  }
}

const unregisterServiceWorker = async () => {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}
// In some cases we may want to only enable service workers in production.
if ('serviceWorker' in navigator && enableServiceWorker) {
  window.addEventListener('load', async () => {
    await registerServiceWorker()
  })
} else {
  unregisterServiceWorker()
}
