namespace MVC.Models
{
    public class OrderItemModel : ItemModel
    {
        public int quantity { get; set; }
    }

    public class OrderItem : OrderItemModel
    {
        public OrderItem()
        {
        }
    }
}