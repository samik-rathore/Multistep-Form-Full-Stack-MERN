// import React from 'react';
// import PDFDocument from 'pdfkit';
// import blobStream from 'blob-stream';

// const PDFGenerator = () => {
//     const handleDownloadPDF = () => {
//         // Create a new PDF document
//         const doc = new PDFDocument();

//         // Create a blob stream
//         const stream = doc.pipe(blobStream());

//         // Add content to the PDF document
//         doc.fontSize(25).text('Hello, PDFKit!', 100, 100);
//         doc.text('This is a simple PDF file generated using PDFKit.', 100, 150);

//         // Add a new page with some more content
//         doc.addPage()
//             .fontSize(18)
//             .text('This is another page in the PDF file.', 100, 100);

//         // End the PDF document
//         doc.end();

//         // When the blob stream is finished, create a URL and download the PDF
//         stream.on('finish', () => {
//             // Create a blob from the stream
//             const blob = stream.toBlob('application/pdf');
            
//             // Create a URL for the blob
//             const url = URL.createObjectURL(blob);
            
//             // Create a link element
//             const link = document.createElement('a');
            
//             // Set the link's href to the URL and download attribute to specify the file name
//             link.href = url;
//             link.download = 'example.pdf';
            
//             // Programmatically click the link to trigger the download
//             link.click();
            
//             // Clean up: revoke the URL and remove the link
//             URL.revokeObjectURL(url);
//             link.remove();
//         });
//     };

//     return (
//         <div>
//             <h1>PDF Generator</h1>
//             <button onClick={handleDownloadPDF}>Download PDF</button>
//         </div>
//     );
// };

// export default PDFGenerator;
