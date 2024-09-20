using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);

        void DeleteMessage(Message message);

        Task<Message> GetMessage(int id);

        Task<PagedList<MessageDto>> GetMessagesForUser();

        Task<IEnumerable<MessageDto>> GetMessageThread(int currentUserid, int recipientid);

        Task<bool> SaveAllAsync();
    }
}
