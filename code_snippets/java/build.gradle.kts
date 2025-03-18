import java.net.URI

plugins {
    java
    application
    id("com.diffplug.spotless") version "6.25.0"
}

dependencies {
    // Restate SDK
    annotationProcessor(libs.restate.sdk.api.gen)
    implementation(libs.restate.sdk.api)
    implementation(libs.restate.sdk.common)
    implementation(libs.restate.sdk.http.vertx)
    implementation(libs.restate.sdk.lambda)
    implementation(libs.restate.sdk.request.identity)
    implementation(libs.restate.sdk.serde.jackson)
    implementation(libs.restate.sdk.testing)

    implementation(libs.jackson.parameter.names)
    implementation(libs.jackson.datatype.jdk8)
    implementation(libs.jackson.datatype.jsr310)

    implementation(libs.junit.jupiter.api)

    implementation(libs.log4j.core)
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


spotless {
    java {
        googleJavaFormat()
        importOrder()
        removeUnusedImports()
        formatAnnotations()
        toggleOffOn("//", "/n")
    }
}