import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';




@Injectable()
export class RestService {
 baseUrl:string='';
  constructor(public http: Http) {
  }

  setBaseUrl(url:string){
    this.baseUrl = url;
    if(this.baseUrl.substring(this.baseUrl.length-1)!='/'){
      this.baseUrl = this.baseUrl + '/';
    }
  }

  getAll<T>(apiPath:string):Observable<T[]>{
    let apiUrl = this.makeApiPath(apiPath); 
    return this.http.get(apiUrl, this.getRequestOptionArgs())
        .map(response => response.json() as T[] )
        .catch(this.handleError);
  }

  get<T>(apiPath:string):Observable<T>{
    let apiUrl = this.makeApiPath(apiPath); 
    return this.http.get(apiUrl, this.getRequestOptionArgs())
        .map(response => response.json() as T )
        .catch(this.handleError);
  }

   post<T>(apiPath:string, body:T):Observable<Response>{
    let apiUrl = this.makeApiPath(apiPath); 
    return this.http.post(apiUrl, body, this.getRequestOptionArgs());
  }

   put<T>(apiPath:string, body:T):Observable<Response>{
    let apiUrl = this.makeApiPath(apiPath); 
    return this.http.put(apiUrl, body, this.getRequestOptionArgs());
  }

   delete(apiPath:string):Observable<Response>{
    let apiUrl = this.makeApiPath(apiPath); 
    return this.http.delete(apiUrl, this.getRequestOptionArgs());
  }

  private makeApiPath(apiPath:string){
    var result =  this.baseUrl.indexOf('http:')==0 || this.baseUrl.indexOf('https:')==0 ? apiPath :  `${this.baseUrl}${apiPath}`;
    return result;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  private getRequestOptionArgs (){
     return { headers : this.getHeaders() };
  }


  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      return Observable.throw(error);
    } else {
      errMsg = error.message ? error.message : error.toString();
      return Observable.throw(errMsg);
    }
    
  }


}