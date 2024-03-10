using System;
using System.Collections.Generic;

namespace SpacePhotos.EF.Entities
{
    public partial class QueryCache
    {
        private QueryCache() { }

        public QueryCache(string query, string result)
        {
            Query = query;
            Result = result;
            CreatedOn = DateTime.Now;
        }

        public void Update(string result)
        {
            Result = result;
            CreatedOn = DateTime.Now;
        }

        public int Id { get; set; }
        public string Query { get; set; } = null!;
        public string Result { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
    }
}
