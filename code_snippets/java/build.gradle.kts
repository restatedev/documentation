//import com.google.protobuf.gradle.id

plugins {
  java
  application
//  id("com.google.protobuf") version "0.9.1"
}

repositories {
  mavenCentral()
  mavenLocal()
}

val restateVersion = "0.9.0-SNAPSHOT"

dependencies {
  // Restate SDK
  implementation("dev.restate:sdk-api:$restateVersion")
  annotationProcessor("dev.restate:sdk-api-gen:$restateVersion")
  implementation("dev.restate:sdk-http-vertx:$restateVersion")
  implementation("dev.restate:sdk-lambda:$restateVersion")
  // To use Jackson to read/write state entries (optional)
  implementation("dev.restate:sdk-serde-jackson:$restateVersion")

  // Protobuf and grpc dependencies
  implementation("com.google.protobuf:protobuf-java:3.24.3")
  implementation("io.grpc:grpc-stub:1.58.0")
  implementation("io.grpc:grpc-protobuf:1.58.0")
  // This is needed to compile the @Generated annotation forced by the grpc compiler
  // See https://github.com/grpc/grpc-java/issues/9153
  compileOnly("org.apache.tomcat:annotations-api:6.0.53")

  // Logging (optional)
  implementation("org.apache.logging.log4j:log4j-core:2.20.0")

  // Testing (optional)
  testImplementation("org.junit.jupiter:junit-jupiter:5.9.1")
  testImplementation("dev.restate:sdk-testing:$restateVersion")
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
  mainClass.set("concepts.buildingblocks.AppMain")
}