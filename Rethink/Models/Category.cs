using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Rethink.Models
{
    public class Category

    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
