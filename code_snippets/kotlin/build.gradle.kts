import java.net.URI

plugins {
  application
  kotlin("jvm") version "2.0.0"
  // Kotlinx serialization (optional)
  kotlin("plugin.serialization") version "2.0.0"

  id("com.google.devtools.ksp") version "2.0.0-1.0.21"
}

repositories {
  mavenCentral()
}

val restateVersion = "1.0.1"

dependencies {
  // Annotation processor
  ksp("dev.restate:sdk-api-kotlin-gen:$restateVersion")

  // Restate SDK
  implementation("dev.restate:sdk-api-kotlin:$restateVersion")
  implementation("dev.restate:sdk-common:$restateVersion")
  implementation("dev.restate:sdk-http-vertx:$restateVersion")
  implementation("dev.restate:sdk-lambda:$restateVersion")
  implementation("dev.restate:sdk-request-identity:$restateVersion")

  implementation("org.apache.logging.log4j:log4j-core:2.20.0")
  implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
  implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0")
}

kotlin {
  jvmToolchain(21)
}


// Set main class
application {
  mainClass.set("develop.Greeter")
}