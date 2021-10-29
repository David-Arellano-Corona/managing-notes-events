export interface Notes {
    text:string;
    owner:number;
    id:number;
    isStore:false;
}

export interface Items {
    items:Notes[]
}