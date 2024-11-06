using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly CommentsService _commentService;

        public CommentsController(CommentsService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("mongo")]
        [ProducesResponseType(typeof(CommentsModel), StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<CommentsModel>>> Get()
        {
            var documents = await _commentService.GetCommentsAsync();
            if (documents == null) return NotFound();
            //return Json(documents);
            return Ok(documents);
        }

        [HttpPost("mongo")]
        public async Task<ActionResult> Post([FromBody] CommentsModel comment, string movieId)
        {
            if (comment == null)
                return Problem("No records found. Please, try again later.");

            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            await _commentService.AddCommentAsync(comment, movieId);
            return Ok();
        }

        //[HttpPut("{id, comment}", Name = "Mongo")]
        [HttpPut("Mongo")]
        public async Task<ActionResult<CommentsModel>> Put(string commentId, string newText)
        {
            if (commentId == null)
                return Problem("No records found. Please, try again later.");

            var newComment = await _commentService.UpdateCommentAsync(commentId, newText);
            return Ok(newComment);
        }

        [HttpDelete("Mongo")]
        public async Task<ActionResult<CommentsModel>> Delete(string commentId)
        {
            if (commentId == null)
                return Problem("No records found. Please, try again later.");

            var delComment = await _commentService.DeleteCommentAsync(commentId);
            return Ok(delComment);
        }
    }
}
