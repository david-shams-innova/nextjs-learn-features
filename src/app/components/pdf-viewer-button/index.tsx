import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Printer, Mail } from 'lucide-react'

const PDFViewerButton = ({ label, pdfPath }) => {
  const [showPDF, setShowPDF] = useState(false)

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = pdfPath.split('/').pop() // Get filename from path
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
      {/* <Button  */}
      <button 
        onClick={() => setShowPDF(!showPDF)}
        className="mb-4 flex items-center gap-2"
      >
        <FileText className="w-4 h-4" />
        {label}
      </button>
      {/* </Button> */}

      {showPDF && (
        <Card className="p-4">
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
        </Card>
      )}
    </div>
  )
}

export default PDFViewerButton