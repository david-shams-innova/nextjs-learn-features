import React, { useState, useEffect } from 'react'

const AnimatedRobot = ({ 
  docWidth = 60,  // Initial document width
  docHeight = 80, // Initial document height
  animate = true  // Animation control
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  useEffect(() => {
    if (animate) {
      // Start expansion after initial robot animation
      setTimeout(() => setIsExpanded(true), 2000)
      // Return to original size after 1 more second
      setTimeout(() => setIsExpanded(false), 3000)
    }
  }, [animate])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <svg 
        viewBox="0 0 400 400" 
        className="w-full max-w-lg"
      >
        <defs>
          <style>
            {`
              @keyframes processData {
                0%, 100% { transform: rotate(0deg) }
                50% { transform: rotate(360deg) }
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
            `}
          </style>
        </defs>

        {/* Robot Body */}
        <rect x="100" y="100" width="200" height="250" rx="20" fill="#808080" />
        
        {/* Robot Head */}
        <rect x="125" y="50" width="150" height="100" rx="20" fill="#a0a0a0" />
        
        {/* Robot Eyes */}
        <circle cx="175" cy="100" r="15">
          <animate
            attributeName="fill"
            values="#ff0000#ff0000#00ff00"
            dur="2s"
            fill="freeze"
            begin="0s"
          />
        </circle>
        <circle cx="225" cy="100" r="15">
          <animate
            attributeName="fill"
            values="#ff0000#ff0000#00ff00"
            dur="2s"
            fill="freeze"
            begin="0s"
          />
        </circle>

        {/* Processing Circles */}
        <g>
          <circle cx="200" cy="225" r="40" fill="none" stroke="#00ff00" strokeWidth="4">
            <animate
              attributeName="opacity"
              values="110"
              dur="2s"
              fill="freeze"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 225"
              to="360 200 225"
              dur="0.5s"
              repeatCount="4"
            />
          </circle>
        </g>

        {/* Robot Mouth */}
        <path>
          <animate
            attributeName="d"
            values="M 150 280 Q 200 280 250 280M 150 280 Q 200 280 250 280M 150 280 Q 200 300 250 280"
            dur="2s"
            fill="freeze"
          />
          <animate
            attributeName="stroke"
            values="#ff0000#ff0000#00ff00"
            dur="2s"
            fill="freeze"
          />
          <animate
            attributeName="strokeWidth"
            values="444"
            dur="2s"
            fill="freeze"
          />
        </path>

        {/* Mortgage Document */}
        <g 
          className={`transition-transform duration-1000 ease-in-out ${
            isExpanded ? 'scale-150 translate-y-8' : ''
          }`}
        >
          <animate
            attributeName="opacity"
            values="001"
            dur="2s"
            fill="freeze"
          />
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