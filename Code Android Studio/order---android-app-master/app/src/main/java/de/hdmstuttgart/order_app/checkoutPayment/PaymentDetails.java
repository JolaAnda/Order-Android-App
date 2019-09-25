package de.hdmstuttgart.order_app.checkoutPayment;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.function.ToDoubleBiFunction;

import de.hdmstuttgart.order_app.Meals;
import de.hdmstuttgart.order_app.R;
import de.hdmstuttgart.order_app.StartScreen;
import de.hdmstuttgart.order_app.menuActivity.MenuActivity;

public class PaymentDetails extends AppCompatActivity {

    private TextView txtId, txtAmount, txtStatus;
    private Button finish;
    private ArrayList<Meals> shoppingCart;
    private String restaurantID;
    private int tableNumber;

    private static final String TAG = "PaymentDetails";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment_details);




        txtId = findViewById(R.id.textId);
        txtAmount = findViewById(R.id.txtAmount);
        txtStatus = findViewById(R.id.txtStatus);
        finish = findViewById(R.id.finish);


        Intent intent = getIntent();


        getIntentExtras();



        try{
            JSONObject jsonObject = new JSONObject(intent.getStringExtra("Payment Details"));
            showDetails(jsonObject.getJSONObject("response"), intent.getStringExtra("Payment Amount"));



            } catch (JSONException e){
            e.printStackTrace();
        }


        finish.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MenuActivity.class);
                startActivity(intent);
            }
        });



    }




    private void showDetails(JSONObject response, String paymentAmount){

        try{
            txtId.setText(response.getString("id"));
            txtAmount.setText(paymentAmount);
            txtStatus.setText(response.getString("state"));


        }catch (JSONException e){
            e.printStackTrace();
        }
    }


    private void getIntentExtras () {

        Bundle bundleWithShoppingCart = getIntent().getExtras();
        shoppingCart = (ArrayList<Meals>) bundleWithShoppingCart.getSerializable("SHOPPING_CART");
        Log.d(TAG, "onCreate: Shopping_Cart:" + shoppingCart.size());


        if (bundleWithShoppingCart == null) {
            Log.d(TAG, "no extras from intent");
        } else {
            restaurantID = bundleWithShoppingCart.getString("RestaurantID");
            tableNumber = bundleWithShoppingCart.getInt("TableNumber");
            Log.d(TAG, "getIntentExtras: " + "Restaurant-ID: " + restaurantID + " Table Number: " + tableNumber);
        }
    }



}
