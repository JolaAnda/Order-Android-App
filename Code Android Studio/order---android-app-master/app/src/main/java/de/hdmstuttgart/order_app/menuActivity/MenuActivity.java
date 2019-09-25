package de.hdmstuttgart.order_app.menuActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.BottomSheetBehavior;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;
import com.darwindeveloper.horizontalscrollmenulibrary.custom_views.HorizontalScrollMenuView;
import com.darwindeveloper.horizontalscrollmenulibrary.extras.MenuItem;
import com.google.android.gms.common.util.MapUtils;

import org.jetbrains.annotations.NotNull;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import de.hdmstuttgart.order_app.GetAllProductsQuery;
import de.hdmstuttgart.order_app.Meals;
import de.hdmstuttgart.order_app.QrCodeScanner;
import de.hdmstuttgart.order_app.R;
import de.hdmstuttgart.order_app.SignUpScreen;
import de.hdmstuttgart.order_app.checkoutPayment.Checkout_Payment;

public class MenuActivity extends AppCompatActivity {


    private static final String TAG = "MenuActivity";


    HashMap<String, ArrayList> allMenusMapTry = new HashMap<>();

    HashMap<String, ArrayList> allMenuLists = new HashMap<>();

    ArrayList<Meals> shoppingCart = new ArrayList<>();

    public String restaurant_id = "535cbc82-fca7-4ddb-b220-0d503397643c";
    public int tableNumber;



    private String categoryName;
    private TextView tvTotalPrice;
    private TextView tvTotalCount;
    private HorizontalScrollMenuView horizontalScrollMenu;
    private RecyclerView menuRecyclerView;
    private MenuRecyclerViewAdapter menuAdapter;
    private RecyclerView shoppingCartRecyclerView;
    private FloatingActionButton floatingActionButton;
    private RelativeLayout settingsButton;
    private ListView settingsList;
    private DrawerLayout drawerLayout;
    private ArrayAdapter<String> settingAdapter;
    private ShoppingCartRecyclerViewAdapter shoppingCartAdapter;
    private ArrayList<Meals> currentShownMeals = new ArrayList<>();
    private Button payButton;
    private LinearLayout llBottomSheet;
    private BottomSheetBehavior bottomSheetBehavior;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
        //setContentView(R.layout.activity_sign_up);

        initComponents();

        setRecycleViewAdapter();

        getIntentExtras();

        initMenuLists(restaurant_id);

        addItemsToSettingsList();

        //set bottom sheet behavior
        bottomSheetBehavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
            @Override
            public void onStateChanged(View bottomSheet, int newState) {
            }

