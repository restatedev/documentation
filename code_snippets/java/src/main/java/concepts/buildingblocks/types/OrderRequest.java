package concepts.buildingblocks.types;

// <end_here>

public class OrderRequest {

  private final String orderId;
  private final String restaurantId;
  private final Product[] products;
  private final double totalCost;
  private final int deliveryDelay;

  public OrderRequest(
      String orderId,
      String restaurantId,
      Product[] products,
      double totalCost,
      int deliveryDelay) {
    this.orderId = orderId;
    this.restaurantId = restaurantId;
    this.products = products;
    this.totalCost = totalCost;
    this.deliveryDelay = deliveryDelay;
  }

  public String getOrderId() {
    return orderId;
  }

  public String getRestaurantId() {
    return restaurantId;
  }

  public double getTotalCost() {
    return totalCost;
  }

  public int getDeliveryDelay() {
    return deliveryDelay;
  }
}
