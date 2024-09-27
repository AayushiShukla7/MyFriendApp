namespace API.SignalR
{
    public class PresenceTracker
    {
        private static readonly Dictionary<string, List<string>> OnlineUsers = 
            new Dictionary<string, List<string>>();

        // When a user connects
        public Task<bool> UserConnected(string username,string connectionId)
        {
            bool isOnline = false;

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
                    isOnline = true;
                }
            }

            return Task.FromResult(isOnline);
        }

        // When a user disconnects
        public Task<bool> UserDisconnected(string username, string connectionId)
        {
            bool isOffline = false;

            // To make Dictionary Thread-Safe
            lock (OnlineUsers)
            {
                if (OnlineUsers.ContainsKey(username))
                    return Task.FromResult(isOffline);

                OnlineUsers[username].Remove(connectionId); // removes all connections of a user

                if (OnlineUsers[username].Count == 0)
                {
                    OnlineUsers.Remove(username);   // removes the user entry in the dictionary
                    isOffline = true;
                }
            }

            return Task.FromResult(isOffline);
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

        //Fetch all connections (live) for a user
        public Task<List<string>> GetConnectionsForUser(string username)
        {
            List<string> connectionIds;

            lock(OnlineUsers)
            {
                connectionIds = OnlineUsers.GetValueOrDefault(username);
            }

            return Task.FromResult(connectionIds);
        }
    }
}
