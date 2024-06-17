import java.net.URI

plugins {
  java
  application
}

repositories {
  mavenCentral()
}

val restateVersion = "1.0.1"

dependencies {
  // Restate SDK
  annotationProcessor("dev.restate:sdk-api-gen:$restateVersion")
  implementation("dev.restate:sdk-api:$restateVersion")
  implementation("dev.restate:sdk-common:$restateVersion")
  implementation("dev.restate:sdk-http-vertx:$restateVersion")
  implementation("dev.restate:sdk-lambda:$restateVersion")
  implementation("dev.restate:sdk-serde-jackson:$restateVersion")

  // Jackson parameter names
  // https://github.com/FasterXML/jackson-modules-java8/tree/2.14/parameter-names
  implementation("com.fasterxml.jackson.module:jackson-module-parameter-names:2.16.1")
  // Jackson java8 types
  implementation("com.fasterxml.jackson.datatype:jackson-datatype-jdk8:2.16.1")
  implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.16.1")

  implementation("dev.restate:sdk-serde-protobuf:$restateVersion")
  implementation("org.apache.logging.log4j:log4j-core:2.20.0")
}

java {
  toolchain {
    languageVersion.set(JavaLanguageVersion.of(21))
  }
}

tasks.withType<JavaCompile> {
  // Using -parameters allows to use Jackson ParameterName feature
  // https://github.com/FasterXML/jackson-modules-java8/tree/2.14/parameter-names
  options.compilerArgs.add("-parameters")
}

// Set main class
application {
  mainClass.set("develop.Greeter")
}