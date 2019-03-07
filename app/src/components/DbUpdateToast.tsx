import { Text } from 'fannypack'
import React, { useEffect } from 'react'
import emitter from '../emitter'

type Props = {
    toast: {
        info: (props) => void
    }
    onClick: () => void
}

export function DbUpdateToast({ toast, onClick }: Props) {
    useEffect(() => {
        function handleCacheUpdate() {
            //FIXME: Cannot programmatically close toasts
            toast.info({
                message: (
                    <Text cursor="pointer" onClick={onClick}>
                        Some new events have been created. <b>tap here</b> to refresh
                    </Text>
                ),
                autoDismissTimeout: 0
            })
        }

        emitter.on('db-update', handleCacheUpdate)

        // return emitter.off('db-update', handleCacheUpdate)
    }, [])

    return null
}
