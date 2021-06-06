import config from '@/config'
import axios from 'axios'
import { serializeQueryParams } from './utils'
import { refreshToken } from '@/firebase/auth'
// params: perPage (pp), page (p)

export function getPeople (params) {
  const queryParams = serializeQueryParams(params)
  return axios({
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    url: `${config.api}/people`,
    headers: {
      'X-Auth-Token': refreshToken
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
      'X-Auth-Token': refreshToken
    }
  })
}

export function getImage (id) {
  return axios({
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    url: `${config.api}/images/${id}`,
    headers: {
      'X-Auth-Token': refreshToken
    }
  })
}

export function addImage () {
  return axios({
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    url: `${config.api}/images`,
    headers: {
      'X-Auth-Token': refreshToken
    }
  })
}

export function addPersonId (id) {
  return axios({
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    url: `${config.api}/people/${id}`,
    headers: {
      'X-Auth-Token': refreshToken
    }
  })
}
