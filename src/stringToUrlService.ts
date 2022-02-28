

export function isStringAUrl(str:string)
{
    let url:URL;
    let isUrl:boolean;

    try {
      url = new URL(str);
      isUrl = url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      isUrl=  false;  
    }
    return isUrl;
}

export const getListUrlsFromListStrings = async(strs:string[])=>
    await strs.filter(isStringAUrl);

export const getListOfUrlsFromAPIResponse=  async(jsonFile:string)=>{
    const list:string[]= await getListUrlsFromListStrings(jsonFile.split(/[ ,<>"']+/));
    if(list.length ===0)
      throw {message:'No URLs found in this API'}
    return list;
}



