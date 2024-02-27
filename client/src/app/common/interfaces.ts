export interface newTenant {
    companyName: string;
    adminFullName: string;
    username: string;
    password: string;
    logoFile?: File;
}
export interface result {
    beds: Number;
    baths: Number ;
    postedBy :string;
    imgPath : String;
    city :string;
    address:string ;
    price :Number ;
    postedFor:string ;
}