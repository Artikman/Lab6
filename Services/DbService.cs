using Lab6.Models;
using System.Collections.Generic;
using System.Linq;

namespace Lab6.Services
{
    public class DbService
    {
        private CinemaContext _db;

        public DbService(CinemaContext context)
        {
            _db = context;
        }

        public List<PrepareCinema> ListCinema()
        {
            IQueryable<PrepareCinema> cinemas = from name in _db.Films
                                                select new PrepareCinema(name.FilmId, name.Genre);
            return cinemas.ToList();
        }

        public List<Genre> FindCinemaById(int id)
        {
            var genres = _db.Genres.Where((genre) => genre.GenreId == id);
            return genres.ToList();
        }

        public void DeleteCinema(int id)
        {
            var genres = _db.Genres.Where((genre) => genre.GenreId == id);
            foreach (var genre in genres) _db.Genres.Remove(genre);
            _db.SaveChanges();
        }

        public void UpdateCinema(int id, UpdateModel genreCinema)
        {
            var genres = _db.Genres.Where((genre) => genre.GenreId == id);
            foreach (var genre in genres)
            {
                genre.GenreId = genreCinema.nameId;
                genre.Description = genreCinema.genres.First(v => v.id == genre.GenreId).value;
                _db.Genres.Update(genre);
            }
            _db.SaveChanges();
        }

        public void PostCinema(GenreBody value)
        {
            Genre genre = new Genre();
            genre.Name = value.value;
            genre.Description = value.value;
            genre.GenreId = value.id;
            _db.Genres.Add(genre);
            _db.SaveChanges();
        }
    }
}