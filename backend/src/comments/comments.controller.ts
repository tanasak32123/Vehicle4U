import { Controller, Get, Post, Body,Query, Patch, Param, Delete,Response } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('comments')
@Controller('')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('createComment')
  async createComment(@Body() createCommentDto: CreateCommentDto,@Response() res) {
    const comment = await this.commentsService.create(createCommentDto);
    console.log(comment)
    if (comment != null) {
      return res.status(200).send({
        comment: comment.id,
        msg: comment.message
      })
    }
    else {
      return res.status(500).send({
        message:"error"
      })
    }
  }


  @Get('searchComments')
  async getCommentsWithVehicleId(@Query('id') id: number,@Response() res) {
    const comments = await this.commentsService.findComments(id);
    //console.log(comments);
    return res.status(200).send({
      comment: comments
    });
  }

  @Patch('reply')
  async addReply(@Body() updateCommentDto: UpdateCommentDto,@Response() res) {
    const comment = await this.commentsService.addReply(updateCommentDto);

    return res.status(200).send({
      msg:"success"
    })
  }

}
