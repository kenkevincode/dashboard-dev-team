import config from '@/config'
import axios from 'axios'
import { serializeQueryParams } from './utils'
import { getRefreshToken } from '@/firebase/auth'

// params: perPage (pp), page (p)
export function getPeople (params) {
  const queryParams = serializeQueryParams(params)
  return axios({
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    url: `${config.api}/people`,
    headers: {
      // 'X-Auth-Token': getRefreshToken()
    },
    params: queryParams
  })
}

export function getPersonId () {
  return axios({
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    url: `${config.api}/people/{id}`,
    headers: {
      'X-Auth-Token': getRefreshToken()
    }
  })
}

export function updatePerson (id, data) {
  return axios({
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    url: `${config.api}/people/${id}`,
    headers: {
      'X-Auth-Token': getRefreshToken(),
      'Content-Type': 'applcation/json'
    },
    data: JSON.stringify(data)
  })
}
