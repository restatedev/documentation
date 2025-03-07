package usecases.utils;

import develop.workflows.Email;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class ExampleStubs {

  private static final Logger logger = LogManager.getLogger(ExampleStubs.class);

  public static URL createS3Bucket() {
    return new URL();
  }

  public static void uploadData(URL url) {}

  public static void sendEmail(URL url, Email email) {}

  public static String someHeavyWork(TaskOpts params) {
    return "";
  }
}
