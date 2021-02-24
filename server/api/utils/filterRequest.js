import {
  convertDateTime
} from './convertDateTime'

export function filterRequest(params, deleted) {

  let query = {}
  if (deleted) {
    query.is_deleted = false
  }

  if (Object.keys(params).length) {
    for (let key in params) {
      if (key === 'token') delete params.token
      if (typeof params[key] === 'object') {
        let objQuery = params[key]
        // console.log(objQuery, 'objQuery')
        // query[key] = {}
        for (let objKey in objQuery) {
          if (objQuery[objKey]) {
            if (!query[key]) query[key] = {}
            let addQuery = query[key]
            if (objKey === 'from') {
              let from = convertDateTime(objQuery.from, 0)
              addQuery.$gte = new Date(from);
            } else if (objKey === 'to') {
              let to = convertDateTime(objQuery.to, 1)
              addQuery.$lte = new Date(to);
            } else if (objKey === 'min') {
              addQuery.$gte = +objQuery[objKey]
            } else if (objKey === 'max') {
              addQuery.$lte = +objQuery[objKey]
            }else if (objKey === 'min_ne') {
              addQuery.$gt = +objQuery[objKey]
            } else if (objKey === 'max_ne') {
              addQuery.$lt = +objQuery[objKey]
            }
            if (objKey === 'from-time') {
              let from = convertDateTime(objQuery['from-time'], 2)
              addQuery.$gt = new Date(from);
            } else if (objKey === 'to-time') {
              let to = convertDateTime(objQuery['to-time'], 2)
              addQuery.$lt = new Date(to);
            } else if (objKey === 'equal') {
              query[key] = objQuery[objKey]
            } else if (objKey === 'in') {
              let data = objQuery[objKey]
              query[key] = {
                $in: data.split(',')
              }
            } else if (objKey === 'nin') {
              let data = objQuery[objKey]
              query[key] = {
                $nin: data.split(',')
              }
            } else if (objKey === 'like') {
              query[key] = new RegExp(objQuery.like, 'i')
            }
          }
        }

      } else if (key !== 'sort_by' && key !== 'order_by' && key !== 'page' && key !== 'limit') {
        query[key] = params[key] //new RegExp(params[key], 'i')
      }
    }
  }
  return query
}

export function optionsRequest(params, deleted) {

  const {
    page,
    limit
  } = params;

  /*  console.log('params',params)
    console.log('page',page)
    console.log('limit',limit)*/
  let options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
    sort: {
      created_at: -1
    }
  }

  if (params.sort_by) {
    options.sort = {
      [params.sort_by]: -1
    }

    if (params.order_by) {
      options.sort = {
        [params.sort_by]: parseInt(params.order_by)
      }
    }
  }

  return options
}


export function optionsMyRequest(params, deleted) {

  const {
    page,
    limit
  } = params;

  /*  console.log('params',params)
    console.log('page',page)
    console.log('limit',limit)*/
  let options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 12,
    sort: {
      created_at: -1
    }
  }

  if (params.sort_by) {
    options.sort = {
      [params.sort_by]: -1
    }

    if (params.order_by) {
      options.sort = {
        [params.sort_by]: parseInt(params.order_by)
      }
    }
  }

  return options
}