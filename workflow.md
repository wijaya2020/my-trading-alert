to run ngrok (forwading) :
ngrok http 3000


to run backend :
cd backend
node index.js

to run frontend:
cd frontend
npm run dev


vercel url :
https://my-trading-alert.vercel.app/


to test kirim data json via postman:
method : POST
body : raw > json

{
    "symbol": "IDX:BBCA",
    "action": "SELL",
    "price": 8000,
    "time": "1718812175"
}