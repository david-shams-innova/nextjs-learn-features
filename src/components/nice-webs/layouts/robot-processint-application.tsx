import React from 'react'

const MortgageRobot = ({ 
  width = 400,
  height = 300,
  robotColor = '#3498db',
  speechText = 'Processing...',
  className = ''
}) => {
  return (
    <div className={className}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 400 300"
        width={width}
        height={height}
        className="w-full h-auto"
      >
        {/* Background */}
        <rect width="400" height="300" fill="#f0f4f8"/>
        
        {/* Mortgage Application Paper */}
        <g transform="translate(220,50)">
          {/* Paper */}
          <rect x="0" y="0" width="140" height="180" fill="white" stroke="#ccc" strokeWidth="2" rx="5"/>
          {/* Title */}
          <rect x="10" y="10" width="120" height="20" fill="#e0e0e0" rx="3"/>
          {/* Form Lines */}
          <rect x="10" y="40" width="120" height="8" fill="#e0e0e0" rx="2"/>
          <rect x="10" y="60" width="120" height="8" fill="#e0e0e0" rx="2"/>
          <rect x="10" y="80" width="120" height="8" fill="#e0e0e0" rx="2"/>
          <rect x="10" y="100" width="80" height="8" fill="#e0e0e0" rx="2"/>
          {/* Checkbox Areas */}
          <rect x="10" y="120" width="12" height="12" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
          <rect x="10" y="140" width="12" height="12" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
          <rect x="10" y="160" width="12" height="12" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
        </g>

        {/* Calculator */}
        <g transform="translate(140,120)">
          {/* Calculator Body */}
          <rect x="0" y="0" width="60" height="80" fill="#2c3e50" rx="5"/>
          {/* Calculator Screen */}
          <rect x="5" y="5" width="50" height="20" fill="#a8e6cf" rx="2"/>
          {/* Calculator Buttons */}
          <g fill="#95a5a6">
            <rect x="5" y="30" width="12" height="10" rx="2"/>
            <rect x="24" y="30" width="12" height="10" rx="2"/>
            <rect x="43" y="30" width="12" height="10" rx="2"/>
            
            <rect x="5" y="45" width="12" height="10" rx="2"/>
            <rect x="24" y="45" width="12" height="10" rx="2"/>
            <rect x="43" y="45" width="12" height="10" rx="2"/>
            
            <rect x="5" y="60" width="12" height="10" rx="2"/>
            <rect x="24" y="60" width="12" height="10" rx="2"/>
            <rect x="43" y="60" width="12" height="10" rx="2"/>
          </g>
        </g>

        {/* Robot */}
        <g transform="translate(40,80)">
          {/* Robot Head */}
          <rect x="20" y="0" width="60" height="50" fill={robotColor} rx="10"/>
          {/* Robot Eyes */}
          <circle cx="40" cy="20" r="8" fill="#fff"/>
          <circle cx="60" cy="20" r="8" fill="#fff"/>
          <circle cx="40" cy="20" r="4" fill="#2c3e50"/>
          <circle cx="60" cy="20" r="4" fill="#2c3e50"/>
          {/* Robot Antenna */}
          <rect x="45" y="-10" width="10" height="15" fill="#e74c3c"/>
          <circle cx="50" cy="-12" r="5" fill="#f1c40f"/>
          {/* Robot Body */}
          <rect x="30" y="50" width="40" height="60" fill={robotColor} rx="5"/>
          {/* Robot Arms */}
          <rect x="0" y="60" width="30" height="10" fill={robotColor} rx="5"/>
          <rect x="70" y="60" width="50" height="10" fill={robotColor} rx="5"/>
          {/* Robot Hand (holding calculator) */}
          <circle cx="115" cy="65" r="8" fill={robotColor}/>
          {/* Robot Legs */}
          <rect x="35" y="110" width="10" height="40" fill={robotColor} rx="5"/>
          <rect x="55" y="110" width="10" height="40" fill={robotColor} rx="5"/>
          {/* Robot Feet */}
          <rect x="30" y="145" width="20" height="10" fill={robotColor} rx="5"/>
          <rect x="50" y="145" width="20" height="10" fill={robotColor} rx="5"/>
        </g>

        {/* Robot Details */}
        <g transform="translate(40,80)">
          {/* Panel Lines */}
          <line x1="35" y1="70" x2="65" y2="70" stroke="#fff" strokeWidth="2"/>
          <line x1="35" y1="80" x2="65" y2="80" stroke="#fff" strokeWidth="2"/>
          <line x1="35" y1="90" x2="65" y2="90" stroke="#fff" strokeWidth="2"/>
        </g>

        {/* Speech Bubble */}
        <g transform="translate(20,40)">
          <path 
            d="M60,0 L100,0 Q110,0 110,10 L110,30 Q110,40 100,40 L70,40 L60,50 L50,40 L20,40 Q10,40 10,30 L10,10 Q10,0 20,0 Z" 
            fill="white" 
            stroke={robotColor} 
            strokeWidth="2"
          />
          <text 
            x="60" 
            y="25" 
            textAnchor="middle" 
            fill="#2c3e50" 
            fontSize="12"
          >
            {speechText}
          </text>
        </g>
      </svg>
    </div>
  )
}

// Example usage showing how to use the component in different contexts
const ExampleUsage = () => {
  return (
    <div className="p-4 space-y-8">
      {/* Default usage */}
      <div className="w-100">
        <MortgageRobot />
      </div>

      {/* Custom colored robot */}
      {/* <div className="w-72">
        <MortgageRobot 
          robotColor="#e74c3c"
          speechText="Hello!"
        />
      </div> */}

      {/* Small version */}
      {/* <div className="w-48">
        <MortgageRobot 
          width={200}
          height={150}
          robotColor="#27ae60"
          speechText="Hi there!"
        />
      </div> */}
    </div>
  )
}

export default ExampleUsage