            @Override
            public void onSlide(View bottomSheet, float slideOffset) {
                floatingActionButton.animate().scaleX(1 - slideOffset).scaleY(1 - slideOffset).setDuration(0).start();
            }
        });


        //ClickListener for the button to open the settings menu
        settingsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                drawerLayout.openDrawer(Gravity.LEFT);
            }
        });

        //method to set what happens when clicking on a list item
        settingsList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                switch (position) {
                    case 0:
                        //open profil
                        return;
                    case 1:
                        //open settings
                        return;
                    case 2:
                        Intent intent1 = new Intent(getApplicationContext(), QrCodeScanner.class);
                        startActivity(intent1);
                        break;
                    case 3:
                        Intent intent2 = new Intent(getApplicationContext(), SignUpScreen.class);
                        startActivity(intent2);
                        break;
                    default:
                        return;
                }
            }
        });

    }

    private void initComponents() {
        //init components
        menuRecyclerView = findViewById(R.id.menuRecyclerView);
        shoppingCartRecyclerView = findViewById(R.id.bottomSheetRecyclerView);
        horizontalScrollMenu = findViewById(R.id.horizontalMenu);
        floatingActionButton = findViewById(R.id.floatingActionButton);
        llBottomSheet = findViewById(R.id.bottom_sheet);
        bottomSheetBehavior = BottomSheetBehavior.from(llBottomSheet);
        tvTotalPrice = findViewById(R.id.tvTotalPrice);
        tvTotalCount = findViewById(R.id.tvTotalCount);
        payButton = findViewById(R.id.pay_button);
        settingsButton = findViewById(R.id.settings_button);
        settingsList = findViewById(R.id.settingsList);
        drawerLayout = findViewById(R.id.drawerLayout);
    }

    //get intent extras
    private void getIntentExtras () {

        Bundle extras = getIntent().getExtras();
        if (extras == null) {
            Log.d(TAG, "no extras from intent");
        } else {

            if(extras.getString("restaurantID") != null){
                restaurant_id = extras.getString("restaurantID");
            }else{
                restaurant_id = "nicht vorhanden";
            }

                tableNumber = extras.getInt("tableNumber");

            Log.d(TAG, "getIntentExtras: " + "Restaurant-ID: " + restaurant_id + " Table Number: " + tableNumber);

        }

    }



    public void startCheckoutPayment(View v) {
        Log.d(TAG, "startCheckoutPayment: hat geklappt");
        Intent intent = new Intent(getApplicationContext(), Checkout_Payment.class);
        Bundle bundle = new Bundle();
        bundle.putSerializable("SHOPPING_CART", shoppingCart);
        bundle.putSerializable("restaurantID", restaurant_id);
        bundle.putSerializable("tableNumber", tableNumber);
        intent.putExtras(bundle);
        startActivity(intent);

    }

    private void initMenu(HashMap currentMap) {

        //get all menu lists
        final HashMap<String, ArrayList> initMenuList = currentMap;


        Log.d(TAG, "initMenu: The menu map look's like this:");

        for (Map.Entry<String, ArrayList> entry : initMenuList.entrySet()) {
            String key = entry.getKey();
            ArrayList<Meals> value = entry.getValue();
            Log.d(TAG, "initMenu: Key:" + key + "value Size " + value.size());
//            Log.d(TAG, "newMeals: " + value.get(0).name);
        }

        //init horizontal menu
        for (Map.Entry<String, ArrayList> entry : initMenuList.entrySet()) {
            String menuListName = entry.getKey();
            Log.d(TAG, "initMenu: menuListName is: " + menuListName);
            //horizontalScrollMenu.addItem(menuListName, R.drawable.ic_launcher_background);
            horizontalScrollMenu.addItem(menuListName, R.drawable.ic_launcher_background);
        }
        Log.d(TAG, "initMenu: Menu is declared ");

        //click on item
        horizontalScrollMenu.setOnHSMenuClickListener(new HorizontalScrollMenuView.OnHSMenuClickListener() {
            @Override
            public void onHSMClick(MenuItem menuItem, int position) {
                Log.d(TAG, "Horizontal menu: " + menuItem.getText() + " was clicked");
                //init the list that has to be shown


                for (Map.Entry<String, ArrayList> entry : initMenuList.entrySet()) {
                    if (entry.getKey().equals(menuItem.getText())) {
                        currentShownMeals.clear();
                        currentShownMeals.addAll(entry.getValue());
                    }
                }
                //show the list
                menuAdapter.notifyDataSetChanged();

            }
        });

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                horizontalScrollMenu.showItems();
            }
        });

    }

    private void initMenuLists(String restaurantID) {
        ApolloCall.Callback<GetAllProductsQuery.Data> callback = new ApolloCall.Callback<GetAllProductsQuery.Data>() {
            @Override
            public void onResponse(@NotNull Response<GetAllProductsQuery.Data> response) {
                Log.d(TAG, "initMenuLists: " + response.data());


                String name = response.data().getRestaurantByID().name();



                for (int i = 0; i < response.data().getRestaurantByID().categories().size(); i++) {
                    ArrayList<Meals> dishlist = new ArrayList<>();

                    Log.d(TAG, "initMenuLists ----Datensatz für die Map--- ");

                    categoryName = response.data().getRestaurantByID().categories().get(i).name();
                    // Log.d(TAG, "initMenus: categoryName: " + categoryName);

                    Log.d(TAG, "initMenuLists: category name: " + categoryName);


                    List<GetAllProductsQuery.Product> allProductsOfApollo = response.data().getRestaurantByID().categories().get(i).products();
                    for (int j = 0; j < allProductsOfApollo.size(); j++) {



                            if(allProductsOfApollo.get(j).id() != null  && allProductsOfApollo.get(j).name() != null  && allProductsOfApollo.get(j).description() != null  && allProductsOfApollo.get(j).price() != null){
                                try {
                                    Meals meal1 = new Meals(allProductsOfApollo.get(j).id(),categoryName, allProductsOfApollo.get(j).name(), allProductsOfApollo.get(j).description(), allProductsOfApollo.get(j).price());
                                    dishlist.add(meal1);

                                    Log.d(TAG, "PRICE -> " + meal1.price);

                                    Log.d(TAG, "initMenuLists: This meal has been added to the dishlist: " + meal1.name);

                                }catch (Exception e){
                                    Log.d(TAG, "There was a exception by creating a meal");
                                    System.out.println(e);

                                }
                            }else{
                                Meals meal1 = new Meals("default", "default","default","default",5);
                                dishlist.add(meal1);
                                Log.d(TAG, "onResponse: something went wrong" );
                            }




                    }


                    Log.d(TAG, "initMenuLists: total dishlist size" + dishlist.size());

                    allMenusMapTry.put(categoryName, dishlist);

                }
                allMenuLists = allMenusMapTry;
                Log.d(TAG, "initMenuLists: the final map looks like this: ");

                for (Map.Entry<String, ArrayList> entry : allMenuLists.entrySet()) {
                    String key = entry.getKey();
                    ArrayList<Meals> value = entry.getValue();
                    Log.d(TAG, "initMenuLists: the map key is " + key + ", and the value size is " + value.size());
                }

            /*    try {
                    wait(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }*/

                //initMenu(allMenuLists);
            }

            @Override
            public void onFailure(@NotNull ApolloException e) {
                Log.d(TAG, "onFailure: " + e.getMessage());

            }

            @Override
            public void onStatusEvent(@NotNull ApolloCall.StatusEvent event) {
                if(event.equals(ApolloCall.StatusEvent.COMPLETED)) {
                    initMenu(allMenuLists);
                }
                super.onStatusEvent(event);
            }
        };

        ApolloConnector.setupApollo().query(
                GetAllProductsQuery.builder().restaurant(restaurantID).build()
        ).enqueue(callback);

/*

        HashMap<String, ArrayList> allMenusMap = new HashMap<>();
        ArrayList<Meals> mainDishList = new ArrayList<>();
        ArrayList<Meals> secondDishList = new ArrayList<>();

        Meals meal1 = new Meals("MainDish", "meal1", "nothing", 5);
        Meals meal2 = new Meals("MainDish", "meal2", "nothing", 6);
        Meals meal3 = new Meals("MainDish", "meal3", "nothing", 6);
        Meals meal4 = new Meals("SecondDish", "meal4", "nothing", 7);
        Meals meal5 = new Meals("SecondDish", "meal5", "nothing", 8);
        mainDishList.add(meal1);
        mainDishList.add(meal2);
        mainDishList.add(meal3);
        secondDishList.add(meal4);
        secondDishList.add(meal5);

        allMenusMap.put("Main Dish", mainDishList);
        allMenusMap.put("Second Dish", secondDishList);


        // initMenu(allMenusMap);
*/

    }

    public void addToShoppingCart(Meals meal) {
        shoppingCart.add(meal);
        Log.d(TAG, "addToShoppingCart:" + meal.name);

        Log.d(TAG, "Shopping cart: ");
        for (Meals e : shoppingCart) {
            Log.d(TAG, e.name + "\n");
        }
        // Refresh list
        shoppingCartAdapter.notifyItemInserted(shoppingCart.size() - 1);

        double totalPrice = 0;
        for (Meals e : shoppingCart) {
            totalPrice += e.price;
        }

        double totalValue = roundNumber(totalPrice, 2);
        String price = String.format("%.2f", totalValue);

        tvTotalPrice.setText(price + " $");
        tvTotalCount.setText("" + shoppingCart.size());
    }

    public void deleteFromShoppingCart(Meals meal, int position) {
        if (shoppingCart.contains(meal)) {
            Log.d(TAG, "remove the " + shoppingCart.get(position) + " meal from the shopping chart");
            shoppingCart.remove(meal);

            //delete price from total price
            double totalPrice = 0;
            for (Meals e : shoppingCart) {
                totalPrice += e.price;
            }

            double totalValue = roundNumber(totalPrice, 2);
            String price = String.format("%.2f", totalValue);

            tvTotalPrice.setText(price + " $");
            tvTotalCount.setText("" + shoppingCart.size());

        } else {
            Log.d(TAG, "deleteFromShoppingCart: shoppingCart does not contain the meal");

        }

        synchronized (shoppingCartAdapter) {
            shoppingCartAdapter.notifyDataSetChanged();
        }
        Log.d(TAG, "deleteFromShoppingCart: " + meal.name);


    }

    private void addItemsToSettingsList() {
        String[] settingsArray = {"Profil", "Settings", "QrScanner", "Login"};
        settingAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, settingsArray);
        settingsList.setAdapter(settingAdapter);
    }

    public void setRecycleViewAdapter() {
        //set adapter for shopping cart
        ShoppingCartRecyclerViewAdapter.MealDeleted deleter = new ShoppingCartRecyclerViewAdapter.MealDeleted() {
            @Override
            public void onMealDeleted(Meals meal, int position) {
                deleteFromShoppingCart(meal, position);
            }
        };

        shoppingCartAdapter = new ShoppingCartRecyclerViewAdapter(shoppingCart, getApplicationContext(), deleter);
        shoppingCartRecyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        shoppingCartRecyclerView.setAdapter(shoppingCartAdapter);


        //set adapter for menu
        MenuRecyclerViewAdapter.MealSelection selection = new MenuRecyclerViewAdapter.MealSelection() {
            @Override
            public void onMealSelected(Meals meal) {
                addToShoppingCart(meal);

            }
        };

        menuAdapter = new MenuRecyclerViewAdapter(getApplicationContext(), currentShownMeals, selection);
        menuRecyclerView.setAdapter(menuAdapter);
        menuRecyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));


    }


    public double roundNumber (double value, int places){
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = new BigDecimal(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

}
