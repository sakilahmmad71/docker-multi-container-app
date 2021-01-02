import { useState, useEffect } from 'react'
import axios from 'axios'

const Fibonacci = () => {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState("")

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current')
    setValues(values.data)
  }

  const fetchIndexes = async () => {
    const values = await axios.get('/api/values/all')
    setSeenIndexes(values.data)
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ')
  }

  const renderCalulatedValues = () => {
    const entries = []

    for (let key in values) {
      entries.push(<div key={key}>For index {key} I Calculated {values[key]}</div>)
    }

    return entries
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('/api/values', { index })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter a input : </label>
        <input type="number" value={index} onChange={(e) => setIndex(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Indexes I have seen</h3>
        {renderSeenIndexes()}
        <h3>Calculated values</h3>
        {renderCalulatedValues()}
      </div>
    </div>
  )
}

export default Fibonacci
