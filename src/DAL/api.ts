import axios from "axios"

const instanse = axios.create({
  baseURL: 'http://localhost:3004'
})

type setCounterValueType = {
  value: number
}

export const api = {
  setCounterValue: (value: number) => {
    return instanse.post<setCounterValueType>('/counter', {value})
      .then(res => res.data.value)
  },
  getCounterValue: () => {
    return instanse.get<setCounterValueType>('/counter')
      .then(res => res.data.value)
  }
}