package com.orange;

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import android.content.Intent; // <--- import
import android.content.res.Configuration; // <--- import
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "orange";
    }
    @Override
          public void onConfigurationChanged(Configuration newConfig) {
            super.onConfigurationChanged(newConfig);
            Intent intent = new Intent("onConfigurationChanged");
            intent.putExtra("newConfig", newConfig);
            this.sendBroadcast(intent);
        }
}
