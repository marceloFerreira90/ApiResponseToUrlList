import fetch from 'node-fetch';
import {APIResponse} from './interfaces';
import { getListOfUrlsFromAPIResponse } from './stringToUrlService';

export const Get = async (url:string) => {
	
    const response = await fetch(url);
    const apiResponse:APIResponse= {statusCode:0, body:''};
	let body = await response.text();
    
    if(body.length ===0)
        body = await response.json();
	
    apiResponse.body = body;
    apiResponse.statusCode =response.status;

    return apiResponse;
}


export const GetFormattedResponse= async (url)=>{
    const apiResponse:APIResponse = {statusCode:200, body:''}
    const callResponse = await Get(url);
    if(callResponse.statusCode ===200)
        apiResponse.body = JSON.stringify(await getListOfUrlsFromAPIResponse(callResponse.body));
    else
        apiResponse.body = callResponse.body;
    
    apiResponse.statusCode = callResponse.statusCode;
    return apiResponse;  
}
