// Custom Button component
const Button = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 
      active:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 
      focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  );
  
  export default Button;