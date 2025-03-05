package usecases.microservices

import kotlinx.serialization.Serializable

@Serializable
data class SubscriptionRequest(
    val userId: String,
    val creditCard: String,
    val subscriptions: List<String>
)
