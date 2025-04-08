using System.ComponentModel.DataAnnotations;

namespace Store_backend.Classes
{
    public class Product
    {

        [Key]
        public int ID { get; set; }
        public string ProductName { get; set; }

    }
}
