plugins {
  application
  kotlin("jvm") version "2.0.21"
  kotlin("plugin.serialization") version "2.0.21"

  id("com.google.devtools.ksp") version "2.0.21-1.0.28"
  id("com.diffplug.spotless") version "6.25.0"
}

dependencies {
  // Annotation processor
  ksp(libs.restate.sdk.api.kotlin.gen)

  // Restate SDK
  implementation(libs.restate.sdk.api.kotlin)
  implementation(libs.restate.client.kotlin)
  implementation(libs.restate.sdk.common)
  implementation(libs.restate.sdk.http.vertx)
  implementation(libs.restate.sdk.lambda)
  implementation(libs.restate.sdk.request.identity)
  implementation(libs.restate.sdk.testing)

  implementation(libs.kotlinx.coroutines.core)
  implementation(libs.kotlinx.coroutines.test)
  implementation(libs.kotlinx.serialization.json)

  implementation(libs.junit.jupiter.api)

  implementation(libs.log4j.core)
}

kotlin { jvmToolchain(21) }

// Set main class
application {
  if (project.hasProperty("mainClass")) {
    mainClass.set(project.property("mainClass") as String)
  } else {
    mainClass.set("develop.GreeterKt")
  }
}

spotless {
  kotlin {
    targetExclude("build/generated/**/*.kt")
    ktfmt()
  }
  kotlinGradle { ktfmt() }
}
