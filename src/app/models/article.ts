export class Article{
    constructor(
        public id:number,
        public name:string,
        public slug:string,
        public description:string,
        public price:string,
        public stock:number,
        public status:string,
        public website_id:number,
        public sub_category_id:number,
        public image_path:string,
        public website:any
    ){}

    
}