using Api.Models;
using MongoDB.Driver;

namespace Api.Repositories.Interfaces
{
    public interface ICommentsRepository
    {
        Task<IEnumerable<CommentsModel>> GetCommentsAsync();
        Task AddCommentAsync(CommentsModel comment, string movieId);
        Task<UpdateResult> UpdateCommentAsync(string commentId, string newText);
        Task<DeleteResult> DeleteCommentAsync(string commentId);
    }
}
