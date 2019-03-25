import { Text } from 'fannypack'
import React, { useEffect } from 'react'
import emitter from '../emitter'

export function CacheUpdateToast({ toast }) {
  useEffect(() => {
    console.log('add cache update listener!')

    function handleCacheUpdate() {
      toast.info({
        message: (
          <Text cursor="pointer" onClick={() => window.location.reload()}>
            A new version of the app is available. <b>tap here</b> to refresh
          </Text>
        ),
        autoDismissTimeout: 0
      })
    }

    emitter.on('cache-update', handleCacheUpdate)

    return () => emitter.off('cache-update', handleCacheUpdate)
  }, [])

  return null
}
