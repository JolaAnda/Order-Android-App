package de.hdmstuttgart.order_app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.nfc.Tag;
import android.os.Build;
import android.os.Vibrator;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.util.SparseArray;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.vision.CameraSource;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.barcode.Barcode;
import com.google.android.gms.vision.barcode.BarcodeDetector;

import java.io.IOException;

import de.hdmstuttgart.order_app.menuActivity.MenuActivity;

public class QrCodeScanner extends AppCompatActivity {

    private static final String TAG = "QrCodeScanner";

    SurfaceView surfaceView;
    CameraSource cameraSource;
    BarcodeDetector barcodeDetector;
    private TextView textView;
    SurfaceHolder hold;


    //permission stuff

    private static final int MY_CAMERA_REQUEST_CODE = 100;
    static final String CAMERA = Manifest.permission.CAMERA;
    private static final String[] PERMISSIONS = {CAMERA};


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qr_code_scanner);
        surfaceView = findViewById(R.id.cameraPreview);
        BarcodeDetector barcodeDetector = new BarcodeDetector.Builder(this).setBarcodeFormats(Barcode.QR_CODE)
                .build();


        cameraSource = new CameraSource.Builder(this, barcodeDetector).setRequestedPreviewSize(640, 480).build();

        textView = findViewById(R.id.textView);

        surfaceView.getHolder().addCallback(new SurfaceHolder.Callback() {
            @Override
            public void surfaceCreated(SurfaceHolder holder) {
                //TODO: Camera permission
                Log.d(TAG, "try to open camera to scan QR Code");

                hold = holder;

               if(Build.VERSION.SDK_INT >= 23){
                   if (checkSelfPermission(Manifest.permission.CAMERA)
                           != PackageManager.PERMISSION_GRANTED) {
                       requestPermissions(new String[]{Manifest.permission.CAMERA},
                               MY_CAMERA_REQUEST_CODE);
                   }else{
                       try {
                           Log.d(TAG, "camera open worked");
                           cameraSource.start(holder);
                       } catch (IOException e) {
                           Log.d(TAG, "open camera did not work");
                           e.printStackTrace();
                       }

                   }
               }


            }



            @Override
            public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

            }

            @Override
            public void surfaceDestroyed(SurfaceHolder holder) {
                cameraSource.stop();

            }
        });

        barcodeDetector.setProcessor(new Detector.Processor<Barcode>() {
            @Override
            public void release() {

            }

            @Override
            public void receiveDetections(Detector.Detections<Barcode> detections) {


                final SparseArray<Barcode> qrCodes = detections.getDetectedItems();
                if (qrCodes.size() != 0) {


                    String table = qrCodes.valueAt(0).displayValue;
                    String[] tableValues = table.split("\\s+");

                    final String restaurantID = tableValues[0];
                    final int tableNumber = Integer.parseInt(tableValues[1]) ;

                    Log.d(TAG, "receiveDetections: Table number:  "+ tableNumber + " restaurantName: " + restaurantID );


                    //open menu activity as intent
                    Intent intent = new Intent(getApplicationContext(), MenuActivity.class);
                    intent.putExtra("restaurantID", restaurantID);
                    intent.putExtra("tableNumber", tableNumber);
                    startActivity(intent);

                    //what happens
                    textView.post(new Runnable() {
                        @Override
                        public void run() {

                            Vibrator vibrator = (Vibrator)getApplicationContext().getSystemService(Context.VIBRATOR_SERVICE);
                            vibrator.vibrate(1000);

                        }
                    });







                }

            }
        });

    }



    @SuppressLint("MissingPermission")
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == MY_CAMERA_REQUEST_CODE) {

            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                Toast.makeText(this, "camera permission granted", Toast.LENGTH_LONG).show();

                try {
                    cameraSource.start(hold);
                } catch (IOException e) {
                    Log.d(TAG, "open camera did not work");
                    e.printStackTrace();
                }


            } else {

                Toast.makeText(this, "camera permission denied", Toast.LENGTH_LONG).show();

            }

        }}


}
