// components/ui/card.js
import React from 'react'

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  )
}