export class Anime{
    mal_id!:number;
    images!:Images;
    title !:string;
}

class Images {
    jpg !:Jpg;
    webp !:Webp;
}

class Jpg {
    image_url !:string;
    large_image_url !:string;
    small_image_url !:string;
}

class Webp {
    image_url !:string;
    large_image_url !:string;
    small_image_url !:string;
}