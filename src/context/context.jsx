import React, { useContext, useEffect,  useReducer } from 'react';
import EmployeeData from '../data/EmployeeData'
import TaskData from '../data/TaskData';
import reducer from '../reducer/reducer'

const url = ""

const AppContext = React.createContext()

const initialState = {
  employees: EmployeeData,
  task: TaskData,

}

export function useGlobalContext() {
    return useContext(AppContext);
}

export default function ContextProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState)

  const addEmployee = (item) =>{
    dispatch({
        type: 'ADD_EMPLOYEE',
        payload: item
    });
  }

  const assignTask = (item) =>{
      dispatch({
          type: 'ASSIGN_TASK',
          payload: item
      });
  }
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }
 
  const fetchData = async () => {
    const response = await fetch(url)
    const employees = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: employees })
  }

  const fetchData1 = async () => {
    const response = await fetch(url)
    const task = await response.json()
    dispatch({ type: 'DISPLAY_ITEM', payload: task })
  }
 
  useEffect(() => {
    fetchData()
    fetchData1()
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        remove,
        addEmployee,
        assignTask
      }}
    >
      {children}
    </AppContext.Provider>
  )
  }
    

