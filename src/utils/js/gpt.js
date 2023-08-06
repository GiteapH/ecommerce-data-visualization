/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-07-29 19:44:07
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-04 14:44:54
 * @FilePath: \vue-web\src\utils\js\gpt.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Api2d from 'api2d';

const timeout = 1000 * 60;

const api = new Api2d('fk211892-XfLz6I2fSmMjQLbgzs3EKCsBViYK4btv', 'https://openai.api2d.net', timeout);

//1.浏览；2.下单；3.关注；4.评论；
//5.加入购物车；6.咨询客服；7.投诉；
export function chat(
forecast = {
    "forecastLoss": 0.0,
    "forecastPrice": 0.0,
    "forecastBack": 0.0,
    "avgdiff": 0.0,
    "clvUid": 0
}, 
cardInfo = {
    "frequencyNum": 0,
    "consumptionCapacityNum": 0,
    "recencyNum": 0
},
ruleInfo = {
    "activeTime": "晚上",
    "priceLike": "500-2500",
    "cumulativePurchases": 30,
    "cumulativeCart": 1,
    "cumulativeView": 0,
    "cumulativeWatch": 0,
    "cumulativeInquire": 0,
    "cumulativeComment": 0,
    "cumulativeComplaint": 0
}, userInfo = {
    gender: '男性',
    age: null,
    province: null,
    city: null,
    county: null,
    rfmTag: "无身份信息",
    userValue: "无身份信息",
    status: '正常用户'
}, target, loading, num, max_tokens = 1000) {
    loading.value = true
    api.completion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `你是一个营销专家,最近我碰到了一个${userInfo.gender}用户,地址在${userInfo.province + userInfo.city + userInfo.county}他最近4个月总购物次数是${cardInfo.frequencyNum}次,总消费金额是${cardInfo.consumptionCapacityNum}元,
                用户群体是${userInfo.rfmTag},近四月共浏览商品${ruleInfo.cumulativeView}次,下单${ruleInfo.cumulativePurchases}次,咨询客服${ruleInfo.cumulativeInquire}次,
                投诉商家${ruleInfo.cumulativeComplaint}次,加入购物车${ruleInfo.cumulativeCart}次,评论${ruleInfo.cumulativeComment}次,根据clv模型得出未来价值可能是${forecast.forecastPrice}元,
                流失概率${forecast.forecastBack}%,喜好在${ruleInfo.activeTime}进行交易,交易偏好${ruleInfo.priceLike}元,请为我生成这个用户的${num}点营销方案,
                直接输出方案,严格按照json数组格式输出,比如[{"name":"***","detail":"***","result":"***"},{"name":"***","detail":"***","result":"***"}]它的每个元素为name: 措施名称,detail:具体措施,result:实施结果`
            },
        ],
        max_tokens: max_tokens,
        stream: true,
        onMessage: (string) => {

        },
        onEnd: (string) => {

            target.value = JSON.parse(string)
            loading.value = false
        },
    })
}



