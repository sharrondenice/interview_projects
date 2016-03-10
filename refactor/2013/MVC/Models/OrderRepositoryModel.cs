using System.Collections.Generic;

namespace MVC.Models
{
    public class OrderRepositoryModel
    {
        public IList<Order> orders;
    }

    public class OrderRepository : OrderRepositoryModel
    {
        public OrderRepository()
        {
            this.orders = new List<Order>();                 
        }     

        public void save(Order order)
        {
            var order_count = orders.Count;
            order.id = order_count + 1;
            this.orders.Add(order);                 
        }

        public IList<Order> get_all()
        {
            return this.orders;
        } 
    }
}