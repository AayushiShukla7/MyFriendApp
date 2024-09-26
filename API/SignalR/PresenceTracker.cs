namespace API.SignalR
{
    public class PresenceTracker
    {
        private static readonly Dictionary<string, List<string>> OnlineUsers = 
            new Dictionary<string, List<string>>();

        // When a user connects
        public Task UserConnected(string username,string connectionId)
        {
            // To make Dictionary Thread-Safe
            lock(OnlineUsers)
            {
                if(OnlineUsers.ContainsKey(username))
                {
                    OnlineUsers[username].Add(connectionId);        // Adds a new connection(Id) to the same user
                }
                else
                {
                    OnlineUsers.Add(username, new List<string> { connectionId });   // Adds a new entry for this user in the dictionary
                }
            }

            return Task.CompletedTask;
        }

        // When a user disconnects
        public Task UserDisconnected(string username, string connectionId)
        {
            // To make Dictionary Thread-Safe
            lock (OnlineUsers)
            {
                if (OnlineUsers.ContainsKey(username))
                    return Task.CompletedTask;

                OnlineUsers[username].Remove(connectionId); // removes all connections of a user

                if (OnlineUsers[username].Count == 0)
                {
                    OnlineUsers.Remove(username);   // removes the user entry in the dictionary
                }
            }

            return Task.CompletedTask;
        }

        // Fetch all users connected
        public Task<string[]> GetOnlineUsers()
        {
            string[] onlineUsers;

            lock (OnlineUsers)
            {
                onlineUsers = OnlineUsers.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
            }

            return Task.FromResult(onlineUsers);
        }
    }
}
