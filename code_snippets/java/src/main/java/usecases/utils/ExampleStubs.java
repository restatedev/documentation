/*
 * Copyright (c) 2024 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Restate Examples
 * which is released under the MIT license.
 *
 * You can find a copy of the license in the file LICENSE
 * in the root directory of this repository or package or at
 * https://github.com/restatedev/examples/blob/main/LICENSE
 */
package usecases.utils;

import dev.restate.sdk.Context;
import develop.workflows.Email;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class ExampleStubs {

  private static final Logger logger = LogManager.getLogger(ExampleStubs.class);

  public static UserRole getCurrentRole(String userId) {
    return new UserRole("viewer", "User cannot do much");
  }

  public static void tryApplyUserRole(String userId, UserRole role) {

    logger.error(String.format(">>> Applying role %s to user %s", role, userId));
  }

  public static Permission tryApplyPermission(String userId, Permission permission) {

    logger.info(
        String.format(
            ">>> Applying permission %s:%s for user %s",
            permission.getPermissionKey(), permission.getSetting(), userId));

    return new Permission(permission.getPermissionKey(), "blocked");
  }

  public static String updateUserProfile(String profile) {
    return Math.random() < 0.8 ? "NOT_READY" : profile + "-id";
  }

  public static String setUserPermissions(String userId, String permissions) {
    return permissions;
  }

  public static void provisionResources(String userId, String role, String resources) {}

  public static void rollback(
      Context ctx, String userId, UserRole previousRole, List<Permission> previousPermissions) {}

  public static void send(String key, UserProfile user) {}

  public static SubTask[] split(Task task) {
    return new SubTask[0];
  }

  public static Result aggregate(SubTaskResult[] subResults) {
    return new Result();
  }

  public static URL createS3Bucket() {
    return new URL();
  }

  public static void uploadData(URL url) {}

  public static void sendEmail(URL url, Email email) {}

  public static String someHeavyWork(TaskOpts params) {
    return "";
  }
}
