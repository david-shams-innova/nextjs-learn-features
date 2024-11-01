import React, { useState } from 'react'
import { FileText, Download, Printer, Mail } from 'lucide-react'

// Utility function for class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Button Component
const Button = React.forwardRef(({ 
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

// Card Component
const Card = React.forwardRef(({ 
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
))

Card.displayName = "Card"

// PDFViewerButton Component
const PDFViewerButton = ({ label, pdfPath }) => {
  const [showPDF, setShowPDF] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = pdfPath.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    const iframe = document.getElementById('pdf-iframe')
    iframe.contentWindow.print()
  }

  const handleEmail = () => {
    const subject = encodeURIComponent('PDF Document')
    const body = encodeURIComponent('Please find the attached PDF document.')
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Button 
        onClick={() => setShowPDF(!showPDF)}
        className="mb-4"
        variant="outline"
      >
        <FileText className="w-4 h-4 mr-2" />
        {showPDF? 'Close': label}
      </Button>

      {showPDF && (
        <Card>
          <div className="p-4">
            <div className="flex gap-4 mb-4">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={handleEmail}>
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
            
            <iframe
              id="pdf-iframe"
              src={`${pdfPath}#toolbar=0`}
              className="w-full h-screen border rounded-lg"
            />
          </div>
        </Card>
      )}
    </div>
  )
}

export default PDFViewerButton