export interface Card{
    mal_id:number;
    images:Images;
    title:string;
}

export interface Images {
    jpg :Jpg;
    webp :Webp;
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