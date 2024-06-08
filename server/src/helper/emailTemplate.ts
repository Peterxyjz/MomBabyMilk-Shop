export function generateEmailVerify(username: string, verificationLink: string, email_verify_token: string): string {
  return `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            background-color: #f9f9f9;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            padding: 10px 0;
        }

        .header h1 {
            text-align: center;
            color: #333333;
            font-size: 24px;
        }

        .content {
            font-size: 16px;
            padding: 20px;
            border-radius: 5px;
        }

        .content p {
            color: #666666;
            line-height: 1.6;
        }
        .button-container {
            align-items: center;
            padding: 20px 0;
        }

        .button-link {
            display: inline-block;
            padding: 10px 50px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 500;
            text-align: center;
            color: inherit;
            cursor: default;
        }

        .footer {
            padding: 10px;
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Xác Nhận Đăng Ký</h1>
        </div>
        <div class="content">
            <p>Xin Chào ${username},</p>
            <p>Cảm ơn bạn đã đăng ký với chúng tôi. Để hoàn tất quá trình đăng ký, vui lòng xác minh email của bạn bằng
                cách nhấp vào nút bên dưới:</p>
            <div class=" button-container" style="text-align: center">
                <a class="button-link" href="${verificationLink}">Xác Nhận ${email_verify_token}</a>
                
            </div>
            <p>Nếu bạn chưa đăng ký tài khoản này, bạn có thể bỏ qua email này.</p>
            <p>Trân Trọng,<br>MomBabyMilk Shop</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 MomBabyMilk Shop. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`
}

export function generateEmailPassword(username: string, verificationLink: string, email_verify_token: string): string {
  return `
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
  
          .container {
              background-color: #f9f9f9;
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          .header {
              padding: 10px 0;
          }
  
          .header h1 {
              text-align: center;
              color: #333333;
              font-size: 24px;
          }
  
          .content {
              font-size: 16px;
              padding: 20px;
              border-radius: 5px;
          }
  
          .content p {
              color: #666666;
              line-height: 1.6;
          }
  
          .button-link {
              display: inline-block;
              padding: 10px 50px;
              font-size: 16px;
              color: #fff;
              background-color: #007bff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: 500;
              text-align: center;
              color: inherit;
              cursor: default;
          }
  
          .button-container {
              align-items: center;
              padding: 20px 0;
          }
  
          .footer {
              padding: 10px;
              font-size: 14px;
              color: #999999;
              text-align: center;
          }
      </style>
  </head>
  
  <body>
  <div class="container">
  <div class="header">
      <h1>Xác Nhận Đổi Mật Khẩu</h1>
  </div>
  <div class="content">
      <p>Xin Chào ${username},</p>
      <p>Bạn đã yêu cầu đổi mật khẩu cho tài khoản của mình. Để hoàn tất quá trình đổi mật khẩu, vui lòng xác minh yêu cầu của bạn bằng cách nhấp vào nút bên dưới:</p>
      <div class="button-container" style="text-align: center">
          <a class="button-link" href="${verificationLink}">Xác Nhận Đổi Mật Khẩu</a>
      </div>
      <p>Nếu bạn không yêu cầu đổi mật khẩu, bạn có thể bỏ qua email này.</p>
      <p>Trân Trọng,<br>MomBabyMilk Shop</p>
  </div>
  <div class="footer">
      <p>&copy; 2024 MomBabyMilk Shop. All rights reserved.</p>
  </div>
  </div>
  </body>
  
  </html>
  `
}
