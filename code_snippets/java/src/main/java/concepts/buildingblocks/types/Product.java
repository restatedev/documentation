package concepts.buildingblocks.types;

import com.fasterxml.jackson.annotation.JsonProperty;

class Product {

    private final String productId;
    private final String description;
    private final int quantity;

    public Product(
            String productId,
            String description,
            int quantity) {
        this.productId = productId;
        this.description = description;
        this.quantity = quantity;
    }
}
