package get_started;

public class FileUpload {
    private String userId;
    private String filePath;

    public FileUpload(String userId, String filePath) {
        this.userId = userId;
        this.filePath = filePath;
    }

    public String getUserId() {
        return userId;
    }

    public String getFilePath() {
        return filePath;
    }
}
