namespace Lab6.Models
{
    public class PrepareCinema
    {
        public PrepareCinema() { }
        public PrepareCinema(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}