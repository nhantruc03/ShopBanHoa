
const { pick, isEmpty } = require("lodash");
const nodemailer = require('nodemailer');
const sendEmail = async (req, res) => {
    try {
        let data = req.body;
        let smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            secure: true,
            auth: {
                user: '17520122@gm.uit.edu.vn',
                pass: 'A0917220428'
            }
        })
        let cart = data.cart;
        let content = "<table border=\"1\" frame=\"hsides\" rules=\"columns\" style=\"text-align:center;\">" +
            "<tr>" +
            "<td>Mã_SP</td>" +
            "<td>Tên SP</td>" +
            "<td>Số lượng</td>" +
            "<td>Đơn giá</td>" +
            "<td>Thành tiền</td>" +
            "</tr>";

        let total = 0;
        cart.forEach((e) => {
            var totalprice = Number(e.price) * Number(e.quantity);
            total += totalprice;
            content += "<tr>" +
                "<td>" + e.productId + "</td>" +
                "<td>" + e.productName + "</td>" +
                "<td>" + e.quantity + "</td>" +
                "<td>" + Number((e.price).toFixed(1)).toLocaleString() + "₫</td>" +
                "<td>" + Number((totalprice).toFixed(1)).toLocaleString() + "₫</td>" +
                "</tr>";
        })
        content += "</table>";
        total = Number((total).toFixed(1)).toLocaleString()
        let mailOptions = {
            from: '17520122@gm.uit.edu.vn',
            to: data.shipemail,
            subject: 'Đơn hàng mới từ FreshShop',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Thông tin đơn hàng mới từ khách hàng: ${data.shipname} </title>
            </head>
            <body>
                Thông tin đơn hàng mới từ khách hàng: ${data.shipname} <br />
                Điện thoại: ${data.shipmobile} <br />
                Email: ${data.shipemail} <br />
                Địa chỉ: ${data.shipaddress} <br />
                Trị giá: ${total}₫ <br />
                ${content}
            </body>
            </html>`
        }
        console.log("Dang send email");
        smtpTransport.sendMail(mailOptions, (error, response) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    data: "email sent"
                });
            }
        })
        smtpTransport.close();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = { sendEmail }