// 
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface ViewPDFProps {
  pdfDocument: string
}

const ViewPDF: React.FC<ViewPDFProps> = ({ pdfDocument }) => {
  const handleGenerateClick = (event: React.MouseEvent) => {
    // PDF viewer configuration
    const viewerConfig = {
      enableDownload: true,
      enableFullscreen: true,
      enableEmail: true,
    }
    
    window.open(pdfDocument, '_blank')
  }

  return (
    <div className="pdf-viewer-container">
      <button 
        className="generate-button"
        onClick={handleGenerateClick}
      >
        Generate Application
      </button>
    </div>
  )
}

export default ViewPDF