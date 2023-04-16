import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCommentDto{
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    reply: string ;

    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    id: number;
}
