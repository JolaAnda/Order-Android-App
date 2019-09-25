package de.hdmstuttgart.order_app.checkoutPayment;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloCallback;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;
import com.paypal.android.sdk.payments.PayPalConfiguration;
import com.paypal.android.sdk.payments.PayPalPayment;
import com.paypal.android.sdk.payments.PayPalService;
import com.paypal.android.sdk.payments.PaymentActivity;
import com.paypal.android.sdk.payments.PaymentConfirmation;

import org.jetbrains.annotations.NotNull;
import org.json.JSONException;

import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import de.hdmstuttgart.order_app.AddOrderMutation;
import de.hdmstuttgart.order_app.Config.ConfigPayPal;
import de.hdmstuttgart.order_app.Confirmation;
import de.hdmstuttgart.order_app.Meals;
import de.hdmstuttgart.order_app.R;
import de.hdmstuttgart.order_app.StartScreen;
import de.hdmstuttgart.order_app.menuActivity.ApolloConnector;
import de.hdmstuttgart.order_app.menuActivity.MenuActivity;

import static android.app.Activity.RESULT_OK;


public class CheckoutTab2 extends Fragment {

    public static final int PAYPAL_REQUEST_CODE = 7171;
    private static final String TAG = "CheckoutTab2";
    private static PayPalConfiguration config = new PayPalConfiguration().environment(PayPalConfiguration.ENVIRONMENT_SANDBOX)
            .clientId(ConfigPayPal.PAYPAL_CLIENT_ID);
    String amount = "";
    String price;
    private TextView totalPrice;
    private TextView priceCash;
    private Button pay;
    private Button payCash;
    private ArrayList<Meals> shoppingCart;
    private String restaurantID;
    private int tableNumber;
    private OnFragmentInteractionListener mListener;


    //constructor
    public void CheckoutTab2() {

    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_checkout_tab2, container, false);


        totalPrice = view.findViewById(R.id.totalPrice);
        priceCash = view.findViewById(R.id.price);
        pay = view.findViewById(R.id.pay);
        payCash = view.findViewById(R.id.payCash);


        //start PayPal Service
        Intent intent = new Intent(getActivity(), PayPalService.class);
        intent.putExtra(PayPalService.EXTRA_PAYPAL_CONFIGURATION, config);
        getActivity().startService(intent);


        //get total Price of your order to be shown on the screen and press the pay button for paypal
        if (getArguments() != null) {
            shoppingCart = (ArrayList<Meals>) getArguments().getSerializable("SHOPPING_CART");
            Log.d(TAG, "onCreateView: Load shopping cart");

            //restaurantID = (String) getArguments().getSerializable("restaurantID");
            restaurantID = "535cbc82-fca7-4ddb-b220-0d503397643c";
            //tableNumber = (int) getArguments().getSerializable("tableNumber");
            tableNumber = 1;

            Log.d(TAG, "onCreateView: Hat geklaptt:" + restaurantID +" tablenumber:"+ tableNumber);


            double price = 0;
            for (Meals e : shoppingCart) {
                price += e.price;
            }

            double totalValue = roundNumber(price, 2);
            String priceAmount = String.format("%.2f", totalValue);

            totalPrice.setText(priceAmount);
            priceCash.setText(priceAmount );



            pay.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    processPayment();
                    Log.d(TAG, "button is pressed, payment will be processed");
                }
            });

            payCash.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    sendStuffToGraphQL(restaurantID, tableNumber);

                    amount = totalPrice.getText().toString();

                    Intent intent = new Intent(getActivity(), Confirmation.class);
                    intent.putExtra("Payment", amount);
                    startActivity(intent);


                }
            });
        } else {
            Log.d(TAG, "onCreateView: Could not load payment View");
        }
        return view;
    }


    public void sendStuffToGraphQL(String restaurantID, int tableNumber) {

        //TODO: table number und restaurantID sind oben gespeichert : mutation machen und abschicken



        //TODO das sind alle product ids
        String[] allIDsTogether = new String[shoppingCart.size()];

        for (int i = 0; i < shoppingCart.size(); i++) {
            allIDsTogether[i] = shoppingCart.get(i).id;
            Log.d(TAG, "sendStuffToGraphQL: at " + i + " is the id : " + allIDsTogether[i]);
        }

        List<String> list = Arrays.asList(allIDsTogether);


        for (String listItem : list) {
            Log.d("Pimmelnase", listItem);
        }


        ApolloConnector.setupApollo().mutate(
                AddOrderMutation
                        .builder()
                        .restaurant_id(restaurantID)
                        .tableNumber(tableNumber)
                        .products(list)
                        .build()
        ).enqueue(new ApolloCall.Callback<AddOrderMutation.Data>() {
            @Override
            public void onResponse(@NotNull Response<AddOrderMutation.Data> response) {

                Log.d(TAG, "Pimmelnase" + response.data());

            }

            @Override
            public void onFailure(@NotNull ApolloException e) {

                Log.d(TAG, "" + e);

            }
        });



    }







    public void processPayment() {

        amount = totalPrice.getText().toString();
        PayPalPayment payPalPayment = new PayPalPayment(new BigDecimal(String.valueOf(amount)), "USD", "Log in with your PayPal account", PayPalPayment.PAYMENT_INTENT_SALE);

        Intent intent = new Intent(getActivity(), PaymentActivity.class);
        intent.putExtra(PayPalService.EXTRA_PAYPAL_CONFIGURATION, config);
        intent.putExtra(PaymentActivity.EXTRA_PAYMENT, payPalPayment);
        startActivityForResult(intent, PAYPAL_REQUEST_CODE);
        Log.d(TAG, "process payment is started");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        //stop Paypal Service
        getActivity().stopService(new Intent(getActivity(), PayPalService.class));
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == PAYPAL_REQUEST_CODE) {
            if (resultCode == RESULT_OK) {
                PaymentConfirmation confirmation = data.getParcelableExtra(PaymentActivity.EXTRA_RESULT_CONFIRMATION);

                if (confirmation != null) {

                    try {
                        String paymentDetails = confirmation.toJSONObject().toString(4);
                        amount = totalPrice.getText().toString();



                        // Bundle bundle = new Bundle();
                        //        bundle.putSerializable("SHOPPING_CART", shoppingCart);
                        Intent intent = new Intent(getActivity(), PaymentDetails.class);
                        Bundle bundle = new Bundle();
                        bundle.putSerializable("SHOPPING_CART", shoppingCart);
                        bundle.putSerializable("RestaurantID", restaurantID);
                        bundle.putSerializable("TableNumber", tableNumber);
                        intent.putExtras(bundle);
                        intent.putExtra("Payment Details", paymentDetails);
                        intent.putExtra("Payment Amount", amount);
                        startActivity(intent);

                        sendStuffToGraphQL(restaurantID, tableNumber);

                        Log.d(TAG, "new intent for payment details screen is started");

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            } else if (resultCode == Activity.RESULT_CANCELED) {
                Toast.makeText(getActivity(), "Cancel", Toast.LENGTH_SHORT).show();
            }

        } else if (resultCode == PaymentActivity.RESULT_EXTRAS_INVALID) {
            Toast.makeText(getActivity(), "Invalid", Toast.LENGTH_SHORT).show();
        }
    }


    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }



    public double roundNumber (double value, int places){
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = new BigDecimal(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }




}
