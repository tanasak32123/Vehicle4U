import { Controller, Get, Post, Body,Query, Patch, Param, Delete,Response, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCommentsWithVehicleId(@Query('vehicleId') vehicleId: number,@Response() res) {
    const comments = await this.commentsService.findComments(vehicleId);
    //console.log(comments);
    return res.status(200).send({
      comment: comments
    });
  }


  @UseGuards(JwtAuthGuard)
  @Patch()
  async addReply(@Body() updateCommentDto: UpdateCommentDto,@Response() res) {
    const comment = await this.commentsService.addReply(updateCommentDto);

    return res.status(200).send({
      msg:"success"
    })
  }

}
