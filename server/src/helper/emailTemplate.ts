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

export function generateInvoiceHTML(order: any, orderDetail: any) {
  const shippedDate = new Date(order.shipped_date)
  shippedDate.setDate(shippedDate.getDate() + 3)
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                text-align: center;
                color: #333;
            }
            .details {
                margin-bottom: 20px;
            }
            .details p {
                margin: 5px 0;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            table, th, td {
                border: 1px solid #ddd;
            }
            th, td {
                padding: 10px;
                text-align: left;
            }
            th {
                background-color: #f4f4f4;
            }
            .total {
                text-align: right;
            }
            .total td {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Hóa Đơn Mua Hàng</h2>
            <div class="details">
                <p><strong>Tên khách hàng:</strong> ${order.full_name}</p>
                <p><strong>Địa chỉ:</strong> ${order.address}</p>
                <p><strong>Số điện thoại:</strong> ${order.phone}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Phương thức thanh toán:</strong> ${order.payment_method}</p>
                <p><strong>Ngày yêu cầu:</strong> ${new Date(order.required_date).toLocaleDateString()}</p>
                <p><strong>Ngày giao hàng:</strong> ${shippedDate.toLocaleDateString()}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderDetail
                      .map(
                        (item: any) => `
                    <tr>
                        <td>${item.product_name}</td>
                        <td>${item.amount}</td>
                        <td>${Number(item.price).toLocaleString()} VND</td>
                        <td>${(Number(item.price) * item.amount).toLocaleString()} VND</td>
                    </tr>
                    `
                      )
                      .join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="total">Phí vận chuyển: </td>
                        <td>${Number(order.total_price - order.ship_fee + order.voucher_fee).toLocaleString()} VND</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="total">Phí vận chuyển: </td>
                        <td>${Number(order.ship_fee).toLocaleString()} VND</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="total">Mã giảm giá: </td>
                        <td>${Number(order.voucher_fee).toLocaleString()} VND</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="total">Tổng cộng</td>
                        <td>${Number(order.total_price).toLocaleString()} VND</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </body>
    </html>
    `
}

export function generateEmailStatus(username: string, status: string): string {
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
              <h1>Trạng thái tài khoản</h1>
          </div>
          <div class="content">
              <p>Xin Chào ${username},</p>
              <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. 
               Hiện tại tài khoản của bạn đã ${status}
              </p>
             
              <p>Chúng tôi rất xin lỗi vì sự việc này, hãy liên hệ với chúng tôi ngay để biết thêm chi tiết.</p>
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