import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { Workbox } from 'workbox-window'
import emitter from './emitter'

render(<App />, document.getElementById('app'))

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

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        await registerServiceWorker()
    })
}
