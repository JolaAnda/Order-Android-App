package de.hdmstuttgart.order_app.checkoutPayment;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

public class MyPagerAdapter extends FragmentStatePagerAdapter {

    int mNoOfTabs;
    Bundle bundle;

    public MyPagerAdapter(FragmentManager fm, int numberOfTabs, Bundle bundle) {
        super(fm);
        this.mNoOfTabs = numberOfTabs;
        this.bundle = bundle;
    }

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                CheckoutTab1 checkoutTab1 = new CheckoutTab1();
                checkoutTab1.setArguments(bundle);
                return checkoutTab1;
            case 1:
                CheckoutTab2 checkoutTab2 = new CheckoutTab2();
                checkoutTab2.setArguments(bundle);
                return checkoutTab2;
            default:
                return null;
        }
    }

    @Override
    public int getCount() {
        return 2;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        switch (position) {
            case 0:
                return "Tab 1";
            case 1:
                return "Tab 2";
            default:
                return null;
        }
    }
}
