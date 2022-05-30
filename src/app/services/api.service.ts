import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private rootPath = environment.endpoint;

  constructor(private http: HttpClient) {}

  getRootPath() {
    return this.rootPath;
  }

  getCollections(perPage: number, page: number){
    return this.http.get(this.rootPath + "artworks?limit=" + perPage + "&page=" + page );
  }

  getSortedCollections(selectOption: string, perPage: number, page: number){
    return this.http.get(this.rootPath + "artworks/search?sort=" + selectOption + "&limit=" + perPage + "&page=" + page );
  }

}
