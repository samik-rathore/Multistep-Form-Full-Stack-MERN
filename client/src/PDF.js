// const PDFDocument = require('pdfkit');
// const fs = require('fs');

// // Create a document
// export const Doc = new PDFDocument();

// // Pipe its output somewhere, like to a file or HTTP response
// // See below for browser usage
// Doc.pipe(fs.createWriteStream('output.pdf'));

// // Embed a font, set the font size, and render some text
// Doc
//   .font('fonts/PalatinoBold.ttf')
//   .fontSize(25)
//   .text('Some text with an embedded font!', 100, 100);

// // Add an image, constrain it to a given size, and center it vertically and horizontally
// Doc.image('path/to/image.png', {
//   fit: [250, 300],
//   align: 'center',
//   valign: 'center'
// });

// // Add another page
// Doc
//   .addPage()
//   .fontSize(25)
//   .text('Here is some vector graphics...', 100, 100);

// // Draw a triangle
// Doc
//   .save()
//   .moveTo(100, 150)
//   .lineTo(100, 250)
//   .lineTo(200, 250)
//   .fill('#FF3300');

// // Apply some transforms and render an SVG path with the 'even-odd' fill rule
// Doc
//   .scale(0.6)
//   .translate(470, -380)
//   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//   .fill('red', 'even-odd')
//   .restore();

// // Add some text with annotations
// Doc
//   .addPage()
//   .fillColor('blue')
//   .text('Here is a link!', 100, 100)
//   .underline(100, 100, 160, 27, { color: '#0000FF' })
//   .link(100, 100, 160, 27, 'http://google.com/');

// // Finalize PDF file
// Doc.end();