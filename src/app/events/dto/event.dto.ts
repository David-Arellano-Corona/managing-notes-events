
export interface EventDto{
    id?:number;
    description:string;
    name:string;
    endtime:string;
    starttime:string;
}

interface EventResponseDto extends EventDto {
    userId:number;
    username:string;
}

export interface EventsResponseDto{
    items:EventResponseDto[];
    count:number;
    next?:string;
    previous?:string
}