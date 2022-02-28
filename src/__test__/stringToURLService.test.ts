import  * as stringToUrlService from '../stringToUrlService';
import * as mockStringArrays from './mockStringArrays';
import * as mockApiResponses from './mockApiResponses';

describe('read url from string',()=>{
    it('if string is a valid url return true',()=>{
        expect(stringToUrlService.isStringAUrl('https://www.google.com')).toBe(true);
    });
    it('if string is not a url return false',()=>{
        expect(stringToUrlService.isStringAUrl('not a url')).toBe(false);
    });
    it('if string is an invalid url return false',()=>{
        expect(stringToUrlService.isStringAUrl('www.google..com')).toBe(false);
    });
});



describe('From a array of strings get the urls',()=>{

    const {arrayOfUrls,arrayOfNotUrls,arrayOfMixUrlsAndNonUrls} = mockStringArrays;
    it('if array of string is composed of only urls return a list of all the strings',async ()=>{
        const resultArray = await stringToUrlService.getListUrlsFromListStrings(arrayOfUrls);
        expect(resultArray.length).toBe(arrayOfUrls.length);
        expect(resultArray[0]).toBe(arrayOfUrls[0]);
        expect(resultArray[resultArray.length-1]).toBe(arrayOfUrls[arrayOfUrls.length -1])
    });
    it('if array of string is composed of only non urls return a empty list', async ()=>{
        const resultArray = await stringToUrlService.getListUrlsFromListStrings(arrayOfNotUrls);
        expect(resultArray.length).toBe(0);
    });
    it('if array of string is composed of only urls return a list of all the strings',async ()=>{
        const resultArray =await stringToUrlService.getListUrlsFromListStrings(arrayOfMixUrlsAndNonUrls);
        expect(resultArray.length).toBe(arrayOfUrls.length);
        expect(resultArray.sort()[0]).toBe(arrayOfUrls.sort()[0]);
        expect(resultArray.sort()[resultArray.length-1]).toBe(arrayOfUrls.sort()[arrayOfUrls.length -1]);
    });
});

describe('Get URL from string URL responses',()=>{
    const {HTMLStringContainingURL, JSONStringContainingURL, XMLStringContainingURL} = mockApiResponses;
    const google = 'http://www.google.com';
    const amazon = 'https://www.amazon.co.uk';
    it('Get the google url from a JSON string',async ()=>{
        const resultArray = await stringToUrlService.getListOfUrlsFromAPIResponse(JSONStringContainingURL);
        expect(resultArray.length).toBe(2);
        expect(resultArray[0]).toBe(google);
        expect(resultArray[1]).toBe(amazon);

    });
    it('Get the google url from a XML string',async ()=>{
        const resultArray = await stringToUrlService.getListOfUrlsFromAPIResponse(XMLStringContainingURL);
        expect(resultArray.length).toBe(1);
        expect(resultArray[0]).toBe(google);
    });
    it('Get the google url from a HTML string',async ()=>{
        const resultArray = await stringToUrlService.getListOfUrlsFromAPIResponse(HTMLStringContainingURL);
        expect(resultArray.length).toBe(1);
        expect(resultArray[0]).toBe(amazon);
    });
    it('Throws an error when the list is empty', async()=>{
        try
        {
            await stringToUrlService.getListOfUrlsFromAPIResponse('');
        }
        catch (error)
        {
            expect(error.message).toBe('No URLs found in this API');
        }
    })
})