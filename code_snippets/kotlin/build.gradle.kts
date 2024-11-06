plugins {
  application
  kotlin("jvm") version "2.0.0"
  // Kotlinx serialization (optional)
  kotlin("plugin.serialization") version "2.0.0"

  id("com.google.devtools.ksp") version "2.0.0-1.0.21"
  id("com.diffplug.spotless") version "6.25.0"
}

repositories { mavenCentral() }

val restateVersion = "1.1.1"

dependencies {
  // Annotation processor
  ksp("dev.restate:sdk-api-kotlin-gen:$restateVersion")

  // Restate SDK
  implementation("dev.restate:sdk-api-kotlin:$restateVersion")
  implementation("dev.restate:sdk-common:$restateVersion")
  implementation("dev.restate:sdk-http-vertx:$restateVersion")
  implementation("dev.restate:sdk-lambda:$restateVersion")
  implementation("dev.restate:sdk-request-identity:$restateVersion")
  implementation("dev.restate:sdk-testing:$restateVersion")

  implementation("org.junit.jupiter:junit-jupiter-api:5.11.3")
  implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.1")

  implementation("org.apache.logging.log4j:log4j-core:2.20.0")
  implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
  implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0")
}

kotlin { jvmToolchain(21) }

// Set main class
application { mainClass.set("develop.Greeter") }

spotless {
  kotlin {
    targetExclude("build/generated/**/*.kt")
    ktfmt()
  }
  kotlinGradle { ktfmt() }
}
