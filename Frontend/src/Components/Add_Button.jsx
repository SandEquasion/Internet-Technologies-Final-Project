const Add_Button = ({ size = 30, className = "" })=>{
  return(
    <svg
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}>   
    <rect width="30" height="30" rx="15" fill="currentColor"/>
    <rect x="5" y="13" width="20" height="4" fill="background"/>
    <rect x="13" y="25" width="20" height="4" transform="rotate(-90 13 25)" fill="background"/>
  </svg>
  );
}

const Add_Button_Link= ({ size = 30, onClick })=>{
  const className=
  `
    inline-flex items-center justify-center
    text-secondary_1
    hover:text-secondary_3
    active:text-secondary_2
    active:scale-90
    transition-all duration-150
  `

  return (
      <button onClick={onClick} className={className} aria-label="Add_Button">
      <Add_Button size={size} />
      </button>
  );
    
}


export default Add_Button_Link;


