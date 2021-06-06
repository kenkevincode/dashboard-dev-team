export function serializeQueryParams (params) {
  const up = new URLSearchParams()
  Object.keys(params).forEach(name => {
    up.append(name, params[name])
  })
  return up
}
