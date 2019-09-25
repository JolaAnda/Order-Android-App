package de.hdmstuttgart.order_app.checkoutPayment;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;

import de.hdmstuttgart.order_app.Meals;
import de.hdmstuttgart.order_app.R;
import de.hdmstuttgart.order_app.menuActivity.*;
import de.hdmstuttgart.order_app.menuActivity.ShoppingCartRecyclerViewAdapter;


public class CheckoutTab1 extends Fragment {

    private static final String TAG = "CheckoutTab1";
    private RecyclerView menuRecyclerViewCheckout;
    private TextView totalPrice;
    private ShoppingCartRecyclerViewAdapter shoppingCartAdapter;
    private ArrayList<Meals> shoppingCart;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_checkout_tab1, container, false);



        if (getArguments() != null) {
            shoppingCart = (ArrayList<Meals>) getArguments().getSerializable("SHOPPING_CART");
                Log.d(TAG, "onCreateView: Load shopping cart");

            menuRecyclerViewCheckout = view.findViewById(R.id.menuRecyclerViewCheckout);
            totalPrice = view.findViewById(R.id.total_Price);


            //new Adapter for Recycler View
            OrderRecyclerViewAdapter recyclerAdapter = new OrderRecyclerViewAdapter(shoppingCart, getContext());
            menuRecyclerViewCheckout.setLayoutManager(new LinearLayoutManager(getActivity()));
            menuRecyclerViewCheckout.setAdapter(recyclerAdapter);


            //set total price at bottom
            double price = 0;
            for (Meals e : shoppingCart) {
                price += e.price;
            }

            double totalValue = roundNumber(price, 2);
            String priceAmount = String.format("%.2f", totalValue);

            totalPrice.setText(priceAmount + " $");


        }
        else{
            Log.d(TAG, "onCreateView: Could not load sopping cart");
        }



        return view;
    }



    @Override
    public void onCreate(@Nullable Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

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
