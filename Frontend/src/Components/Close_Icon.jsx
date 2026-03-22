const Close_Icon = ({ size = 24, className = "" })=>{
  return(
    <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}>   
    <path d="M4.49123 32L0 27.5088L11.5489 15.9599L0 4.49123L4.49123 0L16.0401 11.5489L27.5088 0L32 4.49123L20.4511 15.9599L32 27.5088L27.5088 32L16.0401 20.4511L4.49123 32Z" 
      fill="currentColor"
      />
    </svg>
  );
}

export default Close_Icon;
