module.exports = (errorDetails) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error Notification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: #007bff;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
          }
          .content p {
            margin: 10px 0;
          }
          .content pre {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
          }
          .footer {
            background: #f1f1f1;
            color: #666;
            text-align: center;
            padding: 10px;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Error Notification</h1>
          </div>
          <div class="content">
            <p><strong>Error Type:</strong> ${errorDetails.errorType}</p>
            <p><strong>Message:</strong> ${errorDetails.message}</p>
            <p><strong>Timestamp:</strong> ${errorDetails.timestamp}</p>
            <hr>
            <p><strong>Stack Trace:</strong></p>
            <pre>${errorDetails.stack || "No stack trace available"}</pre>
          </div>
          <div class="footer">
            <p>This is an automated notification. Please take appropriate action.</p>
            <p>&copy; 2024 Holiday Air. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};
