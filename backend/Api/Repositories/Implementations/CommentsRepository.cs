using Api.Data;
using Api.Models;
using Api.Repositories.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using static MongoDB.Driver.WriteConcern;

namespace Api.Repositories.Implementations
{
    public class CommentsRepository : ICommentsRepository
    {
        private readonly IMongoCollection<CommentsModel> _collection;
        private readonly MongoDbContext _mongoDbContext;

        public CommentsRepository(MongoDbContext mongoDbContext)
        {
            _mongoDbContext = mongoDbContext;
            _collection = _mongoDbContext.GetCollection<CommentsModel>("Comments");
        }

        public async Task<IEnumerable<CommentsModel>> GetCommentsAsync()
        {
            List<CommentsModel> commentsModel = await _collection.Find(Builders<CommentsModel>.Filter.Empty).Limit(12).ToListAsync();
            return commentsModel;
        }

        public async Task<string> AddCommentAsync(CommentsModel comment, string movieId)
        {
            await _collection.InsertOneAsync(comment);
            return comment.Id.ToString();
        }

        public async Task<UpdateResult> UpdateCommentAsync(string commentId, string newText)
        {
            var filter = Builders<CommentsModel>.Filter.Eq(comment => comment.Id, commentId);
            var update = Builders<CommentsModel>.Update.Set(comment => comment.Text, newText);
            return await _collection.UpdateOneAsync(filter, update);
        }

        public async Task<DeleteResult> DeleteCommentAsync(string commentId)
        {
            var filter = Builders<CommentsModel>.Filter.Eq(comment => comment.Id, commentId);
            return await _collection.DeleteOneAsync(filter);
        }
    }
}