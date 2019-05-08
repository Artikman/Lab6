using System.Collections.Generic;
using Lab6.Models;
using Lab6.Services;
using Microsoft.AspNetCore.Mvc;

namespace Lab6.Controllers
{
    [Route("api/[controller]")]
    public class GsmsController : Controller
    {
        private DbService dbService;

        public GsmsController(DbService service)
        {
            dbService = service;
        }

        //GET api/gsms
        [HttpGet]
        public IEnumerable<PrepareCinema> Get()
        {
            return dbService.ListCinema();
        }

        //GET api/gsms
        [HttpGet("{id}")]
        public List<Genre> Get(int id)
        {
            return dbService.FindCinemaById(id);
        }

        //POST api/gsms
        [HttpPost]
        public void Post([FromBody]GenreBody value)
        {
            dbService.PostCinema(value);
        }

        //PUT api/gsms
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]UpdateModel value)
        {
            dbService.UpdateCinema(id, value);
        }

        //DELETE api/gsms
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbService.DeleteCinema(id);
        }
    }
}   