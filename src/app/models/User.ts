export interface UserIn {
    id              : number
    title           : string 
    firstName       : string 
    lastName        : string 
    role            : string  
    email           : string
}

export interface UserOut {
    Title           : string 
    FirstName       : string 
    LastName        : string 
    Role            : string  
    Email           : string 
    Password        : string 
    ConfirmPassword : string 
}