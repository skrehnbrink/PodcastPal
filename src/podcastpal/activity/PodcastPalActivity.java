package podcastpal.activity;

import org.apache.cordova.DroidGap;
import android.os.Bundle;

public class PodcastPalActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("loadUrlTimeoutValue", 120000); 
        super.loadUrl("file:///android_asset/www/index.html");
    }
}