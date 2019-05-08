namespace Lab6.Models
{
    public class GenreBody
    {
        public int id { get; set; }
        public string value { get; set; }
    }

    public class UpdateModel
    {
        public int nameId { get; set; }
        public GenreBody[] genres { get; set; }
    }
}