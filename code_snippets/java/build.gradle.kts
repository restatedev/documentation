import java.net.URI

plugins {
  java
  application
}

repositories {
  maven {
    url = URI.create("https://s01.oss.sonatype.org/content/repositories/snapshots/")
  }
  mavenCentral()
}

val restateVersion = "0.9.0-SNAPSHOT"

dependencies {
  // Restate SDK
  annotationProcessor("dev.restate:sdk-api-gen:$restateVersion")
  implementation("dev.restate:sdk-api:$restateVersion")
  implementation("dev.restate:sdk-http-vertx:$restateVersion")
  implementation("dev.restate:sdk-lambda:$restateVersion")
  implementation("dev.restate:sdk-serde-jackson:$restateVersion")
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

// Configure test platform
tasks.withType<Test> {
  useJUnitPlatform()
}

// Set main class
application {
  mainClass.set("develop.Greeter")
}