// How to animate .webp image on a webpage e.g. on the following web page a webp image is animated on scroll: https://githubuniverse.com/hero-static.webp
import React, { useEffect } from "react"

export default function AnimateWebp() {
  useEffect(() => {
    const handleScroll = () => {
      const image = document.querySelector(".scroll-animate img")
      const scrollY = window.scrollY

      // Calculate animation values
      const scaleValue = 1 + scrollY * 0.0005
      const opacityValue = Math.min(1, scrollY * 0.002)

      // Apply transformations
      if (image) {
        image.style.transform = `scale(${scaleValue})`
        image.style.opacity = opacityValue
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll) // Clean up on unmount
  }, [])

  return (
    <div>
      <div className="scroll-animate">
        <img
          src="https://githubuniverse.com/hero-static.webp"
          alt="Scroll Animation"
        />
      </div>
    </div>
  )
}
