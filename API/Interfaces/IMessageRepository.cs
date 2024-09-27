using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        #region Group Management

        void AddGroup(Group group);

        Task<Group> GetGroupForConnection(string connectionId);

        void RemoveConnection(Connection connection);

        Task<Connection> GetConnection(string connectionId);

        Task<Group> GetMessageGroup(string groupName);

        #endregion Group Management

        void AddMessage(Message message);

        void DeleteMessage(Message message);

        Task<Message> GetMessage(int id);

        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);

        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername);
    }
}