export function analysisUser(
    forecast = {
        "forecastLoss": 0.0,
        "forecastPrice": 0.0,
        "forecastBack": 0.0,
        "avgdiff": 0.0,
        "clvUid": 0
    }, 
    cardInfo = {
        "frequencyNum": 0,
        "consumptionCapacityNum": 0,
        "recencyNum": 0
    },
    ruleInfo = {
        "activeTime": "晚上",
        "priceLike": "500-2500",
        "cumulativePurchases": 30,
        "cumulativeCart": 1,
        "cumulativeView": 0,
        "cumulativeWatch": 0,
        "cumulativeInquire": 0,
        "cumulativeComment": 0,
        "cumulativeComplaint": 0
    }, userInfo = {
        gender: '男性',
        age: null,
        province: null,
        city: null,
        county: null,
        rfmTag: "无身份信息",
        userValue: "无身份信息",
        status: '正常用户'
    }
    , userAnalysis, loading, max_tokens = 1000) {
    loading.value = true

    api.completion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `你是一个营销专家,最近我碰到了一个${userInfo.gender}用户,地址在${userInfo.province + userInfo.city + userInfo.county}他最近4个月总购物次数是${cardInfo.frequencyNum}次,总消费金额是${cardInfo.consumptionCapacityNum}元,
                用户群体是${userInfo.rfmTag},近四月共浏览商品${ruleInfo.cumulativeView}次,下单${ruleInfo.cumulativePurchases}次,咨询客服${ruleInfo.cumulativeInquire}次,
                投诉商家${ruleInfo.cumulativeComplaint}次,加入购物车${ruleInfo.cumulativeCart}次,评论${ruleInfo.cumulativeComment}次,根据clv模型得出未来价值可能是${forecast.forecastPrice}元,
                流失概率${forecast.forecastBack}%,喜好在${ruleInfo.activeTime}进行交易,交易偏好${ruleInfo.priceLike}元,请为我根据这些这表全面的分析一下这个用户,200字左右内容`
                ,
            },
        ],
        max_tokens: max_tokens,
        stream: true,
        onMessage: (string) => {
            
        },
        onEnd: (string) => {
            userAnalysis.value = string
            loading.value = false 
        },
    })
}


export function analysisGroup(
    forecast = {
        "avgLoss": 0.0,
    "sumPrice": 0.0,
    "avgBack": 0.0,
    "avgdiff": 0.0,
    "personal_avg":0
    }, 
    cardInfo = {
        avgFrequency: 0,
        avgConsumption: 0,
        avgRecency: 0,
    },
    rfm,
    userAnalysis, loading, max_tokens = 1000) {
    loading.value = true

    api.completion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `你是一个营销专家,最近我碰到了一个用户群体,这个群体总用户数为15003,最近4个月平均消费频率是${cardInfo.avgFrequency}次,平均消费金额是${cardInfo.avgConsumption}元,
                rfm群体是${rfm},根据clv模型得出该群体未来总价值可能是${forecast.sumPrice}元,人均获得价值为${forecast.personal_avg}元,
                平均流失概率${forecast.forecastBack}%,请为我根据这些这表全面的分析一下这个用户,150字左右内容`
                ,
            },
        ],
        max_tokens: max_tokens,
        stream: true,
        onMessage: (string) => {
            
        },
        onEnd: (string) => {
            userAnalysis.value = string
            loading.value = false 
        },
    })
}

export function chatGroup(
    forecast = {
        "forecastLoss": 0.0,
        "forecastPrice": 0.0,
        "forecastBack": 0.0,
        "avgdiff": 0.0,
        "clvUid": 0
    }, 
    cardInfo = {
        "frequencyNum": 0,
        "consumptionCapacityNum": 0,
        "recencyNum": 0
    },
    rfm,
    target, loading, num, max_tokens = 1000) {
        loading.value = true
        api.completion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `你是一个营销专家,最近我碰到了一个用户群体,这个群体总用户数为15003,最近4个月平均消费频率是${cardInfo.avgFrequency}次,平均消费金额是${cardInfo.avgConsumption}元,
                    rfm群体是${rfm},根据clv模型得出该群体未来总价值可能是${forecast.sumPrice}元,人均获得价值为${forecast.personal_avg}元,
                    平均流失概率${forecast.forecastBack}%,请为我生成这个用户的${num}点营销方案,
                    直接输出方案,严格按照json数组格式输出,比如[{"name":"***","detail":"***","result":"***"},{"name":"***","detail":"***","result":"***"}]它的每个元素为name: 措施名称,detail:具体措施,result:实施结果`
                },
            ],
            max_tokens: max_tokens,
            stream: true,
            onMessage: (string) => {
    
            },
            onEnd: (string) => {
    
                target.value = JSON.parse(string)
                loading.value = false
            },
        })
    }
    