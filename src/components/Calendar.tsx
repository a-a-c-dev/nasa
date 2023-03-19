
interface CalendarProps {
  min: string,
  max:string, 
  startDate:string,
  dateInputRef:React.RefObject<HTMLInputElement>
  handleChange:Function
}


function Calendar({min='', max='30-01-2023', startDate,dateInputRef,handleChange}:CalendarProps) {
  return ( <input type="date" value={startDate} min={min} max={max} ref={dateInputRef} onChange={(e)=>handleChange(e.target.value)}/>
  )
}

export default Calendar