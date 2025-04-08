using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Store_backend.Classes;

public class StoreOwnerInventory
{
    [Key]
    public int ID { get; set; }
    [ForeignKey("Product")]
    public int ProductId { get; set; }
    [JsonIgnore]// איזה מוצר
    public Product? Product { get; set; }

    public int DesiredQuantity { get; set; } // כמה הוא רוצה שתמיד יהיה

    public int CurrentQuantity { get; set; } // כמה יש כרגע בפועל (זה מתעדכן בקנייה)

}
