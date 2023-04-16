import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {

    
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    message: string ;

    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    request_id: number;
    
    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    score : number ;

}
