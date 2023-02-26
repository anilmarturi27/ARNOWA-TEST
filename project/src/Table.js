import React from 'react'


const Table = ({data}) => {
    console.log(data)
  return (
        <table className='anil'>
  <tr>
    <th>DATE</th>
    <th>MESSAGE</th>
    <th>TIME DURATION</th>
  </tr>
{
    data.map((item)=>{
        return(
        <tr>
            <td>{item.date}</td>
            <td>{item.text}</td>
            <td>{item.timeDuration}</td>
        </tr>
        )
    })
}
</table>

  )
}

export default Table