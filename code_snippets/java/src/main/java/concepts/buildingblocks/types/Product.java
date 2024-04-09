package concepts.buildingblocks.types;

import com.fasterxml.jackson.annotation.JsonProperty;

class Product {

    private final String productId;
    private final String description;
    private final int quantity;

    public Product(
            @JsonProperty("productId") String productId,
            @JsonProperty("description") String description,
            @JsonProperty("quantity") int quantity) {
        this.productId = productId;
        this.description = description;
        this.quantity = quantity;
    }
}
