package com.wosyldelivery;

import com.facebook.react.ReactActivity;
import com.cmcewen.blurview.BlurViewPackage;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WosylDelivery";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new BlurViewPackage(),
            new ReactNativeMapboxGLPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new MapsPackage(),
            new CodePush(null, this, BuildConfig.DEBUG)
        );
    }
}
