const Filter_Button = ({ size = 32, className = "" })=>{
  return(
    <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}>   
    <path d="M10.7739 24.608V17.216L9.61647 15.3964C8.9799 14.3957 7.89448 12.6856 7.20441 11.5961C6.51435 10.5067 5.39506 8.74134 4.71711 7.67307C4.03916 6.6048 3.16177 5.22032 2.76736 4.59645L2.05025 3.46213L1.02513 3.46184L0 3.46155V1.73077V0H16H32V1.73077V3.46154H30.9624H29.9248L29.7026 3.82692C29.4013 4.32214 26.37 9.08557 23.5225 13.5385L21.1859 17.1923V24.5961V32L15.9799 32L10.7739 32V24.608ZM17.6305 22.5448L17.6127 16.3204L19.0675 14.1025C19.8677 12.8827 20.9759 11.1923 21.5301 10.3461C22.0844 9.49999 23.3034 7.64807 24.239 6.23076C25.1746 4.81346 25.967 3.61057 25.9999 3.55769C26.0477 3.48097 24.0273 3.46154 16.0061 3.46154H5.95239L6.48455 4.28846C7.01974 5.12009 7.36971 5.65967 10.214 10.0385C11.066 11.35 12.3002 13.2625 12.9569 14.2885L14.1508 16.154V22.4616V28.7692L15.8995 28.7692H17.6482L17.6305 22.5448Z"
      fill="currentColor"
      />
  </svg>
  );
}

const Filter_Button_Link= ({ to = "/", size = 32, onClick })=>{
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
      <button onClick={onClick} className={className} aria-label="Filter_Button">
      <Filter_Button size={size} />
      </button>
  );
    
}


export default Filter_Button_Link;


