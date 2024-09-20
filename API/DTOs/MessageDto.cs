using API.Entities;

namespace API.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }

        // Sender
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string SenderPhotoUrl { get; set; }

        // Recipient
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string RecipientPhotoUrl { get; set; }

        // Message-specific properties
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } 
    }
}
