const Arrow_Icon = ({ size = 24, className = "" })=>{
  return(
    <svg
    width={size}
    height={size}
    viewBox="0 0 34 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}>   
    <path d="M34 3.01486L17 20L0 3.01486L3.0175 0L17 13.9703L30.9825 0L34 3.01486Z" 
      fill="currentColor"
      />
    </svg>
  );
}

export default Arrow_Icon;
