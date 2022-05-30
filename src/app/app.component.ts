import { Component, OnInit } from '@angular/core';
import { FORMFIELD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/formfield';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
      {
          provide: FORMFIELD_DEFAULT_OPTIONS,
          useValue: { appearance: 'outline', nxFloatLabel: 'always' },
      },
  ],
})
export class ArtworkAppComponent implements OnInit{
    options: string[] = [];
    sortOptions: string[] = [];
    selectSortOptions: string = "";
    multiSelect: string[] = [];

    count: number = 210;
    page: number = 1;
    perPage: number = 12;

    collections: any;
    imageUrl: any;
    isLoading: boolean = true;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(){
      this.getCollections(this.perPage, this.page);
    }

    getCollections(perPage: number, page: number){
        this.apiService.getCollections(perPage,page).subscribe((data: any) => {
            console.log(data);
            this.collections = data;
            this.imageUrl = data.config.iiif_url;
            this.count = data.pagination.total_pages;
            this.isLoading = false;
            this.bindMultiOptions();
        })
    }

    prevPage() {
        this.page--;
        this.isLoading = false;
        this.getCollections(this.perPage, this.page);
        this.multiSelect = [];
    }

    nextPage() {
        this.page++;
        this.isLoading = false;
        this.getCollections(this.perPage, this.page);
        this.multiSelect = [];
    }

    goToPage(n: number) {
        this.page = n;
        this.isLoading = false;
        this.getCollections(this.perPage, this.page);
        this.multiSelect = [];
    }
    

    toText(value: string): string | null {
      return value ? value.toUpperCase() : null;
    }

    getImageUrl(imageId: string): string{
        if(imageId){
            return this.imageUrl + `/` + imageId + `/full/300,/0/default.jpg`;
        }else{
            return "https://upload.wikimedia.org/wikipedia/commons/3/32/Art_Institute_of_Chicago_logo.svg";
        }
    }

    getLocation(data: any): any{
        if(data.date_start == undefined && data.date_end == undefined){
            return data.place_of_origin;
        }else if(data.date_start === data.date_end){
            return data.place_of_origin + "(" + data.date_start + ")";
        }else{
            return data.place_of_origin + "(" + data.date_start + "-" + data.date_end + ")";
        }
    }

    getSortedCollection(){
        
        this.apiService.getSortedCollections(this.selectSortOptions,this.perPage,this.page).subscribe((data: any) => {
            console.log(data);
            this.collections = data;
            this.imageUrl = data.config.iiif_url;
            this.count = data.pagination.total_pages;
            this.bindMultiOptions();
            this.multiSelect = [];
        })
    }

    bindMultiOptions(){
        console.log("abc" + this.collections)
        for(var val in this.collections.data){
            console.log("abcd" + this.collections.data[val])
            if(this.collections.data[val].style_title){
                var styleTitles = this.collections.data[val].style_title + "(" + (this.collections.data[val].style_titles as any[]).length || 0 + "";
                styleTitles = styleTitles + ")";
                this.options.push(styleTitles)
            }
            this.sortOptions.push(this.collections.data[val].artist_title)
        }
    }

    getMultiCollection($evt: Event){
        
    }
}
