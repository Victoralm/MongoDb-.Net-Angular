using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Models
{
    public class CommentsModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("name")]
        public string? Name { get; set; }
        [BsonElement("email")]
        public string? Email { get; set; }
        [BsonElement("movie_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string MovieId { get; set; }
        [BsonElement("text")]
        public string? Text { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; }
    }
}