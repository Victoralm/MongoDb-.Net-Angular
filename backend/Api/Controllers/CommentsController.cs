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
        public async Task<ActionResult<IEnumerable<CommentsModel>>> GetMongoComments()
        {
            var documents = await _commentService.GetCommentsAsync();
            if (documents == null) return NotFound();
            //return Json(documents);
            return Ok(documents);
        }

        [HttpPost("mongo")]
        public async Task<ActionResult<CommentsModel>> AddMongoComment([FromBody] CommentsModel comment, string movieId)
        {
            if (comment == null)
                return Problem("Erro ao criar um produto, contate o suporte");

            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            string newId = await _commentService.AddCommentAsync(comment, movieId);
            return Ok(newId);
        }

        [HttpPut("Mongo")]
        public async Task<ActionResult<CommentsModel>> UpdateMongoComment(string commentId, string newText)
        {
            if (commentId == null)
                return Problem("Erro ao criar um produto, contate o suporte");

            var newComment = await _commentService.UpdateCommentAsync(commentId, newText);
            return Ok(newComment);
        }

        [HttpDelete("Mongo")]
        public async Task<ActionResult<CommentsModel>> DeleteMongoComment(string commentId)
        {
            if (commentId == null)
                return Problem("Erro ao criar um produto, contate o suporte");

            var delComment = await _commentService.DeleteCommentAsync(commentId);
            return Ok(delComment);
        }
    }
}
