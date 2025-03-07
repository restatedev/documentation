package usecases.asynctasks.reminder

import kotlinx.serialization.Serializable

@Serializable data class StripeEvent(val id: String, val type: String, val data: String)

fun sendReminderEmail(event: StripeEvent) {
  // send email
}

fun escalateToHuman(event: StripeEvent) {
  // send email
}
