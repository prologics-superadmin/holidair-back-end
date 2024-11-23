module.exports = (data) => {
  // Filter out fields with "N/A"
  const filteredData = Object.entries(data).filter(
    ([key, value]) => value !== "N/A"
  );

  // Generate rows dynamically for only non-"N/A" fields
  const rows = filteredData
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding-left: 20px; font-size: 16px; line-height: 4px; background-color: #e2e7f3;">
            <p><strong>${key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}:</strong></p>
          </td>
          <td style="font-size: 16px; line-height: 4px; background-color: #e2e7f3;">
            <p>${value}</p>
          </td>
        </tr>
      `
    )
    .join("");

  return `<!doctype html>
  <html lang="en-US">
  
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Contact Us Request</title>
      <meta name="description" content="Contact Us Request Notification">
  </head>
  <style>
      a:hover {
          text-decoration: underline !important;
      }
  </style>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <!-- Logo -->
                      <tr>
                          <td style="text-align:center;">
                              <a title="logo">
                                  <img src="https://www.holidayair.com/Content/images/logo.png" style="width: 200px;" />
                              </a>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <!-- Email Content -->
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px; background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);padding:0 40px;">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <!-- Title -->
                                  <tr>
                                      <td colspan="2" style="padding:0 15px;text-align:center;">
                                          <h1 style="color:#1e1e2d; font-weight:700; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                              Contact Us Request
                                          </h1>
                                          <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; 
                                          width:100px;"></span>
                                      </td>
                                  </tr>
  
                                  <!-- Dynamically Generated Rows -->
                                  ${rows}
  
                                  <tr>
                                      <td style="height:40px; text-align:center;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px; text-align:center;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:#455056bd; line-height:18px; margin:0 0 30px;">
                                  &copy; <strong>www.holidayair.com</strong>
                              </p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  
  </html>`;
};
