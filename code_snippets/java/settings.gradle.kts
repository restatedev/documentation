plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version("0.5.0")
}

dependencyResolutionManagement {
    repositories {
        mavenCentral()
        // Needed for SDK snapshots, comment when using released versions.
        // maven { url = uri("https://s01.oss.sonatype.org/content/repositories/snapshots/") }
    }
}