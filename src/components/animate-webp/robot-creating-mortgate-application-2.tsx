import Button from '@/app/components/ui/button'
import React from 'react'
// import { Button } from "@/components/ui/button"

const RobotCalculator = ({ 
  width = 400,
  height = 300,
  robotColor = '#666',
  calculatorColor = '#ddd',
  backgroundColor = '#f0f0f0',
  documentDelay = 3000,
  onIncomeVerification = () => console.log('Income Verification clicked'),
  onEmploymentVerification = () => console.log('Employment Verification clicked')
}) => {
  const styles = {
    robotArm: {
      animation: 'calculate 0.5s infinite',
      transformOrigin: '150px 150px'
    },
    robotEye: {
      animation: 'blink 1s infinite'
    },
    document: {
      opacity: 0,
      animation: 'appear 1s forwards',
      animationDelay: `${documentDelay}ms`
    }
  }

  return (
    <div className="relative flex gap-4 p-4 w-full h-full bg-gray-100 rounded-lg">
      {/* Buttons Column */}
      <div className="flex flex-col gap-4 justify-center">
        <Button 
          variant="outline"
          className="whitespace-nowrap"
          onClick={onIncomeVerification}
        >
          Income Verification
        </Button>
        <Button 
          variant="outline"
          className="whitespace-nowrap"
          onClick={onEmploymentVerification}
        >
          Employment Verification
        </Button>
      </div>

      {/* Animation Container */}
      <div className="flex-1">
        <style>
          {`
            @keyframes calculate {
              0% { transform: translate(0, 0) rotate(0deg) }
              25% { transform: translate(0, -5px) rotate(-5deg) }
              75% { transform: translate(0, 5px) rotate(5deg) }
              100% { transform: translate(0, 0) rotate(0deg) }
            }
            @keyframes blink {
              0%, 100% { fill: #ff0000 }
              50% { fill: #990000 }
            }
            @keyframes appear {
              0% { opacity: 0 transform: translateY(20px) }
              100% { opacity: 1 transform: translateY(0) }
            }
          `}
        </style>

        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
        >
          {/* Background */}
          <rect width={width} height={height} fill={backgroundColor}/>
          
          {/* Calculator */}
          <rect className="calculator" x="120" y="140" width="80" height="100" rx="5" fill={calculatorColor}/>
          <rect x="130" y="150" width="60" height="20" fill="#333"/>
          <g fill="#666">
            {/* Calculator Buttons - Generated programmatically */}
            {[0, 1, 2].map(row => (
              [0, 1, 2].map(col => (
                <rect
                  key={`${row}-${col}`}
                  x={130 + col * 22}
                  y={180 + row * 20}
                  width="15"
                  height="15"
                  rx="2"
                />
              ))
            ))}
          </g>

          {/* Robot */}
          <g transform="translate(150, 150)">
            {/* Robot Head */}
            <rect x="-30" y="-60" width="60" height="50" fill={robotColor} rx="5"/>
            <circle style={styles.robotEye} cx="-10" cy="-40" r="5"/>
            <circle style={styles.robotEye} cx="10" cy="-40" r="5"/>
            {/* Robot Body */}
            <rect x="-25" y="-10" width="50" height="60" fill={robotColor}/>
            {/* Robot Arm */}
            <g style={styles.robotArm}>
              <rect x="25" y="0" width="40" height="10" fill={robotColor}/>
              <circle cx="65" cy="5" r="8" fill={robotColor}/>
            </g>
          </g>

          {/* Mortgage Application Document */}
          <g style={styles.document}>
            <rect x="220" y="140" width="100" height="120" fill="white" stroke="#333"/>
            <text x="235" y="170" fontFamily="Arial" fontSize="8" fill="#333">MORTGAGE</text>
            <text x="235" y="180" fontFamily="Arial" fontSize="8" fill="#333">APPLICATION</text>
            {[190, 200, 210, 220].map((y, index) => (
              <line
                key={index}
                x1="235"
                y1={y}
                x2="305"
                y2={y}
                stroke="#333"
                strokeWidth="1"
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default RobotCalculator