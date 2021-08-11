import { Menu } from '../../components/Menu'
import work from "../../Assets/img/Work Group.svg"
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Toaster } from 'react-hot-toast'
import { BackgroundGroups } from '../../components/BackgroundGroups'

export const WorkGroup = () => {
  const [goals, setGoals] = useState([])
  const [activities, setActivies] = useState([])

  useEffect(() => {
    api.get('/goals/?group=1246')
      .then(resp => setGoals(resp.data.results))
    
    api.get('/activities/?group=1246')
      .then(resp => setActivies(resp.data.results))
  }, [])

  return(
    <>
      <Toaster />
      <Menu />
      <BackgroundGroups 
        groupName='Trabalho' 
        image={work} 
        goals={goals} 
        backgroundColor='#9DA0EC'
        activities={activities}
      />
    </>
  )
}