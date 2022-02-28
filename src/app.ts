import express from 'express';
import {GetFormattedResponse} from './apiRequestService';
import {APIResponse} from './interfaces';
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  let callResponse:APIResponse;
  let responseBody = '';
  try{
    if(!req.query.url){
      throw 'Url variable has to be provided';
    }
    
    callResponse = await GetFormattedResponse(req.query.url);
    res.statusCode = callResponse.statusCode;
    responseBody = callResponse.body;
  }
  catch(error)
  {
  
      res.statusCode = 500;
      responseBody = error.message;
  }
    return res.send(responseBody);
  
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
