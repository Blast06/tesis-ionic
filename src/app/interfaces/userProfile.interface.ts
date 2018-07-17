interface userProfile {
    data: {
        id:number,
        name:string,
        email:string,
        avatar:string,
        websites:[
            {
                id:number,
                name:string,
                username:string,
                description:string,
                phone:string,
                address:string,
                location:string,
                user_id:number,
                subscribed_users_count:number,
                image_path:any,
                banner_path:any,
                media:null

            }
        ],
        subscribed_website:any,
        media:any
    }

}