using Api.Models;
using Api.Repositories.Implementations;
using Api.Repositories.Interfaces;
using MongoDB.Driver;

namespace Api.Services
{
    public class CommentsService
    {
        private readonly CommentsRepository _commentsRepository;

        public CommentsService(CommentsRepository commentsRepository)
        {
            _commentsRepository = commentsRepository;
        }

        public async Task<IEnumerable<CommentsModel>> GetCommentsAsync() => await _commentsRepository.GetCommentsAsync();
        public async Task AddCommentAsync(CommentsModel comment, string movieId) => await _commentsRepository.AddCommentAsync(comment, movieId);
        public async Task<UpdateResult> UpdateCommentAsync(string commentId, string newText) => await _commentsRepository.UpdateCommentAsync(commentId, newText);
        public async Task<DeleteResult> DeleteCommentAsync(string commentId) => await _commentsRepository.DeleteCommentAsync(commentId);
    }
}