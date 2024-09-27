using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MessageRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #region Group Management

        public void AddGroup(Group group)
        {
            _context.Groups.Add(group);
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await _context.Connections.FindAsync(connectionId);
        }

        public void RemoveConnection(Connection connection)
        {
            _context.Connections.Remove(connection);
        }

        public async Task<Group> GetMessageGroup(string groupName)
        {
            return await _context.Groups
                .Include(x => x.Connections)
                .FirstOrDefaultAsync(x => x.Name == groupName);
        }

        public async Task<Group> GetGroupForConnection(string connectionId)
        {
            return await _context.Groups
                .Include(x => x.Connections)
                .Where(c => c.Connections.Any(x => x.ConnectionId == connectionId))
                .FirstOrDefaultAsync();
        }

        #endregion Group Management

        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages
                .Include(u => u.Sender)
                .Include(u => u.Recipient)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = _context.Messages
                .OrderByDescending(m => m.MessageSent)
                .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.RecipientUsername == messageParams.Username 
                && !u.RecipientDeleted),
                "Outbox" => query.Where(u => u.SenderUsername == messageParams.Username 
                && !u.SenderDeleted),
                _ => query.Where(u => u.RecipientUsername == messageParams.Username && u.DateRead == null 
                && !u.RecipientDeleted)
            };

            return await PagedList<MessageDto>.CreateAsync(query, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername)
        {
            // Fetch all messages
            var messages = await _context.Messages
                .Where(m => m.Recipient.UserName == currentUsername && m.RecipientDeleted == false
                        && m.Sender.UserName == recipientUsername
                        || m.Recipient.UserName == recipientUsername
                        && m.Sender.UserName == currentUsername && m.SenderDeleted == false
                )
                .OrderBy(m => m.MessageSent)
                .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            // Fetch all unread messages 
            var unreadMessages = messages.Where(m => m.DateRead == null
                && m.RecipientUsername == currentUsername).ToList();

            // If any unread messages --> mark them as read
            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }
            }

            return messages;
        }       
    }
}
