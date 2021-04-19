import jsonp from 'jsonp';
import {message} from 'antd';

// 获取天气信息
export function reqWeater(city){
    console.log(city)
    return new Promise((resolve,reject)=>{
        jsonp(
            `http://restapi.amap.com/v3/weather/weatherInfo?key=98c97d10c1fda37bdc5402d15c1cdd71&city=${city}`,
            (err,data)=>{
                console.log(err,data)
                if(!err && data.status === '1'){
                    const {weather } = data.lives[0]
					resolve({ weather });
                }else{
                    message.error('获取天气信息失败!');
                }
            }
        )
    })
}


