

import _axios from 'axios'
import { actionType, loadingState, constants } from 'constant'
const axiosRetry = require('axios-retry') 


const axios = _axios.create({
  // validateStatus: (status)=> true // status >= 200 && status <= 503
  baseURL: constants.SERVER_URL,
  timeout: 4 * 1000,
  withCredentials: true,

})

axiosRetry(axios, { 
  retries: 2, 
  retryCondition: axiosRetry.isRetryableError, 
  function (retryNumber = 0) {
    const seconds = Math.pow(2, retryNumber) * 1000
    const randomMs = 1000 * Math.random()
    return seconds + randomMs
  }, 
})

export const reducer = (state, action) =>{
    switch (action.type) {
        case actionType.REQUEST:
            return { status: loadingState.LOADING }
        case actionType.SUCCESS:
            return { status: loadingState.SUCCESS, data: action.results }
        case actionType.FAILURE:
            return { status: loadingState.ERROR, error: action.error }
        default :
            return { status: loadingState.EMPTY }
    }
}


export const http = async ({url, method, data, params, responseType, dispatch}) => {
    try{

        if(dispatch && typeof dispatch === "function")
          dispatch({ type: actionType.REQUEST })
        
        const {data: response} = await axios({
            url, method, params, data, responseType,
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            }
        })

        if(dispatch && typeof dispatch === "function") 
          dispatch({ type: actionType.SUCCESS, results: response })
        else
          return response

    }catch(error) {

        let response = {}
        if (error.response)     response = error.response.data
        else if (error.request) response = error.request
            else                response = error.message
        
        if(dispatch && typeof dispatch === "function")
          dispatch({ type: actionType.FAILURE, error: response })
        else
          return response

    } finally {
        
    }
}