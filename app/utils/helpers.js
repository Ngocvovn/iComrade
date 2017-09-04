import { isEmpty, keys } from "ramda";

export const buildQueryOpts = (queries) => {
  if (isEmpty(queries)) return {}
  const {
    location: city,
    bedrooms,
    bathrooms,
    maxArea,
    maxPrice,
    minArea,
    minPrice,
    parking
  } = queries

  return normalizeQuery({
    city,
    bedrooms,
    bathrooms,
    price: { $gte: minPrice, $lte: maxPrice },
    lotSizeSqFt: { $gte: minArea, $lte: maxArea },
    parkingType: parking === 'yes' ? { $exists: true } : (parking === 'no' ? { $exists: false } : {})
  })
}

const normalizeQuery = (obj) => {
  return keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'undefined') return acc

    if (typeof obj[key] === 'object') {
      const childObject = normalizeQuery(obj[key])
      return isEmpty(childObject) ? acc : {...acc, [key]: childObject }
    }

    return {...acc, [key]: obj[key] }

  }, {})

}

export const unAuthorizeUser = res => res.status(401).json({ success: false, message: 'Failed to authenticate token.' })

export const getToken = req => req.headers['x-access-token']
