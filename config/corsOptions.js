const whiteList = [
    'https://localhost:3500',
    'https://yoursite.com',
    'http://127.0.0.1:64371',
    'http://localhost:64371'
];

const corsOptions = {
    origin : (origin, callback) => {
        if(whiteList.indexOf(origin) != -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus : 200,
    credentials: true
}


export default corsOptions