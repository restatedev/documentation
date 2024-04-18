import java.net.URI

plugins {
  application
  kotlin("jvm") version "1.9.22"
  // Kotlinx serialization (optional)
  kotlin("plugin.serialization") version "1.9.22"

  id("com.google.devtools.ksp") version "1.9.22-1.0.18"
}

repositories {
  maven {
    url = URI.create("https://s01.oss.sonatype.org/content/repositories/snapshots/")
  }
  mavenCentral()
}

val restateVersion = "0.9.0-SNAPSHOT"

dependencies {
  // Annotation processor
  ksp("dev.restate:sdk-api-kotlin-gen:$restateVersion")

  // Restate SDK
  implementation("dev.restate:sdk-api-kotlin:$restateVersion")
  implementation("dev.restate:sdk-http-vertx:$restateVersion")
  implementation("dev.restate:sdk-lambda:$restateVersion")

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