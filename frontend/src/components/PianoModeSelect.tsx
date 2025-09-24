import { useState } from 'react'
import type { PianoMode } from '../modes/types';

const PianoModeSelect = () => {
  const [mode, setMode] = useState("normal");
  
  return (
    <div className='flex items-center gap-2'>
      <p className='text-gray-400'>Mode</p>
      <select className='border border-gray-300 rounded-md px-3 py-1 outline-0 appearance-none hover:bg-gray-100'
        value={mode}
        onChange={(e) => setMode(e.target.value)}>
        <option value="normal">Normal</option>
        <option value="touch">Touch</option>
      </select>
    </div>
  )
}

export default PianoModeSelect