const fetch = require('node-fetch');
const {createTransport} = require("nodemailer");

var minValue = process.argv[2];

console.log("Min value is " + minValue)
setInterval(() => {
    calculate();
}, 5000);

function calculate() {
    fetch("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7",
            "bnc-uuid": "1cae03a8-52cb-48fd-98ec-a7398597e7e2",
            "c2ctype": "c2c_merchant",
            "clienttype": "web",
            "content-type": "application/json",
            "csrftoken": "d41d8cd98f00b204e9800998ecf8427e",
            "device-info": "eyJzY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA4MCIsImF2YWlsYWJsZV9zY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA1MyIsInN5c3RlbV92ZXJzaW9uIjoiTGludXggeDg2XzY0IiwiYnJhbmRfbW9kZWwiOiJ1bmtub3duIiwic3lzdGVtX2xhbmciOiJlbi1VUyIsInRpbWV6b25lIjoiR01UKzciLCJ0aW1lem9uZU9mZnNldCI6LTQyMCwidXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk3LjAuNDY5Mi45OSBTYWZhcmkvNTM3LjM2IiwibGlzdF9wbHVnaW4iOiJQREYgVmlld2VyLENocm9tZSBQREYgVmlld2VyLENocm9taXVtIFBERiBWaWV3ZXIsTWljcm9zb2Z0IEVkZ2UgUERGIFZpZXdlcixXZWJLaXQgYnVpbHQtaW4gUERGIiwiY2FudmFzX2NvZGUiOiIzMGYwZWY1YiIsIndlYmdsX3ZlbmRvciI6Ikdvb2dsZSBJbmMuIChJbnRlbCBPcGVuIFNvdXJjZSBUZWNobm9sb2d5IENlbnRlcikiLCJ3ZWJnbF9yZW5kZXJlciI6IkFOR0xFIChJbnRlbCBPcGVuIFNvdXJjZSBUZWNobm9sb2d5IENlbnRlciwgTWVzYSBEUkkgSW50ZWwoUikgSEQgR3JhcGhpY3MgNDYwMCAoSFNXIEdUMiksIE9wZW5HTCA0LjUgKENvcmUgUHJvZmlsZSkgTWVzYSAyMS4wLjMpIiwiYXVkaW8iOiIxMjQuMDQzNDc1Mjc1MTYwNzQiLCJwbGF0Zm9ybSI6IkxpbnV4IHg4Nl82NCIsIndlYl90aW1lem9uZSI6IkFzaWEvU2FpZ29uIiwiZGV2aWNlX25hbWUiOiJDaHJvbWUgVjk3LjAuNDY5Mi45OSAoTGludXgpIiwiZmluZ2VycHJpbnQiOiJkNWE4NWQzM2JhZTIyYmVhZGZhNGRkZjkzMDU3MGYzNSIsImRldmljZV9pZCI6IiIsInJlbGF0ZWRfZGV2aWNlX2lkcyI6IiJ9",
            "fvideo-id": "325ce37123b4abcfa823ec7b8227f44ef565e862",
            "lang": "vi",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-trace-id": "01d10135-8e9e-4515-8410-4179302f5cd8",
            "x-ui-request-trace": "01d10135-8e9e-4515-8410-4179302f5cd8"
        },
        "referrer": "https://p2p.binance.com/vi?fiat=VND&payment=ALL",
        "referrerPolicy": "origin-when-cross-origin",
        "body": "{\"page\":1,\"rows\":1,\"payTypes\":[],\"asset\":\"USDT\",\"tradeType\":\"BUY\",\"fiat\":\"VND\",\"publisherType\":null}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(res => res.json()).then(result => handleResult(result));

}

function handleResult(result) {
    console.log("")
    console.log(new Date().toGMTString() )
    var price = result.data[0].adv.price;
    if (price < minValue) {
        sendMail("tuan oi mua di " + price)
    } else {
        console.log("Gia hien tai la " + price)
    }
}

// create transporter object with smtp server details
const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'tuanldtest',
        pass: 'Pointex@12345'
    }
});

async function sendMail(content) {
    console.log("Send email with content " + content)
    await transporter.sendMail({
        from: 'tuanldtest@gmail.com',
        to: 'ledangtuanbk@gmail.com',
        subject: 'Gia USDT/VND ' ,
        html: '<h1>Example HTML Message Body</h1>' + content
    });
}



