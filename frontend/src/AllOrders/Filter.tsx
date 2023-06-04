import React from 'react'
import { BiFilterAlt } from 'react-icons/bi'

interface Props {
  name?: string
  className: string
}

const Filter: React.FC<Props> = ({ className }) => {
  return (
        <div className={`flex items-center ${className}`}>
            <BiFilterAlt size={'2rem'}/>
            <span className='font-roboto font-bold ml-2 text-2xl'>Filter</span>
        </div>
  )
}

export default Filter
