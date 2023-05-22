export const sample = (recipientName,message) => {
	return `
  <html>
    <body>
      <h1>Hi ${recipientName}!</h1>
      <p>${message}</p>
      <p>This is a custom HTML email.</p>
    </body>
  </html>
`;
};
