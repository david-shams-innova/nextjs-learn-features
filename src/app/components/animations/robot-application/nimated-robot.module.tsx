import React, { useState, useEffect } from 'react'

const AnimatedRobot = ({ 
  docWidth = 60,  
  docHeight = 80, 
  animate = true  
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  useEffect(() => {
    if (animate) {
      setTimeout(() => setIsExpanded(true), 2000)
      setTimeout(() => setIsExpanded(false), 3000)
    }
  }, [animate])

  const keyframes = `
    @keyframes processData {
      0% { transform: rotate(0deg) opacity: 1 }
      90% { transform: rotate(720deg) opacity: 1 }
      100% { transform: rotate(720deg) opacity: 0 }
    }
    @keyframes colorChange {
      0%, 90% { fill: #ff0000 }
      100% { fill: #00ff00 }
    }
    @keyframes documentAppear {
      0%, 90% { opacity: 0 transform: translateY(50px) }
      100% { opacity: 1 transform: translateY(0) }
    }
    @keyframes smile {
      0%, 90% { d: path('M 150 280 Q 200 280 250 280') }
      100% { d: path('M 150 280 Q 200 300 250 280') }
    }
    @keyframes strokeChange {
      0%, 90% { stroke: #ff0000 }
      100% { stroke: #00ff00 }
    }
  `

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <svg 
        viewBox="0 0 400 400" 
        className="w-full max-w-lg"
      >
        <defs>
          <style>{keyframes}</style>
        </defs>

        {/* Robot Body */}
        <rect 
          x="100" 
          y="100" 
          width="200" 
          height="250" 
          rx="20" 
          fill="#808080" 
          style={{
            opacity: isExpanded ? 0 : 1,
            transition: 'opacity 0.5s'
          }}
        />
        
        {/* Robot Head */}
        <rect 
          x="125" 
          y="50" 
          width="150" 
          height="100" 
          rx="20" 
          fill="#a0a0a0" 
          style={{
            opacity: isExpanded ? 0 : 1,
            transition: 'opacity 0.5s'
          }}
        />
        
        {/* Robot Eyes */}
        <circle 
          cx="175" 
          cy="100" 
          r="15" 
          style={{
            opacity: isExpanded ? 0 : 1,
            transition: 'opacity 0.5s',
            animation: 'colorChange 2s forwards'
          }}
        />
        <circle 
          cx="225" 
          cy="100" 
          r="15" 
          style={{
            opacity: isExpanded ? 0 : 1,
            transition: 'opacity 0.5s',
            animation: 'colorChange 2s forwards'
          }}
        />

        {/* Processing Circles */}
        <g style={{
          opacity: isExpanded ? 0 : 1,
          transition: 'opacity 0.5s'
        }}>
          <circle 
            cx="200" 
            cy="225" 
            r="40" 
            fill="none" 
            stroke="#00ff00" 
            strokeWidth="4" 
            style={{
              animation: 'processData 2s forwards'
            }}
          />
        </g>

        {/* Robot Mouth */}
        <path 
          d="M 150 280 Q 200 280 250 280" 
          strokeWidth="4" 
          fill="none"
          style={{
            opacity: isExpanded ? 0 : 1,
            transition: 'opacity 0.5s',
            animation: 'smile 2s forwards, strokeChange 2s forwards'
          }}
        />

        {/* Mortgage Document */}
        <g style={{
          opacity: 1,
          transform: isExpanded ? 'scale(25)' : 'scale(1)',
          transition: 'transform 1s ease-in-out',
          transformOrigin: 'center'
        }}>
          <rect 
            x={200 - docWidth/2} 
            y={225 - docHeight/2} 
            width={docWidth} 
            height={docHeight} 
            fill="#ffffff" 
            stroke="#000000" 
          />
          <line 
            x1={200 - docWidth/2 + 10} 
            y1={225 - docHeight/2 + 20} 
            x2={200 + docWidth/2 - 10} 
            y2={225 - docHeight/2 + 20} 
            stroke="#000000" 
            strokeWidth="2" 
          />
          <line 
            x1={200 - docWidth/2 + 10} 
            y1={225} 
            x2={200 + docWidth/2 - 10} 
            y2={225} 
            stroke="#000000" 
            strokeWidth="2" 
          />
          <line 
            x1={200 - docWidth/2 + 10} 
            y1={225 + docHeight/2 - 20} 
            x2={200 + docWidth/2 - 10} 
            y2={225 + docHeight/2 - 20} 
            stroke="#000000" 
            strokeWidth="2" 
          />
        </g>
      </svg>
    </div>
  )
}

export default AnimatedRobot