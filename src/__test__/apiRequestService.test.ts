import { Get,GetFormattedResponse } from "../apiRequestService";
import fetch, { Response } from 'node-fetch';

jest.mock('node-fetch');

describe('Mock testing the Get function', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('Respose has status 200 and is JSON', async () => {
      const json = jest.fn() as jest.MockedFunction<any>;
      const text = jest.fn() as jest.MockedFunction<any>;
      json.mockResolvedValue({ status: 200}); 
      text.mockResolvedValue('');
      mockFetch.mockResolvedValue({ ok: true,status:200, text, json } as Response);
      const result =  await Get('https://www.google.com');
      expect(json.mock.calls.length).toBe(1);
      expect(text.mock.calls.length).toBe(1);
      expect(result.statusCode).toBe(200);
      expect(result.body).toStrictEqual({ status: 200});
    });
    it('Response has status 200 and is HTML', async () => {
        const json = jest.fn() as jest.MockedFunction<any>;
        const text = jest.fn() as jest.MockedFunction<any>;
        text.mockResolvedValue({ status: 200}); 
        json.mockResolvedValue('');
        mockFetch.mockResolvedValue({ ok: true,status:200, text, json } as Response); 
        const result =  await Get('https://www.google.com');
        expect(json.mock.calls.length).toBe(0);
        expect(text.mock.calls.length).toBe(1);
        expect(result.statusCode).toBe(200);
        expect(result.body).toStrictEqual({ status: 200});
      });
});

describe('format response as URL list', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    const google = 'https://wwww.google.com';
    const amazon  = 'https://www.amazon.co.uk';

    it('Response brings back a JSON list', async () => {
      const json = jest.fn() as jest.MockedFunction<any>;
      const text = jest.fn() as jest.MockedFunction<any>;
      json.mockResolvedValue(`{ "a": "${google}", "b": "${amazon}" }`);
      text.mockResolvedValue('');
      mockFetch.mockResolvedValue({ ok: true,status:200, text, json } as Response); 
      const result =  await GetFormattedResponse(google);
      expect(result.statusCode).toBe(200);
      expect(result.body).toContain(google);
      expect(result.body).toContain(amazon);
    });
    it('Response brings back a Text list', async () => {
        const json = jest.fn() as jest.MockedFunction<any>;
        const text = jest.fn() as jest.MockedFunction<any>;
        text.mockResolvedValue(`<a href="${google}"/> <a href="${amazon}"/>`); 
        json.mockResolvedValue('');
        mockFetch.mockResolvedValue({ ok: true,status:200, text, json } as Response); 
        const result =  await GetFormattedResponse(google);
        expect(result.statusCode).toBe(200);
        expect(result.body).toContain(google);
        expect(result.body).toContain(amazon);
      });
      it('Response doesnt bring  back a url list', async () => {
        const json = jest.fn() as jest.MockedFunction<any>;
        const text = jest.fn() as jest.MockedFunction<any>;
        text.mockResolvedValue('{ status: 200}'); 
        json.mockResolvedValue('');
        mockFetch.mockResolvedValue({ ok: true,status:200, text, json } as Response); 
        try{

          const result =  await GetFormattedResponse('');
        }
        catch(error)
        {
          expect(error.message).toBe('No URLs found in this API');
        }
      });

      
});