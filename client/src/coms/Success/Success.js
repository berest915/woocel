import {  useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import authContext from '../../context/auth/authContext'

const Success = () => {
  const history = useHistory()
  const { user } = useContext(authContext)

  useEffect(() => {
    !user && history.push('/')
 
  }, [user, history])

  return (
    <div style={{color: 'white'}}>
      Success 
    </div>
  )
}

export default Success
