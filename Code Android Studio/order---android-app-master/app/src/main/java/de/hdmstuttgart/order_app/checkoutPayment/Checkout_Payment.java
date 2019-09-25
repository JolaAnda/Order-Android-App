package de.hdmstuttgart.order_app.checkoutPayment;

import android.content.Intent;
import android.net.Uri;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.io.Serializable;
import java.util.ArrayList;

import de.hdmstuttgart.order_app.Meals;
import de.hdmstuttgart.order_app.R;
import de.hdmstuttgart.order_app.menuActivity.*;


public class Checkout_Payment extends AppCompatActivity implements CheckoutTab1.OnFragmentInteractionListener, CheckoutTab2.OnFragmentInteractionListener {

    private static final String TAG = "Checkout_Payment";
    public ArrayList<Meals> shoppingCart;
    private TabLayout tabLayout;
    private ViewPager viewPager;
    private MyPagerAdapter myPagerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_checkout__payment);


        Bundle bundleWithShoppingCart = getIntent().getExtras();
        shoppingCart = (ArrayList<Meals>) bundleWithShoppingCart.getSerializable("SHOPPING_CART");
        Log.d(TAG, "onCreate: Shopping_Cart:" + shoppingCart.size());


/*
        Bundle bundle1 = new Bundle();
        bundle1.putSerializable("SHOPPING_CART", shoppingCart);
*/
        tabLayout = findViewById(R.id.tablayout);
        tabLayout.addTab(tabLayout.newTab().setText("Your Order"));
        tabLayout.addTab(tabLayout.newTab().setText("Payment"));
        tabLayout.setTabGravity(TabLayout.GRAVITY_FILL);

        //add icons to TabLayout
        tabLayout.getTabAt(0).setIcon(R.drawable.grocery_icon);
        tabLayout.getTabAt(1).setIcon(R.drawable.ic_payment);

        viewPager = findViewById(R.id.pager);
        myPagerAdapter = new MyPagerAdapter(getSupportFragmentManager(), tabLayout.getTabCount(), bundleWithShoppingCart);
        viewPager.setAdapter(myPagerAdapter);

        viewPager.setOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                viewPager.setCurrentItem(tab.getPosition());
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });


    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
