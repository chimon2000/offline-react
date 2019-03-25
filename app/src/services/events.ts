import { saveEventDataLocally, getLocalEventData } from '../db'
import { baseUrl } from '../config/env'
import { enableOptimisticUI } from '../config/features.json'
import ky from 'ky'

export const addPostEvent = async data => {
  const newEvent = { id: Date.now(), ...data }

  if (enableOptimisticUI) {
    saveEventDataLocally([newEvent])

    ky.post(`${baseUrl}/add`, { json: newEvent }).then(
      () => !enableOptimisticUI && saveEventDataLocally([newEvent])
    )

    return newEvent
  }

  await ky.post(`${baseUrl}/add`, { json: newEvent })

  saveEventDataLocally([newEvent])

  return newEvent
}
