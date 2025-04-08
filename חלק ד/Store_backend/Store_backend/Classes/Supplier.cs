using System.ComponentModel.DataAnnotations;

namespace Store_backend.Classes;

public class Supplier
{
    [Key]
    public int ID { get; set; }
    public string AgentName { get; set; }
    public string CompanyName { get; set; }
    public string NumberPhone { get; set; }

    public List<Good> Goods { get; set; }

}
