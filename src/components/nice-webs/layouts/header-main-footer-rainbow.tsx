import React from 'react'

const RainbowBorder = ({ children }) => (
  <div className="relative">
    <svg className="w-full" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rainbowGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'rgba(255, 0, 0, 0.8)' }}/>
          <stop offset="17%" style={{ stopColor: 'rgba(255, 165, 0, 0.8)' }}/>
          <stop offset="33%" style={{ stopColor: 'rgba(255, 255, 0, 0.8)' }}/>
          <stop offset="50%" style={{ stopColor: 'rgba(0, 255, 0, 0.8)' }}/>
          <stop offset="67%" style={{ stopColor: 'rgba(0, 0, 255, 0.8)' }}/>
          <stop offset="83%" style={{ stopColor: 'rgba(75, 0, 130, 0.8)' }}/>
          <stop offset="100%" style={{ stopColor: 'rgba(238, 130, 238, 0.8)' }}/>
        </linearGradient>
      </defs>
      <rect width="300" height="100" fill="white"/>
      <rect 
        x="20" y="20" 
        width="260" height="60" 
        rx="20" ry="20"
        fill="none" 
        stroke="url(#rainbowGradient)"
        strokeWidth="20"
      />
      <rect 
        x="30" y="30" 
        width="240" height="40" 
        rx="15" ry="15"
        fill="white"
      />
      <foreignObject x="30" y="30" width="240" height="40">
        <div xmlns="http://www.w3.org/1999/xhtml" className="h-full flex items-center justify-center">
          {children}
        </div>
      </foreignObject>
    </svg>
  </div>
)

const PageLayout = () => {
  // Example dynamic data - in real app, this would come from props or API
  const data = {
    header: {
      title: "LoanAI",
      navigation: ["Home", "About", "Services", "Contact"]
    },
    main: {
      title: "Loan AI",
      content: "This is the main content area with a beautiful rainbow border.",
      features: [
        "Feature 1: Amazing Design",
        "Feature 2: Responsive Layout",
        "Feature 3: Dynamic Content"
      ]
    },
    footer: {
      copyright: "© 2024 Rainbow Company",
      links: ["Privacy", "Terms", "Support"],
      social: ["Twitter", "Facebook", "Instagram"]
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white shadow-md z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{data.header.title}</h1>
            <ul className="flex space-x-6">
              {data.header.navigation.map((item, index) => (
                <li key={index} className="hover:text-blue-600 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
      {/* <main className="flex min-h-screen flex-col items-center justify-between "> */}

        <RainbowBorder>
          <h2 className="text-xl font-semibold">{data.main.title}</h2>
        </RainbowBorder>
        
        <div className="mt-8">
          <p className="text-lg mb-6">{data.main.content}</p>
          <ul className="space-y-4">
            {data.main.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-gray-600">{data.footer.copyright}</p>
            </div>
            <div>
              <ul className="space-y-2">
                {data.footer.links.map((link, index) => (
                  <li key={index} className="text-sm hover:text-blue-600 cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                {data.footer.social.map((platform, index) => (
                  <li key={index} className="text-sm hover:text-blue-600 cursor-pointer">
                    {platform}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PageLayout