package de.hdmstuttgart.order_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;

import de.hdmstuttgart.order_app.menuActivity.MenuActivity;

public class Confirmation extends AppCompatActivity {

    private Button finish;
    private TextView textAmount;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirmation);


        finish = findViewById(R.id.finishButton);
        textAmount = findViewById(R.id.txtAmount);

        Intent intent = getIntent();
        String price = intent.getStringExtra("Payment");

        textAmount.setText(price);

        finish.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MenuActivity.class);
                startActivity(intent);

            }
        });

    }







}
